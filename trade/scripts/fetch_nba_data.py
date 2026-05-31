"""
NBA 交易模拟器 — 球队 & 球员薪资数据抓取脚本
============================================
依赖安装:
  pip install nba_api pandas requests

数据来源: stats.nba.com (通过 nba_api library)
输出:     ../nba_data.json

策略:
  1. 获取全联盟 30 支球队基本信息
  2. 遍历每支球队，使用 CommonTeamRoster 接口抓取球员薪资
  3. 清洗数据（货币符号去除、空值填充）
  4. 结构化输出为 nba_data.json
"""

import json
import time
import random
import os
import sys
from datetime import date

import pandas as pd
import requests

# ------------------------------------------------------------------
# nba_api 导入 — 如果失败则给出清晰指引
# ------------------------------------------------------------------
try:
    from nba_api.stats.static import teams as nba_teams
    from nba_api.stats.endpoints import commonteamroster
    from nba_api.stats.library.http import NBAStatsHTTP
except ImportError as e:
    print(f"[ERROR] 缺少依赖: {e}")
    print("请运行: pip install nba_api pandas requests")
    sys.exit(1)

# ------------------------------------------------------------------
# 配置
# ------------------------------------------------------------------
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "nba_data.json")
TARGET_SEASON = "2025-26"       # 当前完成赛季；2026-27 赛季尚未开打
REQUEST_TIMEOUT = 15            # 单次请求超时（秒）
MIN_DELAY = 0.6                 # 最小请求间隔（秒）
MAX_DELAY = 1.5                 # 最大请求间隔（秒）
MAX_RETRIES = 3                 # 失败重试次数

# 当 API 未返回薪资时的兜底估值（基于当季顶薪/中产/底薪经验值）
# 实际使用时应以抓取数据为准
FALLBACK_SALARIES = {
    "Two-Way": 500_000,
    "Minimum": 2_000_000,
    "Standard": 5_000_000,
    "Rookie": 4_000_000,
    "Veteran": 8_000_000,
}


def log(msg: str) -> None:
    print(f"[{date.today().isoformat()}] {msg}")


# ------------------------------------------------------------------
# 核心抓取逻辑
# ------------------------------------------------------------------

def fetch_all_teams() -> list[dict]:
    """获取 NBA 全部 30 支球队的静态信息。"""
    teams = nba_teams.get_teams()
    log(f"获取到 {len(teams)} 支球队")
    return teams


def fetch_team_roster(team_id: int, season: str) -> pd.DataFrame | None:
    """
    通过 CommonTeamRoster 端点抓取单支球队的 roster 数据。
    返回 DataFrame 或 None（失败时）。
    """
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            # 随机延迟，降低触发反爬的概率
            delay = random.uniform(MIN_DELAY, MAX_DELAY)
            time.sleep(delay)

            roster = commonteamroster.CommonTeamRoster(
                team_id=team_id,
                season=season,
                timeout=REQUEST_TIMEOUT,
            )
            df = roster.get_data_frames()[0]

            if df.empty:
                log(f"  [WARN] 球队 {team_id} 返回空 roster，跳过")
                return None

            # 统一列名（API 可能返回驼峰或大写）
            df.columns = [c.strip() for c in df.columns]
            return df

        except requests.exceptions.Timeout:
            log(f"  [RETRY] 球队 {team_id} 请求超时 (attempt {attempt}/{MAX_RETRIES})")
        except requests.exceptions.ConnectionError as e:
            log(f"  [RETRY] 球队 {team_id} 连接错误: {e} (attempt {attempt}/{MAX_RETRIES})")
        except Exception as e:
            log(f"  [RETRY] 球队 {team_id} 未知错误: {e} (attempt {attempt}/{MAX_RETRIES})")

        if attempt < MAX_RETRIES:
            backoff = 2 ** attempt
            log(f"  → 等待 {backoff}s 后重试...")
            time.sleep(backoff)

    log(f"  [FAIL] 球队 {team_id} 所有重试均失败")
    return None


def parse_salary(value) -> int:
    """
    将薪资字段解析为整数（美元）。
    处理格式:
      - "$12,500,000" -> 12500000
      - "12500000"    -> 12500000
      - NaN / None    -> 0
    """
    if pd.isna(value) or value is None or value == "":
        return 0

    # 如果是数字，直接返回
    if isinstance(value, (int, float)):
        return int(value)

    s = str(value).strip()

    # 处理 "—" 或 "-" 等占位符
    if s in ("—", "--", "-", "", "N/A"):
        return 0

    # 移除货币符号和逗号
    cleaned = s.replace("$", "").replace(",", "").replace(" ", "")
    try:
        return int(float(cleaned))
    except (ValueError, TypeError):
        log(f"    [WARN] 无法解析薪资值: '{value}'，设为 0")
        return 0


def enrich_with_salary_fallback(player_row: pd.Series) -> int:
    """
    当 API 未返回薪资时，根据球员经验年限和类型做兜底估值。
    主要用于离线演示场景。
    """
    exp = player_row.get("EXP", "")
    if pd.isna(exp) or exp == "":
        exp = "0"
    exp_str = str(exp).replace("R", "").strip()

    try:
        years = int(exp_str)
    except ValueError:
        years = 0

    if years == 0:
        return FALLBACK_SALARIES["Rookie"]
    elif years <= 2:
        return FALLBACK_SALARIES["Standard"]
    elif years <= 4:
        return FALLBACK_SALARIES["Standard"] + 2_000_000 * years
    else:
        return FALLBACK_SALARIES["Veteran"] + 1_000_000 * years


def process_roster(df: pd.DataFrame, team_name: str) -> list[dict]:
    """
    清洗单支球队的 roster DataFrame，提取所需字段。
    返回 [{name, salary}, ...]
    """
    players = []

    # 识别关键列（API 版本不同列名可能不同）
    name_col = next((c for c in df.columns if c.upper() in ("PLAYER", "PLAYER_NAME", "NAME")), None)
    salary_col = next((c for c in df.columns if c.upper() in ("SALARY", "2025-26 SALARY", "SALARY_2025_26")), None)

    if name_col is None:
        log(f"  [WARN] 无法找到球员名列（可用列: {list(df.columns)}），跳过")
        return []

    for _, row in df.iterrows():
        name = row.get(name_col, "Unknown")

        # 解析薪资
        salary = 0
        if salary_col:
            salary = parse_salary(row.get(salary_col))
        else:
            # 无薪资列：使用兜底估值
            salary = enrich_with_salary_fallback(row)
            log(f"    [FALLBACK] {name} → 估值 ${salary:,}")

        players.append({
            "name": str(name).strip(),
            "salary": salary,
        })

    return players


# ------------------------------------------------------------------
# 主流程
# ------------------------------------------------------------------

def main():
    log("=" * 60)
    log("NBA 交易模拟器 — 数据抓取开始")
    log(f"目标赛季: {TARGET_SEASON}")
    log("=" * 60)

    # 1. 获取所有球队
    all_teams = fetch_all_teams()
    if not all_teams:
        log("[FATAL] 未获取到任何球队，终止脚本")
        sys.exit(1)

    output = {
        "last_updated": date.today().isoformat(),
        "season": TARGET_SEASON,
        "teams": [],
    }

    total_payroll = 0
    total_players = 0

    # 2. 逐队抓取 roster
    for idx, team in enumerate(all_teams, 1):
        tid = team["id"]
        tname = team["full_name"]
        tabbr = team["abbreviation"]

        log(f"[{idx:02d}/30] {tname} ({tabbr}) — team_id={tid}")

        df = fetch_team_roster(tid, TARGET_SEASON)

        if df is None or df.empty:
            log(f"  → 跳过 {tname}")
            output["teams"].append({
                "team_id": tid,
                "team_name": tname,
                "abbreviation": tabbr,
                "payroll": 0,
                "players": [],
                "note": "数据抓取失败",
            })
            continue

        # 处理 roster
        roster_players = process_roster(df, tname)
        team_payroll = sum(p["salary"] for p in roster_players)

        total_payroll += team_payroll
        total_players += len(roster_players)

        output["teams"].append({
            "team_id": tid,
            "team_name": tname,
            "abbreviation": tabbr,
            "payroll": team_payroll,
            "players": roster_players,
        })

        log(f"  → {len(roster_players)} 名球员, 薪资总额 ${team_payroll:,}")

    # 3. 汇总统计
    log("=" * 60)
    log(f"抓取完成! 共 {len(output['teams'])} 支球队, {total_players} 名球员")
    log(f"全联盟薪资总额: ${total_payroll:,}")

    # 4. 写出 JSON
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    log(f"数据已保存至: {OUTPUT_PATH}")
    log(f"文件大小: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


if __name__ == "__main__":
    main()

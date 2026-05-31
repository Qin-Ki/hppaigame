"""
NBA 薪资数据抓取脚本 — Spotrac
================================
依赖安装:
  pip install requests beautifulsoup4

目标网站: https://www.spotrac.com/nba/{team-slug}/yearly/cap/

功能:
  1. 遍历 NBA 全部 30 支球队的 Spotrac 薪资页面
  2. 解析 HTML 表格 → 提取 Player Name + 2026-27 Cap Hit
  3. 数据清洗（$ / , 去除 → int）
  4. 输出为 salary_data.json

若 Spotrac 反爬升级导致失败，脚本尾部提供了手动 CSV 兜底方案。
"""

import csv
import json
import os
import re
import sys
import time
from datetime import date
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ------------------------------------------------------------------
# 配置
# ------------------------------------------------------------------
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "salary_data.json"
REQUEST_TIMEOUT = 20
MIN_DELAY = 1.2          # 请求间隔（秒），避免触发率控
MAX_DELAY = 2.5

# Spotrac 中 NBA 球队的 URL slug 映射（team_name → slug）
# 来源: https://www.spotrac.com/nba/ 页面 URL 路径
TEAM_SLUGS = {
    "Atlanta Hawks":         "atlanta-hawks",
    "Boston Celtics":        "boston-celtics",
    "Brooklyn Nets":         "brooklyn-nets",
    "Charlotte Hornets":     "charlotte-hornets",
    "Chicago Bulls":         "chicago-bulls",
    "Cleveland Cavaliers":   "cleveland-cavaliers",
    "Dallas Mavericks":     "dallas-mavericks",
    "Denver Nuggets":        "denver-nuggets",
    "Detroit Pistons":       "detroit-pistons",
    "Golden State Warriors": "golden-state-warriors",
    "Houston Rockets":       "houston-rockets",
    "Indiana Pacers":        "indiana-pacers",
    "Los Angeles Clippers":  "la-clippers",
    "Los Angeles Lakers":    "los-angeles-lakers",
    "Memphis Grizzlies":     "memphis-grizzlies",
    "Miami Heat":            "miami-heat",
    "Milwaukee Bucks":       "milwaukee-bucks",
    "Minnesota Timberwolves":"minnesota-timberwolves",
    "New Orleans Pelicans":  "new-orleans-pelicans",
    "New York Knicks":       "new-york-knicks",
    "Oklahoma City Thunder": "oklahoma-city-thunder",
    "Orlando Magic":         "orlando-magic",
    "Philadelphia 76ers":   "philadelphia-76ers",
    "Phoenix Suns":          "phoenix-suns",
    "Portland Trail Blazers":"portland-trail-blazers",
    "Sacramento Kings":      "sacramento-kings",
    "San Antonio Spurs":     "san-antonio-spurs",
    "Toronto Raptors":       "toronto-raptors",
    "Utah Jazz":             "utah-jazz",
    "Washington Wizards":    "washington-wizards",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}


def log(msg: str) -> None:
    print(f"[{date.today().isoformat()}] {msg}")


# ------------------------------------------------------------------
# 核心：单支球队薪资页面抓取
# ------------------------------------------------------------------

def fetch_team_salary(team_name: str, slug: str) -> list[dict] | None:
    """
    抓取单支球队的 Spotrac 薪资页面。
    返回 [{name, salary_2027}, ...] 或 None（失败时）。
    """
    url = f"https://www.spotrac.com/nba/{slug}/yearly/cap/"
    log(f"  → 正在抓取: {team_name} ({url})")

    for attempt in range(1, 4):  # 最多重试 3 次
        try:
            delay = MIN_DELAY + (MAX_DELAY - MIN_DELAY) * (time.time() % 1)
            time.sleep(delay)

            resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()

            # 检查是否被反爬拦截（Spotrac 通常返回 200 + 验证页面）
            if "Please verify you are a human" in resp.text or "captcha" in resp.text.lower():
                log(f"    [BLOCKED] 触发反爬验证，跳过 {team_name}")
                return None

            players = parse_salary_table(resp.text, team_name)
            if players is None:
                return None

            log(f"    → 解析到 {len(players)} 名球员")
            return players

        except requests.exceptions.Timeout:
            log(f"    [RETRY] 超时 (attempt {attempt})")
        except requests.exceptions.HTTPError as e:
            status = e.response.status_code if e.response is not None else "?"
            log(f"    [RETRY] HTTP {status} (attempt {attempt})")
            if status == 404:
                log(f"    [SKIP] 页面不存在: {url}")
                return None
        except Exception as e:
            log(f"    [RETRY] 错误: {e} (attempt {attempt})")

        if attempt < 3:
            time.sleep(2 ** attempt)

    log(f"    [FAIL] 所有重试均失败")
    return None


def parse_salary_table(html: str, team_name: str) -> list[dict] | None:
    """
    从 HTML 中解析薪资表格。
    Spotrac 的薪资页面使用 <table> 结构，列顺序通常为：
      Player Name | Age | 2025-26 | 2026-27 | 2027-28 | ...
    我们提取 Name 和 "2026-27" 列对应的 Cap Hit。
    """
    soup = BeautifulSoup(html, "html.parser")

    # --- 策略 1: 查找包含 "2026-27" 的表头 ---
    table = None
    header_col_index = -1  # 2026-27 列索引

    # 尝试所有 <table> 元素
    for tbl in soup.find_all("table"):
        headers = tbl.find_all("th")
        for idx, th in enumerate(headers):
            text = th.get_text(strip=True)
            if "2026-27" in text or "2026" in text:
                table = tbl
                header_col_index = idx
                break
        if table:
            break

    # --- 策略 2: 若未找到表格，尝试查找 "cap" / "salary" 相关表格 ---
    if table is None:
        for tbl in soup.find_all("table"):
            class_ = tbl.get("class", [])
            if any("cap" in (c or "").lower() for c in class_):
                table = tbl
                break
        if table is None:
            # 最宽泛的回退：取第一个包含多行且有数字的大表格
            for tbl in soup.find_all("table"):
                rows = tbl.find_all("tr")
                if len(rows) >= 5:
                    table = tbl
                    break

    if table is None:
        log(f"    [WARN] 未找到薪资表格，页面结构可能已变更")
        return []

    # 如果策略 1 未找到列索引，尝试从表头推断
    if header_col_index < 0:
        headers = table.find_all("th")
        for idx, th in enumerate(headers):
            text = th.get_text(strip=True)
            if "2026-27" in text or "2026" in text or "2027" in text:
                header_col_index = idx
                break

    # 若仍然找不到，默认取第 3 列（常见布局：Name, Pos, Age, 2025, 2026, 2027...）
    if header_col_index < 0:
        header_col_index = 4  # 猜测 2026-27 在第 5 列
        log(f"    [WARN] 未找到 2026-27 表头，使用默认列索引 {header_col_index}")

    # --- 提取数据行 ---
    players = []
    rows = table.find_all("tr")

    for row in rows:
        cells = row.find_all("td")
        if len(cells) < header_col_index + 1:
            continue

        # --- 提取球员姓名 ---
        name_cell = cells[0]
        name_el = (
            name_cell.find("a")
            or name_cell.find("span", class_="player-name")
            or name_cell
        )
        name = name_el.get_text(strip=True) if name_el else ""

        # 过滤掉非球员行（表头、分隔行、合计行等）
        if not name or name.lower() in ("player", "name", "", "team total", "total"):
            continue
        if any(skip in name.lower() for skip in ("total", "cap", "dead", "trade", "exception")):
            continue

        # --- 提取 2026-27 薪资 ---
        salary_raw = cells[header_col_index].get_text(strip=True) if header_col_index < len(cells) else ""

        salary_int = parse_salary_value(salary_raw)

        if salary_int > 0:
            players.append({
                "name": clean_player_name(name),
                "salary": salary_int,
                "salary_raw": salary_raw,
            })

    return players


def parse_salary_value(raw: str) -> int:
    """
    将薪资字符串转为整数。
    处理格式:
      "$40,000,000"  → 40_000_000
      "40,000,000"   → 40_000_000
      "—" / "-" / "" → 0
      "$12,500,000"  → 12_500_000
    """
    s = raw.strip()

    # 占位符 / 空值
    if s in ("", "—", "--", "-", "N/A", "n/a", "TBD"):
        return 0

    # 清理：移除 $、逗号、空格、非数字字符（保留小数点）
    cleaned = re.sub(r'[^0-9.]', '', s)
    if not cleaned:
        return 0

    try:
        return int(float(cleaned))
    except ValueError:
        return 0


def clean_player_name(name: str) -> str:
    """清洗球员名称：去除多余空格、特殊字符。"""
    name = re.sub(r'\s+', ' ', name).strip()
    # 移除行内符号如 † ‡ 等
    name = re.sub(r'[†‡*]', '', name).strip()
    return name


# ------------------------------------------------------------------
# 兜底方案：手动 CSV 导入（当 Spotrac 反爬封锁时使用）
# ------------------------------------------------------------------

def fallback_read_csv(csv_path: str) -> list[dict]:
    """
    若 Spotrac 无法抓取，可从手动导出的 CSV 读取数据。
    CSV 格式要求:
      team_name,player_name,salary_2027
      Boston Celtics,Jayson Tatum,52607320
      ...
    """
    log(f"[FALLBACK] 从 CSV 读取: {csv_path}")
    players = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get("player_name", "").strip()
            salary_str = row.get("salary_2027", "").strip()
            if name and salary_str:
                salary = parse_salary_value(salary_str)
                players.append({"name": name, "salary": salary})
    return players


def generate_fallback_csv_template():
    """生成一个空模板 CSV，供用户手动填写。"""
    template_path = Path(__file__).resolve().parent.parent / "salary_template.csv"
    with open(template_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["team_name", "player_name", "salary_2027"])
        for team_name in TEAM_SLUGS:
            writer.writerow([team_name, "", ""])
    log(f"[TEMPLATE] 已生成 CSV 模板: {template_path}")
    return template_path


# ------------------------------------------------------------------
# 主流程
# ------------------------------------------------------------------

def main():
    log("=" * 60)
    log("NBA 薪资数据抓取 — Spotrac")
    log("=" * 60)

    all_teams_data = []
    success_count = 0
    fail_count = 0
    total_players = 0
    total_payroll = 0

    for idx, (team_name, slug) in enumerate(TEAM_SLUGS.items(), 1):
        log(f"[{idx:02d}/30] {team_name}")

        players = fetch_team_salary(team_name, slug)

        if players is None or len(players) == 0:
            fail_count += 1
            all_teams_data.append({
                "team_name": team_name,
                "payroll": 0,
                "players": [],
                "note": "抓取失败或页面无数据",
            })
            continue

        team_payroll = sum(p["salary"] for p in players)
        total_players += len(players)
        total_payroll += team_payroll
        success_count += 1

        all_teams_data.append({
            "team_name": team_name,
            "payroll": team_payroll,
            "players": [{"name": p["name"], "salary": p["salary"]} for p in players],
        })

        log(f"  → 薪资总额: ${team_payroll:,}")

    # --- 写入 JSON ---
    output = {
        "last_updated": date.today().isoformat(),
        "source": "Spotrac (scraped)",
        "teams": all_teams_data,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # --- 汇总 ---
    log("=" * 60)
    log(f"抓取完成!")
    log(f"  成功: {success_count}/30 支球队")
    log(f"  失败: {fail_count}/30 支球队")
    log(f"  球员总数: {total_players}")
    log(f"  薪资总额: ${total_payroll:,}")
    log(f"  输出文件: {OUTPUT_PATH}")

    # 若有失败，生成 CSV 模板供手动兜底
    if fail_count > 0:
        template = generate_fallback_csv_template()
        log(f"\n⚠️  部分球队抓取失败。可使用手动 CSV 兜底:")
        log(f"   1. 在浏览器中打开 Spotrac 页面")
        log(f"   2. 复制表格数据到 {template.name}")
        log(f"   3. 运行: python scrape_spotrac.py --csv {template.name}")
        log(f"\n   也可尝试直接访问以下 URL 手动复制数据:")
        for team_name, slug in TEAM_SLUGS.items():
            if not any(t["team_name"] == team_name and t["payroll"] > 0 for t in all_teams_data):
                log(f"     https://www.spotrac.com/nba/{slug}/yearly/cap/")


def main_from_csv(csv_path: str):
    """从 CSV 文件读取数据并输出 JSON。"""
    log(f"[CSV_MODE] 从 CSV 导入: {csv_path}")

    import csv
    teams_map = {}
    for team_name in TEAM_SLUGS:
        teams_map[team_name] = {"team_name": team_name, "payroll": 0, "players": []}

    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tn = row.get("team_name", "").strip()
            name = row.get("player_name", "").strip()
            salary_str = row.get("salary_2027", "").strip()
            if tn in teams_map and name and salary_str:
                salary = parse_salary_value(salary_str)
                teams_map[tn]["players"].append({"name": name, "salary": salary})

    all_teams = []
    for tn, data in teams_map.items():
        data["payroll"] = sum(p["salary"] for p in data["players"])
        all_teams.append(data)

    output = {
        "last_updated": date.today().isoformat(),
        "source": "CSV (manual import)",
        "teams": all_teams,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    log(f"[DONE] 已从 CSV 生成: {OUTPUT_PATH}")


if __name__ == "__main__":
    # 命令行参数: --csv <path> 使用 CSV 兜底模式
    if len(sys.argv) >= 3 and sys.argv[1] == "--csv":
        main_from_csv(sys.argv[2])
    else:
        main()

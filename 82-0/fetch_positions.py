"""
fetch_positions.py
===================
Fetch raw NBA player positions from nba_api for a list of [player_name, season] pairs.

Usage:
    python fetch_positions.py input.json          # read from file
    cat input.json | python fetch_positions.py    # read from stdin

Input JSON format (list of [player_name, season]):
    [
        ["Michael Jordan", "1995-96"],
        ["LeBron James", "2012-13"],
        ...
    ]

Output:
    - Prints a DataFrame summary to stdout
    - Saves results to 'player_positions_from_api.json'
"""

import json
import sys
import time
from typing import Optional

import pandas as pd
from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo

# ── Caches ──────────────────────────────────────────────────────────────
# Maps full_name → player_id (or None if not found)
_player_id_cache: dict[str, Optional[int]] = {}
# Maps player_id → raw position string
_position_cache: dict[int, str] = {}

# ── Rate limiting ───────────────────────────────────────────────────────
# nba_api recommends at least ~0.6 s between requests to avoid being throttled
_MIN_REQUEST_INTERVAL = 0.6
_last_request_time = 0.0


def _rate_limit() -> None:
    """Sleep if necessary to respect the minimum interval between API calls."""
    global _last_request_time
    elapsed = time.time() - _last_request_time
    if elapsed < _MIN_REQUEST_INTERVAL:
        time.sleep(_MIN_REQUEST_INTERVAL - elapsed)
    _last_request_time = time.time()


# ── Player ID lookup ────────────────────────────────────────────────────

def get_player_id(full_name: str) -> Optional[int]:
    """Return the NBA player ID for *full_name*.

    Results are cached in ``_player_id_cache`` so that repeated lookups
    for the same name are free.
    """
    if full_name in _player_id_cache:
        return _player_id_cache[full_name]

    _rate_limit()
    try:
        matches = players.find_players_by_full_name(full_name)
    except Exception as exc:
        print(f"  [ERROR] find_players_by_full_name failed for '{full_name}': {exc}",
              file=sys.stderr)
        _player_id_cache[full_name] = None
        return None

    if not matches:
        print(f"  [WARN] No player found for '{full_name}'")
        _player_id_cache[full_name] = None
        return None

    # If multiple matches, prefer the one whose TO_YEAR matches the requested
    # season — but as a fallback just pick the first result.
    pid = matches[0]['id']
    _player_id_cache[full_name] = pid
    return pid


# ── Position fetch ──────────────────────────────────────────────────────

def get_position(player_id: int, retries: int = 3) -> str:
    """Return the raw POSITION string for *player_id* via CommonPlayerInfo.

    The result is cached so repeated lookups for the same ID are instant.
    Returns ``"N/A"`` when the API returns empty data or on failure.
    """
    if player_id in _position_cache:
        return _position_cache[player_id]

    for attempt in range(1, retries + 1):
        _rate_limit()
        try:
            info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
            df = info.get_data_frames()[0]
            pos = df['POSITION'].iloc[0] if not df.empty else None
            pos = str(pos).strip() if pos and str(pos).strip() else "N/A"
            _position_cache[player_id] = pos
            return pos
        except Exception as exc:
            print(f"  [WARN] Attempt {attempt}/{retries} for player_id={player_id} failed: {exc}",
                  file=sys.stderr)
            if attempt < retries:
                delay = 2 ** attempt  # exponential backoff: 2, 4, 8 seconds
                time.sleep(delay)

    # All attempts exhausted
    _position_cache[player_id] = "N/A"
    return "N/A"


# ── Main ────────────────────────────────────────────────────────────────

def main() -> None:
    # --- Read input -----------------------------------------------------
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
        with open(input_path, 'r', encoding='utf-8') as f:
            input_data = json.load(f)
        print(f"Loaded {len(input_data)} entries from {input_path}")
    else:
        input_data = json.load(sys.stdin)
        print(f"Loaded {len(input_data)} entries from stdin")

    # --- Process each entry ---------------------------------------------
    results: list[dict[str, str]] = []

    for item in input_data:
        # Support both [name, season] list and {"player_name":..., "season":...} dict
        if isinstance(item, list) and len(item) >= 2:
            player_name, season = item[0], item[1]
        elif isinstance(item, dict):
            player_name = item.get('player_name') or item.get('name', '')
            season = item.get('season', '')
        else:
            print(f"  [WARN] Skipping unrecognised item: {item}")
            continue

        print(f"  Processing: {player_name} ({season}) ...", end='', flush=True)

        pid = get_player_id(player_name)
        if pid is None:
            print("  NOT FOUND")
            results.append({
                'player_name': player_name,
                'season': season,
                'position': 'N/A',
            })
            continue

        pos = get_position(pid)
        print(f"  player_id={pid}  position={pos}")
        results.append({
            'player_name': player_name,
            'season': season,
            'position': pos,
        })

    # --- Output ---------------------------------------------------------
    df = pd.DataFrame(results)

    print("\n" + "=" * 70)
    print(df.to_string(index=False))
    print("=" * 70)

    output_path = 'player_positions_from_api.json'
    df.to_json(output_path, orient='records', force_ascii=False, indent=2)
    print(f"\n✅ Results saved to {output_path}")
    print(f"   {len(df)} entries  |  "
          f"{df['position'].ne('N/A').sum()} found  |  "
          f"{(df['position'] == 'N/A').sum()} not found")


if __name__ == '__main__':
    main()

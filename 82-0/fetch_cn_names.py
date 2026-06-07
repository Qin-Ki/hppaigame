"""
Fetch Chinese names for NBA players using Wikipedia & Wikidata APIs.
Multi-phase batch approach:
  Phase 1: English Wikipedia interlanguage links (batch of 15)
  Phase 2: Wikidata search + batch label fetch
  Phase 3: Chinese Wikipedia direct search (fallback)

Saves progress to _cn_name_cache.json after each phase.
"""
import json
import time
import urllib.request
import urllib.parse
import sys

USER_AGENT = "NBADataCleaner/1.0 (python script)"
WIKIPEDIA_API_EN = "https://en.wikipedia.org/w/api.php"
WIKIPEDIA_API_ZH = "https://zh.wikipedia.org/w/api.php"
WIKIDATA_API = "https://www.wikidata.org/w/api.php"
CACHE_FILE = "_cn_name_cache.json"

def api_call(url, params, retries=3):
    """Make an API call with retries."""
    params["format"] = "json"
    full_url = url + "?" + urllib.parse.urlencode(params, doseq=True)
    for attempt in range(retries):
        try:
            req = urllib.request.Request(full_url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
                continue
            return None

def phase1_en_wikipedia(names):
    """Phase 1: Query English Wikipedia for interlanguage links to Chinese."""
    found = {}
    batch_size = 15
    total = len(names)
    for i in range(0, total, batch_size):
        batch = names[i:i+batch_size]
        params = {
            "action": "query",
            "titles": "|".join(batch),
            "prop": "langlinks",
            "lllang": "zh",
            "lllimit": 15,
        }
        result = api_call(WIKIPEDIA_API_EN, params)
        if result and "query" in result:
            normalized_map = {}
            normalized = result["query"].get("normalized", [])
            for norm in normalized:
                normalized_map[norm["to"]] = norm["from"]

            pages = result["query"].get("pages", {})
            for page_id, page_data in pages.items():
                if page_id == "-1":
                    continue
                langlinks = page_data.get("langlinks", [])
                if langlinks:
                    zh_title = langlinks[0]["*"]
                    wiki_title = page_data.get("title", "")
                    orig_name = normalized_map.get(wiki_title, wiki_title)
                    if orig_name in names:
                        found[orig_name] = zh_title
        if (i // batch_size + 1) % 20 == 0:
            print(f"  Phase 1 progress: {i+batch_size}/{total} (found {len(found)})")
        time.sleep(0.5)
    return found

def phase2_wikidata(names):
    """Phase 2: Search Wikidata and get Chinese labels."""
    # Step 1: Search each name individually
    name_to_qid = {}
    total = len(names)
    for idx, name in enumerate(names):
        params = {
            "action": "wbsearchentities",
            "search": name,
            "language": "en",
            "limit": 1,
        }
        result = api_call(WIKIDATA_API, params)
        if result and "search" in result and result["search"]:
            name_to_qid[name] = result["search"][0]["id"]
        if (idx + 1) % 50 == 0:
            print(f"  Phase 2 search: {idx+1}/{total} (found QIDs: {len(name_to_qid)})")
        time.sleep(0.3)

    # Step 2: Batch get Chinese labels
    found = {}
    qid_to_name = {v: k for k, v in name_to_qid.items()}
    all_qids = list(qid_to_name.keys())
    batch_size = 50

    for i in range(0, len(all_qids), batch_size):
        batch_qids = all_qids[i:i+batch_size]
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch_qids),
            "props": "labels",
            "languages": "zh",
        }
        result = api_call(WIKIDATA_API, params)
        if result and "entities" in result:
            for qid, entity in result["entities"].items():
                labels = entity.get("labels", {})
                if "zh" in labels and labels["zh"]["value"]:
                    orig_name = qid_to_name[qid]
                    found[orig_name] = labels["zh"]["value"]
        time.sleep(0.5)

    return found

def phase3_zh_wikipedia(names):
    """Phase 3: Search Chinese Wikipedia directly."""
    found = {}
    total = len(names)
    for idx, name in enumerate(names):
        params = {
            "action": "query",
            "list": "search",
            "srsearch": f'"{name}" NBA',
            "srlimit": 5,
            "srprop": "",
        }
        result = api_call(WIKIPEDIA_API_ZH, params)
        if result and "query" in result:
            search_results = result["query"].get("search", [])
            for sr in search_results:
                title = sr["title"]
                if any("\u4e00" <= ch <= "\u9fff" for ch in title):
                    found[name] = title
                    break
        if (idx + 1) % 50 == 0:
            print(f"  Phase 3 progress: {idx+1}/{total} (found {len(found)})")
        time.sleep(0.3)
    return found

def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

def load_cache():
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def main():
    # Load the NBA data
    with open("nba.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    # Collect unique player names needing Chinese names
    players_needed = []
    seen = set()
    for item in data:
        c = item.get("cname", "")
        if not c or not any("\u4e00" <= ch <= "\u9fff" for ch in str(c)):
            name = item["player"]
            if name not in seen:
                seen.add(name)
                players_needed.append(name)

    total = len(players_needed)
    print(f"Need to find Chinese names for {total} unique players")

    # Load cache
    cache = load_cache()
    cached_count = sum(1 for v in cache.values() if v is not None)
    total_cached = len(cache)
    print(f"Cache: {total_cached} entries ({cached_count} with names)")

    # Filter to uncached names
    uncached = [n for n in players_needed if n not in cache]
    print(f"Uncached: {len(uncached)}")

    if not uncached:
        print("All names already cached, skipping API calls...")
    else:
        # Phase 1: English Wikipedia
        print(f"\n{'='*60}")
        print(f"Phase 1: English Wikipedia interlanguage links ({len(uncached)} names)")
        print(f"{'='*60}")
        p1_results = phase1_en_wikipedia(uncached)
        for name, zh in p1_results.items():
            cache[name] = zh
        save_cache(cache)
        p1_found = len(p1_results)
        print(f"  Phase 1 complete: found {p1_found} names")

        remaining_1 = [n for n in uncached if n not in cache]
        print(f"  Remaining: {len(remaining_1)}")

        # Phase 2: Wikidata
        if remaining_1:
            print(f"\n{'='*60}")
            print(f"Phase 2: Wikidata search ({len(remaining_1)} names)")
            print(f"{'='*60}")
            p2_results = phase2_wikidata(remaining_1)
            for name, zh in p2_results.items():
                cache[name] = zh
            save_cache(cache)
            p2_found = len(p2_results)
            print(f"  Phase 2 complete: found {p2_found} names")

            remaining_2 = [n for n in remaining_1 if n not in cache]
            print(f"  Remaining: {len(remaining_2)}")

            # Phase 3: Chinese Wikipedia
            if remaining_2:
                print(f"\n{'='*60}")
                print(f"Phase 3: Chinese Wikipedia search ({len(remaining_2)} names)")
                print(f"{'='*60}")
                p3_results = phase3_zh_wikipedia(remaining_2)
                for name, zh in p3_results.items():
                    cache[name] = zh
                save_cache(cache)
                p3_found = len(p3_results)
                print(f"  Phase 3 complete: found {p3_found} names")

                remaining_3 = [n for n in remaining_2 if n not in cache]
                print(f"  Remaining (set to null): {len(remaining_3)}")

                # Set remaining to null
                for name in remaining_3:
                    cache[name] = None

        # Final save
        save_cache(cache)
        print(f"\nCache saved with {len(cache)} entries")

    # Update the JSON data
    updated_count = 0
    for item in data:
        c = item.get("cname", "")
        if not c or not any("\u4e00" <= ch <= "\u9fff" for ch in str(c)):
            name = item["player"]
            cn = cache.get(name)
            item["cname"] = cn
            updated_count += 1

    # Save updated JSON
    with open("nba.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"Done! Updated {updated_count} entries in nba.json")
    success = sum(1 for v in cache.values() if v is not None)
    failed = sum(1 for v in cache.values() if v is None)
    print(f"  Found Chinese names: {success}")
    print(f"  Set to null: {failed}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Beech Street Lofts -- FF Availability Sync
Scrapes availability dates from Furnished Finder via Firecrawl,
updates lib/constants.ts, then triggers a Vercel redeploy.

Runs daily via Hermes cron.
"""

import re
import sys
import json
import subprocess
import urllib.request

SITE_DIR = "/Users/bobbie/Projects/beech-street-lofts"
CONSTANTS_PATH = f"{SITE_DIR}/lib/constants.ts"

UNITS = [
    {"slug": "13d", "ff_url": "https://www.furnishedfinder.com/property/765838_1"},
    {"slug": "7c",  "ff_url": "https://www.furnishedfinder.com/property/765838_3"},
    {"slug": "7d",  "ff_url": "https://www.furnishedfinder.com/property/765838_2"},
]

MONTH_MAP = {
    "Jan.": "January", "Feb.": "February", "Mar.": "March",
    "Apr.": "April",   "Jun.": "June",     "Jul.": "July",
    "Aug.": "August",  "Sept.": "September","Oct.": "October",
    "Nov.": "November","Dec.": "December",
}

def get_api_key():
    return subprocess.check_output(
        "grep FIRECRAWL_API_KEY ~/.openclaw/workspace/.env | head -1 | cut -d= -f2-",
        shell=True, text=True
    ).strip()

def firecrawl_scrape(url, api_key):
    req = urllib.request.Request(
        "https://api.firecrawl.dev/v1/scrape",
        data=json.dumps({"url": url, "formats": ["markdown"]}).encode(),
        method="POST"
    )
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def normalize_date(raw):
    for abbr, full in MONTH_MAP.items():
        if raw.startswith(abbr):
            return raw.replace(abbr, full, 1)
    return raw

def fetch_availability(ff_url, api_key):
    result = firecrawl_scrape(ff_url, api_key)
    md = result.get("data", {}).get("markdown", "")
    match = re.search(r'Available[:\s]+([A-Za-z]+\.?\s+\d{1,2},\s+\d{4})', md)
    if match:
        return normalize_date(match.group(1).strip())
    return None

def update_constants(updates):
    with open(CONSTANTS_PATH, "r") as f:
        content = f.read()

    original = content

    for slug, date in updates.items():
        pattern = r'(slug:\s*"' + slug + r'".*?available:\s*")[^"]*(")'
        replacement = rf'\g<1>{date}\g<2>'
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content
            print(f"  Updated {slug}: {date}")
        else:
            print(f"  [WARN] Could not find slug {slug} in constants.ts")

    if content != original:
        with open(CONSTANTS_PATH, "w") as f:
            f.write(content)
        return True
    return False

def redeploy():
    print("  Triggering Vercel redeploy...")
    result = subprocess.run(
        ["npx", "vercel", "--prod"],
        cwd=SITE_DIR,
        capture_output=True,
        text=True,
        timeout=180
    )
    if result.returncode == 0:
        print("  Redeploy successful.")
    else:
        print(f"  [ERROR] Redeploy failed:\n{result.stderr[:500]}")
    return result.returncode == 0

def main():
    print("Beech Street Lofts -- FF Availability Sync")
    print("=" * 45)

    api_key = get_api_key()
    updates = {}

    for unit in UNITS:
        print(f"\nFetching {unit['slug']}...")
        try:
            date = fetch_availability(unit["ff_url"], api_key)
            if date:
                print(f"  Found: {date}")
                updates[unit["slug"]] = date
            else:
                print(f"  [WARN] No date found -- skipping")
        except Exception as e:
            print(f"  [ERROR] {e}")

    if not updates:
        print("\nNo dates found. Nothing to update.")
        sys.exit(0)

    print(f"\nUpdating constants.ts with {len(updates)} date(s)...")
    changed = update_constants(updates)

    if changed:
        print("\nRedeploying site...")
        redeploy()
    else:
        print("\nNo changes -- skipping redeploy.")

    print("\nDone.")

if __name__ == "__main__":
    main()

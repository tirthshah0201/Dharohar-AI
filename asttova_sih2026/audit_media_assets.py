"""
Astrova Media Asset Audit Script
Checks every media URL from migrations against actual files on disk.
"""
import os
import re
import sys

# Paths to check
FRONTEND_PUBLIC = "frontend/public"
BACKEND_UPLOADS = "backend/uploads/heritage"

# Parse media URLs from migration files
def parse_media_inserts(migration_file):
    """Extract media URLs from SQL migration files."""
    media_records = []
    with open(migration_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all INSERT INTO media statements with URL
    # Pattern: '/assets/heritage/filename.ext'
    pattern = r"'(/assets/heritage/[^']+)'"
    urls = re.findall(pattern, content)
    
    # Also find entity slugs
    slug_pattern = r"he\.slug = '([^']+)'"
    slugs = re.findall(slug_pattern, content)
    
    return urls, slugs

def check_file_exists(url):
    """Check if a file exists at the given URL path."""
    # The URL is like /assets/heritage/file.jpg
    # The file is in frontend/public/assets/heritage/file.jpg
    relative_path = url.lstrip('/')
    full_path = os.path.join(os.getcwd(), 'frontend/public', relative_path)
    return os.path.exists(full_path), full_path

def get_all_heritage_files():
    """Get all files in the heritage assets directory."""
    heritage_dir = os.path.join(FRONTEND_PUBLIC, "assets/heritage")
    if os.path.exists(heritage_dir):
        return set(os.listdir(heritage_dir))
    return set()

def main():
    print("=" * 80)
    print("ASTROVA MEDIA ASSET AUDIT")
    print("=" * 80)
    
    # Get all files on disk
    heritage_files = get_all_heritage_files()
    print(f"\nFiles in frontend/public/assets/heritage/: {len(heritage_files)}")
    
    # Parse media records from all migration files
    migration_files = [
        "database/migrations/011_p1_entity_media_relationships.sql",
        "database/migrations/012_p1_content_discovery.sql",
        "database/migrations/013_p1_content_enrichment.sql",
        "database/migrations/015_p1_advanced_discovery.sql",
        "database/migrations/016_p1_media_discovery.sql",
        "database/migrations/018_p1_cultural_media_timeline.sql",
    ]
    
    all_media_urls = []
    for mf in migration_files:
        if os.path.exists(mf):
            urls, slugs = parse_media_inserts(mf)
            all_media_urls.extend(urls)
            print(f"\n{mf}:")
            print(f"  Media URLs found: {len(urls)}")
    
    # Deduplicate URLs
    unique_urls = list(set(all_media_urls))
    print(f"\nTotal unique media URLs in migrations: {len(unique_urls)}")
    
    # Check each URL
    print("\n" + "=" * 80)
    print("MEDIA URL VERIFICATION")
    print("=" * 80)
    
    present = []
    missing = []
    
    for url in sorted(unique_urls):
        exists, full_path = check_file_exists(url)
        filename = os.path.basename(url)
        
        if exists:
            present.append((url, filename))
        else:
            missing.append((url, filename))
    
    print(f"\nPRESENT: {len(present)}")
    print(f"MISSING: {len(missing)}")
    
    if missing:
        print("\n" + "-" * 80)
        print("MISSING ASSETS:")
        print("-" * 80)
        for url, filename in missing:
            print(f"  {url}")
    
    # Check for files not referenced in migrations
    print("\n" + "=" * 80)
    print("FILES ON DISK NOT IN MIGRATIONS")
    print("=" * 80)
    
    referenced_filenames = {os.path.basename(url) for url in unique_urls}
    unreferenced = heritage_files - referenced_filenames
    
    if unreferenced:
        for f in sorted(unreferenced):
            print(f"  {f}")
    else:
        print("  None")

if __name__ == "__main__":
    main()

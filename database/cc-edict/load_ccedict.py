"""
Original Source https://github.com/marcanuy/cedict_utils
"""

import os
import urllib.request
import zipfile
import io
import json
import sqlite3
from datetime import datetime, timezone

BASE_PATH = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_PATH, "data")
CEDICT_PATH = os.path.join(DATA_DIR, "cedict_ts.u8")

def download_new_ccedict(dest_path=None):
    url = "https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.zip"
    default_path = os.path.join(os.path.dirname(__file__), "data", "cedict_ts.u8")
    dest_path = dest_path or default_path

    print(f"[INFO] Downloading latest CC-CEDICT ZIP from {url}...")

    try:
        # Download and unzip in memory
        response = urllib.request.urlopen(url)
        zip_data = response.read()
        with zipfile.ZipFile(io.BytesIO(zip_data)) as zip_file:
            for name in zip_file.namelist():
                if name.endswith(".u8"):
                    print(f"[INFO] Extracting {name} to {dest_path}")
                    with zip_file.open(name) as source, open(dest_path, "wb") as target:
                        target.write(source.read())
                    print("[SUCCESS] CC-CEDICT updated.")
                    return
        print("[ERROR] Couldn't find .u8 file in the ZIP archive.")
    except Exception as e:
        print(f"[ERROR] Download failed: {e}")


class CedictParser:
    """Parser class. Reads a cedict file and returns a list of CedictEntry instances."""

    filters = ["_filter_comments", "_filter_new_lines", "_filter_empty_entries"]

    def __init__(self, lines=None, file_path=None, lines_count=None):
        self.lines = lines or []
        self.lines_count = lines_count

        target_path = file_path or CEDICT_PATH
        print(f"[DEBUG] Reading from path: {target_path}")
        self.read_file(target_path)

    def read_file(self, file_path):
        """Read and sanitize the cedict file."""
        with io.open(file_path, "r", encoding="utf-8") as file_handler:
            self.lines = file_handler.readlines()
            self._sanitize()

    def _sanitize(self):
        from operator import methodcaller
        for fun in self.filters:
            methodcaller(fun)(self)

    def _filter_comments(self):
        self.lines = [line for line in self.lines if not line.startswith("#")]

    def _filter_new_lines(self):
        self.lines = [line.rstrip("\n") for line in self.lines]

    def _filter_empty_entries(self):
        self.lines = [line for line in self.lines if line.strip()]

    def parse(self):
        """Parse cedict lines and return CedictEntry items."""
        result = []
        for line in self.lines if self.lines_count is None else self.lines[:self.lines_count]:
            entry = CedictEntry.make(line)
            result.append(entry)
        return result


class CedictEntry:
    """A representation of a cedict entry."""

    def __init__(self, **kwargs):
        self.traditional = kwargs.get("traditional", "")
        self.simplified = kwargs.get("simplified", "")
        self.pinyin = kwargs.get("pinyin", "")
        self.meanings = kwargs.get("meanings", "")
        self.raw_line = kwargs.get("raw_line", "")

    @classmethod
    def make(cls, line):
        """Generate an entry from a cedict line."""
        hanzis = line.partition("[")[0].split(" ", 1)
        return cls(
            traditional=hanzis[0].strip(),
            simplified=hanzis[1].strip(),
            pinyin=line.partition("[")[2].partition("]")[0],
            meanings=line.partition("/")[2].replace('"', "'").rstrip("/").strip().split("/"),
            raw_line=line,
        )

    def __str__(self):
        return "{} ({}) - {}".format(self.simplified, self.traditional, self.pinyin)



if __name__ == "__main__":
    from time import time

    download_new_ccedict(os.path.join(os.path.dirname(__file__), "data", "cedict_ts.u8"))
    parser = CedictParser()
    entries = parser.parse()

    con = sqlite3.connect("../database.sqlite")
    cur = con.cursor()

    # Speed up bulk insert
    cur.execute("PRAGMA journal_mode=WAL")
    cur.execute("PRAGMA synchronous=OFF")
    cur.execute("PRAGMA temp_store=MEMORY")

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    # Purge old entries
    print("[INFO] Deleting old dictionary entries...")
    cur.execute("DELETE FROM dictionary WHERE source = 'CC-CEDICT'")

    success_count = 0
    fail_count = 0

    print("[INFO] Inserting new entries...")
    start_time = time()
    failed_entries = []

    try:
        with con:  # Single transaction
            for i, e in enumerate(entries, 1):
                try:
                    cur.execute(
                        """
                        INSERT INTO dictionary (traditional, simplified, pinyin, definitions, created_at, updated_at, source)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        """,
                        (
                            e.traditional,
                            e.simplified,
                            e.pinyin,
                            json.dumps(e.meanings, ensure_ascii=False),
                            now,
                            now,
                            "CC-CEDICT"
                        )
                    )
                    success_count += 1
                except Exception as entry_error:
                    fail_count += 1
                    print(f"[WARN] Failed to insert entry {i}: {entry_error}")
                    print(f"       Line: {e.raw_line.strip()}")
                    failed_entries.append({
                        "index": i,
                        "error": str(entry_error),
                        "traditional": e.traditional,
                        "simplified": e.simplified,
                        "pinyin": e.pinyin,
                        "meanings": e.meanings,
                        "raw_line": e.raw_line.strip()
                    })
    except Exception as db_error:
        print(f"[ERROR] Bulk insert failed: {db_error}")
        con.rollback()
    finally:
        con.close()

    if failed_entries:
        log_path = os.path.join(BASE_PATH, "cedict_failed_entries.json")
        with open(log_path, "w", encoding="utf-8") as log_file:
            json.dump(failed_entries, log_file, ensure_ascii=False, indent=2)
        print(f"[WARN] Logged {fail_count} failed entries to {log_path}")

    elapsed = time() - start_time
    print(f"[DONE] Inserted {success_count} entries ({fail_count} failed) in {elapsed:.2f}s.")


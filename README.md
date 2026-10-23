# NoMad's Farm

MkDocs site for the current NoMad's Farm operating structure.

## Active site

```text
docs/
├── index.md
├── seeds/
├── seedlings/
├── plant-database/
├── blog/
├── about/
└── assets/
    ├── css/
    ├── js/
    ├── data/
    └── images/
```

Everything from the previous documentation tree that is not required by the current site is preserved under `OLD/docs/`. It is intentionally outside the MkDocs `docs/` directory and is not part of the active build.

## Local preview

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build
```

"""Create the landing-page-only publication folder. No third-party packages needed."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'dist'
FILES = {
    'index.html': 'coming-soon.html',
    'styles.css': 'styles.css',
    'editorial.css': 'editorial.css',
    'script.js': 'script.js',
    'assets/prelaunch-bedroom-v2.png': 'assets/prelaunch-bedroom-v2.png',
}


def main() -> None:
    """Copy the explicit public allowlist, rejecting unexpected output files."""
    if OUTPUT.is_symlink():
        raise SystemExit('Refusing to write through a dist symlink.')
    if OUTPUT.exists():
        for path in OUTPUT.rglob('*'):
            if path.is_symlink():
                raise SystemExit(f'Refusing symlink in publication folder: {path}')
            if path.is_file() and path.relative_to(OUTPUT).as_posix() not in FILES:
                raise SystemExit(f'Unexpected file in dist: {path}. Move it out before publishing.')
    source = (ROOT / 'coming-soon.html').read_text(encoding='utf-8')
    if '_studio' in source or 'preview.html' in source:
        raise SystemExit('The public page must not link to studio previews.')
    for target, original in FILES.items():
        destination = OUTPUT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / original, destination)
    # Keep the root local landing-page preview in sync with the publishing source.
    (ROOT / 'index.html').write_text(source, encoding='utf-8')
    print('Public site built in dist/ (5 files). Store drafts were excluded.')
    print('Preview: python -m http.server 8001 --directory dist --bind 127.0.0.1')


if __name__ == '__main__':
    main()

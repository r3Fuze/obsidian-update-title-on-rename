# Update Title on Rename

Keeps the frontmatter `title` property in sync when you rename a file, but only if the title matches the previous filename, so custom titles are left alone.

## Installation

### BRAT

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) from the community plugins
2. Open **Settings → BRAT** and select **Add beta plugin**
3. Enter `https://github.com/r3Fuze/obsidian-update-title-on-rename`
4. Enable the plugin in **Settings → Community plugins**

### Manual

Download `main.js` and `manifest.json` from the [latest release](https://github.com/r3Fuze/obsidian-update-title-on-rename/releases/latest) and place them in `<vault>/.obsidian/plugins/update-title-on-rename/`.

## Settings

| Setting | Default | Description |
|---|---|---|
| Title property name | `title` | Frontmatter key used to store the file title |
| Add title to frontmatter | off | Adds the title to frontmatter on rename, if no title exists |
| Always update the title | off | Updates the title even if it doesn't match the previous filename. Overwrites custom titles |

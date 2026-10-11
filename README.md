# 🎧 apple-music-ru-blocklist

**English** · [Українська](README.uk.md)

A blocklist of **Russian and Russian-language music** for **Apple Music**. It comes with a script that marks these tracks as **"Suggest Less"** (dislike) in your own account. Run it yourself or let an AI browser agent run it for you. After that, Apple Music recommends them to you far less often: in For You, radio, Discovery Station and autoplay.

Apple Music has no "block artist" button. A dislike on a track is the strongest signal you can send, so this project applies that signal at scale: up to 50 top songs of every listed artist.

| | |
|---|---|
| Artists | **3,612** (1,033 core + 2,579 found via "similar artists") |
| Tracks in catalog | **98,496** |
| Snapshot date | 2026-10-11 (Apple Music storefront `ua`) |

## What's inside

```
data/
  artists.csv        Apple Music artist id, name, group (core / similar), genres
  songs.csv          Apple Music song id, title, artist, album, ISRC, artist id
  catalog.json       the same data in one JSON file
scripts/
  block.js           paste into the console on music.apple.com — dislikes all tracks
  block-core.js      same, but only the 1,033 core artists (smaller, faster)
  unblock.js         undo: removes these dislikes again
docs/
  AI-AGENT-GUIDE.md  step-by-step for Claude, ChatGPT Agent, Comet and other browser agents
  METHODOLOGY.md     how the list was built and what the limits are
```

## Quick start (5 minutes, no AI needed)

1. Open **https://music.apple.com** in Chrome, Edge, Safari or Firefox on a computer, and **sign in**.
2. Open the developer console: **Cmd + Option + J** on Mac, **Ctrl + Shift + J** on Windows. In Safari, first enable *Settings → Advanced → Show features for web developers*.
3. Open [`scripts/block.js`](scripts/block.js), click **Raw**, copy everything (Cmd/Ctrl + A, Cmd/Ctrl + C).
4. Paste it into the console and press **Enter**. If the browser asks you to type `allow pasting`, type it and paste again.
5. Keep the tab open. Progress appears in the console and is saved, so if you close the tab you can paste the script again and it continues where it stopped.
6. To start over from scratch later, for example after the list is updated, run `localStorage.removeItem('amru_progress_v1')` in the console first.

> ⏱ A full run takes several hours, because Apple **silently stops saving ratings** after a few tens of thousands of writes. The script notices this, pauses for 30 minutes and retries. Start with `block-core.js` if you're in a hurry.

## Using an AI agent

You can hand the whole job to a browser agent: Claude in Chrome, Claude Cowork, ChatGPT Agent, Perplexity Comet and others. See **[docs/AI-AGENT-GUIDE.md](docs/AI-AGENT-GUIDE.md)** for a ready-to-copy prompt.

## Is it safe?

- The script runs **only on music.apple.com** and talks **only to Apple's own API**. Your login tokens never leave the page.
- It changes **one thing**: it sets the rating of catalog songs to "dislike". It doesn't delete your library, playlists or history.
- You can undo it any time with [`scripts/unblock.js`](scripts/unblock.js).
- Read the code before running it. It's short.

## Limits and honesty

- **This list is assembled automatically and is not perfect.** It was built from Apple Music's Russian charts and editorial playlists. It was then expanded through "similar artists", keeping only artists whose track titles are in Russian (Cyrillic, no Ukrainian letters). Ukrainian, Kazakh, Kyrgyz, Belarusian-language, Serbian, Georgian and Western artists were filtered out, and a manual review removed obvious mistakes. Some errors certainly remain. Please [open an issue](../../issues) or a PR.
- **Russian-language songs by Ukrainian artists are not included.** We left whole Ukrainian artists out on purpose. Block those songs yourself if you want.
- The list includes Soviet-era recordings: film music, children's choirs, estrada.
- Apple Music changes its catalog and IDs over time. Refresh the list periodically.
- Apple's rating limit applies per account, so blocking everything can take a day or two.

## Contributing

PRs are welcome:

- false positives → remove the line from `data/artists.csv` and explain why;
- missing artists → add the Apple Music artist ID and name.

Then regenerate the scripts with `python3 tools/build.py`.

## License

Data: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) · Code: [MIT](LICENSE)

Artist and track names are factual catalog metadata from Apple Music. This project is not affiliated with Apple.

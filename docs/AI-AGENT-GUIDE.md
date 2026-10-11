# 🤖 AI-agent guide · Інструкція для AI-агентів

[English](#english) · [Українська](#українська)

---

## English

Any browser agent that can **open a web page and run JavaScript on it** can apply the blocklist for you. For example: Claude in Chrome, Claude Cowork with its built-in browser, ChatGPT Agent, Perplexity Comet, Browser Use or Playwright MCP.

### Before you start

1. Sign in to **https://music.apple.com** yourself, in the browser the agent will control. Never give your Apple ID password to an agent.
2. Keep the computer awake. A full run takes hours because Apple throttles ratings.

### Which file to give the agent

- **Agents with a size limit per script call** (most of them) should use the small chunk files in [`scripts/chunks/`](../scripts/chunks). Each has ~200 artists and runs on its own. Progress is shared, so the order doesn't matter.
- **Agents that can paste large text** can use [`scripts/block.js`](../scripts/block.js) in one go.

### Prompt to copy

> I'm signed in to Apple Music at https://music.apple.com in this browser. Please apply the blocklist from https://github.com/robert-hromej/apple-music-ru-blocklist.
>
> 1. Open https://music.apple.com and check that I'm signed in. If I'm not, stop and ask me to sign in. Never type passwords.
> 2. For each file in `scripts/chunks/` (block-part-01.js, block-part-02.js, …):
>    - read its raw content from GitHub;
>    - run it on the music.apple.com tab with your JavaScript tool, or paste it into DevTools → Console;
>    - wait until the console prints `[amru] Done`. Each chunk takes a few minutes.
> 3. If the console says Apple is not saving ratings, let the script pause by itself. Don't restart it.
> 4. When all chunks are done, tell me how many tracks were rated in total.
>
> Only run these scripts on music.apple.com. Don't change anything else in my account.

### Notes for agent developers

- The page's Content-Security-Policy blocks `fetch` to GitHub from music.apple.com. Fetch the script text with your own tool, then evaluate it in the page.
- The scripts use `MusicKit.getInstance()` tokens and call `PUT /v1/me/ratings/songs/{id}` with `{"type":"rating","attributes":{"value":-1}}`.
- Apple returns `200` even when it silently drops a rating after heavy use. The scripts re-read ratings to check whether they were saved. If fewer than half persisted, they back off for 30 minutes.
- Progress key: `localStorage['amru_progress_v1']`, or `amru_part_XX` for the chunk files.

---

## Українська

Набір може застосувати будь-який агент, що вміє **відкрити сторінку в браузері й виконати на ній JavaScript**. Наприклад: Claude in Chrome, Claude Cowork з вбудованим браузером, ChatGPT Agent, Perplexity Comet, Browser Use чи Playwright MCP.

### Перед початком

1. Самостійно увійдіть на **https://music.apple.com** у браузері, яким керуватиме агент. Ніколи не давайте агенту пароль від Apple ID.
2. Не давайте комп'ютеру заснути. Повний прогін триває години, бо Apple обмежує кількість позначок.

### Який файл дати агенту

- **Агентам з обмеженням на розмір скрипта** (таких більшість) — маленькі файли з [`scripts/chunks/`](../scripts/chunks). У кожному ~200 виконавців, кожен працює сам по собі. Прогрес спільний, тож порядок не важливий.
- **Агентам, які можуть вставити великий текст** — [`scripts/block.js`](../scripts/block.js) одним шматком.

### Промпт для копіювання

> Я ввійшов в Apple Music на https://music.apple.com у цьому браузері. Застосуй, будь ласка, блок-лист з https://github.com/robert-hromej/apple-music-ru-blocklist.
>
> 1. Відкрий https://music.apple.com і перевір, що я ввійшов. Якщо ні — зупинись і попроси мене увійти. Ніколи не вводь паролі.
> 2. Для кожного файлу в `scripts/chunks/` (block-part-01.js, block-part-02.js, …):
>    - прочитай його raw-вміст з GitHub;
>    - виконай його на вкладці music.apple.com своїм інструментом для JavaScript або встав у DevTools → Console;
>    - дочекайся в консолі рядка `[amru] Done`. Кожна частина займає кілька хвилин.
> 3. Якщо в консолі написано, що Apple не зберігає оцінки, дай скрипту самому зробити паузу. Не перезапускай його.
> 4. Коли всі частини завершено, скажи, скільки треків позначено загалом.
>
> Запускай ці скрипти лише на music.apple.com. Нічого іншого в моєму акаунті не змінюй.

### Для розробників агентів

- Content-Security-Policy сторінки блокує `fetch` до GitHub з music.apple.com. Отримайте текст скрипта своїм інструментом, а потім виконайте його на сторінці.
- Скрипти беруть токени з `MusicKit.getInstance()` і викликають `PUT /v1/me/ratings/songs/{id}` з тілом `{"type":"rating","attributes":{"value":-1}}`.
- Після великої кількості позначок Apple відповідає `200`, але мовчки не зберігає оцінку. Тому скрипти перечитують оцінки й перевіряють, чи вони збереглися. Якщо збереглося менше половини, вони чекають 30 хвилин.
- Ключ прогресу: `localStorage['amru_progress_v1']` або `amru_part_XX` для файлів-частин.

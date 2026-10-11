# Methodology · Методологія

## English

**1. Seeds: Russian charts and editorial playlists in Apple Music (storefront `ua`)**

- Top 100: Russia; Top Songs of 2019–2024: Russia; Top 25: Moscow and Saint Petersburg.
- Apple's Russian editorial playlists: Hits/Pop/Rock/Hip-Hop/Indie in Russian, '80s–2010s Russian Pop/Rock/Chanson/Love Songs, artist Essentials (Kino, Splean, Zemfira, Mashina Vremeni, Leningrad, Zivert, JONY, MORGENSHTERN, Max Korzh, PHARAOH…), Russian chanson and children's music.
- From the charts, a track counts only if its title is Cyrillic without Ukrainian letters (і ї є ґ), or its artist is already known as Russian.

Every artist on these tracks became a **core** artist (`group = core`).

**2. Exclusions.** We removed Ukrainian artists, including ones who also sing in Russian (MAX BARSKIH, LOBODA, MONATIK, Ani Lorak, Jamala, Boombox, KAZKA and others). We also removed Moldovan, Latvian, Kazakh, Azerbaijani, Georgian and Western artists who appeared on those charts.

**3. Expansion.** We pulled "similar artists" for every core artist. A candidate was kept (`group = similar`) only if, among its top 25 song titles:

- there are **no** Ukrainian letters (і ї є ґ);
- there are **no** Kazakh, Kyrgyz, Mongolian or Belarusian letters (ә ғ қ ң ө ұ ү һ ў) and **no** Serbian ones (ђ ј љ њ ћ џ);
- **at least 3** titles are in Cyrillic, or at least 1 if the candidate was "similar" to two or more core artists.

**4. Manual review.** We read the whole list of names and removed obvious mistakes, for example Sofia Rotaru, Vakhtang Kikabidze, Smerichka, Paul Mauriat's orchestra, Serbian and Kazakh acts.

**5. Tracks.** For each artist we took up to 50 top songs and skipped any title containing Ukrainian letters.

### Known limits

- The language test uses titles only, not lyrics.
- Latin-titled Russian artists, such as some rappers and electronic acts, are found only when they appear in the seed playlists.
- Soviet recordings are included.
- IDs and catalogs differ slightly between storefronts. The scripts use your storefront when they fetch top songs.

## Українська

**1. Основа.** Російські чарти й редакційні плейлисти Apple Music (магазин `ua`):

- Top 100: Russia; Top Songs 2019–2024: Russia; Top 25: Москва й Петербург.
- Редакційні російські добірки Apple: Hits/Pop/Rock/Hip-Hop/Indie in Russian, російський поп, рок, шансон і пісні про кохання 80-х–2010-х, Essentials окремих виконавців, шансон, дитяча музика.
- З чартів брали трек лише тоді, коли його назва кирилицею без українських літер, або коли виконавець уже відомий як російський.

Усі виконавці цих треків — **core**.

**2. Виключення.** Прибрали українських виконавців, зокрема тих, хто співає й російською. Також прибрали молдовських, латвійських, казахських, азербайджанських, грузинських і західних виконавців, що потрапили в ці чарти.

**3. Розширення.** Для кожного core-виконавця взяли «схожих виконавців». Кандидата залишали (`similar`) лише тоді, коли серед 25 назв його топ-треків:

- **немає** українських літер (і ї є ґ);
- **немає** казахських, киргизьких, монгольських, білоруських (ә ғ қ ң ө ұ ү һ ў) і сербських (ђ ј љ њ ћ џ) літер;
- **щонайменше 3** назви кирилицею, або 1, якщо кандидат «схожий» на двох і більше core-виконавців.

**4. Ручна перевірка.** Переглянули весь перелік імен і прибрали очевидні помилки: Ротару, Кікабідзе, «Смерічку», оркестр Поля Моріа, сербських і казахських виконавців.

**5. Треки.** Для кожного виконавця взяли до 50 топ-треків, пропускаючи назви з українськими літерами.

### Відомі обмеження

- Мову визначено за назвами, а не за текстами пісень.
- Російських виконавців з латинськими назвами треків (частину реперів, електроніку) знайдено лише тоді, коли вони є в базових плейлистах.
- Радянські записи включено.
- Ідентифікатори й каталоги трохи відрізняються між країнами. Скрипти беруть топ-треки з вашого магазину.

/*!
 * apple-music-ru-blocklist — block.js
 * Marks tracks of artists from the blocklist as "Suggest Less" (dislike, rating = -1)
 * in YOUR Apple Music account, using the official Apple Music web player session.
 *
 * HOW TO RUN
 *   1. Open https://music.apple.com in a desktop browser and sign in.
 *   2. Open DevTools → Console (Cmd+Opt+J / Ctrl+Shift+J).
 *   3. Paste the whole file and press Enter.  (Or ask an AI browser agent to do it — see docs/.)
 *
 * The script never sends your tokens anywhere except Apple's own API (amp-api.music.apple.com).
 * Progress is saved in localStorage, so you can reload the page and paste again to resume.
 *
 * Generated: 2026-10-11   Artists in this file: 200
 */
(async () => {
  'use strict';

  // ───────────── settings ─────────────
  const CONFIG = {
    groups: ['core', 'similar'], // 'core' = confirmed Russian artists, 'similar' = found via "similar artists" + language check
    songsPerArtist: 50,          // top songs per artist (max 50)
    concurrency: 3,              // parallel rating requests (keep low)
    verifyEvery: 100,            // re-check that ratings really persisted
    pauseOnThrottleMin: 30,      // Apple silently drops writes after many ratings — wait and retry
    dryRun: false,               // true = only count, do not rate
  };
  // ────────────────────────────────────

  const ARTISTS = [["1365405785","ДЭЛС","similar"],["1693374883","Дюна, Наталья Сенчукова","similar"],["1225829899","Дёргать!","similar"],["881208276","Ева Амурова","similar"],["1838937410","Ева Ланская","similar"],["722650240","Ева Синельникова","similar"],["1340932185","Евгений Выставкин","similar"],["657647903","Евгений Коновалов","similar"],["1498250837","Евгений Путилов","similar"],["1374929609","Евгения Майер","similar"],["1196473299","ЕГОР НАТС","similar"],["1472506909","Егор Попс","similar"],["1508422590","ЕГОР ШИП","similar"],["1233339110","Ежемесячные","similar"],["1269370734","Екатерина Яшникова","similar"],["855214169","Елена Войнаровская","similar"],["1327902178","Елена Воробей","similar"],["722586868","Елена Дриацкая","similar"],["1852379771","Елена Карпук","similar"],["726111362","Елена Касьянова","similar"],["953229886","Елена Шанина","similar"],["1578762685","ессентуки","similar"],["1181103417","Есть Есть Есть","similar"],["1303479280","жадный дельфин","similar"],["1551979794","Жарок","similar"],["1361779197","Жека Басотский","similar"],["1159094576","Жека Расту","similar"],["1445580958","Железный Акцент","similar"],["1133538212","Жин-Жин","similar"],["1597730104","Жёлтый Фургон","similar"],["1716503841","ЗаVисть","similar"],["1556240643","забей, лерочка","similar"],["1387128668","Заговор","similar"],["948618367","Заза Наполи","similar"],["1603499007","Зазеркалье","similar"],["1239317817","Зарница","similar"],["821696051","Захар Май","similar"],["1807495361","Звук Вокруг","similar"],["1296933743","Звуки Природы Академия","similar"],["1563296186","Звёздная Грань","similar"],["1514190846","зелёный дядя u сёрферы чёрной дыры","similar"],["1240893291","Земля Легенд","similar"],["1648648787","Земфира от Луки","similar"],["1545042488","Зенит","similar"],["950423836","Златаслава","similar"],["1836035961","Златенция","similar"],["1830980044","ЗОЛОТИНКА","similar"],["1556018519","Золотые зубы","similar"],["1331929865","Зона без стресса","similar"],["1299072357","Зоя","similar"],["1534666569","И Друг Мой Грузовик...","similar"],["1359122283","ИБН","similar"],["1355095656","Иван Курочкин","similar"],["1491319278","Игла","similar"],["1560349596","Игнатий Винтуров","similar"],["1261316302","Игорь Кибирев","similar"],["1482691272","Игорь Маевский","similar"],["1525399748","Игорь Пономаренко","similar"],["1538835737","Игорь Цыба","similar"],["1069714055","Игры","similar"],["1585637869","Извините за опоздание","similar"],["1487322763","Ильхам Шакиров","similar"],["917400162","Илья Залевский","similar"],["1583536131","Импульс-80","similar"],["1437165042","Имя твоей бывшей","similar"],["1166203827","ИНАЧЕ","similar"],["1576138783","Индустрия","similar"],["1348653042","Инна Стилл","similar"],["1516597399","Инструментальный ансамбль \"Камертон\" п/у Юрия Рейтмана","similar"],["730163526","Инструментальный ансамбль \"Фестиваль\"","similar"],["1368260232","Инструментальный ансамбль Всесоюзного радио Маяк","similar"],["1512425125","Инструментальный ансамбль п/у Александра Тартаковского","similar"],["1459122388","ИОАН","similar"],["1857797106","Ирина Завадская","similar"],["1542597069","Ирина Клинских","similar"],["712593724","Ирина Потоцкая","similar"],["690999903","Ислам Мальсуйгенов","similar"],["1260690304","Истов","similar"],["1475944799","ИЧИ","similar"],["1438528593","Ищейка","similar"],["1491896132","Йовин","similar"],["1829661393","Казачий Кругъ","similar"],["723708010","Казян","similar"],["1608178581","Кай Метов","similar"],["1486290182","Какая Разница","similar"],["1500488373","Канги","similar"],["1524641889","Канцлер ГИ","similar"],["1117833488","Капельки","similar"],["1509958843","Карабас и НЕСУРАЗНОСТИ","similar"],["1046546464","Карелия","similar"],["1504514045","Касание","similar"],["1532787809","Каскад","similar"],["1104633135","Катерина Красильникова","similar"],["1372663075","Катрин Штоль","similar"],["1358254938","Катя Адушкина","similar"],["1520271040","катя милтей","similar"],["1565698103","кауч сёрфинг","similar"],["1776867926","Кащенко","similar"],["1029108116","Квартет И","similar"],["1544930507","Квартет п/у Владимира Дмитриева","similar"],["997652892","КерамикА","similar"],["1361964584","Керил","similar"],["1873296439","Кибер балабол","similar"],["1493184875","Килджо","similar"],["1728879702","КИМ","similar"],["1700868765","Киньте Копеечку","similar"],["1727141121","Кира Тимралеева","similar"],["1445549139","кис-кис","similar"],["1490119198","Кисло-Сладкий","similar"],["1470596217","КИСЛОТА","similar"],["1572891395","кислотный","similar"],["1489472148","КИССКОЛД","similar"],["1518967860","Кишлак","similar"],["1070521932","Клеопатра","similar"],["1488483514","КЛИНИКА","similar"],["1490085989","клуб любителей музыки","similar"],["1667742532","Колыбельная","similar"],["1550962770","КОМНАТА","similar"],["1517702819","КОМНАТА БЫВШИХ","similar"],["1442118056","КОНДРАТЬЕВ","similar"],["1085535212","Константин Арбенин","similar"],["1532195693","Константин Верный","similar"],["656393777","Константин Жиляков","similar"],["1463138413","Константин Паустовский","similar"],["965208422","Константин Ступин","similar"],["1217521862","Контингент","similar"],["1260938836","Копюшон Ноу Мо","similar"],["1626245259","Кореш","similar"],["1392366368","Королев Попова","similar"],["1704242994","королевский XVII","similar"],["1041607544","Космонавты","similar"],["1450451536","Кофе","similar"],["698903534","Красное Дерево","similar"],["986345531","КРЕСТ","similar"],["1506501655","Криминальный бит","similar"],["1466213749","КРИСПИ","similar"],["1405869689","Кровавый Риф","similar"],["1609033556","кровь из носа","similar"],["1459985400","культодиночества","similar"],["1443045160","КУОК","similar"],["1663035016","Купание обезьяны в тёплой воде","similar"],["1527730855","курящих нет","similar"],["1696079116","кухня","similar"],["1845413453","Кэнни","similar"],["1561588931","Кэстл","similar"],["1501754116","лав","similar"],["1628073561","Лазерный Тифлис","similar"],["1824234441","ЛАЙЛА","similar"],["1508163711","ЛАЙТИ","similar"],["1515085936","Лали","similar"],["1149397876","Лев Валерьяныч","similar"],["1545423392","Лев Печеньев","similar"],["848468003","Легион","similar"],["1484368266","лезвие сеул","similar"],["1479806248","Лена Август","similar"],["1890436489","Лена Кошкина","similar"],["1723152418","Леон Кемстач","similar"],["885377769","Леонид Сергеев","similar"],["1474399689","Лера Огонёк","similar"],["1684850665","летяга","similar"],["1365033109","Лиза Смол","similar"],["1631905789","лил кидд","similar"],["1370970247","Литвин","similar"],["1231324713","Лорд Пневмослон","similar"],["1472195704","ЛУЧИК","similar"],["1567893958","Лучший Друг","similar"],["1556685279","ЛУЧШИЙ ДРУГ","similar"],["1130531619","Любовь Карпенко","similar"],["711360714","Любовь Полищук","similar"],["1050961430","Любовь Попова","similar"],["1490098118","Люцифер","similar"],["1550437171","ЛЯЛЬКА","similar"],["1712111966","лёрн","similar"],["1593031977","М'ОНА","similar"],["1435877848","МАВАШИ group","similar"],["1785893501","МАЙЛЗ","similar"],["1521267458","Макбет","similar"],["1495870391","Макодзеба","similar"],["1498901807","Макс Вертиго","similar"],["714838170","Максим Дунаевский","similar"],["621472388","Максим Олейников","similar"],["1424924622","Маленький Буддист","similar"],["1068872779","Маленький принц","similar"],["1440152493","Маленький ярче","similar"],["1707745918","малы","similar"],["1305841744","Малышарики","similar"],["1437187464","Мальбэк х Сюзанна","similar"],["1151184684","Мальчишник","similar"],["1484660312","МАЛЬЧУГЕНГ","similar"],["1455637183","Манагер","similar"],["1194066019","Манагер и Родина","similar"],["1438060303","Маракеш","similar"],["1721567876","Марат Альборов","similar"],["1309273791","Марат Нигматуллин","similar"],["712935367","Маргарита Корабельникова","similar"],["1707540900","Мари aka Краймбрери","similar"],["1524791422","Марина Бриз","similar"],["1536381087","Марина Варшавская","similar"],["994168215","Марина Есипенко","similar"],["1505296048","Марина Клещёва","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_16';
  const SKIP_TITLE = /[іїєґІЇЄҐ]/; // never touch Ukrainian-language titles
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const mk = window.MusicKit && MusicKit.getInstance && MusicKit.getInstance();
  if (!mk || !mk.isAuthorized) { alert('Sign in to music.apple.com first, then run the script again.'); return; }
  const sf = mk.storefrontCountryCode || 'us';
  const H = () => ({ Authorization: 'Bearer ' + mk.developerToken, 'Music-User-Token': mk.musicUserToken, 'Content-Type': 'application/json' });
  const get = async p => { try { const r = await fetch(API + p, { headers: H() }); return r.ok ? r.json() : {}; } catch { return {}; } };
  const put = async id => { try { const r = await fetch(`${API}/v1/me/ratings/songs/${id}`, { method: 'PUT', headers: H(), body: JSON.stringify({ type: 'rating', attributes: { value: -1 } }) }); return r.ok; } catch { return false; } };
  const rated = async ids => { const out = new Set(); for (let i = 0; i < ids.length; i += 100) { const j = await get(`/v1/me/ratings/songs?ids=${ids.slice(i, i + 100).join(',')}`); (j.data || []).forEach(x => x.attributes.value === -1 && out.add(x.id)); } return out; };

  let state = { i: 0, rated: 0 }; try { state = Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const list = ARTISTS.filter(a => CONFIG.groups.includes(a[2]));
  console.log(`%c[amru] ${list.length} artists, starting at #${state.i}. Storefront: ${sf}`, 'color:#0a0;font-weight:bold');

  for (; state.i < list.length; state.i++) {
    const [aid, name] = list[state.i];
    // 1) collect top songs
    const ids = [];
    let url = `/v1/catalog/${sf}/artists/${aid}/view/top-songs?limit=25`, pages = 0;
    while (url && pages++ < Math.ceil(CONFIG.songsPerArtist / 25)) {
      const j = await get(url);
      (j.data || []).forEach(t => { if (!SKIP_TITLE.test(t.attributes?.name || '')) ids.push(t.id); });
      url = j.next || null;
    }
    if (!ids.length) { save(); continue; }
    // 2) skip already-disliked
    const done = await rated(ids);
    const todo = ids.filter(id => !done.has(id));
    if (CONFIG.dryRun) { console.log(`[amru] ${name}: ${todo.length} to rate`); continue; }
    // 3) rate
    const q = todo.slice();
    await Promise.all(Array.from({ length: CONFIG.concurrency }, async () => { while (q.length) { if (await put(q.shift())) state.rated++; } }));
    // 4) verify writes really persisted (Apple throttles silently)
    if (todo.length) {
      await sleep(1500);
      const after = await rated(todo);
      const ratio = after.size / todo.length;
      if (ratio < 0.5) {
        console.warn(`[amru] Apple is not saving ratings right now (${Math.round(ratio * 100)}%). Pausing ${CONFIG.pauseOnThrottleMin} min…`);
        save(); await sleep(CONFIG.pauseOnThrottleMin * 60e3); state.i--; continue;
      }
    }
    save();
    if (state.i % 10 === 0) console.log(`[amru] ${state.i + 1}/${list.length} — ${name} — total rated: ${state.rated}`);
  }
  console.log('%c[amru] Done. Total rated in this run: ' + state.rated, 'color:#0a0;font-weight:bold');
})();

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

  const ARTISTS = [["1289224222","Самолеты Танки Корабли","similar"],["1542213599","Сантим","similar"],["1526309381","САРРА","similar"],["1591395465","Сателлит","similar"],["1313457515","Сафиа","similar"],["803467034","Саша Гагарин","similar"],["1872088023","Саша нежная","similar"],["1854935743","Сваты","similar"],["1507352357","Света Бень","similar"],["1859451756","Светлана Руденко-Вейра","similar"],["1548312747","Свидетельство О Смерти","similar"],["1014308051","Свобоda","similar"],["1865887996","Свои Люди","similar"],["1126043836","Свят","similar"],["1521886654","Семинар","similar"],["1460386913","Септембра","similar"],["1445913111","Сергей «Чиж» Чиграков","similar"],["1435727011","Сергей Арутюнов","similar"],["1491487630","Сергей Бурунов","similar"],["977675168","Сергей Войтенко","similar"],["904274976","Сергей Вольный","similar"],["1161683668","Сергей Гребеньков","similar"],["1453708610","Сергей Завьялов","similar"],["1466294876","Сергей Курехин","similar"],["1505239865","Сергей Одинцов","similar"],["1538766197","Сергей Санаторов","similar"],["1572459066","Серебряное небо","similar"],["1553100044","Серега Пират","similar"],["1622830820","Сестрёнка","similar"],["1203731658","СиЛя","similar"],["1489839254","Сказочный Сон","similar"],["1329988150","Сколот","similar"],["1539741585","скоты","similar"],["1854104476","снова Ева","similar"],["1553319669","снова не успел","similar"],["1454365204","Сны Саламандры","similar"],["1060176083","Со мною вот что","similar"],["1439667875","Собачий Lie","similar"],["1257900035","Солнце свободы","similar"],["1460137251","СОЛНЦЕМАЙ","similar"],["1507146805","СОЛОМА","similar"],["1460679947","Соломенные Еноты","similar"],["1239829904","соня хочет танцевать","similar"],["1497190260","соулмэйт","similar"],["1870903262","СПД","similar"],["1552196453","Спектакль Джо","similar"],["1184573613","Спил деревьев","similar"],["1297669439","Спокойная Зона Сна","similar"],["1503839229","Спрингфилд","similar"],["1507186462","Станция Видеопарк","similar"],["1462912917","стасиес","similar"],["1412716876","Стереополина","similar"],["1611761494","СТИЗИ","similar"],["1574979737","СТИНТ","similar"],["1487618021","СТОУНД","similar"],["1469374497","Страна OZ","similar"],["1578035364","Субботнее Сумо","similar"],["1389099645","Сумеречный Сад","similar"],["986003043","Суп Харчо","similar"],["1636017469","Супергруппа","similar"],["1429679154","СУПЕРКОЗЛЫ","similar"],["1069878464","Суровый февраль","similar"],["1679987936","СУСПЕНЗИЯ","similar"],["1550290702","Счастливая Смерть","similar"],["593607645","Т-34","similar"],["603528181","Т9","similar"],["1397057082","такой макар","similar"],["1457194105","Тальник","similar"],["1523407496","Тамара Кутидзе","similar"],["777696153","Тамрико Гвердцители","similar"],["896186940","ТапОК","similar"],["1558684133","ТАТАРИН","similar"],["1512978380","Татем","similar"],["863253455","Татьяна Дасковская","similar"],["889347421","Татьяна Жукова","similar"],["875414221","Татьяна Покрасс","similar"],["1422679850","Татьяна Фатеева","similar"],["1599328080","Тая Скоморохова","similar"],["1461773144","Тбили","similar"],["1530140211","Тбили Теплый","similar"],["1042578068","Твин Пикс","similar"],["1620443705","ТВОИ КОШМАРЫ","similar"],["1069849781","Твой день","similar"],["1436345024","Твоя молодость","similar"],["1440737457","Те Дни Прошли","similar"],["346541053","Театр теней","similar"],["1116929530","Теплые Дни","similar"],["1439898257","Терпение","similar"],["1585344450","Техноктюрн","similar"],["1447541199","Технология","similar"],["1459508506","Технология","similar"],["1088844124","Тимыч","similar"],["1464924781","Типа","similar"],["1483619162","ТКАЧ","similar"],["1507340907","Толя Царёв","similar"],["1640646844","Тостер","similar"],["1340390590","Тося Чайкина","similar"],["965346357","Тото","similar"],["1771656840","ТРАНСМИССИЯ","similar"],["1697059644","Три дня говна","similar"],["1333246169","Три Кота","similar"],["1461775775","Три Типа","similar"],["1514619717","тринадцать карат","similar"],["1609439280","Ты23","similar"],["1470690455","ТЭЦ","similar"],["994967764","ТЯЖЁЛАЯ АТЛЕТИКА","similar"],["1781031575","тёмный принц","similar"],["1405155970","Тёплая Трасса","similar"],["1555246762","Убиваю Насекомых","similar"],["1014687674","Убийцы","similar"],["1622837003","ублюдки!","similar"],["835215803","Унесённые ветром","similar"],["1460308066","Утро в тебе","similar"],["1319953239","Утроворту","similar"],["1569032413","Фазы","similar"],["1390703066","Фантастика","similar"],["1883382307","Фара Ночи","similar"],["998663850","Фея Драже","similar"],["1777052752","филмайфейс","similar"],["1370512880","Фирма-Однодневка","similar"],["1660915328","Флага","similar"],["1678075751","Флако","similar"],["1538065399","флорá","similar"],["1570959101","флорист","similar"],["1829656474","Фольклорный ансамбль Воля","similar"],["1370897609","ФРЕНДЗОНА","similar"],["1606215903","Френдли Файа","similar"],["879101721","Френды","similar"],["1455091407","ФРИК ПАТИ","similar"],["1651491655","Фрио","similar"],["1311752784","фрэнк?","similar"],["1508520922","Хамло","similar"],["1494150349","ХИНАТА","similar"],["1479242036","ХЛАМ","similar"],["1312851657","Хозяйственное Мыло","similar"],["1563818666","Холи Полли","similar"],["1513174077","Холодное Лето 99'","similar"],["1475399317","Холодный звонок","similar"],["1507996389","хочуспать","similar"],["1534852422","Хуго-Уго","similar"],["1601445906","Цветняшки","similar"],["1500475072","Цветы детей","similar"],["1455642175","Цыганята И Я С Ильича","similar"],["1829659884","Чапура","similar"],["1478877283","ЧБ","similar"],["1367665774","Че те надо","similar"],["1825531048","ЧЕЛОВЕК ЯЙЦА","similar"],["1538785097","Чердакъ","similar"],["1607196285","четвёртый пациент","similar"],["1584654658","Читмил","similar"],["1509613980","Чувак эта вечеринка отстой","similar"],["1201290548","Чёрное кино","similar"],["1437902518","Чёрные береты","similar"],["1447500570","Чёрный Вторник","similar"],["1483811098","Чёрный Государь","similar"],["1453735286","Чёрный Джек","similar"],["1666462770","Чёрный Мотылёк","similar"],["1122421635","Шайни","similar"],["1601024036","Шалый","similar"],["1244096933","Шамиль Кашешов","similar"],["1536414755","шамиля","similar"],["1688593166","шампур","similar"],["1194238987","ШАРЫ","similar"],["602667354","ШЕFF","similar"],["1747805105","шизоняшка","similar"],["1531682079","Шляпа Шаляпина","similar"],["1492805652","ШТЫКНОЖ","similar"],["1457859160","Шум И Нежность","similar"],["1152319894","Шум Моря Коллекция","similar"],["1439334539","шумные и угрожающие выходки","similar"],["1455878055","ШЫША","similar"],["1166147827","ЭGO","similar"],["1340914317","Эгил Шварц","similar"],["1467349423","Эдуард Хуснутдинов","similar"],["969291889","Эдуард Цанга","similar"],["1495318479","Эйфория","similar"],["1708561409","ЭКСАНИМО","similar"],["1480865058","ЭлектропартиZаны","similar"],["1376579164","Электросон","similar"],["1040537851","Эллаи","similar"],["1536809892","Элма и Пугало","similar"],["1456292511","Эльдар Агачев","similar"],["1477206584","Эм Калинин","similar"],["1232233380","Эмелевская","similar"],["6776449992","Эмильчик","similar"],["1463397248","ЭндиЭнди","similar"],["1031572182","Эскимос Crew","similar"],["722334440","Эстрадно-симфонический оркестр Ленинградского телевидения и радио","similar"],["1368259556","Эстрадный Оркестр Всесоюзного Радио СССР","similar"],["1015061791","Эстрадный оркестр п/у Владимира Терлецкого","similar"],["1403814308","Эстрадный оркестр под управлением Арно Бабаджаняна","similar"],["1614137564","это электробус.","similar"],["1185975308","Эхопрокуренныхподъездов","similar"],["1464146701","ЮГ 404","similar"],["1451529206","Юлия Накарякова","similar"],["1851224719","Юлия Светлая","similar"],["1742244457","Юпи","similar"],["711360552","Юрий Гальцев","similar"],["1733250895","Юрий Киселёв","similar"],["786580425","Юрий Филимонов","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_18';
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

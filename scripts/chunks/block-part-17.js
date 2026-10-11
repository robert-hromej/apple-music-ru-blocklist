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

  const ARTISTS = [["995243742","Марина Парусникова","similar"],["1202893635","Марина Селиванова","similar"],["1502647222","Марксэн","similar"],["1682348865","Марьяна Локель","similar"],["1889470807","Матрёшка Static","similar"],["1449589024","Мать Тереза","similar"],["383836121","Мафик","similar"],["1527338060","Маша Шейх","similar"],["1880578055","МЕDЬ","similar"],["1335796891","Метель","similar"],["1707567349","метеорит 2025","similar"],["1525921743","МЕХАНИЧЕСКИЙ ПЁС","similar"],["1839202580","МИ","similar"],["1778655987","Милана Учайкина","similar"],["1882387911","МИЛЕНА MIBREOO","similar"],["1637449224","Милиан О’Войд","similar"],["974912161","Милош Бикович","similar"],["1163696107","Мимо Вселенной","similar"],["1459938234","МИНУС18","similar"],["1485684391","Мир в эфире","similar"],["1324313636","Мистер Малой","similar"],["1447397225","Михаил Борисов","similar"],["1503486331","Михаил Елизаров","similar"],["1181752004","Михаил Костылев","similar"],["776461925","Михаил Кочетков","similar"],["1210632580","Михаил Милютин","similar"],["1003826507","Миша Житов","similar"],["1525436369","Миша Кацурин","similar"],["1151204619","Мишины Дельфины","similar"],["1611031696","МИШКА","similar"],["1526056495","молодой калуга","similar"],["1364913828","МОЛОДОСТЬ ВНУТРИ","similar"],["1245142337","Молодёжьвыбираеткосмос","similar"],["778889969","Московское трио гитаристов","similar"],["1601320583","мосл","similar"],["1534388976","мс улыбочка","similar"],["1558144751","Мужик из Сибири","similar"],["1829661458","Мужской состав проекта «ВЕК»","similar"],["1453872087","Муслим Магомаев","similar"],["1356095563","Мутант Ъхвлам","similar"],["1500623294","МЦ Лучник","similar"],["1156449140","Мц Лучник","similar"],["1472900084","мытищи в огне","similar"],["1409632755","Мэйби Бэйби","similar"],["1451494207","Мэйклав","similar"],["1297930992","Мёртвые Дельфины","similar"],["1417776280","Мёртвые Осы","similar"],["1603860913","н-1","similar"],["1542959697","Надежда Мельянцева","similar"],["1656039038","Назир","similar"],["1256683661","Народное Ополчение","similar"],["1615683849","Настя Кравченко","similar"],["1171428339","Настя Макаревич","similar"],["1086299372","Наташа Королева","similar"],["1463889713","Наша Таня","similar"],["1487952445","не панк","similar"],["1477642237","не придумал","similar"],["1117634628","НЕ.KURILI","similar"],["1540647135","небо над головой","similar"],["1208691160","Невестина","similar"],["1538878367","НЕВИДАЛЬ","similar"],["842604660","Нежное Это","similar"],["1439253313","Нежный бит","similar"],["1461768695","НЕЗАБУДКИ","similar"],["1553665934","Некоторое Отсутствие Пуговиц","similar"],["1632880341","Некрасовский","similar"],["1523407775","нексюша","similar"],["1445562971","Неромантика","similar"],["1700437507","Несладко","similar"],["1773306938","Ника Жукова","similar"],["1324569378","Никита Киоссе","similar"],["1271709494","Никита Михалков","similar"],["1645497038","Никита Ост","similar"],["1489957939","Никита Щавинский","similar"],["1480368355","Николай Монро","similar"],["732511054","Николай Рыбников","similar"],["733772670","Николай Черкасов","similar"],["1457672696","НОВИКОВ ПРИБОЙ","similar"],["1442014766","НОМ","similar"],["1380834512","номер скрыт","similar"],["1029641475","Нора Бумбиере","similar"],["1509732540","Нормальные песни для детей","similar"],["1437628446","Ночлег","similar"],["1851631428","Ночной Маршрут","similar"],["1352636485","ночные грузчики","similar"],["1465361911","Ночью в парке","similar"],["1543608924","нэнси холод","similar"],["1414887008","НЭП","similar"],["1501196560","О! Марго","similar"],["1444553817","Обильный","similar"],["1449480159","ОБРАЗ","similar"],["1435358376","Обстоятельства","similar"],["1601960950","Одиночная Камера","similar"],["1248332603","Одни на двоих","similar"],["685813202","Олег Касьянов","similar"],["726243917","Ольга Арефьева","similar"],["1452090077","Ольга Восконьян","similar"],["943489131","Ольга Оболенская","similar"],["1002603185","Он Юн","similar"],["1872584147","ОНАЯ","similar"],["1527048381","оптимизм","similar"],["1082602219","Орбита","similar"],["1443841833","Оргазм Нострадамуса","similar"],["982471950","Оркестр кинематографии","similar"],["1678073996","Оркестр Ленинградской государственной филармонии","similar"],["1226966283","Оркестр Ленинградской филармонии","similar"],["1315071815","Оркестр Управления по производству фильмов","similar"],["1530791664","осень","similar"],["1485123261","ОСТАВИЛ.","similar"],["1438138987","Остап Парфёнов","similar"],["1470389496","Осторожно горячо","similar"],["1367432245","Отстой","similar"],["846285343","ОУ74","similar"],["1246270965","Охра","similar"],["1774215379","очки и кольца","similar"],["1502831146","Пабло","similar"],["897176026","Павел Артемьев","similar"],["779436468","Павел Ковалев","similar"],["1500487060","Падаем","similar"],["1540577440","Пайта","similar"],["1398641078","Палисад","similar"],["1510564277","Панкмодернисты","similar"],["1182909062","Паперный Т.А.М.","similar"],["1643882364","паранойя","similar"],["1548282985","Партнер","similar"],["1545351745","Пасека","similar"],["1482247565","пачкасигарет","similar"],["1230051493","Паша Жданов","similar"],["1781001754","Паша Левл","similar"],["1556064373","Пашка Бекет","similar"],["1535830788","педиф","similar"],["1234146342","Пекинский Велосипед","similar"],["1479527093","Пеп-Си","similar"],["1646665634","ПЕРЕУЧЕТ","similar"],["1554065369","песни для взрослых","similar"],["1542246394","Печаль Любимого Блогера","similar"],["1547005319","Пинк Тайд","similar"],["1328875216","ПИШИ НА СТЕНАХ","similar"],["1455639183","Плага","similar"],["1537172855","ПЛАМЛИ & СПОТИ","similar"],["1848838204","плм","similar"],["1304607165","Пневмослон","similar"],["1454574752","Побег","similar"],["1388307952","Погнали","similar"],["1515241737","под пыльным небом","similar"],["1514055417","Пожар","similar"],["1060649449","Полиграф ШарикOFF","similar"],["1546449690","Полынь Folk","similar"],["1188151632","Пост Парк","similar"],["1233742444","Потомучто","similar"],["1312851653","почтисчастье","similar"],["1570550725","преступление.","similar"],["1558416151","приду во сне","similar"],["1831229009","призрак крови","similar"],["1503905516","Прожектор Перестройки","similar"],["1473326307","просто Лера","similar"],["1821035772","Протоприкус","similar"],["1005537709","Профессор Лебединский","similar"],["1529116983","Птицу ЕМЪ","similar"],["1536779888","пули","similar"],["1484108445","пыльный","similar"],["1576419900","Пьер-Аскеладд","similar"],["1522865732","Рабóр","similar"],["1676414552","Размаха","similar"],["862378588","Раиса Отрадная","similar"],["1458658362","рай не сегодня","similar"],["1736434856","Раковая Выхухоль","similar"],["1546374677","Растич","similar"],["1480236392","Рауш","similar"],["1414841250","Рейсан Магомедкеримов","similar"],["1534162938","Реставрация","similar"],["884977152","Ресторатор","similar"],["1506433520","рипсити","similar"],["1017828362","Рита Дакота","similar"],["906379245","РИЧ","similar"],["1455789487","Родина","similar"],["1534152769","Розы Люксембург","similar"],["1658575096","Рок-мюзикл Пирамида","similar"],["1451924177","Рок-опера Орфей","similar"],["1444849052","Роки","similar"],["1563254083","РОКОВОЙ ГОД","similar"],["1544793528","РОЛАН","similar"],["1484249074","Роман Рудыка","similar"],["1124384139","Романов","similar"],["1515108541","РОМАНОВА","similar"],["712557640","Ростислав Плятт","similar"],["1538491436","РОУЗИ РОУЗ","similar"],["1526741487","Рубеж Веков","similar"],["1391780215","Рудольф Страусов","similar"],["1565031834","Руслан Добрый","similar"],["1857605547","Руслан Сербо-Великий","similar"],["1265642092","Руслан Черный","similar"],["1524920284","РУССКИЙ СТЯГ","similar"],["1447900687","Русскоговорящий ГиД","similar"],["1389022964","Рустам Нахушев","similar"],["1468444257","Ручеёк","similar"],["1541825790","рэ.прэса","similar"],["1511095564","рэйчи","similar"],["1570404402","Сабина Ахмедова","similar"],["1446354207","Сабрина","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_17';
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

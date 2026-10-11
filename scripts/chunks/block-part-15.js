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

  const ARTISTS = [["1514445802","Артур Бабич","similar"],["1155544762","Артур Ермак","similar"],["1487964693","Артур Ратнер","similar"],["1383762006","Артур Текеев","similar"],["1647587208","Артур Хартс","similar"],["1550123683","Артём Моргунов","similar"],["1508657500","архив","similar"],["1506887549","АСКОРБИНКА","similar"],["716545707","Аслан Кятов","similar"],["1470952896","АУ","similar"],["1457354790","АУ типа 600","similar"],["1503513550","Аут","similar"],["1488149626","Ауткаст","similar"],["1634420145","Ах.Реп","similar"],["1341464816","Бабек Мамедрзаев","similar"],["1203364653","Балу","similar"],["1507840813","Банда Четырёх","similar"],["1474306687","Барон","similar"],["1310680144","БАТЕРС","similar"],["1443948938","Башаков BAND","similar"],["1580052020","без обид","similar"],["1565916849","Безальтернатива","similar"],["1620679230","Белый шум - спокойствие","similar"],["1477547505","БЕСПОКОЙСТВО","similar"],["1534588009","БИГГИ","similar"],["1155358067","БИО","similar"],["1367184686","Блеск Бати","similar"],["1527099272","Блинк","similar"],["1458449228","Блуждающие Огни","similar"],["1476912069","БЛЭЙЗЕР","similar"],["1449881369","БЛЭКОУЛ","similar"],["632857845","Большой Детский Хор имени В. С. Попова","similar"],["1462164143","Бомба-Октябрь","similar"],["736340766","Борис Филатов","similar"],["1586181919","Борода Бабая","similar"],["1490889632","Бортпроводник","similar"],["1405588116","Боцман и Бродяга","similar"],["1447230695","Бразилец","similar"],["1718534452","Братство Атома","similar"],["989743277","Бродячий Цирк","similar"],["1477722967","Брутто","similar"],["1156448650","Букер Д. Фред","similar"],["1459272745","Бумажные Тигры","similar"],["1266706651","Бухенвальд Флава","similar"],["959219665","БЦХ","similar"],["1366183618","БЫДЛОЦЫКЛ","similar"],["1451386876","Быханов Сад","similar"],["1589771813","Бюро","similar"],["1510619807","в чем дело?","similar"],["1458742549","В.И.А. Роковой год","similar"],["1250067822","Вадик Королёв","similar"],["1355096930","Вадим WolF","similar"],["1152298668","Вадим Людвиковский","similar"],["952345946","Вадим Самойлов","similar"],["1538939448","Вайолет","similar"],["1222605607","Валентин Дядька","similar"],["1212232790","Валентина","similar"],["602922939","Валик","similar"],["1539619262","валюта скуратов","similar"],["1713024020","валюша","similar"],["1473309896","Ваня Зарядов","similar"],["904477394","Васса","similar"],["1505482746","Васса Железнова","similar"],["643978652","Вася В.","similar"],["1460138072","Вася Васин","similar"],["1736543236","Вау Вероника","similar"],["1532974469","Ваша Маруся","similar"],["972413039","вБЕНЗИНЕестьОБЛАКА","similar"],["1491192517","Веня Д'ркин","similar"],["1564394644","Вера Зудина","similar"],["728333340","Вера Орлова","similar"],["1627692894","ВЕРСИЯ НАРОДНАЯ","similar"],["1245559517","Вертушка Газманова","similar"],["1469687268","Весна на улице Карла Юхана","similar"],["1483066674","ВИА \"Волга-Волга\"","similar"],["1328275909","ВИА \"Лейся Песня\"","similar"],["1497017759","ВИА Волга-Волга","similar"],["1749755488","ВИА Добры Молодцы","similar"],["1522206877","ВИА Крылатая Гвардия","similar"],["1397175389","Видеокассета Твоих Родителей","similar"],["1470047105","Вика Коробкова","similar"],["1042266910","Виктор Виталий","similar"],["1445815853","Виктор Королёв","similar"],["722650243","Виталий Доронин","similar"],["1001271083","Виталий Леонов","similar"],["1892297647","Виталя Печальный","similar"],["1517111819","Виток-4","similar"],["1350942183","Включай Микрофон!","similar"],["1222953768","Влад Рамм","similar"],["958732212","Владимир Бобриков","similar"],["733772596","Владимир Володин","similar"],["542384202","Владимир Воронов","similar"],["990990752","Владимир Дубовицкий","similar"],["1523204351","Владимир Клявин","similar"],["775806849","Владимир Раутбарт","similar"],["694361687","Владимир Ферапонтов","similar"],["958162410","Владимир Чуйкин","similar"],["953264525","Владислав Соколов","similar"],["1782112714","Влажность-2018","similar"],["1451351730","Влом!","similar"],["1190108350","Воздухоплавательный парк","similar"],["1586826890","Войлок","similar"],["722568576","Вокальный ансамбль «Панорама»","similar"],["1336523925","Вокруг фонарного столба","similar"],["1691066090","ВОЛКОВА САНКОВ","similar"],["1218459247","Вольный Путь","similar"],["1730998848","Воля и Разум","similar"],["1338800331","Воровская лапа","similar"],["1701441775","Воскресение","similar"],["1556892302","ВРЕМЯ ЕСТЬ","similar"],["736472255","Всеволод Пучков","similar"],["1449242118","Второй этаж поражает","similar"],["1444451649","Вундеркинды","similar"],["1174023132","ВХОРЕ","similar"],["1447622183","Въеби ему, Донателло!","similar"],["1260342649","Вячеслав Антонов","similar"],["1157548388","Г.М.О.","similar"],["1780868961","ГÓРОН","similar"],["1477194008","Галантерея","similar"],["850167176","Галина Богдановская","similar"],["1461774243","Гарик Погорелов","similar"],["1523711136","Где Фантом?","similar"],["1372842655","Где-то там","similar"],["740429592","Георгий Кишко","similar"],["1546885737","Георгий Корольчук","similar"],["729922467","Георгий Синельников","similar"],["1318767809","Глава II","similar"],["1687512953","Глеб & Рауль","similar"],["1446463360","гнилаялирика","similar"],["1439233428","гокки","similar"],["1795454672","голодный","similar"],["1460721709","Голубые береты","similar"],["1362978807","Голубые Молнии","similar"],["1525110865","Государственный Симфонический Оркестр Кинематографии СССР","similar"],["1529393268","Государственный симфонический оркестр кинематографии СССР","similar"],["1516594783","Государственный симфонический оркестр кинематографии СССР","similar"],["1524977782","Гоша Пинчук","similar"],["1501189084","ГПД","similar"],["1477472784","Гр. Полухутенко","similar"],["1656064432","Грек","similar"],["1551445602","Группа Карнавал","similar"],["1466076835","группа САДко","similar"],["1447512616","Группа Сентябрь","similar"],["1192645840","Группа Хмурый","similar"],["925019678","Грюндик","similar"],["1264562030","Грязь","similar"],["1529386219","Грёзы","similar"],["1478715875","Гудзон","similar"],["1042362664","Гуляй Рванина","similar"],["1553607758","Даена","similar"],["1447316527","Даниил Ким","similar"],["1792388755","Данил Правда","similar"],["1496114151","Дарья Виардо","similar"],["690999907","Дата Карчава","similar"],["1502555850","Даша и Серёжа","similar"],["1495160816","даша онзероад","similar"],["1489041918","Даша Эпова","similar"],["1538750529","Два Обреза","similar"],["1587969350","два пакета","similar"],["1498526079","дегид","similar"],["1489994367","Дед, Игорь и Оглобля","similar"],["1356384589","Действуй!","similar"],["1447374308","Дейтери","similar"],["992118372","Денис Kore","similar"],["1616249358","Депо","similar"],["1511882690","Депутат Балтики","similar"],["1403875794","ДЕТИ RAVE","similar"],["1629341989","Детские сказки","similar"],["1112075095","Детские сны Звезда Academy","similar"],["918053305","Детский ансамбль \"Мастерок\"","similar"],["902638089","Детский вокально-инструментальный ансамбль \"Аревик\"","similar"],["982483331","Детский хор п/у Людмилы Боковой","similar"],["1090040197","Детское издательство \"Елена\"","similar"],["1374317730","Джей Мар","similar"],["1334751994","Джигли","similar"],["593542238","Джино","similar"],["1255072376","Джоззи","similar"],["1709201102","Джон Гарик","similar"],["1225144492","Джуна","similar"],["946371853","Диана","similar"],["1540683878","Диджей Байк","similar"],["1517404651","Диктофон","similar"],["1437980586","дима бамберг","similar"],["1485242641","Динамичные ребята","similar"],["1608346719","дипинс","similar"],["1255471181","ДК Посторонних","similar"],["1542572625","Дмитрий Волгин","similar"],["958732224","Дмитрий Кимельфельд","similar"],["844552722","Дмитрий Парфенов","similar"],["1458743660","Дмитрий Уткин","similar"],["673265689","Дмитрий Харатьян","similar"],["1171797373","Дмитрий Хмелёв","similar"],["1484513473","До Полудня","similar"],["1438500871","Дом Кукол","similar"],["1383767810","Дом престарелых аутистов","similar"],["1420414407","досвидошь","similar"],["1308659108","ДРУГ","similar"],["1135091749","Другое Дело","similar"],["1438667093","Дурной Вкус","similar"],["1029043152","Дуэт \"Не уходи\"","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_15';
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

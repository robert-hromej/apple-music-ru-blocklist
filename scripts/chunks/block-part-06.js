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

  const ARTISTS = [["1479626901","Три дня дождя","core"],["1583999804","туро","core"],["1489973333","Убей меня, Эйс!","core"],["1267906730","Увула","core"],["1718935785","урал гайсин","core"],["960359861","Урфин Джюс","core"],["1442907163","ФОГЕЛЬ","core"],["1462886027","фото и напитки","core"],["1554347861","Фотосалоны","core"],["1239799865","Фрунзик Мкртчян","core"],["1330073609","Хабиб","core"],["1280538042","Хадн дадн","core"],["1271800261","ХАНЗА","core"],["803290312","ХАННА","core"],["1484962563","хватит","core"],["1242238321","Хор ЦДДЖ","core"],["1564059752","Хоул","core"],["896993159","Шаали Секира","core"],["1231545917","Шапито","core"],["1406336869","Шарлот","core"],["1203671272","ЩЕНКИ","core"],["1766070367","Эвер","core"],["1559720262","Экси","core"],["1612667484","Электропартизаны","core"],["1472022789","Элли на маковом поле","core"],["1129378222","Эмин Хачатурян","core"],["995285693","ЭММА М","core"],["1533923521","Эррера","core"],["1513112579","Эскимос","core"],["1466048202","Юлия Надервель","core"],["1487361220","юра аристов","core"],["725654044","Яна","core"],["1378996073","Яна Вайновская","core"],["590327453","#####","similar"],["1529796566","$HEDEVRAL","similar"],["1599141705","(поля)","similar"],["1530458373","0GL","similar"],["987884552","1,5 Kg Otlichnogo Pure","similar"],["1577056297","100 Лет Октября","similar"],["635333533","130 Po Vstrechnoy Na Starenkoy Vespa","similar"],["547908977","140 Udarov V Minutu","similar"],["1481989304","17 SEVENTEEN","similar"],["1484366295","17 SEVENTEEN","similar"],["1648336892","1996","similar"],["1435835723","20TOKENS","similar"],["1698153204","21plugg","similar"],["1488354575","22","similar"],["1744453646","22 РАЗА","similar"],["1117096866","23","similar"],["1633802460","23january","similar"],["1705273332","2hug","similar"],["1006895832","2rbina 2rista","similar"],["1446961378","3-ий Январь","similar"],["1561543704","3333","similar"],["1343203920","39","similar"],["1584366504","3H Company","similar"],["1549762147","3TERNITY","similar"],["645821704","4 Aprelya","similar"],["1556999509","44neverluv","similar"],["695307468","4atty Aka Tilla","similar"],["323749991","4k","similar"],["1524963512","4K","similar"],["1151628588","4n Way","similar"],["1439945253","4Teen","similar"],["1474961789","5l33p","similar"],["1693018617","5mewmet","similar"],["1556226025","6000000000себя","similar"],["1788807973","7azilov","similar"],["391996578","7leaf","similar"],["1606162942","84","similar"],["1593955534","9mice","similar"],["1558238775","@kkinchevzona","similar"],["649003431","[AMATORY]","similar"],["1820936186","A-THIS 52","similar"],["1473006772","A3IO","similar"],["1832234263","a8p4s","similar"],["1372684697","abdr.","similar"],["1497556286","Acid Minerale","similar"],["347751926","Action Directe","similar"],["797772416","ACTUM","similar"],["1441475773","Adam","similar"],["586585814","Adaptatsiya","similar"],["716802679","Adaptatsiya Pchel","similar"],["1532430654","Adil","similar"],["1896482033","Admar Dzhiraev","similar"],["883127736","Adrenalin","similar"],["1437896388","Aduk","similar"],["1362565262","Advokaty","similar"],["1722542878","AELITA AZINA","similar"],["1596090994","AFELIA","similar"],["1161704698","Ahmed Shad","similar"],["698391255","Aida Vedishcheva","similar"],["881292809","aikko","similar"],["1599522118","ailie","similar"],["1860580144","AILygoria","similar"],["1870580168","Aira V","similar"],["1708613196","Aires","similar"],["1701760022","akiko!","similar"],["1468524730","Al Fakher","similar"],["963483867","AL-90","similar"],["602920976","Alai Oli","similar"],["1437408517","Alan Galit","similar"],["674270673","Albina Dzhanabaeva","similar"],["626792063","Aleksa","similar"],["825604750","Aleksander Dobrynin","similar"],["813381451","Aleksander Kalyanov","similar"],["621605260","Aleksandr Buynov","similar"],["644341115","Aleksandr Chernetskiy","similar"],["584643881","Aleksandr Gorodnitskiy","similar"],["635867862","Aleksandr Ivanov","similar"],["658212960","Aleksandr Kutikov","similar"],["715068140","Aleksandr Kuznetsov","similar"],["641163602","Aleksandr Laertskiy","similar"],["641163596","Aleksandr Liver","similar"],["590253732","Aleksandr Lominskiy","similar"],["415515550","Aleksandr Malinin","similar"],["874317442","Aleksandr Manotskov","similar"],["599554469","Aleksandr Martsinkevich","similar"],["596147638","Aleksandr Mirazh","similar"],["585513119","Aleksandr Panayotov","similar"],["700407664","Aleksandr Solodukha","similar"],["600390064","Aleksandr Vestov","similar"],["848339221","Aleksandr Zakshevskiy","similar"],["589438890","Aleksandr Zatsepin","similar"],["972145765","Aleksandr Zhvakin","similar"],["614664211","Aleksey Glyzin","similar"],["725447184","Aleksey Gorshenev","similar"],["631148043","Aleksey Kortnev","similar"],["641163613","Aleksey Mostiev","similar"],["874296310","Aleksey Rom","similar"],["591383153","Aleksey Stepin","similar"],["678620290","Aleksey Vishnya","similar"],["635617252","Aleksey Zubarev","similar"],["1383496853","ALENA","similar"],["1086898420","Alex Tor","similar"],["1457225458","ALEX&RUS","similar"],["213157369","Alexander Alexandrov","similar"],["621787057","Alexander Galich","similar"],["672577597","Alexander Kogan","similar"],["548104055","Alexander Mikhailov","similar"],["953229723","Alexander Paranin","similar"],["1607877047","Alexander Vertinsky","similar"],["524570876","Alexey Shelygin","similar"],["615965869","Alfa","similar"],["1544427595","ALFV GANG","similar"],["372397651","AliB","similar"],["1154102548","Alibastar","similar"],["1750858046","Alika","similar"],["1565399347","ALISHA","similar"],["762564343","Alkogol Posle Sporta","similar"],["283744195","Alkonost","similar"],["697943508","Alla Gorbacheva","similar"],["1552165857","ALONEBOY","similar"],["1480544334","Alpha-Beta","similar"],["1026713596","ALPHAVITE","similar"],["1472524891","alsoblaww","similar"],["1459641845","ALTOINTUNE","similar"],["1669761665","ALYNA","similar"],["991187308","Ameriqa","similar"],["1623388152","AMIDI","similar"],["1736957194","AminKa","similar"],["1823001315","AMIRICLUB","similar"],["602446278","Amirina","similar"],["1626069794","amorbaby","similar"],["997002943","Ana Zhdanova","similar"],["779436487","Anastasia Lapina","similar"],["1478010563","Anastasia Mirai","similar"],["727307196","Anastasiya Migova","similar"],["657965659","Anastasiya Spiridonova","similar"],["128789893","Anatoliy Mogilevskiy","similar"],["659923980","Anatoliy Papanov","similar"],["967811586","Anatoly Badchen","similar"],["591408842","Andrej Aleksin","similar"],["910213740","Andrey Birin","similar"],["594791842","Andrey Grizli","similar"],["582313518","Andrey Klimnyuk","similar"],["575899006","Andrey Misin","similar"],["261259612","Andrey Petrov","similar"],["648249453","Andrey Sapunov","similar"],["906305300","Andrey Zarya","similar"],["847935222","Andy Cartwright","similar"],["583263485","Angel NeBes","similar"],["780960944","Angelina Kaplan","similar"],["276656162","Angina","similar"],["1611150782","ANNA","similar"],["852971207","Anna Buturlina","similar"],["443733085","Anna German","similar"],["501186531","Anna Pingina","similar"],["677263002","Anna Reznikova","similar"],["849866598","Anna Rybnikova","similar"],["549554723","Anna Semenovich","similar"],["1771805230","ANNA TOLIKA","similar"],["430793353","Anne Veski","similar"],["204461225","Annodomini","similar"],["1486635424","ANOSOV","similar"],["306615937","Another Man","similar"],["1503496072","Ant+Shift","similar"],["1554650599","Anton Ageev","similar"],["352494723","Anton Sevidov","similar"],["696858933","Antreib","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_06';
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

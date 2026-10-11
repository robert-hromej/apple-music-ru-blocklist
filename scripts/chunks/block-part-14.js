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

  const ARTISTS = [["594488335","Viktor Petlura","similar"],["590323553","Viktor Rybin","similar"],["430794676","Viktor Saltykov","similar"],["630698643","Viktor Tsoi","similar"],["1852962211","VILANIKA","similar"],["1623909211","Violetta Sokolova","similar"],["1160715969","Virus","similar"],["1464150094","VisaGangBeatz","similar"],["466873430","Visokosniy God","similar"],["628056307","Vitaliy Dubinin","similar"],["504596225","Vitaliy Gordey","similar"],["741149455","Vitaly Vlasov","similar"],["1574936515","Vito","similar"],["595984578","Vlad Sokolovsky","similar"],["377379426","Vladi","similar"],["733790722","Vladimir Bunchikov","similar"],["722935793","Vladimir Etush","similar"],["905942614","Vladimir Kurskiy","similar"],["728167881","Vladimir Makarov","similar"],["736472264","Vladimir Nechaev","similar"],["722584764","Vladimir Shakhrin","similar"],["213440213","Vladimir Troshin","similar"],["833409369","Vladimir Tsvetayev","similar"],["859866382","Vladimir Turiyanskiy","similar"],["599560420","Vladimir Volzhskiy","similar"],["79218585","Vladimir Vysotsky","similar"],["589421992","Vladimir Zakharov","similar"],["677097579","Vnuk","similar"],["1364750600","Voditel Dlya Vera","similar"],["1678495145","volhey","similar"],["599923750","Volk","similar"],["877600885","Vollny","similar"],["588131236","Volshebniki Dvora","similar"],["1870262437","VORSKIY","similar"],["683272226","Vostochny Okrug","similar"],["672595850","Vostok","similar"],["861386930","Vougal","similar"],["712571640","Vsevolod Abdulov","similar"],["1510064316","Vspak","similar"],["1484341293","Vtoroi Ka","similar"],["1581740668","VUDOO","similar"],["377144147","Vyacheslav Dobrynin","similar"],["621706810","Vyacheslav Litvyakov","similar"],["430793316","Vyacheslav Malezhik","similar"],["875394988","Vyacheslav Nazarov","similar"],["698391188","Vyacheslav Nevinnyy","similar"],["1773285231","wavdealer","similar"],["1465784933","WENARO","similar"],["1621589141","whatkid","similar"],["1437138601","WHITE GALLOWS","similar"],["1608132171","WHITEHIL","similar"],["1768292155","whitek3d","similar"],["1653769626","Whole Lotta Swag","similar"],["1595092381","whyalive","similar"],["894772509","Wildways","similar"],["430791965","Willi Tokarev","similar"],["1528248614","Wipo","similar"],["1511575588","WLADMIT","similar"],["663100120","Woodscream","similar"],["1709669960","wtwice","similar"],["1675997363","X4","similar"],["1371620223","XACV SQUAD","similar"],["1524487522","XARISTA","similar"],["1478011316","XASSA","similar"],["1463641590","XIII","similar"],["1659626674","XRUSTALIC","similar"],["487789324","XS Project","similar"],["1575893475","xsenonsix","similar"],["904932113","XX FAM","similar"],["436372789","Yaia","similar"],["732869604","Yalla","similar"],["1460226261","Yan Fisher & His Imaginary Band","similar"],["857703980","Yana Pavlova","similar"],["736340913","Yaseniya","similar"],["668723853","Yasvena","similar"],["892194263","YaytsY Faberzhe","similar"],["1670220290","Yeschapskii","similar"],["1753265572","Yoga Alice","similar"],["1389986770","Yoji","similar"],["1390387775","Yotsuya Kaidan","similar"],["852994981","YOURALOBiKOV","similar"],["725536093","Yug","similar"],["1445498837","Yulia Churakova","similar"],["740994272","Yuliy Kim","similar"],["595985390","Yuliya Nachalova","similar"],["1815722794","YUNG FIMOZ","similar"],["1487333954","Yung Stuff","similar"],["1226980770","YUNG TRAPPA","similar"],["1486731832","Yungcold","similar"],["1769558120","YungMeechy","similar"],["1477605923","YUNGWAY","similar"],["712175211","Yuri Gulyaev","similar"],["538341577","Yuri Kukin","similar"],["497404139","Yuri Shatunov","similar"],["290285373","Yuri Shevchuk","similar"],["652307198","Yuri Vizbor","similar"],["922010002","Yuriy Briliantov","similar"],["634755651","Yuriy Loza","similar"],["1449022766","YННВ","similar"],["700625762","Zabyty Razgovor","similar"],["1596088996","ZADONSKAYA","similar"],["692318956","Zagi Bok","similar"],["1446458439","ZAKHARY","similar"],["1584333370","ZAMUROVANNII","similar"],["447067424","Zanuda","similar"],["189435941","Zarya","similar"],["1461760296","zavet","similar"],["1359151469","ZAVTRA BROSHU","similar"],["1451055887","Zell","similar"],["340415778","Zhanna Friske","similar"],["1492754070","zhanulka","similar"],["682132089","Zheltaya Vetka","similar"],["956865258","Zhenya Dep","similar"],["838557884","Zhenya Glukk","similar"],["1065218492","Zilberman","similar"],["667874315","Zimavsegda","similar"],["285050290","Zimovie Zverey","similar"],["1187347692","Zinc Freaks","similar"],["712175138","Zinoviy Gerdt","similar"],["657365674","Zloy Dukh","similar"],["597876328","ZNAKI","similar"],["960966720","Zoloto","similar"],["1054744626","Zomb","similar"],["775356202","Zorge","similar"],["931784568","Zoya Yashchenko","similar"],["858644734","Zventa Sventana","similar"],["1449276998","zygomaticus","similar"],["1524981188","А в голове море","similar"],["1532440592","А4","similar"],["703565248","АБВИОТУРА","similar"],["1551461514","Абрикоса","similar"],["1859977935","Авиасейлс","similar"],["722586959","Автограф","similar"],["1458169686","Автоматические Удовлетворители","similar"],["1434231758","Автоспорт","similar"],["1468971635","Автостопом по фазе сна","similar"],["1476719865","АДЛИН","similar"],["1527913517","Акустический лес","similar"],["1460811132","Алан Гегуев","similar"],["1350556162","Алан Черкасов","similar"],["1437650834","Александр Башлачев","similar"],["830405635","Александр Борисов","similar"],["1088345875","Александр Владимирцов","similar"],["1006999277","Александр Евстигнеев","similar"],["751053816","Александр Звинцов","similar"],["1102372583","Александр Корецкий","similar"],["713093788","Александр Пермяков","similar"],["848811933","Александр Смирнов","similar"],["1468888702","Александр Устюгов","similar"],["712175188","Александр Хочинский","similar"],["1097757555","Александр Шоуа","similar"],["828371897","Александр Щербина","similar"],["1282074578","Александр Эгромжан","similar"],["814860575","Александр Юрпалов","similar"],["1698892045","Алексей Баранов","similar"],["958732251","Алексей Иващенко","similar"],["1324481694","Алексей Косов","similar"],["1485564009","Алексей Петрухин","similar"],["1699439756","Алексей Фалько","similar"],["1508180186","Алесандр Новиков","similar"],["736460074","Алик Боков","similar"],["1643434963","Алиса Буслова","similar"],["1125938470","Алмас Багратиони","similar"],["1434564939","АлСми","similar"],["1577023735","Альберт Назранов","similar"],["1842122085","Алёна.exe","similar"],["1637949462","Аманит","similar"],["1526012763","Амура","similar"],["1456644675","Анархия","similar"],["1523622286","Анастасия Волочкова","similar"],["937719081","Анатолий Киреев","similar"],["898244662","Анатолий Крупнов","similar"],["1096486431","Ангел-хранитель","similar"],["1453552934","Англия","similar"],["658212923","Андрей Державин","similar"],["1210311079","Андрей Картавцев","similar"],["945815672","Андрей Котов","similar"],["665106555","Андрей Леницкий","similar"],["1460137820","Андрей Макаревич","similar"],["736282339","Андрей Мягков","similar"],["1532195142","Андрей Раевский","similar"],["1129209904","Андрей Шпехт","similar"],["1511426723","Анна Благова","similar"],["1483792637","Анна Дворжецкая","similar"],["738049406","Ансамбль народных инструментов п/у Эммануила Шейнкмана","similar"],["1588366310","Антон Захаров","similar"],["1015986227","Антон Лаврентьев","similar"],["1512033485","Аня Pokrov","similar"],["1688367031","Аня из Питера","similar"],["1444642429","Апаска","similar"],["1505566919","Апельсиний Жмых","similar"],["1407942818","Апрелия","similar"],["738004488","Аракс","similar"],["1631517965","Арина Рая","similar"],["1235695823","Аркайда","similar"],["1458284062","Аркестр АУ","similar"],["1444077350","Арсен Шахунц","similar"],["1345818726","Арсений Креститель","similar"],["1502895085","Артем Тото","similar"],["1110690813","Артерия","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_14';
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

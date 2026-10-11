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

  const ARTISTS = [["1571472855","Smoke Bush","similar"],["1068191388","SOCRAT","similar"],["1324603688","Soft Blade","similar"],["925021309","Sol Zemli","similar"],["1871397814","SOLLI","similar"],["1374317727","SOLOMONA","similar"],["1601206256","SOLOWAY","similar"],["1487886000","Soltwine","similar"],["1071068365","Somerset","similar"],["1651183915","somewhaat","similar"],["1498778618","Sonic Death","similar"],["72980322","Sonya","similar"],["1510492689","sonya morskaya","similar"],["1445605822","SORA","similar"],["1542813620","Sorry Jesus","similar"],["1434103100","Sorta","similar"],["953929992","Soufee","similar"],["1559933495","Souljaa","similar"],["1893994639","Sound From R.K","similar"],["1514405936","spand","similar"],["861905254","Spitfire","similar"],["1527844340","Sqwore","similar"],["1297519790","ssshhhiiittt!","similar"],["205087567","St. Petersburg Academic Symphony Orchestra","similar"],["382086072","ST1M","similar"],["1591956996","Star Media Team","similar"],["378458316","Staryi Priyatel","similar"],["735075008","Stas Namin & Gruppa Tsvety","similar"],["1210179709","Stay Away","similar"],["973617177","STED.D","similar"],["1843606871","Step","similar"],["1565330050","SteshOK","similar"],["1188761929","Stink Palm","similar"],["1587391758","Stolen Loops","similar"],["805474305","Stolny Grad","similar"],["1689556316","STOPBAN","similar"],["1458547772","Strange","similar"],["1459631294","STRANIZA","similar"],["958763263","Strannye Igry","similar"],["1418089836","Subbota","similar"],["1794981994","succubus club","similar"],["1894028037","Sun (несущая свет)","similar"],["1241714909","Sunburst","similar"],["574431202","SUNSAY","similar"],["1441773264","Super Collection Orchestra","similar"],["1486189838","Super Zhorik","similar"],["1127728416","SUPERIOR.CAT.PROTEUS","similar"],["1536378580","Superkomfort","similar"],["1491248881","Superyunost","similar"],["685978163","Sveta","similar"],["510567692","Svetlana Razina","similar"],["641928697","Svetlana Rerih","similar"],["548143955","Svetlana Surganova","similar"],["963952336","Svidanie","similar"],["649855247","Svintsovy Tuman","similar"],["721626993","Svobodny Polet","similar"],["1462645566","Swanmortuus","similar"],["1445881765","Symbol","similar"],["1525349030","Sимптом","similar"],["952406898","T.A. Loc","similar"],["597359763","T1One","similar"],["910902703","Ta Storona","similar"],["684080692","Tabu","similar"],["1541858099","TAKETAKE","similar"],["1598009768","TalanT","similar"],["728167987","Tamara Miansarova","similar"],["797608031","Tamara Tsereteli","similar"],["1477533256","Tanir & Tyomcha","similar"],["1465589155","Tanya Tekis","similar"],["1157459697","TARAS","similar"],["1563636226","TARDY","similar"],["1624651377","TASSO","similar"],["838340897","Tati","similar"],["690310111","Tatiana Ancifirova","similar"],["696727196","Tatiana Chubarova","similar"],["474130476","Tatyana Zykina","similar"],["1449169287","TAYÖKA","similar"],["872807131","Tbili Teply","similar"],["1526450956","TELETAPE","similar"],["595552398","Televizor","similar"],["515321737","Tell Me a Fairytale","similar"],["1348513439","TELLY GRAVE","similar"],["1546218952","TEMNEE","similar"],["1841708667","Temo","similar"],["404654272","TENCA","similar"],["1468507137","TERELYA","similar"],["1631611477","tewiq","similar"],["1495388908","THE ANIMEBIT","similar"],["1106821419","The Blue Tractor","similar"],["485198520","The Chemodan","similar"],["1628843592","THE DAWLESS","similar"],["494609338","The Korea","similar"],["585112311","The MATRIXX","similar"],["1462659953","The OM","similar"],["1380547423","The Vazeline","similar"],["1718039721","TIGO","similar"],["385925971","Tim Aminov","similar"],["1440144384","tima ishet svet","similar"],["1035677495","Time-Out","similar"],["757735251","Timur Temirov","similar"],["675211646","Timur Valeev i Gruppa Kluchi","similar"],["1489092022","TINI LIN","similar"],["602816656","Tipichny Ritm","similar"],["603337482","Tipsi Tip","similar"],["1552008108","TKN","similar"],["690099897","TOKiO","similar"],["1569083993","TONI","similar"],["1704779532","TONY SANTANA","similar"],["814562914","Toobe","similar"],["583888618","Torba-na-Kruche","similar"],["926743874","Tragediya Vsey Zhyzni","similar"],["1564083577","treepside","similar"],["1821370039","trepet","similar"],["943353565","Trezvyy Zaryad","similar"],["586174462","Triada","similar"],["265982925","Triangle Sun","similar"],["1592079583","TRIDA","similar"],["1483204583","Tripinadva","similar"],["1294910125","TRITIA","similar"],["912944072","Trubetskoy","similar"],["744135858","Truckdrivers","similar"],["807468362","TRUEten","similar"],["6782918006","TSARICA","similar"],["1592158304","tsb","similar"],["841402512","TselRazgrom","similar"],["1744375473","tuborosho","similar"],["1157460742","TumaniYO","similar"],["1457025384","TURAL EVEREST","similar"],["705264540","Turbomoda","similar"],["502129370","Tushi Svet","similar"],["535600193","Tutsi","similar"],["1500473960","Twinky","similar"],["1464125703","Tyagotenie","similar"],["1435244234","U-G-A-D-A-I-K-T-O","similar"],["1569516442","UBEL","similar"],["1491330853","UDACCI","similar"],["1476133130","ugarov","similar"],["1749446445","uglyhot","similar"],["1503393062","uglystephan","similar"],["611003422","Umka & Bronevik","similar"],["1546480817","UncleFlexxx","similar"],["1484103152","UNDERGROOVER","similar"],["1596349881","unki","similar"],["1171417392","UPALLNIGHT","similar"],["705103793","Ustinova","similar"],["1259409309","uxknow","similar"],["1843966223","uzbekprinse","similar"],["1048627624","V $ X V PRiNCE","similar"],["1237154447","Vadik Korolev","similar"],["727544153","Vadim Kozin","similar"],["666443094","Vadim Kurylev","similar"],["537808090","Vadim Kuzema","similar"],["829906446","Vadyara Blyuz","similar"],["1231086495","Vahram Vazyan","similar"],["729973343","Valentina Dvoryaninova","similar"],["964488806","Valentina Ponomareva","similar"],["401569925","Valentina Tolkunova","similar"],["454288519","Valeriy Leontiev","similar"],["729841109","Valeriy Obodzinskiy","similar"],["730779774","Valeriy Semin","similar"],["911357178","Valeriy Shunt","similar"],["897854414","Valeriy Yug","similar"],["698391177","Valeriy Zolotukhin","similar"],["1671858132","VALID","similar"],["701137722","Valium","similar"],["1580039894","Valkar","similar"],["1449854072","VALYA!VALYA!","similar"],["657299573","Varchun","similar"],["1026201730","Varvara Vizbor","similar"],["411592640","Vasily Shumov","similar"],["1470949019","VASYA","similar"],["633959331","Vasya Vasin","similar"],["1054387142","VAVAN","similar"],["775350087","Vector Five","similar"],["6779823344","VEDEYA","similar"],["590902482","Velvet","similar"],["722568567","Veniamin Smekhov","similar"],["619396407","Vera Polozkova","similar"],["1225969397","Verbludes","similar"],["1488599053","VERE DICTUM","similar"],["1509775823","VEREEL","similar"],["1881263079","VEREMEEV","similar"],["1884984685","vers1zee","similar"],["818705204","Vertep","similar"],["1467890980","VESCH","similar"],["686098305","Vesna","similar"],["1527571060","VESNA305","similar"],["1575194463","VEYTLAS","similar"],["963116557","VIA \"Korobeyniki\"","similar"],["813268208","VIA Plamya","similar"],["712845691","VIA Poyushchie Gitary","similar"],["709841841","VIA Poyushchie Serdtsa","similar"],["625301465","VibeTGK","similar"],["1526031580","Victoria Kaunova","similar"],["1503981983","ViJi","similar"],["457068755","Vika Tsyganova","similar"],["821560790","Viktor Berkovskiy","similar"],["986288386","Viktor Dorin","similar"],["673265295","Viktor Lebedev","similar"],["1108460368","Viktor Loginov","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_13';
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

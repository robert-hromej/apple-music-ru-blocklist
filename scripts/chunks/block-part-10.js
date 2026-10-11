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

  const ARTISTS = [["1103031032","Kovsh","similar"],["913357803","Kozhany Olen","similar"],["1038416739","Kradenoe Solntse","similar"],["1864705414","Krapiva Jazz","similar"],["495876927","Krasnaya Plesen","similar"],["1522571979","KRASNOPOLSKY","similar"],["840848786","Krasnye Zvezdy","similar"],["1632610363","kreamm","similar"],["1234584496","KRESTALL / Courier","similar"],["1482309487","Krestovy Tuz","similar"],["1594829512","krio more","similar"],["593542311","Krip-a-Krip","similar"],["1519088114","Krissten","similar"],["1685832590","KRISTIEE","similar"],["1377096571","Kristina Kosheleva","similar"],["762517888","KRUGERS","similar"],["1870713424","Krutakov","similar"],["1651208132","KSB muzic","similar"],["1473949708","Kseniya Rassomakhina","similar"],["872807138","Kto TAM?","similar"],["1613784509","KUDOKUSHI","similar"],["484265970","Kunteynir","similar"],["602597074","Kuper","similar"],["1734383584","kurokov","similar"],["1301458640","KURT92","similar"],["1494919361","KUZMIN Absolute Band","similar"],["586462636","Kvartal","similar"],["1788223821","kvartira134","similar"],["1690001779","KVINKA","similar"],["1577746460","KwaZzaR","similar"],["1502280902","kyNZai","similar"],["720868318","L (iZReaL)","similar"],["1437355121","Lactic Acid","similar"],["458890469","Lada Dance","similar"],["1798363731","lafkrat","similar"],["433689263","Laima Vaikule","similar"],["1496806095","Laladevochka","similar"],["597876776","Lampasy","similar"],["1019047245","Landyshi","similar"],["632869775","Larisa Makarskaya","similar"],["729919123","Larisa Mondrus","similar"],["717839416","Laskovy Byk","similar"],["369648816","Laskovy May","similar"],["794256260","LDMA","similar"],["685233747","Led 9","similar"],["942956196","Legalnyy Bizne$$","similar"],["595660430","Legendy Pro...","similar"],["1373669981","Leila","similar"],["1469563592","Lelya","similar"],["455726401","Lena Katina","similar"],["333464737","Lenin","similar"],["1126475345","Lenzvuk","similar"],["722568570","Leonid Filatov","similar"],["728203920","Leonid Kanevskiy","similar"],["183225115","Leonid Rudenko","similar"],["712175159","Leonid Serebrennikov","similar"],["121997746","Leonsia Erdenko","similar"],["533824039","Lera Masskva","similar"],["591802446","Lera Ogonek","similar"],["1481999226","Leraiie","similar"],["590332831","Lesha Maestro","similar"],["1534689682","Letana","similar"],["1470666399","Leto V Gorode","similar"],["1477978064","Levan Goroziya","similar"],["1489325868","Levandowskiy","similar"],["1148973610","Leysya Pesnya","similar"],["1490101026","Lida","similar"],["598663345","Ligalize","similar"],["1495557868","Light Above","similar"],["1841839212","lightprey","similar"],["1729131919","LIKO","similar"],["1232213823","LIKVID","similar"],["1498600035","lil 17th","similar"],["1606106856","LIL THE NEEL","similar"],["1271717614","LILDRUGHILL","similar"],["603667941","Liliya Shaulukhova","similar"],["1661413470","LilSemmi","similar"],["1566213813","Limbo","similar"],["1501935075","LIMU","similar"],["417222951","Lipelis","similar"],["310964912","Little Big","similar"],["1412692632","Litvinenko","similar"],["1608035814","LIZA","similar"],["1761998915","LIZA BOYKA","similar"],["1464028767","LKN","similar"],["1235725371","LKVR","similar"],["525146488","Lobo","similar"],["1772235303","Locked23","similar"],["1648622179","Loco OG Rocka","similar"],["1491589901","LOLIWZ","similar"],["420752280","Lori! Lori!","similar"],["1434286178","LOTTU G","similar"],["1176927962","LOVANDA","similar"],["1352422957","Lovejoy, 1973","similar"],["1578452679","LOVER","similar"],["1449471726","Lovesomemama","similar"],["1479229369","Lovvlovver","similar"],["1414039731","lowlife","similar"],["901311228","LSD - Levostoronnee Dvizhenie","similar"],["1504200177","Lu.D!","similar"],["263374968","Lubov Shepilova","similar"],["1112409855","LUCAVEROS","similar"],["928634938","Luchshiy Samy Den","similar"],["688460625","Ludmila Berlinskaya","similar"],["557211997","Ludmila Gurchenko","similar"],["605580998","Ludmila Sokolova","similar"],["901906297","Luperkal","similar"],["1225276552","Lurmish","similar"],["1457050683","Lustova","similar"],["1475248065","LUTIC","similar"],["1439802344","LXE","similar"],["1632079047","LXNER","similar"],["736344087","Lyudmila Lyadova","similar"],["632869815","Lyudmila Senchina","similar"],["469809045","Lyudmila Zykina","similar"],["360365008","M Clis","similar"],["378254510","M()eSTRo","similar"],["261997466","M-Town","similar"],["1270883422","M00NCHILD","similar"],["696707487","Magamet Dzybov","similar"],["913151436","Magicool","similar"],["1199026241","Magu","similar"],["875938006","Maite","similar"],["1477320393","Makrae","similar"],["1581105599","Maksimovna","similar"],["611680251","Malchishnik","similar"],["1624524272","Malcolm Kush","similar"],["1069878564","Mama","similar"],["1168662278","MAMA RUSSIA","similar"],["1033108529","Mamulki Bend, Мамульки бенд","similar"],["657767063","Manizha","similar"],["1496445604","Mankagroove","similar"],["950758320","Manysheva","similar"],["1730034369","mapt0v","similar"],["279455367","Marakesh","similar"],["1449136325","MARCO-9","similar"],["1473851944","MARCUS","similar"],["632938266","Margarita Suvorova","similar"],["337538013","Margenta","similar"],["1890027956","Margushev Arsen","similar"],["1540572101","Mari Greens","similar"],["1510753939","Maria Zayceva","similar"],["708387542","Marina Devyatova","similar"],["728178105","Mariya Pakhomenko","similar"],["661638119","Mariya Rzhevskaya","similar"],["729159111","Mark Bernes","similar"],["1545563593","MARKINA","similar"],["203135398","Markscheider Kunst","similar"],["1679331454","Mars Deimos","similar"],["1483756468","Marselle","similar"],["1481958645","MARSI","similar"],["1148018531","Mart","similar"],["1595189584","mart'o","similar"],["1600909676","Marto","similar"],["1427377712","Maryana Ro","similar"],["284401498","Masha","similar"],["590325726","Masha & Medvedi","similar"],["463938387","Mashkov","similar"],["975410306","Master","similar"],["990264461","Matador","similar"],["1558086950","MAUR","similar"],["1483501274","Mav-d","similar"],["844357186","Mavrik","similar"],["1779103636","maxxytren","similar"],["638056881","Maya Kristalinskaya","similar"],["657382731","Mayakovskiy","similar"],["1405000750","MC Кальмар","similar"],["1444339005","MEDIO","similar"],["1576540299","medkoff","similar"],["1471551842","Megi Gogitidze","similar"],["1403334351","Mekhman","similar"],["1327867674","MellowBite","similar"],["1366242009","MERZOTA","similar"],["578087193","Mesr","similar"],["901893297","Mestniy","similar"],["1481536798","Metox","similar"],["861218498","MGK","similar"],["1514386808","Michelz","similar"],["872684532","MidiBlack","similar"],["1516835063","Midix","similar"],["691899594","Mify","similar"],["1672066175","Migrant","similar"],["1890192951","Mihael Gudovskih","similar"],["328327287","Mihey","similar"],["1551623398","MIIIKHL","similar"],["477674348","Mikael Tariverdiev","similar"],["1019157836","Mike","similar"],["524340849","Mike Naumenko","similar"],["830405627","Mikhail Aleksandrovich","similar"],["785395558","Mikhail Bashakov","similar"],["622861669","Mikhail Gulko","similar"],["668866261","Mikhail Mikhailov","similar"],["633398761","Mikhail Muromov","similar"],["526091939","Mikhail Vladimirov","similar"],["383176433","Mikhail Zvezdinskiy","similar"],["1563063540","Milana Khametova","similar"],["1519166139","Milana Star","similar"],["1499286457","milesmorales","similar"],["1676890890","MIROLYBOVA","similar"],["1531712459","MirON42","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_10';
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

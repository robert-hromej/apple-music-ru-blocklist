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

  const ARTISTS = [["1461913679","DEEMARS & GUNZ","similar"],["1181104631","DEEP-EX-SENSE","similar"],["635667252","Default City","similar"],["520032715","Deform","similar"],["1581666426","DELLY","similar"],["660366516","Demidych","similar"],["786684185","DenDerty","similar"],["887374220","Denis RiDer","similar"],["1367489232","Dequine","similar"],["6775961641","descending","similar"],["1765297896","desely","similar"],["1451524140","Destroy It","similar"],["591063856","Detskiy Hor \"Velikan\"","similar"],["1228138685","Devika Shawty","similar"],["847460581","Devushka Shkolnika","similar"],["1419628882","Dew","similar"],["1696435466","deyezaxo","similar"],["1584651774","di liberta","similar"],["680253379","Diana Arbenina","similar"],["381783255","Didyulya","similar"],["343545376","Digimortal","similar"],["668866215","Dilizhans","similar"],["712571631","Dima Golov","similar"],["739400951","Dima Kaminskiy","similar"],["1528019554","Dima Roux","similar"],["1865292221","DIMAi_Music","similar"],["672216454","Dinamit","similar"],["360754442","Dino MC47","similar"],["204362937","Distemper","similar"],["1877624820","DJ BiakOff","similar"],["1631425119","dj hvost","similar"],["738641721","DJ Nik One","similar"],["340415781","DJ Noiz","similar"],["1452949793","DJ Polkovnik","similar"],["1708613371","DJ Stonik1917","similar"],["1554278063","DJ TINOKI","similar"],["1619364554","dj trippie flameboy","similar"],["1814594523","DJ Блокnote","similar"],["1318250866","DJ ТРАХОДРОН","similar"],["2827345","Dk","similar"],["1451727593","dlb","similar"],["1561374930","DM-STUDIO","similar"],["636459237","Dmitriy Revyakin","similar"],["1738944315","Dmitry Spirin","similar"],["1037791223","Dmitry Voronin","similar"],["1054697388","Dobrovolets","similar"],["1510991475","DOFIN","similar"],["1510884225","dog's cigarette","similar"],["1843755102","Dohaka6","similar"],["867523095","Doktor Kinchev","similar"],["583063280","Dominick Jocker","similar"],["1462902057","domiNo","similar"],["1453185206","DONJUANS","similar"],["1582827095","DONOR","similar"],["1528170162","DooMee","similar"],["1611586288","dope17","similar"],["1515774054","DopeVvs","similar"],["1659828227","Dracondaz","similar"],["1434353616","Drezden","similar"],["1474021496","DRIADA","similar"],["1491306486","DRILBIT","similar"],["1519032957","drowsyy","similar"],["1436623033","DRUCY","similar"],["1098118283","Drugly Cats","similar"],["1043714318","DRUMMATIX","similar"],["1385136854","Dub Beans","similar"],["1492738883","DUFREIN","similar"],["1455525574","DV Street","similar"],["990701799","Dva Samoleta","similar"],["1195178423","Dvanov","similar"],["1635295926","Dvatritape","similar"],["679688140","Dymovaya Zavesa","similar"],["279455507","Dyshi","similar"],["1107333224","Dyuna","similar"],["1614633427","Dzhenis","similar"],["550809869","E.S.T.","similar"],["1511038590","EDD CURLY","similar"],["1248336560","Edik Salonikski","similar"],["575667242","Edita Piekha","similar"],["1811106221","Edmon Vard","similar"],["474171220","Edmund Shklyarskiy","similar"],["967803579","Eduard Izmestiev","similar"],["1321164187","Edvan","similar"],["1273164558","Eeva","similar"],["1300542766","Egor & Opizdenevshie","similar"],["586597399","Egor Letov","similar"],["588558700","Egor Sesarev","similar"],["1185186864","EIMIC","similar"],["589463423","Ekaterina Semenova","similar"],["1670468083","ekho017","similar"],["678846679","Eldar Dalgatov","similar"],["622194694","Elektrorebyata","similar"],["1444308389","elele","similar"],["632938277","Elena Kuzmina","similar"],["360758264","Elena Terleeva","similar"],["1658611718","Elizabett","similar"],["1038158144","Elizaveta","similar"],["1487385804","ELLEYN","similar"],["1738620125","ELWAI","similar"],["1641738380","elyaplugg!","similar"],["567684102","ELYSIUM","similar"],["1685799411","Emoslut666","similar"],["979506114","Endshpil","similar"],["1646996860","Enina","similar"],["1161960851","ENIQUE","similar"],["1389004444","Enrasta","similar"],["1651196363","ENTYPE","similar"],["1469912302","ephemeral","similar"],["1487720044","ERIAN","similar"],["1171301147","Erika Lundmoen","similar"],["1756864568","erix","similar"],["920457704","Ermak!","similar"],["733060","ESKIN","similar"],["1677943917","essaluv","similar"],["488485213","Eve Lesov","similar"],["6789168205","EVELONA","similar"],["1563241902","Everst","similar"],["809802890","Evgeniy Belousov","similar"],["686862997","Evgeniy Evstigneev","similar"],["901371599","Evgeniy Klyachkin","similar"],["642872671","Evgeniy Krylatov","similar"],["660287300","Evgeniy Lubimtsev","similar"],["535707687","Evgeniy Margulis","similar"],["590253771","Evgeniy Ross","similar"],["411242153","Evil Not Alone","similar"],["1394334454","EXCE$$","similar"],["1555552239","Fakeholder","similar"],["656633517","Faktor 2","similar"],["1221871756","Fallen Mc","similar"],["1746462554","fallen777angel","similar"],["182788710","Fargo","similar"],["1439604623","FAVLAV","similar"],["1077940347","Fedor Chistyakov","similar"],["703746714","Fedorov & Kruzenshtern","similar"],["744361755","Fedosey","similar"],["849866604","Felix Ivanov","similar"],["1484719822","fem.love","similar"],["1454101799","FENDIGLOCK","similar"],["1520533236","FEODOQ","similar"],["1667071734","ffuckdrream","similar"],["1569393736","FinBetter","similar"],["1775886569","Firaya","similar"],["1477087570","FirstFeel","similar"],["828504805","FixMe","similar"],["1199819621","FIZICA","similar"],["920537244","Flagi","similar"],["1615396909","flamyway","similar"],["1758278815","fleece flower","similar"],["1597484232","FleetHap","similar"],["1785720427","FLOCKAA","similar"],["1478892422","flykey","similar"],["784642554","Flëur","similar"],["1076920419","FMSAO","similar"],["964986023","Forces United","similar"],["776663222","Foresteppe","similar"],["1597802683","Forma Oblaka","similar"],["1721933897","FORTUNA 812","similar"],["738049117","Forum","similar"],["1140003019","Franky","similar"],["1538593585","FrazyBaby","similar"],["1500431816","FREDDY RED","similar"],["628536102","Freestyle","similar"],["1489935221","FRESCO","similar"],["1564513591","from rus","similar"],["1272273693","Fun Mode","similar"],["1582708405","fuvelirf","similar"],["1554205404","Gadsden Snakes","similar"],["1259623778","Gagik Ezakyan","similar"],["1222537434","galafo","similar"],["1026713561","galat","similar"],["677263035","Galina Nenasheva","similar"],["632938219","Galina Nevara","similar"],["875846152","Galina Smuchinskaya","similar"],["1375745944","GaoDagamo","similar"],["1462080257","Garazhi","similar"],["1846677056","Garik Garik","similar"],["901906223","Garri Topor","similar"],["1526952793","GARSON","similar"],["1609600420","Gasto","similar"],["630278111","Gavriil Lubnin","similar"],["1524765141","GAVRILINA","similar"],["527118562","Gayana","similar"],["1555753643","Gayka","similar"],["1377685432","Gazan","similar"],["1320926470","GAZIROVKA","similar"],["728167890","Gelena Velikanova","similar"],["1484363114","GENJUTSU","similar"],["430794597","Gennadiy Belov","similar"],["598704389","Gennadiy Zharov","similar"],["712175223","Gennady Trofimov","similar"],["563403823","Georgi Vinogradov","similar"],["878066373","Georgy Garanian","similar"],["1722826948","gera amen","similar"],["828013530","Ghost Hippies","similar"],["940044420","Gidayyat","similar"],["648249432","Gilza","similar"],["1449168831","GIVENBYSKY","similar"],["1477251973","GLAM GO!","similar"],["470703115","Gleb Samoiloff & The MATRIXX","similar"],["585112268","Gleb Samoyloff","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_08';
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

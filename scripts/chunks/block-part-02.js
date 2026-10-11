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

  const ARTISTS = [["674194855","Elena Kamburova","core"],["661638057","Elena Temnikova","core"],["587863165","Elena Vaenga","core"],["284266767","Elka","core"],["1470689067","ELLA","core"],["1253064201","ELMAN","core"],["729956319","Elmira Zherzdeva","core"],["495572053","Elvira T","core"],["275351904","EMIN","core"],["1830049975","ENZRO","core"],["424022271","Epidemiya","core"],["1498485838","escape","core"],["930593303","Eschevskiy","core"],["1548326141","ETOLUBOV","core"],["590253753","Evgeniy Kemerovskiy","core"],["863874196","Evgeniy Osin","core"],["311405561","F.P.G","core"],["203968372","Fabrika","core"],["1290520265","FACE","core"],["1611204892","Feal","core"],["597228040","FEDUK","core"],["598711147","Fedya Karmanov","core"],["322919393","Filatov","core"],["1068013702","Filatov & Karas","core"],["1405601422","FINIK","core"],["1254455931","FLESH","core"],["1258218228","Flipper Floyd","core"],["1292648150","FREDDY RED","core"],["1580171427","FRIENDLY THUG 52 NGG","core"],["1602344075","From The Garbage","core"],["1502175590","G4OUR","core"],["877689132","GAFT","core"],["1478930539","Gafur","core"],["1539637846","Galibri & Mavik","core"],["600353552","Garik Krichevskiy","core"],["634335341","Garik Sukachev","core"],["1369463415","Gasto","core"],["1437398609","GAYAZOV$ BROTHER$","core"],["346434336","GeeGun","core"],["659923953","Gennadiy Gladkov","core"],["422107728","Genya Belousov","core"],["265508974","Georgiy Vinogradov","core"],["712582797","Georgiy Vitsin","core"],["773164171","Gera Grach","core"],["1228138667","GLEBASTA SPAL","core"],["821965061","Glintshake","core"],["1156132453","Glintshake","core"],["1368549255","GODDEEM","core"],["594487835","Golubye Berety","core"],["1034284081","GONE.Fludd","core"],["14447889","Gorky Park","core"],["1570097852","Goro","core"],["575223695","Gosti Iz Budushchego","core"],["548623459","Gradusy","core"],["713093774","Grand Symphony Orchestra of All-Union National Radio Service and Central Television Networks","core"],["474555710","Grazhdanskaya Oborona","core"],["1329361120","Grechka","core"],["1109352275","Griby","core"],["868020109","Grigoriy Gladkov","core"],["1328535545","Grivina","core"],["781114361","Grot","core"],["617767545","Gruppa 30.02","core"],["908192450","Gruppa Maugli","core"],["836377429","Gruppa Na-Na","core"],["554986704","Gruppa Poputchik","core"],["784829018","Gruppa Premer-Ministr","core"],["789801799","Gruppa Sekret","core"],["899101219","Gruppa Skomorokhi","core"],["1421739109","Gruppa Skryptonite","core"],["1495353093","Gruppa TOTAL","core"],["1562221718","grust200","core"],["1230080454","GSPD","core"],["642924098","Guf","core"],["1490238959","GUMA","core"],["1484112784","HAMMALI","core"],["1216864141","HammAli & Navai","core"],["1471356251","HENSY","core"],["1460086540","Hi-Fi","core"],["1645321733","hohot","core"],["1481508334","HOLLYFLAME","core"],["1434446284","Horus","core"],["69342064","Hospital","core"],["1183454326","Human Tetris","core"],["909146745","Husky","core"],["1123087234","I61","core"],["829814422","IC3PEAK","core"],["1563426461","Icegergert","core"],["1475461856","Idris & Leos","core"],["339742993","Igor Krutoy","core"],["339733041","Igor Nikolaev","core"],["668204481","Igor Sarukhanov","core"],["589426666","Igor Slutskiy","core"],["388084092","Igor Talkov","core"],["943391032","Ilya Lagutenko","core"],["592679809","In2Nation","core"],["677970693","Infiniti","core"],["1465235237","INSTASAMKA","core"],["1010596446","Intelligency","core"],["367570856","IOWA","core"],["216061573","Irakli","core"],["553369592","Irina Allegrova","core"],["440752191","Irina Krug","core"],["873333052","Irina Saltykova","core"],["1252727187","IROH","core"],["589440757","Ivan Kuchin","core"],["1353430631","Ivan Valeev","core"],["452561731","Ivanushki International","core"],["1472888065","JABO","core"],["948029024","Jah Khalib","core"],["1674235020","JAKOMO","core"],["629151064","Jakone","core"],["1481796064","JANAGA","core"],["129659665","Jane Air","core"],["730362087","Jango","core"],["1549531149","JEEMBO","core"],["1599703782","jemappellepolin","core"],["1171120554","JILLZAY","core"],["1444702518","JONY","core"],["1031387752","Jubilee","core"],["1617297110","Kai Angel","core"],["636447651","Kalinov Most","core"],["1482422674","KALUSH","core"],["1570620834","KALVADOS","core"],["1496160810","Kambulat","core"],["352344842","Karandash","core"],["130000849","Karas","core"],["738269410","Kaspiyskiy Gruz","core"],["340420197","Kasta","core"],["1148577809","Kate NV","core"],["606918752","Katerina Golitsyna","core"],["362124802","Katya Lel","core"],["459071609","Katya Ogonek","core"],["459044431","Kay Metov","core"],["1051825296","Kedr Livanskiy","core"],["639644513","Khleb","core"],["1752856087","Kiliana","core"],["621768190","Kino","core"],["378458286","Kirpichi","core"],["503131736","kizaru","core"],["340424320","Klara Rumyanova","core"],["1101147912","Klava Koka","core"],["703565280","Klyuchevaya","core"],["573962739","KnyaZz","core"],["1013804635","Kobyla I Trupoglazye Zhaby Iskali Tseziyu, Nashli Pozdno Utrom Svistyashchego Hna","core"],["1544614187","Kolibri","core"],["1245686618","Komsomol'sk","core"],["1490033620","Konfuz","core"],["910449733","Korni","core"],["129994805","Korol I Shut","core"],["1388263758","KOSMONAVTOV NET","core"],["1391094568","Koss","core"],["674245801","Kovyazin D","core"],["299884253","Kraski","core"],["737251158","Kravz","core"],["291240152","Krec","core"],["378458332","Krematoriy","core"],["697908665","Kris Kelmi","core"],["369799705","Kristina Orbakaite","core"],["685986151","Krovostok","core"],["722586969","Kruiz","core"],["362306237","Kukryniksy","core"],["919435398","Kukuruza","core"],["698171180","Kurara","core"],["585398565","L'One","core"],["838362591","La Vtornik","core"],["654007099","Larisa Chernikova","core"],["645767716","LASCALA","core"],["1606328785","lek","core"],["83741585","Leningrad","core"],["47815497","Leonid Agutin","core"],["926903726","Leonid Fedorov","core"],["452703656","Leprikonsy","core"],["1101305467","Lesha Svik","core"],["657627003","Lesopoval","core"],["705297665","Lev Barashkov","core"],["573226650","Lev Leshchenko","core"],["312361545","Licey","core"],["1541217810","Lika MC","core"],["323286890","Lika Star","core"],["1345892399","LIL KRYSTALLL","core"],["1450149680","Lil Morty","core"],["590345314","Linda","core"],["1294004668","Liza Gromova","core"],["1271717607","Lizer","core"],["455553113","Loc-Dog","core"],["459405868","Lolita","core"],["680146234","Loqiemean","core"],["410063121","Louna","core"],["966500635","Lovozero","core"],["1453218855","LOVV66","core"],["743866483","Loya","core"],["943459711","LSP","core"],["982943928","Lucidvox","core"],["637838011","Lumen","core"],["151738694","Luxor","core"],["808438925","Lx24","core"],["651632105","Lyapis Trubetskoy","core"],["1557989960","LYRIQ","core"],["286565895","Lyubov Uspenskaya","core"],["1274458374","M'Dee","core"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_02';
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

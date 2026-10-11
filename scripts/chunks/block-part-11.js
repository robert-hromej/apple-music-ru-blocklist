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

  const ARTISTS = [["1713314514","MIROSLAVA","similar"],["781114348","Misha Mavashi","similar"],["1463729915","Missu","similar"],["1317007569","MLK+","similar"],["853966777","Mnogotochie Band","similar"],["1458832264","MNRGORODCKIY","similar"],["694820023","Mojito","similar"],["1478740208","Molchat Doma","similar"],["1680824681","Monelina","similar"],["1499837344","MONEYKEN","similar"],["924667929","MONOLIZA","similar"],["1595600259","MONRAU","similar"],["290522052","Moon Far Away","similar"],["664435589","More","similar"],["700551593","More & Relsy","similar"],["911058441","Mosty","similar"],["1468952279","MOTELBLVCK","similar"],["1523351033","mountflower","similar"],["1450936286","Mr Lambo","similar"],["1445913334","MriD","similar"],["1653390810","Ms Mira","similar"],["1454098249","Mult96","similar"],["1134699481","Multiverse","similar"],["1225574467","MURDA KILLA","similar"],["1340824152","mushta BAND","similar"],["974715490","Musia Totibadze","similar"],["1498741803","MUTI","similar"],["404700260","My Rockets Up","similar"],["1601368982","MY-RO","similar"],["1437812470","mzlff","similar"],["1437165811","N.Masteroff","similar"],["1470460959","N.MASTEROFF","similar"],["472554595","N1NT3ND0","similar"],["668052339","Nachalo Veka","similar"],["279840320","Nadezhda Babkina","similar"],["464293760","Nadezhda Chepraga","similar"],["1577911631","Nail Shary","similar"],["1107109307","najtivyhod","similar"],["1454256918","Nalien","similar"],["1280978170","Namo Minigun","similar"],["1511965588","NANSI & SIDOROV","similar"],["1529473453","naomonis","similar"],["1370401230","NARKOMFIN","similar"],["1071052681","Nastasya","similar"],["751221316","Nastya","similar"],["1349460565","Natalia Faustova","similar"],["779436477","Nataliya Bystrova","similar"],["269753014","Nataliya Gulkina","similar"],["533248180","Natalya Senchukova","similar"],["1398284519","Natami","similar"],["868101147","Natasha Galich","similar"],["1506255357","natta","similar"],["1494582591","nazlo","similar"],["523650311","NEANGELY","similar"],["1360460629","Nebezao","similar"],["606323871","Nebo Zdes","similar"],["1437807604","NECHAEV","similar"],["1459870008","NEDRY","similar"],["1472538362","NEEL","similar"],["1533947568","Neki","similar"],["1570281145","Nekoglai","similar"],["979759983","NEL","similar"],["1464599144","NEMIGA","similar"],["591380477","Nemnogo Nervno","similar"],["900901259","Nensi","similar"],["1479816399","NEONATE","similar"],["711360506","Neposedy","similar"],["641113237","Nervy","similar"],["1514829953","netaxxeli","similar"],["1524024493","NETU$IL","similar"],["1502583726","Neverlove","similar"],["1103864865","Neversmile","similar"],["1537011252","NEWLIGHTCHILD","similar"],["1520021168","NEXTIME","similar"],["660227024","Nigativ","similar"],["1235841659","Nik Rostov","similar"],["1453093162","Nika Benami","similar"],["1434632644","NIKIDA","similar"],["638807513","NIKITA","similar"],["1426292933","Nikita Kamenskiy","similar"],["988122656","Nikita Mastyak","similar"],["310958857","Nikita Mikhalkov","similar"],["926265481","Nikita Stashevskiy","similar"],["1448462804","Nikitata","similar"],["1704839911","Nikol","similar"],["641163610","Nikolay Gusev","similar"],["694361677","Nikolay Karachentsov","similar"],["733790625","Nikolay Kryuchkov","similar"],["712557810","Nikolay Litvinov","similar"],["953565573","Nikolay Rostov","similar"],["525408115","Nina Brodskaya","similar"],["1591277414","NKOSMO","similar"],["1450634184","NLO","similar"],["1455359136","nmilova","similar"],["1779132015","NNOTKAT","similar"],["1315129368","noa","similar"],["1126033340","Nochnoy Prospekt","similar"],["391486180","Nocow","similar"],["898349550","Nodar Reviya","similar"],["1458149132","Nola","similar"],["1470016714","NoMercy","similar"],["511322370","Nonamerz","similar"],["1440490251","Nonkonformistka","similar"],["1157703672","Nordic Sound Band","similar"],["1702929059","Norimyxxxo","similar"],["1165098219","Not Agree","similar"],["1795723653","notscale","similar"],["1684672189","NOVЫЙ","similar"],["1636532197","NoНейма","similar"],["807430490","NRG","similar"],["1131622053","NTL","similar"],["1567442853","nttrl","similar"],["990440766","Nuki","similar"],["1471637653","O3EQ","similar"],["634233293","Obe-Rek","similar"],["598633648","Obedinennaya Kasta","similar"],["948665543","Obgon","similar"],["1518689096","OBLOVE","similar"],["1321919133","OFFMi","similar"],["1024797548","OG Prince","similar"],["1639659606","OGCENT","similar"],["1252962431","Okolo Poludnya","similar"],["726974609","Okolorep","similar"],["640135351","Oksana Pochepa","similar"],["872958247","Oleg Gruz","similar"],["451566286","Oleg Medvedev","similar"],["444132808","Oleg Nesterov","similar"],["712175121","Oleg Popov","similar"],["1118952880","Oleg Smit","similar"],["586914062","Olga Kormukhina","similar"],["874264094","Olga Pirags","similar"],["285392969","Olga Sergeeva","similar"],["534148458","Olga Seryabkina","similar"],["588130377","Olga Stelmakh","similar"],["596406634","Olga Zarubina","similar"],["942391283","Olvi","similar"],["1238506561","Onative","similar"],["1773331749","ONDA ANDAR","similar"],["1527561723","ONEIL","similar"],["1514806115","Onilow","similar"],["1819775637","onna badvibes","similar"],["1790884373","Oops Baby","similar"],["1328924188","Opasnye Sosedi","similar"],["1614699169","opium2k","similar"],["966548302","Optimystica Orchestra","similar"],["1579524480","Oranzhevaya korova","similar"],["1512817262","Oreo Ereo","similar"],["597969026","Orgiya Pravednikov","similar"],["1222057877","Origami","similar"],["1528208237","OSA","similar"],["1531292473","OSCAL","similar"],["947862002","Oscar","similar"],["968668623","OSOBOV","similar"],["1289387466","Otvaal","similar"],["941131821","P.S.7.62","similar"],["382149672","Padla Bear Outfit","similar"],["1049536435","Palagin","similar"],["473665038","Palina","similar"],["1395235511","Panama Vaiz","similar"],["1457226168","Papin Olimpos","similar"],["446049899","Para Normalnyh","similar"],["880224881","Parks, Squares and Alleys","similar"],["1355868739","PARTICLES","similar"],["1454131916","passmurny","similar"],["1464987888","Pastor Napas","similar"],["1440821063","Patipaco","similar"],["657844981","Pavel Dodonov","similar"],["605803628","Pavel Esenin","similar"],["640330710","Pavel Kashin","similar"],["456537767","Pavel Mikhaylov","similar"],["673389950","Pavel Petrovich","similar"],["807899246","Pavel Pikovskiy","similar"],["712175095","Pavel Smeyan","similar"],["746119210","Pavel Volya","similar"],["1465227641","pavluchenko","similar"],["1499581922","pavshiy","similar"],["1597454496","PEGAS","similar"],["335865221","Pelageya","similar"],["1484188438","Pepel Nahudi","similar"],["1010826479","Peremotka","similar"],["1105336874","Pes & Gruppa","similar"],["597090556","Pesochnye Lyudi","similar"],["849866601","Peteris Tils","similar"],["382776480","Petlura","similar"],["727544170","Petr Kirichek","similar"],["331649663","Petr Mamonov","similar"],["1864087735","PI1eER","similar"],["1447814264","PIKCHI!","similar"],["1508799385","PINQ","similar"],["896184715","Pionerlager Pylnaya Raduga","similar"],["1512899770","PLACKO","similar"],["1522069906","Plamenev","similar"],["1325076427","PLAVNCK","similar"],["1451945375","Playboidaddi","similar"],["1326844035","playingtheangel","similar"],["265989330","PLC","similar"],["1002600454","Ploho","similar"],["1390569747","PLOHOYPAREN","similar"],["852393353","Ploshchad Vosstaniya","similar"],["1451613566","Ploty","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_11';
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

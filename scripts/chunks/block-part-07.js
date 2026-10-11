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

  const ARTISTS = [["1518661863","Anwar","similar"],["583072002","Anzhelika Nachesova","similar"],["1511400801","AQYLA","similar"],["1455906964","Ara Martirosyan","similar"],["1220135785","Archanga","similar"],["1190027295","Archi","similar"],["859817490","ARDA","similar"],["1117338331","Arkadi Dumikyan","similar"],["705237115","Arkadiy Khoralov","similar"],["733296450","Arkadiy Pogodin","similar"],["474982739","Arkadiy Ukupnik","similar"],["958426895","ArktidA","similar"],["1527130049","Armageddon Trip","similar"],["711360743","Armen Dzhigarkhanyan","similar"],["1564989386","Armich","similar"],["1747737871","ARS JALI","similar"],["1742291704","Arseny Morozov","similar"],["469474794","Artem Tatishchevskiy","similar"],["320039469","Arthur Eisen","similar"],["479119675","Artur Berkut","similar"],["921865342","Artur Best","similar"],["690999936","Artur Khalatov","similar"],["894639415","Artur Kreem","similar"],["1556202934","Arut","similar"],["1609953755","Asatro","similar"],["1569043151","ASH","similar"],["1501759298","ASHY 43","similar"],["1347175680","Aspen","similar"],["1690011285","AsteraSounds","similar"],["299524067","Asti","similar"],["1809488374","ASYAMF","similar"],["1435355946","Atellwulf","similar"],["429122309","Atlantida Project","similar"],["1523666749","AUGUST","similar"],["1475494221","AUNT TABBY","similar"],["551255960","Auroraw","similar"],["1716559108","Ava Suslon","similar"],["1281269230","Avega","similar"],["1605968804","AVENITA","similar"],["1606568969","Avenuepluggg","similar"],["964182849","Avgust","similar"],["1752653951","Avia","similar"],["368180329","Avraam Russo","similar"],["1454280409","AVRAMOVA!","similar"],["1742393806","Awakinzxc","similar"],["1795677160","AY YOLA","similar"],["602509373","Aydamir Eldarov","similar"],["690999877","Aydamir Mugu","similar"],["1496052144","AYRYS","similar"],["1626205446","AYU","similar"],["394327774","Ayvengo","similar"],["595637769","Azamat Bishtov","similar"],["690999866","Azamat Pheshkhov","similar"],["1517473252","AZZ","similar"],["1251928006","Babangida","similar"],["1553229569","Baby Cute","similar"],["1647782038","Baby Melo","similar"],["1549487866","Babyface Melo","similar"],["874230580","Bad B. Альянс","similar"],["879100621","Bad B. ПРО...","similar"],["325526763","Bad Balance","similar"],["1202988542","Bad Zu","similar"],["1301459641","badCurt","similar"],["1472433241","Bakhtin","similar"],["666300607","Bakhyt Kompot","similar"],["1552904011","Bakr","similar"],["1573476360","BALTIYSKIY","similar"],["1483088404","BANVIVAN","similar"],["1661929343","bapewigga","similar"],["545631348","Barbariki","similar"],["583849982","Barto","similar"],["1581583963","Barz","similar"],["1441773166","Batrai","similar"],["471095649","BeatMagik","similar"],["669222638","Beautiful Boys","similar"],["591383058","Belomorkanal","similar"],["602816630","Belye Bratya","similar"],["1881577617","BEREZHNO","similar"],["721660129","Bez Povodka","similar"],["1609609658","bianco bravo","similar"],["1043407845","Bicycles For Afghanistan","similar"],["355056517","Big Black Boots","similar"],["1182389136","Biggie Mote","similar"],["1521391432","Biggy Bongs","similar"],["1440587380","BILIK","similar"],["852908303","Billy Novik","similar"],["1495954955","Bioconstructor","similar"],["1462338453","Bird Bone","similar"],["1105015399","BIRTMAN","similar"],["1755399313","BIS","similar"],["1485911705","Bitcevsky park","similar"],["1842898802","BJ Studio","similar"],["1189451879","Black Cupro","similar"],["1276189584","Black Market","similar"],["1795456660","Blatnoy Udar Aziz","similar"],["1754102405","BLAZER 993","similar"],["1558707976","BLAZH БЛАЖЬ","similar"],["1085894557","Bleki s Bangi","similar"],["1505045051","Blockkid","similar"],["753276231","Blondinka KsU","similar"],["1877195225","blondinka TASHA","similar"],["1837121882","Blyadaval","similar"],["1473505839","BODIEV","similar"],["880974796","Bogdan Titomir","similar"],["302358230","Boka","similar"],["1216632796","bollywoodFM","similar"],["1370125424","Boni.ka","similar"],["1478771561","Bonsai","similar"],["1442145074","BOOKER","similar"],["1043710154","Boris Grim","similar"],["736276123","Boris Kuznetsov","similar"],["1153639988","Bosikom Po Solntsu","similar"],["348059617","BRANDENBURG","similar"],["27537918","Brandon Stone","similar"],["948745944","BRATUBRAT","similar"],["603675738","Bratya Radchenko","similar"],["706161396","Bratya Shakhunts","similar"],["1498099339","Bredboysband","similar"],["1165047128","Breezey Montana","similar"],["1274506638","Brick Bazuka","similar"],["316937593","Brom","similar"],["1485712032","BRONAS","similar"],["1495668224","Broosnica","similar"],["1812705804","BRVZ","similar"],["1515912065","Bubble Bath Cat","similar"],["1604001675","BUINAGOLOVUSHKA","similar"],["672670065","Bulat Okudzhava","similar"],["1475960022","BULAVA","similar"],["1451177498","Buruhin","similar"],["1491927593","bychkov","similar"],["1492826137","Bzik","similar"],["1189937543","C4","similar"],["605007613","Cabaret-Duet Academy","similar"],["957948303","California Bez Kostochek","similar"],["1459957588","CALLMYDD","similar"],["1436282869","Captown","similar"],["1457040452","Castle","similar"],["922286561","Catharsis","similar"],["1559364295","Catt's Digital","similar"],["656936505","Celebrine","similar"],["1477145716","CEO of Everything","similar"],["1528760097","Chamber Choir of Krupskaya Leningrad Institute of Culture and Arts","similar"],["1562703973","CHEBANOV","similar"],["1450763995","Cheeef","similar"],["313283896","Chelsi","similar"],["1460618308","CHEPIKK","similar"],["1199991269","Chernaya Rechka","similar"],["1252962420","Chernikovskaya Hata","similar"],["1226626536","Chernoburkv","similar"],["742088007","Cherny Obelisk","similar"],["1444684155","Cherocky","similar"],["1493000696","CHERRY BERRY","similar"],["1555729722","Chesssh","similar"],["909409544","Chester Nebro","similar"],["1062590586","Chestnyy","similar"],["630701644","Chetyre Tarakana","similar"],["744885860","Chi-Li","similar"],["1050032439","chill","similar"],["791166149","ChipaChip","similar"],["648516441","Chizh","similar"],["1462732330","chonyatsky","similar"],["1471040253","Chris Yank","similar"],["1469769705","CLNSBLL","similar"],["1108542603","Clockwork Times","similar"],["1444923668","CloudLight","similar"],["1719751610","clout","similar"],["1286472066","CMH","similar"],["1098366357","Cocktail Jazz","similar"],["1457997100","COLDAH","similar"],["1316969135","COLDCLOUD","similar"],["1138008683","Communism","similar"],["1553470041","CUPSIZE","similar"],["611209811","CVPELLV","similar"],["252689718","CWT","similar"],["1522899571","D'Litte","similar"],["455576180","D-MAN 55","similar"],["435030938","D.masta","similar"],["1618317122","D.O.B.","similar"],["488550463","D.O.B. Community","similar"],["1522193052","D4P","similar"],["602818184","DA-108","similar"],["274409986","Dagaz","similar"],["1087881729","Dana Sokolova","similar"],["1482922020","danchainz","similar"],["737774154","Daniel Shake","similar"],["1550599267","dannyopenthedoor","similar"],["1252020665","Dante","similar"],["1364865509","DanyMuse","similar"],["720868336","Darom Dabro","similar"],["1282941300","Darrem","similar"],["1659386705","daryana","similar"],["1563241344","DASHI","similar"],["1134693953","Dato","similar"],["1447228866","DAVA","similar"],["1628884004","DAVID","similar"],["1472096598","David Khinikadze","similar"],["547292594","David Tukhmanov","similar"],["1471683844","daybe","similar"],["722422229","Dayte Dva","similar"],["1823668695","deathmarried","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_07';
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

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

  const ARTISTS = [["1048676671","#2Mashi","core"],["1321362218","044 ROSE","core"],["1171216411","104","core"],["1456286645","10AGE","core"],["1458525620","163ONMYNECK","core"],["607413604","25/17","core"],["353676585","2H Company","core"],["635629967","4 Позиции Бруно","core"],["493593561","5sta Family","core"],["1020934545","5UTRA","core"],["331647880","7000$","core"],["255593401","7B","core"],["640520453","7rasa","core"],["659149073","9 Gramm","core"],["1294637073","A'Studio","core"],["365515476","A.V.G","core"],["1533716530","Aarne","core"],["1451993417","Acid Racer","core"],["1295747620","Ada","core"],["1445606139","ADAMYAN","core"],["1281530111","Adler Kotsba","core"],["914156364","Affinage","core"],["861946330","Afina","core"],["400615958","Agatha Christie","core"],["1099260782","AGON","core"],["1494454705","Agunda","core"],["1222911062","AIGEL","core"],["590332748","AK-47","core"],["1466810909","Akha","core"],["1536140840","Akmal'","core"],["466873036","Akvarium","core"],["1641728117","ALBLAK 52","core"],["1489175223","ALEKS ATAMAN","core"],["673278973","Aleksandr Barykin","core"],["809826352","Aleksandr Bashlachev","core"],["594506817","Aleksandr Dobronravov","core"],["552905662","Aleksandr Dumin","core"],["577327342","Aleksandr F. Sklyar","core"],["571071316","Aleksandr Gradskiy","core"],["736276129","Aleksandr Kalyagin","core"],["627749531","Aleksandr Novikov","core"],["591209706","Aleksandr Serov","core"],["620044550","Aleksej Smirnov","core"],["589456722","Aleksey Bryantsev","core"],["610244883","Aleksey Chumakoff","core"],["695226362","Aleksey Romanov","core"],["646831914","Aleksey Rybnikov","core"],["669825389","Aleksey Vorobev","core"],["459071584","Alena Apina","core"],["340419689","Alena Sviridova","core"],["642913684","Alexander Rozenbaum","core"],["564657683","Alisa","core"],["721832187","Alisa Freyndlix","core"],["459417265","Alisa Mon","core"],["412930766","Alla Pugacheva","core"],["881027285","Allj","core"],["1729544470","ALMARY","core"],["798702206","AloeVera","core"],["475540887","Alpha-Beta","core"],["45217556","Alsou","core"],["807472908","Alyans","core"],["1462293086","AMCHI","core"],["1562635765","Amirchik","core"],["573799679","Anacondaz","core"],["627725681","Anatoliy Dneprov","core"],["453772016","Anatoliy Polotno","core"],["589421864","Andrey Bandera","core"],["312359265","Andrey Gubin","core"],["658212865","Andrey Makarevich","core"],["712175078","Andrey Mironov","core"],["1419671751","ANDRO","core"],["252533","Andy Panda","core"],["1132504782","ANIKV","core"],["378458372","Animal Jazz","core"],["816376415","AnimatsiYa","core"],["705331668","Anita Tsoy","core"],["1215008293","ANIVAR","core"],["1603420021","ANNA ASTI","core"],["496130652","Anna Sedokova","core"],["1011580588","Antoha MC","core"],["815088383","Anton Maskeliade","core"],["601991787","Anton Zatsepin","core"],["600129823","Anya Vorobey","core"],["581501198","Anzhelika Varum","core"],["1458080299","AP$ENT","core"],["646139967","Aria","core"],["1447052076","ARTEM SHILOVETS","core"],["670907868","ARTEMIEV","core"],["594792560","Arthur Pirozhkov","core"],["255110663","Artik","core"],["1073575628","ARTIK & ASTI","core"],["590253760","Artur","core"],["1429919101","ASAMMUELL","core"],["651612232","Assai","core"],["1095478183","ATL","core"],["592405403","Auktyon","core"],["1531324219","BAGARDI","core"],["583060280","Bahh Tee","core"],["462668102","Balagan Limited","core"],["283309103","BAND'EROS","core"],["605093852","Banda","core"],["496266453","Basic Boy","core"],["1372953342","Basta","core"],["1473810401","BATO","core"],["672673549","Bazil","core"],["1764325904","BEARWOLF","core"],["667390334","Bely Orel","core"],["1447230708","Beng","core"],["586919688","Bi-2","core"],["338703297","Bianka","core"],["1356097231","Big Baby Tape","core"],["736431109","Big Children's Choir","core"],["733011244","BIG RUSSIAN BOSS","core"],["903779181","BigBeta","core"],["1467394440","BITTUEV","core"],["1726286433","blackwater","core"],["1347184114","blago white","core"],["575578874","Blestyashchie","core"],["1513155702","BLIZKEY","core"],["668781942","Boogrov","core"],["728366157","Boris Grebenshchikov","core"],["312347665","Boris Moiseev","core"],["1129931073","Boulevard Depo","core"],["731572085","Bozhya Korovka","core"],["1552683189","BRANYA","core"],["312387700","Bratiya Grim","core"],["840359929","Bravo","core"],["640881495","Brigada C","core"],["490830252","Brigadniy Podryad","core"],["1539010387","BULA","core"],["1143508697","Bumble Beezy","core"],["591064162","BumeR","core"],["586376081","Burito","core"],["1490831713","BUSHIDO ZHO","core"],["1527429709","BUSTER","core"],["377848296","Butyrka","core"],["1524416796","By Индия","core"],["1435835151","CAKEBOY","core"],["582812335","Car-Man","core"],["985128566","Casual","core"],["583623416","Center","core"],["362131770","CENTR","core"],["885404592","CG Bros","core"],["313268424","Chai Vdvoem","core"],["454048241","Chaif","core"],["484265481","Chernaya Ekonomika","core"],["878543516","Cherny Kofe","core"],["380438720","Chikiss","core"],["597963010","Children's Choir","core"],["1447106994","Costa Lacoste","core"],["595633531","CREAM SODA","core"],["1400731319","CYGO","core"],["610241985","Dabro","core"],["1230051303","Dajte Tank (!)","core"],["819072846","DAKOOKA","core"],["720828960","Danko","core"],["622194722","Dasha Shults","core"],["1444756691","DASHXX","core"],["215934500","DDT","core"],["1588389117","De Vika","core"],["1498417050","DEAD BLONDE","core"],["905182113","Dekabr","core"],["570776625","Demo","core"],["629958614","Denis Klyaver","core"],["589372382","Denis Maydanov","core"],["455576259","Detsl aka Le Truk","core"],["279072890","Diana Gurtskaya","core"],["160343465","Dima Bilan","core"],["463801152","Dima Midborn","core"],["1082152020","Dima NeBilan","core"],["1479057217","DIOR","core"],["1877357036","directoreels","core"],["668205896","Diskoteka Avariya","core"],["544669895","DJ Groove","core"],["1862778575","DJ NARODNII","core"],["817022904","DJ Pankratov","core"],["15861463","DJ Smash","core"],["1528170242","DK","core"],["1178955389","Dmitriy Emelianov","core"],["363706299","Dmitriy Koldun","core"],["339737463","Dmitriy Malikov","core"],["621582432","Dmitriy Pryanov","core"],["1025977599","Dmitry Evgrafov","core"],["899825181","DMTS","core"],["1050708302","Dolphin","core"],["886766201","DONI","core"],["1228138532","DOPECLVB","core"],["1449969935","Dora","core"],["1454808243","Dose","core"],["1370313792","Dvrklxght","core"],["1326905624","Dzharo & Khanza","core"],["272564967","Dzierzynski Bitz","core"],["1055323115","Dругой Ветер","core"],["634582346","Ed Shulzhevskiy","core"],["1466772593","Eduard Artemyev","core"],["367926467","Eduard Khil","core"],["818678567","Egor Kreed","core"],["679133910","Elbrus Dzhanmirzoev","core"],["1233834722","Electroforez","core"],["689300427","Elektroklub","core"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_01';
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

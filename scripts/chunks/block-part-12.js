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

  const ARTISTS = [["734810924","PLYAZH","similar"],["1710910725","POCKET061","similar"],["1439366742","POEXXXALI","similar"],["1533071715","POEXXXALI","similar"],["1742248778","Police in Paris","similar"],["1517083969","Polin","similar"],["642862338","Polkovnik & Odnopolchane","similar"],["1288717744","polnalyubvi","similar"],["1104992986","POLTABLETKI","similar"],["682131769","Polumyagkie","similar"],["589096118","Polyusa","similar"],["868698385","PORT(812)","similar"],["1072890465","Position","similar"],["696777856","Posle 11","similar"],["929706737","Poslednie Tanki V Parizhe","similar"],["1447316692","postoyanno","similar"],["1096722111","Power Tale","similar"],["294971949","PRAVADA","similar"],["1538599032","Predznanie","similar"],["1251831434","PRESCO LUCCI","similar"],["1183507670","Pretty Scream","similar"],["550689511","Priklucheniya Elektronikov","similar"],["1498369740","princess of north sudan","similar"],["953242000","Princesse Angine","similar"],["941117253","Project Fay","similar"],["584118728","Prokhor & Puzo","similar"],["1555560414","Proliitariat","similar"],["1521536241","PROOVY","similar"],["219758093","Psoy Korolenko","similar"],["589232014","Ptakha","similar"],["1298513301","Punk Goon Rock Band SG","similar"],["1542659680","Pupis","similar"],["1505028642","Pure","similar"],["904860248","Purgen","similar"],["1624070439","PUSHNOVA","similar"],["618462947","Pyatiletka","similar"],["1605756935","qeatcute","similar"],["1478276023","quiizzzmeow","similar"],["1550884265","R.A.SVET","similar"],["1386122895","R.Riccardo","similar"],["909438413","RadaR","similar"],["1632395751","Radil","similar"],["1391201836","RADIO TAPOK","similar"],["597383441","Radiotrans","similar"],["849866613","Raisa Dmitrenko","similar"],["736420321","Raisa Nemenova","similar"],["1317946174","RAM","similar"],["279455377","Ranetki","similar"],["1486248340","RARIBOI","similar"],["1542741204","Rashamba","similar"],["726974641","Raskolnikov","similar"],["404925270","Raumskaya","similar"],["573304995","RAVANNA","similar"],["931437653","Rayon Moey Mechty","similar"],["590587320","RE-pac","similar"],["1696979284","REDJJI","similar"],["1233460811","REDO","similar"],["1648474976","REDSTEP","similar"],["1772115632","REMINI","similar"],["1508334704","retroyse","similar"],["1239856778","Reverbcore","similar"],["537824900","Revolvers","similar"],["1149360756","Rickey F","similar"],["1471113627","RILEY BABY","similar"],["1610550402","RIMSS","similar"],["956981799","RIPBEAT","similar"],["1536142452","rizza","similar"],["61820196","RO","similar"],["1760347087","RO","similar"],["862465284","Rock Band SV","similar"],["722601716","Rock-Atelye","similar"],["385961523","Roma Zhukov","similar"],["1265869512","Roman Voloznev","similar"],["1452614362","Romario","similar"],["1611572914","Roobanok","similar"],["1243998686","Rosemary Loves a Blackberry","similar"],["1488623798","Rotten Toten","similar"],["1533249963","Routine","similar"],["1607992527","Royal Fenix","similar"],["1523128850","Rozalia","similar"],["1044230524","Rozhden","similar"],["1705917884","RUBI","similar"],["1463878170","RUD!N","similar"],["1553879471","RUNA","similar"],["279072812","Ruslan Alekhno","similar"],["691013839","Ruslan Kazantsev","similar"],["1790858717","Russian","similar"],["871189307","Russian Size","similar"],["450689931","Russian State Symphony Orchestra Of Cinematography","similar"],["1131286108","Russian Village Boys","similar"],["597314034","Russkie Deti","similar"],["695757956","Rustaveli","similar"],["1382506313","RVMZES","similar"],["878137951","Ryan Otter","similar"],["1472237700","RYZE","similar"],["260731311","S.P.O.R.T.","similar"],["1533052630","SABBAT","similar"],["1522808556","Sadraddin","similar"],["1606182465","safetypleace","similar"],["947887846","Sagath","similar"],["698606616","Sagrada","similar"],["1486184111","SAINT G.","similar"],["1533251385","SAKURA","similar"],["705297946","Samotsvety","similar"],["1588631978","Samurai SLT","similar"],["1417217787","Santiz","similar"],["1029234106","Sapa13","similar"],["1579895417","Saq","similar"],["686021891","Saro Vardanyan","similar"],["863244474","Sasha Santa","similar"],["1202780824","Sasha Stick","similar"],["1083551020","Sasha Vinogradova","similar"],["1762976580","sashayoffa","similar"],["1460384379","Say Mo","similar"],["1340970027","saypink!","similar"],["744558492","Sbornaya Soyuza","similar"],["301601057","Schokk","similar"],["709163926","SD","similar"],["1541828986","seeyaet","similar"],["1459240644","SEEYASIDE","similar"],["708511194","Segodnyanochyu","similar"],["531116017","Sektor Gaza","similar"],["1028804463","SELFIE","similar"],["918376311","Selfieman","similar"],["1455729829","SELLOUT","similar"],["1449106399","SERAFIMA","similar"],["777653585","Sergei Skripka","similar"],["673278985","Sergey Belikov","similar"],["597191105","Sergey Bobunets","similar"],["564041686","Sergey Chumakov","similar"],["599969915","Sergey Dubrovin","similar"],["594146887","Sergey Galanin","similar"],["591382982","Sergey Ginzburg","similar"],["749960566","Sergey Grubov","similar"],["739511446","Sergey Kuprik","similar"],["607474585","Sergey Kurenkov","similar"],["594488223","Sergey Lubavin","similar"],["780343840","Sergey Mazaev","similar"],["659005336","Sergey Minaev","similar"],["591382925","Sergey Nagovicyn","similar"],["461040055","Sergey Penkin","similar"],["604100776","Sergey Russkih-SeVeR","similar"],["904275987","Sergey Slavyanskiy","similar"],["599578667","Sergey Vasyuta","similar"],["738064234","Sergey Yakovenko","similar"],["440595933","Sergey Zakharov","similar"],["263558882","Sergey Zhukov","similar"],["1703129922","Serjj","similar"],["1500003910","sestra.","similar"],["1523304961","Settlers","similar"],["1487593126","Sevak","similar"],["1458166199","SEVENROSE","similar"],["1681811363","SEVILLE","similar"],["1480713944","SEVNZ","similar"],["1528687451","Sexhater","similar"],["1535384672","SHAGALOVE","similar"],["717462186","Shakhmatist","similar"],["1511603717","SHAMI","similar"],["636913620","Shamkhan Daldaev","similar"],["1476510800","Shamo","similar"],["602920948","Shao? Bao!","similar"],["1222803765","SharOn","similar"],["1480954086","Sharygin","similar"],["1485403343","shawtyshine","similar"],["1656358964","SHAXO","similar"],["1447899926","shit shit shit!","similar"],["917284332","Shklovskiy","similar"],["1473100429","Showbiz School","similar"],["1595055995","SHTERN","similar"],["1020730629","Shura Kuznecova","similar"],["1453281475","Shurale","similar"],["598663700","Shym","similar"],["1292696759","SIDER","similar"],["1479449002","SIDODGI DUBOSHIT","similar"],["1574451341","sinaimaname","similar"],["639941505","Sinyaya Ptitsa","similar"],["488550466","Sir-J","similar"],["254030141","Six O","similar"],["1013942532","Skinny Chino","similar"],["1471019412","SKOOKINY DETI","similar"],["956864011","SKRO","similar"],["1223125906","Skulls, Angels and Sluts","similar"],["1496816227","Skurt","similar"],["599578664","Sladkiy Son","similar"],["1040603524","Slame","similar"],["1454036220","Slard","similar"],["868037064","Slava Bobkov","similar"],["1655719927","SLAVA SKRIPKA","similar"],["1437786416","Slavik Pogosov","similar"],["1891533086","SlawikXSound","similar"],["668998296","Slider & Magnit","similar"],["4459872","Slim","similar"],["1287460727","SLIMUS","similar"],["878596104","SlippahNeSpi","similar"],["506641832","Slivki","similar"],["1478259303","slohku","similar"],["160957018","Slot","similar"],["430626563","Slovetskiy","similar"],["1609054827","smazzi","similar"],["932890985","Smekh","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_12';
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

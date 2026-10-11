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

  const ARTISTS = [["1534780104","RYSO","core"],["1846638903","SABI","core"],["1521861013","SAGARA","core"],["1427819350","SALUKI","core"],["739068721","Samoe Bolshoe Prostoe Chislo","core"],["387391738","Sansara","core"],["592514143","Sasha Skul","core"],["508888118","Sati Kazanova","core"],["1571657261","SAYAN","core"],["1553893857","Scally Milano","core"],["1576540222","SCIRENA","core"],["475636707","Scofferlane","core"],["1440152629","SEEMEE","core"],["593038123","Sektor Gazovoy Ataki","core"],["254248201","SEREBRO","core"],["581380546","Serebryanaya Svadba","core"],["555587526","SerGa","core"],["34010487","Sergey Kuryokhin","core"],["255133049","Sergey Lazarev","core"],["334652535","Sergey Mavrin","core"],["674194931","Sergey Nikitin","core"],["339741329","Sergey Shnurov","core"],["730781504","Sergey Sukhachev","core"],["355034115","Sergey Trofimov","core"],["514096830","Sergey Voronov","core"],["1805920874","SERYABKINA","core"],["1318928073","SERYOGA","core"],["868697698","Severny Flot","core"],["1557885261","shadowraze","core"],["1682704549","SHINGA","core"],["1014048829","Shortparis","core"],["637154339","Shura","core"],["1492514757","SKB","core"],["1619960349","SKIDRI","core"],["837847154","Skryptonite","core"],["1536427155","SKY RAE","core"],["263425748","Slackers","core"],["633773502","Slava","core"],["1156448492","Slava KPSS","core"],["1251512636","SLAVA MARLOW","core"],["588098631","Slava Medyanik","core"],["768221580","Smetana Band","core"],["366970924","Smoky Mo","core"],["274277196","Smyslovye Gallyutsinatsii","core"],["1433836652","SODA LUV","core"],["452950942","Sogdiana","core"],["506415313","Sonic Death","core"],["1474964779","sonyaprosti","core"],["448036508","Soso Pavliashvili","core"],["1287168554","SOULOUD","core"],["1005189216","Sova","core"],["1348626239","Sozvezdie Otrezok","core"],["1454250745","SP4K","core"],["918042036","Spasibo","core"],["668788973","Splean","core"],["1355396814","SQWOZ BAB","core"],["266839111","ST","core"],["1279989158","StaFFорд63","core"],["587862977","Stas Mikhaylov","core"],["576512440","Stas Pieha","core"],["932828902","State Symphony Cinema Orchestra","core"],["1469369656","Stephan Pie","core"],["1003940079","Stigmata","core"],["715605335","Strelki","core"],["596869352","Sultan-Uragan","core"],["1500476338","SUNAMI","core"],["983590499","Super Besse","core"],["449491883","Surganova & Orkestr","core"],["1069878561","Svetlana Vladimirskaya","core"],["677627535","Syava","core"],["875058748","Synecdoche Montauk","core"],["718954463","T-Fest","core"],["270084905","T-killah","core"],["352317","t.A.T.u.","core"],["567231460","Taisiya Povaliy","core"],["1057423673","TamerlanAlena","core"],["524285073","Tantsy Minus","core"],["263342836","Tarakany!","core"],["459071512","Tatiana Bulanova","core"],["464770098","Tatiana Ovsienko","core"],["722568559","Tatyana Nikitina","core"],["611215915","Tatyana Tishinskaya","core"],["912923620","Te100steron","core"],["784223866","Teatr Pesni Talisman","core"],["1533997045","Tebe Legko","core"],["551910805","Teni Svobody","core"],["611947060","Tequilajazzz","core"],["1389448713","TERNOVOY","core"],["327261765","Tesla Boy","core"],["924653681","The Chemodan Clan","core"],["843628594","The Chizh & Co","core"],["841671016","The First Station","core"],["1161703189","The Hatters","core"],["915889966","The Jack Wood","core"],["1383284912","The Limba","core"],["569204197","The Retuses","core"],["393034588","Therr Maitz","core"],["366048562","Thomas Mraz","core"],["1235974098","THRILL PILL","core"],["1377631121","Timran","core"],["654734122","Timur Rodrigez","core"],["582829942","Timur Shaov","core"],["466044765","Tinavie","core"],["1513508897","Toxi$","core"],["382859965","Tracktor Bowling","core"],["541353744","Triagrutrika","core"],["786654647","Trud","core"],["1059346234","Truwer","core"],["1504851258","Turken","core"],["1202214602","TVETH","core"],["1290391979","TVOIGREH","core"],["273447766","U-Piter","core"],["1558452474","ulwu.nite","core"],["583244219","Uma2rman","core"],["1833913298","umirai","core"],["362306259","Undervud","core"],["1543718356","uniqe","core"],["1451655599","UNTONE CHERNOV","core"],["875955345","Usssy","core"],["644057648","Uta","core"],["410218646","Utro","core"],["593533767","Va-Bank","core"],["1488185823","VACÍO","core"],["712571656","Valentina Ignatyeva","core"],["766498576","Valeriy Kuras","core"],["290126401","Valeriy Meladze","core"],["466873416","Valeriy Sutkin","core"],["575579112","Valeriya","core"],["569204286","Vasya Oblomov","core"],["1728832719","VEIGEL","core"],["1185975352","VELIAL SQUAD","core"],["370916092","Vera Brezhneva","core"],["1425917947","VERBEE","core"],["254248422","Verka Serduchka","core"],["1129020546","Ves'","core"],["677574100","Vezhlivy Otkaz","core"],["219179639","VIA Gra","core"],["815046251","VIA Verasy","core"],["1460137454","VIA Volga-Volga","core"],["787054892","Vika Dayneko","core"],["440869311","Viktor Korolev","core"],["655109642","Viktor Popov","core"],["165826534","Viktor Tretiakov","core"],["1818347359","VILLIAN","core"],["674319958","Vintazh","core"],["644323979","Vitaliy Aksenov","core"],["501951774","Vitya AK","core"],["430791989","Vladimir Asmolov","core"],["668199553","Vladimir Chernyakov","core"],["388074706","Vladimir Kuzmin","core"],["648249397","Vladimir Presnyakov Jr.","core"],["508725007","Vladimir Shainskiy","core"],["907442073","Vladimir Zhdamirov","core"],["1140966809","VLNY","core"],["913274995","Vocal Quartet \"Ulybka\"","core"],["460100231","Vorovayki","core"],["466873337","Voskresenie","core"],["1529366483","Voskresenskii","core"],["1885771573","Vucko","core"],["451505887","Vyacheslav Butusov","core"],["771807991","Vyacheslav Myasnikov","core"],["582828291","Vykhod","core"],["1425920787","vyshel pokurit","core"],["1568674464","Wallem","core"],["1473020120","WE","core"],["560419649","weloveyouwinona","core"],["1484080064","whaleplayer","core"],["1123087266","White Punk","core"],["1587188794","whylovly","core"],["1708130977","whyspurky","core"],["1459789880","Xcho","core"],["1545946882","Xenaex","core"],["1552884324","XOLIDAYBOY","core"],["251055516","Xuman","core"],["504808246","Yana Blinder","core"],["278959467","Yanix","core"],["118360627","Yanka","core"],["620565874","Yaroslav Evdokimov","core"],["1164108943","Yaroslav Sumishevskiy","core"],["1553071344","YASMI","core"],["736675226","Yevgeny Leonov","core"],["781401339","Yorsh","core"],["733011148","Young P&H","core"],["994262697","Yulianna Karaulova","core"],["371987417","Yuliya Savicheva","core"],["777653513","Yuri Silantiev","core"],["601960825","Yuri Titov","core"],["698391080","Yuriy Nikulin","core"],["653091268","Zara","core"],["1000739413","Zavtrakkusto","core"],["380174444","Zemfira","core"],["452945267","Zemlyane","core"],["912495669","Zero People","core"],["466873181","Zhanna Aguzarova","core"],["677263013","Zhanna Rozhdestvenskaya","core"],["591382987","Zheka","core"],["1222992819","Zivert","core"],["583564881","Zolotoe Koltso Ensemble","core"],["524449241","Zoopark","core"],["355118630","Zveri","core"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_04';
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

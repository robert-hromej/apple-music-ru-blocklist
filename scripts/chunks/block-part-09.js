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

  const ARTISTS = [["1243567227","Globoos Ei","similar"],["1633080187","Glocki52","similar"],["1445224382","GLOOM","similar"],["1682289744","GLORY O'VISION","similar"],["598930271","Gluk'oZa","similar"],["1769212287","Glukoza","similar"],["1562942318","GODFLAME","similar"],["1809939069","gold archive","similar"],["1460424761","Golos Omeriki","similar"],["932574863","Golubi & Bezumnye Kashevary","similar"],["1507411456","GONIT BESA","similar"],["455576233","Good Hash Production","similar"],["1333093981","GOODY","similar"],["848214248","Gorod 312","similar"],["679632735","Gorshok","similar"],["390271919","Goryachiy Shokolad","similar"],["1498440211","GOSHU","similar"],["1831996930","gotlibgotlibgotlib","similar"],["1454262714","goto eight","similar"],["1517325112","Grad!ent","similar"],["727029696","Gran-Kurazh","similar"],["1473729373","Grebz","similar"],["1560120331","Green Apelsin","similar"],["1542349449","GRELAZY","similar"],["1640154599","greyrock","similar"],["1617945353","GRILLYAZH","similar"],["595333486","Grisha Urgant","similar"],["1083524133","GROMYKA","similar"],["1148990301","GroTTesque","similar"],["1835797407","Group Rasvet Mus","similar"],["594510167","Gruppa Bely Den","similar"],["2866220","Gruppa Deti","similar"],["631662192","Gruppa Eshelon","similar"],["643854541","Gruppa Express","similar"],["649527650","Gruppa Komissar","similar"],["909621597","Gruppa Ori!Zona!","similar"],["620565878","Gruppa Sladka Yagoda","similar"],["816296196","Gruppa SSSR","similar"],["815046255","Gruppa Stasa Namina","similar"],["924103600","Gruppa Vladimir","similar"],["1600039353","guntor","similar"],["1549527574","Guram D","similar"],["720868340","Gurme","similar"],["466917915","Guru Groove Foundation","similar"],["976525553","Gvardiya","similar"],["590680644","Hamil","similar"],["1617836924","HAR","similar"],["912969180","Hardballs","similar"],["1540355216","Hariki","similar"],["859483488","HASH TAG","similar"],["1155239888","Hawaiian Sadness","similar"],["1612043274","hehehe","similar"],["1461659121","Heliodor","similar"],["1678333784","HELLA HILLZ","similar"],["1659366660","Heronwater","similar"],["215822944","Hi-Fi","similar"],["1607190095","Highself","similar"],["1474413468","HIRO","similar"],["1454733479","HLOY","similar"],["1436035102","hmyrov","similar"],["1896617640","HNZ.","similar"],["1476459230","HOFMANNITA","similar"],["339150817","HOMIE","similar"],["1584010506","HONEY, THE HUSTLER","similar"],["1543555201","HOROSHIYAGNI","similar"],["1476380694","HOVO","similar"],["1588304411","HOVOS","similar"],["865547909","HSV","similar"],["822132802","HTB","similar"],["1464256281","Hugo Loud","similar"],["1493076480","HUNGRY PUNK","similar"],["733011089","Hustle Hard Flava","similar"],["1743232225","huzzy b","similar"],["1036771259","Hyggelig","similar"],["633892630","HZ","similar"],["1466935128","IDAN","similar"],["720955835","IDEA FIX","similar"],["698683143","Idefiks","similar"],["1495957620","idst","similar"],["706832650","IFWE","similar"],["1474805770","Ignat Izotov","similar"],["600353558","Igor Goryachev","similar"],["878123207","Igor Kornelyuk","similar"],["590271153","Igor Kupriyanoff","similar"],["1006980465","Igor Mikhalev","similar"],["686862961","Igor Sklyar","similar"],["1601238554","IKON","similar"],["762672056","Ildar Yuzhniy","similar"],["1171187490","ILIAMAZO","similar"],["1063391581","Illumate","similar"],["719980011","ILWT","similar"],["583450125","Ilya Chert","similar"],["526326390","Ilya Kireev","similar"],["1762711248","Imanis","similar"],["943795023","Imperiya","similar"],["607474652","In-Yan","similar"],["1616205207","ink street 101","similar"],["814547284","Inkognito","similar"],["632869791","Inna Asriyan","similar"],["597105701","Inna Malikova & Novye Samotsvety","similar"],["311005135","Inna Zhelannaya","similar"],["1472358170","INSPACE","similar"],["940582037","Intars Busulis","similar"],["1458028646","IntroVert","similar"],["1211140379","Invertor","similar"],["407823387","Iosif Kobzon","similar"],["1862206038","Irena Berti","similar"],["330819184","Irina Dubtsova","similar"],["632869667","Irina Elikarova","similar"],["681810792","Irina Ezhova","similar"],["875395006","Irina Otieva","similar"],["598202090","Irina Surina","similar"],["1475025516","ISMA","similar"],["1759915276","itzice","similar"],["797776521","Ivan Shmelev","similar"],["322361194","Ivan Starzev","similar"],["672205527","Ivanna","similar"],["1571759765","ivanzolo2004","similar"],["1650081338","iwabi","similar"],["733296481","Izabella Yureva","similar"],["1561758260","J. ROUH","similar"],["1861039715","J.NE","similar"],["317590341","Jahmal TGK","similar"],["1761406141","JALAGONIA","similar"],["1320142653","Jaman T","similar"],["1464569750","Jambul","similar"],["1493163266","Jamik","similar"],["602842556","Jamille","similar"],["285226077","Jan Coo","similar"],["1149074722","Janil Natas","similar"],["996380434","Jars","similar"],["1545026742","JAVII","similar"],["1669803911","Jecito","similar"],["1512258053","JELLboi","similar"],["642426036","Jenia Lubich","similar"],["1812118830","Jeny Vesna","similar"],["1496767377","jerk","similar"],["1504289193","JIMBEI","similar"],["1433839480","JIMM","similar"],["1268934649","Johnyboy","similar"],["1465184530","JUGHEAD","similar"],["1890494367","JUHURO","similar"],["584666426","Julia Parshuta","similar"],["1475832118","Junior","similar"],["1557230526","juste moi","similar"],["935753496","K.A.T.Y.A.","similar"],["1379772846","Ka-Re","similar"],["1447484950","KADI","similar"],["727029099","Kalevala","similar"],["1475265710","Kali","similar"],["880346930","Kamazz","similar"],["1472271902","Kamenolom","similar"],["642312674","Kamni","similar"],["1646865689","KAMZ0NER","similar"],["1437134923","KAPA","similar"],["1451991008","KARA KROSS","similar"],["1511806960","KARAT","similar"],["1051285648","Karolina","similar"],["1470263263","Kasseta","similar"],["764031915","Kassiopeya","similar"],["1465990668","katanacss","similar"],["1459103220","KATERINA","similar"],["1510230712","katitas","similar"],["597495277","Katya Chekhova","similar"],["1206751718","KAYA","similar"],["720868364","Kazhe Oboyma","similar"],["1347547020","KDRR","similar"],["1466733049","Kedr","similar"],["1518594660","Keep","similar"],["1479441064","Kental","similar"],["1406386462","KhaliF","similar"],["289756982","Khelavisa","similar"],["814581103","KhimerA","similar"],["705264433","Khochu","similar"],["1007291705","Khors","similar"],["901868742","Khvost","similar"],["1189904622","Kid Sole","similar"],["1376628933","Kidd","similar"],["1524426940","KILLA KOST","similar"],["650011200","Killagram","similar"],["844464207","Killer Honda","similar"],["334602356","Kipelov","similar"],["1503136583","KIPROK","similar"],["1031165396","Kirill Beatov","similar"],["1551886414","Kirov Reporting","similar"],["1506750778","Kiznaiver","similar"],["425945614","Klavdiya Shulzhenko","similar"],["1437623099","KlouKoma","similar"],["1318275875","KnightKnights","similar"],["820593326","Kokteyl Shalyapina","similar"],["1449734058","KOLYA HOLDUP","similar"],["570751340","Kombinatsiya","similar"],["590258959","Konets Filma","similar"],["1095441000","Konstanta","similar"],["445815941","Korney Chukovskiy","similar"],["790547515","Korroziya Metalla","similar"],["936645205","Korsika","similar"],["1435885657","Kosmos na Potolke","similar"],["1477101111","KOUT","similar"],["1698526786","KOVALEVA","similar"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_09';
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

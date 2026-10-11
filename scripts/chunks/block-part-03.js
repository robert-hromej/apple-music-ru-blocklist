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

  const ARTISTS = [["1657206517","MACAN","core"],["634241022","Machete","core"],["1526867191","Madiken","core"],["1598190372","madk1d","core"],["679731691","Magellanovo Oblako","core"],["1730824451","Magic Man","core"],["1458636603","Magnum Opus","core"],["448571608","MakSim","core"],["259086018","Maksim Leonidov","core"],["1374929612","Maksim Svoboda","core"],["1246291730","makulatura","core"],["816849967","Malinen","core"],["663213091","Mana Island","core"],["289453822","Manicure","core"],["680054488","Manufaktura","core"],["784500667","Mara","core"],["1501888921","Marbi","core"],["863244534","Mari Kraymbreri","core"],["712968014","Maria Lukach","core"],["511159649","Marina Khlebnikova","core"],["590333334","Mark Tishman","core"],["659860538","Markul","core"],["792412934","Mars Needs Lovers","core"],["1161673879","Mary Gu","core"],["510626737","Mashina Vremeni","core"],["1456123418","maslo chernogo tmina","core"],["1341643717","MATRANG","core"],["594629011","Max Korzh","core"],["369659778","Maxim Fadeev","core"],["1252888679","May Wave$","core"],["1458525039","MAYOT","core"],["945538478","MBAND","core"],["1444156919","MC Senechka","core"],["777648767","Mechtat","core"],["679149300","Megapolis","core"],["611170294","Melnitsa","core"],["698219432","Melodiya","core"],["1691285122","Merab Amzoevi","core"],["501950338","MEZZA","core"],["1393797061","MIA BOYKA","core"],["1853349793","micheff","core"],["1504150938","Mika Vino","core"],["633401107","Mikhail Boyarskiy","core"],["590253009","Mikhail Bublik","core"],["553783564","Mikhail Krug","core"],["631267467","Mikhail Sheleg","core"],["263373187","Mikhail Shufutinskiy","core"],["1471370149","Miko","core"],["1499362520","MIRAVI","core"],["299827210","Mirazh","core"],["1442193904","Mirèle","core"],["1068977277","Misha Marvin","core"],["1468368379","MITCHEL","core"],["450998569","MITYA","core"],["495571763","Mitya Fomin","core"],["1116295799","Miyagi","core"],["1451351592","Miyagi & Andy Panda","core"],["1408882613","Miyagi & Эндшпиль","core"],["658843546","Mnogotochie","core"],["1127728214","Mnogoznaal","core"],["391486076","Moa Pillar","core"],["6969910","MOLLY","core"],["1465587712","Molodoj Platon","core"],["1471130799","MONA","core"],["1455988971","Mona Songz","core"],["1156448786","Monetochka","core"],["659842478","Mongol Shuudan","core"],["594824995","Moralny Kodeks","core"],["1371400021","MORGENSHTERN","core"],["338919329","Motorama","core"],["868491649","Moya Mishel","core"],["1517867815","MUJEVA","core"],["289453867","Mujuice","core"],["773269593","Mukhtar Khordaev","core"],["1453853357","MUKKA","core"],["268782751","Mumiy Troll","core"],["633781590","Murakami","core"],["651901956","Murat Nasyrov","core"],["602446274","Murat Tkhagalegov","core"],["744406480","Murovei","core"],["719565708","Muslim Magomaev","core"],["919204069","Mustelide","core"],["676117776","Naadia","core"],["600346678","Nadezhda Kadysheva","core"],["1349771080","NAGART","core"],["648249420","Naik Borzov","core"],["628039814","Naive","core"],["604382388","Nargiz","core"],["582827981","Nastya Poleva","core"],["630703947","Natali","core"],["582803176","Natalia Podolskaya","core"],["458602735","Natalia Vetlitskaya","core"],["625456731","Natalia Vlasova","core"],["283744209","Natan","core"],["339733026","Natasha Koroleva","core"],["582803010","Nautilus Pompilius","core"],["62200235","NAVAI","core"],["216061710","Nepara","core"],["580768080","Neprikasaemye","core"],["690482391","Neschastny Sluchay","core"],["943367382","Neuromonakh Feofan","core"],["723506720","Nikita","core"],["511322383","Nikolay Noskov","core"],["510528668","Nikolay Trubach","core"],["1206741918","NILETTO","core"],["1171121360","Niman","core"],["409725337","Nina Karlsson","core"],["1397067372","Nineteen95","core"],["1528083145","nkeeei","core"],["562736794","Nochnye Snaipery","core"],["446310531","Noggano","core"],["583750231","Nogu Svelo!","core"],["292138099","Noize MC","core"],["864994628","Nol","core"],["1090405536","NOM","core"],["1614647079","NoMercy","core"],["421514205","NRKTK","core"],["1430082823","Nurminskiy","core"],["398798904","NYUSHA","core"],["1444667300","NЮ","core"],["960816793","Obe Dve","core"],["638750004","Oblachny Kray","core"],["980573737","OBLADAET","core"],["1382321701","OG BUDA","core"],["447879197","Oksana Orlova","core"],["501864276","Oleg Anofriev","core"],["736290768","Oleg Dal","core"],["719982056","Oleg Kenzov","core"],["726927023","Oleg Miami","core"],["510974513","Oleg Mityaev","core"],["674194888","Oleg Tabakov","core"],["701153673","Olga Arefieva & Kovcheg","core"],["588768087","Olga Buzova","core"],["663571227","Olga Rozhdestvenskaya","core"],["1480098652","Ollane","core"],["632858000","Olya Rozhdestvenskaya","core"],["352435071","On-The-Go","core"],["719084418","OneGin Please","core"],["1523959858","ooes","core"],["865183226","Operatsiya Plastilin","core"],["979185377","OQJAV","core"],["721620002","Orchestra of Goskino of USSR","core"],["574441807","Otpetye Moshenniki","core"],["1596316202","OTRAVLENNA","core"],["1486220265","OVERHILL","core"],["1387185337","OWEEK","core"],["301601116","Oxxxymiron","core"],["1112985301","Pasosh","core"],["368483006","Peter Nalitch","core"],["1003421356","Petlya Pristrastiya","core"],["1077538316","PHARAOH","core"],["465382746","Philipp Gorbachev","core"],["413496411","Philipp Kirkorov","core"],["784382000","PIKA","core"],["367314783","Piknik","core"],["942501340","Pilot","core"],["480446147","Pioneerball","core"],["422791875","Pixelord","core"],["585538624","PIZZA","core"],["1473811480","PKHAT","core"],["77706615","Polina","core"],["574441739","Polina Gagarina","core"],["1584652524","Polyn","core"],["378465934","Pompeya","core"],["269045281","PORCHY","core"],["943563178","Pornofilmy","core"],["1524428331","Poёt","core"],["901893102","Pra(Killa'Gramm)","core"],["829906425","Proekt Uveche","core"],["1552224055","PROKLYANA","core"],["626901659","Psiheya","core"],["1461774013","PUSSYKILLER","core"],["1106141235","pyrokinesis","core"],["1824646964","QUEST PISTOLS","core"],["1485219101","qurt","core"],["917277717","Raby Lampy","core"],["740800411","Race to Space","core"],["511923096","Rada Ray","core"],["1460137625","RADIO ЧАЧА","core"],["1544467860","RAIKAHO","core"],["1454293500","RaiM","core"],["1502988200","Rakhim","core"],["689017010","RAM","core"],["1450326296","Ramil'","core"],["1358699345","RASA","core"],["1104157208","Rauf & Faik","core"],["644265675","Raznye Ludi","core"],["588500423","REFLEX","core"],["541353830","Rem Digga","core"],["1530207101","Resowall","core"],["489039202","Rigos","core"],["1323091554","ROCKET","core"],["496903003","Rodion Gazmanov","core"],["659778491","Rok-Ostrova","core"],["973215591","Rompasso","core"],["1537122080","Rostislove","core"],["585640224","Rozhdestvo","core"],["636414294","RSAC","core"],["101927659","Ruki Vverkh","core"],["709313660","Rynochnye Otnosheniya","core"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_03';
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

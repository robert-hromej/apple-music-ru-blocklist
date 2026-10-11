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

  const ARTISTS = [["661577579","Zvonkiy","core"],["764019967","Zvuki Mu","core"],["1187884379","А-Мега","core"],["1485226749","Адйля","core"],["1161666041","Адо","core"],["1171432234","Азон","core"],["719513667","Акварели","core"],["1628280671","АКУЛИЧ","core"],["1811076999","Александра Чистякова","core"],["867705456","Алёна Петровская","core"],["1445171738","алёна швец.","core"],["713115483","Анатолий Горохов","core"],["902638964","Андрей Орехов","core"],["1350436307","Анет Сай","core"],["1032768680","Анна Ворфоломеева","core"],["1142234211","Анна Плетнёва «Винтаж»","core"],["1435502100","Ансамбль Детские Песни","core"],["1552754467","Ансамбль театра-студии детской песни п/у Людмилы Боковой","core"],["1342824042","Антиреспект","core"],["1215939429","Антон Токарев","core"],["1842815803","Аня Пересильд","core"],["992465070","Аркадий Кобяков","core"],["1491977175","Артур Руденко","core"],["1335655299","Артём Качер","core"],["1375507079","Асия","core"],["1498804663","белый шум для детей","core"],["1040502882","Биоконструктор","core"],["879444550","Большой Детский Хор","core"],["1462732130","Большой детский хор и Эстрадно-симфонический оркестр Всесоюзного радио и телевидения под управлением художественного руководителя и дирижёра Юрия Силантьева","core"],["1144060460","Большой детский хор Центрального телевидения и Всесоюзного радио","core"],["1108104011","Большой детский хор Центрального телевидения и Всесоюзного радио п/у Виктора Попова","core"],["1492872948","Бонд с кнопкой","core"],["1567661559","Бриллиантовый Ти","core"],["1255137721","БРОНС","core"],["1145507122","Буерак","core"],["1436613472","Бумажные Цветы","core"],["1550893525","В основном безвредны","core"],["1533434174","Ваня Дмитриенко","core"],["1449153753","Вино в пакете","core"],["711360761","Владимир Винокур","core"],["615293254","Владимир Маркин","core"],["1444574275","Владислав Медяник","core"],["1360086614","ВЛАЖНОСТЬ","core"],["1561802319","внимание брусника!","core"],["1493970322","всё будет хорошо","core"],["1365968760","Ганвест","core"],["941132214","Гио ПиКа","core"],["1563913485","Глобин","core"],["6810672448","Глюк'oZa","core"],["1450391680","ГОРШЕНЕВ","core"],["834037219","Государственный эстрадный оркестр Грузии \"Рэро\"","core"],["1339129486","Гоша Грачевский","core"],["1133098308","Гребенщик","core"],["1579881958","гришка","core"],["1484118808","Группа Ветерок","core"],["736340757","Группа московского камерного хора","core"],["1447818162","ГУДТАЙМС","core"],["1128494938","Гузель Хасанова","core"],["1509016411","Даня Милохин","core"],["1463743651","Дела Поважнее","core"],["1431663348","Деревьев","core"],["1374416484","Деревянные киты","core"],["850132157","Детский хор п/у Виктора Попова","core"],["1229963967","Джарахов","core"],["1450150470","Джизус","core"],["1535791845","Дима Викторов","core"],["1555254265","ДК им. Купера","core"],["1506162626","Дмитрий Коробков","core"],["1732474141","Дмитрий Хмелёв","core"],["1416175273","Дмитрий Юрков","core"],["1541356970","ДОЧЬ","core"],["1312984959","Драгни","core"],["1225515224","Дурное Влияние","core"],["1548121272","Душь","core"],["1484721880","Ева Власова","core"],["455470304","Ева Польна","core"],["879734939","Елена Троян","core"],["1488772305","Женя Трофимов","core"],["981570457","Жуки","core"],["1150519646","ЗАМАЙ","core"],["1313532753","Зараза","core"],["1147565245","Заточка","core"],["1275879891","Индаблэк","core"],["1347908002","Инна Вальтер","core"],["1108104266","Инструментальный ансамбль п/у Бориса Савельева","core"],["983252492","Инструментальный ансамбль п/у Владимира Шаинского","core"],["729930286","Инструментальный ансамбль п/у Константина Кримца","core"],["1471393311","Ирина Кайратовна","core"],["722650246","Ирина Мазинг","core"],["913304958","Ислам Итляшев","core"],["1292122437","источник","core"],["1584851974","Ицык Цыпер","core"],["1489144446","Июльские Дни","core"],["1563101430","ЙУЛАЙ","core"],["829906498","Ка тет","core"],["6789140480","Кабаре-дуэт Академия","core"],["1174023588","КАЗУСКОМА","core"],["1722126023","КамызякиБэнд","core"],["1550776231","каше мир","core"],["895462036","Квартет \"Аккорд\"","core"],["1509803092","Коля Стравинский","core"],["1680130907","Комната культуры","core"],["1461927524","конец солнечных дней","core"],["1439565144","конъюнктура","core"],["1268255914","Кооперативништяк","core"],["870812937","КОПЕНGАGЕН","core"],["1483462797","Костя Кайро","core"],["950758374","Краснознамённая дивизия имени моей бабушки","core"],["1525999965","Культурное Наследие","core"],["1523061281","КУЧЕР","core"],["1467504951","Лала Аллегрова","core"],["1489862248","лампабикт","core"],["786654651","Лемондэй","core"],["879824592","Лена Могучева","core"],["1474372394","Лента","core"],["1588429382","лиза андреева","core"],["1574351669","ЛИЛА","core"],["1896544119","Лилия Вайн","core"],["1476272456","Лэривэйн","core"],["910446623","Людмила Шаронова","core"],["1133504399","Люся Чеботина","core"],["1225768278","ЛЯПИС 98","core"],["1570697057","Макс Юдин","core"],["1154586071","Мальбэк","core"],["1518798654","Манго-Манго","core"],["1896577474","Марго Нуар","core"],["548075148","Марко Поло","core"],["362129315","Марсель","core"],["1561616028","Маша","core"],["1144403386","Минаева","core"],["1510587661","минимаркет","core"],["1422986642","МИРТЛ","core"],["1815993885","Михаил Бычков","core"],["1242238324","Миша Ботов","core"],["828748217","Младшая группа Большого детского хора Центрального телевидения и Всесоюзного радио","core"],["1455267544","Монти Механик","core"],["1449585414","МОСТ","core"],["166747511","МОТ","core"],["1184345574","МЫ","core"],["1447379153","Мэвл","core"],["1376622690","НАZИМА","core"],["1300608746","Наконечный","core"],["1494913377","Настежь","core"],["1142142300","Не Твое Дело","core"],["1491704094","НИИ Косметики","core"],["1832042911","Николай Коперник","core"],["1896242393","НРАВ","core"],["1442014233","Обьект насмешек","core"],["1156448700","Овсянкин","core"],["1532967483","ОГНИВО","core"],["1220004452","Озёра","core"],["1488789364","Олег Кваша","core"],["997458120","Оркестр п/у Геннадия Гладкова","core"],["1793043977","ПАВЛОВА","core"],["1516609662","Париии","core"],["1519477682","Парнишка","core"],["926745907","Паша Техник","core"],["1498853800","печорин","core"],["1108772325","План Ломоносова","core"],["1309211809","Платина","core"],["1406421936","Плейлист Венкова","core"],["1652641808","ПЛУТТО","core"],["1617870145","Полка","core"],["1459248829","Порез на Собаке","core"],["1212756868","Пошлая Молли","core"],["1537603391","Прогулка","core"],["1235243820","Пруд","core"],["1051189534","прыгай киска","core"],["1171121513","Райда","core"],["1491526159","РАМШ","core"],["1360648311","Ритуальные Услуги","core"],["449386720","Ролан Быков","core"],["1533423926","рудбой","core"],["1544851754","САМУРИ","core"],["1466046124","Санкт-Петербургский Государственный детский музыкальный театр Карамболь","core"],["1463398740","Сверкай","core"],["740994451","Светлана Степченко","core"],["1849880287","СДП","core"],["1532723492","Сергей Никитин","core"],["415942603","Сергей Парамонов","core"],["1493701278","Сергей Парамонов","core"],["1891751304","Серёга","core"],["1008217648","Сироткин","core"],["1171679942","Сказки Чёрного Города","core"],["1790496482","снялцепи","core"],["1593233985","СПОКОЙ","core"],["1605575517","Станция Самосознания","core"],["971261365","Стас Костюшкин","core"],["1481628620","Султан Лагучев","core"],["709596846","Сюзанна","core"],["1487798285","Сёстры","core"],["1189934988","ТАйМСКВЕР","core"],["1459990101","Тайпан","core"],["1613902930","тамурка","core"],["1652361627","Татьяна Куртукова","core"],["1613367790","ТАУ","core"],["1441657972","Телевизор","core"],["1531790147","Теннискорт","core"],["1427643780","Тима Белорусских","core"],["1469981254","ТРАВМА","core"]]; // [ [appleArtistId, name, group], ... ]

  const API = 'https://amp-api.music.apple.com';
  const KEY = 'amru_part_05';
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

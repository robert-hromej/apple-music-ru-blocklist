/*!
 * apple-music-ru-blocklist — unblock.js
 * Removes the "Suggest Less" (dislike) rating from top songs of the given artists.
 * Use it to undo block.js, fully or for selected artists.
 *
 * Run on https://music.apple.com (signed in) → DevTools Console → paste → Enter.
 * To undo only some artists, set ONLY_ARTIST_IDS = ['123', '456'].
 * Generated: __GENERATED__
 */
(async () => {
  'use strict';
  const ONLY_ARTIST_IDS = []; // empty = all artists below
  const ARTISTS = __ARTISTS__;
  const API = 'https://amp-api.music.apple.com';
  const mk = MusicKit.getInstance();
  if (!mk.isAuthorized) { alert('Sign in first.'); return; }
  const sf = mk.storefrontCountryCode || 'us';
  const H = () => ({ Authorization: 'Bearer ' + mk.developerToken, 'Music-User-Token': mk.musicUserToken });
  const get = async p => { try { const r = await fetch(API + p, { headers: H() }); return r.ok ? r.json() : {}; } catch { return {}; } };
  const list = ONLY_ARTIST_IDS.length ? ARTISTS.filter(a => ONLY_ARTIST_IDS.includes(a[0])) : ARTISTS;
  let removed = 0;
  for (let i = 0; i < list.length; i++) {
    const [aid, name] = list[i];
    let url = `/v1/catalog/${sf}/artists/${aid}/view/top-songs?limit=25`, pages = 0; const ids = [];
    while (url && pages++ < 2) { const j = await get(url); (j.data || []).forEach(t => ids.push(t.id)); url = j.next || null; }
    const r = ids.length ? await get(`/v1/me/ratings/songs?ids=${ids.join(',')}`) : {};
    for (const x of (r.data || [])) {
      if (x.attributes.value !== -1) continue;
      try { const d = await fetch(`${API}/v1/me/ratings/songs/${x.id}`, { method: 'DELETE', headers: H() }); if (d.ok) removed++; } catch {}
    }
    if (i % 10 === 0) console.log(`[amru-undo] ${i + 1}/${list.length} ${name} — removed ${removed}`);
  }
  console.log('[amru-undo] Done. Ratings removed: ' + removed);
})();

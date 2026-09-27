'use strict';

/* ============================================================
   CLASSEMENT PARTAGÉ — Le Rediaverse
   ------------------------------------------------------------
   Un seul endroit à remplir : le bloc CONFIG ci-dessous.

   Ordre des supports, du meilleur au moins bon :
     1. Supabase   -> classement mondial, une ligne par score
     2. Artifacts  -> stockage partagé Claude (hors ligne sur Vercel)
     3. localStorage -> par appareil
     4. mémoire    -> perdu au rechargement

   La clé « anon » de Supabase est publique par conception : elle est
   faite pour vivre dans du code client. Ce qui protège la table, ce
   sont les règles RLS décrites dans le README.
   ============================================================ */

const CONFIG_CLASSEMENT = {
  url: 'https://rhemdufascnbfpnxeatg.supabase.co',
  cle: 'sb_publishable_MindXklZG7x6YiLmzUqd0g_geOtE40F',   // clé publique, faite pour vivre dans le code client
  table: 'scores',
  taille: 5,
};

window.Classement = (function () {

  let mode = 'memoire';
  const memoire = {};

  const actifSupabase = () => !!(CONFIG_CLASSEMENT.url && CONFIG_CLASSEMENT.cle);
  const cleLocale = jeu => 'rediaverse:' + jeu + ':top';

  const trier = liste => liste
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, CONFIG_CLASSEMENT.taille);

  /* --- Supabase : une ligne par score, pas d'écrasement possible --- */

  function entetes(extra) {
    return Object.assign({
      apikey: CONFIG_CLASSEMENT.cle,
      Authorization: 'Bearer ' + CONFIG_CLASSEMENT.cle,
    }, extra || {});
  }

  async function supaCharger(jeu) {
    const url = CONFIG_CLASSEMENT.url.replace(/\/+$/, '')
      + '/rest/v1/' + CONFIG_CLASSEMENT.table
      + '?jeu=eq.' + encodeURIComponent(jeu)
      + '&select=name,score,detail'
      + '&order=score.desc,created_at.asc'
      + '&limit=' + CONFIG_CLASSEMENT.taille;
    const r = await fetch(url, { headers: entetes() });
    if (!r.ok) throw new Error('lecture ' + r.status);
    return await r.json();
  }

  async function supaEnvoyer(jeu, entree) {
    const url = CONFIG_CLASSEMENT.url.replace(/\/+$/, '') + '/rest/v1/' + CONFIG_CLASSEMENT.table;
    const r = await fetch(url, {
      method: 'POST',
      headers: entetes({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify({
        jeu,
        name: entree.name,
        score: entree.score,
        detail: entree.detail || null,
      }),
    });
    if (!r.ok) throw new Error('ecriture ' + r.status);
  }

  /* --- Supports de repli : la liste entière dans une seule valeur --- */

  async function blobLire(jeu) {
    if (window.storage) {
      try {
        const r = await window.storage.get(cleLocale(jeu), true);
        mode = 'partage';
        return r && r.value ? JSON.parse(r.value) : [];
      } catch (e) { mode = 'partage'; return []; }
    }
    try {
      const brut = localStorage.getItem(cleLocale(jeu));
      mode = 'local';
      return brut ? JSON.parse(brut) : [];
    } catch (e) {}
    mode = 'memoire';
    return memoire[jeu] || [];
  }

  async function blobEcrire(jeu, liste) {
    const str = JSON.stringify(liste);
    if (mode === 'partage' && window.storage) {
      try { await window.storage.set(cleLocale(jeu), str, true); return; } catch (e) { mode = 'local'; }
    }
    if (mode === 'local') {
      try { localStorage.setItem(cleLocale(jeu), str); return; } catch (e) { mode = 'memoire'; }
    }
    memoire[jeu] = liste;
  }

  /* --- API publique --- */

  async function charger(jeu) {
    if (actifSupabase()) {
      try {
        const liste = await supaCharger(jeu);
        mode = 'supabase';
        return trier(liste);
      } catch (e) {
        console.warn('Classement : Supabase injoignable, repli local.', e);
      }
    }
    try { return trier(await blobLire(jeu)); }
    catch (e) { return []; }
  }

  function qualifie(liste, score) {
    if (!(score > 0)) return false;
    if (liste.length < CONFIG_CLASSEMENT.taille) return true;
    return score > liste[liste.length - 1].score;
  }

  async function envoyer(jeu, entree) {
    if (mode === 'supabase') {
      try {
        await supaEnvoyer(jeu, entree);
        const liste = trier(await supaCharger(jeu));
        const rang = liste.findIndex(e => e.name === entree.name && e.score === entree.score);
        return { liste, rang };
      } catch (e) {
        console.warn('Classement : envoi Supabase impossible, repli local.', e);
        mode = 'local';
      }
    }
    // Relecture juste avant écriture pour limiter les écrasements
    let liste = [];
    try { liste = await blobLire(jeu); } catch (e) {}
    liste = trier(liste.concat([entree]));
    await blobEcrire(jeu, liste);
    return { liste, rang: liste.indexOf(entree) };
  }

  function libelle() {
    if (mode === 'supabase') return 'monde';
    if (mode === 'partage') return 'monde';
    return 'cet appareil';
  }

  return { charger, envoyer, qualifie, libelle, get mode() { return mode; } };
})();

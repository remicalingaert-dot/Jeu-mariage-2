'use strict';

/* ============================================================
   LANGUES — Le Rediaverse
   Français, anglais, espagnol. Le choix est retenu d'une page à
   l'autre et d'une visite à l'autre.

   Les textes rendus avec la police bitmap (titres, HUD) doivent
   rester sans accents : elle n'en possède pas. Ceux rendus avec la
   police système (consignes, cartes de pouvoir) peuvent en avoir.
   ============================================================ */

window.Langues = (function () {

  const CLE = 'rediaverse:langue';

  const DRAPEAUX = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸' };
  const NOMS = { fr: 'Français', en: 'English', es: 'Español' };

  const TEXTES = {

    /* ---------- Page d'accueil ---------- */
    accroche:      { fr: 'Deux heros, deux mondes',        en: 'Two heroes, two worlds',        es: 'Dos heroes, dos mundos' },
    jouer:         { fr: 'Jouer',                          en: 'Play',                          es: 'Jugar' },
    titreLidia:    { fr: 'Donut Run',                      en: 'Donut Run',                     es: 'Donut Run' },
    titreRemi:     { fr: 'La Comte',                       en: 'The Shire',                     es: 'La Comarca' },
    sousLidia: {
      fr: 'Lidia court, saute et engloutit les donuts. Guêpes et démarcheurs s\u2019en mêlent.',
      en: 'Lidia runs, jumps and devours donuts. Wasps and street canvassers get in the way.',
      es: 'Lidia corre, salta y devora donuts. Avispas y captadores se interponen.' },
    sousRemi: {
      fr: 'Rémi tient la Comté face aux orques. Chaque niveau débloque un pouvoir.',
      en: 'Rémi holds the Shire against the orcs. Every level unlocks a power.',
      es: 'Rémi defiende la Comarca de los orcos. Cada nivel desbloquea un poder.' },

    /* ---------- Donut Run ---------- */
    dr_sousTitre: {
      fr: 'Nourris Lidia d\u2019un maximum de donuts en évitant ses némésis',
      en: 'Feed Lidia as many donuts as you can while dodging her nemeses',
      es: 'Alimenta a Lidia con todos los donuts posibles esquivando a sus némesis' },
    dr_regle1: {
      fr: 'Le plat préféré de Lidia, ramasse-les !',
      en: 'Lidia\u2019s favourite food. Grab them all!',
      es: '¡La comida favorita de Lidia, recógelos!' },
    dr_regle2: {
      fr: 'Lidia a une peur bleue des guêpes et des démarcheurs de rue : évitez-les à tout prix !',
      en: 'Lidia is terrified of wasps and street canvassers. Avoid them at all costs!',
      es: 'Lidia les tiene pánico a las avispas y a los captadores de calle. ¡Evítalos a toda costa!' },
    dr_regle3: {
      fr: 'Lidia ne résistera pas à plus de 3 rencontres : chaque rencontre enlève un cœur',
      en: 'Lidia cannot survive more than 3 run-ins. Each one costs a heart',
      es: 'Lidia no resistirá más de 3 encuentros: cada uno le cuesta un corazón' },
    dr_regle4: {
      fr: '1 appui = saut, 2 appuis = double saut',
      en: '1 tap to jump, 2 taps to double jump',
      es: '1 toque para saltar, 2 toques para doble salto' },
    dr_regle5: {
      fr: 'Un chat passe tous les 2 niveaux : attrape-le, il rend un cœur',
      en: 'A cat appears every 2 levels. Catch it to get a heart back',
      es: 'Un gato aparece cada 2 niveles. Atrápalo y recuperas un corazón' },
    dr_cta:        { fr: 'Appuie pour commencer la chasse aux donuts', en: 'Tap to start the donut hunt', es: 'Toca para empezar la caza de donuts' },
    dr_attrapee:   { fr: 'ATTRAPEE',                       en: 'CAUGHT',                        es: 'ATRAPADA' },
    dr_piquee:     { fr: 'PIQUEE',                         en: 'STUNG',                         es: 'PICADA' },
    dr_donuts:     { fr: 'donuts',                         en: 'donuts',                        es: 'donuts' },
    dr_metres:     { fr: 'mètres',                         en: 'metres',                        es: 'metros' },
    dr_plusVite:   { fr: 'PLUS VITE',                      en: 'FASTER',                        es: 'MAS RAPIDO' },
    dr_vie:        { fr: '+1 VIE',                         en: '+1 LIFE',                       es: '+1 VIDA' },

    /* ---------- La Comté ---------- */
    co_regle1: {
      fr: 'Rémi défend actuellement la Comté contre les hordes du Mordor, aide-le à triompher !',
      en: 'Rémi is holding the Shire against the hordes of Mordor. Help him prevail!',
      es: '¡Rémi defiende la Comarca de las hordas de Mordor, ayúdale a vencer!' },
    co_regle2: {
      fr: 'Fais glisser ton doigt n\u2019importe où pour déplacer Rémi',
      en: 'Drag your finger anywhere to move Rémi',
      es: 'Desliza el dedo en cualquier parte para mover a Rémi' },
    co_regle3: {
      fr: 'Le bouton en bas à droite déclenche une esquive : utilise-la à bon escient',
      en: 'The button at the bottom right triggers a dodge. Use it wisely',
      es: 'El botón de abajo a la derecha activa una esquiva. Úsala con criterio' },
    co_regle4: {
      fr: 'Tuer des orques te permettra de devenir plus fort et de choisir des pouvoirs toujours plus dévastateurs !',
      en: 'Killing orcs makes you stronger and unlocks ever more devastating powers!',
      es: '¡Matar orcos te hará más fuerte y desbloqueará poderes cada vez más devastadores!' },
    co_regle5: {
      fr: 'Certains pouvoirs synergisent entre eux : crée des combinaisons uniques !',
      en: 'Some powers combine with each other. Build unique synergies!',
      es: 'Algunos poderes se combinan entre sí. ¡Crea combinaciones únicas!' },
    co_cta:        { fr: 'Appuie pour défendre la Comté',  en: 'Tap to defend the Shire',        es: 'Toca para defender la Comarca' },
    co_tombe:      { fr: 'REMI EST TOMBE',                 en: 'REMI HAS FALLEN',               es: 'REMI HA CAIDO' },
    co_orcsTues:   { fr: 'ORQUES VAINCUS',                 en: 'ORCS SLAIN',                    es: 'ORCOS VENCIDOS' },
    co_manche:     { fr: 'MANCHE',                         en: 'WAVE',                          es: 'OLEADA' },
    co_esquive:    { fr: 'ESQUIVE',                        en: 'DODGE',                         es: 'ESQUIVA' },
    co_balrog:     { fr: 'UN BALROG',                      en: 'A BALROG',                      es: 'UN BALROG' },

    /* ---------- Montée de niveau ---------- */
    niveau:        { fr: 'NIVEAU',                         en: 'LEVEL',                         es: 'NIVEL' },
    niv:           { fr: 'niv',                            en: 'lvl',                           es: 'niv' },
    nouveau:       { fr: 'NOUVEAU',                        en: 'NEW',                           es: 'NUEVO' },
    valider:       { fr: 'Valider',                        en: 'Confirm',                       es: 'Confirmar' },
    choisisPouvoir:{ fr: 'Choisis un pouvoir',             en: 'Pick a power',                  es: 'Elige un poder' },
    choisisValide: { fr: 'choisis un pouvoir, puis valide', en: 'pick a power, then confirm',   es: 'elige un poder y confirma' },
    synergies:     { fr: 'Synergies',                      en: 'Synergies',                     es: 'Sinergias' },
    synergie:      { fr: 'SYNERGIE',                       en: 'SYNERGY',                       es: 'SINERGIA' },
    rarete_commun:     { fr: 'Commun',                     en: 'Common',                        es: 'Común' },
    rarete_rare:       { fr: 'Rare',                       en: 'Rare',                          es: 'Raro' },
    rarete_epique:     { fr: 'Épique',                     en: 'Epic',                          es: 'Épico' },
    rarete_legendaire: { fr: 'Légendaire',                 en: 'Legendary',                     es: 'Legendario' },

    /* ---------- Classement ---------- */
    meilleursScores:{ fr: 'Meilleurs scores',              en: 'High scores',                   es: 'Mejores puntuaciones' },
    tousJoueurs:   { fr: 'tous les joueurs',               en: 'all players',                   es: 'todos los jugadores' },
    cetAppareil:   { fr: 'cet appareil',                   en: 'this device',                   es: 'este dispositivo' },
    premierMarquer:{ fr: 'Sois le premier à marquer',      en: 'Be the first on the board',     es: 'Sé el primero en puntuar' },
    chargement:    { fr: 'Chargement…',                    en: 'Loading…',                      es: 'Cargando…' },
    entrerTop:     { fr: 'Tu entres dans le top 5',        en: 'You made the top 5',            es: 'Entras en el top 5' },
    choisisPseudo: { fr: 'Choisis ton pseudo',             en: 'Choose your name',              es: 'Elige tu apodo' },
    validePseudo:  { fr: 'valide ton pseudo pour rejouer', en: 'confirm your name to play again', es: 'confirma tu apodo para volver a jugar' },
    appuieRejouer: { fr: 'Appuie pour repartir',           en: 'Tap to play again',             es: 'Toca para volver a jugar' },
    toutAfficher:  { fr: 'Appuie pour tout afficher',      en: 'Tap to show everything',        es: 'Toca para mostrarlo todo' },
  };

  let courante = 'fr';
  try {
    const enregistre = localStorage.getItem(CLE);
    if (enregistre && DRAPEAUX[enregistre]) courante = enregistre;
    else {
      const nav = (navigator.language || 'fr').slice(0, 2);
      if (DRAPEAUX[nav]) courante = nav;
    }
  } catch (e) {}

  const abonnes = [];

  function T(cle) {
    const e = TEXTES[cle];
    if (!e) return cle;
    return e[courante] || e.fr;
  }
  function definir(l) {
    if (!DRAPEAUX[l] || l === courante) return;
    courante = l;
    try { localStorage.setItem(CLE, l); } catch (e) {}
    abonnes.forEach(f => { try { f(l); } catch (e) {} });
  }
  function suivante() {
    const ordre = ['fr', 'en', 'es'];
    definir(ordre[(ordre.indexOf(courante) + 1) % ordre.length]);
  }

  return {
    T, definir, suivante,
    get code() { return courante; },
    get drapeau() { return DRAPEAUX[courante]; },
    drapeaux: DRAPEAUX,
    noms: NOMS,
    codes: ['fr', 'en', 'es'],
    surChangement(f) { abonnes.push(f); },
  };
})();

window.T = window.Langues.T;

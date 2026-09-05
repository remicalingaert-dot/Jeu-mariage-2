# Le Rediaverse

Deux jeux mobiles en pixel art, sans dépendance ni build.

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil, les deux cases de la planche |
| `donut-run.html` | Le jeu de Lidia, runner |
| `remi-survivor.html` | Le jeu de Rémi, survivor |
| `leaderboard.js` | Classement partagé, commun aux deux jeux |

Tout est statique. Aucun `npm install`, aucune étape de compilation.

---

## 1. Mettre en ligne, gratuitement

Hébergement retenu : **GitHub Pages**. Le site est entièrement statique, donc rien de plus n'est nécessaire.

Seule contrainte : avec le plan gratuit, **le dépôt doit être public**. Ce n'est pas un problème ici, il n'y a aucun secret dans le projet (voir la section 2 sur la clé Supabase).

### Pousser le code

```bash
cd le-rediaverse
git init
git add .
git commit -m "Le Rediaverse"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/le-rediaverse.git
git push -u origin main
```

Sans ligne de commande : **New repository**, coche **Public**, puis **uploading an existing file** et tu glisses les cinq fichiers.

### Publier

Dans le dépôt : **Settings → Pages**

- Source : **Deploy from a branch**
- Branche : `main`, dossier `/ (root)`
- **Save**

Une minute plus tard, le site est en ligne sur :

```
https://TON-PSEUDO.github.io/le-rediaverse/
```

Tous les liens du projet sont relatifs, donc le sous-dossier dans l'URL ne gêne rien. HTTPS est fourni d'office.

Chaque `git push` republie le site automatiquement.

### Si un jour tu veux un dépôt privé

GitHub Pages sur dépôt privé demande un plan payant. L'alternative gratuite est Vercel : **Add New → Project**, importer le dépôt, framework **Other**, champs de build vides. Le code du projet ne change pas.

---

## 2. Le classement partagé

Sans base de données, chaque joueur a son propre top 5 sur son téléphone. L'écran de fin affiche alors « cet appareil ». Pour un vrai classement commun, il faut brancher Supabase.

### Créer la table

Dans ton projet Supabase, **SQL Editor**, puis exécute :

```sql
create table public.scores (
  id          bigint generated always as identity primary key,
  jeu         text        not null,
  name        text        not null,
  score       integer     not null,
  detail      jsonb,
  created_at  timestamptz not null default now()
);

create index scores_classement on public.scores (jeu, score desc, created_at);

alter table public.scores enable row level security;

-- Tout le monde peut lire
create policy "lecture publique"
  on public.scores for select
  using (true);

-- Tout le monde peut ajouter un score, dans des bornes raisonnables
create policy "ecriture publique"
  on public.scores for insert
  with check (
    jeu in ('donut-run', 'remi-comte')
    and char_length(name) between 1 and 10
    and score between 1 and 100000
  );
```

### Brancher le jeu

Dans `leaderboard.js`, en haut, remplis les deux champs :

```js
const CONFIG_CLASSEMENT = {
  url: 'https://xxxxxxxx.supabase.co',
  cle: 'eyJhbGciOi...',        // Settings > API > clé « anon public »
  table: 'scores',
  taille: 5,
};
```

Commit, push, GitHub Pages republie tout seul. L'écran de fin affichera « monde ».

La clé `anon` est publique par conception, elle est faite pour vivre dans du code client, y compris dans un dépôt public. Ce qui protège la table, ce sont les règles RLS ci-dessus. **Ne mets jamais la clé `service_role`**, celle-là contourne toutes les règles.

---

## 3. Ce qu'il faut savoir

**Les scores ne sont pas vérifiés.** N'importe qui peut ouvrir la console et envoyer un score inventé. Les bornes SQL limitent les valeurs absurdes, rien de plus. Pour une bande de copains c'est sans conséquence ; pour un classement public il faudrait signer les parties côté serveur.

**La table grossit sans limite.** Une ligne par score envoyé, seuls les cinq meilleurs sont affichés. À nettoyer un jour si le volume monte, mais le palier gratuit de Supabase tient très largement.

**Le repli est automatique.** Si Supabase ne répond pas, le jeu bascule sur le stockage local sans planter, et le joueur voit « cet appareil ».

---

## 4. Tester en local

Ouvrir `index.html` en double-cliquant fonctionne mal : certains navigateurs bloquent les fichiers en `file://`. Lance plutôt un serveur :

```bash
python3 -m http.server 8000
```

Puis `http://localhost:8000`. Depuis un téléphone sur le même wifi, remplace `localhost` par l'IP de l'ordinateur.

---

## 5. Régler les jeux

Chaque jeu a un bloc `CONFIG` en tête de fichier : vitesses, dégâts, courbes de difficulté, seuils d'apparition. Les pouvoirs de Rémi sont dans la table `POUVOIRS`, une entrée par pouvoir avec ses cinq paliers.

Les sprites sont des tableaux de chaînes de caractères avec une palette de couleurs, un caractère par pixel. Pour passer à de vrais PNG, c'est la seule couche à remplacer.

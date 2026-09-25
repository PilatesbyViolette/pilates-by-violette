# Pilates by Violette — règles de travail

Site vitrine statique de Violette Saint Bris, kinésithérapeute D.E. et professeure
de Pilates, cours à domicile à Paris 7ᵉ & 6ᵉ. En ligne sur https://pilatesbyviolette.com

## Règle n°1 : GitHub `main` est la seule référence

On ne déploie **jamais** autre chose que le contenu de `main` tel qu'il est sur GitHub.
Un travail qui n'est pas poussé n'existe pas.

## Circuit obligatoire, à chaque chantier

Dossier de travail : `C:\Users\Nico\pilates-by-violette` (clone git).
**Ne jamais travailler dans un dossier issu d'un ZIP** : il n'a pas de `.git`, rien ne
remonte sur GitHub, et il est souvent en retard.

1. **Avant de commencer** : `git checkout main` puis `git pull origin main`.
2. **Modifier**, puis faire les vérifications de la section « Pièges connus ».
3. **Commit** : `git add -A`, puis `git status` pour montrer ce qui est stagé.
   Ne jamais committer de token, mot de passe ou note personnelle.
4. **Push** : `git push origin main`.
5. **Vérifier le push** : `git fetch origin` puis `git log --oneline -1 origin/main`.
   Le SHA doit être celui du commit local. Ne dire « c'est fait » qu'après l'avoir vu.
6. **Déployer**, seulement après un push réussi, depuis la racine du clone :
   `npx wrangler deploy`
7. **Conclure** en donnant : SHA poussé, et confirmation du déploiement.
   Rappeler à l'utilisateur de recharger avec Ctrl+Maj+R.

Si le push échoue (authentification, conflit) : s'arrêter et le dire. Ne jamais
déployer un travail non poussé, ne jamais utiliser `git push --force` sur `main`.

L'authentification GitHub se fait par token personnel (fine-grained, dépôt
`pilates-by-violette`, Contents: Read and write), jamais par « Sign in with your
browser » (bloqué pour ce compte). Le token expire : s'il est refusé, dire à
l'utilisateur d'en générer un nouveau.

## Structure

- `public/` : **seul dossier publié** sur le web (`assets.directory = "./public"`
  dans `wrangler.jsonc`). Tout fichier servi va ici, rien d'autre.
- `public/index.html` : page d'accueil (CSS, traductions et scripts inline).
- `public/blog/` : index du blog + un dossier par article (`/blog/<slug>/index.html`).
- `public/mentions-legales/`, `public/confidentialite/` : pages légales bilingues.
- `public/img/` : images WebP, `og-cover.jpg`. Favicons à la racine de `public/`.
- `public/sitemap.xml`, `public/robots.txt`.
- Racine : `wrangler.jsonc` (`workers_dev: false`), `CLAUDE.md`. Jamais servis.

Un fichier sensible (SQL, notes, audit, patch) ne doit **jamais** aller dans `public/`.
La branche `restore/security-sql` archive les policies Supabase de l'ancienne app :
ne pas la fusionner dans `main`.

## Pièges connus — à vérifier à chaque modification

1. **Traductions FR/EN.** `public/index.html` contient un objet JS `T = { fr, en }`
   et une fonction `applyLang()` qui **réécrit** les textes à chaque changement de
   langue. Modifier un texte visible dans le HTML sans modifier `T.fr` **et** `T.en`
   fait réapparaître l'ancien texte dès qu'on bascule de langue.
   Test obligatoire : FR → EN → FR, le texte doit rester le nouveau.
2. **Suivi de conversion Google Ads.** Le script en bas de `public/index.html`
   déclenche la conversion `AW-819470016/HihvCJKrkfMcEMC94IYD` sur les clics dont
   l'URL contient `calendly.com` ou `wa.me`, et sur l'envoi réussi du formulaire.
   Changer un lien de réservation sans adapter cette condition casse le suivi
   **sans aucune erreur visible**.
3. **Menu fixe.** La règle CSS est `body>nav{position:fixed…}`. Ne jamais écrire
   de règle sur `nav` tout court : le footer contient `<nav class="footer-legal">`
   qui deviendrait une seconde barre fixe masquant le menu.
4. **Liens du footer** : ciblés par id (`fl-blog`, `fl-legal`, `fl-privacy`),
   jamais par position dans une liste.
5. **Pages légales** : chaque page contient un bloc `#doc-fr` et un bloc `#doc-en`.
   Toute modification se fait dans les deux.
6. **JSON-LD** : après modification, vérifier que chaque bloc
   `<script type="application/ld+json">` reste du JSON valide.
7. **Nouvelle page** : l'ajouter à `public/sitemap.xml` (avec `lastmod`) et prévoir
   un lien interne vers elle. Mettre à jour le `lastmod` des pages modifiées.
8. **Vérifier le site en ligne** : en cas de doute sur ce qui est déployé, regarder
   le code source (`view-source:`) plutôt que l'affichage, qui peut être en cache.

## Règles éditoriales et de marque

- Toujours écrire **« Pilates by Violette »**, jamais « Violette Pilates »
  (un autre site, violettepilates.com, porte ce nom).
- Violette est **kinésithérapeute diplômée d'État**. Elle n'est **pas ostéopathe** :
  « études d'ostéopathie » est exact, « ostéopathe » ou une expertise en ostéopathie
  dans le JSON-LD ne l'est pas.
- Positionnement : cours **en présentiel, à domicile, Paris 7ᵉ & 6ᵉ**.
- Ne jamais afficher l'adresse du cabinet ailleurs que dans les pages légales
  (mentions légales et politique de confidentialité).
- Réservations : https://calendly.com/pilatesbyviolette/ (liens simples, sans widget).
- Contenu santé : informatif, sans promesse de guérison, avec renvoi vers un
  médecin pour les signaux d'alerte.

// Pilates by Violette — bascule FR/EN des pages légales (sortie du HTML pour la CSP, voir public/_headers)
// Le titre propre à chaque page est porté par la balise <script> : data-title-fr / data-title-en
var TITLES = { fr: document.currentScript.dataset.titleFr, en: document.currentScript.dataset.titleEn };
function applyLang(lang){
  var en = lang === 'en';
  document.getElementById('doc-fr').hidden = en;
  document.getElementById('doc-en').hidden = !en;
  document.documentElement.lang = lang;
  document.getElementById('lang-btn').textContent = en ? 'FR' : 'EN';
  document.getElementById('t-back').textContent = en ? 'Back to home' : 'Retour à l\'accueil';
  document.getElementById('f-home').textContent = en ? 'Home' : 'Accueil';
  document.getElementById('f-legal').textContent = en ? 'Legal notice' : 'Mentions légales';
  document.getElementById('f-privacy').textContent = en ? 'Privacy policy' : 'Politique de confidentialité';
  document.title = (en ? TITLES.en : TITLES.fr) + ' | Pilates by Violette';
}
function toggleLang(){
  var next = (localStorage.getItem('lang') || 'fr') === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', next);
  applyLang(next);
}
applyLang(localStorage.getItem('lang') === 'en' ? 'en' : 'fr');
document.getElementById('lang-btn').addEventListener('click', toggleLang);

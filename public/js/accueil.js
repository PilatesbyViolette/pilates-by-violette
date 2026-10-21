// Pilates by Violette — scripts de la page d'accueil (sortis du HTML pour la CSP, voir public/_headers)

// Google tag (gtag.js) : chargé uniquement après consentement (RGPD / CNIL)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var CONSENT_KEY = 'pbv-cookie-consent';
// Choix valable 13 mois s'il est accepté, 6 mois s'il est refusé (recommandations CNIL)
function readConsent(){
  try {
    var c = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if(!c || typeof c.ads !== 'boolean' || !c.ts) return null;
    var maxAge = (c.ads ? 395 : 182) * 864e5;
    return (Date.now() - c.ts < maxAge) ? c : null;
  } catch(e) { return null; }
}
function loadAds(){
  if(window.adsLoaded) return;
  window.adsLoaded = true;
  gtag('js', new Date());
  gtag('config', 'AW-819470016');
  var el = document.createElement('script');
  el.async = true;
  el.src = 'https://www.googletagmanager.com/gtag/js?id=AW-819470016';
  document.head.appendChild(el);
}
var savedConsent = readConsent();
if(savedConsent && savedConsent.ads) loadAds();

(function(){
  var form = document.getElementById('form-contact');
  var status = document.getElementById('form-status');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(r){
      status.style.display = 'block';
      if(r.ok){
        if(window.adsLoaded){ gtag('event', 'conversion', {'send_to': 'AW-819470016/HihvCJKrkfMcEMC94IYD'}); }
        form.reset();
        status.textContent = 'Merci ! Votre message est bien envoyé — Violette vous répond très vite.';
        btn.textContent = 'Message envoyé ✓';
      } else {
        status.textContent = "L'envoi n'a pas abouti. Vous pouvez réessayer, ou écrire directement à violette.saintbris@gmail.com.";
        btn.disabled = false;
        btn.textContent = T[document.documentElement.lang === 'en' ? 'en' : 'fr'].formBtn;
      }
    }).catch(function(){
      status.style.display = 'block';
      status.textContent = "L'envoi n'a pas abouti. Vous pouvez réessayer, ou écrire directement à violette.saintbris@gmail.com.";
      btn.disabled = false;
      btn.textContent = T[document.documentElement.lang === 'en' ? 'en' : 'fr'].formBtn;
    });
  });
})();

var T = {
  fr: {
    navLinks: ['Pour qui','Résultats','Qui je suis','Tarifs','Contact','Blog'],
    navCta: 'Prendre RDV',
    eyebrowHero: 'Coach Pilates à Paris 7ᵉ et 6ᵉ',
    h1: 'Le Pilates à Paris 7<sup>e</sup> &amp; 6<sup>e</sup>,<br><span class="accent">en présentiel, à domicile.</span>',
    sub: 'Cours particuliers et duos de Pilates à domicile dans le 7ᵉ arrondissement et alentours. Par une <strong>kinésithérapeute diplômée d\'État</strong>, pour un corps tonique, solide et sans douleur.',
    heroBtn: 'Ma séance d\'essai offerte',
    step1h: 'Le bilan postural',
    step1p: 'Première séance offerte : analyse de votre posture, de vos antécédents et de vos objectifs. C\'est la fondation de tout le programme.',
    step2h: 'Des séances individualisées',
    step2p: 'Un programme construit pour corriger votre posture et soigner vos blessures. Pilates ring, élastiques, travail au sol : chaque exercice a une raison d\'être.',
    step3h: 'Le rendez-vous hebdomadaire',
    step3p: 'Une heure par semaine, chez vous, non négociable dans l\'agenda. La régularité fait le résultat — et l\'accompagnement fait la régularité.',
    quote: '« Bien accompagné, on arrive <span class="accent">à tout</span> ! »',
    quoteCite: 'Christine, 61 ans',
    eyebrowPQ: 'Pour qui',
    h2PQ: 'Vos antécédents ne sont pas un frein. Ils sont le point de départ.',
    introPQ: 'Chaque séance est construite à partir de votre histoire : blessures anciennes ou actuelles, pathologies chroniques, reprise après des années d\'arrêt, ou simplement l\'envie d\'être accompagnée pour renforcer votre corps (cuisses, fessiers, dos, abdos, bras…).',
    patho: [
      ['Mal de dos','Lombalgie, hernie discale, sciatique, cruralgie, cervicalgie'],
      ['Articulations','Arthrose, prothèses de hanche et de genou, fractures, entorses'],
      ['Tendinites','Épaule, coude, hanche, genou, cheville'],
      ['Ménopause','Fonte musculaire, ostéoporose, regain de tonus'],
      ['Périnatalité','Grossesse et post-partum — formations de Gasquet & pelvi-périnéologie'],
      ['Seniors','Force, équilibre et autonomie, pour avancer en confiance à chaque âge de la vie'],
      ['Sportifs','Prévention, gainage profond, retour de blessure'],
      ['Débutants complets','Reprise en douceur, motivation durable']
    ],
    eyebrowRes: 'Résultats',
    h2Res: 'Ce que constatent les élèves, séance après séance.',
    res: ['Des douleurs qui disparaissent','Un corps tonifié, une confiance retrouvée','Une posture qui se redresse','Plus de souplesse dans les gestes du quotidien','L\'autonomie préservée pour les années qui viennent'],
    eyebrowTem: 'Témoignages',
    h2Tem: 'Jean, Evelyne, Stéphanie.',
    temoignages: [
      ['« Trois ans de douleurs sciatiques… disparues. Je continue chaque semaine pour garder un dos fort. »','Jean','Sciatique chronique — libéré, et fidèle au rendez-vous hebdomadaire.'],
      ['« Après ma prothèse de hanche, je n\'avais jamais récupéré. J\'ai retrouvé force, souplesse et mobilité. »','Evelyne','Quinze ans sans sport — aujourd\'hui, son mari s\'y est mis aussi.'],
      ['« Mon mari, mes enfants et mes amis m\'ont fait remarquer combien mon corps s\'était tonifié. »','Stéphanie','Ménopause, zéro motivation — pas une semaine sans sport depuis.']
    ],
    eyebrowQJS: 'Qui je suis',
    h2QJS: 'Je m\'appelle Violette Saint Bris. Je mets les gens en mouvement.',
    bioH3: ['Le départ','Le corps, sérieusement','Le déclic Pilates','Ma méthode','Mon parcours en dates','Formations'],
    bioP: [
      'Née à Paris d\'un père directeur de musée et d\'une mère architecte, j\'intègre <strong>Sciences Po Paris à 17 ans</strong>. Si j\'apprécie énormément la richesse des études et des rencontres à Sciences Po, l\'étude du corps et le mouvement m\'appellent peu à peu.',
      'À 20 ans, au retour d\'un voyage humanitaire à Madagascar, une évidence : je veux un métier utile, une compétence dans les mains pour apporter mon aide.',
      'J\'intègre une licence de sport (STAPS) avec un objectif clair : finir dans les trois premiers pour entrer en école de kinésithérapie. Quatorze heures de sport par semaine, l\'anatomie, la physiologie du mouvement — j\'adore ça. À 24 ans, j\'entre à l\'<strong>école de kinésithérapie de Saint-Maurice</strong>. Puis je complète ma formation par <strong>quatre années d\'études d\'ostéopathie</strong>, pour élargir ma lecture du corps.',
      'Dans mon cabinet, mes patients me demandaient quel sport je leur conseillais. Je répondais toujours le Pilates — sans avoir de professeur formé au médical à qui les confier sans crainte de blessure. <strong>Alors je le suis devenue.</strong> Aujourd\'hui, le Pilates traverse tous mes accompagnements : il tonifie les muscles, renforce les os et apaise l\'esprit. « Le meilleur traitement, c\'est le mouvement. »',
      'Je suis dynamique, très positive et encourageante. J\'aime souligner les forces de mes élèves et trouver la méthode qui fonctionne pour chacun — celle qui fait qu\'on tient dans la durée, et qu\'on y prend plaisir.',
      'Mon ouverture sur le monde fait le reste : des milieux intellectuels, artistiques, internationaux et médicaux, des études aux États-Unis et en Espagne, une troupe de danse. Pour un patient féru de musique classique qui n\'aimait pas le sport, j\'ai créé des playlists de Bach et de Ravel. Il est resté.'
    ],
    anecdote: 'Une élève de 50 ans, inquiète : « Je ne suis pas sûre d\'être régulière. » — « Avec moi, je n\'en doute pas une seconde ! » Un an plus tard, elle est la personne la plus sportive de sa famille.',
    dates: [
      ['17 ans','Sciences Po Paris'],
      ['22 ans','Licence STAPS — objectif kiné, atteint'],
      ['24 ans','École de kinésithérapie de Saint-Maurice — diplôme d\'État'],
      ['28 ans','Quatre années d\'études d\'ostéopathie'],
      ['32 ans','Certification Pilates — le déclic venu de mes patients'],
      ['Aujourd\'hui','Cabinet dans le 7ᵉ & cours de Pilates à domicile']
    ],
    chips: ['Professeure de Pilates certifiée','Méthode de Gasquet — posture & alignement','Pilates thérapeutique — seniors & pathologies chroniques','Pilates pré & post-partum','Rééducation périnéale et abdominale','McKenzie — lombalgies, cervicalgies, dorsalgies','Épaule au Top','Kinésithérapie du sport — membre inférieur & supérieur'],
    eyebrowTar: 'Tarifs',
    tarifs: [
      ['Bilan postural initial','Première séance — analyse complète','Offert'],
      ['Cours particulier','1 h, à domicile — Paris 7ᵉ','90 €'],
      ['Cours duo','1 h, à domicile ou en entreprise — par personne','50 €'],
      ['Petit groupe & entreprise','Sur devis','Me contacter']
    ],
    eyebrowCon: 'Contact',
    h2Con: 'On commence <span class="accent">cette semaine</span> ?',
    canaux: ['Réserver sur Calendly ↗','WhatsApp — 06 10 70 62 02','violette.saintbris@gmail.com','Instagram — @violettesaintbris'],
    formNom: 'Nom',
    formContact: 'Email ou téléphone',
    formMsg: 'Votre situation (antécédents, objectifs…)',
    formBtn: 'Prendre RDV',
    formOk: 'Merci ! Votre message est bien envoyé — Violette vous répond très vite.',
    formErr: 'L\'envoi n\'a pas abouti. Vous pouvez réessayer, ou écrire directement à violette.saintbris@gmail.com.',
    formSending: 'Envoi en cours…',
    formSent: 'Message envoyé ✓',
    consent: 'J\'accepte que mes informations soient utilisées pour être recontacté(e). Voir la <a href="/confidentialite/" target="_blank" rel="noopener">politique de confidentialité</a>.',
    footer1: 'Pilates by Violette — cours à domicile, Paris 7ᵉ et 6ᵉ',
    footer2: 'Rue du Bac · Grenelle · Varenne · Saint-Germain · Université · Lille · Saints-Pères · Assas · Cherche-Midi · Bonaparte · Guynemer · Fleurus · Saint-Sulpice',
    legalBlog: 'Blog',
    legalMentions: 'Mentions légales',
    legalPrivacy: 'Politique de confidentialité',
    legalCookies: 'Gérer les cookies',
    cookieTitle: 'Vos choix en matière de cookies',
    cookieText: 'Avec votre accord, nous utilisons des cookies Google Ads pour mesurer l\'efficacité de nos annonces. Aucun cookie publicitaire n\'est déposé sans votre consentement. Vous pouvez modifier votre choix à tout moment via « Gérer les cookies » en bas de page. <a href="/confidentialite/" target="_blank" rel="noopener">En savoir plus</a>',
    cookieRefuse: 'Tout refuser',
    cookieAccept: 'Tout accepter'
  },
  en: {
    navLinks: ['Who it\'s for','Results','About me','Pricing','Contact','Blog'],
    navCta: 'Book now',
    eyebrowHero: 'Pilates Coach in Paris 7th & 6th',
    h1: 'Pilates in Paris 7<sup>th</sup> &amp; 6<sup>th</sup>,<br><span class="accent">in person, at home.</span>',
    sub: 'Private and duo Pilates classes at home in the 7th arrondissement and surroundings. With a <strong>state-certified physiotherapist</strong>, for a toned, strong and pain-free body.',
    heroBtn: 'Book my free trial session',
    step1h: 'Postural assessment',
    step1p: 'First session free: analysis of your posture, history and goals. This is the foundation of the whole programme.',
    step2h: 'Tailored sessions',
    step2p: 'A programme built to correct your posture and heal your injuries. Pilates ring, resistance bands, mat work: every exercise has a purpose.',
    step3h: 'The weekly appointment',
    step3p: 'One hour a week, at your home, non-negotiable in the diary. Consistency brings results — and coaching brings consistency.',
    quote: '"With the right coach, anything is <span class="accent">possible</span>."',
    quoteCite: 'Christine, 61',
    eyebrowPQ: 'Who it\'s for',
    h2PQ: 'Your history is not a barrier. It\'s the starting point.',
    introPQ: 'Every session is built around your story: past or current injuries, chronic conditions, returning after years off, or simply the desire to be guided in strengthening your body (thighs, glutes, back, core, arms…).',
    patho: [
      ['Back pain','Lumbar pain, herniated disc, sciatica, crural neuralgia, neck pain'],
      ['Joints','Osteoarthritis, hip and knee replacements, fractures, sprains'],
      ['Tendinitis','Shoulder, elbow, hip, knee, ankle'],
      ['Menopause','Muscle loss, osteoporosis, regaining tone'],
      ['Perinatal','Pregnancy and post-partum — Gasquet method & pelvic floor training'],
      ['Seniors','Strength, balance and independence, moving with confidence at every stage of life'],
      ['Athletes','Injury prevention, deep core strength, return from injury'],
      ['Complete beginners','Gentle restart, lasting motivation']
    ],
    eyebrowRes: 'Results',
    h2Res: 'What students notice, session after session.',
    res: ['Pain that fades away','A toned body, renewed confidence','Better posture','More ease in everyday movement','Autonomy preserved for years to come'],
    eyebrowTem: 'Testimonials',
    h2Tem: 'Jean, Evelyne, Stéphanie.',
    temoignages: [
      ['"Three years of sciatica… gone. I keep coming every week to maintain a strong back."','Jean','Chronic sciatica — pain-free, and never misses his weekly session.'],
      ['"After my hip replacement, I\'d never fully recovered. I found strength, flexibility and mobility again."','Evelyne','Fifteen years without sport — today, her husband has joined her.'],
      ['"My husband, my children and my friends all noticed how much my body had toned up."','Stéphanie','Menopause, zero motivation — not a single week without sport since.']
    ],
    eyebrowQJS: 'About me',
    h2QJS: 'My name is Violette Saint Bris. I get people moving.',
    bioH3: ['The beginning','The body, seriously','The Pilates turning point','My approach','Timeline','Qualifications'],
    bioP: [
      'Born in Paris to a museum director father and architect mother, I enrolled at <strong>Sciences Po Paris at 17</strong>. Though I loved the intellectual richness of Sciences Po, the study of the body and movement gradually called me elsewhere.',
      'At 20, returning from humanitarian work in Madagascar, something became clear: I wanted a useful profession, a skill in my hands to genuinely help people.',
      'I enrolled in a sports science degree (STAPS) with one clear goal: finish in the top three and get into physiotherapy school. Fourteen hours of sport a week, anatomy, movement physiology — I loved every bit. At 24, I entered the <strong>Saint-Maurice school of physiotherapy</strong>. I then completed <strong>four years of osteopathy studies</strong> to deepen my understanding of the body.',
      'In my practice, patients would ask what sport I recommended. My answer was always Pilates — yet I had no medically trained teacher I could safely refer them to. <strong>So I became one.</strong> Today, Pilates runs through all my work: it tones muscle, strengthens bone and calms the mind. "The best treatment is movement."',
      'I am energetic, very positive and encouraging. I like to build on my students\' strengths and find the method that works for each person — the one that makes them stick with it and enjoy the journey.',
      'My broad background brings something extra: intellectual, artistic, international and medical circles, studies in the US and Spain, a dance company. For a patient who loved classical music and hated sport, I built Bach and Ravel playlists. He stayed.'
    ],
    anecdote: 'A 50-year-old student, worried: "I\'m not sure I\'ll be consistent." — "With me, I have no doubt!" A year later, she\'s the most active person in her family.',
    dates: [
      ['Age 17','Sciences Po Paris'],
      ['Age 22','Sports science degree — physiotherapy school goal, achieved'],
      ['Age 24','Saint-Maurice School of Physiotherapy — state diploma'],
      ['Age 28','Four years of osteopathy studies'],
      ['Age 32','Pilates certification — sparked by my patients'],
      ['Today','Practice in the 7th & home Pilates sessions']
    ],
    chips: ['Certified Pilates instructor','Gasquet method — posture & alignment','Therapeutic Pilates — seniors & chronic conditions','Pre & post-natal Pilates','Pelvic floor & abdominal rehabilitation','McKenzie — lumbar, cervical & thoracic pain','Shoulder rehabilitation','Sports physiotherapy — upper & lower limb'],
    eyebrowTar: 'Pricing',
    tarifs: [
      ['Initial postural assessment','First session — full analysis','Free'],
      ['Private session','1 h, at home — Paris 7th','€90'],
      ['Duo session','1 h, at home or at your workplace — per person','€50'],
      ['Small group & corporate','On request','Contact me']
    ],
    eyebrowCon: 'Contact',
    h2Con: 'Starting <span class="accent">this week</span>?',
    canaux: ['Book on Calendly ↗','WhatsApp — +33 6 10 70 62 02','violette.saintbris@gmail.com','Instagram — @violettesaintbris'],
    formNom: 'Name',
    formContact: 'Email or phone',
    formMsg: 'Your situation (history, goals…)',
    formBtn: 'Book now',
    formOk: 'Thank you! Your message has been sent — Violette will reply very soon.',
    formErr: 'Something went wrong. Please try again, or email violette.saintbris@gmail.com directly.',
    formSending: 'Sending…',
    formSent: 'Message sent ✓',
    consent: 'I agree that my information may be used to be contacted back. See the <a href="/confidentialite/" target="_blank" rel="noopener">privacy policy</a>.',
    footer1: 'Pilates by Violette — home sessions, Paris 7th & 6th',
    footer2: 'Rue du Bac · Grenelle · Varenne · Saint-Germain · Université · Lille · Saints-Pères · Assas · Cherche-Midi · Bonaparte · Guynemer · Fleurus · Saint-Sulpice',
    legalBlog: 'Blog',
    legalMentions: 'Legal notice',
    legalPrivacy: 'Privacy policy',
    legalCookies: 'Manage cookies',
    cookieTitle: 'Your cookie choices',
    cookieText: 'With your consent, we use Google Ads cookies to measure how well our ads perform. No advertising cookie is set without your consent. You can change your choice at any time via "Manage cookies" at the bottom of the page. <a href="/confidentialite/" target="_blank" rel="noopener">Learn more</a>',
    cookieRefuse: 'Refuse all',
    cookieAccept: 'Accept all'
  }
};

function applyLang(lang) {
  var t = T[lang];
  var qs = function(sel) { return document.querySelector(sel); };
  var qsa = function(sel) { return document.querySelectorAll(sel); };

  // nav links (desktop + mobile menu)
  var navLinks = qsa('.nav-links a');
  navLinks.forEach(function(el,i){ if(t.navLinks[i]) el.textContent = t.navLinks[i]; });
  var mmIds = ['mm-pq','mm-res','mm-qjs','mm-tar','mm-con','mm-blog'];
  mmIds.forEach(function(id,i){ var el=document.getElementById(id); if(el&&t.navLinks[i]) el.textContent=t.navLinks[i]; });
  var mmCta = document.getElementById('mm-cta');
  if(mmCta) mmCta.textContent = t.navCta;
  document.getElementById('nav-cta').textContent = t.navCta;

  // hero
  var eyebrows = qsa('.eyebrow');
  eyebrows[0].textContent = t.eyebrowHero;
  qs('h1.display').innerHTML = t.h1;
  qs('.sub').innerHTML = t.sub;
  qs('.btn-terra').textContent = t.heroBtn;

  // steps
  var etapes = qsa('.etape');
  if(etapes[0]){etapes[0].querySelector('h2').textContent = t.step1h; etapes[0].querySelector('p').textContent = t.step1p;}
  if(etapes[1]){etapes[1].querySelector('h2').textContent = t.step2h; etapes[1].querySelector('p').textContent = t.step2p;}
  if(etapes[2]){etapes[2].querySelector('h2').textContent = t.step3h; etapes[2].querySelector('p').textContent = t.step3p;}

  // OFFERTE badge via CSS class
  document.body.className = lang === 'en' ? 'lang-en' : '';

  // quote
  qs('.voix blockquote').innerHTML = t.quote;
  qs('.voix cite').textContent = t.quoteCite;

  // pour qui
  eyebrows[1].textContent = t.eyebrowPQ;
  qs('#pourqui h2').textContent = t.h2PQ;
  qs('#pourqui .intro').textContent = t.introPQ;
  var pItems = qsa('.p-item');
  pItems.forEach(function(el,i){
    if(t.patho[i]){ el.querySelector('b').textContent = t.patho[i][0]; el.querySelector('span').textContent = t.patho[i][1]; }
  });

  // resultats
  eyebrows[2].textContent = t.eyebrowRes;
  qs('#resultats h2').textContent = t.h2Res;
  var resItems = qsa('.res-item');
  resItems.forEach(function(el,i){ if(t.res[i]) el.innerHTML = '<i>→</i>' + t.res[i]; });

  // temoignages
  eyebrows[3].textContent = t.eyebrowTem;
  qs('.temoignages h2').textContent = t.h2Tem;
  var recits = qsa('.recit');
  recits.forEach(function(el,i){
    if(t.temoignages[i]){
      el.querySelector('.phrase').textContent = t.temoignages[i][0];
      el.querySelector('.qui').textContent = t.temoignages[i][1];
      el.querySelector('.detail').textContent = t.temoignages[i][2];
    }
  });

  // qui je suis — bio
  eyebrows[4].textContent = t.eyebrowQJS;
  qs('#quijesuis h2').textContent = t.h2QJS;
  var bioH3s = qsa('#quijesuis h3');
  bioH3s.forEach(function(el,i){ if(t.bioH3[i]) el.textContent = t.bioH3[i]; });
  var bioPs = qsa('#quijesuis .cafe-grid > div:last-child > p');
  var pIdx = 0;
  bioPs.forEach(function(el){
    if(t.bioP[pIdx]){ el.innerHTML = t.bioP[pIdx]; pIdx++; }
  });
  var anecdote = qs('.anecdote');
  if(anecdote) anecdote.textContent = t.anecdote;

  // dates timeline
  var dateEls = qsa('.date');
  dateEls.forEach(function(el,i){
    if(t.dates[i]){
      var spans = el.querySelectorAll('span');
      if(spans[0]) spans[0].textContent = t.dates[i][0];
      if(spans[1]) spans[1].textContent = t.dates[i][1];
    }
  });

  // formation chips
  var chips = qsa('.chip');
  chips.forEach(function(el,i){ if(t.chips[i]) el.textContent = t.chips[i]; });

  // tarifs
  eyebrows[5].textContent = t.eyebrowTar;
  var tarifEls = qsa('.tarif');
  tarifEls.forEach(function(el,i){
    if(t.tarifs[i]){
      var div = el.querySelector('div');
      var small = div.querySelector('small');
      var price = el.querySelector('.p');
      // set label text only (not the small)
      div.childNodes[0].textContent = t.tarifs[i][0] + ' ';
      if(small) small.textContent = t.tarifs[i][1];
      if(price) price.textContent = t.tarifs[i][2];
    }
  });

  // contact
  eyebrows[6].textContent = t.eyebrowCon;
  qs('#contact h2').innerHTML = t.h2Con;
  var canauxLinks = qsa('.canaux a');
  canauxLinks.forEach(function(el,i){ if(t.canaux[i]) el.textContent = t.canaux[i]; });
  qs('label[for="f-nom"]').textContent = t.formNom;
  qs('label[for="f-mail"]').textContent = t.formContact;
  qs('label[for="f-msg"]').textContent = t.formMsg;
  qs('.envoyer').textContent = t.formBtn;
  var consentTxt = document.getElementById('consent-txt');
  if(consentTxt) consentTxt.innerHTML = t.consent;

  // footer
  var footerSpans = qsa('footer .wrap span');
  if(footerSpans[0]) footerSpans[0].textContent = t.footer1;
  if(footerSpans[1]) footerSpans[1].textContent = t.footer2;
  var flBlog = document.getElementById('fl-blog');
  var flLegal = document.getElementById('fl-legal');
  var flPrivacy = document.getElementById('fl-privacy');
  if(flBlog) flBlog.textContent = t.legalBlog;
  if(flLegal) flLegal.textContent = t.legalMentions;
  if(flPrivacy) flPrivacy.textContent = t.legalPrivacy;
  document.getElementById('fl-cookies').textContent = t.legalCookies;
  document.getElementById('cookie-title').textContent = t.cookieTitle;
  document.getElementById('cookie-text').innerHTML = t.cookieText;
  document.getElementById('cookie-refuse').textContent = t.cookieRefuse;
  document.getElementById('cookie-accept').textContent = t.cookieAccept;

  // lang button
  var btn = document.getElementById('lang-btn');
  btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  btn.title = lang === 'fr' ? 'Switch to English' : 'Passer en français';
  document.documentElement.lang = lang;
}

function toggleMenu() {
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  var isOpen = menu.classList.contains('open');
  if(isOpen) { menu.classList.remove('open'); btn.classList.remove('open'); document.body.style.overflow=''; }
  else { menu.classList.add('open'); btn.classList.add('open'); document.body.style.overflow='hidden'; }
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('menu-btn').classList.remove('open');
  document.body.style.overflow='';
}

function openCookieBanner() {
  document.getElementById('cookie-banner').hidden = false;
  document.getElementById('cookie-accept').focus();
}
function setCookieConsent(accepted) {
  var hadAccepted = window.adsLoaded;
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ads: accepted, ts: Date.now()})); } catch(e) {}
  document.getElementById('cookie-banner').hidden = true;
  if(accepted) { loadAds(); return; }
  if(hadAccepted) {
    // Retrait du consentement : on efface les cookies Google Ads et on recharge sans le tag
    document.cookie.split(';').forEach(function(c){
      var name = c.split('=')[0].trim();
      if(/^(_gcl_|_ga|_gid|_gac_)/.test(name)){
        ['', '; domain=' + location.hostname, '; domain=.' + location.hostname.replace(/^www\./, '')].forEach(function(d){
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
    location.reload();
  }
}
if(!savedConsent) document.getElementById('cookie-banner').hidden = false;

function toggleLang() {
  var current = localStorage.getItem('lang') || 'fr';
  var next = current === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', next);
  applyLang(next);
}

(function() {
  var saved = localStorage.getItem('lang');
  if(saved && saved !== 'fr') applyLang(saved);
  else document.getElementById('lang-btn').textContent = 'EN';
})();

// Google Ads conversion tracking on high-intent clicks (Calendly bookings + WhatsApp)
(function() {
  var CONV = 'AW-819470016/HihvCJKrkfMcEMC94IYD';
  function fireConversion() {
    if(window.adsLoaded) gtag('event', 'conversion', {'send_to': CONV});
  }
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if(!a || !a.href) return;
    if(a.href.indexOf('calendly.com') !== -1 || a.href.indexOf('wa.me') !== -1) {
      fireConversion();
    }
  }, true);
})();

// Gestionnaires de clic (anciens attributs onclick, interdits par la CSP)
document.getElementById('lang-btn').addEventListener('click', toggleLang);
document.getElementById('menu-btn').addEventListener('click', toggleMenu);
['mm-pq','mm-res','mm-qjs','mm-tar','mm-con','mm-blog','mm-cta'].forEach(function(id){
  document.getElementById(id).addEventListener('click', closeMenu);
});
document.getElementById('fl-cookies').addEventListener('click', openCookieBanner);
document.getElementById('cookie-refuse').addEventListener('click', function(){ setCookieConsent(false); });
document.getElementById('cookie-accept').addEventListener('click', function(){ setCookieConsent(true); });

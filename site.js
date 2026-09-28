const SITE={
  email:"lategalaescenica@gmail.com",
  phone:"605 447 210",
  wa:"34605447210",
  instagram:"https://www.instagram.com/lategalaescenica/",
  facebook:"https://www.facebook.com/profile.php?id=61594400188184",
  location:"Tahiche · Teguise · Lanzarote"
};

const NAV={
  es:["Inicio","Espectáculos","Formación","La Tegala","Documentación","Actualidad","Contacto"],
  en:["Home","Shows","Training","La Tegala","Documents","News","Contact"],
  fr:["Accueil","Spectacles","Formation","La Tegala","Documentation","Actualité","Contact"],
  de:["Start","Produktionen","Ausbildung","La Tegala","Dokumente","Aktuelles","Kontakt"],
  it:["Home","Spettacoli","Formazione","La Tegala","Documenti","Attualità","Contatti"]
};
const PAGES=["index.html","espectaculos.html","formacion.html","quienes.html","documentacion.html","actualidad.html","contacto.html"];
const COMMON={
  es:{skip:"Saltar al contenido",open:"Abrir menú",close:"Cerrar menú",view:"Ver",download:"Descargar",more:"Más información",video:"Vídeo",pending:"En preparación",empty:"Material en preparación",register:"Inscripción",email:"Correo",days:"Días",children:"Niños +10",youth:"Jóvenes 12–16",adults:"Adultos",place:"Lugar",free:"Actividad gratuita · plazas limitadas.",join:"Inscribirme",info:"Solicitar información",write:"Escribir",requestcv:"Solicitar CV",budget:"Pedir presupuesto",poster:"Descargar cartel"},
  en:{skip:"Skip to content",open:"Open menu",close:"Close menu",view:"View",download:"Download",more:"More information",video:"Video",pending:"In preparation",empty:"Material in preparation",register:"Registration",email:"Email",days:"Days",children:"Children 10+",youth:"Young people 12–16",adults:"Adults",place:"Venue",free:"Free activity · limited places.",join:"Register",info:"Request information",write:"Write",requestcv:"Request CV",budget:"Request a quote",poster:"Download poster"},
  fr:{skip:"Aller au contenu",open:"Ouvrir le menu",close:"Fermer le menu",view:"Voir",download:"Télécharger",more:"Plus d’informations",video:"Vidéo",pending:"En préparation",empty:"Matériel en préparation",register:"Inscription",email:"E-mail",days:"Jours",children:"Enfants 10+",youth:"Jeunes 12–16",adults:"Adultes",place:"Lieu",free:"Activité gratuite · places limitées.",join:"S’inscrire",info:"Demander des informations",write:"Écrire",requestcv:"Demander le CV",budget:"Demander un devis",poster:"Télécharger l’affiche"},
  de:{skip:"Zum Inhalt",open:"Menü öffnen",close:"Menü schließen",view:"Ansehen",download:"Herunterladen",more:"Mehr Informationen",video:"Video",pending:"In Vorbereitung",empty:"Material in Vorbereitung",register:"Anmeldung",email:"E-Mail",days:"Tage",children:"Kinder 10+",youth:"Jugendliche 12–16",adults:"Erwachsene",place:"Ort",free:"Kostenlos · begrenzte Plätze.",join:"Anmelden",info:"Information anfragen",write:"Schreiben",requestcv:"Lebenslauf anfordern",budget:"Angebot anfragen",poster:"Plakat herunterladen"},
  it:{skip:"Vai al contenuto",open:"Apri menu",close:"Chiudi menu",view:"Visualizza",download:"Scarica",more:"Maggiori informazioni",video:"Video",pending:"In preparazione",empty:"Materiale in preparazione",register:"Iscrizione",email:"Email",days:"Giorni",children:"Bambini 10+",youth:"Giovani 12–16",adults:"Adulti",place:"Luogo",free:"Attività gratuita · posti limitati.",join:"Iscriviti",info:"Richiedi informazioni",write:"Scrivi",requestcv:"Richiedi CV",budget:"Richiedi preventivo",poster:"Scarica il cartellone"}
};

function lang(){ return localStorage.getItem("lang") || "es"; }
function common(){ return COMMON[lang()] || COMMON.es; }
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function loc(x,key){ const l=lang(); return x[key+"_"+l] || x[key] || ""; }

async function getData(file){
  try{
    const r=await fetch("data/"+file,{cache:"no-store"});
    if(!r.ok) throw new Error(String(r.status));
    return await r.json();
  }catch(e){ return null; }
}

async function loadSettings(){
  const x=await getData("settings.json");
  if(!x) return;
  if(x.email) SITE.email=x.email;
  if(x.phone) SITE.phone=x.phone;
  if(x.whatsapp) SITE.wa=x.whatsapp;
  if(x.instagram) SITE.instagram=x.instagram;
  if(x.facebook) SITE.facebook=x.facebook;
  if(x.location) SITE.location=x.location;
}

function header(){
  const mount=document.getElementById("site-header");
  if(!mount) return;
  const l=lang(), here=location.pathname.split("/").pop()||"index.html", names=NAV[l]||NAV.es, c=common();
  mount.innerHTML=`<a class="skip" href="#contenido">${c.skip}</a><header><div class="wrap navbar">
    <a class="brandmark" href="index.html" aria-label="La Tegala Escénica · Inicio"><img src="assets/logo2.jpg" alt="La Tegala Escénica"></a>
    <nav class="navlinks" id="nav" aria-label="Navegación principal">${PAGES.map((p,i)=>`<a href="${p}" ${here===p?'aria-current="page"':''}>${names[i]}</a>`).join("")}</nav>
    <select class="lang" id="lang" aria-label="Idioma"><option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option><option value="de">DE</option><option value="it">IT</option></select>
    <button class="menu-btn" id="menu" aria-label="${c.open}" aria-expanded="false" aria-controls="nav">☰</button>
  </div></header>`;
  const select=document.getElementById("lang");
  select.value=l;
  select.addEventListener("change",()=>{localStorage.setItem("lang",select.value);location.reload();});
  const btn=document.getElementById("menu"), nav=document.getElementById("nav");
  const setOpen=open=>{
    nav.classList.toggle("open",open);
    btn.setAttribute("aria-expanded",String(open));
    btn.setAttribute("aria-label",open?c.close:c.open);
  };
  btn.addEventListener("click",()=>setOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setOpen(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false);});
}

function footer(){
  const mount=document.getElementById("site-footer");
  if(!mount) return;
  const labels={
    es:["Espectáculos","Formación","Documentación","Contacto"],
    en:["Shows","Training","Documents","Contact"],
    fr:["Spectacles","Formation","Documentation","Contact"],
    de:["Produktionen","Ausbildung","Dokumente","Kontakt"],
    it:["Spettacoli","Formazione","Documenti","Contatti"]
  }[lang()]||["Espectáculos","Formación","Documentación","Contacto"];
  mount.innerHTML=`<footer><div class="wrap footer">
    <div><img src="assets/logo2.jpg" alt="La Tegala Escénica"><p class="muted">${esc(SITE.location)}<br><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> · <a href="https://wa.me/${esc(SITE.wa)}">${esc(SITE.phone)}</a></p></div>
    <div class="footer-nav"><a href="espectaculos.html">${labels[0]}</a><a href="formacion.html">${labels[1]}</a><a href="documentacion.html">${labels[2]}</a><a href="contacto.html">${labels[3]}</a><a target="_blank" rel="noopener" href="${esc(SITE.instagram)}">Instagram</a><a target="_blank" rel="noopener" href="${esc(SITE.facebook)}">Facebook</a></div>
    <div class="footer-bottom">© La Tegala Escénica, Lanzarote · ${esc(SITE.email)}</div>
  </div></footer>`;
}

function i18n(){
  const l=lang();
  document.documentElement.lang=l;
  const dict=(window.PAGE_I18N&&window.PAGE_I18N[l])||(window.PAGE_I18N&&window.PAGE_I18N.es)||{};
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(dict[k]!=null)el.innerHTML=dict[k];});
  document.querySelectorAll("[data-i18n-attr]").forEach(el=>{const pair=el.dataset.i18nAttr.split(":");if(dict[pair[1]]!=null)el.setAttribute(pair[0],dict[pair[1]]);});\n  document.querySelectorAll("[data-common]").forEach(el=>{const k=el.dataset.common;if(common()[k]!=null)el.textContent=common()[k];});
}

function galleries(){
  document.querySelectorAll("[data-lightbox]:not([data-bound])").forEach(img=>{
    img.dataset.bound="1";
    img.addEventListener("click",()=>{
      const m=document.createElement("div");
      m.className="lightbox open";
      m.setAttribute("role","dialog");
      m.setAttribute("aria-modal","true");
      m.innerHTML=`<button class="close" aria-label="${common().close}">×</button><img src="${esc(img.src)}" alt="${esc(img.alt)}">`;
      const close=()=>m.remove();
      m.addEventListener("click",e=>{if(e.target===m||e.target.classList.contains("close"))close();});
      document.addEventListener("keydown",function onKey(e){if(e.key==="Escape"){close();document.removeEventListener("keydown",onKey);}});
      document.body.appendChild(m);
      m.querySelector(".close").focus();
    });
  });
}

function mailto(subject,body=""){return "mailto:"+SITE.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);}
function wireMail(){document.querySelectorAll("[data-mail-subject]").forEach(a=>{a.href=mailto(a.dataset.mailSubject,a.dataset.mailBody||"");});}

const COUNTER_NS="lategala-escenica-2026";
function initCounter(){
  if(location.protocol==="file:") return;
  const page=location.pathname.split("/").pop()||"index.html";
  [page,"any"].forEach(key=>{
    const d=document.createElement("div");
    d.className="counterapi"; d.setAttribute("ns",COUNTER_NS); d.setAttribute("action","pageview"); d.setAttribute("key",key);
    d.setAttribute("unique","true"); d.setAttribute("invisible","true"); d.setAttribute("noLink","true"); d.hidden=true;
    document.body.appendChild(d);
  });
  const s=document.createElement("script");s.src="https://counterapi.com/c.js?ns="+COUNTER_NS;s.async=true;s.dataset.counterapi="1";document.head.appendChild(s);
}
function initTracking(){
  document.addEventListener("click",e=>{
    const el=e.target.closest("[data-track],a[download]");
    if(!el||location.protocol==="file:")return;
    const raw=el.dataset.track||("download-"+(el.getAttribute("href")||"file").split("/").pop());
    const img=new Image();
    img.src="https://counterapi.com/pixel.gif?ns="+COUNTER_NS+"&action=event&key="+encodeURIComponent(raw);
  });
}

async function hydrateNews(){
  const data=await getData("actualidad.json"); if(!Array.isArray(data))return;
  const rows=data.filter(x=>x.published!==false);
  const featured=document.querySelector("[data-news-featured]");
  if(featured){
    featured.innerHTML=rows.filter(x=>x.featured).sort((a,b)=>(a.featured_order??99)-(b.featured_order??99)).slice(0,3).map(x=>`<div class="card"><div class="card-body"><div class="card-label">${esc(x.source)}</div><h3>${esc(loc(x,"title"))}</h3><p>${esc(loc(x,"summary"))}</p><a class="btn view" target="_blank" rel="noopener" href="${esc(x.url)}">${common().view}</a></div></div>`).join("");
  }
  const list=document.querySelector("[data-news-list]");
  if(list){
    list.innerHTML=rows.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(x=>`<div class="press-card"><div class="source">${esc(x.source)}</div><div><h3>${esc(loc(x,"title"))}</h3><p>${esc(x.date)} · ${esc(loc(x,"summary"))}</p></div><a class="btn view" target="_blank" rel="noopener" href="${esc(x.url)}">${common().view}</a></div>`).join("");
  }
}

async function hydrateTimeline(){
  const els=document.querySelectorAll("[data-timeline]"); if(!els.length)return;
  const data=await getData("trayectoria.json"); if(!Array.isArray(data))return;
  els.forEach(el=>{
    const id=el.dataset.timeline;
    const rows=data.filter(x=>x.project===id&&x.published!==false);
    if(!rows.length)return;
    el.innerHTML=rows.map(x=>`<div class="event"><div class="date">${esc(x.date)}</div><div class="rail"><div class="dot"></div></div><div class="content"><h3>${esc(loc(x,"title"))}</h3><p>${esc(loc(x,"summary"))}</p>${x.url?`<a target="_blank" rel="noopener" href="${esc(x.url)}">${common().more} ↗</a>`:""}</div></div>`).join("");
  });
}

async function hydrateVideos(){
  const els=document.querySelectorAll("[data-videos]"); if(!els.length)return;
  const data=await getData("videos.json"); if(!Array.isArray(data))return;
  els.forEach(el=>{
    const id=el.dataset.videos;
    const rows=data.filter(x=>x.project===id&&x.published!==false);
    if(!rows.length)return;
    el.innerHTML=rows.map(x=>`<a class="video" target="_blank" rel="noopener" href="${esc(x.url)}"><span>▶ ${esc(loc(x,"title"))}<small>${esc(x.source||common().video)}</small></span></a>`).join("");
  });
}

async function hydrateGalleries(){
  const els=document.querySelectorAll("[data-gallery]"); if(!els.length)return;
  const data=await getData("galerias.json"); if(!Array.isArray(data))return;
  els.forEach(el=>{
    const id=el.dataset.gallery;
    const rows=data.filter(x=>x.project===id&&x.published!==false).sort((a,b)=>(a.order??99)-(b.order??99));
    const empty=document.querySelector('[data-gallery-empty="'+CSS.escape(id)+'"]');
    if(!rows.length){if(empty)empty.hidden=false;return;}
    if(empty)empty.hidden=true;
    el.innerHTML=rows.map((x,i)=>{
      const src=x.image||"";
      const dl=x.download||src;
      const credit=x.credit?`<figcaption>${esc(x.credit)}</figcaption>`:"";
      return `<figure><img data-lightbox src="${esc(src)}" alt="${esc(loc(x,"title")||("Fotografía "+(i+1)))}">${credit}<div class="gallery-tools"><a class="iconbtn" href="${esc(dl)}" download aria-label="${common().download}">↓</a></div></figure>`;
    }).join("");
  });
  galleries();
}

async function hydrateDocuments(){
  const els=document.querySelectorAll("[data-documents]"); if(!els.length)return;
  const data=await getData("documentos.json"); if(!Array.isArray(data))return;
  els.forEach(el=>{
    const id=el.dataset.documents;
    const rows=data.filter(x=>x.project===id&&x.published!==false).sort((a,b)=>(a.order??99)-(b.order??99));
    if(!rows.length){el.innerHTML=`<div class="placeholder-note">${common().empty}</div>`;return;}
    el.innerHTML=rows.map(x=>{
      const available=(x.status||"available")==="available" && (x.file||x.preview);
      const actions=available
        ? `<div class="doc-actions">${x.preview?`<a class="btn view" target="_blank" rel="noopener" href="${esc(x.preview)}">${common().view}</a>`:""}${x.file?`<a class="btn dl" download href="${esc(x.file)}">${common().download}</a>`:""}</div>`
        : `<div class="doc-actions"><span class="status">${esc(x.status_label||common().pending)}</span></div>`;
      return `<div class="doc ${available?"":"resource-disabled"}"><div class="doc-title"><b>${esc(loc(x,"title"))}</b><span>${esc(loc(x,"description"))}</span></div>${actions}</div>`;
    }).join("");
  });
}

async function init(){
  await loadSettings();
  header();
  footer();
  i18n();
  wireMail();
  initTracking();
  await Promise.all([hydrateNews(),hydrateTimeline(),hydrateVideos(),hydrateGalleries(),hydrateDocuments()]);
  galleries();
  initCounter();
}
document.addEventListener("DOMContentLoaded",init);

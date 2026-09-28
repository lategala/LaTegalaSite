const SITE={
  email:"lategalaescenica@gmail.com",phone:"605 447 210",wa:"34605447210",
  instagram:"https://www.instagram.com/lategalaescenica/",
  facebook:"https://www.facebook.com/profile.php?id=61594400188184"
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
 es:{skip:"Saltar al contenido",open:"Abrir menú",close:"Cerrar",programmers:"Para programadores",view:"Ver",download:"Descargar",contact:"Contactar",more:"Saber más"},
 en:{skip:"Skip to content",open:"Open menu",close:"Close",programmers:"For programmers",view:"View",download:"Download",contact:"Contact",more:"Learn more"},
 fr:{skip:"Aller au contenu",open:"Ouvrir le menu",close:"Fermer",programmers:"Pour les programmateurs",view:"Voir",download:"Télécharger",contact:"Contact",more:"En savoir plus"},
 de:{skip:"Zum Inhalt",open:"Menü öffnen",close:"Schließen",programmers:"Für Veranstalter",view:"Ansehen",download:"Herunterladen",contact:"Kontakt",more:"Mehr erfahren"},
 it:{skip:"Vai al contenuto",open:"Apri menu",close:"Chiudi",programmers:"Per programmatori",view:"Visualizza",download:"Scarica",contact:"Contatti",more:"Scopri di più"}
};
function lang(){return localStorage.getItem("lang")||"es"}
function header(){
 const l=lang(), here=location.pathname.split("/").pop()||"index.html", names=NAV[l]||NAV.es, c=COMMON[l]||COMMON.es;
 document.getElementById("site-header").innerHTML=`<a class="skip" href="#contenido">${c.skip}</a><header><div class="wrap navbar">
 <a class="brandmark" href="index.html"><img src="assets/logo2.jpg" alt="La Tegala Escénica"></a>
 <nav class="navlinks" id="nav">${PAGES.map((p,i)=>`<a href="${p}" ${here===p?'aria-current="page"':''}>${names[i]}</a>`).join("")}</nav>
 <select class="lang" id="lang" aria-label="Idioma"><option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option><option value="de">DE</option><option value="it">IT</option></select>
 <button class="menu-btn" id="menu" aria-label="${c.open}">☰</button></div></header>`;
 const s=document.getElementById("lang");s.value=l;s.onchange=()=>{localStorage.setItem("lang",s.value);location.reload()};
 document.getElementById("menu").onclick=()=>document.getElementById("nav").classList.toggle("open")
}
function footer(){
 const l=lang();
 const labels={es:["Espectáculos","Formación","Documentación","Contacto"],en:["Shows","Training","Documents","Contact"],fr:["Spectacles","Formation","Documentation","Contact"],de:["Produktionen","Ausbildung","Dokumente","Kontakt"],it:["Spettacoli","Formazione","Documenti","Contatti"]}[l]||["Espectáculos","Formación","Documentación","Contacto"];
 document.getElementById("site-footer").innerHTML=`<footer><div class="wrap footer"><div><img src="assets/logo2.jpg" alt="La Tegala Escénica"><p class="muted">Tahiche · Teguise · Lanzarote<br><a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="https://wa.me/${SITE.wa}">${SITE.phone}</a></p></div><div class="footer-nav"><a href="espectaculos.html">${labels[0]}</a><a href="formacion.html">${labels[1]}</a><a href="documentacion.html">${labels[2]}</a><a href="contacto.html">${labels[3]}</a><a target="_blank" rel="noopener" href="${SITE.instagram}">Instagram</a><a target="_blank" rel="noopener" href="${SITE.facebook}">Facebook</a></div><div class="footer-bottom">© La Tegala Escénica, Lanzarote · lategalaescenica@gmail.com</div></div></footer>`
}
function i18n(){
 const l=lang(); document.documentElement.lang=l;
 const dict=(window.PAGE_I18N&&window.PAGE_I18N[l])||(window.PAGE_I18N&&window.PAGE_I18N.es)||{};
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(dict[k]!=null)el.innerHTML=dict[k]});
 document.querySelectorAll("[data-i18n-attr]").forEach(el=>{const [attr,key]=el.dataset.i18nAttr.split(":");if(dict[key]!=null)el.setAttribute(attr,dict[key])});
}
function galleries(){
 document.querySelectorAll("[data-lightbox]").forEach(img=>img.addEventListener("click",()=>{const m=document.createElement("div");m.className="lightbox open";m.innerHTML=`<button class="close" aria-label="Cerrar">×</button><img src="${img.src}" alt="${img.alt}">`;m.onclick=e=>{if(e.target===m||e.target.classList.contains("close"))m.remove()};document.body.appendChild(m)}))
}
const COUNTER_NS="lategala-escenica-2026";
function initCounter(){
 const d=document.createElement("div"); d.className="counterapi"; d.setAttribute("ns",COUNTER_NS); d.setAttribute("action","pageview"); d.setAttribute("key",(location.pathname.split("/").pop()||"index.html")); d.setAttribute("unique","true"); d.setAttribute("invisible","true"); d.setAttribute("noLink","true"); d.style.display="none"; document.body.appendChild(d);
 if(!document.querySelector('script[data-counterapi]')){const s=document.createElement("script");s.src="https://counterapi.com/c.js?ns="+COUNTER_NS;s.async=true;s.dataset.counterapi="1";document.head.appendChild(s)}
}
function track(){
 const seen=new Set();
 document.querySelectorAll("[data-track],a[download]").forEach(el=>{if(seen.has(el))return;seen.add(el);el.addEventListener("click",()=>{const raw=el.dataset.track||("download-"+(el.getAttribute("href")||"file").split("/").pop());const k=encodeURIComponent(raw);const img=new Image();img.src="https://counterapi.com/pixel.gif?ns="+COUNTER_NS+"&action=event&key="+k})})
}
function mailto(subject,body=""){return "mailto:"+SITE.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)}
function wireMail(){
 document.querySelectorAll("[data-mail-subject]").forEach(a=>{a.href=mailto(a.dataset.mailSubject,a.dataset.mailBody||"")})
}

const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
async function getData(file){try{const r=await fetch("data/"+file,{cache:"no-store"});if(!r.ok)throw new Error(r.status);return await r.json()}catch(e){return null}}
async function hydrateNews(){
 const data=await getData("actualidad.json"); if(!data)return;
 const featured=document.querySelector("[data-news-featured]");
 if(featured){featured.innerHTML=data.filter(x=>x.featured).slice(0,3).map(x=>`<div class="card"><div class="card-body"><div class="card-label">${esc(x.source)}</div><h3>${esc(loc(x,"title"))}</h3><p>${esc(loc(x,"summary"))}</p><a class="btn view" target="_blank" rel="noopener" href="${esc(x.url)}">Ver</a></div></div>`).join("")}
 const list=document.querySelector("[data-news-list]");
 if(list){list.innerHTML=data.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(x=>`<div class="press-card"><div class="source">${esc(x.source)}</div><div><h3>${esc(loc(x,"title"))}</h3><p>${esc(x.date)} · ${esc(loc(x,"summary"))}</p></div><a class="btn view" target="_blank" rel="noopener" href="${esc(x.url)}">Ver</a></div>`).join("")}
}
async function hydrateTimeline(){
 const els=document.querySelectorAll("[data-timeline]"); if(!els.length)return;
 const data=await getData("trayectoria.json"); if(!data)return;
 els.forEach(el=>{const id=el.dataset.timeline;el.innerHTML=data.filter(x=>x.project===id).map(x=>`<div class="event"><div class="date">${esc(x.date)}</div><div class="rail"><div class="dot"></div></div><div class="content"><h3>${esc(loc(x,"title"))}</h3><p>${esc(loc(x,"summary"))}</p>${x.url?`<a target="_blank" rel="noopener" href="${esc(x.url)}">Más información ↗</a>`:""}</div></div>`).join("")})
}
async function hydrateVideos(){
 const els=document.querySelectorAll("[data-videos]"); if(!els.length)return;
 const data=await getData("videos.json"); if(!data)return;
 els.forEach(el=>{const id=el.dataset.videos;el.innerHTML=data.filter(x=>x.project===id).map(x=>`<a class="video" target="_blank" rel="noopener" href="${esc(x.url)}"><span>▶ ${esc(loc(x,"title"))}<small>${esc(x.source||"Vídeo")}</small></span></a>`).join("")})
}
document.addEventListener("DOMContentLoaded",()=>{header();footer();i18n();galleries();track();wireMail();hydrateNews();hydrateTimeline();hydrateVideos();initCounter()});
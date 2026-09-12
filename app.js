let SITE = null;

const esc = (v="") => String(v)
  .replaceAll("&","&amp;").replaceAll("<","&lt;")
  .replaceAll(">","&gt;").replaceAll('"',"&quot;");

async function loadSite(){
  const res = await fetch("/content/site.json?ts=" + Date.now());
  SITE = await res.json();

  document.getElementById("tickerText").textContent = SITE.ticker || "";
  document.getElementById("heroEyebrow").textContent = SITE.hero?.eyebrow || "";
  document.getElementById("heroTitle").textContent = SITE.hero?.title || "";
  document.getElementById("heroSubtitle").textContent = SITE.hero?.subtitle || "";
  document.getElementById("heroDescription").textContent = SITE.hero?.description || "";
  document.getElementById("liveEmoji").textContent = SITE.live?.emoji || "🧀";
  document.getElementById("liveTitle").textContent = SITE.live?.title || "";
  document.getElementById("liveDescription").textContent = SITE.live?.description || "";
  document.getElementById("liveMeta").textContent = SITE.live?.meta || "";

  renderNews(SITE.news || []);
  generateHeadline();
}

function renderNews(items){
  const root = document.getElementById("news");
  root.innerHTML = items.map((n) => {
    const cover = n.image
      ? `<div class="emoji-cover"><img src="${esc(n.image)}" alt=""></div>`
      : `<div class="emoji-cover">${esc(n.emoji || "🐭")}</div>`;
    return `<article class="news-card ${n.featured ? "featured" : ""}" data-category="${esc(n.category)}">
      <div class="badge ${esc(n.category)}">${esc(n.badge)}</div>
      ${cover}
      <h3>${esc(n.title)}</h3>
      <p>${esc(n.description)}</p>
      <div class="card-footer"><span>${esc(n.source)}</span><span>•</span><span>${esc(n.time)}</span></div>
    </article>`;
  }).join("");
  applyCurrentFilter();
}

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn.addEventListener("click",()=>mobileNav.classList.toggle("open"));

let currentFilter = "all";
const filterButtons = document.querySelectorAll(".category-strip button");
filterButtons.forEach(btn => btn.addEventListener("click", ()=>{
  filterButtons.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  applyCurrentFilter();
}));

function applyCurrentFilter(){
  document.querySelectorAll(".news-card").forEach(card=>{
    const show = currentFilter==="all" || card.dataset.category===currentFilter;
    card.classList.toggle("hidden",!show);
  });
}

function generateHeadline(){
  const list = SITE?.random_headlines || ["🐭 TFM News hazır!"];
  document.getElementById("generatedHeadline").textContent =
    list[Math.floor(Math.random()*list.length)];
}
document.getElementById("generateBtn").addEventListener("click",generateHeadline);
document.getElementById("randomHeadline").addEventListener("click",()=>{
  generateHeadline();
  document.querySelector(".headline-generator").scrollIntoView({behavior:"smooth"});
});

loadSite().catch(err=>{
  console.error(err);
  document.getElementById("news").innerHTML =
    '<article class="news-card"><h3>İçerik yüklenemedi.</h3><p>content/site.json dosyasını kontrol et.</p></article>';
});

const projects = [
  { id:'shoehaul', name:'SHOE HAUL', date:'10.2024', cat:'E-COMMERCE', desc:'E-commerce experience for sneaker culture. Clear product discovery, calm cart flow and performant interactions. Built for Shoe Haul.', stack:'Next.js, Motion, Shopify', at:'Siphr Studio', link:'https://github.com/verhaxity' },
  { id:'shalmour', name:'SHALMOUR', date:'09.2024', cat:'E-COMMERCE', desc:'Brand site for Kashmiri honey — warm editorial layout, storytelling and direct-to-consumer experience.', stack:'Next.js, Tailwind, Motion', at:'Siphr Studio', link:'https://github.com/verhaxity' },
  { id:'cashmeer', name:'CASHMEER SPORTS', date:'08.2024', cat:'WEBSITE', desc:'Sports brand site with bold typography, catalog and team showcase. Clean navigation and fast browsing.', stack:'Next.js, Shopify', at:'Siphr Studio', link:'https://github.com/verhaxity' },
  { id:'siphr', name:'SIPHR STUDIO', date:'06.2024', cat:'STUDIO SITE', desc:'Digital studio portfolio — minimal, interactive and easy to scan. Home for Siphr Studio, 2024, Srinagar, Kashmir.', stack:'Next.js, Framer Motion', at:'Siphr Studio', link:'https://github.com/verhaxity' },
  { id:'wyvern', name:'WYVERN', date:'02.2024', cat:'WEB APP', desc:'Frontend for Wyvern — interfaces for internal tools and web apps. Focus on clarity and speed.', stack:'React, TypeScript', at:'Wyvern', link:'https://www.linkedin.com/in/faaiqmushtaq/' },
  { id:'freelance', name:'FREELANCE', date:'2020 —', cat:'SELECTED WORK', desc:'Four years of freelance with small brands and studios across Kashmir.', stack:'Figma, VS Code, React', at:'Freelance', link:'mailto:faaiqkh124@gmail.com' }
];

const listEl = document.getElementById('projectsList');
const detail = document.getElementById('projectDetail');
const dDate = document.getElementById('detailDate');
const dCat = document.getElementById('detailCat');
const dTitle = document.getElementById('detailTitle');
const dDesc = document.getElementById('detailDesc');
const dStack = document.getElementById('detailStack');
const dAt = document.getElementById('detailAt');
const dLink = document.getElementById('detailLink');
const closeBtn = document.getElementById('detailClose');

let activeId = projects[0].id;

function render(){
  listEl.innerHTML = projects.map(p=>`
    <li class="${p.id===activeId?'active':''}" data-id="${p.id}">
      <span class="p-name">${p.name}</span>
      <span class="p-meta">${p.date} — ${p.cat}</span>
    </li>
  `).join('');
  listEl.querySelectorAll('li').forEach(li=>{
    li.addEventListener('click',()=> setActive(li.dataset.id));
  });
}
function setActive(id, scrollDetail = true){
  activeId=id;
  const p=projects.find(x=>x.id===id);
  if(!p) return;
  render();
  dDate.textContent=p.date;
  dCat.textContent=p.cat;
  dTitle.textContent=p.name;
  dDesc.textContent=p.desc;
  dStack.textContent=p.stack;
  dAt.textContent=p.at;
  dLink.href=p.link;
  dLink.textContent=p.link.startsWith('mailto')?'CONTACT →':'VISIT SITE →';
  detail.classList.add('open');
  if(scrollDetail) detail.scrollIntoView({behavior:'smooth', block:'nearest'});
}
if(closeBtn) closeBtn.addEventListener('click',()=> detail.classList.remove('open'));

render();
setActive(activeId, false);
// —— loader + initial reveal (desktop + mobile) ——
(function(){
  const loader = document.getElementById('loader');
  const page = document.getElementById('page');
  const pct = document.getElementById('loaderPct');
  const bar = document.getElementById('loaderProgress');
  if(!loader || !page) return;
  document.body.style.overflow = 'hidden';
  let p = 0;
  const iv = setInterval(()=>{
    p += p < 70 ? Math.random()*18+8 : p < 90 ? Math.random()*6+2 : Math.random()*2+1;
    if(p>100) p=100;
    if(pct) pct.textContent = Math.floor(p)+'%';
    if(bar) bar.style.width = p+'%';
    if(p>=100) clearInterval(iv);
  }, 90);
  function hideLoader(){
    clearInterval(iv);
    if(pct) pct.textContent='100%';
    if(bar) bar.style.width='100%';
    loader.classList.add('hidden');
    loader.setAttribute('aria-hidden','true');
    page.classList.add('loaded');
    document.body.style.overflow = '';
    // ensure starts at top after reveal
    window.scrollTo(0,0);
    if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }
  // minimum visible time for animation, works on both normal and responsive
  const min = 1400;
  const start = Date.now();
  window.addEventListener('load', ()=>{
    const elapsed = Date.now() - start;
    const wait = Math.max(0, min - elapsed);
    setTimeout(hideLoader, wait);
  });
  // fallback if load already fired
  setTimeout(()=>{
    if(!loader.classList.contains('hidden') && document.readyState === 'complete') hideLoader();
  }, 2200);
})();

// mobile nav — animated open/close
const menuBtn=document.getElementById('menuBtn');
const mobileNav=document.getElementById('mobileNav');
let open=false;
if(menuBtn && mobileNav){
  menuBtn.addEventListener('click',()=>{
    open=!open;
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    menuBtn.textContent=open?'CLOSE':'MENU';
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    // subtle scale pop
    menuBtn.animate([{transform:'scale(0.96)'},{transform:'scale(1)'}], {duration:180, easing:'ease-out'});
  });
  function getStickyOffset(){
    const topbar = document.querySelector('.topbar');
    const navbar = document.querySelector('.navbar');
    return (topbar ? topbar.offsetHeight : 0) + (navbar ? navbar.offsetHeight : 0) + 8;
  }
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    const offset = getStickyOffset();
    // for hero/TOP, go to absolute top so first pixel row is fully visible
    if(id === 'hero') { window.scrollTo({top: 0, behavior:'smooth'}); return; }
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top: Math.max(0, top), behavior:'smooth'});
  }
  mobileNav.querySelectorAll('[data-go]').forEach(b=>{
    b.addEventListener('click',()=>{
      const id=b.dataset.go;
      // close first, then scroll after nav collapses so rect is correct and header doesn't cover target
      open=false;
      mobileNav.classList.remove('open');
      menuBtn.textContent='MENU';
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      mobileNav.setAttribute('aria-hidden','true');
      // wait for collapse animation (320ms) then scroll with correct offset
      setTimeout(()=> scrollToSection(id), 360);
    });
  });
  // desktop navbar links — offset for sticky topbar+navbar
  document.querySelectorAll('.navbar a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      scrollToSection(id);
    });
  });
}

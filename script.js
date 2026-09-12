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
  // parallax for hero pixel + float shapes
  const hero = document.getElementById('hero');
  if(hero){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY * 0.12;
      const px = hero.querySelector('.pixel-hero');
      if(px) px.style.transform = `translateY(${y*0.4}px)`;
      hero.querySelectorAll('.float-shape').forEach((el,i)=>{
        el.style.transform = `translateY(${y*(0.6+i*0.2)}px) rotate(${8 + y*0.04}deg)`;
      });
    }, {passive:true});
  }
}

// —— experimental: reveal on scroll + marquee pause on hover + count-up ——
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('in-view');
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el=> io.observe(el));
    // hero always visible after loader
    setTimeout(()=> document.getElementById('hero')?.classList.add('in-view'), 1600);
  } else {
    reveals.forEach(el=> el.classList.add('in-view'));
  }
  // marquee pause on hover (desktop) / touch
  const marquee = document.querySelector('.marquee-track');
  if(marquee){
    const wrap = marquee.parentElement;
    wrap.addEventListener('mouseenter', ()=> marquee.style.animationPlayState='paused');
    wrap.addEventListener('mouseleave', ()=> marquee.style.animationPlayState='running');
    wrap.addEventListener('touchstart', ()=> marquee.style.animationPlayState='paused', {passive:true});
    wrap.addEventListener('touchend', ()=> marquee.style.animationPlayState='running');
  }
  // subtle tilt for window on mouse move (desktop)
  const win = document.querySelector('.window');
  if(win && window.matchMedia('(hover:hover)').matches){
    win.addEventListener('mousemove', (e)=>{
      const r = win.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      win.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(0)`;
    });
    win.addEventListener('mouseleave', ()=> win.style.transform='');
  }
})();

// —— interact: scramble + console + draggable card ——
(function(){
  const wrap = document.getElementById('scrambleWrap');
  const out = document.getElementById('scramble');
  const sub = document.getElementById('scrambleSub');
  if(wrap && out){
    const phrases = ['CRAFT — CLARITY — CARE','MOTION — TYPE — SPACE','NEXT.JS — MOTION — SHOPIFY','SIPHR STUDIO — WYVERN','SRINAGAR — KASHMIR'];
    let idx=0, locked=false, iv=null;
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*';
    function scrambleTo(text, intensity=0.6){
      const len=text.length;
      let frame=0, total=14;
      clearInterval(iv);
      iv=setInterval(()=>{
        let res='';
        for(let i=0;i<len;i++){
          if(text[i]===' '||text[i]==='—'){ res+=text[i]; continue; }
          if(Math.random()< (1 - frame/total) * intensity) res+= chars[Math.floor(Math.random()*chars.length)];
          else res+= text[i];
        }
        out.textContent=res;
        if(sub) sub.textContent = frame>6 ? phrases[idx] : 'Srinagar, Kashmir — Frontend Developer';
        frame++;
        if(frame>total){ clearInterval(iv); out.textContent=text; }
      }, 30);
    }
    // auto cycle
    setInterval(()=>{ if(locked) return; idx=(idx+1)%phrases.length; scrambleTo(phrases[idx],0.7)}, 2600);
    // mouse / drag
    let isDown=false;
    function onMove(e){
      if(locked) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      const rect = wrap.getBoundingClientRect();
      const rel = (x - rect.left)/rect.width;
      const intensity = Math.min(0.9, Math.abs(rel-0.5)*1.8 + 0.3);
      scrambleTo(phrases[idx], intensity);
    }
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('touchmove', onMove, {passive:true});
    wrap.addEventListener('mousedown', ()=> isDown=true);
    wrap.addEventListener('mouseup', ()=> isDown=false);
    wrap.addEventListener('click', ()=>{
      if(locked){ locked=false; wrap.style.outline=''; return; }
      // lock current
      locked=true; wrap.style.outline='2px solid var(--white)'; wrap.style.outlineOffset='-2px';
    });
    wrap.addEventListener('dblclick', ()=>{
      locked=false; wrap.style.outline=''; idx=0; scrambleTo(phrases[idx],0.9);
    });
    // keyboard
    wrap.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); wrap.click(); }
    });
  }
  // console
  const consoleOut = document.getElementById('consoleOut');
  const cmds = document.querySelectorAll('.console-cmds button');
  const data = {
    stack: '<span class="prompt">></span> Next.js / React / Tailwind / Framer Motion / Shopify / TypeScript<br><span class="muted">4 years — Siphr Studio + Wyvern</span>',
    focus: '<span class="prompt">></span> Interactive development · Motion · E-commerce · Design systems<br><span class="muted">Shalmour / Shoe Haul / Cashmeer Sports</span>',
    available: '<span class="prompt">></span> Available for freelance — January 2026<br><span class="muted">Srinagar, Kashmir — faaiqkh124@gmail.com</span>',
    contact: '<span class="prompt">></span> faaiqkh124@gmail.com — github.com/verhaxity<br><span class="muted">linkedin.com/in/faaiqmushtaq</span>'
  };
  function typeOut(html){
    if(!consoleOut) return;
    consoleOut.innerHTML=''; let i=0;
    const tmp=document.createElement('div'); tmp.innerHTML=html;
    const text=tmp.innerText;
    const iv=setInterval(()=>{
      consoleOut.textContent=text.slice(0,i);
      i+=3;
      if(i>=text.length){ clearInterval(iv); consoleOut.innerHTML=html; }
    }, 14);
  }
  cmds.forEach(b=>{
    b.addEventListener('click',()=>{
      cmds.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const k=b.dataset.cmd;
      if(data[k]) typeOut(data[k]);
      b.animate([{transform:'scale(0.97)'},{transform:'scale(1)'}],{duration:140,easing:'ease-out'});
    });
  });
  // draggable card
  const card = document.getElementById('dragCard');
  if(card){
    let sx=0,sy=0,ox=0,oy=0,drag=false;
    const handle = card.querySelector('.drag-handle') || card;
    function pos(e){ return e.touches ? {x:e.touches[0].clientX, y:e.touches[0].clientY} : {x:e.clientX, y:e.clientY}; }
    function down(e){
      drag=true; const p=pos(e); sx=p.x; sy=p.y;
      const r=card.getBoundingClientRect(); ox=r.left; oy=r.top;
      card.style.position='fixed'; card.style.zIndex='10'; card.style.margin='0';
      e.preventDefault();
    }
    function move(e){
      if(!drag) return;
      const p=pos(e);
      card.style.left=(ox + p.x - sx)+'px';
      card.style.top=(oy + p.y - sy)+'px';
      card.style.right='auto'; card.style.bottom='auto';
    }
    function up(){ drag=false; }
    handle.addEventListener('mousedown', down);
    handle.addEventListener('touchstart', down, {passive:false});
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, {passive:false});
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    // reset on double click
    card.addEventListener('dblclick', ()=>{
      card.style.position=''; card.style.left=''; card.style.top=''; card.style.zIndex='';
    });
  }
})();

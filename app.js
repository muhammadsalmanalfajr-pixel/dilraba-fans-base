
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const menuBtn=$('#menuBtn'), mobileMenu=$('#mobileMenu');
if(menuBtn&&mobileMenu) menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
$$('[data-mobile-link]').forEach(a=>a.addEventListener('click',()=>mobileMenu?.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

let ticking=false;
function parallax(){
  const y=window.scrollY;
  $$('.parallax').forEach(el=>{
    const speed=parseFloat(el.dataset.speed||'.12');
    el.style.transform=`translate3d(0,${y*speed}px,0)`;
  });
  const top=$('#backTop');
  if(top) top.classList.toggle('opacity-0',y<500), top.classList.toggle('pointer-events-none',y<500);
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}});
parallax();
$('#backTop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const lb=$('#lightbox'), lbImg=$('#lightboxImg'), lbTitle=$('#lightboxTitle');
$$('[data-lightbox]').forEach(card=>card.addEventListener('click',()=>{
  lbImg.src=card.dataset.src; lbImg.alt=card.dataset.alt||'Gallery image'; if(lbTitle) lbTitle.textContent=card.dataset.title||'Gallery';
  lb.classList.add('open'); document.body.style.overflow='hidden';
}));
function closeLb(){lb?.classList.remove('open');document.body.style.overflow=''}
$('#lbClose')?.addEventListener('click',closeLb);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

const year=$('#year'); if(year) year.textContent=new Date().getFullYear();

const form=$('#contactForm');
if(form) form.addEventListener('submit',e=>{
  e.preventDefault();
  const note=$('#formNote'); if(note){note.textContent='Pesan berhasil disiapkan. Untuk versi produksi, hubungkan form ini ke endpoint email atau backend Anda.';note.classList.remove('hidden')}
  form.reset();
});

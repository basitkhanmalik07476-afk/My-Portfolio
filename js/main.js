(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const I=(n,c='')=>`<svg class="i ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
/* ===== EDIT ME ===== */
const CFG={email:'basitkhanmalik07476@gmail.com'};
const WORDS=['WordPress','Shopify','Responsive','Fast-loading'];
const PINGS=[['cart','New Shopify order','Store launch · just now'],['rocket','Project delivered','WordPress site is live'],['star','New 5-star review','“Super fast delivery!”'],['chat','New inquiry','Landing page request'],['check','Milestone reached','30+ projects delivered']];
const REVIEWS=[['Ayesha K.','Boutique owner',5,'My Shopify store was ready before the deadline and looks premium on mobile.'],['Daniyal R.','Startup founder',5,'Clean code, quick replies and a landing page that actually converts.'],['Sara M.','Blogger',5,'He fixed my slow WordPress site and it now loads in under two seconds.'],['Usman T.','Agency lead',4,'Reliable developer. Pixel-perfect work from our Figma files.']];
const PLANS=[['Starter','rocket','Landing page or small business site',[149,199],0,[['1–3 pages',1],['Mobile responsive',1],['Basic SEO setup',1],['Contact form',1],['Custom animations',0],['Online store',0]]],['Pro','sparkles','Business site or store that looks premium',[299,399],1,[['Up to 10 pages',1],['WordPress or Shopify',1],['Speed optimization',1],['Custom animations',1],['14 days free support',1],['Booking or custom app',0]]],['Business','bag','Full store or custom features',[599,799],0,[['Custom features',1],['Store or booking system',1],['Speed optimization',1],['Custom animations',1],['30 days free fixes',1],['Priority support',1]]]];
const VS=[['Direct chat with the developer',1,0],['Custom code, no bloated themes',1,0],['Mobile-first on every page',1,1],['Fast delivery',1,0],['Free fixes after launch',1,0],['Transparent fixed price',1,0]];
/* theme */
const root=document.documentElement;$('#th').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;root.dataset.theme=d?'light':'dark'};
/* scroll reveal (shared) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
/* 2 word rotator */
const rot=$('#rot');rot.innerHTML=WORDS.map((w,i)=>`<span class="${i?'':'on'}">${w}</span>`).join('');
const rs=$$('span',rot);let ri=0;
if(!RM)setInterval(()=>{const o=rs[ri];o.className='out';ri=(ri+1)%rs.length;rs[ri].className='on';setTimeout(()=>{if(o!==rs[ri])o.className=''},600)},2300);
/* 5 count-up */
$$('[data-to]').forEach(el=>{const to=+el.dataset.to,suf=el.dataset.suf||'';
const run=()=>{if(RM){el.textContent=to+suf;return}const t0=performance.now(),f=t=>{const k=Math.min((t-t0)/1600,1);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f);else el.classList.add('done')};requestAnimationFrame(f)};
const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){run();o.disconnect()}},{threshold:.6});o.observe(el)});
/* 7 cursor tour (confined to stage) */
const stg=$('#stage'),cur=$('#cur'),tip=$('#tip'),tgs=$$('[data-tip]',stg);let ti=-1,tm=null,play=!RM;
const go=()=>{tgs.forEach(t=>t.classList.remove('hl'));ti=(ti+1)%tgs.length;const t=tgs[ti],s=stg.getBoundingClientRect(),r=t.getBoundingClientRect();
const x=r.left-s.left+r.width/2-4,y=r.top-s.top+r.height/2-2;t.classList.add('hl');cur.style.transform=`translate(${x}px,${y}px)`;
tip.textContent=t.dataset.tip;$('#cap').textContent=t.dataset.tip;const tx=Math.max(8,Math.min(x-80,s.width-226));tip.style.transform=`translate(${tx}px,${Math.min(y+30,s.height-60)}px)`};
const loop=()=>{clearTimeout(tm);if(play)tm=setTimeout(()=>{go();loop()},2600)};
const to=new IntersectionObserver(([e])=>{if(e.isIntersecting){if(ti<0)go();loop()}else clearTimeout(tm)},{threshold:.4});to.observe(stg);
$('#nx').onclick=()=>{go();loop()};const pp=$('#pp');pp.textContent=play?'Pause tour':'Play tour';
pp.onclick=()=>{play=!play;pp.textContent=play?'Pause tour':'Play tour';loop()};
addEventListener('resize',()=>{if(ti>=0){ti--;go()}});
/* 8 process draw */
const pr=$('#proc'),fl=$('.fill',pr),sts=$$('.step',pr);let tk=false;
const up=()=>{tk=false;const r=pr.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height));fl.style.transform=`scaleY(${RM?1:p})`;sts.forEach(s=>s.classList.toggle('on',RM||s.offsetTop+24<=p*r.height))};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(up)}},{passive:true});addEventListener('resize',up);up();
/* 9 before/after: mouse, touch (pointer events) and keyboard */
const ba=$('#ba'),bh=$('#bh');let bv=50;
const sb=x=>{bv=Math.max(0,Math.min(100,x));ba.style.setProperty('--p',bv+'%');bh.setAttribute('aria-valuenow',Math.round(bv))};
const mv=e=>{const r=ba.getBoundingClientRect();sb((e.clientX-r.left)/r.width*100)};
ba.addEventListener('pointerdown',e=>{ba.setPointerCapture(e.pointerId);mv(e);ba.addEventListener('pointermove',mv)});
['pointerup','pointercancel'].forEach(n=>ba.addEventListener(n,()=>ba.removeEventListener('pointermove',mv)));
bh.addEventListener('keydown',e=>{const d={ArrowLeft:-5,ArrowDown:-5,ArrowRight:5,ArrowUp:5,Home:-100,End:100}[e.key];if(d){e.preventDefault();sb(bv+d)}});
/* 4 review shuffle */
const rv=$('#rv');rv.innerHTML=REVIEWS.map(r=>`<article class="rc"><div class="st" aria-label="${r[2]} out of 5 stars">${I('star','f').repeat(r[2])}${I('star').repeat(5-r[2])}</div><q>${r[3]}</q><b>${r[0]}</b><small>${r[1]}</small></article>`).join('');
const cs=$$('.rc',rv);let cu=0,hv=false;
const lay=()=>cs.forEach((c,i)=>{const o=(i-cu+cs.length)%cs.length;c.style.setProperty('--o',o);c.style.zIndex=9-o;c.style.opacity=o>2?0:1;c.setAttribute('aria-hidden',o?'true':'false')});
const sh=d=>{cu=(cu+d+cs.length)%cs.length;lay()};lay();
$('#nr').onclick=()=>sh(1);$('#pv').onclick=()=>sh(-1);rv.onmouseenter=()=>hv=true;rv.onmouseleave=()=>hv=false;
if(!RM)setInterval(()=>{if(!hv)sh(1)},4500);
/* 10 pricing: toggle + number roll + plan pre-fills the contact form */
let mode=0;const pl=$('#plans'),dl=['7–14 days','3–5 days'];
pl.innerHTML=PLANS.map((p,k)=>`<div class="card pl rv${p[4]?' rec':''}" style="--i:${k}">${p[4]?'<span class="bdg">Most popular</span>':''}<div class="ib">${I(p[1])}</div><h3>${p[0]}</h3><p>${p[2]}</p><div class="pr"><span class="amt">$<span class="num">${p[3][0]}</span></span><small> / project</small></div><div class="dv">${I('calendar')}<span class="dd">${dl[0]}</span></div><ul>${p[5].map(f=>`<li class="${f[1]?'':'no'}">${I(f[1]?'check':'x')}${f[0]}</li>`).join('')}</ul><a class="btn${p[4]?'':' o'}" href="#contact" data-k="${k}">Choose ${p[0]}</a></div>`).join('');
const roll=(el,to)=>{const from=+el.textContent,t0=performance.now();if(RM){el.textContent=to;return}const f=t=>{const k=Math.min((t-t0)/600,1);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
$$('#tg button').forEach((b,i)=>b.onclick=()=>{mode=i;$('#tg').dataset.m=i;$$('#tg button').forEach((x,j)=>x.setAttribute('aria-pressed',j===i));$$('.num',pl).forEach((n,k)=>roll(n,PLANS[k][3][i]));$$('.dd',pl).forEach(d=>d.textContent=dl[i])});
pl.addEventListener('click',e=>{const a=e.target.closest('[data-k]');if(!a)return;const p=PLANS[a.dataset.k],t=$('#f textarea');
if(!t.value||t.dataset.auto){t.value=`Hi Basit, I’m interested in the ${p[0]} plan (${mode?'Express':'Standard'} delivery, $${p[3][mode]}). Project details: `;t.dataset.auto=1;t.addEventListener('input',()=>delete t.dataset.auto,{once:true});$('.cc').textContent=t.value.length+' / 600'}});
$$('.rv',pl).forEach(el=>io.observe(el));
const fm=$('#fm');fm.textContent=CFG.email;fm.href='mailto:'+CFG.email;
pl.addEventListener('pointermove',e=>{const c=e.target.closest('.pl');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')});
/* 11 us vs them */
const ic=v=>v?`<span class="y" aria-label="Yes">${I('check')}</span>`:`<span class="x" aria-label="No">${I('x')}</span>`;
$('#vs').innerHTML=VS.map(r=>`<tr><td>${r[0]}</td><td class="us">${ic(r[1])}</td><td>${ic(r[2])}</td></tr>`).join('');
$$('#vs tr').forEach((r,i)=>{r.style.transitionDelay=i*90+'ms';io.observe(r)});
/* mobile menu + active section highlight */
const hd=$('header'),mb=$('#mb');
const setM=o=>{hd.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''};
mb.onclick=()=>setM(!hd.classList.contains('open'));
$$('nav a').forEach(a=>a.addEventListener('click',()=>setM(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setM(false)});
/* "Why Me?" dropdown */
const hdd=$('.hdd'),hddb=$('.hddb');
const setD=o=>{hdd.classList.toggle('open',o);hddb.setAttribute('aria-expanded',o)};
hddb.addEventListener('click',e=>{e.stopPropagation();setD(!hdd.classList.contains('open'))});
document.addEventListener('click',e=>{if(!hdd.contains(e.target))setD(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')setD(false)});
$$('.hddm a').forEach(a=>a.addEventListener('click',()=>setD(false)));
addEventListener('resize',()=>{if(innerWidth>820)setM(false)});
document.addEventListener('click',e=>{if(hd.classList.contains('open')&&!hd.contains(e.target))setM(false)});
const nl=$$('nav a[href^="#"]:not(.btn)'),spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)nl.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id));$('.hddb').classList.toggle('act',!!$('.hddm a.act'))}),{rootMargin:'-45% 0px -50% 0px'});
nl.forEach(a=>{const t=$(a.getAttribute('href'));t&&spy.observe(t)});
/* marquee, projects, skill bars */
const T=['HTML5','CSS3','JavaScript','React','WordPress','Shopify','Responsive Design','Speed Optimization','UI Animations','SEO Basics'];
const mh=T.map(t=>`<span class="mp">${I('check')}${t}</span>`).join('');$('#mt').innerHTML=mh+mh;
/* projects: infinite centre-mode carousel */
const pj_FV='https://www.fiverr.com/s/2ppPYgV';
const pj_PJ=[{"t": "Sphinxia", "cat": "E-commerce", "d": "The client needed a premium online store with elegant product presentation and a smooth shopping journey. We delivered a fully responsive e-commerce website with clean product pages, easy navigation and a refined customer experience.", "g": ["#0a5cf0", "#1ea2ff"], "img": "assets/sphinxia.webp", "pos": "center center", "url": "https://www.sphinxia.shop/"}, {"t": "ElitePlay", "cat": "Web App", "d": "Designed and developed ElitePlay, a modern movie and entertainment platform with an intuitive interface and seamless browsing experience.", "g": ["#071f4a", "#0a5cf0"], "img": "assets/eliteplay.webp", "pos": "center center", "url": "https://elite-play-final.vercel.app/"}, {"t": "The Classic Therapy Group Inc.", "cat": "Healthcare Website", "d": "The clinic wanted a trustworthy website that explains its physiotherapy services and makes its locations easy to find. We delivered a responsive healthcare website with clear service pages, clinic details and simple appointment booking.", "g": ["#0b3fb8", "#1ea2ff"], "img": "assets/classicphysio.webp", "pos": "center center", "url": "https://classicphysio.mercurysols.org/"}, {"t": "Amoura Fashion", "cat": "Shopify Store", "d": "The brand wanted a stylish Shopify store with well-organized collections and an effortless buying journey. We delivered a modern storefront with clean layouts, structured product collections and a smooth, mobile-friendly checkout.", "g": ["#1ea2ff", "#0a5cf0"], "img": "assets/amoura.webp", "url": "https://45bue8-bm.myshopify.com/", "pos": "center center"}, {"t": "SpeechText - Text to Speech Studio", "cat": "Web App", "d": "Designed and developed SpeechText Studio, a modern text-to-speech web app that converts written text into speech through an intuitive and user-friendly interface.", "g": ["#041433", "#0b3fb8"], "img": "assets/speechtext.webp", "pos": "center center", "url": "https://speechtext-iota.vercel.app/tts"}, {"t": "AC Repair & Maintenance Dubai", "cat": "Business Website", "d": "The client needed a professional website for their AC repair, maintenance and installation services in Dubai. We delivered a responsive site with clear service sections and a simple way for customers to get in touch.", "g": ["#0a5cf0", "#071f4a"], "img": "assets/acrepair.webp", "url": "https://acrepairmaintenancedubai.com/"}, {"t": "Ambrocks Lumina", "cat": "WordPress Website", "d": "The client wanted a refined website that reflects the brand and promotes current offers. We delivered an elegant WordPress website with engaging visuals, a clear shop layout and a seamless user experience.", "g": ["#0a5cf0", "#1ea2ff"], "img": "assets/ambrockslumina.webp", "pos": "center center", "url": "https://ambrockslumina.com/"}, {"t": "Zakinagar", "cat": "WordPress Website", "d": "The client needed a strong online presence for their organic food range with easy product browsing. We delivered a clean, modern WordPress website with clear product categories and a user-friendly experience.", "g": ["#0a5cf0", "#1ea2ff"], "img": "assets/zakinagar.webp", "pos": "center center", "url": "https://zakinagar.com/"}, {"t": "Safe Water Technology", "cat": "WordPress Website", "d": "The client wanted a professional website to present their water purification and treatment solutions. We delivered a clean WordPress website with organized product categories and a clear layout that builds customer trust.", "g": ["#0a5cf0", "#1ea2ff"], "img": "assets/safewater.webp", "pos": "center center", "url": "https://safewatertechnology.store/"}];
const pj_N=pj_PJ.length,pj_ct=$('#ct2'),pj_cr=$('#cr');
const pj_IMG={};
const pj_esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const pj_card=p=>`<article class="cd"><div class="bf"><span></span><span></span><span></span></div><div class="th2"><div class="ms" style="background:linear-gradient(120deg,${p.g[0]},${p.g[1]})"><h4>${pj_esc(p.t)}</h4><p>${pj_esc(p.cat)}</p><i></i></div>${p.img?`<img class="pim" src="${pj_IMG[p.img]||p.img}" alt="${pj_esc(p.t)} website preview" loading="lazy" decoding="async" style="object-position:${p.pos||'center center'}">`:''}${p.url?`<a class="vw" href="${p.url}" target="_blank" rel="noopener noreferrer">View project ${I('right')}</a>`:''}</div><div class="cb2"><span class="tag2">${pj_esc(p.cat)}</span><h3>${pj_esc(p.t)}</h3><p>${pj_esc(p.d)}</p></div></article>`;
pj_ct.innerHTML=pj_PJ.concat(pj_PJ,pj_PJ,pj_PJ,pj_PJ).map(pj_card).join('');
$$('.pim',pj_ct).forEach(im=>im.addEventListener('error',()=>im.remove()));
const pj_cds=$$('.cd',pj_ct);let pj_ix=2*pj_N,pj_tm=0,pj_sx=0;
const pj_place=anim=>{const w=pj_cds[0].offsetWidth,g=24;if(!anim)pj_ct.classList.add('nt');pj_ct.style.transition=anim?'':'none';pj_ct.style.transform=`translateX(${pj_cr.clientWidth/2-(pj_ix*(w+g)+w/2)}px)`;pj_cds.forEach((c,i)=>c.classList.toggle('on',i===pj_ix));if(!anim){void pj_ct.offsetWidth;pj_ct.style.transition='';pj_ct.classList.remove('nt')}};
const pj_go=d=>{if(pj_ix+d>=4*pj_N||pj_ix+d<pj_N){pj_ix+=(pj_ix+d>=4*pj_N?-1:1)*pj_N;pj_place(false)}pj_ix+=d;pj_place(true)};
const pj_play=()=>{clearInterval(pj_tm);if(!RM)pj_tm=setInterval(()=>pj_go(1),3200)},pj_halt=()=>clearInterval(pj_tm);
$('#cn').onclick=()=>{pj_go(1);pj_play()};$('#cp').onclick=()=>{pj_go(-1);pj_play()};
pj_cr.addEventListener('mouseenter',pj_halt);pj_cr.addEventListener('mouseleave',pj_play);pj_cr.addEventListener('focusin',pj_halt);pj_cr.addEventListener('focusout',pj_play);
pj_cr.addEventListener('pointerdown',e=>pj_sx=e.clientX);pj_cr.addEventListener('pointerup',e=>{const d=e.clientX-sx;if(Math.abs(d)>50){pj_go(d<0?1:-1);pj_play()}});
pj_cds.forEach((c,i)=>c.addEventListener('click',e=>{if(i!==pj_ix&&!e.target.closest('.vw')){pj_go(i-ix);pj_play()}}));
new IntersectionObserver(([e])=>e.isIntersecting?pj_play():pj_halt(),{threshold:.3}).observe(pj_cr);
addEventListener('resize',()=>pj_place(false));pj_place(false);
/* FAQ accordion with filters */
const FQ=[['services','calendar','How long does a website take?','Most projects take 7–14 days with standard delivery, or 3–5 days with express delivery, depending on the size of the project.'],['services','bag','Do you build WordPress and Shopify websites?','Yes. I build custom WordPress sites, Shopify stores and hand-coded HTML, CSS and JavaScript websites.'],['services','phone','Will my website work on mobile?','Every website I build is mobile-first and tested on phones, tablets and desktops.'],['services','wrench','Can you fix or redesign my existing website?','Yes. I can speed up a slow site, fix bugs, or redesign it while keeping your content.'],['pricing','star','How much does a website cost?','The price depends on the number of pages and features. My sample plans start from $149, or message me for a custom quote.'],['pricing','zap','Do you offer express delivery?','Yes. Express delivery takes 3–5 days and costs a little more. You can switch between standard and express in the pricing section.'],['support','chat','How do we get started?','Message me on WhatsApp or fill in the contact form. I’ll reply with a plan and a quote.'],['support','check','Do you offer support after delivery?','Yes. Free fixes are included after launch, and the length depends on the plan you choose.']];
const fql=$('#fql');
fql.innerHTML=FQ.map((f,i)=>`<div class="fi rv" data-c="${f[0]}" style="--i:${i%3}"><h3><button type="button" id="fb${i}" aria-expanded="false" aria-controls="fa${i}"><span class="fic">${I(f[1])}</span><span class="fqt">${f[2]}</span><span class="fpl"></span></button></h3><div class="fa" id="fa${i}" role="region" aria-labelledby="fb${i}"><div><p>${f[3]}</p></div></div></div>`).join('');
$$('.rv',fql).forEach(el=>io.observe(el));
const fqo=(it,o)=>{it.classList.toggle('open',o);$('button',it).setAttribute('aria-expanded',o)};
fql.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const it=b.closest('.fi'),o=!it.classList.contains('open');$$('.fi.open',fql).forEach(x=>fqo(x,false));fqo(it,o)});
fqo($('.fi',fql),true);
let fqf='all',fqq='';const fqth=$('.sth',$('#fqc'));
const fqMove=()=>{const b=$('#fqc button[aria-pressed=true]');fqth.style.width=b.offsetWidth+'px';fqth.style.transform=`translateX(${b.offsetLeft}px)`};
const fqApply=()=>{let n=0;$$('.fi',fql).forEach((c,i)=>{const t=(FQ[i][2]+' '+FQ[i][3]).toLowerCase(),ok=(fqf==='all'||c.dataset.c===fqf)&&t.includes(fqq);if(ok){n++;if(c.hidden){c.hidden=false;c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}}else c.hidden=true});$('#fqe').hidden=n>0};
$$('#fqc button').forEach(b=>{$('em',b).textContent=b.dataset.f==='all'?FQ.length:FQ.filter(f=>f[0]===b.dataset.f).length;b.onclick=()=>{fqf=b.dataset.f;$$('#fqc button').forEach(x=>x.setAttribute('aria-pressed',x===b));fqMove();fqApply()}});
$('#fqs').addEventListener('input',e=>{fqq=e.target.value.trim().toLowerCase();fqApply()});
fqMove();addEventListener('resize',fqMove);if(document.fonts)document.fonts.ready.then(fqMove);
/* text slide-in: words rest faint, then slide into place and turn bold once their line scrolls into view; the animation always finishes */
if(!RM){
const tyT=$$('section h2,.hd p,.ab .rv>p,.fqi>p,.cside>p,.cb p').filter(e=>!e.children.length&&e.textContent.trim());
tyT.forEach(el=>{const txt=el.textContent.trim(),words=txt.split(' '),vis=document.createElement('span'),sr=document.createElement('span'),gap=Math.min(45,1100/words.length),base=el.tagName==='H2'?0:250;
sr.className='sr';sr.textContent=txt;vis.setAttribute('aria-hidden','true');
words.forEach((w,i)=>{const ws=document.createElement('span');ws.className='tw';ws.textContent=w;ws.style.setProperty('--d',Math.round(base+i*gap)+'ms');vis.appendChild(ws);if(i<words.length-1)vis.appendChild(document.createTextNode(' '))});
el.textContent='';el.append(sr,vis)});
const tyIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){tyIO.unobserve(e.target);$$('.tw',e.target).forEach(w=>w.classList.add('on'))}}),{rootMargin:'0px 0px -8% 0px',threshold:.1});
tyT.forEach(el=>{if(el.getBoundingClientRect().bottom<0)$$('.tw',el).forEach(w=>{w.style.transition='none';w.classList.add('on')});else tyIO.observe(el)});
}
/* 12 contact form: sends the message to your Gmail inbox through FormSubmit (formsubmit.co).
   "Sent" is shown only when the service confirms it. The very first message triggers a one-time activation email from FormSubmit in your Gmail: click the link inside it once. */
const f=$('#f'),sd=$('#send'),ms=$('#msg'),ta=$('textarea',f),cc=$('.cc',f),cm=$('#cm');cm.textContent=CFG.email;cm.href='mailto:'+CFG.email;
const st=(s,t,n)=>{sd.dataset.s=s;sd.disabled=s==='load';ms.textContent=t||'';if(n)ms.append(' ',n);ms.style.color=s==='err'?'var(--er)':'var(--ok)';
sd.innerHTML={idle:I('send')+' Send message',load:'<span class="sp"></span> Sending…',ok:'<svg class="ck" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg> Message sent',err:I('x')+' Try again'}[s]};
const fx=$$('.fld input,.fld textarea',f);
ta.addEventListener('input',()=>cc.textContent=ta.value.length+' / 600');
fx.forEach(x=>x.addEventListener('input',()=>{x.parentNode.classList.remove('bad');if(sd.dataset.s==='err')st('idle')}));
f.addEventListener('submit',async e=>{e.preventDefault();$$('.fld',f).forEach(d=>d.classList.remove('bad'));
const bad=fx.filter(x=>!x.value.trim()||!x.checkValidity());
if(bad.length){bad.forEach(x=>x.parentNode.classList.add('bad'));bad[0].focus();st('err','Please check the highlighted fields.');return}
st('load');const d=new FormData(f),o={name:d.get('n'),email:d.get('e'),project_type:d.get('t'),message:d.get('m'),_subject:`New ${d.get('t')} inquiry from ${d.get('n')}`,_template:'table',_captcha:'false'};
try{const r=await fetch('https://formsubmit.co/ajax/'+CFG.email,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(o)}),j=await r.json();
if(r.ok&&(j.success===true||j.success==='true')){f.reset();cc.textContent='0 / 600';st('ok','Thank you! Your message was sent. I’ll reply to you soon.');setTimeout(()=>st('idle'),6000)}else throw new Error(j.message||'send failed')}
catch(x){const a=document.createElement('a');a.href=`mailto:${CFG.email}?subject=${encodeURIComponent(o._subject)}&body=${encodeURIComponent(o.message+'\n\n'+o.name+' ('+o.email+')')}`;a.textContent='Send it from your email app instead';a.style.textDecoration='underline';st('err','Sorry, the message could not be sent right now.',a)}});
st('idle');
const sp=$('#sp');let sq=false;addEventListener('scroll',()=>{if(!sq){sq=true;requestAnimationFrame(()=>{sq=false;sp.style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`})}},{passive:true});
})();

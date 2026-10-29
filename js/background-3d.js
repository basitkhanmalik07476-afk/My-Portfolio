/* 3D background: soft glowing particle network (nodes drift, nearby nodes connect). Gentle mouse and scroll parallax. */
addEventListener('DOMContentLoaded',()=>{
if(typeof THREE==='undefined')return;
const cv=document.getElementById('bg3d'),RM=matchMedia('(prefers-reduced-motion: reduce)').matches,mob=innerWidth<700;
let r;try{r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!mob})}catch(e){return}
r.setPixelRatio(Math.min(devicePixelRatio,1.5));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,200),g=new THREE.Group(),root=document.documentElement,cs=getComputedStyle(root);
cam.position.z=40;sc.add(g);
const N=mob?38:80,D=mob?15:17,D2=D*D,pos=new Float32Array(N*3),vel=new Float32Array(N*3);let BX=45;const BY=28,BZ=20;
for(let i=0;i<N;i++){pos[i*3]=(Math.random()*2-1)*BX;pos[i*3+1]=(Math.random()*2-1)*BY;pos[i*3+2]=(Math.random()*2-1)*BZ;for(let k=0;k<3;k++)vel[i*3+k]=(Math.random()-.5)*.8}
const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.25,'rgba(255,255,255,.55)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const pm=new THREE.PointsMaterial({size:1.1,map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}),pts=new THREE.Points(pg,pm);
const lp=new Float32Array(N*(N-1)*3),lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(lp,3));
const lm=new THREE.LineBasicMaterial({transparent:true,depthWrite:false}),ln=new THREE.LineSegments(lg,lm);
pts.frustumCulled=ln.frustumCulled=false;g.add(pts,ln);
const col=()=>{try{const P=cs.getPropertyValue('--p').trim(),A=cs.getPropertyValue('--a').trim(),d=cs.colorScheme==='dark',b=d?THREE.AdditiveBlending:THREE.NormalBlending;
pm.color.set(d?A:P);lm.color.set(d?A:P);pm.opacity=d?.9:.6;lm.opacity=d?.2:.18;pm.blending=lm.blending=b;pm.needsUpdate=lm.needsUpdate=true}catch(e){}};
const size=()=>{const w=innerWidth,h=innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();BX=45*Math.min(1,cam.aspect/1.7)};
let tx=0,ty=0,mx=0,my=0,sy=0,id=0,last=0;
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
const tick=t=>{const dt=Math.min((t-last)/1000||0,.05);last=t;
for(let i=0;i<N;i++){const a=i*3;pos[a]+=vel[a]*dt;pos[a+1]+=vel[a+1]*dt;pos[a+2]+=vel[a+2]*dt;
if(Math.abs(pos[a])>BX)vel[a]*=-1;if(Math.abs(pos[a+1])>BY)vel[a+1]*=-1;if(Math.abs(pos[a+2])>BZ)vel[a+2]*=-1}
let k=0;for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=i*3,b=j*3,dx=pos[a]-pos[b],dy=pos[a+1]-pos[b+1],dz=pos[a+2]-pos[b+2];
if(dx*dx+dy*dy+dz*dz<D2){lp[k++]=pos[a];lp[k++]=pos[a+1];lp[k++]=pos[a+2];lp[k++]=pos[b];lp[k++]=pos[b+1];lp[k++]=pos[b+2]}}
lg.setDrawRange(0,k/3);lg.attributes.position.needsUpdate=true;pg.attributes.position.needsUpdate=true;
mx+=(tx-mx)*.04;my+=(ty-my)*.04;sy+=(scrollY-sy)*.06;
g.rotation.y=mx*.14+Math.sin(sy*.0007)*.25;g.rotation.x=my*.09;g.position.y=Math.min(sy,3000)*.004;r.render(sc,cam)};
const loop=t=>{tick(t);id=requestAnimationFrame(loop)};
const go=()=>{if(!id&&!document.hidden&&!RM){last=performance.now();id=requestAnimationFrame(loop)}},stop=()=>{cancelAnimationFrame(id);id=0};
size();col();tick(0);go();
addEventListener('resize',()=>{size();if(RM)tick(0)});
document.addEventListener('visibilitychange',()=>document.hidden?stop():go());
new MutationObserver(col).observe(root,{attributes:true,attributeFilter:['data-theme']});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',col);
});

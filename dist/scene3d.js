const $=id=>document.getElementById(id);
import * as THREE from './assets/three.module.js';
import {addCityLandmark} from './landmarks.js';
export function makeCity3D(city='paris',panelId=city){const canvas=$(panelId+'-canvas');let renderer;try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});}catch(error){$(panelId+'-fallback').hidden=false;console.warn('WebGL unavailable',error);return null;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,1,.1,120);camera.position.set(17,13.5,23);camera.lookAt(0,3,0);scene.fog=new THREE.Fog('#dedfcd',30,75);
const hemi=new THREE.HemisphereLight('#fff5dd','#687c68',2.2);scene.add(hemi);const sun=new THREE.DirectionalLight('#ffddad',3);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-16,right:16,top:16,bottom:-16,near:1,far:90});sun.shadow.bias=-.0005;sun.shadow.normalBias=.04;scene.add(sun);scene.add(sun.target);
const moon=new THREE.DirectionalLight('#a5bbef',.12);moon.position.set(-10,15,8);scene.add(moon);
const root=new THREE.Group();scene.add(root);const dryCity=['riyadh','mexicocity'].includes(city),desertCity=city==='riyadh';
const material=(color,roughness=.95)=>new THREE.MeshStandardMaterial({color,roughness,metalness:0});
const limestone=material('#d5c3a0'),roofMat=material('#657178'),pathMat=material('#d8c8a6'),grassMat=material('#a8b088'),baseMat=material('#c0c7a2'),iron=material('#877356'),trim=material('#9d8a68'),waterMat=new THREE.MeshStandardMaterial({color:'#8bafb0',roughness:.4,metalness:.16}),trunk=material('#8d8163'),leaves=[material('#829566'),material('#9ba879'),material('#6f885e')],windowMat=new THREE.MeshStandardMaterial({color:'#667a7a',emissive:'#ffbc65',emissiveIntensity:0,roughness:.7});
function mesh(geometry,mat,x=0,y=0,z=0,parent=root){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(w,h,d,mat,x,y,z,parent=root){return mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z,parent);}
function beam(a,b,width=.045,mat=iron,parent=root){const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),delta=to.clone().sub(from);const m=mesh(new THREE.CylinderGeometry(width,width,delta.length(),5),mat,0,0,0,parent);m.position.copy(from.add(to).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;}
// A hand-built miniature: no external model or texture dependency.
mesh(new THREE.CylinderGeometry(10.8,10.3,.72,96),baseMat,0,-.42,0);mesh(new THREE.CylinderGeometry(10.65,10.65,.08,96),grassMat,0,-.02,0);
if(desertCity){grassMat.color.set('#c6b78e');baseMat.color.set('#c9b98e');limestone.color.set('#d8c49c');roofMat.color.set('#b49a76');}
box(18,.06,2.25,dryCity?pathMat:waterMat,0,.04,4.1);box(19,.12,.3,pathMat,0,.09,2.78);box(18,.12,.3,pathMat,0,.09,5.4);box(3.2,.035,10,pathMat,-1,.08,-1.25);
const tower=new THREE.Group();tower.position.set(-1,.1,-1.1);root.add(tower);
if(city==='paris'){
const heights=[0,1.25,2.65,3.1,4.7,5.1,7.2,8.75,9.35],radii=[2.05,1.38,.92,.86,.48,.43,.22,.14,.12];
for(const sx of [-1,1])for(const sz of [-1,1]){for(let i=0;i<heights.length-1;i++){const a=[sx*radii[i],heights[i],sz*radii[i]],b=[sx*radii[i+1],heights[i+1],sz*radii[i+1]];beam(a,b,i<2?.09:.055,iron,tower);}
box(.65,.25,.65,limestone,sx*2.05,.05,sz*2.05,tower);}
for(let i=0;i<heights.length-1;i++){const y0=heights[i],y1=heights[i+1],r0=radii[i],r1=radii[i+1];for(let face=0;face<4;face++){const side=(r,y,k)=>face===0?[k*r,y,r]:face===1?[r,y,k*r]:face===2?[k*r,y,-r]:[-r,y,k*r];beam(side(r0,y0,-1),side(r1,y1,1),.027,trim,tower);beam(side(r0,y0,1),side(r1,y1,-1),.027,trim,tower);beam(side(r1,y1,-1),side(r1,y1,1),.035,iron,tower);}}
for(const [y,size]of [[2.85,2.25],[4.9,1.3],[8.75,.66]]){box(size,.16,size,iron,0,y,0,tower);for(const sign of [-1,1]){beam([-size/2,y+.28,sign*size/2],[size/2,y+.28,sign*size/2],.025,iron,tower);beam([sign*size/2,y+.28,-size/2],[sign*size/2,y+.28,size/2],.025,iron,tower);}for(let i=-3;i<=3;i++){const q=i*size/6;for(const sign of [-1,1]){beam([q,y,sign*size/2],[q,y+.28,sign*size/2],.018,iron,tower);beam([sign*size/2,y,q],[sign*size/2,y+.28,q],.018,iron,tower);}}}
beam([0,9.2,0],[0,10.1,0],.022,iron,tower);
// The four curved arches create the characteristic opening below the first floor.
for(let face=0;face<4;face++){let prev;for(let i=0;i<=16;i++){const x=-1.9+i*3.8/16,y=.4+1.85*Math.sqrt(Math.max(0,1-(x/1.9)**2));const p=face===0?[x,y,1.7]:face===1?[1.7,y,x]:face===2?[x,y,-1.7]:[-1.7,y,x];if(prev)beam(prev,p,.07,iron,tower);prev=p;}}
}
else if(city==='taipei') {
 const jade=material('#638d83'),edge=material('#96b0a1');
 box(2.2,.55,2.2,jade,0,.3,0,tower);
 box(1.7,.8,1.7,jade,0,.9,0,tower);
 for(let level=0;level<8;level++){
   const bottom=1.3+level*.84,top=bottom+.78;
   const a=.73-level*.045,b=a*.83;
   mesh(new THREE.CylinderGeometry(a,b,.78,4),jade,0,bottom+.39,0,tower).rotation.y=Math.PI/4;
   box(a*1.44,.065,a*1.44,edge,0,top,0,tower);
   for(const sign of [-1,1])for(let j=-2;j<=2;j++){
     box(.045,.42,.02,windowMat,j*.17,bottom+.4,sign*a*.66,tower);
     box(.02,.42,.045,windowMat,sign*a*.66,bottom+.4,j*.17,tower);
   }
 }
 box(.43,.8,.43,jade,0,8.35,0,tower);
 beam([0,8.7,0],[0,10,0],.025,edge,tower);
}
const landmark=city==='paris'||city==='taipei'?null:addCityLandmark(city,{tower,mesh,box,beam,material,limestone,roofMat,windowMat,iron,trim,waterMat});
const towerGlow=new THREE.PointLight('#ffc36c',0,16,2);towerGlow.position.set(0,4,0);tower.add(towerGlow);
function building(x,z,w,d,h,color){const group=new THREE.Group();group.position.set(x,.1,z);root.add(group);const walls=material(color);box(w,h,d,walls,0,h/2,0,group);box(w+.12,.13,d+.12,limestone,0,h-.15,0,group);const roof=mesh(['paris','munich','london'].includes(city)?new THREE.CylinderGeometry(.68,1,h*.23,4):new THREE.BoxGeometry(1,.15,1),roofMat,0,h+h*.105,0,group);roof.rotation.y=Math.PI/4;roof.scale.set(w*.85,1,d*.85);box(.18,.45,.18,limestone,w*.25,h+h*.3,-d*.2,group);for(let floor=.5;floor<h-.22;floor+=.55){for(let xx=-w/2+.25;xx<w/2-.1;xx+=.46){box(.17,.29,.018,windowMat,xx,floor,d/2+.012,group);box(.2,.035,.07,limestone,xx,floor-.18,d/2+.03,group);}for(let zz=-d/2+.3;zz<d/2-.1;zz+=.45)box(.018,.27,.16,windowMat,w/2+.012,floor,zz,group);}return group;}
building(-5.7,-4.1,2.7,1.55,2.75,'#e5d9bc');building(-2.4,-6.1,2.55,1.6,2.35,'#d8c9aa');building(.6,-6.6,2.4,1.6,3.05,'#dbd1bc');building(3.5,-5.6,2.2,1.9,2.65,'#e3d5ba');building(5.7,-3.3,1.9,1.7,2.9,'#d8c4a5');building(7,-.5,1.6,1.8,2.4,'#e2cbb1');building(-7.1,-.6,1.7,2.1,2.4,'#d7c9ac');
function tree(x,z,size=1){const g=new THREE.Group();g.position.set(x,.1,z);root.add(g);mesh(new THREE.CylinderGeometry(.045,.08,.9*size,6),trunk,0,.45*size,0,g);mesh(new THREE.SphereGeometry(.5*size,7,6),leaves[Math.abs(Math.round(x+z))%3],0,1.15*size,0,g).scale.set(.85,1.3,.85);}
for(let i=0;i<9;i++){tree(-7.4+i*1.8,2.05,.65+(i%3)*.12);tree(-7.4+i*1.8,6.1,.75+(i%3)*.1);}for(const [x,z]of [[-4,-2],[-4.5,0],[2,-3],[3,0],[-5.6,-2],[4.5,1],[-6,6.8],[1,7]])tree(x,z,.9);
// A stone footbridge spans the river, with open railings.
if(!dryCity){box(1.15,.24,3.1,limestone,3.2,.58,4.1);for(const x of [2.67,3.73]){beam([x,.96,2.55],[x,.96,5.65],.035,trim);for(let z=2.6;z<=5.65;z+=.3)beam([x,.65,z],[x,.96,z],.025,trim);}for(const z of [3.15,5.05])box(.7,.65,.22,limestone,3.2,.25,z);}
const boat=new THREE.Group();boat.position.set(-4,.22,4.1);root.add(boat);boat.visible=!dryCity;box(1.25,.16,.43,material('#f3e9cc'),0,0,0,boat);box(.67,.23,.32,roofMat,0,.18,0,boat);box(.46,.08,.36,limestone,0,.34,0,boat);
const ripples=[];for(let i=0;i<22;i++){const ripple=box(.3+(i%4)*.15,.012,.018,material('#c7d6cb'),-8+(i*2.37)%16,.085,3.25+(i*.43)%1.7);ripple.castShadow=false;ripple.visible=!dryCity;ripples.push(ripple);}
const lampMat=new THREE.MeshStandardMaterial({color:'#eee5be',emissive:'#ffca72',emissiveIntensity:0});for(const x of [-6,-3,0,6]){beam([x,.12,2.8],[x,1.04,2.8],.025,iron);mesh(new THREE.SphereGeometry(.09,8,6),lampMat,x,1.08,2.8);}
const starsGeo=new THREE.BufferGeometry();const starPositions=[];let seed=74;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};for(let i=0;i<110;i++)starPositions.push((random()-.5)*65,12+random()*20,-16-random()*20);starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));const starMat=new THREE.PointsMaterial({color:'#f8f1d2',size:.07,transparent:true,opacity:0});scene.add(new THREE.Points(starsGeo,starMat));
let visible=true,disposed=false;
function render(){if(visible&&!disposed)renderer.render(scene,camera);}
const resize=()=>{if(disposed)return;const rect=canvas.parentElement.getBoundingClientRect();const width=Math.max(1,rect.width),height=Math.max(1,rect.height);renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.set(17,13.5,23);camera.position.multiplyScalar(width/height<1.2?1.17:1);camera.lookAt(0,3,0);camera.updateProjectionMatrix();render();};const observer=new ResizeObserver(resize);observer.observe(canvas.parentElement);resize();
return {render,setVisible:v=>{visible=v;},dispose(){if(disposed)return;disposed=true;visible=false;observer.disconnect();const geometries=new Set(),materials=new Set();scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material)for(const mat of Array.isArray(object.material)?object.material:[object.material])materials.add(mat);});for(const geometry of geometries)geometry.dispose();for(const mat of materials){for(const value of Object.values(mat))if(value?.isTexture)value.dispose();mat.dispose();}sun.shadow.map?.dispose();sun.shadow.mapPass?.dispose();renderer.dispose();},light(date,{sun:position,day,gold}){if(disposed)return;landmark?.update(date);const alt=THREE.MathUtils.degToRad(position.altitude),az=THREE.MathUtils.degToRad(position.azimuth);sun.position.set(30*Math.cos(alt)*Math.sin(az),30*Math.sin(alt),-30*Math.cos(alt)*Math.cos(az));sun.intensity=day*(2.3+gold*.7);sun.color.set(gold>.4?'#ffcc93':'#fff1d4');hemi.intensity=.35+day*1.85;moon.intensity=.25*(1-day);const sky=new THREE.Color('#303f59').lerp(new THREE.Color('#e1dfcb'),day);sky.lerp(new THREE.Color('#dcc3ad'),gold*.18*day);scene.background=sky;scene.fog.color.copy(sky);windowMat.emissiveIntensity=(1-day)*1.1;lampMat.emissiveIntensity=(1-day)*2;towerGlow.intensity=(1-day)*12;iron.emissive=new THREE.Color('#ac783c');iron.emissiveIntensity=(1-day)*.28;starMat.opacity=(1-day)*.65;render();},animate(t){if(!visible||disposed)return;boat.position.x=-4+Math.sin(t*.025)*2.4;ripples.forEach((r,i)=>r.scale.x=.8+Math.sin(t*.3+i)*.2);render();}};
}

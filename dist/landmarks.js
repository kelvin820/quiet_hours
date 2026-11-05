import * as THREE from './assets/three.module.js';
import {addWorldLandmark} from './landmarks-world.js';

// Procedural postcard miniatures: city silhouettes are intentionally stylized.
export function addCityLandmark(city,kit){
 const {tower,mesh,box,beam,material,limestone,roofMat,windowMat,iron,trim,waterMat}=kit;
 const clocks=[];
 const stone=material(city==='barcelona'?'#c6ad82':'#d6c9a9');
 const patina=material('#708e7d'),red=material('#ad6f53'),silver=material('#9baba8');
 function clockFace(x,y,z,radius,zone){
  const group=new THREE.Group();group.position.set(x,y,z);tower.add(group);
  const face=mesh(new THREE.CylinderGeometry(radius,radius,.055,32),material('#f2e7c5'),0,0,0,group);face.rotation.x=Math.PI/2;
  for(let i=0;i<12;i++){const a=i*Math.PI/6;const tick=box(.035,.09,.025,iron,Math.sin(a)*radius*.8,Math.cos(a)*radius*.8,.045,group);tick.rotation.z=-a;}
  const hour=new THREE.Group(),minute=new THREE.Group();group.add(hour,minute);
  beam([0,0,.07],[0,radius*.46,.07],.022,iron,hour);beam([0,0,.075],[0,radius*.69,.075],.014,iron,minute);
  mesh(new THREE.SphereGeometry(.035,8,6),trim,0,0,.08,group);
  clocks.push({hour,minute,zone});
 }
 function litFacade(x,z,w,h,d,mat=stone,parent=tower){
  box(w,h,d,mat,x,h/2,z,parent);
  for(let y=.55;y<h-.15;y+=.55)for(let xx=x-w/2+.2;xx<x+w/2-.1;xx+=.4)box(.12,.22,.025,windowMat,xx,y,z+d/2+.02,parent);
 }
 function spire(x,z,height,radius=.4,mat=stone){
  mesh(new THREE.CylinderGeometry(radius*.34,radius,height,9),mat,x,height/2,z,tower);
  for(let y=height*.2;y<height*.92;y+=.65){const r=radius*(1-.66*y/height);mesh(new THREE.CylinderGeometry(r*1.14,r*1.14,.07,9),limestone,x,y,z,tower);box(.075,.24,.035,windowMat,x,y-.16,z+r+.015,tower);}
  mesh(new THREE.ConeGeometry(radius*.42,.65,9),mat,x,height+.3,z,tower);
 }
 if(city==='sanfrancisco'){
  // Golden Gate: two towers, a horizontal deck, parabolic main cables and hangers.
  box(10,.055,4.3,waterMat,0,.04,.3,tower);
  box(10,.24,.72,red,0,2.15,.3,tower);
  box(10,.025,.035,limestone,0,2.285,.3,tower);
  for(const x of [-3.05,3.05]){
   for(const z of [-.12,.72]){box(.24,6.2,.24,red,x,3.1,z,tower);box(.48,.4,.48,limestone,x,.2,z,tower);}
   for(const y of [2.7,4.1,5.6])box(.25,.15,1.05,red,x,y,.3,tower);
   box(.62,.18,1.12,red,x,6.2,.3,tower);
  }
  for(const z of [-.18,.78]){
   let previous=null;
   for(let i=0;i<=40;i++){
    const x=-5+i*.25;
    const y=Math.abs(x)<=3.05?3.05+3.15*(x/3.05)**2:6.2-(Math.abs(x)-3.05)*2;
    const point=[x,y,z];if(previous)beam(previous,point,.035,red,tower);previous=point;
    if(i%2===0&&y>2.3)beam([x,2.3,z],point,.018,red,tower);
   }
  }
  for(let x=-4.5;x<=4.5;x+=.6)box(.22,.045,.035,limestone,x,2.31,.3,tower);
  const fog=material('#d8e1d0');
  for(const [x,z,w]of [[-4,-2,2.8],[3,-1.9,3]])mesh(new THREE.SphereGeometry(1,12,8),fog,x,.45,z,tower).scale.set(w,.28,.85);
 }
 else if(city==='munich'){
  litFacade(0,.15,5.7,2.7,1.55);
  const roof=mesh(new THREE.ConeGeometry(1,1.05,4),roofMat,0,3.15,.15,tower);roof.rotation.y=Math.PI/4;roof.scale.set(4.2,1,1.45);
  litFacade(0,.02,1.12,6.7,1.12);
  for(const y of [3.5,4.1,5.2,6.5])box(1.45,.13,1.45,limestone,0,y,.02,tower);
  mesh(new THREE.ConeGeometry(.86,1.6,4),patina,0,7.45,.02,tower).rotation.y=Math.PI/4;
  beam([0,8.2,.02],[0,8.75,.02],.025,trim,tower);
  clockFace(0,5.72,.61,.38,'Europe/Berlin');
  for(const x of [-2.38,2.38]){box(.52,3.35,.65,stone,x,1.675,.22,tower);mesh(new THREE.ConeGeometry(.43,1,4),patina,x,3.85,.22,tower).rotation.y=Math.PI/4;}
  for(const x of [-3.1,-1.7]){
   litFacade(x,-2.7,.82,4.8,.85,material('#e0d4b9'));
   mesh(new THREE.SphereGeometry(.43,12,10),patina,x,4.98,-2.7,tower).scale.set(1,1.2,1);
   mesh(new THREE.ConeGeometry(.2,.48,10),patina,x,5.43,-2.7,tower);
  }
 }
 else if(city==='london'){
  litFacade(-1.7,0,1.25,6.8,1.25,material('#c5b28b'));
  for(const y of [1.2,2.2,3.2,4.2,5.3,6.65])box(1.4,.1,1.4,limestone,-1.7,y,0,tower);
  box(1.53,1.4,1.53,stone,-1.7,6.65,0,tower);
  clockFace(-1.7,6.65,.8,.51,'Europe/London');
  mesh(new THREE.ConeGeometry(1.13,1.75,4),patina,-1.7,8.15,0,tower).rotation.y=Math.PI/4;
  beam([-1.7,9.03,0],[-1.7,9.7,0],.035,trim,tower);
  for(const x of [-2.25,-1.15])for(const z of [-.55,.55])mesh(new THREE.ConeGeometry(.17,.6,6),stone,x,7.7,z,tower);
  const wheel=new THREE.Group();wheel.position.set(2.5,3.65,-1);tower.add(wheel);
  mesh(new THREE.TorusGeometry(2.85,.055,8,96),silver,0,0,0,wheel);
  for(let i=0;i<24;i++){const a=i*Math.PI/12,x=Math.cos(a)*2.85,y=Math.sin(a)*2.85;if(i%3===0)beam([0,0,0],[x,y,0],.018,silver,wheel);mesh(new THREE.SphereGeometry(.16,8,6),material('#dce5da'),x,y,0,wheel).scale.set(1.3,.85,1);}
  beam([.7,0,.05],[2.5,3.65,-1],.085,silver,tower);beam([4.1,0,.05],[2.5,3.65,-1],.085,silver,tower);
  mesh(new THREE.SphereGeometry(.14,10,8),silver,0,0,.02,wheel);
  box(1.1,.46,.42,material('#a96958'),2.2,.27,2.1,tower);box(.95,.11,.45,material('#ad7665'),2.2,.54,2.1,tower);
  for(let x=1.85;x<2.6;x+=.2)box(.12,.13,.02,windowMat,x,.36,2.33,tower);
 }
 else if(city==='barcelona'){
  box(4.2,1.5,2.8,stone,0,.75,0,tower);
  mesh(new THREE.ConeGeometry(2.2,2.3,4),stone,0,2.5,0,tower).rotation.y=Math.PI/4;
  for(const [x,z,h,r]of [[-1.5,.75,5.9,.42],[-.55,.85,7,.43],[.55,.85,7,.43],[1.5,.75,5.9,.42],[-1.2,-.85,6.5,.4],[1.2,-.85,6.5,.4],[0,-.4,8.5,.56]]){
   spire(x,z,h,r);
   mesh(new THREE.SphereGeometry(.15,8,6),material(x<0?'#af9b64':'#8eaa83'),x,h+.6,z,tower);
  }
  beam([0,9.05,-.4],[0,9.75,-.4],.055,limestone,tower);beam([-.25,9.5,-.4],[.25,9.5,-.4],.055,limestone,tower);
  for(const x of [-1.5,-.5,.5,1.5]){const arch=mesh(new THREE.TorusGeometry(.3,.07,6,18,Math.PI),trim,x,1.05,1.43,tower);arch.rotation.z=0;beam([x-.3,0,1.43],[x-.3,1.05,1.43],.06,trim,tower);beam([x+.3,0,1.43],[x+.3,1.05,1.43],.06,trim,tower);}
 }
 else if(city==='newyork'){
  const skyline=material('#b7b9aa'),glass=material('#879f9c');
  litFacade(-1,0,2.1,4.5,1.7,skyline);
  litFacade(-1,0,1.6,6.2,1.35,skyline);
  box(1.15,1,1.05,skyline,-1,6.7,0,tower);box(.76,.85,.7,limestone,-1,7.6,0,tower);box(.36,.65,.34,limestone,-1,8.35,0,tower);
  beam([-1,8.65,0],[-1,10.1,0],.035,silver,tower);
  litFacade(1.75,-1.4,1.45,5.2,1.45,glass);
  for(let i=0;i<4;i++){const roof=mesh(new THREE.CylinderGeometry(.09,.77-i*.14,.75,4),silver,1.75,5.5+i*.48,-1.4,tower);roof.rotation.y=Math.PI/4;}
  beam([1.75,7.3,-1.4],[1.75,8.2,-1.4],.025,silver,tower);
  for(const [x,z,w,h]of [[-3.15,-1.1,1.25,4.9],[3.5,0,1.25,4.1],[-2.8,1.4,1.15,3.2],[1.3,1.6,1.2,3.65],[.15,-2.1,1.05,4.5]])litFacade(x,z,w,h,w*.9,x<0?stone:glass);
  box(.75,.06,.3,material('#c5a256'),2,.15,2.35,tower);
 }
 else if(addWorldLandmark(city,kit)){
  // The world collection adds its meshes to the same disposable landmark group.
 }
 else {
  // Search results without a dedicated landmark still receive a neutral city model.
  for(const [x,z,w,h]of [[-2,0,1.5,3.2],[0,-1,1.7,5],[2,.2,1.4,4.1],[.3,1.3,1.3,2.7]])litFacade(x,z,w,h,w*.85,x<0?stone:material('#9dac9b'));
 }
 return {update(date){for(const clock of clocks){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:clock.zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(v=>[v.type,v.value]));clock.hour.rotation.z=-(Number(p.hour)%12+Number(p.minute)/60)*Math.PI/6;clock.minute.rotation.z=-Number(p.minute)*Math.PI/30;}}};
}

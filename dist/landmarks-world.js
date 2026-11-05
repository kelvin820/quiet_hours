import * as THREE from './assets/three.module.js';

// Small architectural postcards, with proportions chosen for the shared camera.
// The parent scene owns lighting, animation and disposal of every attached mesh.
export const worldLandmarkCities=Object.freeze(['sydney','tokyo','dubai','riodejaneiro','cairo','riyadh','bangkok','honolulu','mexicocity']);
export function addWorldLandmark(city,kit){
 if(!worldLandmarkCities.includes(city))return false;
 const {tower,mesh,box,beam,material,limestone,roofMat,windowMat,iron,trim,waterMat}=kit;
 const cream=material('#e4d7b7'),sand=material('#c4ac7d'),green=material('#82956c'),glass=material('#8ca6a5'),white=material('#eee6cf');
 tower.userData.landmark=city;
 function facade(x,z,w,h,d,mat=cream){
  box(w,h,d,mat,x,h/2,z,tower);
  for(let y=.55;y<h-.15;y+=.55)for(let xx=x-w/2+.2;xx<x+w/2-.1;xx+=.4)box(.12,.2,.025,windowMat,xx,y,z+d/2+.02,tower);
 }
 function dome(x,y,z,r,mat=cream){return mesh(new THREE.SphereGeometry(r,20,12,0,Math.PI*2,0,Math.PI/2),mat,x,y,z,tower);}
 function pyramid(x,z,size,height,mat=sand){const p=mesh(new THREE.ConeGeometry(size/Math.SQRT2,height,4),mat,x,height/2,z,tower);p.rotation.y=Math.PI/4;return p;}
 function palm(x,z,height=2.1){
  const crown=[x+.2,height,z];beam([x,0,z],crown,.055,trim,tower);
  for(let i=0;i<7;i++){const a=i*Math.PI*2/7,shape=new THREE.Shape();shape.moveTo(0,0);shape.quadraticCurveTo(.22,.5,0,1.2);shape.quadraticCurveTo(-.17,.4,0,0);const leaf=mesh(new THREE.ShapeGeometry(shape),green,...crown,tower);leaf.material.side=THREE.DoubleSide;leaf.rotation.set(-Math.PI/2+.3,0,a);}
 }
 if(city==='sydney'){
  box(9.8,.07,4,waterMat,0,.03,.5,tower);box(5.7,.32,2.7,sand,-.5,.2,1,tower);
  // Curved ceramic shell silhouettes, rather than pyramidal tent roofs.
  for(const [x,z,scale,angle]of [[-2,1,1,0],[-.65,1,1.25,-.12],[.9,1,1.05,-.25],[-1.2,-.1,.8,.05],[.2,-.1,.95,-.1],[1.4,-.1,.75,-.18]]){
   const shell=new THREE.Shape();shell.moveTo(-.85,0);shell.quadraticCurveTo(-.28,1.6,.65,2.25);shell.quadraticCurveTo(1.01,.85,.92,0);shell.closePath();
   const sail=mesh(new THREE.ExtrudeGeometry(shell,{depth:.55,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:2,steps:1,curveSegments:16}),white,x,.38,z,tower);sail.scale.setScalar(scale);sail.rotation.y=angle;
  }
  box(9,.18,.62,iron,0,2.1,-1.8,tower);
  for(const x of [-4,4]){box(.65,2.9,.95,limestone,x,1.45,-1.8,tower);box(.79,.18,1.05,limestone,x,2.95,-1.8,tower);}
  for(const z of [-2.12,-1.48]){let last;for(let i=0;i<=32;i++){const x=-4+i*.25,y=2.4+2.25*Math.sqrt(Math.max(0,1-x*x/16)),point=[x,y,z];if(last)beam(last,point,.07,iron,tower);if(i%2===0)beam([x,2.2,z],point,.025,iron,tower);last=point;}}
 }
 else if(city==='tokyo'){
  const red=material('#bd7355');
  const heights=[0,1.5,3.4,4.2,5.5,6.6,7.4],radii=[1.7,1.13,.7,.57,.35,.2,.11];
  for(const sx of [-1,1])for(const sz of [-1,1])for(let i=0;i<heights.length-1;i++)beam([-1.7+sx*radii[i],heights[i],sz*radii[i]],[-1.7+sx*radii[i+1],heights[i+1],sz*radii[i+1]],i<2?.065:.045,i%3===1?white:red,tower);
  for(let level=0;level<heights.length-1;level++)for(let face=0;face<4;face++){
   const point=(r,y,k)=>face===0?[-1.7+k*r,y,r]:face===1?[-1.7+r,y,k*r]:face===2?[-1.7+k*r,y,-r]:[-1.7-r,y,k*r];
   beam(point(radii[level],heights[level],-1),point(radii[level+1],heights[level+1],1),.022,red,tower);beam(point(radii[level],heights[level],1),point(radii[level+1],heights[level+1],-1),.022,red,tower);
  }
  for(const [y,w]of [[3.5,1.75],[5.65,.85]]){box(w,.35,w,white,-1.7,y,0,tower);box(w+.08,.07,w+.08,red,-1.7,y+.21,0,tower);for(const x of [-.5,0,.5])box(.18,.16,.025,windowMat,-1.7+x*w,y,.51*w,tower);}
  beam([-1.7,7.4,0],[-1.7,8.6,0],.032,white,tower);
  // The second, slender silhouette is Tokyo Skytree.
  mesh(new THREE.CylinderGeometry(.18,.58,7.7,12),white,2.4,3.85,-1.5,tower);
  for(const [y,r,h]of [[5.9,.73,.35],[6.4,.52,.3],[7.5,.43,.3]]){mesh(new THREE.CylinderGeometry(r,r*.87,h,16),glass,2.4,y,-1.5,tower);mesh(new THREE.CylinderGeometry(r+.07,r+.07,.08,16),white,2.4,y+h/2,-1.5,tower);}
  beam([2.4,7.8,-1.5],[2.4,9.4,-1.5],.035,white,tower);
 }
 else if(city==='dubai'){
  // Burj Khalifa's stepped central spire and three receding wings.
  for(let level=0;level<10;level++){
   const y=level*.82,r=.78-level*.058;
   mesh(new THREE.CylinderGeometry(r*.88,r,.85,12),glass,0,y+.425,0,tower);
   mesh(new THREE.CylinderGeometry(r*1.02,r*1.02,.045,12),white,0,y+.8,0,tower);
  }
  for(let wing=0;wing<3;wing++){const angle=wing*2*Math.PI/3;for(let level=0;level<6-wing;level++){
   const r=.6-level*.055,distance=.8-level*.07,y=level*.82;
   mesh(new THREE.CylinderGeometry(r*.93,r,.83,9),glass,Math.cos(angle)*distance,y+.415,Math.sin(angle)*distance,tower);
  }}
  beam([0,8.15,0],[0,9.9,0],.025,white,tower);
  for(const [x,z,w,h]of [[-2.8,-1,1,4.2],[2.7,-1.2,1.1,4.8],[-2.4,1.5,1.2,2.5],[2,1.5,.8,3.3]]){facade(x,z,w,h,w*.9,glass);box(w*1.1,.07,w,white,x,h,z,tower);}
  for(const x of [-3.8,3.8])palm(x,1.8,1.8);
 }
 else if(city==='riodejaneiro'){
  const rock=material('#8c9a7c');
  mesh(new THREE.SphereGeometry(1,24,16,0,Math.PI*2,0,Math.PI/2),rock,2.8,0,-.5,tower).scale.set(1.55,4.1,1.35);
  mesh(new THREE.SphereGeometry(1,20,14,0,Math.PI*2,0,Math.PI/2),green,-2.1,0,-.6,tower).scale.set(2.15,3.5,1.65);
  // Corcovado's upright robed statue, with level outstretched arms.
  box(.8,.35,.7,limestone,-2.1,3.7,-.6,tower);box(.48,.22,.44,cream,-2.1,3.98,-.6,tower);
  mesh(new THREE.CylinderGeometry(.22,.4,1.65,8),white,-2.1,4.86,-.6,tower);
  mesh(new THREE.SphereGeometry(.23,12,10),white,-2.1,5.94,-.6,tower);
  box(.32,.15,.3,white,-2.1,5.65,-.6,tower);
  beam([-3.25,5.45,-.6],[-.95,5.45,-.6],.13,white,tower);
  for(const x of [-3.35,-.85])mesh(new THREE.SphereGeometry(.13,8,6),white,x,5.45,-.6,tower);
  for(const [x,w,h]of [[-3.8,.7,1.4],[.25,.65,1.8],[1.05,.7,1.2],[4.05,.65,1.4]])facade(x,1.4,w,h,.7,cream);
  palm(-3.4,2.2,1.8);palm(2.9,2.2,1.8);
 }
 else if(city==='cairo'){
  pyramid(-1.5,-.9,4.2,3.1);pyramid(1.65,-1.8,3.1,2.35,material('#cdb788'));pyramid(3.5,-2.1,1.6,1.25);
  facade(.5,1.5,4,1.15,1.3,cream);dome(.5,1.15,1.5,.8,material('#b7b496'));
  for(const x of [-1.45,2.45]){
   mesh(new THREE.CylinderGeometry(.21,.27,4.3,12),cream,x,2.15,1.5,tower);
   for(const y of [2.8,3.6])mesh(new THREE.CylinderGeometry(.37,.32,.12,12),limestone,x,y,1.5,tower);
   mesh(new THREE.ConeGeometry(.29,.8,12),roofMat,x,4.7,1.5,tower);beam([x,5.1,1.5],[x,5.4,1.5],.02,trim,tower);
  }
  palm(-3.5,1.8,1.8);
 }
 else if(city==='riyadh'){
  // A real opening below the skybridge: no opaque box behind the arch.
  const silhouette=new THREE.Shape();silhouette.moveTo(-1.55,0);silhouette.lineTo(1.55,0);silhouette.lineTo(1.55,7.55);silhouette.quadraticCurveTo(1.55,7.9,1.2,8);silhouette.lineTo(-1.2,8);silhouette.quadraticCurveTo(-1.55,7.9,-1.55,7.55);silhouette.closePath();
  const opening=new THREE.Path();opening.moveTo(-1.02,7.5);opening.lineTo(1.02,7.5);opening.lineTo(1.02,6.5);opening.quadraticCurveTo(0,4.15,-1.02,6.5);opening.closePath();silhouette.holes.push(opening);
  mesh(new THREE.ExtrudeGeometry(silhouette,{depth:1.15,bevelEnabled:true,bevelThickness:.05,bevelSize:.05,bevelSegments:2,curveSegments:20}),glass,0,0,-.6,tower);
  box(2.55,.19,1.3,white,0,7.67,0,tower);
  for(let y=.45;y<5.3;y+=.36)box(3.12,.025,.025,white,0,y,.62,tower);
  for(const [x,z,w,h]of [[-3,-1,1,2.7],[2.9,-1.3,1.1,3.9],[-2.6,1.4,.9,1.7],[2.6,1.5,1.1,2.2]])facade(x,z,w,h,w,sand);
  for(const x of [-3.8,-1.9,1.9,3.8])palm(x,2.3,1.65);
 }
 else if(city==='bangkok'){
  const porcelain=material('#d9d7bd'),mosaic=material('#8caa9a');
  function prang(x,z,h,r){
   box(r*2.8,.24,r*2.8,limestone,x,.12,z,tower);
   const levels=6;for(let i=0;i<levels;i++){const radius=r*(1-i*.12),y=.24+i*h/levels;mesh(new THREE.CylinderGeometry(radius*.72,radius,h/levels,8),porcelain,x,y+h/levels/2,z,tower);mesh(new THREE.CylinderGeometry(radius*1.05,radius*1.05,.1,8),mosaic,x,y+.08,z,tower);}
   mesh(new THREE.ConeGeometry(r*.26,h*.28,8),trim,x,h*1.14+.24,z,tower);
  }
  prang(0,-.3,5.8,1.15);for(const [x,z]of [[-2.4,1.2],[2.4,1.2],[-2,-1.9],[2,-1.9]])prang(x,z,2.8,.55);
  box(5.8,.3,3.8,limestone,0,.1,-.3,tower);
  for(let i=0;i<4;i++)box(1.6-i*.15,.13,.36,limestone,0,.12+i*.13,2.2-i*.25,tower);
  for(const x of [-3.5,3.5])palm(x,1.9,1.8);
 }
 else if(city==='honolulu'){
  // An open volcanic crater ridge behind Waikiki's low-rise postcard skyline.
  const ridge=new THREE.MeshStandardMaterial({color:'#899776',roughness:1,side:THREE.DoubleSide});
  const crater=mesh(new THREE.TorusGeometry(2.1,.58,8,40,Math.PI*1.65),ridge,.2,1.2,-1.4,tower);crater.rotation.x=Math.PI/2;crater.scale.set(1.5,1,.68);
  mesh(new THREE.SphereGeometry(1,20,12),green,.2,.45,-1.4,tower).scale.set(3.3,.55,2.1);
  for(const [x,z,w,h]of [[-3.5,.4,1.15,2.6],[-2,1,1,2.1],[2.7,.7,1.3,2.8],[1.3,1.3,1.1,1.6]]){facade(x,z,w,h,.8,cream);box(w+.2,.12,1,white,x,h+.06,z,tower);}
  box(7.9,.07,.8,sand,0,.07,2.3,tower);for(const x of [-3,-.9,.7,3.6])palm(x,2.25,1.9);
 }
 else if(city==='mexicocity'){
  // Palacio de Bellas Artes: pale stone, ribbed ochre dome and broad stairs.
  facade(-1.5,.45,4.8,1.7,2.2,cream);box(2.3,.7,1.8,cream,-1.5,2,.45,tower);
  dome(-1.5,2.35,.45,1.25,material('#bd9763'));
  for(let i=0;i<12;i++){const a=i*Math.PI/6;let previous;for(let j=0;j<=10;j++){const t=j*Math.PI/20,p=[-1.5+1.27*Math.sin(t)*Math.cos(a),2.35+1.27*Math.cos(t),.45+1.27*Math.sin(t)*Math.sin(a)];if(previous)beam(previous,p,.018,trim,tower);previous=p;}}
  mesh(new THREE.SphereGeometry(.15,10,8),trim,-1.5,3.73,.45,tower);
  for(const x of [-3.2,-2.45,-.55,.2]){beam([x,.28,1.6],[x,1.7,1.6],.09,limestone,tower);box(.33,.12,.35,limestone,x,1.72,1.6,tower);}
  for(let i=0;i<3;i++)box(5.1+i*.22,.1,1.2,limestone,-1.5,.1-i*.04,1.65+i*.16,tower);
  facade(2.4,-1,2.6,2.6,1.5,sand);dome(2.4,2.6,-1,.7,cream);
  for(const x of [1.35,3.45]){facade(x,-.7,.64,4.4,.7,sand);mesh(new THREE.CylinderGeometry(.31,.36,.65,8),cream,x,4.72,-.7,tower);mesh(new THREE.ConeGeometry(.31,.55,8),roofMat,x,5.32,-.7,tower);beam([x,5.6,-.7],[x,5.97,-.7],.025,trim,tower);beam([x-.12,5.85,-.7],[x+.12,5.85,-.7],.025,trim,tower);}
 }
 return true;
}

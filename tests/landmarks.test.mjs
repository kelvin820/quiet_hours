import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../dist/assets/three.module.js';
import {addCityLandmark} from '../dist/landmarks.js';

function makeKit(){
 const tower=new THREE.Group(),material=color=>new THREE.MeshStandardMaterial({color});
 function mesh(geometry,mat,x=0,y=0,z=0,parent=tower){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);parent.add(m);return m;}
 function box(w,h,d,mat,x,y,z,parent=tower){return mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z,parent);}
 function beam(a,b,width=.045,mat,parent=tower){const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),delta=to.clone().sub(from),m=mesh(new THREE.CylinderGeometry(width,width,delta.length(),5),mat,0,0,0,parent);m.position.copy(from.add(to).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;}
 return {tower,material,mesh,box,beam,limestone:material('#d5c3a0'),roofMat:material('#657178'),windowMat:material('#667a7a'),iron:material('#877356'),trim:material('#9d8a68'),waterMat:material('#8bafb0')};
}
function clean(tower){const geometries=new Set(),materials=new Set();tower.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}

test('all nine new city landmarks construct finite, camera-sized geometry without a renderer',()=>{
 for(const city of ['sydney','tokyo','dubai','riodejaneiro','cairo','riyadh','bangkok','honolulu','mexicocity']){
  const kit=makeKit(),landmark=addCityLandmark(city,kit);landmark.update(new Date('2026-11-05T12:00:00Z'));
  assert.equal(kit.tower.userData.landmark,city);let meshes=0;
  kit.tower.traverse(o=>{if(o.isMesh){meshes++;assert([...o.geometry.attributes.position.array].every(Number.isFinite),city+' has invalid vertices');}});
  kit.tower.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(kit.tower),size=bounds.getSize(new THREE.Vector3());
  assert(meshes>10,city+' lacks its dedicated model');assert(size.x>1&&size.x<15,city+' exceeds postcard width');assert(size.y>2.5&&size.y<11,city+' exceeds postcard height');assert(bounds.min.y>-.5,city+' extends below the platform');clean(kit.tower);
 }
});
test('Kingdom Centre keeps a genuine opening beneath its skybridge',()=>{
 const kit=makeKit();addCityLandmark('riyadh',kit);kit.tower.updateMatrixWorld(true);
 const ray=new THREE.Raycaster(new THREE.Vector3(0,6.6,5),new THREE.Vector3(0,0,-1));assert.equal(ray.intersectObjects(kit.tower.children,true).length,0);
 ray.set(new THREE.Vector3(0,3,5),new THREE.Vector3(0,0,-1));assert(ray.intersectObjects(kit.tower.children,true).length>0,'tower body should remain solid');clean(kit.tower);
});

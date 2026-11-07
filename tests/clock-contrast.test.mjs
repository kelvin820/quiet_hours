import test from 'node:test';
import assert from 'node:assert/strict';
import {daylightContrast,sampleClockBackground} from '../dist/clock-contrast.js';
test('clock preserves clear night glass and smoothly strengthens bright-scene contrast',()=>{
 assert.equal(daylightContrast(.15),0);assert.equal(daylightContrast(.28),0);
 assert.equal(daylightContrast(.8),1);assert.equal(daylightContrast(1),1);
 let last=0;for(let v=0;v<=1;v+=.01){const next=daylightContrast(v);assert.ok(next>=last);assert.ok(next-last<.05);last=next;}
});
test('empty or unreadable artwork falls back without interrupting the clock',()=>{
 assert.equal(sampleClockBackground(null,null,null),null);
 const canvas={width:100,height:100,getBoundingClientRect:()=>({left:0,top:0,width:100,height:100})};
 const clock={getBoundingClientRect:()=>({left:10,top:10,width:30,height:30})};
 assert.equal(sampleClockBackground(canvas,clock,{getContext(){throw Error('tainted');}}),null);
});

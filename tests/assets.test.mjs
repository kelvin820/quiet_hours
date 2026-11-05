import test from 'node:test';
import assert from 'node:assert/strict';
import {stat,readFile} from 'node:fs/promises';
import {cities,periods,artUrl} from '../dist/catalog.js';
test('all sixteen featured cities have all eight distinct optimized illustration files',async()=>{const urls=new Set();for(const city of Object.keys(cities))for(const period of periods){const url=artUrl(city,period);assert(!urls.has(url));urls.add(url);const file=new URL('../dist/'+url,import.meta.url),info=await stat(file);assert(info.size>10000,`${url} is not a complete artwork`);const data=await readFile(file);assert.equal(data[0],0xff);assert.equal(data[1],0xd8);}assert.equal(urls.size,128);});
test('the new city foliage layers are packaged as PNGs with alpha channels',async()=>{const files=new Set(Object.values(cities).map(c=>c.foliageAsset).filter(Boolean));assert.equal(files.size,5);for(const name of files){const data=await readFile(new URL('../dist/assets/'+name,import.meta.url));assert.equal(data.subarray(1,4).toString(),'PNG');assert.equal(data[25],6,`${name} must carry RGBA transparency`);}});

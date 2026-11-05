import test from 'node:test';
import assert from 'node:assert/strict';
import {stat,readFile} from 'node:fs/promises';
import {cities,periods,artUrl} from '../dist/catalog.js';
test('both prototype cities have all eight distinct optimized illustration files',async()=>{const urls=new Set();for(const city of Object.keys(cities))for(const period of periods){const url=artUrl(city,period);assert(!urls.has(url));urls.add(url);const file=new URL('../dist/'+url,import.meta.url),info=await stat(file);assert(info.size>10000,`${url} is not a complete artwork`);const data=await readFile(file);assert.equal(data[0],0xff);assert.equal(data[1],0xd8);}assert.equal(urls.size,16);});

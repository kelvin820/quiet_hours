import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {AmbientPlayer,tracks} from '../dist/music.js';
function fakeAudio(){return {paused:true,volume:0,src:'',addEventListener(){},getAttribute(){return this.src;},load(){},async play(){this.paused=false;},pause(){this.paused=true;}};}
test('rapid city switches use one media element, preserve volume and pause',async()=>{let created=0;const audio=fakeAudio(),player=new AmbientPlayer(()=>{},()=>{created++;return audio;});player.fade=async target=>{audio.volume=target;};await player.play('paris');assert.equal(audio.src,tracks.paris.url);await Promise.all([player.play('taipei'),player.play('paris')]);assert.equal(created,1);assert.equal(player.city,'paris');assert.equal(audio.src,tracks.paris.url);player.setVolume(.4);assert.equal(audio.volume,.4);await player.pause();assert.equal(audio.paused,true);assert.equal(player.playing,false);});
test('both user-supplied city tracks are packaged and unsupported cities fail clearly',async()=>{for(const track of Object.values(tracks))assert.ok(existsSync(new URL('../dist/'+track.url,import.meta.url)));const player=new AmbientPlayer(()=>{},fakeAudio);await assert.rejects(player.play('unknown'),/尚未提供/);});

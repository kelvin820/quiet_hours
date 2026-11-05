import {resolveLocation} from './locations.js';
export function initialSelection(search='',saved={}){const query=new URLSearchParams(search);return Object.fromEntries(['left','right'].map((side,i)=>[side,resolveLocation(query.get(side))?.id||resolveLocation(saved[side])?.id||['paris','taipei'][i]]));}
export function selectionURL(href,selection){const url=new URL(href);for(const side of ['left','right'])url.searchParams.set(side,selection[side]);return url;}

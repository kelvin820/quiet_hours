export const pad=n=>String(n).padStart(2,'0');
export function parts(date,zone){return Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));}
export function offset(date,zone){const p=parts(date,zone);return Math.round((Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-Math.floor(+date/1000)*1000)/60000);}
export function previewInstant(minute,zone,base=new Date()){const p=parts(base,zone),wall=Date.UTC(p.year,p.month-1,p.day,Math.floor(minute/60),minute%60);let instant=new Date(wall);for(let i=0;i<3;i++)instant=new Date(wall-offset(instant,zone)*60000);return instant;}

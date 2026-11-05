import {worldCityDetails} from './world-city-details.js';
import {locations} from './locations.js';
// City metadata and eight illustrated periods are separate from rendering engines.
export const cities={
 paris:{name:'巴黎',english:'Paris',country:'FRANCE · 法國',zone:'Europe/Paris',lat:48.8584,lon:2.2945,codes:['PAR','CDG','ORY'],artPrefix:'paris',caption:'光，慢慢走過塞納河。',tagline:'A SLOW DAY IN PARIS',live:{name:'earthTV · 艾菲爾鐵塔',url:'https://www.earthtv.com/en/webcam/paris-eiffel-tower',type:'external'},water:{start:.82,left:.03,foreground:false,motion:{phase:1.73,rate:.67375,amplitude:4,band:.037,secondary:.081,drift:3.98125,direction:1}}},
 taipei:{name:'台北',english:'Taipei',country:'TAIWAN · 台灣',zone:'Asia/Taipei',lat:25.033,lon:121.5654,codes:['TPE','TSA'],artPrefix:'taipei',caption:'把日常，留在溫柔的光裡。',tagline:'A SLOW DAY IN TAIPEI',live:{name:'台北旅遊網 · 城市即時影像',url:'https://travel.taipei/4k-livestream/',type:'external'},water:{start:.80,left:.05,foreground:true,motion:{phase:4.91,rate:.459375,amplitude:3.5,band:.058,secondary:.119,drift:2.75625,direction:-1}}}
};
// Editorial eight-period proposal for this prototype, not a claim about the original project.
export const periods=[
 {key:'night',name:'深夜',start:0,end:5,icon:'☾',description:'城市入睡，窗燈與倒影陪著夜色。'},
 {key:'dawn',name:'晨曦',start:5,end:7,icon:'◒',description:'天光初露，薄霧慢慢離開河面。'},
 {key:'breakfast',name:'早晨',start:7,end:9,icon:'☼',description:'清新的晨光，喚醒河畔的日常。'},
 {key:'morning',name:'上午',start:9,end:12,icon:'☀',description:'日光穿過樹葉，城市從容運轉。'},
 {key:'noon',name:'正午',start:12,end:14,icon:'◉',description:'明亮的天空，細碎波光流過水面。'},
 {key:'afternoon',name:'午後',start:14,end:17,icon:'☼',description:'暖光與綠意，留下一段安靜午後。'},
 {key:'sunset',name:'傍晚',start:17,end:19,icon:'◓',description:'暮色染上屋頂，街燈開始亮起。'},
 {key:'evening',name:'夜晚',start:19,end:24,icon:'☽',description:'燈火與水色交會，夜晚緩緩展開。'}
];
export function periodAt(hour){return periods.find(p=>hour>=p.start&&hour<p.end)||periods[0];}
const additions=[
 ['sanfrancisco','USA · 美國','海霧輕輕，越過金門。','ABC7 · 灣區公開攝影機','https://abc7news.com/weather/cams/',.16],
 ['munich','GERMANY · 德國','伊薩爾河，流過巴伐利亞的午後。','慕尼黑旅遊局 · 城市攝影機','https://www.munich.travel/en/webcam',.28],
 ['london','UK · 英國','讓泰晤士河，帶走一點匆忙。','Abbey Road · 路口即時影像','https://www.abbeyroad.com/crossing?mode=live',.33],
 ['barcelona','SPAIN · 西班牙','地中海的光，停在屋頂之間。','Port Olímpic · 港口攝影機','https://portolimpic.barcelona/es/meteo-y-webcams',.12],
 ['newyork','USA · 美國','天際線很高，此刻可以很慢。','EarthCam · 時代廣場','https://www.earthcam.com/usa/newyork/timessquare/',.38]
];
additions.forEach(([id,country,caption,liveName,url,focus],i)=>{cities[id]={...locations[id],country,artPrefix:id,caption,tagline:`A SLOW DAY IN ${locations[id].english.toUpperCase()}`,live:{name:liveName,url,type:'external'},water:{start:id==='newyork'?.84:.85,left:0,foreground:false,focus,motion:{phase:2.4+i*1.39,rate:.47+i*.037,amplitude:3.5,band:.042+i*.005,secondary:.087+i*.009,drift:2.8+i*.17,direction:i%2?-1:1}}};});
Object.entries(worldCityDetails).forEach(([id,details],i)=>{const c=locations[id];cities[id]={...c,...details,artPrefix:id,tagline:'A SLOW DAY IN '+c.english.toUpperCase(),water:{enabled:!details.dry,start:.85,left:0,foreground:false,focus:details.focus,motion:{phase:3.8+i*1.27,rate:.48+(i%5)*.035,amplitude:3.5,band:.041+(i%4)*.007,secondary:.09+(i%3)*.011,drift:2.85+(i%5)*.15,direction:i%2?1:-1}}};});
cities.cairo.water.foreground=true;cities.cairo.water.left=.18;
cities.paris.water.focus=.27;cities.taipei.water.focus=.76;
export function cityInfo(id){const location=locations[id];return cities[id]?{...location,...cities[id]}:{...location,country:location.zone.split('/')[0],caption:'在同一個此刻，留一扇安靜的窗。',tagline:'A QUIET MOMENT',live:null,water:{start:.85,left:0,focus:.5,foreground:false,motion:{phase:3,rate:.5,amplitude:3,band:.05,secondary:.1,drift:3,direction:1}}};}
export function artUrl(city,period){return cities[city]?.artPrefix?`assets/${cities[city].artPrefix}-${period.key}.jpg`:null;}





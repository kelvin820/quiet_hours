// Sample only the painted area behind the clock, not the clock itself.
export function daylightContrast(luminance){
 const t=Math.max(0,Math.min(1,(luminance-.28)/.38));
 return t*t*(3-2*t);
}
export function sampleClockBackground(canvas,clock,sampler){
 if(!canvas?.width||!canvas?.height)return null;
 const image=canvas.getBoundingClientRect(),r=clock.getBoundingClientRect();
 if(!image.width||!image.height)return null;
 const x=Math.max(0,(r.left-image.left)/image.width*canvas.width);
 const y=Math.max(0,(r.top-image.top)/image.height*canvas.height);
 const w=Math.min(canvas.width-x,r.width/image.width*canvas.width);
 const h=Math.min(canvas.height-y,r.height/image.height*canvas.height);
 if(w<=0||h<=0)return null;
 try{
  const ctx=sampler.getContext('2d',{willReadFrequently:true});
  ctx.clearRect(0,0,12,6);ctx.drawImage(canvas,x,y,w,h,0,0,12,6);
  const pixels=ctx.getImageData(0,0,12,6).data;let sum=0,count=0;
  for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<128)continue;sum+=(.2126*pixels[i]+.7152*pixels[i+1]+.0722*pixels[i+2])/255;count++;}
  return count?sum/count:null;
 }catch{return null;} // Unreadable canvases use the sun-position fallback.
}

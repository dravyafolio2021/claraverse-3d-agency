/** Versioned, quantized Natural Earth samples. No polygon scanning on page load. */
export function decodeGlobePoints(buffer:ArrayBuffer,radius=2.364){
 const view=new DataView(buffer);
 if(buffer.byteLength<8||view.getUint32(0,false)!==0x434c5031)throw new Error('Invalid globe point header');
 const count=view.getUint32(4,true);
 if(count===0||count>30000||buffer.byteLength!==8+count*8)throw new Error('Invalid globe point count');
 const positions=new Float32Array(count*3),weights=new Float32Array(count);
 for(let i=0;i<count;i++){const at=8+i*8;for(let axis=0;axis<3;axis++)positions[i*3+axis]=view.getInt16(at+axis*2,true)/32767*radius;weights[i]=view.getUint16(at+6,true)/65535;}
 return{positions,weights,count};
}

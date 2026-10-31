import {NextResponse} from 'next/server';
import {mkdir,appendFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {services,resolveService,findOffering} from '@/lib/services';
export const runtime='nodejs';
export async function POST(request:Request){
 try{
  const text=await request.text();if(text.length>16000)return NextResponse.json({error:'Your brief is too long. Please keep it under 5,000 characters.'},{status:413});
  let data:Record<string,unknown>;try{data=JSON.parse(text);}catch{return NextResponse.json({error:'Please send a valid project brief.'},{status:400});}
  if(!data||typeof data!=='object'||Array.isArray(data))return NextResponse.json({error:'Please send a valid project brief.'},{status:400});
  const field=(name:string)=>typeof data[name]==='string'?(data[name] as string).trim():'';
  if(field('fax'))return NextResponse.json({error:'Please try again without autofilling the hidden field.'},{status:400});
  const name=field('name'),email=field('email'),company=field('company'),website=field('website'),service=resolveService(field('service'))?.slug??field('service'),offering=field('offering'),budget=field('budget'),project=field('project');
  if(!name||name.length>100||!company||company.length>150||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||project.length<20||project.length>5000||field('consent')!=='yes'||![...services.map(x=>x.slug),'explore'].includes(service)||budget.length>100)return NextResponse.json({error:'Please complete your name, email, company, service, project details and consent.'},{status:400});
  if(offering&&!findOffering(resolveService(service),offering))return NextResponse.json({error:'Please choose a specific service within your selected area.'},{status:400});
  if(website){try{const url=new URL(website);if(!['http:','https:'].includes(url.protocol)||website.length>500)throw new Error();}catch{return NextResponse.json({error:'Please enter a complete website address starting with https://.'},{status:400});}}
  const reference=`CV-${randomUUID().slice(0,8).toUpperCase()}`;
  const directory=path.join(process.cwd(),'.data');await mkdir(directory,{recursive:true});
  await appendFile(path.join(directory,'quotes.jsonl'),JSON.stringify({reference,createdAt:new Date().toISOString(),name,email,company,website,service,offering,budget,project,consent:true})+'\n',{encoding:'utf8',mode:0o600});
  return NextResponse.json({reference},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch{ return NextResponse.json({error:'We could not save your brief. Please try again.'},{status:500}); }
}

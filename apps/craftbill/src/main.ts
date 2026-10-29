import {Component,ChangeDetectionStrategy,computed,inject,Injectable,signal,OnInit} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Subject,debounceTime,distinctUntilChanged} from 'rxjs';
import {createClient,SupabaseClient,User} from '@supabase/supabase-js';
import {settings} from './settings';
type Kind='invoice'|'quote';
type Currency='ZAR'|'USD';
type State='draft'|'sent'|'paid'|'accepted';
type Page='home'|'auth'|'workspace';
type View='overview'|'clients'|'invoices'|'quotes'|'editor'|'settings';
type AuthMode='signup'|'login'|'reset'|'update';
interface Contact{id:string;name:string;email:string;phone:string}
interface Item{description:string;quantity:number;unit_price:number}
interface Doc{id:string;kind:Kind;client_id:string|null;number:string;title:string;issue_date:string;due_date:string;currency:Currency;status:State;items:Item[];notes:string}
interface Profile{full_name:string;company_name:string;plan:'free'|'pro'}
const storage='craftbill-public-v1-';
const local=<T>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(storage+key)||'null')??fallback;}catch{return fallback;}};
const store=(key:string,value:unknown)=>{try{localStorage.setItem(storage+key,JSON.stringify(value));}catch{}};
const uid=()=>crypto.randomUUID();
const iso=()=>new Date().toISOString().slice(0,10);
const due=()=>new Date(Date.now()+14*86400000).toISOString().slice(0,10);
const subtotal=(doc:Doc)=>doc.items.reduce((sum,item)=>sum+Number(item.quantity||0)*Number(item.unit_price||0),0);
const money=(value:number,currency:Currency)=>new Intl.NumberFormat('en-ZA',{style:'currency',currency}).format(value);
const makeDoc=(kind:Kind):Doc=>({id:'',kind,client_id:null,number:(kind==='invoice'?'INV':'QUO')+'-'+Date.now().toString().slice(-7),title:'',issue_date:iso(),due_date:due(),currency:'ZAR',status:'draft',items:[{description:'',quantity:1,unit_price:0}],notes:''});
const exampleClients:Contact[]=[{id:'demo-1',name:'Lumina Studio',email:'hello@lumina.example',phone:''},{id:'demo-2',name:'Northstar Digital',email:'accounts@northstar.example',phone:''}];
const exampleDocs:Doc[]=[{...makeDoc('invoice'),id:'demo-invoice-1',client_id:'demo-1',number:'INV-2026-001',title:'Website design',status:'paid',items:[{description:'Website development',quantity:1,unit_price:4800}]},{...makeDoc('invoice'),id:'demo-invoice-2',client_id:'demo-2',number:'INV-2026-002',title:'Monthly content',status:'sent',items:[{description:'Social media content',quantity:1,unit_price:2500}]},{...makeDoc('quote'),id:'demo-quote-1',client_id:'demo-1',number:'QUO-2026-003',title:'Brand refresh proposal',status:'draft',items:[{description:'Brand identity consultation',quantity:1,unit_price:3200}]}];
@Injectable({providedIn:'root'})class Backend{
 readonly configured=!location.hostname.endsWith('github.io')&&!!(settings.supabaseUrl&&settings.supabasePublishableKey);
 readonly client:SupabaseClient|null=this.configured?createClient(settings.supabaseUrl,settings.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
}
@Component({selector:'app-root',standalone:true,imports:[FormsModule,CommonModule],templateUrl:'./view.html',changeDetection:ChangeDetectionStrategy.OnPush})
class CraftBill implements OnInit{
 readonly backend=inject(Backend);
 readonly portfolioDemo=location.hostname.endsWith('github.io');
 readonly page=signal<Page>('home');readonly view=signal<View>('overview');readonly authMode=signal<AuthMode>('signup');
 readonly demo=signal(false);readonly user=signal<User|null>(null);
 readonly clients=signal<Contact[]>([]);readonly docs=signal<Doc[]>([]);
 readonly profile=signal<Profile>({full_name:'Alex Morgan',company_name:'Creative Studio',plan:'free'});
 readonly busy=signal(false);readonly error=signal('');readonly success=signal('');
 readonly editing=signal<Doc>(makeDoc('invoice'));readonly current=signal('');readonly search=signal('');
 readonly searchInput=new Subject<string>();
 readonly invoices=computed(()=>this.docs().filter(d=>d.kind==='invoice'));
 readonly quotes=computed(()=>this.docs().filter(d=>d.kind==='quote'));
 readonly paid=computed(()=>this.invoices().filter(d=>d.status==='paid'));
 readonly outstanding=computed(()=>this.invoices().filter(d=>d.status==='sent'));
 readonly filtered=computed(()=>{const q=this.search().toLowerCase();return(this.view()==='quotes'?this.quotes():this.invoices()).filter(d=>(d.number+d.title+this.clientName(d.client_id)).toLowerCase().includes(q));});
 readonly totalPaid=computed(()=>this.paid().filter(d=>d.currency==='ZAR').reduce((s,d)=>s+subtotal(d),0));
 readonly totalOutstanding=computed(()=>this.outstanding().filter(d=>d.currency==='ZAR').reduce((s,d)=>s+subtotal(d),0));
 newName='';newEmail='';newPhone='';authEmail='';authPassword='';authFullName='';businessName='';
 constructor(){
   this.searchInput.pipe(debounceTime(180),distinctUntilChanged()).subscribe(s=>this.search.set(s));
   this.demo.set(local('demo',false));if(this.demo())this.restoreDemo();
   this.backend.client?.auth.onAuthStateChange((event,session)=>{this.user.set(session?.user||null);if(event==='PASSWORD_RECOVERY'){this.authMode.set('update');this.page.set('auth');}});
 }
 async ngOnInit(){
  if(this.demo()){this.page.set('workspace');return;}
  if(!this.backend.client)return;
  try{const{data}=await this.backend.client.auth.getUser();this.user.set(data.user);if(data.user){await this.fetchData();this.page.set('workspace');}}catch(e){this.error.set(this.err(e));}
 }
 get dateLabel(){return new Date().toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'});}
 err(e:unknown){return e instanceof Error?e.message:'Something went wrong. Please retry.';}
 clear(){this.error.set('');this.success.set('');}
 openAuth(mode:AuthMode){this.clear();this.authMode.set(mode);this.page.set('auth');}
 startDemo(){this.demo.set(true);store('demo',true);this.restoreDemo();this.page.set('workspace');this.go('overview');}
 restoreDemo(){this.clients.set(local('clients',exampleClients));this.docs.set(local('docs',exampleDocs));this.profile.set(local('profile',{full_name:'Alex Morgan',company_name:'Creative Studio',plan:'free'}));this.businessName=this.profile().company_name;}
 go(v:View){this.view.set(v);this.clear();this.search.set('');}
 nameOf(d:Doc){return this.clientName(d.client_id);}
 clientName(id:string|null){return this.clients().find(c=>c.id===id)?.name||'Unassigned';}
 amount(d:Doc){return money(subtotal(d),d.currency);}
 print(d:Doc){this.editing.set(structuredClone(d));this.view.set('editor');setTimeout(()=>window.print(),100);}
 async fetchData(){
  const c=this.backend.client;if(!c||!this.user())return;
  const [clients,docs,profile]=await Promise.all([c.from('clients').select('*').order('created_at',{ascending:false}),c.from('invoices').select('*').order('created_at',{ascending:false}),c.from('profiles').select('*').eq('id',this.user()!.id).single()]);
  for(const q of [clients,docs,profile])if(q.error)throw q.error;
  this.clients.set((clients.data||[]) as Contact[]);this.docs.set((docs.data||[]) as Doc[]);
  this.profile.set(profile.data as Profile);this.businessName=this.profile().company_name;
 }
 async account(action:'login'|'signup'|'reset'|'update'){
  const c=this.backend.client;if(!c){this.error.set('Accounts are coming soon. Launch the interactive demo instead.');return;}
  this.busy.set(true);this.clear();
  try{
   if(action==='signup'){const{data,error}=await c.auth.signUp({email:this.authEmail,password:this.authPassword,options:{data:{full_name:this.authFullName},emailRedirectTo:location.origin+location.pathname}});if(error)throw error;if(!data.session){this.success.set('Check your inbox for your confirmation link.');return;}}
   if(action==='login'){const{error}=await c.auth.signInWithPassword({email:this.authEmail,password:this.authPassword});if(error)throw error;}
   if(action==='reset'){const{error}=await c.auth.resetPasswordForEmail(this.authEmail,{redirectTo:location.origin+location.pathname});if(error)throw error;this.success.set('If your address is registered, a password reset email has been sent.');return;}
   if(action==='update'){const{error}=await c.auth.updateUser({password:this.authPassword});if(error)throw error;this.success.set('Password updated.');return;}
   this.user.set((await c.auth.getUser()).data.user);await this.fetchData();this.page.set('workspace');
  }catch(e){this.error.set(this.err(e));}finally{this.busy.set(false);}
 }
 async logout(){if(this.demo()){store('demo',false);this.demo.set(false);}else await this.backend.client?.auth.signOut();this.user.set(null);this.page.set('home');this.docs.set([]);this.clients.set([]);}
 async addClient(){
  const name=this.newName.trim();if(!name)return;this.clear();this.busy.set(true);
  try{let newClient:Contact={id:uid(),name,email:this.newEmail.trim(),phone:this.newPhone.trim()};
   if(!this.demo()){const{data,error}=await this.backend.client!.from('clients').insert({user_id:this.user()!.id,name,email:newClient.email,phone:newClient.phone}).select().single();if(error)throw error;newClient=data as Contact;}
   this.clients.update(c=>[newClient,...c]);if(this.demo())store('clients',this.clients());
   this.newName='';this.newEmail='';this.newPhone='';this.success.set('Client added.');
  }catch(e){this.error.set(this.err(e));}finally{this.busy.set(false);}
 }
 async deleteClient(client:Contact){
  if(!confirm('Delete '+client.name+'?'))return;this.clear();
  try{if(!this.demo()){const{error}=await this.backend.client!.from('clients').delete().eq('id',client.id);if(error)throw error;}
   this.clients.update(c=>c.filter(x=>x.id!==client.id));if(this.demo())store('clients',this.clients());
  }catch(e){this.error.set(this.err(e));}
 }
 create(kind:Kind){this.editing.set(makeDoc(kind));this.current.set('');this.go('editor');}
 edit(d:Doc){this.editing.set(structuredClone(d));this.current.set(d.id);this.go('editor');}
 setField(field:keyof Doc,value:string|null){this.editing.update(d=>({...d,[field]:value}));}
 setItem(index:number,field:keyof Item,value:string|number){this.editing.update(d=>({...d,items:d.items.map((item,i)=>i===index?{...item,[field]:field==='description'?value:Number(value)}:item)}));}
 addItem(){this.editing.update(d=>({...d,items:[...d.items,{description:'',quantity:1,unit_price:0}]}));}
 removeItem(index:number){this.editing.update(d=>({...d,items:d.items.filter((_,i)=>i!==index)}));}
 async save(){
  const d=this.editing();this.clear();
  if(!d.title.trim()||!d.items.length||d.items.some(i=>!i.description.trim()||i.quantity<=0||i.unit_price<0)){this.error.set('Enter a title and valid line items.');return;}
  if(d.due_date<d.issue_date){this.error.set('Due date cannot be before issue date.');return;}
  this.busy.set(true);
  try{let doc={...d,id:d.id||uid()};
   if(!this.demo()){
    const body={client_id:d.client_id,kind:d.kind,number:d.number,title:d.title,issue_date:d.issue_date,due_date:d.due_date,currency:d.currency,status:d.status,items:d.items,notes:d.notes};
    const q=d.id?this.backend.client!.from('invoices').update(body).eq('id',d.id):this.backend.client!.from('invoices').insert({...body,user_id:this.user()!.id});
    const {data,error}=await q.select().single();if(error)throw error;doc=data as Doc;
   }
   this.docs.update(a=>[doc,...a.filter(x=>x.id!==doc.id)]);if(this.demo())store('docs',this.docs());
   this.go(d.kind==='invoice'?'invoices':'quotes');this.success.set('Document saved.');
  }catch(e){this.error.set(this.err(e));}finally{this.busy.set(false);}
 }
 async setStatus(d:Doc,status:State){
  this.clear();
  try{if(!this.demo()){const{error}=await this.backend.client!.from('invoices').update({status}).eq('id',d.id);if(error)throw error;}
   this.docs.update(items=>items.map(i=>i.id===d.id?{...i,status}:i));if(this.demo())store('docs',this.docs());
  }catch(e){this.error.set(this.err(e));}
 }
 async remove(d:Doc){
  if(!confirm('Delete '+d.number+'?'))return;this.clear();
  try{if(!this.demo()){const{error}=await this.backend.client!.from('invoices').delete().eq('id',d.id);if(error)throw error;}
   this.docs.update(items=>items.filter(i=>i.id!==d.id));if(this.demo())store('docs',this.docs());
  }catch(e){this.error.set(this.err(e));}
 }
 convert(d:Doc){this.editing.set({...structuredClone(d),id:'',kind:'invoice',number:'INV-'+Date.now().toString().slice(-7),status:'draft'});this.current.set('');this.go('editor');}
 async saveBusiness(){
  this.busy.set(true);this.clear();
  try{if(!this.demo()){const{error}=await this.backend.client!.from('profiles').update({company_name:this.businessName}).eq('id',this.user()!.id);if(error)throw error;}
   this.profile.update(p=>({...p,company_name:this.businessName}));if(this.demo())store('profile',this.profile());this.success.set('Business name saved.');
  }catch(e){this.error.set(this.err(e));}finally{this.busy.set(false);}
 }
 exportCsv(){
  const records=[['Number','Kind','Client','Title','Amount','Currency','Status','Due'],...this.docs().map(d=>[d.number,d.kind,this.nameOf(d),d.title,String(subtotal(d)),d.currency,d.status,d.due_date])];
  const contents=records.map(row=>row.map(v=>'"'+v.replaceAll('"','""')+'"').join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([contents],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='craftbill-records.csv';a.click();URL.revokeObjectURL(url);
 }
 resetDemo(){if(!this.demo())return;localStorage.removeItem(storage+'clients');localStorage.removeItem(storage+'docs');localStorage.removeItem(storage+'profile');this.restoreDemo();this.success.set('Sample data restored.');}
 async checkout(){
  this.clear();if(this.demo()||!this.backend.client){this.error.set('Checkout is not available in demo mode.');return;}
  this.busy.set(true);
  try{const{data,error}=await this.backend.client.functions.invoke('create-checkout',{body:{product:'pro_lifetime'}});if(error)throw error;if(typeof data?.checkout_url!=='string'||!data.checkout_url.startsWith('https://'))throw new Error('Secure checkout has not been activated.');location.assign(data.checkout_url);}
  catch(e){this.error.set(this.err(e));}finally{this.busy.set(false);}
 }
}
bootstrapApplication(CraftBill).catch(console.error);

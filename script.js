/* ---------- view routing ---------- */
function show(id){
  document.querySelectorAll('.view').forEach(v=>{v.classList.add('hidden');v.classList.remove('flex','fade-in')});
  const el=document.getElementById(id); el.classList.remove('hidden'); el.classList.add('flex','fade-in');
  if(id==='C4') syncFulfilment();
}
document.querySelectorAll('.roleBtn').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.roleBtn').forEach(x=>{x.className='roleBtn flex-1 rounded-xl py-2.5 text-sm font-semibold transition text-zinc-500 hover:bg-zinc-100'});
  b.className='roleBtn flex-1 rounded-xl py-2.5 text-sm font-semibold transition bg-[#1A1A1A] text-white';
  show(b.dataset.role==='customer'?'C1':'S1');
});
function authGo(){ show('C2'); }
document.querySelectorAll('.authRole').forEach((b,i)=>b.onclick=()=>{
  document.getElementById('authSlider').style.transform=`translateX(${i*100}%)`;
  document.querySelectorAll('.authRole').forEach(x=>x.classList.add('text-zinc-400'));
  b.classList.remove('text-zinc-400');
});

/* ---------- drawer / sheet ---------- */
function toggleDrawer(o){
  document.getElementById('drawer').classList.toggle('translate-x-full',!o);
  document.getElementById('drawerBg').classList.toggle('hidden',!o);
}
function openSheet(id){document.getElementById('sheetOrd').textContent=id+' • 4 items';document.getElementById('sheet').classList.remove('translate-y-full');document.getElementById('sheetBg').classList.remove('hidden');}
function closeSheet(){document.getElementById('sheet').classList.add('translate-y-full');document.getElementById('sheetBg').classList.add('hidden');}

/* ---------- orders ---------- */
let orders=[
 {id:'#ORD-9842',items:6,total:'$38.50',mode:'📍 Pickup',fill:'100% Filled',quotes:'3 Quotes',badge:'🟢 Confirmed - Pickup',cls:'bg-emerald-50 text-emerald-700',active:true},
 {id:'#ORD-9840',items:12,total:'$74.20',mode:'🚚 Delivery',fill:'100% Filled',quotes:'2 Quotes',badge:'🟡 Confirmed - En Route',cls:'bg-amber-50 text-amber-700',active:true},
 {id:'#ORD-9839',items:4,total:'$18.90',mode:'📍 Pickup',fill:'75% Filled',quotes:'1 Quote',badge:'🔵 Quoted',cls:'bg-sky-50 text-sky-700',active:true,sheet:true},
 {id:'#ORD-9835',items:15,total:'--',mode:'🚚 Delivery',fill:'',quotes:'0 Quotes',badge:'⚪ Submitted',cls:'bg-zinc-100 text-zinc-600',active:false}
];
let tab='active';
function renderOrders(){
  const list=orders.filter(o=>tab==='active'?o.active:true);
  document.getElementById('activeCount').textContent=orders.filter(o=>o.active).length;
  document.getElementById('orderList').innerHTML=list.map(o=>`
   <div ${o.sheet?`onclick="openSheet('${o.id}')"`:''} class="rounded-2xl border border-zinc-200 p-4 ${o.sheet?'cursor-pointer hover:border-zinc-400':''} transition">
     <div class="flex justify-between items-start mb-2">
       <div class="font-bold text-sm">🧾 ${o.id}</div>
       <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${o.cls}">${o.badge}</span>
     </div>
     <div class="flex justify-between text-sm"><span class="text-zinc-500">${o.items} Items</span><span class="font-bold">${o.total}</span></div>
     <div class="mt-1.5 text-xs text-zinc-500">${o.mode}${o.fill?' • '+o.fill:''} • ${o.quotes}</div>
   </div>`).join('');
}
document.querySelectorAll('.ordTab').forEach(b=>b.onclick=()=>{
  tab=b.dataset.tab;
  document.querySelectorAll('.ordTab').forEach(x=>x.className='ordTab px-4 py-2 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600');
  b.className='ordTab px-4 py-2 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white';
  renderOrders();
});

/* ---------- order builder ---------- */
let qty=2, fulfil='pickup';
let draft=[{i:'🥫',t:'Ketchup (Heinz) — 750 ml x 2'},{i:'🥛',t:'2% Milk (Sealtest) — 4 L x 1'},{i:'🧻',t:'Paper Towels (Any Brand) — 6 Pack x 1'}];
function stepQty(d){qty=Math.max(1,qty+d);document.getElementById('qty').textContent=qty;}
function renderDraft(){
  document.getElementById('draftCount').textContent=draft.length;
  document.getElementById('draftList').innerHTML=draft.map((d,i)=>`
   <div class="flex items-center gap-3 rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-2.5">
     <span>${d.i}</span><span class="flex-1 text-sm">${d.t}</span>
     <button onclick="delItem(${i})" class="text-zinc-400 hover:text-red-500">🗑️</button>
   </div>`).join('') || '<p class="text-xs text-zinc-400">No items yet.</p>';
}
function delItem(i){draft.splice(i,1);renderDraft();}
function addItem(){
  const name=document.getElementById('itemName').value.trim()||'New Item';
  const brand=document.getElementById('brandSel').value.split(' (')[0];
  const unit=document.getElementById('unitSel').value;
  const icon=document.getElementById('catSel').value.trim().charAt(0);
  draft.push({i:icon,t:`${name} (${brand}) — ${unit} x ${qty}`});
  document.getElementById('itemName').value='';
  renderDraft();
}
document.querySelectorAll('.fxBtn').forEach(b=>b.onclick=()=>{
  fulfil=b.dataset.fx;
  document.querySelectorAll('.fxBtn').forEach(x=>x.className='fxBtn rounded-xl border-2 py-3 text-sm font-semibold border-zinc-200 text-zinc-600');
  b.className='fxBtn rounded-xl border-2 py-3 text-sm font-semibold border-[#1A1A1A] bg-[#1A1A1A] text-white';
});
function syncFulfilment(){
  document.getElementById('deliveryBlock').classList.toggle('hidden',fulfil!=='delivery');
  document.getElementById('pickupBlock').classList.toggle('hidden',fulfil!=='pickup');
}
document.querySelectorAll('.radBtn').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.radBtn').forEach(x=>x.className='radBtn flex-1 py-2.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600');
  b.className='radBtn flex-1 py-2.5 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white';
});
document.querySelectorAll('.payBtn').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.payBtn').forEach(x=>{x.classList.remove('border-[#1A1A1A]','bg-zinc-50');x.classList.add('border-zinc-200')});
  b.classList.add('border-[#1A1A1A]','bg-zinc-50');b.classList.remove('border-zinc-200');
});
let seq=9843;
function confirmOrder(){
  const ov=document.getElementById('successOverlay'); ov.classList.remove('hidden');
  orders.unshift({id:'#ORD-'+(seq++),items:draft.length,total:'--',mode:fulfil==='pickup'?'📍 Pickup':'🚚 Delivery',fill:'',quotes:'0 Quotes',badge:'⚪ Submitted',cls:'bg-zinc-100 text-zinc-600',active:false});
  renderOrders();
  setTimeout(()=>{ov.classList.add('hidden');show('C2');},1300);
}

/* ---------- merchant ---------- */
const leads=[
 {id:'#ORD-9835',cat:'grocery',label:'🥩 Grocery & Fresh',items:15,km:'1.2 km away'},
 {id:'#ORD-9839',cat:'pantry',label:'🥫 Pantry & Canned',items:4,km:'0.8 km away'},
 {id:'#ORD-9831',cat:'household',label:'🧼 Household & Cleaning',items:7,km:'2.4 km away'},
 {id:'#ORD-9828',cat:'hardware',label:'🔧 Hardware & General',items:3,km:'3.6 km away'}
];
let cat='all';
function renderLeads(){
  const l=leads.filter(x=>cat==='all'||x.cat===cat);
  document.getElementById('leadList').innerHTML=l.map(x=>`
   <div class="rounded-2xl border border-zinc-200 p-4">
     <div class="flex justify-between items-start"><span class="font-bold text-sm">🧾 ${x.id}</span>
     <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">${x.label}</span></div>
     <div class="mt-1.5 text-xs text-zinc-500">📍 ${x.km} • ${x.items} items</div>
     <button onclick="openQuote('${x.id}')" class="mt-3 w-full bg-[#1A1A1A] text-white rounded-xl py-2.5 text-sm font-semibold hover:opacity-90">Prepare Quote</button>
   </div>`).join('') || '<p class="text-sm text-zinc-400">No matching leads.</p>';
}
document.querySelectorAll('.catTab').forEach(b=>b.onclick=()=>{
  cat=b.dataset.cat;
  document.querySelectorAll('.catTab').forEach(x=>x.className='catTab px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 whitespace-nowrap');
  b.className='catTab px-3.5 py-2 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white whitespace-nowrap';
  renderLeads();
});
function openQuote(id){document.getElementById('quoteId').textContent=id;show('S2');}
function calcQuote(){
  let sub=0;document.querySelectorAll('.qp').forEach(i=>sub+=parseFloat(i.value)||0);
  const tax=sub*0.14975;
  document.getElementById('qSub').textContent='$'+sub.toFixed(2);
  document.getElementById('qTax').textContent='$'+tax.toFixed(2);
  document.getElementById('qTot').textContent='$'+(sub+tax).toFixed(2);
}
document.querySelectorAll('.qp').forEach(i=>i.addEventListener('input',calcQuote));
function submitQuote(){
  const b=document.getElementById('banner');b.classList.remove('hidden');
  show('S1');setTimeout(()=>b.classList.add('hidden'),2200);
}

renderOrders();renderDraft();renderLeads();

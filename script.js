const products = [
  {id:1, name:"Quantum Earbuds Pro", cat:"electronics,wearables,accessories", desc:"ANC • BT 5.4 • Wireless charging", price:129.99},
  {id:2, name:"Nebula Smart Lamp", cat:"home,electronics", desc:"Warm-to-cool white • App control", price:49.00},
  {id:3, name:"Aether Controller", cat:"gaming,accessories", desc:"Hall-effect sticks • PC/Console", price:69.99},
  {id:4, name:"Aurora Mechanical Keyboard", cat:"gaming,electronics", desc:"Hot-swap • RGB • 75%", price:129.00},
];

const grid = document.getElementById('grid');
const tpl = document.getElementById('cardTpl');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const pills = document.querySelectorAll('.pill');
const empty = document.getElementById('empty');
const resultsInfo = document.getElementById('resultsInfo');

let state = {cat:'all', q:'', sort:'featured'};

function render(){
  const q = state.q.toLowerCase();
  let filtered = products.filter(p=> (state.cat==='all' || p.cat.includes(state.cat)) && p.name.toLowerCase().includes(q));
  if(state.sort==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(state.sort==='price-desc') filtered.sort((a,b)=>b.price-a.price);

  grid.innerHTML='';
  filtered.forEach(p=>{
    const node = tpl.content.cloneNode(true);
    node.querySelector('[data-title]').textContent = p.name;
    node.querySelector('[data-desc]').textContent = p.desc;
    node.querySelector('[data-price]').textContent = '$'+p.price.toFixed(2);
    grid.appendChild(node);
  });
  empty.hidden = filtered.length>0;
  resultsInfo.textContent = filtered.length+' products';
}
search.addEventListener('input', e=>{ state.q=e.target.value; render(); });
sort.addEventListener('change', e=>{ state.sort=e.target.value; render(); });
pills.forEach(btn=> btn.addEventListener('click', ()=>{ pills.forEach(b=>b.dataset.active=false); btn.dataset.active=true; state.cat=btn.dataset.cat; render(); }));

render();

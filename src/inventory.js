import { ITEMS, RECIPES } from './items.js';
export function capacity(state) { return 30 + (state.upgrades.includes('storage') ? 20 : 0); }
export function used(state) { return Object.values(state.inventory).reduce((a,b)=>a+b,0); }
export function collect(state, type, amount) {
 if (!ITEMS[type] || !Number.isInteger(amount) || amount<=0) return 0;
 const take=Math.max(0,Math.min(amount,capacity(state)-used(state)));
 state.inventory[type]+=take; return take;
}
export function craftStatus(state,id) {
 const recipe=RECIPES.find(r=>r.id===id);
 if(!recipe) return 'Unknown recipe';
 if(state.upgrades.includes(id)) return 'Installed';
 if(!state.recipes.includes(id)) return 'Find blueprint';
 if(recipe.prerequisite&&!state.upgrades.includes(recipe.prerequisite)) return `Requires ${RECIPES.find(r=>r.id===recipe.prerequisite).name}`;
 if(Object.entries(recipe.cost).some(([k,v])=>state.inventory[k]<v)) return 'Need materials';
 return 'ready';
}
export function craft(state,id) {
 if(craftStatus(state,id)!=='ready') return false;
 const recipe=RECIPES.find(r=>r.id===id);
 for(const [k,v] of Object.entries(recipe.cost)) state.inventory[k]-=v;
 state.upgrades.push(id);
 if(id==='storage'&&!state.zones.includes('foundry'))state.zones.push('foundry');
 if(id==='cutter'&&!state.zones.includes('furnace'))state.zones.push('furnace');
 return true;
}

import { ITEMS, RECIPES, ZONES } from './items.js';
const KEY='junkbot.save.v1';
export function freshState() { return {version:1,inventory:Object.fromEntries(Object.keys(ITEMS).map(k=>[k,0])),upgrades:[],recipes:['storage','battery','armor'],zones:['yard'],history:[],expeditions:0,totalCollected:0,completed:false}; }
export function sanitize(data) {
 const state=freshState(); if(!data||data.version!==1) return state;
 for(const k of Object.keys(ITEMS))state.inventory[k]=Number.isInteger(data.inventory?.[k])?Math.max(0,Math.min(99999,data.inventory[k])):0;
 state.upgrades=[...new Set((Array.isArray(data.upgrades)?data.upgrades:[]).filter(k=>RECIPES.some(r=>r.id===k)))];
 state.recipes=[...new Set([...state.recipes,...(Array.isArray(data.recipes)?data.recipes:[]).filter(k=>RECIPES.some(r=>r.id===k))])];
 state.zones=['yard',...(state.upgrades.includes('storage')?['foundry']:[]),...(state.upgrades.includes('cutter')?['furnace']:[])];
 state.history=(Array.isArray(data.history)?data.history:[]).filter(h=>h&&ZONES.some(z=>z.id===h.zone)&&Number.isFinite(h.count)).slice(-8);
 state.expeditions=Math.max(0,Number.isInteger(data.expeditions)?data.expeditions:0);state.totalCollected=Math.max(0,Number.isInteger(data.totalCollected)?data.totalCollected:0);state.completed=data.completed===true;return state;
}
export function load() { try{return sanitize(JSON.parse(localStorage.getItem(KEY)));}catch{return freshState();} }
export function save(state) { try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;} }

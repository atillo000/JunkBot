export const ITEMS = {
  metal: { name: 'Scrap metal', icon: '▱', color: '#a9b7ba' },
  wire: { name: 'Copper wire', icon: '⌁', color: '#eaaa6b' },
  battery: { name: 'Battery cells', icon: '▥', color: '#c4e68c' },
  parts: { name: 'Machine parts', icon: '⚙', color: '#a3c8df' },
  rare: { name: 'Quantum cores', icon: '◇', color: '#cd9df4' },
};
export const RECIPES = [
  { id:'storage', name:'Cargo expansion', subtitle:'A little more room for possibility.', effect:'+20 cargo capacity', cost:{metal:8,wire:3}, prerequisite:null },
  { id:'battery', name:'Long-life battery', subtitle:'Keep going when the city gets dark.', effect:'Sprint uses 45% less charge', cost:{metal:6,battery:3}, prerequisite:null },
  { id:'speed', name:'Servo boosters', subtitle:'A spring in your very metal step.', effect:'+30% movement speed', cost:{metal:10,parts:4,wire:3}, prerequisite:'battery' },
  { id:'armor', name:'Reinforced shell', subtitle:'Scratches are just part of the story.', effect:'+50 durability · 35% less damage', cost:{metal:12,parts:4}, prerequisite:null },
  { id:'scanner', name:'Salvage scanner', subtitle:'Find the things everyone else missed.', effect:'Reveals buried quantum cores', cost:{wire:6,battery:3,parts:3}, prerequisite:'storage' },
  { id:'cutter', name:'Plasma cutter', subtitle:'Every closed door is a new beginning.', effect:'Unlocks the Furnace District', cost:{metal:15,wire:5,rare:2}, prerequisite:'scanner' },
];
export const ZONES = [
 {id:'yard',name:'The Rustlands',label:'01',subtitle:'Where forgotten things get a second chance.', requirement:null,description:'Scrap canyons, exposed cables, and wandering sentries.',loot:1},
 {id:'foundry',name:'Copperworks',label:'02',subtitle:'Follow the hum beneath the rust.',requirement:'storage',description:'Rich copper veins. Heavy machinery. Bring extra room.',loot:1.5},
 {id:'furnace',name:'Furnace District',label:'03',subtitle:'Something is still alive in the heart of the city.',requirement:'cutter',description:'Rare cores and unstable platforms in the old reactor.',loot:2},
];

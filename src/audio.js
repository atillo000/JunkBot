export class Audio {
 constructor(){this.enabled=false;this.ctx=null;}
 start(){if(this.ctx)return;try{this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.enabled=true;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.value=55;g.gain.value=.025;o.connect(g).connect(this.ctx.destination);o.start();}catch{}}
 toggle(){if(!this.ctx){this.start();return this.enabled;}this.enabled=!this.enabled;this.enabled?this.ctx.resume():this.ctx.suspend();return this.enabled;}
 play(type='collect'){if(!this.enabled||!this.ctx)return;this.ctx.resume();const o=this.ctx.createOscillator(),g=this.ctx.createGain(),t=this.ctx.currentTime;const f=type==='damage'?110:type==='craft'?440:660;o.type=type==='damage'?'sawtooth':'sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.6,t+.14);g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g).connect(this.ctx.destination);o.start();o.stop(t+.31);}
}

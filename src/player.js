import * as THREE from 'three';
import {robot} from './world.js';
export class Player {
 constructor(scene){this.obj=robot();scene.add(this.obj);this.velocityY=0;this.grounded=true;this.yaw=0;this.cameraYaw=0;this.cameraPitch=-.08;this.charge=100;this.health=100;this.invulnerable=0;this.moving=false;}
 reset(upgrades){this.obj.position.set(0,0,3);this.velocityY=0;this.health=upgrades.includes('armor')?150:100;this.charge=100;this.cameraYaw=0;this.cameraPitch=-.08;this.invulnerable=0;}
 update(dt,keys,stick,world,upgrades,time){
 let x=(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0)+stick.x,z=(keys.has('KeyS')?1:0)-(keys.has('KeyW')?1:0)+stick.y;
 const len=Math.hypot(x,z);this.moving=len>.08;const sprint=keys.has('ShiftLeft')&&this.charge>1&&this.moving;
 this.charge=Math.max(0,Math.min(100,this.charge+(sprint?-18*(upgrades.includes('battery')?.55:1):12)*dt));
 if(this.moving){x/=Math.max(1,len);z/=Math.max(1,len);const s=Math.sin(this.cameraYaw),c=Math.cos(this.cameraYaw),dx=x*c+z*s,dz=z*c-x*s,speed=(sprint?7.2:4.1)*(upgrades.includes('speed')?1.3:1);const next=this.obj.position.clone();next.x+=dx*speed*dt;next.z+=dz*speed*dt;next.x=THREE.MathUtils.clamp(next.x,-9,9);next.z=THREE.MathUtils.clamp(next.z,-54,14);for(const o of world.colliders){const dd=Math.hypot(next.x-o.x,next.z-o.z),r=o.r+.55;if(dd<r){const a=Math.atan2(next.z-o.z,next.x-o.x);next.x=o.x+Math.cos(a)*r;next.z=o.z+Math.sin(a)*r;}}this.obj.position.x=next.x;this.obj.position.z=next.z;const target=Math.atan2(dx,dz);this.obj.rotation.y+=Math.atan2(Math.sin(target-this.obj.rotation.y),Math.cos(target-this.obj.rotation.y))*Math.min(1,dt*12);}
 if(keys.has('Space')&&this.grounded){this.velocityY=6.5;this.grounded=false;keys.delete('Space');}
 this.velocityY-=18*dt;this.obj.position.y+=this.velocityY*dt;if(this.obj.position.y<=0){this.obj.position.y=0;this.velocityY=0;this.grounded=true;}
 const {arms,legs,head}=this.obj.userData,walk=this.moving?Math.sin(time*(sprint?15:10))*.62:0;
 legs[0].rotation.x=walk;legs[1].rotation.x=-walk;arms[0].rotation.x=-walk*.8;arms[1].rotation.x=walk*.8;head.rotation.z=Math.sin(time*2)*.025;
 this.invulnerable=Math.max(0,this.invulnerable-dt);this.obj.visible=!(this.invulnerable>0&&Math.floor(time*15)%2===0);
 }
 damage(amount,upgrades){if(this.invulnerable>0)return false;this.health=Math.max(0,this.health-amount*(upgrades.includes('armor')?.65:1));this.invulnerable=1.3;return true;}
}

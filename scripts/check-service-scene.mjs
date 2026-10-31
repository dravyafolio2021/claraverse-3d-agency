import assert from 'node:assert/strict';
import {createServiceSceneController,serviceIndexAtProgress,serviceProgressForIndex} from '../lib/service-scene.ts';

const changes=[];
const scene=createServiceSceneController(5,index=>changes.push(index));
scene.scroll(0);
assert.deepEqual(changes,[],'Resting on the first service must not cause repeated renders.');
scene.scroll(.43);
assert.equal(changes.at(-1),2,'Scrolling forward reaches Integrations.');
scene.preview(4);
assert.equal(changes.at(-1),4,'Hover can preview Growth.');
scene.restore();
assert.equal(changes.at(-1),2,'Leaving the menu restores the scroll-selected service.');
scene.scroll(.21);
assert.equal(changes.at(-1),1,'Reverse scrolling returns to Design.');
scene.select(4,true);
scene.scroll(.45);
scene.restore();
assert.equal(changes.at(-1),4,'A click stays selected while travelling through earlier services.');
scene.scroll(.9);
scene.scroll(.7);
assert.equal(changes.at(-1),3,'After reaching the click target, scrolling takes over again.');
scene.select(0,true);
scene.scroll(.45);
scene.interrupt();
assert.equal(changes.at(-1),2,'User input cancels a seek and restores the actual scroll location.');
scene.select(1,false);
scene.restore();
assert.equal(changes.at(-1),1,'A touch selection stays selected without moving the page.');
scene.scroll(.99);
assert.equal(changes.at(-1),4,'Page scrolling can resume after a touch selection.');
assert.equal(serviceIndexAtProgress(-.2,5),0);
assert.equal(serviceIndexAtProgress(1.2,5),4);
for(let index=0;index<5;index++){
 assert.equal(serviceIndexAtProgress(serviceProgressForIndex(index,5),5),index,'Each click lands within its own scroll interval.');
}
const count=changes.length;scene.scroll(1);scene.scroll(1);
assert.equal(changes.length,count,'Stationary progress must not rerender the component.');
console.log('Service navigation passed: forward/reverse scroll, hover restore, click seek, interruption, touch selection and interval targets.');

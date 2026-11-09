import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {contrastRatio,navigationThemeFor,opaqueBackground,relativeLuminance} from '../lib/navigation-contrast.ts';

assert.equal(contrastRatio([0,0,0],[255,255,255]),21);
assert.equal(relativeLuminance([0,0,0]),0);
assert.equal(relativeLuminance([255,255,255]),1);
assert.equal(navigationThemeFor(.02,'deep'),'lifted','A dark page receives the raised olive header.');
assert.equal(navigationThemeFor(.8,'lifted'),'deep','A light page receives the deep olive header.');
assert.equal(navigationThemeFor(.3,'deep'),'deep','Boundary readings retain the last theme.');
assert.equal(navigationThemeFor(.3,'lifted'),'lifted','Both approaches to a boundary avoid flicker.');
assert.equal(opaqueBackground('rgba(255, 255, 255, 0.1)'),null,'Transparent layers defer to the real surface.');
assert.deepEqual(opaqueBackground('rgb(243, 245, 238)'),[243,245,238]);
assert.deepEqual(opaqueBackground('rgb(0 0 0 / 100%)'),[0,0,0]);

const root=postcss.parse(readFileSync(new URL('../app/globals.css',import.meta.url),'utf8'));
const defaults={},dark={},open={};
root.walkRules(rule=>{
 const target=rule.selector==='.site-header'?defaults:rule.selector==='.site-header[data-theme=deep]'?dark:rule.selector==='.site-header[data-menu-open=true]'?open:null;
 if(target)rule.walkDecls(declaration=>{if(declaration.prop.startsWith('--nav-'))target[declaration.prop]=declaration.value;});
});
const rgb=value=>{assert.match(value,/^#[0-9a-f]{6}$/i);return [1,3,5].map(index=>parseInt(value.slice(index,index+2),16));};
const resolve=(tokens,key)=>tokens[key]?.startsWith('var(')?resolve(tokens,tokens[key].slice(4,-1)):tokens[key];
for(const [name,tokens] of [['lifted olive',defaults],['deep olive',{...defaults,...dark}],['open menu',{...defaults,...open}],['open menu over light content',{...defaults,...dark,...open}]]){
 for(const foreground of ['--nav-ink','--nav-muted','--nav-accent']){
  for(const background of ['--nav-surface','--nav-secondary','--nav-elevated']){
   const ratio=contrastRatio(rgb(resolve(tokens,foreground)),rgb(resolve(tokens,background)));
   assert.ok(ratio>=4.5,`${name}: ${foreground} on ${background} must meet 4.5:1, got ${ratio.toFixed(2)}`);
  }
 }
 const cta=contrastRatio(rgb(resolve(tokens,'--nav-cta-ink')),rgb(resolve(tokens,'--nav-cta')));
 assert.ok(cta>=4.5,`${name} CTA contrast`);
 console.log(`${name}: menu text, secondary text, active links and CTA meet 4.5:1.`);
}
assert.ok(contrastRatio(rgb(defaults['--nav-menu']),[8,13,11])>=1.5,'Menu material must separate from the page background.');
console.log('Surface selection, menu/page separation, elevated material and accessible palette pairs passed.');

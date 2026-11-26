import {readPage, inspect} from './core.js';

const HU={subtitle:'Entity Engineering · JSON-LD ellenőrző',refresh:'Frissítés',blocks:'JSON-LD blokkok',parsed:'Feldolgozva',typed:'Típussal jelölt objektumok',errors:'Hibák',entities:'Entitások',page:'Oldal',types:'Deklarált típusok',relationships:'Azonosítók és kapcsolatok',repeated:'Ismételt @id deklarációk',repeatNote:'Az ismételt azonosítók szándékos gráfleírások is lehetnek; önmagukban nem hibák.',selectBlock:'JSON-LD blokk',copyBlock:'Blokk másolása',pageNote:'Az aktuális DOM-ban található deklarációk; nem bizonyítják a feltérképezést, indexelést vagy keresési láthatóságot.',copyReport:'JSON-riport másolása',saveReport:'JSON mentése',footer:'Helyi elemzés · nincs adattovábbítás',loading:'Az aktuális oldal vizsgálata…',unsupported:'Ez az oldal nem vizsgálható. Nyiss meg egy normál HTTP vagy HTTPS weboldalt, majd kattints a bővítmény ikonjára.',failed:'Nem sikerült az oldal beolvasása. Frissítsd az oldalt, majd nyisd meg újra a bővítményt.',complete:'Vizsgálat kész · az aktuális renderelt DOM alapján',empty:'Nem található JSON-LD blokk az aktuális DOM-ban.',limits:'A biztonságos feldolgozási korlát miatt az eredmény részleges. A részletek a JSON-riportban találhatók.',canonicalWarning:'Több canonical deklaráció található.',syntaxWarning:'A hibák a JSON-szintaxisra vagy a gyökérelem szerkezetére vonatkoznak; ez nem teljes Schema.org-validálás.',noTypes:'Nincs deklarált @type.',noEntities:'Nincs megjeleníthető entitás.',noSame:'Nincs megfigyelt sameAs érték.',idDeclarations:'@id deklarációk',idReferences:'@id hivatkozások',distinctIds:'Különböző deklarált @id-k',sameAsValues:'sameAs értékek',notPresent:'Nincs deklarálva',block:'Blokk',root:'Gyökér',parsedLabel:'Feldolgozva (JSON)',errorLabel:'Hiba',skippedLabel:'Kihagyva (méretkorlát)',copied:'Vágólapra másolva.',copyFailed:'A másolás nem sikerült. Jelöld ki kézzel a blokkot, vagy mentsd le a JSON-riportot.',saved:'A JSON-riport mentése elindult.',downloadFailed:'A mentés nem indult el.',url:'Aktuális URL',title:'Oldalcím',language:'HTML nyelv',canonical:'Canonical',hreflang:'Hreflang',robots:'Robots meta',noBlock:'Nincs megjeleníthető blokk.',partial:'Részleges eredmény',sourceNote:'A nyers blokk változatlan szövege.',unknownType:'@id deklaráció',noName:'',blockCount:'blokk',privacyHint:'A riport a megnyitott oldal adatait és nyers JSON-LD szövegét tartalmazza. Csak tudatosan oszd meg.',localLimits:'Megjelenítés korlátozva; további adatok a riportban.',scanScope:'Aktuális oldal · top-level DOM',notChecked:'Szókészlet és kiválasztott kapcsolati szabályok; nem teljes validálás.'};
const EN={subtitle:'Entity Engineering · JSON-LD Inspector',refresh:'Refresh',blocks:'JSON-LD blocks',parsed:'Parsed',typed:'Typed objects',errors:'Errors',entities:'Entities',page:'Page',types:'Declared types',relationships:'Identifiers & relationships',repeated:'Repeated ID declarations',repeatNote:'Repeated IDs can be intentional graph descriptions, not necessarily errors.',selectBlock:'JSON-LD block',copyBlock:'Copy block',pageNote:'These are declarations in the current DOM, not proof of crawling, indexing or search visibility.',copyReport:'Copy JSON report',saveReport:'Save JSON',footer:'Local analysis · no data sent',loading:'Inspecting current page…',unsupported:'This page cannot be inspected. Open an HTTP or HTTPS webpage, then click the extension icon.',failed:'Could not read this page. Reload the page and reopen the extension.',complete:'Inspection complete · current rendered DOM',empty:'No JSON-LD blocks found in the current DOM.',limits:'Processing limits were reached. The result is partial; see the JSON report for details.',canonicalWarning:'Multiple canonical declarations found.',syntaxWarning:'Errors concern JSON syntax or the root structure, not full Schema.org validation.',noTypes:'No declared @type.',noEntities:'No entities to display.',noSame:'No observed sameAs values.',idDeclarations:'@id declarations',idReferences:'@id references',distinctIds:'Distinct declared @ids',sameAsValues:'sameAs values',notPresent:'Not declared',block:'Block',root:'Root',parsedLabel:'Parsed (JSON)',errorLabel:'Error',skippedLabel:'Skipped (size limit)',copied:'Copied to clipboard.',copyFailed:'Copy failed. Select the block manually or save the JSON report.',saved:'JSON report download started.',downloadFailed:'Download could not be started.',url:'Current URL',title:'Page title',language:'HTML language',canonical:'Canonical',hreflang:'Hreflang',robots:'Robots meta',noBlock:'No block to display.',partial:'Partial result',sourceNote:'Original, unmodified block text.',unknownType:'@id declaration',noName:'',blockCount:'block',privacyHint:'The report includes page details and raw JSON-LD. Share it only intentionally.',localLimits:'Display limited; additional details may be available in the report.',scanScope:'Current page · top-level DOM',notChecked:'Vocabulary and selected relationship checks; not full validation.'};
Object.assign(HU, {validation:'Ellenőrzés',warnings:'Figyelmeztetések',information:'Megjegyzések',filterFindings:'Megállapítások szűrése',all:'Összes',partialContext:'Egyedi kontextus: egyes vizsgálatok kimaradtak.',scopeTitle:'Hatókör és források',scopeText:'A teljes csomagolt szókészlet névellenőrzése és kiválasztott domain/range ajánlások. A távoli vagy összetett JSON-LD kontextusok nem kerülnek teljes kibontásra. Nem Google Rich Results-, Microdata- vagy RDFa-validálás. A sameAs tényleges azonosságát nem igazolja.',attribution:'Forrás és licenc',noFindings:'A futtatott ellenőrzések nem jeleztek ilyen megállapítást.',errorSeverity:'Hiba',warningSeverity:'Figyelmeztetés',infoSeverity:'Megjegyzés',observed:'Észlelt érték',expected:'Elvárt / vizsgálandó',limitedFindings:'A megállapítások megjelenítése korlátozott. A riport a részleges állapotot is jelzi.',coverage:'Schema.org',classes:'osztály',properties:'tulajdonság',rules:'részletes domain/range szabály',enumValues:'felsorolási érték',typeChecks:'típusellenőrzés',propertyChecks:'tulajdonság-ellenőrzés',domainChecks:'domain',rangeChecks:'range',noSchemaContext:'Nem azonosítható támogatott Schema.org-kontextus',jsonError:'JSON-szintaktikai vagy gyökérelemhiba',typeShape:'A @type értéke nem szöveg vagy szövegtömb',idShape:'A @id értéke nem szöveg',unknownType:'Ismeretlen Schema.org-osztály',unknownProperty:'Ismeretlen Schema.org-tulajdonság',domainMismatch:'Szokatlan tulajdonság ehhez az entitástípushoz',rangeMismatch:'Szokatlan értéktípus a tulajdonsághoz',literalFormat:'Az érték formátuma eltér a várható típustól',sameAsShape:'A sameAs nem URL/IRI hivatkozásként szerepel',sameAsRelative:'Relatív sameAs – ellenőrizd az azonossági hivatkozást',selfSameAs:'A sameAs a saját azonosítóra mutat',contextLimited:'Egyedi vagy összetett kontextus – részleges ellenőrzés',localReference:'Helyi @id hivatkozás deklaráció nélkül',mixedIdentityTypes:'Azonos @id alatt Person és Organization szerepel',differentNames:'Azonos @id alatt több eltérő név szerepel',multipleCanonical:'Több canonical deklaráció'});
Object.assign(EN, {validation:'Checks',warnings:'Warnings',information:'Notes',filterFindings:'Filter findings',all:'All',partialContext:'Custom context: some checks were skipped.',scopeTitle:'Scope & sources',scopeText:'Checks all names in the bundled vocabulary and selected domain/range guidance. Remote or complex JSON-LD contexts are not fully expanded. Not Google Rich Results, Microdata or RDFa validation. Actual sameAs identity is not verified.',attribution:'Attribution & license',noFindings:'No findings of this kind in the checks performed.',errorSeverity:'Error',warningSeverity:'Warning',infoSeverity:'Note',observed:'Observed',expected:'Expected / review',limitedFindings:'The findings display is limited. Partial status is included in the report.',coverage:'Schema.org',classes:'classes',properties:'properties',rules:'domain/range rules',enumValues:'enumeration values',typeChecks:'type checks',propertyChecks:'property checks',domainChecks:'domain',rangeChecks:'range',noSchemaContext:'No supported Schema.org context identified',jsonError:'JSON syntax or root-structure error',typeShape:'@type is not a string or array of strings',idShape:'@id is not a string',unknownType:'Unknown Schema.org class',unknownProperty:'Unknown Schema.org property',domainMismatch:'Unexpected property for this entity type',rangeMismatch:'Unexpected value type for this property',literalFormat:'Literal format differs from the expected datatype',sameAsShape:'sameAs is not expressed as a URL/IRI reference',sameAsRelative:'Relative sameAs – review identity reference',selfSameAs:'sameAs points to its own identifier',contextLimited:'Custom or complex context – partial checks',localReference:'Local @id reference without a matching declaration',mixedIdentityTypes:'Person and Organization share the same @id',differentNames:'Multiple distinct names share an @id',multipleCanonical:'Multiple canonical declarations'});
const lang = (chrome.i18n.getUILanguage() || 'en').toLowerCase().startsWith('hu') ? 'hu' : 'en';
const T=lang==='hu'?HU:EN;
const $=id=>document.getElementById(id);
const text=(id,v)=>{$(id).textContent=String(v??'');};
const element=(tag,className,value)=>{const el=document.createElement(tag);if(className)el.className=className;if(value!==undefined)el.textContent=String(value);return el;};
const display=v=>v===null||v===undefined||v===''?T.notPresent:String(v);
let report=null;
let scanSequence=0;

document.documentElement.lang=lang;
document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(T[key])el.textContent=T[key];});
text('subtitle',T.subtitle);
$('refresh').setAttribute('aria-label',T.refresh);
$('copyReport').title=T.privacyHint;
$('saveReport').title=T.privacyHint;
$('rawJson').setAttribute('aria-label',T.selectBlock);
const tabs=[...document.querySelectorAll('[role="tab"]')];
function activate(tab,focus=false){for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;$(item.getAttribute('aria-controls')).hidden=!active;}if(focus)tab.focus();}
for(const tab of tabs){tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{const i=tabs.indexOf(tab);let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();activate(tabs[next],true);});}

function detail(parent,key,value){const el=element('div','detail');el.append(element('span','',key),element('strong','',display(value)));parent.append(el);}
function note(parent,value){parent.append(element('p','muted',value));}
function setStatus(value,isError=false){text('status',value);$('status').classList.toggle('error',isError);}
function blockLabel(block){return block.status==='parsed'?T.parsedLabel:block.status==='error'?T.errorLabel:T.skippedLabel;}
function updateBlock(){
  const b=report?.blocks[Number($('blockSelect').value)];
  $('rawJson').value=b?.raw??'';
  $('copyBlock').disabled=typeof b?.raw!=='string';
  text('blockStatus',!b?T.noBlock:b.status==='error'?`${T.errorLabel}: ${b.error}`:b.status==='skipped'?`${T.skippedLabel} (${b.length} ${lang==='hu'?'karakter':'characters'})`:`${blockLabel(b)} · ${T.sourceNote}`);
}
function renderFindings(){
  if(!report?.validation)return;
  const val=report.validation, filter=$('findingFilter').value, parent=$('findings');parent.replaceChildren();
  const findings=val.findings.filter(f=>filter==='all'||f.severity===filter);
  if(!findings.length)note(parent,T.noFindings);
  for(const f of findings.slice(0,150)){
    const row=element('div','finding '+f.severity);const severity=T[f.severity+'Severity'];
    row.append(element('div','finding-severity',severity),element('strong','finding-title',T[f.code]||f.code));
    if(f.property)row.append(element('code','finding-property',f.property));
    if(f.actual!==null)row.append(element('p','finding-value',`${T.observed}: ${f.actual}`));
    if(f.expected!==null)row.append(element('p','finding-expected',`${T.expected}: ${f.expected}`));
    row.append(element('p','path',`${f.block===null?T.page:T.block+' '+f.block} · ${f.path}`));parent.append(row);
  }
  if(findings.length>150||val.limits.length)note(parent,T.limitedFindings);
}
function renderValidation(r){
  const v=r.validation, st=v.stats, d=v.vocabulary;
  text('checkErrors',st.errors);text('checkWarnings',st.warnings);text('checkInfo',st.info);
  text('coverage',`Schema.org ${d.version} · ${d.classes} ${T.classes} · ${d.properties} ${T.properties} · ${d.enumerationValues} ${T.enumValues} · ${d.domainRangeRules} ${T.rules}`);
  text('checkedCounts',`${st.checkedTypes} ${T.typeChecks} · ${st.checkedProperties} ${T.propertyChecks} · ${st.domainChecks} ${T.domainChecks} · ${st.rangeChecks} ${T.rangeChecks}`);
  renderFindings();
}
function render(r){
  report=r;
  text('metricBlocks',r.stats.blocks);text('metricValid',r.stats.parsed);text('metricEntities',r.stats.typedObjects);text('metricErrors',r.validation.stats.errors);
  $('metricErrors').classList.toggle('has-errors',r.validation.stats.errors>0);
  const alerts=[T.notChecked];if(r.limits.length||r.validation.limits.length)alerts.push(T.limits);if(r.validation.stats.skippedContexts)alerts.push(T.partialContext);if(r.notes.includes('multipleCanonical'))alerts.push(T.canonicalWarning);
  text('notice',alerts.join(' '));$('notice').hidden=false;
  const types=$('types');types.replaceChildren();if(!r.typeCounts.length)note(types,T.noTypes);
  for(const x of r.typeCounts.slice(0,100))types.append(element('span','chip',`${x.type} × ${x.count}`));if(r.typeCounts.length>100)note(types,T.localLimits);
  const relations=$('relations');relations.replaceChildren();for(const key of ['idDeclarations','idReferences','distinctIds','sameAsValues'])detail(relations,T[key],r.stats[key]);
  renderValidation(r);
  const list=$('entityList');list.replaceChildren();if(!r.entities.length)note(list,T.noEntities);
  for(const e of r.entities.slice(0,150)){
    const card=element('div','entity');card.append(element('div','type',e.types.join(' · ')||(lang==='hu'?'@id deklaráció':'@id declaration')));if(e.name)card.append(element('strong','',e.name));if(e.id)card.append(element('code','',e.id));card.append(element('div','path',`${T.block} ${e.block} · ${e.path}${e.sameAsCount?' · sameAs × '+e.sameAsCount:''}`));list.append(card);
  }if(r.entities.length>150)note(list,T.localLimits);
  text('sameSummary',`sameAs (${r.stats.sameAsValues})`);$('sameDetails').open=false;const same=$('sameList');same.replaceChildren();if(!r.sameAs.length)note(same,T.noSame);
  for(const a of r.sameAs.slice(0,200)){const el=element('div');el.append(element('code','',a.value));if(a.entityId)el.append(element('p','muted',a.entityId));same.append(el);}if(r.sameAs.length>200)note(same,T.localLimits);
  const repeat=$('repeatList');repeat.replaceChildren();$('repeatDetails').hidden=!r.repeatedIds.length;$('repeatDetails').open=false;for(const id of r.repeatedIds.slice(0,100)){const div=element('div');div.append(element('code','',`${id.id} × ${id.count}`));repeat.append(div);}if(r.repeatedIds.length>100)note(repeat,T.localLimits);
  const select=$('blockSelect');select.replaceChildren();for(const [i,b] of r.blocks.entries()){const option=element('option','',`${T.block} ${b.index} · ${blockLabel(b)}`);option.value=String(i);select.append(option);}select.disabled=!r.blocks.length;updateBlock();
  const page=$('pageDetails');page.replaceChildren();detail(page,T.url,r.page.url);detail(page,T.title,r.page.title);detail(page,T.language,r.page.language);detail(page,T.canonical,r.page.canonical.join('\n'));detail(page,T.hreflang,r.page.hreflang.map(x=>`${x.language}: ${x.href}`).join('\n'));detail(page,T.robots,r.page.robots.map(x=>`${x.name}: ${x.content}`).join('\n'));
  $('results').hidden=false;
  setStatus(r.stats.blocks?(r.limits.length||r.validation.limits.length||r.validation.stats.skippedContexts)?`${T.partial} · ${T.scanScope}`:T.complete:T.empty);
}
async function scan(){
  const seq=++scanSequence;report=null;$('results').hidden=true;text('feedback','');text('pageName','');$('refresh').disabled=true;setStatus(T.loading);
  try {
    const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
    if(!tab?.id||!/^https?:\/\//i.test(tab.url||'')){setStatus(T.unsupported,true);return;}
    let shown;try{shown=new URL(tab.url).hostname;}catch{shown=tab.url;}
    text('pageName',shown);$('pageName').title=tab.url;
    const injected=await chrome.scripting.executeScript({target:{tabId:tab.id},func:readPage});
    if(seq!==scanSequence)return;
    if(!injected?.[0]?.result)throw new Error('No result');
    render(inspect(injected[0].result));
  } catch(e){if(seq===scanSequence)setStatus(T.failed,true);}
  finally{if(seq===scanSequence)$('refresh').disabled=false;}
}
async function copy(value){try{await navigator.clipboard.writeText(value);text('feedback',T.copied);}catch(e){text('feedback',T.copyFailed);}}
function save(){if(!report)return;try{const blob=new Blob([JSON.stringify(report,null,2)+'\n'],{type:'application/json'});const objectUrl=URL.createObjectURL(blob);let host='page';try{host=new URL(report.page.url).hostname.replace(/[^a-z0-9.-]/gi,'_')||host;}catch{}const a=element('a');a.href=objectUrl;a.download=`wikiai-schema-peek-${host}-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(objectUrl),10000);text('feedback',T.saved);}catch(e){text('feedback',T.downloadFailed);}}
$('findingFilter').addEventListener('change',renderFindings);
$('blockSelect').addEventListener('change',updateBlock);
$('refresh').addEventListener('click',scan);
$('copyBlock').addEventListener('click',()=>{const b=report?.blocks[Number($('blockSelect').value)];if(typeof b?.raw==='string')copy(b.raw);});
$('copyReport').addEventListener('click',()=>{if(report)copy(JSON.stringify(report,null,2));});
$('saveReport').addEventListener('click',save);
scan();

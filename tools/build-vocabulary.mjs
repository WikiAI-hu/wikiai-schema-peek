import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=n=>fs.readFileSync(path.join(root,'vocabulary',n),'utf8').trim();
const lines=s=>s.split(/\r?\n/).filter(Boolean);
const split=s=>s?s.split(','):[];
const groups=s=>Object.fromEntries(lines(s).flatMap(line=>{const [parents,children]=line.split('|');return children.trim().split(/\s+/).map(name=>[name,split(parents)]);}));
let data={version:'30.1',releaseDate:'2026-09-16',source:'https://github.com/schemaorg/schemaorg/blob/main/data/releases/30.1/schemaorg-current-https.jsonld',sourceBlob:'d04621d491eff20f3a8defe7bd4351a16db75e42',license:'CC BY-SA 3.0',classes:groups(read('class-groups.txt')),properties:read('properties.txt').split(/\s+/),enumerations:groups(read('enumeration-groups.txt')),rules:Object.fromEntries(lines(read('property-rules.txt')).map(l=>{const [k,d,r]=l.split('|');return[k,[split(d),split(r)]];})),coverage:'selected-domain-range'};
const sourceFile=process.argv[2];
if(sourceFile){
  const j=JSON.parse(fs.readFileSync(sourceFile,'utf8'));
  const arr=v=>Array.isArray(v)?v:v?[v]:[];
  const term=v=>typeof v==='string'?(v.match(/^(?:schema:|https?:\/\/schema\.org\/)([^\/#?]+)$/)?.[1]||null):null;
  const ids=v=>arr(v).map(x=>term(x?.['@id'])).filter(Boolean).sort();
  const g=j['@graph'];if(!Array.isArray(g))throw Error('Expected official Schema.org JSON-LD @graph');
  const classes={},properties=[],enumerations={},rules={};
  for(const x of g){const name=term(x['@id']);if(!name)continue;const types=arr(x['@type']);
    if(types.some(t=>t==='rdfs:Class'||t==='http://www.w3.org/2000/01/rdf-schema#Class'))classes[name]=ids(x['rdfs:subClassOf']??x['http://www.w3.org/2000/01/rdf-schema#subClassOf']);
    else if(types.some(t=>t==='rdf:Property'||t==='http://www.w3.org/1999/02/22-rdf-syntax-ns#Property')){properties.push(name);rules[name]=[ids(x['schema:domainIncludes']??x['https://schema.org/domainIncludes']),ids(x['schema:rangeIncludes']??x['https://schema.org/rangeIncludes'])];}
    else{const t=types.map(term).filter(Boolean);if(t.length)enumerations[name]=t;}
  }
  if(Object.keys(classes).length<500||properties.length<1000)throw Error('Vocabulary incomplete or unsupported representation');
  const suppliedVersion=process.argv[3];if(!suppliedVersion)throw Error('Specify source version explicitly');
  data={version:suppliedVersion,releaseDate:null,source:'User supplied Schema.org JSON-LD file; verify source/version',sourceBlob:null,license:'CC BY-SA 3.0',classes,properties:properties.sort(),enumerations,rules,coverage:'all-properties-from-input'};
}
const checks=Object.keys(data.classes).length===939&&data.properties.length===1538&&Object.keys(data.enumerations).length===546&&Object.keys(data.rules).length===309;
if(!sourceFile&&!checks)throw Error('Bundled snapshot counts mismatch');
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);};
if(!sourceFile&&(hash(Object.keys(data.classes).sort().join(' '))!=='9dcb3d20'||hash(data.properties.slice().sort().join(' '))!=='735bbfaa'||hash(read('enumeration-groups.txt'))!=='3e2c4070'))throw Error('Bundled term inventory integrity mismatch');
for(const k of Object.keys(data.rules)){if(!data.properties.includes(k))throw Error('Unknown rule '+k);for(const t of data.rules[k].flat())if(!Object.hasOwn(data.classes,t))throw Error('Unknown rule class '+t);}
for(const t of Object.values(data.classes).flat().concat(Object.values(data.enumerations).flat()))if(!Object.hasOwn(data.classes,t))throw Error('Unknown class '+t);
fs.writeFileSync(path.join(root,'extension','vocabulary.js'),'// Derived from Schema.org vocabulary (CC BY-SA 3.0). See SCHEMA-ATTRIBUTION.txt.\nexport const vocabulary = '+JSON.stringify(data)+';\n');
console.log('Bundled vocabulary:',data.version,Object.keys(data.classes).length,'classes',data.properties.length,'properties',Object.keys(data.enumerations).length,'enumeration values',Object.keys(data.rules).length,'domain/range rule definitions');

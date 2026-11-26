"""In-memory Chromium DOM UI test using mocked Chrome APIs; not an extension toolbar test.
Requires Python playwright and Chromium. No HTTP server or network access.
"""
from pathlib import Path
import base64, json, re
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]/'extension'
page_data={'url':'https://example.org/','baseUrl':'https://example.org/','title':'Example','language':'hu','canonical':['https://example.org/'],'hreflang':[],'robots':[],'totalBlocks':2,'blocks':[{'index':1,'raw':json.dumps({'@context':'https://schema.org','@type':'Person','@id':'#person','name':'Test','hibasTulajdonsag':'x','worksFor':{'@type':'Product','name':'Item'},'sameAs':'#person'})},{'index':2,'raw':'{invalid'}]}
html=(root/'popup.html').read_text().replace('<link rel="stylesheet" href="popup.css">','<style>'+(root/'popup.css').read_text()+'</style>').replace('<script type="module" src="popup.js"></script>','').replace('src="icons/icon48.png"','src="data:image/png;base64,'+base64.b64encode((root/'icons/icon48.png').read_bytes()).decode()+'"')
# Isolate each original module exactly as an ES module would isolate its declarations.
def module(name,imports,exports):
 s=(root/name).read_text();s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport (?=(?:const|function) )','',s)
 return '(function(){\n'+imports+'\n'+s+'\nreturn '+exports+';\n})();\n'
code='const voc='+module('vocabulary.js','','{vocabulary}')+'const validation='+module('validate.js','const V=voc.vocabulary;','{validateReport}')+'const core='+module('core.js','const {validateReport}=validation;','{readPage,inspect}')+module('popup.js','const {readPage,inspect}=core;','{}')
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'],timeout=10000)
 for lang in ['hu','en']:
  context=browser.new_context(viewport={'width':510,'height':600},locale=lang,accept_downloads=True)
  page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html)
  page.evaluate(f'''Object.defineProperty(window,'chrome',{{value:{{i18n:{{getUILanguage:()=>{json.dumps(lang)}}},tabs:{{query:async()=>[{{id:1,url:'https://example.org/'}}]}},scripting:{{executeScript:async()=>[{{result:{json.dumps(page_data)}}}]}}}}}});''')
  page.add_script_tag(content=code);page.locator('#results').wait_for(state='visible',timeout=5000)
  assert page.locator('#checkErrors').inner_text()=='1';assert int(page.locator('#checkWarnings').inner_text())>=2;assert page.locator('#checkInfo').inner_text()=='1';assert '1538' in page.locator('#coverage').inner_text()
  assert page.locator('#findings .finding.error').count()==1
  page.locator('#findingFilter').select_option('warning');assert page.locator('#findings .finding.error').count()==0
  page.locator('#tab-json').click();assert page.locator('#rawJson').input_value().startswith('{');page.locator('#blockSelect').select_option('1');assert 'invalid' in page.locator('#rawJson').input_value()
  page.locator('#tab-entities').click();assert page.locator('#metricEntities').inner_text()=='2'
  page.locator('#tab-page').click();assert 'example.org' in page.locator('#pageDetails').inner_text()
  page.locator('#tab-validation').click();page.locator('#findingFilter').select_option('all')
  with page.expect_download(timeout=5000) as dl:page.locator('#saveReport').click()
  data=json.loads(Path(dl.value.path()).read_text());assert data['validation']['vocabulary']['domainRangeRules']==309
  if lang=='hu':page.screenshot(path=str(root.parent/'publication'/'QA-popup-mock-hu.png'),full_page=True)
  assert not errors,errors
  print(f'PASS {lang}: rendering, validation filter, tabs, raw JSON, local report download; no page errors')
  context.close()
 browser.close()

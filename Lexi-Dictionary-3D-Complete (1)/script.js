const API='https://api.dictionaryapi.dev/api/v2/entries/en/';
const form=document.getElementById('form'),input=document.getElementById('input'),results=document.getElementById('results');
let timer;
form.addEventListener('submit',e=>{e.preventDefault();const w=input.value.trim();if(w)lookup(w)});
input.addEventListener('input',()=>{clearTimeout(timer);const w=input.value.trim();if(w.length>=3)timer=setTimeout(()=>lookup(w),600)});
document.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{input.value=b.dataset.word;lookup(b.dataset.word)});
async function lookup(word){
 results.innerHTML='<div class="state"><div class="loader"></div><h2>Looking it up…</h2><p>Fetching meanings and pronunciation.</p></div>';
 try{const r=await fetch(API+encodeURIComponent(word));if(!r.ok)throw Error();const data=await r.json();render(data[0])}
 catch(e){results.innerHTML=`<div class="state"><div style="font-size:45px">⌁</div><h2>“${esc(word)}” wasn't found</h2><p>Check the spelling and try another word.</p></div>`}
}
function render(d){
 const phon=d.phonetic||d.phonetics?.find(x=>x.text)?.text||'Phonetic unavailable';
 const audio=d.phonetics?.find(x=>x.audio)?.audio;
 const meanings=d.meanings.map((m,i)=>`<article class="meaning" style="animation-delay:${i*70}ms"><span class="part">${esc(m.partOfSpeech||'meaning')}</span><div class="defs">${(m.definitions||[]).map((x,j)=>`<div class="def"><span class="num">${j+1}</span><div><p class="definition">${esc(x.definition||'')}</p>${x.example?`<p class="example">“${esc(x.example)}”</p>`:''}${x.synonyms?.length?`<p class="syn"><b>Synonyms:</b> ${esc(x.synonyms.join(', '))}</p>`:''}</div></div>`).join('')}</div></article>`).join('');
 results.innerHTML=`<article class="card"><div class="head"><div><h2 class="word">${esc(d.word)}</h2><p class="phonetic">${esc(phon)}</p></div>${audio?'<button class="audio" id="audio" title="Play pronunciation">▶</button>':''}</div><div class="meanings">${meanings}</div><div class="source">Source: ${d.sourceUrls?.[0]?`<a href="${attr(d.sourceUrls[0])}" target="_blank">Free Dictionary</a>`:'Free Dictionary API'}</div></article>`;
 if(audio)document.getElementById('audio').onclick=()=>new Audio(audio).play().catch(()=>{});
}
function esc(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function attr(v){return String(v).replaceAll('"','&quot;')}
import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport:{width:1366,height:768} });
await p.goto('http://localhost:3000/robotics',{waitUntil:'load'});
await p.waitForTimeout(2500);
const info = await p.evaluate(()=>{
  const v=document.querySelector('video');
  const sec = v ? (v.closest('section')||v.parentElement) : null;
  return {
    hasVideo: !!v,
    videoHasSrc: v ? (v.currentSrc||v.getAttribute('src')||'NONE') : 'no-video-el',
    sectionTop: sec ? Math.round(sec.getBoundingClientRect().top+window.scrollY) : null,
    viewportH: window.innerHeight,
    docH: document.documentElement.scrollHeight,
  };
});
console.log('VIDPOS', JSON.stringify(info));
await b.close();

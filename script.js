// ===== Countdown target: NEXT January 1 at 00:00:00 (local device time) =====
(function(){
  const now = new Date();
  const jan1ThisYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  let targetYear = now >= jan1ThisYear ? now.getFullYear() + 1 : now.getFullYear();
  window.MYC_TARGET = new Date(targetYear, 0, 1, 0, 0, 0, 0);
})();

// ===== Utilities =====
const $ = (sel) => document.querySelector(sel);
const pad = (n) => String(n).padStart(2, '0');

// ===== Countdown =====
function tick(){
  const remaining = window.MYC_TARGET.getTime() - Date.now();
  const daysEl = $('#days');
  const hoursEl = $('#hours');
  const minutesEl = $('#minutes');
  const secondsEl = $('#seconds');

  if (remaining <= 0){
    enableJoin();
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(remaining/1000);
  const d = Math.floor(totalSeconds/86400);
  const h = Math.floor((totalSeconds%86400)/3600);
  const m = Math.floor((totalSeconds%3600)/60);
  const s = Math.floor(totalSeconds%60);

  daysEl.textContent = pad(d);
  hoursEl.textContent = pad(h);
  minutesEl.textContent = pad(m);
  secondsEl.textContent = pad(s);
}

// ===== Join button control =====
function enableJoin(){
  const btn = $('#joinBtn');
  const hint = $('#joinHint');
  if (!btn) return;
  btn.disabled = false;
  btn.classList.add('btn--primary');
  if (hint) {
    hint.textContent = 'Season 1 is LIVE — welcome in!';
    hint.classList.add('neon');
  }
  showToast('Join is now open. Tap to enter!');
}

function handleJoinClick(){
  const name = prompt('Your name?');
  if (!name) return;
  const school = prompt('Your school? (optional)');
  const interest = prompt('What are you into? (music, code, art...)');
  showToast(`Welcome, ${name}! We\'ll be in touch. ✨`);
}

// ===== Toast =====
function showToast(msg){
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 2600);
}

// ===== Events placeholders =====
const EVENTS = [
  { title: 'Event Coming Soon', date: 'TBA', time: 'TBA', place: 'Miri', tag: 'TBA', desc: 'Our first official MYC event will be revealed soon. Stay tuned.' },
  { title: 'New Event Drops Soon', date: 'TBA', time: 'TBA', place: 'TBA', tag: 'Season 1', desc: 'We\'re cooking something big for Season 1 — details on launch.' }
];

function renderEvents(){
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  grid.innerHTML = EVENTS.map(ev => `
    <article class="card">
      <h3 class="card__title">${ev.title}</h3>
      <div class="meta">
        <span class="badge">${ev.tag}</span>
        <span>${ev.date}</span>
        <span>${ev.time}</span>
        <span>• ${ev.place}</span>
      </div>
      <p>${ev.desc}</p>
    </article>
  `).join('');
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Countdown
  tick();
  const interval = setInterval(() => {
    tick();
    if (Date.now() >= window.MYC_TARGET.getTime()){
      enableJoin();
      clearInterval(interval);
    }
  }, 1000);

  // Join button behaviour
  const joinBtn = document.getElementById('joinBtn');
  if (joinBtn) joinBtn.addEventListener('click', handleJoinClick);

  // If already past target at load time, unlock instantly
  if (Date.now() >= window.MYC_TARGET.getTime()) enableJoin();

  // Render events
  renderEvents();
});
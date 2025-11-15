
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const typedEl = document.getElementById('typed');
const reveals = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('yr');

if(yearEl) yearEl.textContent = new Date().getFullYear();

const THEME_KEY = 'portfolio-theme';
function applyTheme(isLight){
  if(isLight) body.classList.add('light-theme');
  else body.classList.remove('light-theme');
}
const savedTheme = localStorage.getItem(THEME_KEY);
if(savedTheme === 'light') applyTheme(true);
else applyTheme(false);

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-theme');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
});

const phrases = [
  'Cybersecurity • Developer • Lecturer',
  'VAPT • Intrusion Detection • Secure Systems',
  'Java • C++ • MySQL • Linux'
];

let pi = 0, ci = 0, forward = true;
function typeTick(){
  const text = phrases[pi];
  if(forward){
    ci++;
    if(ci > text.length){ forward = false; setTimeout(typeTick, 1200); return; }
  } else {
    ci--;
    if(ci < 0){ forward = true; pi = (pi+1) % phrases.length; setTimeout(typeTick, 200); return; }
  }
  if(typedEl) typedEl.textContent = text.slice(0, ci);
  setTimeout(typeTick, forward ? 80 : 35);
}
setTimeout(typeTick, 600);

const revealOnScroll = () => {
  for(const el of reveals){
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) el.classList.add('active');
  }
};
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.querySelectorAll('.project-card').forEach(pc => {
  pc.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' || e.key === ' ') pc.classList.toggle('keyboard-active');
  });
});

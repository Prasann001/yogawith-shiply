// --- breathing label sync (4s in / 4s out, matches .breath-orb animation) ---
const breathLabel = document.getElementById('breathLabel');
if (breathLabel) {
  let breathingIn = true;
  setInterval(() => {
    breathLabel.style.opacity = '0';
    setTimeout(() => {
      breathingIn = !breathingIn;
      breathLabel.textContent = breathingIn ? 'Breathe in' : 'Breathe out';
      breathLabel.style.opacity = '1';
    }, 300);
  }, 4000);
}

// --- scroll reveal ---
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

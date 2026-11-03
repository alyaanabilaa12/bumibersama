const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const modal = document.getElementById('volunteerModal');
const openForm = document.getElementById('openForm');
const closeForm = document.getElementById('closeForm');
const modalBackdrop = document.getElementById('modalBackdrop');
const volunteerForm = document.getElementById('volunteerForm');
const formSuccess = document.getElementById('formSuccess');
const doneForm = document.getElementById('doneForm');

function showModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('nama').focus(), 80);
}
function hideModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
openForm.addEventListener('click', showModal);
closeForm.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);
doneForm.addEventListener('click', () => {
  hideModal();
  volunteerForm.reset();
  volunteerForm.hidden = false;
  formSuccess.hidden = true;
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) hideModal(); });

volunteerForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!volunteerForm.reportValidity()) return;
  volunteerForm.hidden = true;
  formSuccess.hidden = false;
});

// Simple scroll reveal, with a no-JS-friendly default.
const revealTargets = document.querySelectorAll('.value-card, .issue-card, .program-item, .gallery-photo');
if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal-ready'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
}

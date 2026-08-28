const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isThai = document.documentElement.lang === 'th';

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('theme');
} catch {
  // The toggle still works if browser storage is unavailable.
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isThai ? `เปลี่ยนเป็นโหมด${isDark ? 'สว่าง' : 'มืด'}` : `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeLabel.textContent = isThai ? (isDark ? 'สว่าง' : 'มืด') : (isDark ? 'Light' : 'Dark');
}

if (themeToggle) {
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // The selected theme remains active for this visit.
    }
    applyTheme(nextTheme);
  });
}

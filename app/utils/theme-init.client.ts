// This file contains client-side theme initialization logic
export function initializeTheme() {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }
  document.documentElement.classList.add(theme);
}

if (typeof window !== 'undefined') {
  initializeTheme();
} 
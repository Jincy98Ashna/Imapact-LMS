
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('#main-nav');
  
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.textContent = '☰';
      });
    });
    document.body.classList.add(
      'ontouchstart' in window || navigator.maxTouchPoints 
        ? 'touch-device' 
        : 'no-touch'
    );
  });
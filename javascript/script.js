function toggleLanguage() {
    const switcher = document.querySelector('.lang-switch');
    const en = document.getElementById('lang-en');
    const de = document.getElementById('lang-de');

    switcher.classList.toggle('switch-de');
    en.classList.toggle('active');
    de.classList.toggle('active');
}
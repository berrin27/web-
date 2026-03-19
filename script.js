// LANGUAGE SWITCHER
let currentLanguage = localStorage.getItem('language') || 'tr';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
    updateLangBtn();
}

function updateLanguage() {
    // Text content için
    const elements = document.querySelectorAll('[data-tr][data-en]');
    elements.forEach(el => {
        const text = currentLanguage === 'tr' ? el.getAttribute('data-tr') : el.getAttribute('data-en');
        if (text) {
            el.textContent = text;
        }
    });
    
    // HTML content (br tags vp.) için
    const htmlElements = document.querySelectorAll('[data-tr-html][data-en-html]');
    htmlElements.forEach(el => {
        const html = currentLanguage === 'tr' ? el.getAttribute('data-tr-html') : el.getAttribute('data-en-html');
        if (html) {
            el.innerHTML = html;
        }
    });
}

function updateLangBtn() {
    const btn = document.querySelector('.lang-btn');
    if (btn) btn.textContent = currentLanguage === 'tr' ? '🌐 EN' : '🌐 TR';
}

// Page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    updateLangBtn();
});

// TYPEWRITER EFFECT
const textElement = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// PARALLAX EFFECT
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        const scrolled = window.pageYOffset;
        header.style.backgroundPosition = `57% ${50 - scrolled * 0.5}%`;
    }
});

// CERTIFICATE LIGHTBOX
function showCertificate(url) {
    const overlay = document.createElement('div');
    overlay.style = `position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                     background: rgba(0,0,0,0.9); display: flex; align-items: center;
                     justify-content: center; z-index: 9999; cursor: pointer;`;
    
    const img = document.createElement('img');
    img.src = url;
    img.style = "max-width: 90%; max-height: 85%; border: 2px solid white; border-radius: 10px;";
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.onclick = () => overlay.remove();
}

document.addEventListener('DOMContentLoaded', type);
function toggleMode() {
    // Body'ye dark-mode sınıfını ekler veya çıkarır
    document.body.classList.toggle('dark-mode');
    
    // Kullanıcın tercihini hafızaya alalım (Sayfa yenilense de bozulmasın)
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
}

// Sayfa yüklendiğinde kullanıcının eski tercihini hatırla
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
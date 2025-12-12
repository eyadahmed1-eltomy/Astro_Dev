// تهيئة مكتبة الحركات AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// قائمة الموبايل
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// وظيفة التنقل السلس (Scroll to Section)
function tpFunc(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(current)) {
            link.classList.add('active');
        }
    });

    // Toggle a class for navbar when scrolled (use CSS for colors)
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// تأثير ثلاثي الأبعاد بسيط للكروت (Tilt Effect Simple)
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});


// Dark Mode Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');

// Helper to set theme
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'false');
    }
}

// Initialize Theme
function initTheme() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'true') {
        setTheme(true);
    } else if (savedMode === 'false') {
        setTheme(false);
    } else {
        // Default to system preference
        setTheme(prefersDark);
    }
}

// Event Listener for Toggle
themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(!isDark);
});

// Initialize on load
initTheme();

// Listen for system changes (only if no manual override)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
        setTheme(e.matches);
    }
});

// Accent toggle (changes primary/secondary/accent) via settings H3
function initAccent() {
    const saved = localStorage.getItem('accentAlt');
    if (saved === 'true') {
        document.body.classList.add('accent-alt');
    } else {
        document.body.classList.remove('accent-alt');
    }
    // attach click handler to settings H3 (if present)
    const settingsHeader = document.querySelector('.settings-content h3');
    if (settingsHeader) {
        settingsHeader.style.cursor = 'pointer';
        settingsHeader.addEventListener('click', () => {
            const enabled = document.body.classList.toggle('accent-alt');
            localStorage.setItem('accentAlt', enabled ? 'true' : 'false');
        });
    }
}

initAccent();

function sendEmail() {
    let params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        time: new Date().toISOString(),
    };

    emailjs.send("service_u8ka2p8","template_2x15fr8",params)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}

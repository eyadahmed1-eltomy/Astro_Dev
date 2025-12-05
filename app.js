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

// تأثير المؤشر (Custom Cursor)
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function (e) {
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
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


// Dark Mode Toggle with System Preference
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check system preference and localStorage
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Priority: localStorage > system preference
    if (savedMode !== null) {
        if (savedMode === 'true') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            darkModeToggle.checked = true;
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            darkModeToggle.checked = false;
        }
    } else if (prefersDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeToggle.checked = true;
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }
}

// Initialize on page load
initDarkMode();

// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
    document.getElementsByClassName('settings-content')[0].classList.remove('settings-active');
    if (darkModeToggle.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('darkMode', 'false');
    }
});

// Listen for system color scheme changes
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeQuery.addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (localStorage.getItem('darkMode') === null) {
        if (e.matches) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            darkModeToggle.checked = false;
        }
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
(function(){
    const toggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;

    const apply = theme => document.documentElement.setAttribute('data-theme', theme);
    apply(isDark ? 'dark' : 'light');
    toggle.checked = isDark;

    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        apply(theme);
        localStorage.setItem('theme', theme);
    });
})();

// Small interactive bits: form handling and year
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const status = document.getElementById('status');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
        status.textContent = 'Please complete all fields.';
        return;
    }

    // Replace with your preferred backend endpoint or service
    // For now we open the user's email client as a fallback:
    const mailto = `mailto:you@example.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\\n\\n' + 'From: ' + name + ' <' + email + '>')}`;
    window.location.href = mailto;
    status.textContent = 'Opening email client…';
});
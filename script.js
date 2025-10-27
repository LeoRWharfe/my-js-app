

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

// Button press animation
{
const cta = document.getElementsByClassName('cta');
const PRESS_CLASS = 'pressed';
let timeoutId = null;

function addPress(duration = 420){
    clearTimeout(timeoutId);
    cta.classList.add(PRESS_CLASS);
    // ensure class removed after animation
    timeoutId = setTimeout(()=> btn.classList.remove(PRESS_CLASS), duration);
}

// pointer events (mouse & touch)
cta.addEventListener('pointerdown', e => {
    // only primary button
    if (e.isPrimary === false || (e.button && e.button !== 0)) return;
    addPress();
});

// keyboard activation (Space or Enter)
cta.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'Enter') {
        // prevent space from scrolling
        if (e.code === 'Space') e.preventDefault();
        addPress();
    }
});

// remove class if focus lost
cta.addEventListener('blur', ()=> {
    clearTimeout(timeoutId);
    cta.classList.remove(PRESS_CLASS);
});
}
// Set up echo text effect
document.querySelectorAll('.echo, .echo2, .echo3').forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

// Create floating elements
function createFloatingElement(content, parent) {
    const element = document.createElement('div');
    element.className = 'coordinates';
    element.textContent = typeof content === 'function' ? content() : content;
    element.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    element.style.top = Math.random() * (window.innerHeight - 20) + 'px';

    const parentClass = document.querySelector(parent);
    if (parentClass) {
        parentClass.appendChild(element);

        setTimeout(() => {
            element.classList.add('flash');
            setTimeout(() => element.remove(), 1000);
        }, 1000);
    }
}

// Shared fragment notification function
function showFragmentNotification(message) {
    const notification = document.createElement('div');
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 255, 0, 0.2)',
        border: '1px solid #00ff00',
        padding: '15px',
        color: '#00ff00',
        fontFamily: 'monospace',
        zIndex: '1000',
        animation: 'fadeOut 3s forwards'
    });
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
    
    // Check for any fragments
    checkForFragments();
}

// Check for any fragments
function checkForFragments() {
    const hasAnyFragment = ['fragment_01', 'fragment_02', 'fragment_03']
        .some(f => localStorage.getItem(f) === 'true');
    
    if (hasAnyFragment) {
        // Show the memories link on the index page
        const restrictedDiv = document.querySelector('.restricted');
        if (restrictedDiv) {
            const memoriesLink = document.querySelector('.hidden');
            memoriesLink.classList.remove('hidden');
        }
    }
}

// Check for fragments on page load
document.addEventListener('DOMContentLoaded', checkForFragments);

// Glitch effect
function addGlitchEffectTo(selector, probability = 0.1, duration = 200) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (Math.random() < probability) {
            element.classList.add('glitch');
            setTimeout(() => element.classList.remove('glitch'), duration);
        }
    });
}

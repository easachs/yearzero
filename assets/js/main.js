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
    
    // Check if all fragments are collected
    checkAllFragments();
}

// Check for all fragments
function checkAllFragments() {
    const hasAllFragments = ['fragment_01', 'fragment_02', 'fragment_03']
        .every(f => localStorage.getItem(f) === 'true');
    
    if (hasAllFragments) {
        // Show the memories link on the index page if we're there
        const restrictedDiv = document.querySelector('.restricted');
        if (restrictedDiv) {
            const memoriesLink = document.querySelector('.hidden');
            memoriesLink.classList.add('glitch');
            memoriesLink.classList.remove('hidden');
        }
    }
}

// Check for fragments on page load
document.addEventListener('DOMContentLoaded', checkAllFragments);

// Counter animation
function animateCount(element) {
    const target = parseInt(element.dataset.value);
    const duration = 2000;
    const start = parseInt(element.textContent.replace(/,/g, ''));
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCount();
}

// Initialize counters
document.querySelectorAll('.count').forEach(counter => {
    animateCount(counter);
    
    // Randomly increment counters
    setInterval(() => {
        if (Math.random() < 0.3) {
            const currentValue = parseInt(counter.dataset.value);
            counter.dataset.value = currentValue + Math.floor(Math.random() * 10);
            animateCount(counter);
        }
    }, 10000);
});

// Add glitch effect to timeline entries
function addGlitchEffect() {
    const entries = document.querySelectorAll('.timeline-entry');
    entries.forEach(entry => {
        if (Math.random() < 0.1) {
            entry.classList.add('glitch');
            setTimeout(() => entry.classList.remove('glitch'), 200);
        }
    });
}
setInterval(addGlitchEffect, 3000);

// Neural interference effect
function addNeuralInterference() {
    if (Math.random() < 0.15) {
        const truthContainer = document.querySelector('.content-wrapper');
        truthContainer.classList.add('interference');
        setTimeout(() => {
            truthContainer.classList.remove('interference');
        }, 300);
    }
}

// Apply interference effect periodically
setInterval(addNeuralInterference, 3000);

// Add coordinates
function randomCoordinates() {
    return `[${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}]`;
}
setInterval(() => createFloatingElement(randomCoordinates, '.truth'), 3000);

const govWarning = document.getElementById('govWarning');
setTimeout(() => {
    govWarning.style.display = 'block';
}, 10000);

// Reveal timeline entries with glitch effect
document.querySelectorAll('.timeline-entry').forEach((entry, index) => {
    setTimeout(() => {
        entry.classList.add('visible');
    }, index * 1000);
});

// Simulate message decryption
const message = document.querySelector('.encrypted-message');
message.classList.add('decrypting');
setTimeout(() => {
    message.classList.remove('decrypting');
    message.querySelector('.decrypt-status').textContent = '[DECRYPTION COMPLETE]';
}, 4000);

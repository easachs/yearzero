// Reveal journal entries as user scrolls
const entries = document.querySelectorAll('.journal .entry:not(.visible)');
let revealIndex = 0;

// Enhanced Easter eggs and interactions
document.querySelector('.journal').addEventListener('click', e => {
    const entry = e.target.closest('.entry');
});

// Reveal journal entries with better timing
function revealEntry(entry) {
    entry.classList.add('visible');
    setTimeout(() => {
        entry.style.animation = '';
    }, 300);
}

function revealNextEntry() {
    if (revealIndex < entries.length) {
        revealEntry(entries[revealIndex]);
        revealIndex++;
        setTimeout(revealNextEntry, 2000);
    }
}

// Start revealing entries after a delay
setTimeout(revealNextEntry, 2000);

// Add image analysis interaction
document.querySelectorAll('.image-container').forEach(container => {
    container.addEventListener('click', () => {
        container.classList.add('secondary');
        const overlay = container.querySelector('.image-overlay');
        if (!container.dataset.analyzed) {
            container.dataset.analyzed = 'true';
            const analysis = document.createElement('div');
            analysis.className = 'analysis';
            analysis.innerHTML = `
                <div class="scan-line"></div>
                <div class="analysis-data">
                    <p>ANALYZING IMAGE...</p>
                    <p>DETECTING ANOMALIES...</p>
                    <p class="warning">WARNING: UNAUTHORIZED MEMORIES DETECTED</p>
                </div>
            `;
            container.appendChild(analysis);
        }
    });
});

// Add keyboard shortcut for emergency override
let secretCode = '';
document.addEventListener('keydown', e => {
    secretCode += e.key;
    if (secretCode.includes('truth')) {
        // Add fragment collection
        localStorage.setItem('fragment_01', 'true');
        showFragmentNotification('Memory Fragment 01 Recovered: Collapse Record');
        document.querySelectorAll('.corrupted').forEach(el => {
            el.classList.remove('corrupted');
            const timestamp = el.querySelector('.timestamp');
            if (timestamp) timestamp.textContent = '2029-06-01 00:00';
        });
        secretCode = '';
    }
});

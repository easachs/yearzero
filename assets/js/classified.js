function decryptFile(fileElement) {
    const content = fileElement.querySelector('.file-content');
    const status = fileElement.querySelector('.decrypt-status');
    const classification = fileElement.querySelector('.classification').textContent;
    
    // Check if it's an OMEGA file
    if (classification.includes('OMEGA') && !window.omegaAccessGranted) {
        status.textContent = '[DENIED - OMEGA CLEARANCE REQUIRED]';
        status.style.color = 'red';
        
        // Start listening for the secret key sequence if not already
        if (!window.keySequenceStarted) {
            window.keySequenceStarted = true;
            window.currentSequence = '';
            document.addEventListener('keydown', handleKeySequence);
        }
        return;
    }
    
    if (content.classList.contains('encrypted')) {
        // Start decryption animation
        content.classList.remove('encrypted');
        content.classList.add('decrypting');
        status.textContent = '[DECRYPTING...]';
        
        // Add some random characters during decryption
        const textElements = content.querySelectorAll('p, li, h3');
        textElements.forEach(el => {
            if (!el.classList.contains('redacted')) {
                const originalText = el.textContent;
                let iteration = 0;
                
                const interval = setInterval(() => {
                    el.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) return originalText[index];
                            return ['@', '#', '$', '%', '&', '*', '='][Math.floor(Math.random() * 7)];
                        })
                        .join('');
                    
                    iteration += 1/3;
                    
                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                        el.textContent = originalText;
                    }
                }, 30);
            }
        });
        
        // Complete decryption
        setTimeout(() => {
            content.classList.remove('decrypting');
            status.textContent = '[DECRYPTED]';
            status.style.animation = 'none';
            status.style.color = 'rgba(0, 255, 0, 0.8)';
            fileElement.classList.add('declassified');
            // Check if all files are decrypted after each decryption
            allFilesDecrypted();
        }, 2000);
    }
}

function allFilesDecrypted() {
    const allFiles = document.querySelectorAll('.classified-file');
    const allDecrypted = Array.from(allFiles).every(file => 
        file.classList.contains('declassified')
    );
    
    if (allDecrypted) {
        localStorage.setItem('fragment_02', 'true');
        showFragmentNotification('Memory Fragment 02 Recovered: Neural Archive');
    }
}

// Secret key sequence handler
function handleKeySequence(e) {
    window.currentSequence += e.key.toLowerCase();
    
    // Check for the secret password "virtue"
    if (window.currentSequence.includes('virtue')) {
        window.omegaAccessGranted = true;
        document.removeEventListener('keydown', handleKeySequence);
        
        // Visual feedback
        document.body.style.backgroundColor = '#ff000033';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
            document.querySelector('.classified').insertAdjacentHTML('afterbegin', 
                '<div class="access-granted">[VIRTUE PROTOCOL ACCEPTED - OMEGA ACCESS GRANTED]</div>');
        }, 500);
    }
    
    // Reset sequence if too long
    if (window.currentSequence.length > 20) window.currentSequence = '';
}

// Initialize all interactive features
function initClassified() {
    // Add glitch effect on redacted text hover
    document.querySelectorAll('.redacted').forEach(el => {
        el.addEventListener('mouseover', handleRedactedHover);
        el.addEventListener('click', handleRedactedClick);
    });
}

// Handle redacted text hover effect
function handleRedactedHover() {
    if (Math.random() < 0.3) {
        const files = document.querySelectorAll('.classified-file');
        files.forEach(file => {
            file.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            setTimeout(() => file.style.transform = 'none', 100);
        });
    }
}

// Track redacted text click patterns
let redactedClickPattern = [];
function handleRedactedClick() {
    redactedClickPattern.push(this);
    if (redactedClickPattern.length === 3) {
        checkRedactedPattern();
        redactedClickPattern = [];
    }
}

// Check if clicked redacted texts are in same file
function checkRedactedPattern() {
    const allFromSameFile = redactedClickPattern.every(el => 
        el.closest('.classified-file') === redactedClickPattern[0].closest('.classified-file'));
    
    if (allFromSameFile) {
        const file = redactedClickPattern[0].closest('.classified-file');
        revealRedactedContent(file);
    }
}

// Visual effect for revealing redacted content
function revealRedactedContent(file) {
    file.style.borderColor = '#00ff00';
    setTimeout(() => {
        document.querySelectorAll('.redacted').forEach(r => {
            if (r.closest('.classified-file') === file) {
                r.style.background = 'rgba(0, 255, 0, 0.5)';
            }
        });
    }, 1000);
}

// Initialize everything
initClassified();

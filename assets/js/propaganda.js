// Resistance hack timing
setTimeout(() => {
    document.querySelector('.resistance-hack').classList.add('active');
    
    // Countdown timer
    let timeLeft = 15;
    const countdown = document.querySelector('.countdown');
    window.hackTimer = setInterval(() => {
        timeLeft--;
        countdown.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(window.hackTimer);
            document.querySelector('.resistance-hack').classList.remove('active');
            enablePosterReveal();
        }
    }, 1000);
}, 10000);

// Function to enable poster clicking after hack
function enablePosterReveal() {
    document.querySelectorAll('.poster-container').forEach(poster => {
        poster.addEventListener('click', () => {
            if (!poster.classList.contains('revealed')) {
                poster.classList.add('revealed');
                // Get the current poster number and switch to resistance version
                const img = poster.querySelector('img');
                const posterNum = img.src.match(/\/(\d+)\.jpg$/)[1];
                img.src = img.src.replace('/propaganda/', '/resistance/');
            }
        });
    });
}

// Use glitch effect on resistance hack
setInterval(() => addGlitchEffectTo('.resistance-message'), 3000);

// Allow clicking outside hack content to close early
document.querySelector('.resistance-hack').addEventListener('click', e => {
    if (!e.target.closest('.hack-content')) {
        document.querySelector('.resistance-hack').classList.remove('active');
        clearInterval(window.hackTimer);
        enablePosterReveal();
    }
});

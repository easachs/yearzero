// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timestamp = document.querySelector('.timestamp');
    timestamp.textContent = now.toTimeString().split(' ')[0];
}
setInterval(updateTimestamp, 1000);

// Add glitch effect on load
document.querySelector('.error-content').classList.add('glitch');
setTimeout(() => {
    document.querySelector('.error-content').classList.remove('glitch');
}, 500);

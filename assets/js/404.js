// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const timestamp = document.querySelector('.timestamp');
    timestamp.textContent = now.toTimeString().split(' ')[0];
}
setInterval(updateTimestamp, 1000);

// Add glitch effect on load
document.querySelector('.error').classList.add('glitch');
setTimeout(() => {
    document.querySelector('.error').classList.remove('glitch');
}, 1000);

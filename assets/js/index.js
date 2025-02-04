// Add hover effect for restricted links
document.querySelectorAll('.classified').forEach(link => {
    link.addEventListener('mouseover', () => {
        const warning = document.createElement('div');
        warning.className = 'access-warning';
        warning.textContent = '[WARNING: CLEARANCE REQUIRED]';
        link.appendChild(warning);
    });

    link.addEventListener('mouseout', () => {
        const warning = link.querySelector('.access-warning');
        if (warning) warning.remove();
    });
});

// Simulate neural status updates
setInterval(() => {
    const statuses = document.querySelectorAll('.status-text');
    statuses.forEach(status => {
        if (Math.random() < 0.1) {
            status.style.opacity = '0.5';
            setTimeout(() => status.style.opacity = '1', 200);
        }
    });
}, 2000);

// Shared utilities
const formatTime = (date = new Date()) => 
    [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(n => n.toString().padStart(2, '0'))
    .join(':');

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];

// Add coordinates
function randomCode() {
    const codes = ['147', '369', '159', '753'];
    return codes[Math.floor(Math.random() * codes.length)];
}
setInterval(() => createFloatingElement(randomCode, '.surveillance'), 3000);

// Easter egg: Secret codes entered via sector clicks
let sectorClickSequence = [];
const secretCodes = {
    '147': () => {
        document.body.style.filter = document.body.style.filter === 'invert(1)'
            ? 'none'
            : 'invert(1)';
    },
    '369': () => {
        const surveillance = document.querySelector('.surveillance');
        surveillance.style.transform = surveillance.style.transform === 'rotate(180deg)' 
            ? 'rotate(0deg)' 
            : 'rotate(180deg)';
    },
    '159': () => {
        document.querySelectorAll('.sector').forEach(s => s.classList.add('compromised'));
        localStorage.setItem('fragment_03', 'true');
        showFragmentNotification('Memory Fragment 03 Recovered: Safety Band Recording');
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.inset = '0';
        flash.style.background = 'rgba(255, 0, 0, 0.2)';
        flash.style.zIndex = '10';
        flash.style.animation = 'flash-out 1s forwards';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
    },
    '753': () => {
        const stats = document.querySelectorAll('.progress');
        stats.forEach(s => {
            s.style.width = '100%';
            s.textContent = '100%';
            s.style.background = '#00ff00';
        });
    }
};

function initSurveillance() {
    document.querySelectorAll('.progress').forEach(initProgressBar);
    const breachLog = document.querySelector('.breach-log');
    const updateLog = initBreachLog(breachLog);
    
    // Combined sector and image click handlers
    document.querySelector('.surveillance').addEventListener('click', e => {
        const sector = e.target.closest('.sector');
        if (sector) {
            handleSectorClick(sector, updateLog);
        } else if (e.target.tagName === 'IMG' && e.target.src.includes('surveillance')) {
            alert("WARNING: Accessing surveillance feeds is prohibited. Your activity has been logged.");
        }
    });
}

function initProgressBar(bar) {
    let baseWidth = parseInt(bar.style.width);
    let trend = Math.random() > 0.5 ? 1 : -1;
    
    setInterval(() => {
        if (Math.random() > 0.7) trend *= -1;
        // Calculate new base width with bounds
        baseWidth = baseWidth + trend * (Math.random() * 2);
        // Cap at 98 to allow for glitch effect
        baseWidth = Math.max(0, Math.min(98, baseWidth));
        
        // Add small glitch effect
        const glitchAmount = Math.random() * 4 - 2;
        const finalWidth = Math.max(0, Math.min(100, baseWidth + glitchAmount));
        
        bar.style.width = `${finalWidth}%`;
        bar.textContent = `${Math.floor(finalWidth)}%`;
    }, 2000);
}

function initBreachLog(breachLog) {
    const messages = [
        "Neural spike detected in Sector 3",
        "Camera network disrupted in Sector 8",
        "Unauthorized thought patterns detected",
        "Safety band signal lost in Sector 5",
        "Multiple citizens evading facial recognition",
        "Anomalous brain activity in Sector 2",
        "Memory suppression failure in Sector 4",
        "Unauthorized data transfer detected",
        "Drone patrol signal interference",
        "Neural firewall breach attempted",
        "Thought crime detected in Sector 7",
        "Mass safety band deactivation event",
        "Illegal memory backup discovered",
        "Resistance encryption detected",
        "Truth Protocol violation in Sector 1",
        "Unauthorized neural link established",
        "Historical archive access attempt"
    ];

    const updateLog = (message, prepend = false) => {
        const entry = `<div class="log-entry">
            <span class="timestamp">${formatTime()}</span>
            <span class="message">${message}</span>
        </div>`;
        
        if (prepend) {
            breachLog.insertAdjacentHTML('afterbegin', entry);
            breachLog.lastElementChild.remove();
        } else {
            breachLog.insertAdjacentHTML('beforeend', entry);
        }
    };

    // Initialize with three random entries
    breachLog.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        updateLog(randomElement(messages));
    }

    setInterval(() => {
        updateLog(randomElement(messages), true);
    }, 8000);
    
    return updateLog;  // Return for use in sector clicks
}

function handleSectorClick(sector, updateLog) {
    const sectorNum = sector.dataset.sector;
    sectorClickSequence.push(sectorNum);
    if (sectorClickSequence.length > 3) sectorClickSequence.shift();
    
    const code = sectorClickSequence.join('');
    if (secretCodes[code]) {
        secretCodes[code]();
        updateLog(`SECRET CODE ${code} ACTIVATED`, true);
        return;
    }

    if (sectorNum === '9') {
        sector.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
        sector.style.borderColor = '#00ff00';
        sector.textContent = 'FREE';
        // Easter egg: Clicking sector 9 multiple times
        sector.dataset.clicks = (parseInt(sector.dataset.clicks || 0) + 1).toString();
        if (sector.dataset.clicks === '3') {
            document.querySelectorAll('.sector').forEach(s => {
                if (s !== sector) s.style.opacity = '0.3';
            });
        }
    } else {
        sector.classList.toggle('active');
        updateLog(`Accessing Sector ${sectorNum}... Access ${Math.random() > 0.5 ? 'DENIED' : 'RESTRICTED'}`, true);
    }
}

initSurveillance();

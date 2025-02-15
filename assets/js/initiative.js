document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carouselItem = document.querySelector('.carousel-item');
    const carouselImg = carouselItem.querySelector('img');
    const images = ['02.jpg', '03.jpg', '01.jpg'];
    let currentImage = 0;
    
    function updateCarousel() {
        carouselImg.src = carouselImg.src.replace(/\d{2}\.jpg$/, images[currentImage]);
        currentImage = (currentImage + 1) % images.length;

    }
    
    // Start carousel
    setTimeout(() => {
        updateCarousel();
        setInterval(updateCarousel, 4000);
    }, 4000);

    // Add neural interference effect occasionally
    function addInterference() {
        if (Math.random() < 0.1) {
            const carousel = document.querySelector('.carousel');
            carousel.classList.add('interference');
            setTimeout(() => carousel.classList.remove('interference'), 300);
        }
    }
    setInterval(addInterference, 5000);

    // Quiz functionality with hidden fragment
    let failedAttempts = 0;
    const form = document.getElementById('form');
    const result = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const resultText = document.getElementById('result-text');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const answers = ['q1', 'q2', 'q3', 'q4'].map(q => 
            document.querySelector(`input[name="${q}"]:checked`)?.value
        );
        const score = answers.filter(answer => answer === 'yes').length;
        
        result.classList.remove('hidden');
        scoreElement.textContent = `${score}/4`;
        
        // Hidden fragment trigger
        if (score === 0) {
            failedAttempts++;
            if (failedAttempts === 2) {
                localStorage.setItem('fragment_04', 'true');
                showFragmentNotification("Memory Fragment 04 Recovered: Enforcer's Log");
            }
        }

        if (score === 4) {
            resultText.innerHTML = `<span class="echo">Congratulations!</span> You are a model citizen. Your dedication to <span class="echo2">virtue</span> will be rewarded. Welcome to the <span class="echo3">Enclave</span>.`;
        } else if (score === 3) {
            resultText.textContent = "Warning: Deviation detected. Immediate re-education is recommended.";
        } else {
            resultText.textContent = "ALERT: High deviation detected. An Enforcer has been dispatched to your location.";
        }
    });
});

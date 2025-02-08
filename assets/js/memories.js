// Verify all fragments are collected
if (!['fragment_01', 'fragment_02', 'fragment_03']
    .every(f => localStorage.getItem(f) === 'true')) {
    window.location.href = '{{ site.baseurl }}/';
}

// Use glitch effect on memories
setInterval(() => addGlitchEffectTo('p'), 3000);

// Neural interference effect
function addNeuralInterference() {
    if (Math.random() < 0.15) {
        const memoriesContainer = document.querySelector('.content-wrapper');
        memoriesContainer.classList.add('interference');
        setTimeout(() => {
            memoriesContainer.classList.remove('interference');
        }, 300);
    }
}

// Apply interference effect periodically
setInterval(addNeuralInterference, 3000);

// Set up collapsible fragments
document.addEventListener('DOMContentLoaded', () => {
    const fragments = document.querySelectorAll('.memory-fragment');
    
    fragments.forEach(fragment => {
        const header = fragment.querySelector('h2');
        const content = fragment.querySelector('.fragment-content');
        
        // Add click handler
        header.addEventListener('click', () => {
            header.classList.toggle('open');
            content.classList.toggle('open');
        });
    });
});

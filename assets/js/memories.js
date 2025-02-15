// Verify at least one fragment is collected
if (!['fragment_01', 'fragment_02', 'fragment_03', 'fragment_04']
    .some(f => localStorage.getItem(f) === 'true')) {
    const baseurl = document.querySelector('.content-wrapper').dataset.baseurl;
    window.location.href = `${baseurl}/404`;
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
    let visibleFragments = 0;
    
    fragments.forEach(fragment => {
        const fragmentId = fragment.id;
        // IDs now match localStorage keys exactly
        const storageKey = fragmentId;
        
        if (!localStorage.getItem(storageKey)) {
            fragment.style.display = 'none';
        } else {
            visibleFragments++;
        }
    });
    
    // Show message if no fragments are visible
    const noFragmentsMessage = document.getElementById('no-fragments-message');
    if (noFragmentsMessage) {
        noFragmentsMessage.style.display = visibleFragments === 0 ? 'block' : 'none';
    }
    
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

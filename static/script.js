async function fillBeaker(volume, liquid) {
    try {
        const response = await fetch('/api/fill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ volume: volume, liquid: liquid })
        });
        
        const data = await response.json();
        updateBeaker(data.beaker);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function emptyBeaker() {
    try {
        const response = await fetch('/api/empty', {
            method: 'POST'
        });
        
        const data = await response.json();
        updateBeaker(data.beaker);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateBeaker(beaker) {
    const liquidElement = document.getElementById('liquid');
    const volumeText = document.getElementById('volume-text');
    
    // Update liquid height based on volume
    liquidElement.style.height = beaker.volume + '%';
    
    // Update volume text
    volumeText.textContent = `Volume: ${beaker.volume} mL`;
    
    // Change color based on liquid type
    if (beaker.liquid === 'acid') {
        liquidElement.style.background = 'linear-gradient(180deg, #ff6b6b, #ff5252)';
    } else {
        liquidElement.style.background = 'linear-gradient(180deg, #4dd0e1, #00acc1)';
    }
}

// Load initial state
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/beaker');
        const beaker = await response.json();
        updateBeaker(beaker);
    } catch (error) {
        console.error('Error loading beaker:', error);
    }
});
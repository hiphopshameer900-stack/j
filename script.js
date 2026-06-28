// Function to dynamically build romantic love elements continuously
function createLoveParticles() {
    const container = document.getElementById('heartsBg');
    if (!container) return;

    const loveThemeItems = ['❤️', '💕', '✨', '🌸', '💖', '🌟'];
    
    setInterval(() => {
        const heartElement = document.createElement('div');
        heartElement.classList.add('floating-heart');
        
        // Pull randomly from the array sets
        heartElement.innerText = loveThemeItems[Math.floor(Math.random() * loveThemeItems.length)];
        
        // Randomize placement layout options
        heartElement.style.left = Math.random() * 100 + 'vw';
        heartElement.style.fontSize = (Math.random() * 1.3 + 0.9) + 'rem';
        
        // Randomize floating pace variables
        const speedDuration = Math.random() * 4 + 7; // 7s to 11s range
        heartElement.style.animationDuration = speedDuration + 's';
        
        container.appendChild(heartElement);
        
        // Remove object cleanly from browser calculations
        setTimeout(() => {
            heartElement.remove();
        }, speedDuration * 1000);
    }, 450);
}

function runSceneAnimations(sceneElement) {
    const lines = sceneElement.querySelectorAll('.text-line, .promise-card');
    let maxDelay = 0;

    lines.forEach(line => {
        const currentDelay = parseInt(line.getAttribute('data-delay') || 0);
        if (currentDelay > maxDelay) maxDelay = currentDelay;

        setTimeout(() => {
            line.classList.add('visible');
        }, currentDelay);
    });

    if(sceneElement.id === 'scene6') {
        setTimeout(() => {
            const env = document.getElementById('letterEnvelope');
            if(env) env.classList.add('open');
        }, 800);
        maxDelay += 1500;
    }

    const nextBtn = sceneElement.querySelector('.btn');
    if (nextBtn) {
        setTimeout(() => {
            nextBtn.classList.add('show-btn');
        }, maxDelay + 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Ignition sequence for ambient background particles
    createLoveParticles();

    const primaryScene = document.getElementById('scene1');
    if (primaryScene) {
        runSceneAnimations(primaryScene);
    }

    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentScene = e.target.closest('.scene');
            const targetSceneId = e.target.getAttribute('data-next');
            const nextScene = document.getElementById(targetSceneId);

            if (currentScene && nextScene) {
                if (targetSceneId === 'scene2') document.body.className = 'galaxy-state';
                if (targetSceneId === 'scene3') document.body.className = 'storm';
                if (targetSceneId === 'scene4' || targetSceneId === 'scene5') document.body.className = 'sunrise';
                if (targetSceneId === 'scene6' || targetSceneId === 'scene7') document.body.className = 'galaxy-state';

                currentScene.classList.remove('active');
                
                setTimeout(() => {
                    currentScene.style.display = 'none';
                    nextScene.style.display = 'flex';
                    window.scrollTo(0, 0);
                    
                    setTimeout(() => {
                        nextScene.classList.add('active');
                        runSceneAnimations(nextScene);
                    }, 50);
                }, 1200);
            }
        });
    });

    const finalBtn = document.getElementById('finalBtn');
    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            document.body.style.background = 'radial-gradient(circle at center, #ffffff 0%, #fff0f3 100%)';
            document.body.style.color = '#ff416c';
            finalBtn.style.display = 'none';
            
            const tbcText = document.getElementById('toBeContinued');
            if(tbcText) {
                tbcText.style.display = 'block';
                setTimeout(() => { tbcText.classList.add('visible'); }, 100);
            }
        });
    }
});

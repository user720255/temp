const MUSIC_STATE_KEY = 'birthdayMusicState';
const MESSAGE_CONTENT = `🎉Happy Birthday to Someone Very Special!
Today marks another beautiful year of your amazing journey through life. Each year that passes brings new adventures, wonderful memories, and countless reasons to celebrate the incredible person you are.
You bring so much joy, laughter, and happiness.Happy Birthday! 🎂🎉💕`;


document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('birthdayMusic');
    const toggleButton = document.getElementById('musicToggle');
    const consentOverlay = document.getElementById('consentOverlay');
    const pages = document.querySelectorAll('.page-section');
    const body = document.body;

    let activePageId = 'home';
    
    // --- MUSIC & POP-UP LOGIC (NO localStorage) ---

    // 1. Initial State: Since localStorage is removed, the music starts muted.
    music.muted = true;
    toggleButton.textContent = '🔇';
    
    // The pop-up is visible by default via CSS. We rely on the button clicks to hide it.

    // 2. Pop-up Button Handlers
    document.getElementById('playMusicBtn').addEventListener('click', () => {
        music.muted = false;
        music.play().catch(e => console.error("Play failed:", e));
        consentOverlay.style.display = 'none'; // Hide after click
        toggleButton.textContent = '🔊';
        switchPage('home'); // Start content and animations
    }, { once: true });

    document.getElementById('muteMusicBtn').addEventListener('click', () => {
        music.muted = true;
        music.play().catch(e => console.warn("Muted play failed.")); // Try to play muted to unlock audio
        consentOverlay.style.display = 'none'; // Hide after click
        toggleButton.textContent = '🔇';
        switchPage('home'); // Start content and animations
    }, { once: true });


    // 3. Toggle Button Handler (Permanent control)
    toggleButton.addEventListener('click', () => {
        music.muted = !music.muted;
        
        if (music.paused) {
             music.play().catch(e => console.error("Play failed:", e));
        }

        toggleButton.textContent = music.muted ? '🔇' : '🔊';
    });

    // --- PAGE SWITCHING LOGIC ---

    function switchPage(targetId) {
        // 1. Update Body Class for Background Change
        // Using body.className preserves existing classes while adding the new one
        body.className = `bg-${targetId}`;

        // 2. Hide all pages and show the target page
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            activePageId = targetId;
        }

        // 3. Trigger initial animations for the new page
        runPageAnimations(targetId);
    }

    // Set up navigation links
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('data-target');
            if (target) {
                switchPage(target);
            }
        });
    });
    
    // --- ANIMATION EXECUTION & FUNCTIONS ---
    
    // This function will clear and run the animations appropriate for the active page
    let animationIntervals = [];

    function runPageAnimations(pageId) {
        // Clear all previous animations
        animationIntervals.forEach(clearInterval);
        animationIntervals = [];

        if (pageId === 'home') {
            animationIntervals.push(setInterval(createFloatingElement, 800));
            for (let i = 0; i < 10; i++) { setTimeout(createFloatingElement, i * 200); }
        } else if (pageId === 'message') {
            typeWriter();
            animationIntervals.push(setInterval(createFallingHeart, 500));
            animationIntervals.push(setInterval(createHeartDecoration, 2000));
        } else if (pageId === 'gallery') {
            animationIntervals.push(setInterval(createSparkle, 1000));
        } else if (pageId === 'surprise') {
            animationIntervals.push(setInterval(createSurpriseSparkle, 800));
            animationIntervals.push(setInterval(createFloatingHeartSurprise, 1200));
        }
    }

    // Home/Index Page Animations
    window.blowCandles = function() {
        const cake = document.querySelector('.cake-container');
        cake.innerHTML = '🎂';
        cake.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cake.innerHTML = '🧁';
            cake.style.transform = 'scale(1)';
        }, 1000);
        setTimeout(() => {
            cake.innerHTML = '🎂';
        }, 2000);
    }

    

    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        const isHeart = Math.random() > 0.5;
        if (isHeart) {
            element.innerHTML = '❤️';
            element.classList.add('heart');
        } else {
            const balloons = ['🎈', '🎆', '✨', '🌟'];
            element.innerHTML = balloons[Math.floor(Math.random() * balloons.length)];
            element.classList.add('balloon');
        }
        
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 2 + 's';
        element.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        document.body.appendChild(element);
        setTimeout(() => { element.remove(); }, 15000);
    }

    // Message Page Animations
    function typeWriter() {
        let i = 0;
        const typewriter = document.getElementById('typewriter');
        const cursor = document.getElementById('cursor');
        
        typewriter.innerHTML = ''; 
        
        function type() {
            if (i < MESSAGE_CONTENT.length) {
                if (MESSAGE_CONTENT.charAt(i) === '\n') {
                    typewriter.innerHTML += '<br>';
                } else {
                    typewriter.innerHTML += MESSAGE_CONTENT.charAt(i);
                }
                i++;
                setTimeout(type, 50);
            } else {
                cursor.style.display = 'none';
            }
        }
        setTimeout(type, 1000);
    }

    function createFallingHeart() { 
        const heart = document.createElement('div');
        heart.className = 'falling-hearts';
        heart.innerHTML = ['❤️', '💕', '💖', '💝', '🌹'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 8000);
    }

    function createHeartDecoration() { 
        const decoration = document.createElement('div');
        decoration.className = 'heart-decoration';
        decoration.innerHTML = '💕';
        decoration.style.left = Math.random() * 100 + '%';
        decoration.style.top = Math.random() * 100 + '%';
        decoration.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(decoration);
        setTimeout(() => { decoration.remove(); }, 4000);
    }

    // Gallery Page Animations
    function createSparkle() { 
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨'; 
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        
        document.body.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 3000);
    }

    // Surprise Page Animations
    window.createHeartBurst = function() { 
        const mainHeart = document.getElementById('mainHeart');
        mainHeart.style.animation = 'heartExplosion 0.6s ease';
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const burstHeart = document.createElement('div');
                // ... (burst heart styling and append logic) ...
            }, i * 50);
        }
    }
    
    function createSurpriseSparkle() { /* ... (Surprise sparkle logic) ... */ }
    function createFloatingHeartSurprise() { /* ... (Floating heart logic) ... */ }


    // --- FINAL INIT ---
    // Start on the home page and trigger animations
    switchPage('home'); 
});
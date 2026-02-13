const slider = document.getElementById('slider');
const dial = document.getElementById('dial');
const scoreLayer = document.getElementById('score_layer'); // Fixed ID
const checkBtn = document.getElementById('check-btn');     // Fixed ID
const resultMsg = document.getElementById('message');      // Fixed ID
const valentineCard = document.querySelector('.valentine_card');
const noBtn = document.querySelector('.valentine_card button:last-of-type');
const yesBtn = document.querySelector('.valentine_card button:first-of-type');
const victoryScreen = document.getElementById('victory-screen');

// 1. Move Dial Logic
slider.addEventListener('input', (e) => {
    const val = e.target.value;
    // The dial starts pointing up (0deg). 
    // To sweep from left-to-right (0 to 180 on slider), we rotate -90 to +90.
    const rotation = val - 90; 
    dial.style.transform = `rotate(${rotation}deg)`;
    
    // Hide layer if they start moving again
    scoreLayer.classList.remove('show_score'); // Fixed Class
    resultMsg.textContent = "";
});

// 2. Button Logic
checkBtn.addEventListener('click', () => {
    const val = parseInt(slider.value);

    if (val >= 150 && val <= 180) {
        // Show the layer if they hit ANY part of the target
        scoreLayer.classList.add('show_score');
        
        if (val >= 170) {
            resultMsg.style.color = "#64abd4";
            resultMsg.textContent = "DAMN STRAIGHT! (4 Points)";
            valentineCard.style.display = "block";
            rainHearts();
        } else if (val >= 160) {
            resultMsg.style.color = "#ed6c39";
            resultMsg.textContent = "Not hot enough 😤 (3 Points)";
        } else {
            resultMsg.style.color = "#f4b95f";
            resultMsg.textContent = "Getting warmer... (2 Points)";
        }
    } else {
        resultMsg.style.color = "#ff6b6b";
        resultMsg.textContent = "Missed! Keep trying.";
    }
});

// 3. The Heart Rain Function
function rainHearts() {
    const hearts = ['❤️', '💖', '✨', '🔥', '🥰', '💘'];
    const container = document.body;

    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-emoji');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Randomize position and timing
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2-5 seconds
        heart.style.opacity = Math.random();
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';

        container.appendChild(heart);

        // Remove heart after animation finishes to keep the DOM clean
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

const moveButton = () => {
    // 1. Calculate safe bounds (screen width/height minus button size)
    // We stay 50px away from edges so it doesn't get cut off
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;

    const randomX = Math.floor(Math.random() * maxX) + 25;
    const randomY = Math.floor(Math.random() * maxY) + 25;

    // 2. Apply the new position
    noBtn.style.position = 'fixed'; // Fixed stays relative to the screen
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

// Mouse move for Desktop
noBtn.addEventListener('mouseenter', moveButton);

// Touch for Mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // This is the "magic" line that stops the click from happening
    moveButton();
});

yesBtn.addEventListener('click', () => {
    // 1. Stop the No button from jumping if it's currently moving
    noBtn.style.display = "none"; 
    
    // 2. Show the victory screen
    victoryScreen.style.display = "flex";
    
    // 3. Trigger a massive heart rain
    for(let i = 0; i < 3; i++) {
        setTimeout(rainHearts, i * 500);
    }

    // 4. Console log for you to know she said yes!
    console.log("Mission Accomplished: Megan said Yes!");
});
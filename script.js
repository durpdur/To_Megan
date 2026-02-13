const slider = document.getElementById('slider');
const dial = document.getElementById('dial');
const scoreLayer = document.getElementById('score_layer'); // Fixed ID
const checkBtn = document.getElementById('check-btn');     // Fixed ID
const resultMsg = document.getElementById('message');      // Fixed ID

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
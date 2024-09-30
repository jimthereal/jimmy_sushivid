let mysound = document.getElementById("mysound");
let icon = document.getElementById("playPauseIcon");
let container = document.querySelector(".container");
let title = document.querySelector(".left-col h1");

function createSparkles() {
    for (let i = 0; i < 50; i++) {
        let sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Randomize the starting position
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        // Random duration between 5-10s
        sparkle.style.animationDuration = (Math.random() * 5 + 5) + 's';

        container.appendChild(sparkle);
    }
}

function removeSparkles() {
    let sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach(sparkle => sparkle.remove());
}

// Function to handle play/pause
icon.onclick = function () {
    if (mysound.paused) {
        mysound.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        // Animation when music plays
        container.style.animation = "moveBackground 20s linear infinite";
        title.style.animation = "glow 2s ease-in-out infinite alternate";
        // Create Sparkles
        createSparkles();
    } else {
        mysound.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        // Pause the animation
        container.style.animation = "none";
        title.style.animation = "none";
        // Remove Sparkles
        removeSparkles();
    }
}
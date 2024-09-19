document.addEventListener('DOMContentLoaded', function () {
    let mysound = document.getElementById("mysound");
    let button = document.getElementById("playPauseButton");
    let icon = document.getElementById("playPauseIcon");

    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the link
        playPause();
    });

    function playPause() {
        if (mysound.paused) {
            mysound.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            mysound.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
});
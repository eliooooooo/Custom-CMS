let progress = document.getElementById('progress');
let audio = document.getElementById('song');
let ctrlIcon = document.getElementsByClassName('ctrl-play-pause');

audio.onloadeddata = function() {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
}

window.toggleplay = function() {
    if (ctrlIcon[0]) { // Vérifiez que ctrlIcon[0] n'est pas null
        if (audio.paused) {
            audio.play();
            ctrlIcon[0].classList.toggle('hidden');
            ctrlIcon[1].classList.toggle('hidden');
        } else {
            audio.pause();
            ctrlIcon[0].classList.toggle('hidden');
            ctrlIcon[1].classList.toggle('hidden');
        }
    }
}

if (audio.play()) {
    setInterval(function() {
        progress.value = audio.currentTime;
    }, 500);
}

progress.onchange = function() {
    audio.currentTime = progress.value;
}

window.playforward = function() {
    audio.currentTime += 10;
}

window.playbackward = function() {
    audio.currentTime -= 10;
}

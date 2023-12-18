document.addEventListener("DOMContentLoaded", () => {

    let progress = document.querySelector('#progress');
    let audio = document.querySelector('#song');
    let ctrlIcon = document.querySelector('.ctrl-play-pause');
    let start = document.querySelector('#start');
    let end = document.querySelector('#end');

    let toggleplay = document.querySelector('#toggleplay');
    let playbackward = document.querySelector('#playbackward');
    let playforward = document.querySelector('#playforward');



    let dur = audio.duration;
    let secD = Math.floor(dur % 60);
    let minD = Math.floor(dur / 60);
    end.innerHTML = minD + ":" + (secD < 10 ? "0" : "") + secD;


    progress.max = audio.duration



    toggleplay.addEventListener('click', () => {
        console.log(audio.paused)
        if (audio.paused) {
            audio.play();
            ctrlIcon[1].classList.toggle('hidden');
            ctrlIcon[0].classList.toggle('hidden');
        }
        else {
            audio.pause();
            ctrlIcon[1].classList.toggle('hidden');
            ctrlIcon[0].classList.toggle('hidden');
        }
    })


    audio.addEventListener('play', () => {
        setInterval(function () {
            progress.value = audio.currentTime;
            console.log(progress.value, audio.currentTime)
        }, 500);
    })

    progress.addEventListener('change', () => {
        audio.currentTime = progress.value;

    })



    playforward.addEventListener('click', () => {
        audio.currentTime += 10;
    })

    playbackward.addEventListener('click', () => {
        audio.currentTime += 10;
    })

    audio.addEventListener('timeupdate', function () {
        let currentTime = audio.currentTime;
        let sec = Math.floor(currentTime % 60);
        let min = Math.floor(currentTime / 60);
        start.innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
    });
});
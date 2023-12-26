if (document.querySelector('.song') != null) {

    document.addEventListener("DOMContentLoaded", () => {
    let audioElements = document.querySelectorAll('.audio-listener');

    audioElements.forEach(audioElement => {
        let progress = audioElement.querySelector('.progress');
        let audio = audioElement.querySelector('audio');
        let ctrlIcon = audioElement.querySelectorAll('.ctrl-play-pause');
        let start = audioElement.querySelector('.start');
        let end = audioElement.querySelector('.end');

        let toggleplay = audioElement.querySelector('.toggleplay');
        let playbackward = audioElement.querySelector('.playbackward');
        let playforward = audioElement.querySelector('.playforward');

        let dur = audio.duration;
        let secD = Math.floor(dur % 60);
        let minD = Math.floor(dur / 60);
        end.innerHTML = minD + ":" + (secD < 10 ? "0" : "") + secD;

        progress.max = audio.duration;

          toggleplay.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                ctrlIcon[0].classList.add('hidden') 
                ctrlIcon[1].classList.remove('hidden')
            } else {
                audio.pause();
                ctrlIcon[1].classList.add('hidden')
                ctrlIcon[0].classList.remove('hidden')
            }
        });

        audio.addEventListener('play', () => {
            setInterval(function () {
                progress.value = audio.currentTime;
            }, 500);
        });

        progress.addEventListener('change', () => {
            audio.currentTime = progress.value;
        });

        playforward.addEventListener('click', () => {
            audio.currentTime += 10;
        });

        playbackward.addEventListener('click', () => {
            audio.currentTime -= 10;  // Change from += to -= to move backward
        });
 
        audio.addEventListener('loadedmetadata', function() {
            let dur = audio.duration;
            let secD = Math.floor(dur % 60);
            let minD = Math.floor(dur / 60);
            end.innerHTML = minD + ":" + (secD < 10 ? "0" : "") + secD;
            progress.max = audio.duration;
        });

        audio.addEventListener('timeupdate', function () {
            let currentTime = audio.currentTime;
            let sec = Math.floor(currentTime % 60);
            let min = Math.floor(currentTime / 60);
            start.innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
        });
    });
}); 

//     document.addEventListener("DOMContentLoaded", () => {
     
      

//     let progress = document.querySelector('.progress');
//     let audio = document.querySelector('.song');
//     let ctrlIcon = document.querySelector('.ctrl-play-pause');
//     let start = document.querySelector('.start');
//     let end = document.querySelector('.end');

//     let toggleplay = document.querySelector('.toggleplay');
//     let playbackward = document.querySelector('.playbackward');
//     let playforward = document.querySelector('.playforward');



//     let dur = audio.duration;
//     let secD = Math.floor(dur % 60);
//     let minD = Math.floor(dur / 60);
//     end.innerHTML = minD + ":" + (secD < 10 ? "0" : "") + secD;


//     progress.max = audio.duration



//     toggleplay.addEventListener('click', () => {
//         if (audio.paused) {
//             audio.play();
//         }
//         else {
//             audio.pause();
//         }
//     })


//     audio.addEventListener('play', () => {
//         setInterval(function () {
//             progress.value = audio.currentTime;
//         }, 500);
//     })

//     progress.addEventListener('change', () => {
//         audio.currentTime = progress.value;

//     })



//     playforward.addEventListener('click', () => {
//         audio.currentTime += 10;
//     })

//     playbackward.addEventListener('click', () => {
//         audio.currentTime += 10;
//     })

//     audio.addEventListener('timeupdate', function () {
//         let currentTime = audio.currentTime;
//         let sec = Math.floor(currentTime % 60);
//         let min = Math.floor(currentTime / 60);
//         start.innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
//     });
// });

}
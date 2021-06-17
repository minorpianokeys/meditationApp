timeBtn = document.querySelectorAll('#timerBtn');
startBtn = document.getElementById('startBtn');
timer =  document.getElementById('timer');
stopBtn = document.getElementById('stopBtn');
minuteContainer = document.getElementById('minsContainer');
upArrow = document.getElementById('upArrow');
downArrow = document.getElementById('downArrow');
soundsContainer = document.getElementById('sounds-container');
alertContainer = document.getElementById('alert');


// BACKGROUND IMAGES
const oceanImg = `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),
url('images/oceanImg.jpg') center/cover no-repeat`
const natureImg = `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),
url('images/natureImg.jpg') center/cover no-repeat`
const rainImg = `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),
url('images/rainImg.jpg') center/cover no-repeat`


// TIMER FUNCTION
function startTimer(mins, secs) {
        if(secs < 10 && secs >= 0) {
            secs = `0${secs}`
        }
        timer.innerHTML = `${mins}:${secs}`
        secs -= 1
        if(secs < 0) {
            secs = 59
            mins -= 1
        }
        if(mins >= 0) {
            setTimeout(startTimer, 1000, mins, secs)
        } else {
            timer.innerHTML = "FINISHED"
            document.getElementById('ding').play()
            stopSong();
            stopBtn.innerHTML = "Restart"
        }
    }

//START BUTTON
startBtn.addEventListener('click', () => {
    let mins = parseInt(document.getElementById('mins').value)
    let secs = 0;
    if(document.querySelector('.active')){
        var currActive = document.querySelector('.active');
        const sound = currActive.innerHTML
        const currSound = document.getElementById(sound)
        currSound.play()

        currSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        if(sound === "ocean"){
            document.body.style.background = oceanImg
        } else if(sound === "nature") {
            document.body.style.background = natureImg
        } else if(sound === "rain") {
            document.body.style.background = rainImg
        }
    }
    startBtn.remove()
    minuteContainer.remove()
    soundsContainer.remove()
    stopBtn.style.visibility = "visible";
    startTimer(mins, secs)
})

// ARROWS
upArrow.addEventListener('click', () => {
    let mins = parseInt(document.getElementById('mins').value)
    document.getElementById('mins').value = mins + 1;
    if(mins >= 60){
        document.getElementById('mins').value = 1;
    }
});

downArrow.addEventListener('click', () => {
    let mins = parseInt(document.getElementById('mins').value)
    document.getElementById('mins').value = mins - 1;
    if(mins <= 1){
        document.getElementById('mins').value = 60;
    }
});


// AUDIO
const sounds = ["ocean", "nature", "rain"]

sounds.forEach(sound => {
    const soundBtn = document.createElement('button')
    soundBtn.classList.add("soundBtn")
    soundBtn.innerText = sound

    soundBtn.addEventListener('click', () => {
        if(document.querySelector('.active')){
            let currActive = document.querySelector('.active');
            currActive.classList.remove('active')
        }
        soundBtn.classList.add('active');
    })
    document.getElementById('sounds-container').appendChild(soundBtn)
})

function stopSong() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound)

        song.pause()
        song.currentTime = 0;
    })
}

//RESTART BUTTON
stopBtn.addEventListener('click', () => {
    location.reload();
})
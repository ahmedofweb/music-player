// buttons
const btnPlay = document.querySelector(".play")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")

// audio
const audio = document.querySelector("audio")

// title
const title = document.querySelector(".title")

// image
const image = document.querySelector(".cover")

// time progress
const timeEnd = document.querySelector("#end")
const timeStart = document.querySelector("#start")

const progressContainer  = document.querySelector(".progress-container")
const progress = document.querySelector(".progress")

// volume 
const volume = document.querySelector("#volume")
const volumeForm = document.querySelector(".volume-form")
const spanVolume = document.querySelector("#span-volume")
const volumeIcon = document.querySelector("#volume-icon")

// container animation uchun
const container = document.querySelector(".container")


// variables

const songs = [
    "Ending - Isak Danielson",
    "Heather - Conan Gray",
    "Osmonlarda - Xamdam Sobirov",
    "U okna - HammAli & Navai",
    "Cжигая дотла - Jah Khalib",
    "Доча - Jah Khalib",

    "На грани - JANAGA и Севак",
    "Save your tears - The weekend",
    "Metro Boomin",
    "В комнате мрак - JANAGA",
    "Брату - Jah Khalib"
];

let songIndex = 1
songs[songIndex]


// addEventListener 

// play btn
btnPlay.addEventListener("click", () => {
    const isPlay = container.classList.contains("play")
    if(isPlay){
        pauseSong()
    }else{
        playSong()
    }
} )

// next btn
next.addEventListener("click", nextSong)

// prev btn
prev.addEventListener("click", prevSong)

// audio
audio.addEventListener("timeupdate", prog)

// prog container
progressContainer.addEventListener("click" , setProg)

// volume controll
volume.addEventListener("input", () => {
    audio.volume = volume.value / 10
    if(volume.value == 0){
        spanVolume.innerHTML = `<i id="volume-icon" class="fas fa-volume-mute"></i
        >`
    }else if(volume.value < 5 && volume.value > 0){
        spanVolume.innerHTML = `<i id="volume-icon" class="fas fa-volume-low"></i
        >`
    }else{
        spanVolume.innerHTML = `<i id="volume-icon" class="fas fa-volume-high"></i
        >`
    }
})

volumeIcon.addEventListener("click", () => {
    volumeIcon.classList.toggle()
})


// function 
function playSong() {
    container.classList.add("play")
    btnPlay.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}

function pauseSong() {
    container.classList.remove("play")
    btnPlay.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

function nextSong() {
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0
    }
    updateSong()
}

function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1
    }
    updateSong()
}

function updateSong() {
    audio.src = `musics/${songs[songIndex]}.mp3`
    image.src = `./album/${songs[songIndex]}.jpg`
    title.textContent = songs[songIndex]
    playSong()
}

function prog(e) {
    let duration = e.srcElement.duration 
    let currentTime = e.srcElement.currentTime

    // time end progress
    let endMin = Math.floor(duration /  60)
    let endSec = Math.floor(duration - endMin*60)

    endMin = endMin < 10 ? "0" + endMin : endMin
    endSec = endSec < 10 ? "0" + endSec : endSec

    timeEnd.textContent = `${endMin}:${endSec}`

    // time start progress
    let startMin = Math.trunc(currentTime / 60)
    let startSec = Math.trunc(currentTime -60 * startMin)
    startMin = startMin < 10 ? "0" + startMin : startMin
    startSec = startSec < 10 ? "0" + startSec : startSec

    timeStart.textContent = `${startMin}:${startSec}`
    // text contentiga qoshish
    progress.style.width = `${(currentTime / duration) * 100}%`




}

function setProg(e) {
   let duration = audio.duration 
   let offsetX = e.offsetX
   let width = this.clientWidth
   audio.currentTime = (offsetX / width) *duration
}
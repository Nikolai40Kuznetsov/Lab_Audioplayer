track_1 = document.getElementById('track-1')
track_2 = document.getElementById('track-2')
track_3 = document.getElementById('track-3')
track_4 = document.getElementById('track-4')
track_5 = document.getElementById('track-5')
block_1 = document.getElementById("first-block")
buttons_div = document.getElementById("buttons-div")
next_track = document.getElementById("next-track")
previous_track = document.getElementById("previous-track")
mix = document.getElementById("mix")
play_btn = document.querySelector("#buttons-div button:nth-child(1)")
pause_btn = document.querySelector("#buttons-div button:nth-child(2)")
volume_slider = document.querySelector("#buttons-div input[type='range']")

tracks_array = [
    track_1_page = document.getElementById("track-1-page"),
    track_2_page = document.getElementById("track-2-page"),
    track_3_page = document.getElementById("track-3-page"),
    track_4_page = document.getElementById("track-4-page"),
    track_5_page = document.getElementById("track-5-page")
]

const tracksInfo = [
    { 
        title: "В лесу родилась ёлочка", 
        description: "Новогодняя песня", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3") 
    },
    { 
        title: "Пусть бегут неуклюже", 
        description: "Из мультфильма 'Чебурашка'", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3") 
    },
    { 
        title: "Чунга-Чанга", 
        description: "Из мультфильма 'Катерок'", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3") 
    },
    { 
        title: "Антошка", 
        description: "Веселая детская песня", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3") 
    },
    { 
        title: "Улыбка", 
        description: "Из мультфильма 'Крошка Енот'", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3") 
    }
]

let current_page = 0
let isPlaying = false

function loadTracks() {
    tracksInfo.forEach((track) => {
        track.audio.preload = "metadata"
        track.audio.volume = 0.5
    })
}

function showTrack(pageNumber) {
    tracks_array.forEach(track => {
        track.style.display = "none"
    })
    current_page = pageNumber
    tracks_array[current_page].style.display = "block"
    
    if (isPlaying) {
        pauseCurrentTrack()
    }
}

function go_on_1() {
    block_1.style.display = "none"
    showTrack(0)
    buttons_div.style.display = "block"
}

function go_on_2() {
    block_1.style.display = "none"
    showTrack(1)
    buttons_div.style.display = "block"
}

function go_on_3() {
    block_1.style.display = "none"
    showTrack(2)
    buttons_div.style.display = "block"
}

function go_on_4() {
    block_1.style.display = "none"
    showTrack(3)
    buttons_div.style.display = "block"
}

function go_on_5() {
    block_1.style.display = "none"
    showTrack(4)
    buttons_div.style.display = "block"
}

function go_next() {
    const nextPage = (current_page + 1) % tracks_array.length
    showTrack(nextPage)
    if (isPlaying) {
        setTimeout(playCurrentTrack, 100)
    }
}

function go_back() {
    const prevPage = current_page === 0 ? tracks_array.length - 1 : current_page - 1
    showTrack(prevPage)
    if (isPlaying) {
        setTimeout(playCurrentTrack, 100)
    }
}

function go_mix() {
    let randomPage
    do {
        randomPage = Math.floor(Math.random() * tracks_array.length)
    } while (randomPage === current_page && tracks_array.length > 1)
    showTrack(randomPage)
    if (isPlaying) {
        setTimeout(playCurrentTrack, 100)
    }
}

function playCurrentTrack() {
    const currentAudio = tracksInfo[current_page].audio
    
    tracksInfo.forEach(track => {
        track.audio.pause()
        track.audio.currentTime = 0
    })
    isPlaying = true
}

function pauseCurrentTrack() {
    const currentAudio = tracksInfo[current_page].audio
    currentAudio.pause()
    isPlaying = false
}

function setVolume(value) {
    const volume = value / 100
    tracksInfo.forEach(track => {
        track.audio.volume = volume
    })
}

track_1.addEventListener("click", go_on_1)
track_2.addEventListener("click", go_on_2)
track_3.addEventListener("click", go_on_3)
track_4.addEventListener("click", go_on_4)
track_5.addEventListener("click", go_on_5)

next_track.addEventListener("click", go_next)
previous_track.addEventListener("click", go_back)
mix.addEventListener("click", go_mix)

play_btn.addEventListener("click", playCurrentTrack)
pause_btn.addEventListener("click", pauseCurrentTrack)

volume_slider.addEventListener("input", (e) => {
    setVolume(e.target.value)
})

loadTracks()
volume_slider.value = 50
setVolume(50)
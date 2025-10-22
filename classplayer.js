class Player 
{
    constructor(tracks)
    {
        this.tracks = tracks        
    }
    div;
    image_box;
    forward_button;
    backward_button;
    button_pressed_counter = 0;
    info_button;
    infoDiv;

    current_page = 0
    isPlaying = false

    loadTracks = function() {
        this.tracksInfo.forEach((track) => {
            track.audio.preload = "metadata"
            track.audio.volume = 0.5
        })
    }

    showTrack = function(pageNumber) {
        this.tracks_array.forEach(track => {
            track.style.display = "none"
        })
        this.current_page = pageNumber
        this.tracks_array[this.current_page].style.display = "block"
        if (isPlaying) {
            pauseCurrentTrack()
        }
    }

    go_on_1 = function() {
        this.block_1.style.display = "none"
        this.showTrack(0)
        this.buttons_div.style.display = "block"
    }

    go_on_2 = function() {
        this.block_1.style.display = "none"
        this.showTrack(1)
        this.buttons_div.style.display = "block"
    }

    go_on_3 = function() {
        this.block_1.style.display = "none"
        this.showTrack(2)
        this.buttons_div.style.display = "block"
    }

    go_on_4 = function() {
        this.block_1.style.display = "none"
        this.showTrack(3)
        this.buttons_div.style.display = "block"
    }

    go_on_5 = function() {
        this.block_1.style.display = "none"
        this.showTrack(4)
        this.buttons_div.style.display = "block"
    }

    go_next = function() {
        const nextPage = (this.current_page + 1) % this.tracks_array.length
        showTrack(nextPage)
        if (isPlaying) {
            setTimeout(playCurrentTrack, 100)
        }
    }

    go_back = function() {
        const prevPage = this.current_page === 0 ? this.tracks_array.length - 1 : this.current_page - 1
        showTrack(prevPage)
        if (isPlaying) {
            setTimeout(playCurrentTrack, 100)
        }
    }

    go_mix = function() {
        let randomPage
        do {
            randomPage = Math.floor(Math.random() * this.tracks_array.length)
        } while (randomPage === this.current_page && this.tracks_array.length > 1)
        showTrack(randomPage)
        if (isPlaying) {
            setTimeout(playCurrentTrack, 100)
        }
    }

    playCurrentTrack = function() {
        currentAudio = this.tracksInfo[this.current_page].audio        
        this.tracksInfo.forEach(track => {
            track.audio.pause()
            track.audio.currentTime = 0
        })
        isPlaying = true
    }

    pauseCurrentTrack = function () {
        currentAudio = this.tracksInfo[this.current_page].audio
        currentAudio.pause()
        isPlaying = false
    }

    setVolume = function(value) {
        const volume = value / 100
        this.tracksInfo.forEach(track => {
            track.audio.volume = volume
        })
    }
    init = function() 
    {
        this.track_1.addEventListener("click", this.go_on_1.bind(this))
        this.track_2.addEventListener("click", this.go_on_2.bind(this))
        this.track_3.addEventListener("click", this.go_on_3.bind(this))
        this.track_4.addEventListener("click", this.go_on_4.bind(this))
        this.track_5.addEventListener("click", this.go_on_5.bind(this))
        this.next_track.addEventListener("click", this.go_next.bind(this))
        this.previous_track.addEventListener("click", this.go_back.bind(this))
        this.mix.addEventListener("click", this.go_mix.bind(this))
        this.play_btn.addEventListener("click", this.playCurrentTrack.bind(this))
        this.pause_btn.addEventListener("click", this.pauseCurrentTrack.bind(this))
        this.volume_slider.addEventListener("input", (e) => {
            setVolume(e.target.value)
        })
        this.loadTracks()
        this.volume_slider.value = 50
        this.setVolume(50)
    }
}
let tracksInfo = [
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
let obj1 = new Player(tracksInfo)
obj1.init()
let obj2 = new Slider(tracksInfo)
obj2.init()
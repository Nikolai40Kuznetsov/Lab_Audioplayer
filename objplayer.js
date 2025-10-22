let playerObj = {
    track_1: document.getElementById('track-1'),
    track_2: document.getElementById('track-2'),
    track_3: document.getElementById('track-3'),
    track_4: document.getElementById('track-4'),
    track_5: document.getElementById('track-5'),
    block_1: document.getElementById("first-block"),
    buttons_div: document.getElementById("buttons-div"),
    next_track: document.getElementById("next-track"),
    previous_track: document.getElementById("previous-track"),
    mix: document.getElementById("mix"),
    play_btn: document.getElementById("play-btn"),
    pause_btn: document.getElementById("pause-btn"),
    volume_slider: document.querySelector("#buttons-div input[type='range']"),
    tracks_array: [
        document.getElementById("track-1-page"),
        document.getElementById("track-2-page"),
        document.getElementById("track-3-page"),
        document.getElementById("track-4-page"),
        document.getElementById("track-5-page")
    ],
    tracksInfo: [
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
    ],
    current_page: 0,
    isPlaying: false,

    loadTracks: function() {
        this.tracksInfo.forEach((track) => {
            track.audio.preload = "metadata";
            track.audio.volume = 0.5;
        });
    },

    showTrack: function(pageNumber) {
        this.tracks_array.forEach(track => {
            track.style.display = "none";
        });
        this.current_page = pageNumber;
        this.tracks_array[this.current_page].style.display = "block";
        if (this.isPlaying) {
            this.pauseCurrentTrack();
        }
    },

    go_on_1: function() {
        this.block_1.style.display = "none";
        this.showTrack(0);
        this.buttons_div.style.display = "block";
    },

    go_on_2: function() {
        this.block_1.style.display = "none";
        this.showTrack(1);
        this.buttons_div.style.display = "block";
    },

    go_on_3: function() {
        this.block_1.style.display = "none";
        this.showTrack(2);
        this.buttons_div.style.display = "block";
    },

    go_on_4: function() {
        this.block_1.style.display = "none";
        this.showTrack(3);
        this.buttons_div.style.display = "block";
    },

    go_on_5: function() {
        this.block_1.style.display = "none";
        this.showTrack(4);
        this.buttons_div.style.display = "block";
    },

    go_next: function() {
        const nextPage = (this.current_page + 1) % this.tracks_array.length;
        this.showTrack(nextPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    },

    go_back: function() {
        const prevPage = this.current_page === 0 ? this.tracks_array.length - 1 : this.current_page - 1;
        this.showTrack(prevPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    },

    go_mix: function() {
        let randomPage;
        do {
            randomPage = Math.floor(Math.random() * this.tracks_array.length);
        } while (randomPage === this.current_page && this.tracks_array.length > 1);
        this.showTrack(randomPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    },

    playCurrentTrack: function() {
        const currentAudio = this.tracksInfo[this.current_page].audio;
        this.tracksInfo.forEach(track => {
            track.audio.pause();
            track.audio.currentTime = 0;
        });
        currentAudio.play();
        this.isPlaying = true;
    },

    pauseCurrentTrack: function() {
        const currentAudio = this.tracksInfo[this.current_page].audio;
        currentAudio.pause();
        this.isPlaying = false;
    },

    setVolume: function(value) {
        const volume = value / 100;
        this.tracksInfo.forEach(track => {
            track.audio.volume = volume;
        });
    },

    init: function() {
        this.track_1.addEventListener("click", this.go_on_1.bind(this));
        this.track_2.addEventListener("click", this.go_on_2.bind(this));
        this.track_3.addEventListener("click", this.go_on_3.bind(this));
        this.track_4.addEventListener("click", this.go_on_4.bind(this));
        this.track_5.addEventListener("click", this.go_on_5.bind(this));
        this.next_track.addEventListener("click", this.go_next.bind(this));
        this.previous_track.addEventListener("click", this.go_back.bind(this));
        this.mix.addEventListener("click", this.go_mix.bind(this));
        this.play_btn.addEventListener("click", this.playCurrentTrack.bind(this));
        this.pause_btn.addEventListener("click", this.pauseCurrentTrack.bind(this));
        this.volume_slider.addEventListener("input", (e) => {
            this.setVolume(e.target.value);
        });
        this.loadTracks();
        this.volume_slider.value = 50;
        this.setVolume(50);
    }
};

playerObj.init();
class AudioPlayer {
    constructor(tracksInfo) {
        this.track_1 = document.getElementById('track-1');
        this.track_2 = document.getElementById('track-2');
        this.track_3 = document.getElementById('track-3');
        this.track_4 = document.getElementById('track-4');
        this.track_5 = document.getElementById('track-5');
        this.block_1 = document.getElementById("first-block");
        this.buttons_div = document.getElementById("buttons-div");
        this.next_track = document.getElementById("next-track");
        this.previous_track = document.getElementById("previous-track");
        this.mix = document.getElementById("mix");
        this.play_btn = document.querySelector("#buttons-div button:nth-child(1)");
        this.pause_btn = document.querySelector("#buttons-div button:nth-child(2)");
        this.volume_slider = document.querySelector("#buttons-div input[type='range']");

        this.tracks_array = [
            document.getElementById("track-1-page"),
            document.getElementById("track-2-page"),
            document.getElementById("track-3-page"),
            document.getElementById("track-4-page"),
            document.getElementById("track-5-page")
        ];

        // Добавляем tracksInfo в свойства класса
        this.tracksInfo = tracksInfo;

        this.current_page = 0;
        this.isPlaying = false;

        this.init();
    }

    init() {
        this.loadTracks();
        this.setVolume(50);
        this.volume_slider.value = 50;
        this.setupEventListeners();
    }

    loadTracks() {
        this.tracksInfo.forEach((track) => {
            track.audio.preload = "metadata";
            track.audio.volume = 0.5;
        });
    }

    showTrack(pageNumber) {
        this.tracks_array.forEach(track => {
            track.style.display = "none";
        });
        this.current_page = pageNumber;
        this.tracks_array[this.current_page].style.display = "block";
        
        if (this.isPlaying) {
            this.pauseCurrentTrack();
        }
    }

    go_on_1() {
        this.block_1.style.display = "none";
        this.showTrack(0);
        this.buttons_div.style.display = "block";
    }

    go_on_2() {
        this.block_1.style.display = "none";
        this.showTrack(1);
        this.buttons_div.style.display = "block";
    }

    go_on_3() {
        this.block_1.style.display = "none";
        this.showTrack(2);
        this.buttons_div.style.display = "block";
    }

    go_on_4() {
        this.block_1.style.display = "none";
        this.showTrack(3);
        this.buttons_div.style.display = "block";
    }

    go_on_5() {
        this.block_1.style.display = "none";
        this.showTrack(4);
        this.buttons_div.style.display = "block";
    }

    go_next() {
        const nextPage = (this.current_page + 1) % this.tracks_array.length;
        this.showTrack(nextPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    }

    go_back() {
        const prevPage = this.current_page === 0 ? this.tracks_array.length - 1 : this.current_page - 1;
        this.showTrack(prevPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    }

    go_mix() {
        let randomPage;
        do {
            randomPage = Math.floor(Math.random() * this.tracks_array.length);
        } while (randomPage === this.current_page && this.tracks_array.length > 1);
        this.showTrack(randomPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    }

    playCurrentTrack() {
        const currentAudio = this.tracksInfo[this.current_page].audio;
        
        this.tracksInfo.forEach(track => {
            track.audio.pause();
            track.audio.currentTime = 0;
        });
        
        currentAudio.play();
        this.isPlaying = true;
    }

    pauseCurrentTrack() {
        const currentAudio = this.tracksInfo[this.current_page].audio;
        currentAudio.pause();
        this.isPlaying = false;
    }

    setVolume(value) {
        const volume = value / 100;
        this.tracksInfo.forEach(track => {
            track.audio.volume = volume;
        });
    }

    setupEventListeners() {
        this.track_1.addEventListener("click", () => this.go_on_1());
        this.track_2.addEventListener("click", () => this.go_on_2());
        this.track_3.addEventListener("click", () => this.go_on_3());
        this.track_4.addEventListener("click", () => this.go_on_4());
        this.track_5.addEventListener("click", () => this.go_on_5());

        this.next_track.addEventListener("click", () => this.go_next());
        this.previous_track.addEventListener("click", () => this.go_back());
        this.mix.addEventListener("click", () => this.go_mix());

        this.play_btn.addEventListener("click", () => this.playCurrentTrack());
        this.pause_btn.addEventListener("click", () => this.pauseCurrentTrack());

        this.volume_slider.addEventListener("input", (e) => {
            this.setVolume(e.target.value);
        });
    }
}

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
];

const audioPlayer = new AudioPlayer(tracksInfo);
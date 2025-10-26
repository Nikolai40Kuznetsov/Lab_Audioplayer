class AudioPlayer {
    constructor(tracksInfo, playerId) {
        this.playerId = playerId;
        this.track_1 = document.getElementById(`${playerId}-track-1`);
        this.track_2 = document.getElementById(`${playerId}-track-2`);
        this.track_3 = document.getElementById(`${playerId}-track-3`);
        this.track_4 = document.getElementById(`${playerId}-track-4`);
        this.track_5 = document.getElementById(`${playerId}-track-5`);
        this.block_1 = document.getElementById(`${playerId}-first-block`);
        this.buttons_div = document.getElementById(`${playerId}-buttons-div`);
        this.next_track = document.getElementById(`${playerId}-next-track`);
        this.previous_track = document.getElementById(`${playerId}-previous-track`);
        this.mix = document.getElementById(`${playerId}-mix`);
        this.play_btn = document.querySelector(`#${playerId}-buttons-div button:nth-child(1)`);
        this.pause_btn = document.querySelector(`#${playerId}-buttons-div button:nth-child(2)`);
        this.volume_slider = document.querySelector(`#${playerId}-buttons-div input[type='range']`);

        this.tracks_array = [
            document.getElementById(`${playerId}-track-1-page`),
            document.getElementById(`${playerId}-track-2-page`),
            document.getElementById(`${playerId}-track-3-page`),
            document.getElementById(`${playerId}-track-4-page`),
            document.getElementById(`${playerId}-track-5-page`)
        ].filter(element => element !== null); 

        this.tracksInfo = tracksInfo;
        this.current_page = 0;
        this.isPlaying = false;

        if (this.tracks_array.length === 0) {
            console.error(`No track pages found for player ${playerId}`);
            return;
        }

        this.init();
    }

    init() {
        this.loadTracks();
        this.setVolume(50);
        if (this.volume_slider) {
            this.volume_slider.value = 50;
        }
        this.addImagesToTracks();
        this.setupEventListeners();
    }

    loadTracks() {
        this.tracksInfo.forEach((track) => {
            track.audio.preload = "metadata";
            track.audio.volume = 0.5;
        });
    }

    addImagesToTracks() {
        const trackImages = [
            "https://via.placeholder.com/300x200/FF6B6B/white?text=Ёлочка",
            "https://via.placeholder.com/300x200/4ECDC4/white?text=Чебурашка",
            "https://via.placeholder.com/300x200/45B7D1/white?text=Катерок",
            "https://via.placeholder.com/300x200/96CEB4/white?text=Антошка",
            "https://via.placeholder.com/300x200/F7DC6F/white?text=Енот"
        ];

        const trackImages2 = [
            "https://via.placeholder.com/300x200/FF9999/white?text=Песня+1",
            "https://via.placeholder.com/300x200/99FF99/white?text=Песня+2",
            "https://via.placeholder.com/300x200/9999FF/white?text=Песня+3",
            "https://via.placeholder.com/300x200/FFFF99/white?text=Песня+4",
            "https://via.placeholder.com/300x200/FF99FF/white?text=Песня+5"
        ];

        const images = this.playerId === "player1" ? trackImages : trackImages2;

        this.tracks_array.forEach((trackElement, index) => {
            if (!trackElement) return;
            
            const img = document.createElement('img');
            img.src = images[index];
            img.alt = this.tracksInfo[index].title;
            img.style.width = '300px';
            img.style.height = '200px';
            img.style.marginBottom = '10px';
            img.style.display = 'block';
            
            const title = document.createElement('h2');
            title.textContent = this.tracksInfo[index].title;
            title.style.margin = '10px 0';
            
            const description = document.createElement('p');
            description.textContent = this.tracksInfo[index].description;
            description.style.margin = '5px 0';
            
            trackElement.innerHTML = '';
            trackElement.appendChild(img);
            trackElement.appendChild(title);
            trackElement.appendChild(description);
        });

        const trackButtons = [this.track_1, this.track_2, this.track_3, this.track_4, this.track_5];
        trackButtons.forEach((button, index) => {
            if (button) {
                const img = document.createElement('img');
                img.src = images[index];
                img.alt = this.tracksInfo[index].title;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.marginRight = '10px';
                img.style.verticalAlign = 'middle';
                img.style.borderRadius = '5px';                
                const span = document.createElement('span');
                span.textContent = this.tracksInfo[index].title;
                span.style.verticalAlign = 'middle';                
                button.innerHTML = '';
                button.style.padding = '10px';
                button.style.margin = '5px';
                button.style.border = '1px solid #ccc';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.appendChild(img);
                button.appendChild(span);
            }
        });

        // Добавляем картинку к первому блоку
        if (this.block_1) {
            const welcomeImg = document.createElement('img');
            welcomeImg.src = "https://via.placeholder.com/400x300/6A5ACD/white?text=Музыкальный+Плеer";
            welcomeImg.alt = "Добро пожаловать";
            welcomeImg.style.width = '400px';
            welcomeImg.style.height = '300px';
            welcomeImg.style.marginBottom = '20px';
            welcomeImg.style.display = 'block';
            
            const welcomeText = document.createElement('h1');
            welcomeText.textContent = `Добро пожаловать в плеер ${this.playerId === "player1" ? "№1" : "№2"}`;
            welcomeText.style.color = '#6A5ACD';
            welcomeText.style.textAlign = 'center';
            
            this.block_1.innerHTML = '';
            this.block_1.style.textAlign = 'center';
            this.block_1.style.padding = '20px';
            this.block_1.appendChild(welcomeImg);
            this.block_1.appendChild(welcomeText);
        }

        // Стилизуем кнопки управления
        if (this.buttons_div) {
            this.buttons_div.style.display = 'flex';
            this.buttons_div.style.gap = '10px';
            this.buttons_div.style.alignItems = 'center';
            this.buttons_div.style.margin = '20px 0';
            this.buttons_div.style.padding = '10px';
            this.buttons_div.style.border = '1px solid #ddd';
            this.buttons_div.style.borderRadius = '5px';
        }
    }

    showTrack(pageNumber) {
        if (pageNumber < 0 || pageNumber >= this.tracks_array.length) return;
        
        this.tracks_array.forEach(track => {
            if (track) track.style.display = "none";
        });
        
        this.current_page = pageNumber;
        if (this.tracks_array[this.current_page]) {
            this.tracks_array[this.current_page].style.display = "block";
        }
        
        if (this.isPlaying) {
            this.pauseCurrentTrack();
        }
    }

    go_on_1() { this.goToTrack(0); }
    go_on_2() { this.goToTrack(1); }
    go_on_3() { this.goToTrack(2); }
    go_on_4() { this.goToTrack(3); }
    go_on_5() { this.goToTrack(4); }

    goToTrack(trackNumber) {
        if (this.block_1) this.block_1.style.display = "none";
        if (this.buttons_div) this.buttons_div.style.display = "block";
        this.showTrack(trackNumber);
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
        if (this.tracks_array.length <= 1) return;
        
        let randomPage;
        do {
            randomPage = Math.floor(Math.random() * this.tracks_array.length);
        } while (randomPage === this.current_page);
        
        this.showTrack(randomPage);
        if (this.isPlaying) {
            setTimeout(() => this.playCurrentTrack(), 100);
        }
    }

    playCurrentTrack() {
        if (this.current_page < 0 || this.current_page >= this.tracksInfo.length) return;
        
        const currentAudio = this.tracksInfo[this.current_page].audio;
        
        // Останавливаем все треки
        this.tracksInfo.forEach(track => {
            if (track.audio) {
                track.audio.pause();
                track.audio.currentTime = 0;
            }
        });
        
        // Воспроизводим текущий
        currentAudio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        this.isPlaying = true;
    }

    pauseCurrentTrack() {
        if (this.current_page < 0 || this.current_page >= this.tracksInfo.length) return;
        
        const currentAudio = this.tracksInfo[this.current_page].audio;
        if (currentAudio) {
            currentAudio.pause();
        }
        this.isPlaying = false;
    }

    setVolume(value) {
        const volume = value / 100;
        this.tracksInfo.forEach(track => {
            if (track.audio) {
                track.audio.volume = volume;
            }
        });
    }

    setupEventListeners() {
        // Добавляем обработчики только если элементы существуют
        if (this.track_1) this.track_1.addEventListener("click", () => this.go_on_1());
        if (this.track_2) this.track_2.addEventListener("click", () => this.go_on_2());
        if (this.track_3) this.track_3.addEventListener("click", () => this.go_on_3());
        if (this.track_4) this.track_4.addEventListener("click", () => this.go_on_4());
        if (this.track_5) this.track_5.addEventListener("click", () => this.go_on_5());

        if (this.next_track) this.next_track.addEventListener("click", () => this.go_next());
        if (this.previous_track) this.previous_track.addEventListener("click", () => this.go_back());
        if (this.mix) this.mix.addEventListener("click", () => this.go_mix());

        if (this.play_btn) this.play_btn.addEventListener("click", () => this.playCurrentTrack());
        if (this.pause_btn) this.pause_btn.addEventListener("click", () => this.pauseCurrentTrack());

        if (this.volume_slider) {
            this.volume_slider.addEventListener("input", (e) => {
                this.setVolume(e.target.value);
            });
        }
    }
}

// Данные для треков
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

const tracksInfo2 = [
    { 
        title: "Песня 1", 
        description: "Описание 1", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3") 
    },
    { 
        title: "Песня 2", 
        description: "Описание 2", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3") 
    },
    { 
        title: "Песня 3", 
        description: "Описание 3", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3") 
    },
    { 
        title: "Песня 4", 
        description: "Описание 4", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3") 
    },
    { 
        title: "Песня 5", 
        description: "Описание 5", 
        audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3") 
    }
];
const audioPlayer_1 = new AudioPlayer(tracksInfo, "player1");
const audioPlayer_2 = new AudioPlayer(tracksInfo2, "player2");
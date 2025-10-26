class AudioPlayer {
    constructor(tracksInfo, playerId, container) {
        this.playerId = playerId;
        this.container = container || document.body;
        
        this.createPlayerHTML();
        this.getPlayerElements();
        
        this.tracksInfo = tracksInfo;
        this.current_page = 0;
        this.isPlaying = false;

        this.init();
    }

    createPlayerHTML() {
        const playerHTML = `
            <div class="audio-player" id="${this.playerId}">
                <div class="player-header">
                    <h2>Аудиоплеер ${this.playerId}</h2>
                    <button class="remove-player">×</button>
                </div>
                
                <div id="${this.playerId}-first-block" class="welcome-block">
                </div>

                <div class="track-selector">
                    <button id="${this.playerId}-track-1" class="track-btn"></button>
                    <button id="${this.playerId}-track-2" class="track-btn"></button>
                    <button id="${this.playerId}-track-3" class="track-btn"></button>
                    <button id="${this.playerId}-track-4" class="track-btn"></button>
                    <button id="${this.playerId}-track-5" class="track-btn"></button>
                </div>

                <div id="${this.playerId}-buttons-div" class="controls" style="display: none;">
                    <div class="playback-controls">
                        <button class="control-btn">▶️</button>
                        <button class="control-btn">⏸️</button>
                        <input type="range" class="volume-slider" min="0" max="100" value="50">
                    </div>
                    <div class="navigation-controls">
                        <button id="${this.playerId}-previous-track" class="control-btn">⏮️</button>
                        <button id="${this.playerId}-next-track" class="control-btn">⏭️</button>
                        <button id="${this.playerId}-mix" class="control-btn">🔀</button>
                    </div>
                </div>

                <div class="track-pages">
                    <div id="${this.playerId}-track-1-page" class="track-page"></div>
                    <div id="${this.playerId}-track-2-page" class="track-page"></div>
                    <div id="${this.playerId}-track-3-page" class="track-page"></div>
                    <div id="${this.playerId}-track-4-page" class="track-page"></div>
                    <div id="${this.playerId}-track-5-page" class="track-page"></div>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', playerHTML);
    }

    getPlayerElements() {
        this.track_1 = document.getElementById(`${this.playerId}-track-1`);
        this.track_2 = document.getElementById(`${this.playerId}-track-2`);
        this.track_3 = document.getElementById(`${this.playerId}-track-3`);
        this.track_4 = document.getElementById(`${this.playerId}-track-4`);
        this.track_5 = document.getElementById(`${this.playerId}-track-5`);
        this.block_1 = document.getElementById(`${this.playerId}-first-block`);
        this.buttons_div = document.getElementById(`${this.playerId}-buttons-div`);
        this.next_track = document.getElementById(`${this.playerId}-next-track`);
        this.previous_track = document.getElementById(`${this.playerId}-previous-track`);
        this.mix = document.getElementById(`${this.playerId}-mix`);
        
        this.play_btn = document.querySelector(`#${this.playerId} .playback-controls button:nth-child(1)`);
        this.pause_btn = document.querySelector(`#${this.playerId} .playback-controls button:nth-child(2)`);
        this.volume_slider = document.querySelector(`#${this.playerId} .volume-slider`);

        this.tracks_array = [
            document.getElementById(`${this.playerId}-track-1-page`),
            document.getElementById(`${this.playerId}-track-2-page`),
            document.getElementById(`${this.playerId}-track-3-page`),
            document.getElementById(`${this.playerId}-track-4-page`),
            document.getElementById(`${this.playerId}-track-5-page`)
        ].filter(element => element !== null);
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
            if (track.audio) {
                track.audio.preload = "metadata";
                track.audio.volume = 0.5;
            }
        });
    }

    addImagesToTracks() {
        this.tracks_array.forEach((trackElement, index) => {
            if (!trackElement || index >= this.tracksInfo.length) return;
            
            const track = this.tracksInfo[index];
            
            const img = document.createElement('img');
            img.src = track.image || 'https://via.placeholder.com/300x200/CCCCCC/white?text=No+Image';
            img.alt = track.title;
            
            const title = document.createElement('h2');
            title.textContent = track.title;
            
            const author = document.createElement('p');
            author.textContent = `Автор: ${track.author || 'Неизвестен'}`;
            
            const description = document.createElement('p');
            description.textContent = track.description || 'Описание отсутствует';

            trackElement.innerHTML = '';
            trackElement.appendChild(img);
            trackElement.appendChild(title);
            trackElement.appendChild(author);
            trackElement.appendChild(description);
        });

        const trackButtons = [this.track_1, this.track_2, this.track_3, this.track_4, this.track_5];
        trackButtons.forEach((button, index) => {
            if (button && index < this.tracksInfo.length) {
                const track = this.tracksInfo[index];
                
                const img = document.createElement('img');
                img.src = track.image || 'https://via.placeholder.com/50x50/CCCCCC/white?text=No+Image';
                img.alt = track.title;
                
                const span = document.createElement('span');
                span.textContent = track.title;
                
                button.innerHTML = '';
                button.appendChild(img);
                button.appendChild(span);
            }
        });

        if (this.block_1) {
            const welcomeImg = document.createElement('img');
            welcomeImg.src = 'https://via.placeholder.com/400x300/6A5ACD/white?text=Музыкальный+Плеер';
            welcomeImg.alt = "Добро пожаловать";
            
            const welcomeText = document.createElement('h1');
            welcomeText.textContent = `Добро пожаловать в плеер ${this.playerId}`;
            
            this.block_1.innerHTML = '';
            this.block_1.appendChild(welcomeImg);
            this.block_1.appendChild(welcomeText);
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
            this.playCurrentTrack();
        }
    }

    go_back() {
        const prevPage = this.current_page === 0 ? this.tracks_array.length - 1 : this.current_page - 1;
        this.showTrack(prevPage);
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }

    go_mix() {
        if (this.tracks_array.length <= 1) return;
        
        let randomPage;
        do {
            randomPage = Math.floor(Math.random() * this.tracks_array.length);
        } while (randomPage === this.current_page && this.tracks_array.length > 1);
        
        this.showTrack(randomPage);
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }

    playCurrentTrack() {
        if (this.current_page < 0 || this.current_page >= this.tracksInfo.length) return;
        
        const currentAudio = this.tracksInfo[this.current_page].audio;
        if (!currentAudio) return;
        
        this.tracksInfo.forEach(track => {
            if (track.audio && track.audio !== currentAudio) {
                track.audio.pause();
                track.audio.currentTime = 0;
            }
        });
        
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

        const removeBtn = document.querySelector(`#${this.playerId} .remove-player`);
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                if (window.app) {
                    window.app.removePlayer(this.playerId);
                }
            });
        }
    }

    destroy() {
        this.tracksInfo.forEach(track => {
            if (track.audio) {
                track.audio.pause();
                track.audio.currentTime = 0;
            }
        });
        
        const playerElement = document.getElementById(this.playerId);
        if (playerElement) {
            playerElement.remove();
        }
    }
}

class AudioPlayerApp {
    constructor() {
        this.players = new Map();
        this.playerCounter = 0;
        this.init();
    }

    init() {
        this.setupAddButton();
        this.createDemoPlayer();
        this.createSecondDemoPlayer();
    }

    setupAddButton() {
        const addButton = document.createElement('button');
        addButton.className = 'add-player-btn';
        addButton.textContent = '+ Добавить плеер';
        addButton.onclick = () => this.showAddPlayerModal();
        document.body.appendChild(addButton);
    }

    createDemoPlayer() {
        const demoPlayer = this.createPlayer([
            { 
                title: "В лесу родилась ёлочка", 
                author: "Народная",
                description: "Новогодняя песня", 
                image: "https://via.placeholder.com/300x200/FF6B6B/white?text=Ёлочка",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3") 
            },
            { 
                title: "Пусть бегут неуклюже", 
                author: "В. Шаинский",
                description: "Из мультфильма 'Чебурашка'", 
                image: "https://via.placeholder.com/300x200/4ECDC4/white?text=Чебурашка",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3") 
            },
            { 
                title: "Чунга-Чанга", 
                author: "В. Шаинский",
                description: "Из мультфильма 'Катерок'", 
                image: "https://via.placeholder.com/300x200/45B7D1/white?text=Катерок",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3") 
            },
            { 
                title: "Антошка", 
                author: "В. Шаинский",
                description: "Веселая детская песня", 
                image: "https://via.placeholder.com/300x200/96CEB4/white?text=Антошка",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3") 
            },
            { 
                title: "Улыбка", 
                author: "В. Шаинский",
                description: "Из мультфильма 'Крошка Енот'", 
                image: "https://via.placeholder.com/300x200/F7DC6F/white?text=Енот",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3") 
            }
        ]);
    }

    createSecondDemoPlayer() {
        const secondDemoPlayer = this.createPlayer([
            { 
                title: "Катюша", 
                author: "М. Блантер",
                description: "Народная песня", 
                image: "https://via.placeholder.com/300x200/FF6B6B/white?text=Катюша",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3") 
            },
            { 
                title: "Подмосковные вечера", 
                author: "В. Соловьев-Седой",
                description: "Классическая русская песня", 
                image: "https://via.placeholder.com/300x200/4ECDC4/white?text=Подмосковные",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3") 
            },
            { 
                title: "Ой, цветет калина", 
                author: "И. Дунаевский",
                description: "Русская народная песня", 
                image: "https://via.placeholder.com/300x200/45B7D1/white?text=Калина",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3") 
            },
            { 
                title: "Смуглянка", 
                author: "А. Новиков",
                description: "Военная песня", 
                image: "https://via.placeholder.com/300x200/96CEB4/white?text=Смуглянка",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3") 
            },
            { 
                title: "День Победы", 
                author: "Д. Тухманов",
                description: "Праздничная песня", 
                image: "https://via.placeholder.com/300x200/F7DC6F/white?text=Победа",
                audio: new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3") 
            }
        ]);
    }

    showAddPlayerModal() {
        const existingModal = document.getElementById('addPlayerModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div class="modal" id="addPlayerModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000;">
                <div class="modal-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; color: black;">
                    <h2>Добавить новый аудиоплеер</h2>
                    <p>Заполните информацию о 5 треках:</p>
                    
                    <form id="playerForm">
                        ${Array.from({length: 5}, (_, i) => `
                            <div class="track-form" style="margin-bottom: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                                <h3>Трек ${i + 1}</h3>
                                <div class="form-group" style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">URL картинки:</label>
                                    <input type="url" name="track${i}_image" placeholder="https://example.com/image.jpg" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                </div>
                                <div class="form-group" style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Название трека:</label>
                                    <input type="text" name="track${i}_title" placeholder="Название трека" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                </div>
                                <div class="form-group" style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Автор:</label>
                                    <input type="text" name="track${i}_author" placeholder="Имя автора" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                </div>
                                <div class="form-group" style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Описание:</label>
                                    <input type="text" name="track${i}_description" placeholder="Описание трека" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                </div>
                                <div class="form-group" style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">URL аудио:</label>
                                    <input type="url" name="track${i}_audio" placeholder="https://example.com/audio.mp3" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                </div>
                            </div>
                        `).join('')}
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="submit" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Создать плеер</button>
                            <button type="button" id="cancelModalBtn" style="padding: 10px 20px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.getElementById('playerForm').onsubmit = (e) => {
            e.preventDefault();
            this.createPlayerFromForm();
        };

        document.getElementById('cancelModalBtn').onclick = () => {
            this.hideAddPlayerModal();
        };
    }

    hideAddPlayerModal() {
        const modal = document.getElementById('addPlayerModal');
        if (modal) {
            modal.remove();
        }
    }

    createPlayerFromForm() {
        const form = document.getElementById('playerForm');
        if (!form) return;

        const formData = new FormData(form);
        const tracksInfo = [];

        for (let i = 0; i < 5; i++) {
            const audioUrl = formData.get(`track${i}_audio`);
            if (!audioUrl) continue;

            const track = {
                image: formData.get(`track${i}_image`) || '',
                title: formData.get(`track${i}_title`) || `Трек ${i + 1}`,
                author: formData.get(`track${i}_author`) || '',
                description: formData.get(`track${i}_description`) || '',
                audio: new Audio(audioUrl)
            };
            tracksInfo.push(track);
        }

        if (tracksInfo.length > 0) {
            this.createPlayer(tracksInfo);
            this.hideAddPlayerModal();
        }
    }

    createPlayer(tracksInfo) {
        this.playerCounter++;
        const playerId = `player${this.playerCounter}`;
        const playersContainer = document.getElementById('players-container') || this.createPlayersContainer();
        
        const player = new AudioPlayer(tracksInfo, playerId, playersContainer);
        this.players.set(playerId, player);
        
        return player;
    }

    createPlayersContainer() {
        const container = document.createElement('div');
        container.id = 'players-container';
        document.body.appendChild(container);
        return container;
    }

    removePlayer(playerId) {
        const player = this.players.get(playerId);
        if (player) {
            player.destroy();
            this.players.delete(playerId);
        }
    }
}

window.app = new AudioPlayerApp();
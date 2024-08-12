audio: HTMLAudioElement | null = null;
playPauseBtn: HTMLElement | null = null;
progress: HTMLElement | null = null;
currentTimeSpan: HTMLElement | null = null;
durationSpan: HTMLElement | null = null;
updateInterval: number | null = null; // Store the interval ID

ngAfterViewInit() {
    this.audio = document.getElementById('audio-player') as HTMLAudioElement;
    this.playPauseBtn = document.getElementById('play-pause-btn') as HTMLElement;
    this.progress = document.getElementById('progress') as HTMLElement;
    this.currentTimeSpan = document.getElementById('current-time') as HTMLElement;
    this.durationSpan = document.getElementById('duration') as HTMLElement;

    if (this.audio && this.playPauseBtn && this.progress && this.currentTimeSpan && this.durationSpan) {
        this.setupEventListeners();
    } else {
        console.error('One or more DOM elements are missing');
    }
}

  private setupEventListeners() {
    if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => {
            if (this.audio) {
                if (this.audio.paused && this.playPauseBtn) {
                    this.audio.play();
                    this.playPauseBtn.classList.replace('fa-play', 'fa-pause');
                } else if (this.playPauseBtn) {
                    this.audio.pause();
                    this.playPauseBtn.classList.replace('fa-pause', 'fa-play');
                }
            }
        });
    }

    if (this.audio && this.progress && this.currentTimeSpan && this.durationSpan) {
        this.audio.addEventListener('timeupdate', () => {
            if (this.audio) {
                this.updateProgressBar();
            }
        });

        // Set up an interval to update color every second
        this.updateInterval = window.setInterval(() => { // Use window.setInterval for browser environments
            if (this.audio) {
                this.updateProgressBar();
            }
        }, 1000); // Update every 1 second
    }
}

  private updateProgressBar() {
    if (this.audio && this.progress && this.currentTimeSpan && this.durationSpan) {
        const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        this.updateProgressColor(progressPercent); // Update color based on progress
        this.currentTimeSpan.textContent = this.formatTime(this.audio.currentTime);
        this.durationSpan.textContent = this.formatTime(this.audio.duration);
    }
}

  private updateProgressColor(percent: number) {
    let progressColor: string;
    if (percent < 50) {
        progressColor = `rgba(255, 255, 0, ${percent / 50})`; // Yellow
    } else {
        progressColor = `rgba(255, 0, 0, ${(percent - 50) / 50})`; // Red
    }
    if (this.progress) {
        this.progress.style.backgroundColor = progressColor;
    }
}

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

ngOnDestroy() {
    // Clean up the interval when the component is destroyed
    if (this.updateInterval !== null) {
        clearInterval(this.updateInterval);
    }
}
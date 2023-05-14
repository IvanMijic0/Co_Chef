export class LazyAudio {
    constructor(audioId) {
        this.audio = new Audio(document.getElementById(audioId).getAttribute("src"));
    }
    playLoop = () => {
        this.audio.addEventListener('canplaythrough', () => {
            this.audio.loop = true;
            this.audio.play().then(() => "Played successfully");
        }, {once: true});
    }

    switchAudio = (newAudioId) => {
        const newAudio = new Audio(document.getElementById(newAudioId).getAttribute("src"));
        newAudio.addEventListener('canplaythrough', () => {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = newAudio;
            this.audio.loop = true;
            this.audio.play().then(() => "Played successfully");
        }, {once: true});
    }
    restart = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play().then(() => {
            console.log('Audio finished playing');
        });
    }

    stop = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}
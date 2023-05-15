export class LazyAudio {
    constructor(audioId) {
        this.audio = new Audio(document.getElementById(audioId).getAttribute("src"));
    }
    /*
    Did not Find any usages yet, will keep for future
     */
    playLoop = () => {
        this.audio.addEventListener('canplaythrough', () => {
            this.audio.loop = true;
            this.audio.addEventListener('ended', () => {
                this.audio.currentTime = 0;
                this.audio.play().then(() => "Played successfully");
            });
            this.audio.play().then(() => "Played successfully");
        }, {once: true});
    }

    /*
    Switches audio with new HTML audioId provided
     */
    switchAudio = (newAudioId, oldVolume) => {
        const newAudio = new Audio(document.getElementById(newAudioId).getAttribute("src"));
        newAudio.addEventListener('canplaythrough', () => {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = newAudio;
            this.audio.volume = oldVolume;
            this.audio.loop = true;
            this.audio.addEventListener('ended', () => {
                this.audio.currentTime = 0;
                this.audio.play().then(() => "Played successfully");
            });
            this.audio.play().then(() => "Played successfully");
        }, {once: true});
    }

    /*
    Restarts audio
     */
    restart = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.audio.play().then(() => "Played successfully");
        });
        this.audio.play().then(() => {
            console.log('Audio finished playing');
        });
    }

    /*
    Stops audio from playing
     */
    stop = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    changeVolume = (volume) => {
        this.audio.volume = volume;
    }
}
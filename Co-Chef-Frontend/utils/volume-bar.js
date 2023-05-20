export class VolumeBar {
    constructor(volumeBarId, volumeContainerId, audio) {
        this.volume = 0.5; // set initial volume to 50%
        this.audio = audio;
        this.volumeBar = document.getElementById(volumeBarId);
        this.volumeContainer = document.getElementById(volumeContainerId);
        this.init();
    }

    init() {
        this.audio.changeVolume(this.volume);
        this.volumeBar.value = this.volume;
        this.volumeBar.addEventListener("input", () => {
            this.setVolume(this.volumeBar.value);
            this.volumeBar.style.setProperty("--value", this.volumeBar.value);
        });
        this.audio.audio.addEventListener("volumechange", () => {
            this.updateVolumeBar();
        });
    }

    setVolume(value) {
        let volumeBefore = this.volume;
        localStorage.setItem("volumeBefore", volumeBefore);
        this.volume = value;
        localStorage.setItem("volume", value);
        this.audio.changeVolume(this.volume);
        this.volumeBar.style.setProperty("--value", this.volume);
        this.updateVolumeBar();
    }

    unmuteVolume() {
        this.volume = localStorage.getItem("volumeBefore");
        this.audio.changeVolume(this.volume);
        this.volumeBar.style.setProperty("--value", this.volume);
        this.updateVolumeBar();
    }

    updateVolumeBar() {
        this.volumeBar.value = this.volume;
    }

    show() {
        this.volumeContainer.style.display = "flex";
    }

    hide() {
        this.volumeContainer.style.display = "none";
    }

    setup = () => {
        this.volumeBar.style.setProperty("--value", this.volumeBar.value);
    };
}

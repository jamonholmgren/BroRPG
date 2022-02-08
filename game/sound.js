// create the background music element and add it to the dom
function addBackgroundMusicElement() {
  const element = document.createElement("audio");
  element.id = "background-music";
  document.body.appendChild(element);
  return element;
}

export const Sound = {
  /** @type {HTMLAudioElement} */
  musicElement: addBackgroundMusicElement(),
  playPromise: undefined,
  playMusic(musicPath, options = {}) {
    // if the musicElement is already playing music, stop it
    if (this.musicElement.src) {
      this.stopMusic();
    }

    // set the audio's source
    this.musicElement.src = musicPath;

    // set the audio's volume
    this.musicElement.volume = options.volume || 0.5;

    // set the audio's looping
    this.musicElement.loop = options.loop !== undefined ? options.loop : true;

    // set the audio's autoplay
    this.musicElement.autoplay = options.autoplay !== undefined ? options.autoplay : true;

    // play the audio
    this.playPromise = this.musicElement.play();
  },
  pauseMusic() {
    // check if the music element is playing
    if (this.playPromise) {
      this.playPromise.then(() => this.musicElement.pause());
    } else {
      this.musicElement.pause();
    }
  },
  resumeMusic() {
    this.playPromise = this.musicElement.play();
  },
  stopMusic() {
    // stop the music
    this.musicElement?.pause();
    this.musicElement.currentTime = 0;
    this.musicElement.src = "";
  },
  playSound(soundName) {
    new Audio(`./game/sounds/${soundName}`).play();
  },
};

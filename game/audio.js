export const Audio = {
  musicElement: document.getElementById("background-music"),
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
    this.musicElement.autoplay =
      options.autoplay !== undefined ? options.autoplay : true;

    // play the audio
    this.musicElement.play();
  },
  pauseMusic() {
    this.musicElement.pause();
  },
  resumeMusic() {
    this.musicElement.play();
  },
  stopMusic() {
    // stop the music
    this.musicElement?.pause();
    this.musicElement.currentTime = 0;
    this.musicElement.src = "";
  },
};

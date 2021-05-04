'use strict';

const MUSIC_PLAYER = document.querySelector('.music-player'),
      SONG_TITLE = document.querySelector('.music-player__info h4'),
      SONG_COVER = document.querySelector('.music-player__cover img'),
      SONG_TRACK = document.querySelector('.music-player__progress'),
      SONG_TRACK_PLAYED = document.querySelector('.music-player__progress span'),
      PLAY_BTN = document.getElementById('play'),
      PREVIOUS_BTN = document.getElementById('previous'),
      NEXT_BTN = document.getElementById('next'),
      SONG_AUDIO = document.querySelector('.music-player__songs'),
      SONG_FILES = ['hey', 'summer', 'ukulele'];

let songIndex = 0;

loadSongs(SONG_FILES[songIndex]);

function loadSongs(song) {
  SONG_TITLE.textContent = song;
  SONG_AUDIO.src = `songs/${song}.mp3`;
  SONG_COVER.src = `img/${song}.jpg`;
}

function playSong() {
  MUSIC_PLAYER.classList.add('music-player--play');
  PLAY_BTN.querySelector('i.fas').classList.remove('fa-play');
  PLAY_BTN.querySelector('i.fas').classList.add('fa-pause');

  SONG_AUDIO.play();
}

function pauseSong() {
  MUSIC_PLAYER.classList.remove('music-player--play');
  PLAY_BTN.querySelector('i.fas').classList.remove('fa-pause');
  PLAY_BTN.querySelector('i.fas').classList.add('fa-play');

  SONG_AUDIO.pause();
}

function previousSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = SONG_FILES.length - 1;
  }

  loadSongs(SONG_FILES[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex >= SONG_FILES.length) {
    songIndex = 0;
  }

  loadSongs(SONG_FILES[songIndex]);
  playSong();
}

function updateSongTrack(e) {
  const SONG_DURATION = e.srcElement.duration,
        SONG_CURRENT_TIME = e.srcElement.currentTime,
        SONG_PROGRESS = (SONG_CURRENT_TIME /SONG_DURATION) * 100;
  SONG_TRACK_PLAYED.style.width = `${SONG_PROGRESS}%`;
}

function setSongTrack(e) {
  const SONG_TRACK_WIDTH = this.clientWidth,
        CLICK_X = e.offsetX,
        SONG_DURATION = SONG_AUDIO.duration;

  SONG_AUDIO.currentTime = (CLICK_X / SONG_TRACK_WIDTH) * SONG_DURATION;

}

PLAY_BTN.addEventListener('click', () => {
  const IS_PLAYING = MUSIC_PLAYER.classList.contains('music-player--play');

  if (IS_PLAYING) {
    pauseSong();
  } else {
    playSong();
  }
});

PREVIOUS_BTN.addEventListener('click', previousSong);
NEXT_BTN.addEventListener('click', nextSong);
SONG_AUDIO.addEventListener('timeupdate', updateSongTrack);
SONG_TRACK.addEventListener('click', setSongTrack);
SONG_AUDIO.addEventListener('ended', nextSong);
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist")

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "sami-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto"
  },
  {
    name: 'sami-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto',
  },
  {
    name: 'sami-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto',
  },
]

// Check if Playing
let isPlaying = false;

//  Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle")
  playBtn.setAttribute("title","Pause")
  music.play();
}

// Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle")
  playBtn.setAttribute("title","Play")
  music.pause();
}

// Play or Pause Event Listener 
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong()
}

// Previous Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playSong()
}

// On Load -Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`
    }    
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar 
const setProgressBar = (event) => {
  // const width = this.clientWidth;
  const width = event.srcElement.clientWidth
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
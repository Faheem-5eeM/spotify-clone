// alert("Welcome to Spotify");

//initialize the variables
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

var audioPlayer = document.getElementById('audioPlayer');
var audioSource = document.getElementById('audioSource');
let p = false

//objects using arry
//[] array 
//{} objects
//() function
//"" ' ' - strings
let songs = [
  { songName: "1", filePath: "songs/1.mp3", singer: "Arijit Singh", coverPath: "img/songicon.jpg" },
  { songName: "2", filePath: "songs/2.mp3", singer: "Honey Singh", coverPath: "img/songicon.jpg" },
  { songName: "3", filePath: "songs/3.mp3", singer: "Mika Singh", coverPath: "img/songicon.jpg" },
]

// Function to create a song item
function createSongItem(song) {
  let audio, duration
  let songItem = document.createElement('div');
  songItem.className = 'songItem';
  songItem.onclick = function () {
    playTrack(song.filePath);
  };
  audio = new Audio(song.filePath);

  //load the audio to find the audio duration
  audio.addEventListener('loadedmetadata', function () {
    duration = audio.duration;
    timestampSpan.textContent = `${formatTime(audio.duration)}`;
  });

  songItem.innerHTML = `
    <img src="${song.coverPath}" alt="${song.songName}">
    <span class="song-name">${song.songName} - ${song.singer}</span>
    <span class="songListplay"><span class="timestamp"><i class="far fa-play-circle"></i></span></span>`;

  let timestampSpan = songItem.querySelector('.timestamp');
  return songItem;
}

// Function to format time in MM:SS format
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  
}

// Function to render the song list  from song list
function renderSongList() {
  let songListContainer = document.getElementById('songListContainer');

  songs.map((song, index) => {
    let songItem = createSongItem(song);
    songListContainer.appendChild(songItem);
  });
}
// Call the function to render the song list
renderSongList();

//to play the audio
function playTrack(track) {
  // Set the source of the audio element
  audioSource.src = track;

  // Load and play the new track
  audioPlayer.load();
  checkAudio();
}

//pause and play button
masterPlay.addEventListener('click', () => {
  if(!p){
    alert('click a song')
    return
  }
  checkAudio();
  
})
//to play the audio
function play() {
  audioPlayer.play();
  p = true;
}
//to pause the audio
function pause() {
  p = false
  audioPlayer.pause();
}

//to check whether the audio is playing ot not
function checkAudio(){
  if (!p) {
    play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
}

// Listen to Events
audioPlayer.addEventListener('timeupdate', () => {
  // Update Seekbar
  let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  myProgressBar.value = progress;
  // Check if the audio has completed playing
  if (audioPlayer.currentTime === audioPlayer.duration) {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    p = false;
  }
});

myProgressBar.addEventListener('change', () => {
  audioPlayer.currentTime = myProgressBar.value * audioPlayer.duration / 100;
})
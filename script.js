console.log("Welcome to Spotify");

// Initialize the variables 
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "High Hopes", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "My Ordinary Life", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "BCK - Born Different", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "She make it clap", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Skan & Krale - No Glory", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Stay - Zedd, Alessia Cara", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Finish Line", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
]


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



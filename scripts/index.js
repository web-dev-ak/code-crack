// Music Player
let musicDiskIcon = document.getElementById('disk-icon');
let songName = document.getElementById('song-name');
let artistName = document.getElementById('artist-name');

const playBtn = document.getElementById('btn-play');
const pauseBtn = document.getElementById('btn-pause');
const nextBtn = document.getElementById('btn-next');
const previousBtn = document.getElementById('btn-previous');
const unmutedIcon = document.getElementById('unmuted-icon');
const mutedIcon = document.getElementById('muted-icon');

let currentSongIndex = 0;
let isPlaying = false;
let isMuted = false;

// Array of C418 Music
let songs = [
    new Audio('../resources/audios/C418 - Beginning - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Cat - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Chris - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Clark - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Danny - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Death - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Dog - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Droopy likes Ricochet - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Droopy likes your Face - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Dry Hands - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Équinoxe - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Excuse - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Haggstrom - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Key - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Living Mice - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Mice on Venus - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Minecraft - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Moog City - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Oxygène - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Subwoofer Lullaby - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Sweden - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Thirteen - Minecraft Volume Alpha.mp3'),
    new Audio('../resources/audios/C418 - Wet Hands - Minecraft Volume Alpha.mp3'),
];

const songMetadata = [
    { name: 'Beginning', artist: 'C418' },
    { name: 'Cat', artist: 'C418' },
    { name: 'Chris', artist: 'C418' },
    { name: 'Clark', artist: 'C418' },
    { name: 'Danny', artist: 'C418' },
    { name: 'Death', artist: 'C418' },
    { name: 'Dog', artist: 'C418' },
    { name: 'Droopy likes Ricochet', artist: 'C418' },
    { name: 'Droopy likes your Face', artist: 'C418' },
    { name: 'Dry Hands', artist: 'C418' },
    { name: 'Équinoxe', artist: 'C418' },
    { name: 'Excuse', artist: 'C418' },
    { name: 'Haggstrom', artist: 'C418' },
    { name: 'Key', artist: 'C418' },
    { name: 'Living Mice', artist: 'C418' },
    { name: 'Mice on Venus', artist: 'C418' },
    { name: 'Minecraft', artist: 'C418' },
    { name: 'Moog City', artist: 'C418' },
    { name: 'Oxygène', artist: 'C418' },
    { name: 'Subwoofer Lullaby', artist: 'C418' },
    { name: 'Sweden', artist: 'C418' },
    { name: 'Thirteen', artist: 'C418' },
    { name: 'Wet Hands', artist: 'C418' },
];

// Update song details in UI
function updateSongDetails(index) {
    songName.textContent = songMetadata[index].name;
    artistName.textContent = songMetadata[index].artist;
}

// Play the current song
function playCurrentSong() {
    songs[currentSongIndex].play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    songs[currentSongIndex].addEventListener('ended', playNextSong);  // Autoplay next song
}

// Stop the current song
function stopCurrentSong() {
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;  // Reset song
}

// Pause the current song
function pauseCurrentSong() {
    songs[currentSongIndex].pause();
    isPlaying = false;
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

// Move to next song
function playNextSong() {
    stopCurrentSong();
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongDetails(currentSongIndex);
    playCurrentSong();
}

// Move to previous song
function playPreviousSong() {
    stopCurrentSong();
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongDetails(currentSongIndex);
    playCurrentSong();
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
}

// Randomize the playlist and update UI
function randomizePlaylist() {
    shuffleArray(songs);  // Shuffle the songs array
    shuffleArray(songMetadata);  // Shuffle metadata to sync with songs
    currentSongIndex = 0;  // Reset index
    updateSongDetails(currentSongIndex);
}

// Mute or unmute the current song
function toggleMute() {
    if (songs[currentSongIndex].muted) {
        songs[currentSongIndex].muted = false;
        mutedIcon.style.display = 'none';
        unmutedIcon.style.display = 'block';
    } else {
        songs[currentSongIndex].muted = true;
        unmutedIcon.style.display = 'none';
        mutedIcon.style.display = 'block';
    }
}

// Sound Effects on Clicks
const sounds = {
    'click-sound': new Audio('../resources/sound-effects/minecraft-click-sfx.mp3')
};

function playSound(sound) {
    if (!sounds[sound]) return;
    sounds[sound].currentTime = 0;  // Reset sound
    sounds[sound].play();
}

// Event listener for all elements with 'data-sound' attribute
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.hasAttribute('data-sound')) {
        playSound(target.getAttribute('data-sound'));
    } else if (target.closest('[data-sound]')) {
        playSound(target.closest('[data-sound]').getAttribute('data-sound'));
    }
});

// Automatically play music when user interacts with the page
function startMusicOnInteraction() {
    randomizePlaylist();  // Shuffle playlist on first interaction
    playCurrentSong();    // Start the first song
    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
    document.removeEventListener('touchstart', startMusicOnInteraction);
}

// Add event listeners for user interaction
document.addEventListener('click', startMusicOnInteraction);
document.addEventListener('keydown', startMusicOnInteraction);
document.addEventListener('touchstart', startMusicOnInteraction);

// Event Listeners for Play, Pause, Next, Previous buttons
playBtn.addEventListener('click', playCurrentSong);
pauseBtn.addEventListener('click', pauseCurrentSong);
nextBtn.addEventListener('click', playNextSong);
previousBtn.addEventListener('click', playPreviousSong);

// Mute/Unmute button
document.querySelector('.music-player-mute-btn').addEventListener('click', toggleMute);

// Initialize song details
updateSongDetails(currentSongIndex);

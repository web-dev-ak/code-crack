// VARIABLE DECLARATION -------------------------------------------------------------------
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

// THEME SWITCHER -------------------------------------------------------------------

let themeModeToggleBtn = document.getElementsByClassName('theme-mode-switch-btn')[0];
let lightModeIcon = document.getElementById('light-mode-icon');
let darkModeIcon = document.getElementById('dark-mode-icon');

// Function to check if element is visible
function isVisible(element) {
    return getComputedStyle(element).display !== 'none';
}

// Function to swap dark mode and light mode icons
themeModeToggleBtn.addEventListener('click', function(){
    if (isVisible(lightModeIcon)) {
        darkModeIcon.style.display = 'block';
        lightModeIcon.style.display = 'none';
        document.querySelector('html').setAttribute('data-theme', 'dark');
    } else {
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = 'block';
        document.querySelector('html').setAttribute('data-theme', 'light');
    }
});

// Function to switch between theme modes
// themeModeToggleBtn.addEventListener('click', function(){
//     if()
// })


// MUSIC PLAYER -------------------------------------------------------------------
// Combined Playlist of C418 Music and Metadata
let playlist = [
    { audio: new Audio('../resources/audios/C418 - Beginning - Minecraft Volume Alpha.mp3'), name: 'Beginning', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Cat - Minecraft Volume Alpha.mp3'), name: 'Cat', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Chris - Minecraft Volume Alpha.mp3'), name: 'Chris', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Clark - Minecraft Volume Alpha.mp3'), name: 'Clark', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Danny - Minecraft Volume Alpha.mp3'), name: 'Danny', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Death - Minecraft Volume Alpha.mp3'), name: 'Death', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Dog - Minecraft Volume Alpha.mp3'), name: 'Dog', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Droopy likes Ricochet - Minecraft Volume Alpha.mp3'), name: 'Droopy likes Ricochet', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Droopy likes your Face - Minecraft Volume Alpha.mp3'), name: 'Droopy likes your Face', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Dry Hands - Minecraft Volume Alpha.mp3'), name: 'Dry Hands', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Équinoxe - Minecraft Volume Alpha.mp3'), name: 'Équinoxe', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Excuse - Minecraft Volume Alpha.mp3'), name: 'Excuse', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Haggstrom - Minecraft Volume Alpha.mp3'), name: 'Haggstrom', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Key - Minecraft Volume Alpha.mp3'), name: 'Key', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Living Mice - Minecraft Volume Alpha.mp3'), name: 'Living Mice', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Mice on Venus - Minecraft Volume Alpha.mp3'), name: 'Mice on Venus', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Minecraft - Minecraft Volume Alpha.mp3'), name: 'Minecraft', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Moog City - Minecraft Volume Alpha.mp3'), name: 'Moog City', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Oxygène - Minecraft Volume Alpha.mp3'), name: 'Oxygène', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Subwoofer Lullaby - Minecraft Volume Alpha.mp3'), name: 'Subwoofer Lullaby', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Sweden - Minecraft Volume Alpha.mp3'), name: 'Sweden', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Thirteen - Minecraft Volume Alpha.mp3'), name: 'Thirteen', artist: 'C418' },
    { audio: new Audio('../resources/audios/C418 - Wet Hands - Minecraft Volume Alpha.mp3'), name: 'Wet Hands', artist: 'C418' },
];

// Update song details in UI
function updateSongDetails(index) {
    songName.textContent = playlist[index].name;
    artistName.textContent = playlist[index].artist;
}

// Play the current song and start the disk spinning
function playCurrentSong() {
    playlist[currentSongIndex].audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';

    // Start the disk icon spinning
    musicDiskIcon.classList.add('spin');

    playlist[currentSongIndex].audio.addEventListener('ended', playNextSong);  // Autoplay next song
}

// Stop the current song and stop the disk spinning
function stopCurrentSong() {
    playlist[currentSongIndex].audio.pause();
    playlist[currentSongIndex].audio.currentTime = 0;  // Reset song
    musicDiskIcon.classList.remove('spin');  // Stop spinning
}

// Pause the current song and stop the disk spinning
function pauseCurrentSong() {
    playlist[currentSongIndex].audio.pause();
    isPlaying = false;
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';

    // Stop the disk icon spinning
    musicDiskIcon.classList.remove('spin');
}

// Move to next song
function playNextSong() {
    stopCurrentSong();
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    updateSongDetails(currentSongIndex);
    playCurrentSong();
}

// Move to previous song
function playPreviousSong() {
    stopCurrentSong();
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    updateSongDetails(currentSongIndex);
    playCurrentSong();
}

// Shuffle playlist and keep songs and metadata in sync
function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];  // Swap elements
    }
    currentSongIndex = 0;  // Reset index
    updateSongDetails(currentSongIndex);
}

// Mute or unmute the current song
function toggleMute() {
    const audio = playlist[currentSongIndex].audio;
    audio.muted = !audio.muted;
    mutedIcon.style.display = audio.muted ? 'block' : 'none';
    unmutedIcon.style.display = audio.muted ? 'none' : 'block';
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
    shufflePlaylist();  // Shuffle playlist on first interaction
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

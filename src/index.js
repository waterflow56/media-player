window.addEventListener('DOMContentLoaded', () => {
  document.body.style.display = 'block';
})

// Variables
// General
const audio = document.getElementsByTagName('audio')[0];
const playBtn = document.querySelector('.play-btn');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

// Music from discover section
const songsArr = ['OneRepublic - Rescue Me', 'Taylor Swift - ME! (feat. Brendon Urie)', 'Miike Snow - Genghis Khan', 'The Weeknd - Blinding Lights', 'The Chain Gang of 1974 - Bends ft. TWINKIDS'];
const audioSongName = document.querySelector('.audio-song-name');
const audioSongCover = document.getElementById('audio-song-cover');
const audioPlayer = document.querySelector('.audio-player');

// Music from top hits section
const hitsArr = ['OneRepublic - Rescue Me', 'Miike Snow - Genghis Khan', 'The Killers - The Man', 'Capital Cities - Safe and Sound', 'Young the Giant - Superposition', 'Panic! At The Disco - Into the Unknown', 'Maroon 5 - Cold', 'Miley Cyrus - Mother\'s Daughter'];
const topHits = document.querySelectorAll('.top-hit');

// Repeat btn
const repeatBtn = document.getElementById('repeat-btn');

// Volume btn
const volumeBtn = document.getElementById('volume-btn');
let bufferedVolume = 0;
const volumeContainer = document.querySelector('.volume-progress-container');
const volumeProgress = document.querySelector('.volume-progress');



// Play music via audio player
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    checkForDarkMode(document.getElementById('play-btn-icon'), 'pause-btn');
  } else {
    audio.pause();
    checkForDarkMode(document.getElementById('play-btn-icon'), 'play-btn');
  }
});


// Set progress
function setProgress(e) {
  // Set progress
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('timeupdate', () => {
  // Get minutes
  let currentMins = Math.floor(audio.currentTime / 60);
  if (currentMins < 10) {
    currentMins = '0' + String(currentMins);
  }
  let mins = Math.floor(audio.duration / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  // Get seconds
  let currentSecs = Math.floor(audio.currentTime % 60);
  if (currentSecs < 10) {
    currentSecs = '0' + String(currentSecs);
  }
  let secs = Math.floor(audio.duration % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  document.getElementById('current-audio-progress').innerText = `${currentMins}:${currentSecs}`;

  document.getElementById('audio-duration').innerText = `${mins}:${secs}`;

  // Update play/pause icon by audio current state
  if (audio.paused) {
    checkForDarkMode(document.querySelector('.play-btn').children[0], 'play-btn');
    // }
  } else {
    checkForDarkMode(document.querySelector('.play-btn').children[0], 'pause-btn');
  }

  // Update progress
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
})

// Get music from discover section
document.querySelectorAll('.song-cover').forEach((song) => {
  song.addEventListener('click', (e) => {
    const newArr = [...e.target.parentElement.children];
    console.log(newArr[1].textContent);
    console.log(newArr[2].textContent);
    songsArr.forEach(song => {
      if (song.includes(newArr[1].textContent) && song.includes(newArr[2].textContent)) {
        audio.src = `../assets/music/${song}.mp3`;
        audio.play();
        audioSongName.children[0].textContent = newArr[2].textContent;
        audioSongName.children[1].textContent = newArr[1].textContent;
        audioSongCover.style.background = `url('../assets/images/${song}.jpg')
        center center/cover no-repeat`;
        audioPlayer.style.transform = 'translateY(0%)';
        checkForDarkMode(document.getElementById('play-btn-icon'), 'pause-btn');
      }
    })
  })
})



// Get music from Today's Top Hits
topHits.forEach(hit => {
  hit.addEventListener('click', () => {
      hitsArr.forEach(song => {
      if (song.includes(hit.children[1].firstElementChild.textContent)) {
        audio.src = `../assets/music/${song}.mp3`;
        audio.play();

        // Split song name
        const splitedSongArr = song.split(' - ');
        const songName = splitedSongArr[0];
        const songArtist = splitedSongArr[1];

        // Insert song info into DOM
        audioSongName.children[0].textContent = songName;
        audioSongName.children[1].textContent = songArtist;
        if (song.includes('\'')) {
          audioSongCover.style.background = `url('../assets/images/${song.replace('\'', '')}.jpg')
        center center/cover no-repeat`;
        } else {
          audioSongCover.style.background = `url('../assets/images/${song}.jpg')
          center center/cover no-repeat`;
        }

        // Select song
        // topHits.forEach(hit => {
        //   if (hit.children[1].firstElementChild.textContent === song) {
        //     // hit.firstElementChild.style.color = '#0066ff';
        //     // hit.style.borderLeft = '4px solid #0066ff';
        //     // hit.style.borderTopLeftRadius = '0';
        //     // hit.style.borderBottomLeftRadius = '0';
        //     // hit.style.transform = 'scale(1.02)';
        //     hit.classList.add('playing');
        //   } else {
        //     hit.classList.('playing');
        //     // hit.firstElementChild.style.color = 'initial';
        //     // // hit.style.transform = 'scale(1)';
        //     // hit.style.borderLeft = 'none';
        //     // hit.style.borderTopLeftRadius = '5px';
        //     // hit.style.borderBottomLeftRadius = '5px';
        //   }
        // })

        // Show music player
        audioPlayer.style.transform = 'translateY(0%)';
        checkForDarkMode(document.getElementById('play-btn-icon'), 'pause-btn');
      }
    })
  })
})



// Repeat song
function playSong() {
  audio.play();
}

repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle('repeat');
  if (repeatBtn.classList.contains('repeat')) {
    checkForDarkMode(repeatBtn.children[0], 'repeat-on');
    audio.addEventListener('ended', playSong);
  } else {
    checkForDarkMode(repeatBtn.children[0], 'repeat-off');
    audio.removeEventListener('ended', playSong);
  }
})

// Volume
volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('muted');
  if (volumeBtn.classList.contains('muted')) {
    bufferedVolume = audio.volume;
    audio.volume = 0;
    checkForDarkMode(volumeBtn.children[0], 'muted');
  } else {
    audio.volume = bufferedVolume;
    setVolumeIcon();
  }
})

// Check if dark mode is enabled or not
function checkForDarkMode(el, icon) {
  if (document.body.classList.contains('dark-mode')) {
    el.src = `../assets/icons/DarkMode/${icon}.svg`
  } else {
    el.src = `../assets/icons/LightMode/${icon}.svg`
  }
}

function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.volume = clickX / width;
  volumeProgress.style.width = `${(clickX / width) * 100}%`;
  setVolumeIcon();
}

volumeContainer.addEventListener('click', setVolume);

function setVolumeIcon() {
  if (audio.volume === 0) {
    checkForDarkMode(volumeBtn.children[0], 'muted');
  } else if (audio.volume <= 0.25) {
    checkForDarkMode(volumeBtn.children[0], 'low-volume');
  } else if (audio.volume > 0.25 && audio.volume < 0.75) {
    checkForDarkMode(volumeBtn.children[0], 'medium-volume');
  } else if (audio.volume >= 0.75) {
    checkForDarkMode(volumeBtn.children[0], 'high-volume');
  }
}

// Import Dark Mode file
// import { darkMode } from './_dark-mode';

const darkModeToggle = document.getElementById('dark-mode-toggle');

const darkMode = darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    document.getElementById('favicon').href = '../assets/icons/DarkMode/logo.png';
    document.getElementById('home-icon').src = '../assets/icons/DarkMode/home.svg';
    document.getElementById('albums-icon').src = '../assets/icons/DarkMode/albums.svg';
    document.getElementById('artists-icon').src = '../assets/icons/DarkMode/artists.svg';
    document.getElementById('videos-icon').src = '../assets/icons/DarkMode/videos.svg';
    document.getElementById('clock-icon').src = '../assets/icons/DarkMode/clock.svg';
    document.querySelectorAll('#like-icon').forEach((el) => {
      el.src = '../assets/icons/DarkMode/like.svg';
    });
    document.getElementById('library-icon').src = '../assets/icons/DarkMode/library.svg';
    document.getElementById('settings-icon').src = '../assets/icons/DarkMode/settings.svg';
    document.getElementById('bell-icon').src = '../assets/icons/DarkMode/bell.svg';
    document.getElementById('previous-btn-icon').src = '../assets/icons/DarkMode/previous-btn.svg';
    if (audio.currentTime === 0 || audio.paused) {
      document.getElementById('play-btn-icon').src = '../assets/icons/DarkMode/play-btn.svg';
    };
    document.getElementById('next-btn-icon').src = '../assets/icons/DarkMode/next-btn.svg';
    if (repeatBtn.classList.contains('repeat')) {
      repeatBtn.children[0].src = '../assets/icons/DarkMode/repeat-on.svg';
    } else {
      repeatBtn.children[0].src = '../assets/icons/DarkMode/repeat-off.svg';
    };
    setVolumeIcon();
  } else {
    document.getElementById('favicon').href = '../assets/icons/LightMode/logo.png';
    document.getElementById('home-icon').src = '../assets/icons/LightMode/home.svg';
    document.getElementById('albums-icon').src = '../assets/icons/LightMode/albums.svg';
    document.getElementById('artists-icon').src = '../assets/icons/LightMode/artists.svg';
    document.getElementById('videos-icon').src = '../assets/icons/LightMode/videos.svg';
    document.getElementById('clock-icon').src = '../assets/icons/LightMode/clock.svg';
    document.querySelectorAll('#like-icon').forEach((el) => {
      el.src = '../assets/icons/LightMode/like.svg';
    });
    document.getElementById('library-icon').src = '../assets/icons/LightMode/library.svg';
    document.getElementById('settings-icon').src = '../assets/icons/LightMode/settings.svg';
    document.getElementById('bell-icon').src = '../assets/icons/LightMode/bell.svg';
    document.getElementById('previous-btn-icon').src = '../assets/icons/LightMode/previous-btn.svg';
    if (audio.currentTime === 0 || audio.paused) {
      document.getElementById('play-btn-icon').src = '../assets/icons/LightMode/play-btn.svg';
    };
    document.getElementById('next-btn-icon').src = '../assets/icons/LightMode/next-btn.svg';
    if (repeatBtn.classList.contains('repeat')) {
      repeatBtn.children[0].src = '../assets/icons/LightMode/repeat-on.svg';
    } else {
      repeatBtn.children[0].src = '../assets/icons/LightMode/repeat-off.svg';
    };
    setVolumeIcon();
  }
});



// Video player
const video = document.getElementsByTagName('video')[0];
const videoControls = document.querySelector('.video-controls');
const videoPlayBtn = document.getElementById('video-play');
const videoVolumeBtn = document.getElementById('video-volume');
const videoExpandBtn = document.getElementById('video-expand');
const videoContainer = document.getElementById('video-container');
const videoProgressContainer = document.querySelector('.video-progress-container');
const videoProgress = document.querySelector('.video-progress');
const videoBtnButtons = document.querySelectorAll('.btn');
const videoTimestamp = document.getElementById('video-timestamp');

function playVideo() {
  if (video.paused) {
    video.play();
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoPlayBtn.firstElementChild.className = 'fas fa-pause fa-2x';
    } else {
      videoPlayBtn.firstElementChild.className = 'fas fa-pause';
    }
  } else {
    video.pause();
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoPlayBtn.firstElementChild.className = 'fas fa-play fa-2x';
    } else {
      videoPlayBtn.firstElementChild.className = 'fas fa-play';
    }
  }
}

function setVideoProgress(e) {
  const userOffset = e.offsetX;
  const totalWidth = this.clientWidth;
  video.currentTime = (video.duration * userOffset) / totalWidth;
}

video.addEventListener('click', playVideo);
videoPlayBtn.addEventListener('click', playVideo);
videoProgressContainer.addEventListener('click', setVideoProgress);
video.addEventListener('timeupdate', () => {
  // Update play icon
  if (video.paused) {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoPlayBtn.firstElementChild.className = 'fas fa-play fa-2x';
    } else {
      videoPlayBtn.firstElementChild.className = 'fas fa-play';
    }
  } else {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoPlayBtn.firstElementChild.className = 'fas fa-pause fa-2x';
    } else {
      videoPlayBtn.firstElementChild.className = 'fas fa-pause';
    }
  }

  // Get minutes
  let currentMins = Math.floor(video.currentTime / 60);
  if (currentMins < 10) {
    currentMins = '0' + String(currentMins);
  }
  let totalMins = Math.floor(video.duration / 60);
  if (totalMins < 10) {
    totalMins = '0' + String(totalMins);
  }
  // Get seconds
  let currentSecs = Math.floor(video.currentTime % 60);
  if (currentSecs < 10) {
    currentSecs = '0' + String(currentSecs);
  }
  let totalSecs = Math.floor(video.duration % 60);
  if (totalSecs < 10) {
    totalSecs = '0' + String(totalSecs);
  }

  videoTimestamp.innerText = `${currentMins}:${currentSecs} / ${totalMins}:${totalSecs}`;

  // Update video progress
  const progressPercent = (video.currentTime / video.duration) * 100;
  videoProgress.style.width = `${progressPercent}%`;
})

// Mute button
videoVolumeBtn.addEventListener('click', () => {
  if (video.volume === 0) {
    video.volume = 1;
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoVolumeBtn.firstElementChild.className = 'fas fa-volume-up fa-2x';
    } else {
      videoVolumeBtn.firstElementChild.className = 'fas fa-volume-up';
    }
  } else {
    video.volume = 0;
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
      videoVolumeBtn.firstElementChild.className = 'fas fa-volume-mute fa-2x';
    } else {
      videoVolumeBtn.firstElementChild.className = 'fas fa-volume-mute';
    }
  }
})

// Show/hide video controls
function showControls() {
  videoControls.style.opacity = '1';
}

function hideControls() {
  videoControls.style.opacity = '0';
}

videoContainer.addEventListener('mouseenter', showControls);

videoContainer.addEventListener('mouseleave', hideControls);

video.addEventListener('ended', () => {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
    videoPlayBtn.firstElementChild.className = 'fas fa-play fa-2x';
  } else {
    videoPlayBtn.firstElementChild.className = 'fas fa-play';
  }
})

// document.addEventListener("fullscreenchange", onFullScreenChange);
// document.addEventListener("webkitfullscreenchange", onFullScreenChange);
// document.addEventListener("mozfullscreenchange", onFullScreenChange);

function resizeControlsOnExpand() {
  videoExpandBtn.firstElementChild.classList.remove('fa-expand');
  videoExpandBtn.firstElementChild.classList.add('fa-compress');
  videoProgressContainer.style.width = '78%';
  videoTimestamp.style.fontSize = '18px';
  videoProgressContainer.style.height = '7px';
  videoContainer.removeEventListener('mouseenter', showControls);
  videoContainer.removeEventListener('mouseleave', hideControls);
  videoControls.addEventListener('mouseenter', showControls);
  videoControls.addEventListener('mouseleave', hideControls);
}

function resizeControlsOnCompress() {
  videoExpandBtn.firstElementChild.classList.remove('fa-compress');
  videoExpandBtn.firstElementChild.classList.add('fa-expand');
  videoProgressContainer.style.width = '60%';
  videoTimestamp.style.fontSize = '13px';
  videoProgressContainer.style.height = '5px';
  videoContainer.addEventListener('mouseenter', showControls);
  videoContainer.addEventListener('mouseleave', hideControls);
  videoControls.removeEventListener('mouseenter', showControls);
  videoControls.removeEventListener('mouseleave', hideControls);
}

videoExpandBtn.addEventListener('click', () => {
  // Expand
  if (videoContainer.requestFullscreen && videoExpandBtn.className === 'btn') {
    resizeControlsOnExpand();
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen && videoExpandBtn.className === 'btn') {
    resizeControlsOnExpand();
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen && videoExpandBtn.className === 'btn') {
    resizeControlsOnExpand();
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen && videoExpandBtn.className === 'btn') {
    resizeControlsOnExpand();
    videoContainer.msRequestFullscreen();
  }

  // Compress
  if (document.exitFullscreen && videoExpandBtn.className === 'btn expanded') {
    resizeControlsOnCompress()
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen && videoExpandBtn.className === 'btn expanded') {
    resizeControlsOnCompress()
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen && videoExpandBtn.className === 'btn expanded') {
    resizeControlsOnCompress()
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen && videoExpandBtn.className === 'btn expanded') {
    resizeControlsOnCompress()
    document.msExitFullscreen();
  }
  videoBtnButtons.forEach(btn => {
    btn.firstElementChild.classList.toggle('fa-2x');
  })
  videoExpandBtn.classList.toggle('expanded');
})
// Content Loaded
import './modules/test.js';

// SIDEBAR
// Vars
const homeMainToggle = document.getElementById('home-main-toggle');
const videosMainToggle = document.getElementById('videos-main-toggle');
const favSongsMainToggle = document.getElementById('fav-songs-main-toggle');
const homeMain = document.querySelector('main.home-main');
const favSongsMain = document.querySelector('main.fav-songs-main');
const videosMain = document.querySelector('main.videos-main');

const toggleArr = [homeMainToggle, videosMainToggle, favSongsMainToggle];
const mainArr = [homeMain, favSongsMain, videosMain];

function toggleMainSection(toggleElement, mainElement) {
  toggleArr.forEach(toggleEl => {
    if (toggleEl == toggleElement) {
      toggleEl.classList.add('active');
    } else {
      toggleEl.classList.remove('active');
    }
  });

  mainArr.forEach(mainEl => {
    if (mainEl == mainElement) {
      mainEl.style.display = 'block';
    } else {
      mainEl.style.display = 'none';
    }
  })
}

homeMainToggle.addEventListener('click', () => {
  toggleMainSection(homeMainToggle, homeMain);
});
videosMainToggle.addEventListener('click', () => {
  toggleMainSection(videosMainToggle, videosMain);
});
favSongsMainToggle.addEventListener('click', () => {
  toggleMainSection(favSongsMainToggle, favSongsMain);
});


// SIDEBAR MOBILE
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');
const header = document.getElementById('header');
const searchContainerToggle = document.getElementById('search-toggle');
const closeBtn = document.getElementById('close-btn');
const sectionToggles = document.querySelectorAll('.section-toggle');

function showToggle(element) {
  element.classList.toggle('show');
}

menuToggle.addEventListener('click', () => showToggle(menu));
sectionToggles.forEach(listItem => listItem.addEventListener('click', () => {
  showToggle(menu);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}));
searchContainerToggle.addEventListener('click', () => showToggle(header));
closeBtn.addEventListener('click', () => showToggle(header));


window.fetch('./data.json', {
  method: 'GET'
})
  .then(res => res.json())
  .then(data => {
    // FETCHING DATA
    // New Releases Data
    data.newReleases.forEach(songInfo => {
      const songsContainer = document.querySelector('.preview-container');
      const songContainer = document.createElement('div');
      const songCover = document.createElement('div');
      const songImg = document.createElement('img');
      const songName = document.createElement('h3');
      const songArtist = document.createElement('h4');

      songContainer.className = 'song-container';
      songCover.className = 'song-cover';
      songImg.src = songInfo.imgURL;
      songName.innerText = songInfo.name;
      songArtist.innerText = songInfo.artist;
      
      songCover.appendChild(songImg);
      songContainer.appendChild(songCover);
      songContainer.appendChild(songName);
      songContainer.appendChild(songArtist);
      songsContainer.appendChild(songContainer);
    })

    // Today's Top Hits Data
    data.topHits.forEach(topHitInfo => {
      const topHitsContainer = document.querySelector('.top-hits-container');
      const topHitContainer = document.createElement('div');
      const position = document.createElement('span');
      const songInfo = document.createElement('div');
      const songName = document.createElement('p');
      const songAlbum = document.createElement('p');
      const likeBtn = document.createElement('button');
      const likeIcon = document.createElement('img');

      topHitContainer.className = 'top-hit';
      position.innerText = getHitsPosition();
      songInfo.className = 'song-info';
      songName.innerText = `${topHitInfo.artist} - ${topHitInfo.name}`;
      songAlbum.innerText = topHitInfo.album;
      likeIcon.src = './assets/icons/LightMode/like.svg';

      likeBtn.appendChild(likeIcon);
      songInfo.appendChild(songName);
      songInfo.appendChild(songAlbum);
      topHitContainer.appendChild(position);
      topHitContainer.appendChild(songInfo);
      topHitContainer.appendChild(likeBtn);
      topHitsContainer.appendChild(topHitContainer);

      function getHitsPosition() {
        if (topHitInfo.position < 10) {
          return '0'+ topHitInfo.position + '.';
        } else {
          return topHitInfo.position + '.';
        }
      }
    })

    // Videos Main Data
    data.videosMain.forEach(videoInfo => {
      const videosContainer = document.querySelector('.videos-container');
      const videoWrapper = document.createElement('div');
      const videoContainer = document.createElement('div');
      const videoTimestamp = document.createElement('span');
      // const videoControls = document.createElement('div');
      const video = document.createElement('video');
      const videoTitle = document.createElement('h3');

      video.src = videoInfo.videoURL;
      video.setAttribute('controls', true);
      video.setAttribute('poster', videoInfo.videoPoster);
      videoTimestamp.innerText = getFullVideoTimestamp();
      videoContainer.className = 'video-container';
      videoContainer.appendChild(videoTimestamp);
      videoContainer.appendChild(video);
      videoTitle.innerText = videoInfo.videoTitle;
      videoWrapper.className = 'video';
      videoWrapper.appendChild(videoContainer);
      videoWrapper.appendChild(videoTitle);
      videosContainer.appendChild(videoWrapper);

      function getFullVideoTimestamp() {
        // Get minutes
        let mins = Math.floor(videoInfo.videoDuration / 60);
        if (mins < 10) {
          mins = '0' + String(mins);
        }
        // Get seconds
        let secs = Math.floor(videoInfo.videoDuration % 60);
        if (secs < 10) {
          secs = '0' + String(secs);
        }
        return `${mins}:${secs}`;
      }
    })

    // Favorite Songs Main Data
    data.favoriteSongsMain.forEach(songInfo => {
      const songsContainer = document.querySelector('.grid-content');
      const songContainer = document.createElement('div');
      const songPosition = document.createElement('h3');
      const songName = document.createElement('h3');
      const nameDivider = document.createElement('span');
      const songArtist = document.createElement('h3');
      const songAlbum = document.createElement('h3');
      const songAddedDate = document.createElement('h3');
      const likeBtn = document.createElement('button');
      const likeIcon = document.createElement('img');

      songPosition.innerText = getSongsPosition();
      songName.innerText = songInfo.name;
      songName.className = 'name';
      nameDivider.innerText = '-';
      songArtist.className = 'artist';
      songArtist.innerText = songInfo.artist;
      songAlbum.innerText = songInfo.album;
      songAddedDate.innerText = songInfo.addedDate;
      likeIcon.src = './assets/icons/LightMode/liked.svg';
      songContainer.className = 'fav-song';
      // Slice artist if total row length is more than 38 chars
      // if (songInfo.name.length + 3 + songInfo.artist.length > 38) {
      //   const artistChars = 38 - 3 - songInfo.name.length;
      //   const slicedArtist = songInfo.artist.slice(0, artistChars - 1);
      //   const newArtist = slicedArtist + '...';
      //   songArtist.innerText = newArtist;

      // } else {
      //   songArtist.innerText = songInfo.artist;
      // }

      likeBtn.appendChild(likeIcon);
      songContainer.appendChild(songPosition);
      songContainer.appendChild(songName);
      songContainer.appendChild(nameDivider);
      songContainer.appendChild(songArtist);
      songContainer.appendChild(songAlbum);
      songContainer.appendChild(songAddedDate);
      songContainer.appendChild(likeBtn);
      songsContainer.appendChild(songContainer);

      function getSongsPosition() {
        if (songInfo.position < 10) {
          return '0'+ songInfo.position + '.';
        } else {
          return songInfo.position + '.';
        }
      }
    })
  })
  .then(data => {
    const video = document.getElementById('video');
    // LOADING MUSIC
    const audioPlayerSection = document.querySelector('.audio-player');
    const audio = document.getElementById('audio');
    const songName = document.querySelector('.audio-song-name').querySelector('h4');
    const songArtist = document.querySelector('.audio-song-name').querySelector('h3');
    const songCover = document.querySelector('.audio-song-cover');
    const previousBtn = document.querySelector('.previous-btn');
    const playBtn = document.querySelector('.play-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtnIcon = document.getElementById('play-btn-icon');

    const audioDuration = document.getElementById('audio-duration');
    const currentAudioProgress = document.getElementById('current-audio-progress');

    const progressContainer = document.querySelector('.progress-container');
    const progress = document.querySelector('.progress');

    let topHitsArr = [];
    let favSongsArr = [];

    const repeatBtn = document.getElementById('repeat-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeContainer = document.querySelector('.volume-progress-container')
    const volumeProgress = document.querySelector('.volume-progress');
    let volumeBuff;

    let playedSongs = [];
    let currentSongIndex = -1;
    let previousSongIndex = -1;
    let nextSongIndex = -1;

    function playSong() {
      if (audio.paused) {
        playBtnIcon.src = "./assets/icons/LightMode/pause-btn.svg";
        audio.play();
        video.pause();
      } else {
        playBtnIcon.src = "./assets/icons/LightMode/play-btn.svg";
        audio.pause();
      }
    }

    function loadSongInfo(artist, name, song, cover) {
      playedSongs.push({
        playedArtist: artist,
        playedName: name,
        playedSong: song,
        playedCover: cover
      });
      currentSongIndex++;
      previousSongIndex = currentSongIndex - 1;
      nextSongIndex = previousSongIndex + 1;
      audio.src = song;
      audio.addEventListener('loadedmetadata', () => {
        audioDuration.innerText = getAudioTime('duration');
      });
      songName.innerText = name;
      songArtist.innerText = artist;
      songCover.style.background = `url('${cover}') no-repeat center center/cover`;
      if (!audioPlayerSection.classList.contains('show')) {
        audioPlayerSection.classList.add('show');
      }
    }

    function loadStoredSongInfo(position) {
      const song = playedSongs[position].playedSong;
      const name = playedSongs[position].playedName;
      const artist = playedSongs[position].playedArtist;
      const cover = playedSongs[position].playedCover;
      audio.src = song;
      audio.addEventListener('loadedmetadata', () => {
        audioDuration.innerText = getAudioTime('duration');
      });
      songName.innerText = name;
      songArtist.innerText = artist;
      songCover.style.background = `url('${cover}') no-repeat center center/cover`;
    }

    function getAudioTime(timeProgress) {
      let mins = Math.floor(audio[timeProgress] / 60);
      if (mins < 10) {
        mins = '0' + String(mins);
      }
      let secs = Math.floor(audio[timeProgress] % 60);
      if (secs < 10) {
        secs = '0' + String(secs);
      }
      return `${mins}:${secs}`;
    }

    function toggleActive(currentElem, currentElemArr, secondElemArr) {
      currentElemArr.forEach(elem => {
        if (elem == currentElem) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      });

      secondElemArr.forEach(elem => {
        elem.classList.remove('active');
      })
    }

    function repeatToggle() {
      if (!repeatBtn.classList.contains('repeat-on')) {
        repeatBtn.querySelector('img').src = './assets/icons/LightMode/repeat-on.svg';
        repeatBtn.classList.add('repeat-on');
        audio.addEventListener('ended', playSong);
      } else {
        repeatBtn.querySelector('img').src = './assets/icons/LightMode/repeat-off.svg';
        repeatBtn.classList.remove('repeat-on');
        audio.removeEventListener('ended', playSong);
      }
    }

    function muteAudio() {
      if (!volumeBtn.classList.contains('muted')) {
        volumeBtn.classList.add('muted');
        volumeBuff = audio.volume;
        audio.volume = 0;
        volumeBtn.querySelector('img').src = './assets/icons/LightMode/muted.svg';
      } else {
        volumeBtn.classList.remove('muted');
        audio.volume = volumeBuff;
        setVolumeIcon();
      }
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }

    function setVolume(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      audio.volume = clickX / width;
      volumeProgress.style.width = `${(clickX / width) * 100}%`;
      if (volumeBtn.classList.contains('muted')) {
        volumeBtn.classList.remove('muted');
      }
      setVolumeIcon();
    }

    function setVolumeIcon() {
      if (audio.volume >= 0.75) {
        volumeBtn.querySelector('img').src = './assets/icons/LightMode/high-volume.svg';
      } else if (audio.volume > 0.25 && audio.volume < 0.75) {
        volumeBtn.querySelector('img').src = './assets/icons/LightMode/medium-volume.svg';
      } else if (audio.volume <= 0.25) {
        volumeBtn.querySelector('img').src = './assets/icons/LightMode/low-volume.svg';
      }
    }

    document.querySelectorAll('.song-container').forEach(song => {
      song.addEventListener('click', () => {
        const songArtist = song.querySelector('h4').innerText;
        const songName = song.querySelector('h3').innerText;
        const songURL = `./assets/music/${songArtist} - ${songName}.mp3`;
        const coverURL = `./assets/images/${songArtist} - ${songName}.jpg`;
        
        loadSongInfo(songArtist, songName, songURL, coverURL);
        playSong();
      })
    });

    document.querySelectorAll('.top-hit').forEach(song => {
      topHitsArr.push(song);
      song.addEventListener('click', () => {
        const fullSongInfo = song.querySelector('.song-info').firstElementChild.innerText;
        const fullSongInfoArr = fullSongInfo.split(' - ');
        const songArtist = fullSongInfoArr[0];
        const songName = fullSongInfoArr[1];
        const songURL = `./assets/music/${fullSongInfo}.mp3`;
        const coverURL = `./assets/images/${fullSongInfo}.jpg`;

        toggleActive(song, topHitsArr, favSongsArr);

        loadSongInfo(songArtist, songName, songURL, coverURL);
        playSong();
      })
    });

    document.querySelectorAll('.fav-song').forEach(song => {
      favSongsArr.push(song);
      song.addEventListener('click', () => {
        const songArtist = song.querySelector('.artist').innerText;
        const songName = song.querySelector('.name').innerText;
        const songURL = `./assets/music/${songArtist} - ${songName}.mp3`;
        const coverURL = `./assets/images/${songArtist} - ${songName}.jpg`;

        toggleActive(song, favSongsArr, topHitsArr);
        
        loadSongInfo(songArtist, songName, songURL, coverURL);
        playSong();
      })
    });

    // Event Listeners
    playBtn.addEventListener('click', playSong);
    progressContainer.addEventListener('click', setProgress);
    volumeContainer.addEventListener('click', setVolume);
    repeatBtn.addEventListener('click', repeatToggle);
    volumeBtn.addEventListener('click', muteAudio);
    audio.addEventListener('timeupdate', () => {
      currentAudioProgress.innerText = getAudioTime('currentTime');
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${progressPercent}%`;
    });
    audio.addEventListener('ended', () => {
      if (nextSongIndex !== currentSongIndex && !repeatBtn.classList.contains('repeat-on')) {
        nextSongIndex++;
        previousSongIndex++;
        loadStoredSongInfo(nextSongIndex);
        playSong();
      } else {
        playBtnIcon.src = "./assets/icons/LightMode/play-btn.svg";
      }
    });
    previousBtn.addEventListener('click', () => {
      if (previousSongIndex > -1) {
        loadStoredSongInfo(previousSongIndex);
        previousSongIndex--;
        nextSongIndex--;
        playSong();
      }
    });
    nextBtn.addEventListener('click', () => {
      if (nextSongIndex < currentSongIndex) {
        previousSongIndex++;
        nextSongIndex++;
        loadStoredSongInfo(nextSongIndex);
        playSong();
      }
    })
  })
  .catch(err => console.log(err));
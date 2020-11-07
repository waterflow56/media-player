window.addEventListener('DOMContentLoaded', () => {
  document.body.style.display = 'block';
})


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
sectionToggles.forEach(listItem => listItem.addEventListener('click', (e) => {
  showToggle(menu);
  e.stopPropagation();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}));
searchContainerToggle.addEventListener('click', () => showToggle(header));
closeBtn.addEventListener('click', () => showToggle(header));


// FETCHING DATA
window.fetch('./data.json', {
  method: 'GET'
})
  .then(res => res.json())
  .then(data => {
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
        return `${mins}:${secs}`
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

    // Loading Music
    const audio = document.getElementById('audio');

    document.querySelectorAll('.song-container').forEach(song => {
      song.addEventListener('click', () => {
        const songURL = `./assets/music/${song.querySelector('h4').innerText} - ${song.querySelector('h3').innerText}.mp3`;
        audio.src = songURL;
      })
    });

    document.querySelectorAll('.top-hit').forEach(song => {
      song.addEventListener('click', () => {
        const songURL = `./assets/music/${song.querySelector('.song-info').firstElementChild.innerText}.mp3`;
        audio.src = songURL;
      })
    });

    document.querySelectorAll('.fav-song').forEach(song => {
      song.addEventListener('click', () => {
        const songURL = `./assets/music/${song.querySelector('.artist').innerText} - ${song.querySelector('.name').innerText}.mp3`;
        audio.src = songURL;
      })
    });
  })
  .catch(err => console.log(err));
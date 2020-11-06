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
sectionToggles.forEach(listItem => listItem.addEventListener('click', () => showToggle(menu)));
searchContainerToggle.addEventListener('click', () => showToggle(header));
closeBtn.addEventListener('click', () => showToggle(header));


// FETCHING DATA
window.fetch('../src/data.json', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    // New Releases
    data.newReleases.forEach(songInfo => {
      const songsContainer = document.querySelector('.preview-container');
      const songContainer = document.createElement('div');
      const songCover = document.createElement('div');
      const songImg = document.createElement('img');
      const songName = document.createElement('h3');
      const songArtist = document.createElement('h4');

      songContainer.className = 'song-container';
      songCover.className = 'song-cover';
      songImg.src = songInfo.img;
      songName.innerText = songInfo.name;
      songArtist.innerText = songInfo.artist;
      
      songCover.appendChild(songImg);
      songContainer.appendChild(songCover);
      songContainer.appendChild(songName);
      songContainer.appendChild(songArtist);
      songsContainer.appendChild(songContainer);
    })

    // Today's Top Hits
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
      position.innerText = topHitInfo.position + '.';
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
    })
  })
  .catch(err => console.log(err));
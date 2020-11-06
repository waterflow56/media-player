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


homeMainToggle.addEventListener('click', toggleMainSection(homeMainToggle, homeMain));
videosMainToggle.addEventListener('click', toggleMainSection(videosMainToggle, videosMain));
favSongsMainToggle.addEventListener('click', toggleMainSection(favSongsMainToggle, favSongsMain));

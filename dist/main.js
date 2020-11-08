!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){window.addEventListener("DOMContentLoaded",(function(){document.body.style.display="block"}));var n=document.getElementById("home-main-toggle"),o=document.getElementById("videos-main-toggle"),c=document.getElementById("fav-songs-main-toggle"),a=document.querySelector("main.home-main"),i=document.querySelector("main.fav-songs-main"),r=document.querySelector("main.videos-main"),d=[n,o,c],l=[a,i,r];function s(e,t){d.forEach((function(t){t==e?t.classList.add("active"):t.classList.remove("active")})),l.forEach((function(e){e.style.display=e==t?"block":"none"}))}n.addEventListener("click",(function(){s(n,a)})),o.addEventListener("click",(function(){s(o,r)})),c.addEventListener("click",(function(){s(c,i)}));var u=document.getElementById("menu"),m=document.getElementById("menu-toggle"),p=document.getElementById("header"),f=document.getElementById("search-toggle"),h=document.getElementById("close-btn"),v=document.querySelectorAll(".section-toggle");function g(e){e.classList.toggle("show")}m.addEventListener("click",(function(){return g(u)})),v.forEach((function(e){return e.addEventListener("click",(function(){g(u),window.scrollTo({top:0,left:0,behavior:"smooth"})}))})),f.addEventListener("click",(function(){return g(p)})),h.addEventListener("click",(function(){return g(p)})),window.fetch("./data.json",{method:"GET"}).then((function(e){return e.json()})).then((function(e){e.newReleases.forEach((function(e){var t=document.querySelector(".preview-container"),n=document.createElement("div"),o=document.createElement("div"),c=document.createElement("img"),a=document.createElement("h3"),i=document.createElement("h4");n.className="song-container",o.className="song-cover",c.src=e.imgURL,a.innerText=e.name,i.innerText=e.artist,o.appendChild(c),n.appendChild(o),n.appendChild(a),n.appendChild(i),t.appendChild(n)})),e.topHits.forEach((function(e){var t=document.querySelector(".top-hits-container"),n=document.createElement("div"),o=document.createElement("span"),c=document.createElement("div"),a=document.createElement("p"),i=document.createElement("p"),r=document.createElement("button"),d=document.createElement("img");n.className="top-hit",o.innerText=e.position<10?"0"+e.position+".":e.position+".",c.className="song-info",a.innerText="".concat(e.artist," - ").concat(e.name),i.innerText=e.album,d.src="./assets/icons/LightMode/like.svg",r.appendChild(d),c.appendChild(a),c.appendChild(i),n.appendChild(o),n.appendChild(c),n.appendChild(r),t.appendChild(n)})),e.videosMain.forEach((function(e){var t=document.querySelector(".videos-container"),n=document.createElement("div"),o=document.createElement("div"),c=document.createElement("span"),a=document.createElement("video"),i=document.createElement("h3");a.src=e.videoURL,a.setAttribute("controls",!0),a.setAttribute("poster",e.videoPoster),c.innerText=function(){var t=Math.floor(e.videoDuration/60);t<10&&(t="0"+String(t));var n=Math.floor(e.videoDuration%60);n<10&&(n="0"+String(n));return"".concat(t,":").concat(n)}(),o.className="video-container",o.appendChild(c),o.appendChild(a),i.innerText=e.videoTitle,n.className="video",n.appendChild(o),n.appendChild(i),t.appendChild(n)})),e.favoriteSongsMain.forEach((function(e){var t=document.querySelector(".grid-content"),n=document.createElement("div"),o=document.createElement("h3"),c=document.createElement("h3"),a=document.createElement("span"),i=document.createElement("h3"),r=document.createElement("h3"),d=document.createElement("h3"),l=document.createElement("button"),s=document.createElement("img");o.innerText=e.position<10?"0"+e.position+".":e.position+".",c.innerText=e.name,c.className="name",a.innerText="-",i.className="artist",i.innerText=e.artist,r.innerText=e.album,d.innerText=e.addedDate,s.src="./assets/icons/LightMode/liked.svg",n.className="fav-song",l.appendChild(s),n.appendChild(o),n.appendChild(c),n.appendChild(a),n.appendChild(i),n.appendChild(r),n.appendChild(d),n.appendChild(l),t.appendChild(n)}));var t=document.querySelector(".audio-player"),n=document.getElementById("audio"),o=document.querySelector(".audio-song-name").querySelector("h4"),c=document.querySelector(".audio-song-name").querySelector("h3"),a=document.querySelector(".audio-song-cover"),i=document.querySelector(".play-btn"),r=document.getElementById("play-btn-icon");function d(){n.paused?(r.classList.remove("fa-play-circle"),r.classList.add("fa-pause-circle"),n.play()):(r.classList.remove("fa-pause-circle"),r.classList.add("fa-play-circle"),n.pause())}function l(e,i,r,d){n.src=r,o.innerText=i,c.innerText=e,a.style.background="url('".concat(d,"') no-repeat center center/cover"),t.classList.contains("show")||t.classList.add("show")}var s=[],u=[];function m(e,t,n){t.forEach((function(t){t==e?t.classList.add("active"):t.classList.remove("active")})),n.forEach((function(e){e.classList.remove("active")}))}document.querySelectorAll(".song-container").forEach((function(e){e.addEventListener("click",(function(){var t=e.querySelector("h4").innerText,n=e.querySelector("h3").innerText;l(t,n,"./assets/music/".concat(t," - ").concat(n,".mp3"),"./assets/images/".concat(t," - ").concat(n,".jpg")),d()}))})),document.querySelectorAll(".top-hit").forEach((function(e){s.push(e),e.addEventListener("click",(function(){var t=e.querySelector(".song-info").firstElementChild.innerText,n=t.split(" - "),o=n[0],c=n[1],a="./assets/music/".concat(t,".mp3"),i="./assets/images/".concat(t,".jpg");m(e,s,u),l(o,c,a,i),d()}))})),document.querySelectorAll(".fav-song").forEach((function(e){u.push(e),e.addEventListener("click",(function(){var t=e.querySelector(".artist").innerText,n=e.querySelector(".name").innerText,o="./assets/music/".concat(t," - ").concat(n,".mp3"),c="./assets/images/".concat(t," - ").concat(n,".jpg");m(e,u,s),l(t,n,o,c),d()}))})),i.addEventListener("click",(function(){d()}))})).catch((function(e){return console.log(e)}))}]);
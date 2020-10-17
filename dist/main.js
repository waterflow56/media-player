!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,s=new Array(t);n<t;n++)s[n]=e[n];return s}var o=document.getElementsByTagName("audio")[0],c=document.querySelector(".play-btn"),r=document.querySelector(".progress-container"),l=document.querySelector(".progress"),i=["OneRepublic - Rescue Me","Taylor Swift - ME! (feat. Brendon Urie)","Miike Snow - Genghis Khan","The Weeknd - Blinding Lights","The Chain Gang of 1974 - Bends ft. TWINKIDS"],a=document.querySelector(".audio-song-name"),d=document.getElementById("audio-song-cover"),u=document.querySelector(".audio-player"),m=["OneRepublic - Rescue Me","Miike Snow - Genghis Khan","The Killers - The Man","Capital Cities - Safe and Sound","Young the Giant - Superposition","Panic! At The Disco - Into the Unknown","Maroon 5 - Cold","Miley Cyrus - Mother's Daughter"],f=document.querySelectorAll(".top-hit"),g=document.getElementById("repeat-btn"),v=document.getElementById("volume-btn"),y=0,p=document.querySelector(".volume-progress-container"),E=document.querySelector(".volume-progress");function h(){o.play()}function b(e,t){document.body.classList.contains("dark-mode")?e.src="../assets/icons/DarkMode/".concat(t,".svg"):e.src="../assets/icons/LightMode/".concat(t,".svg")}function L(){0===o.volume?b(v.children[0],"muted"):o.volume<=.25?b(v.children[0],"low-volume"):o.volume>.25&&o.volume<.75?b(v.children[0],"medium-volume"):o.volume>=.75&&b(v.children[0],"high-volume")}c.addEventListener("click",(function(){o.paused?(o.play(),b(document.getElementById("play-btn-icon"),"pause-btn")):(o.pause(),b(document.getElementById("play-btn-icon"),"play-btn"))})),r.addEventListener("click",(function(e){var t=this.clientWidth,n=e.offsetX,s=o.duration;o.currentTime=n/t*s})),o.addEventListener("timeupdate",(function(){var e=Math.floor(o.currentTime/60);e<10&&(e="0"+String(e));var t=Math.floor(o.duration/60);t<10&&(t="0"+String(t));var n=Math.floor(o.currentTime%60);n<10&&(n="0"+String(n));var s=Math.floor(o.duration%60);s<10&&(s="0"+String(s)),document.getElementById("current-audio-progress").innerText="".concat(e,":").concat(n),document.getElementById("audio-duration").innerText="".concat(t,":").concat(s),o.paused?b(document.querySelector(".play-btn").children[0],"play-btn"):b(document.querySelector(".play-btn").children[0],"pause-btn");var c=o.currentTime/o.duration*100;l.style.width="".concat(c,"%")})),document.querySelectorAll(".song-cover").forEach((function(e){e.addEventListener("click",(function(e){var t=n(e.target.parentElement.children);console.log(t[1].textContent),console.log(t[2].textContent),i.forEach((function(e){e.includes(t[1].textContent)&&e.includes(t[2].textContent)&&(o.src="../assets/music/".concat(e,".mp3"),o.play(),a.children[0].textContent=t[2].textContent,a.children[1].textContent=t[1].textContent,d.style.background="url('../assets/images/".concat(e,".jpg')\n        center center/cover no-repeat"),u.style.transform="translateY(0%)",b(document.getElementById("play-btn-icon"),"pause-btn"))}))}))})),f.forEach((function(e){e.addEventListener("click",(function(){m.forEach((function(t){if(t.includes(e.children[1].firstElementChild.textContent)){o.src="../assets/music/".concat(t,".mp3"),o.play();var n=t.split(" - "),s=n[0],c=n[1];a.children[0].textContent=s,a.children[1].textContent=c,t.includes("'")?d.style.background="url('../assets/images/".concat(t.replace("'",""),".jpg')\n        center center/cover no-repeat"):d.style.background="url('../assets/images/".concat(t,".jpg')\n          center center/cover no-repeat"),u.style.transform="translateY(0%)",b(document.getElementById("play-btn-icon"),"pause-btn")}}))}))})),g.addEventListener("click",(function(){g.classList.toggle("repeat"),g.classList.contains("repeat")?(b(g.children[0],"repeat-on"),o.addEventListener("ended",h)):(b(g.children[0],"repeat-off"),o.removeEventListener("ended",h))})),v.addEventListener("click",(function(){v.classList.toggle("muted"),v.classList.contains("muted")?(y=o.volume,o.volume=0,b(v.children[0],"muted")):(o.volume=y,L())})),p.addEventListener("click",(function(e){var t=this.clientWidth,n=e.offsetX;o.volume=n/t,E.style.width="".concat(n/t*100,"%"),L()}));document.getElementById("dark-mode-toggle").addEventListener("click",(function(){document.body.classList.toggle("dark-mode"),document.body.classList.contains("dark-mode")?(document.getElementById("favicon").href="../assets/icons/DarkMode/logo.png",document.getElementById("home-icon").src="../assets/icons/DarkMode/home.svg",document.getElementById("albums-icon").src="../assets/icons/DarkMode/albums.svg",document.getElementById("artists-icon").src="../assets/icons/DarkMode/artists.svg",document.getElementById("videos-icon").src="../assets/icons/DarkMode/videos.svg",document.getElementById("clock-icon").src="../assets/icons/DarkMode/clock.svg",document.querySelectorAll("#like-icon").forEach((function(e){e.src="../assets/icons/DarkMode/like.svg"})),document.getElementById("library-icon").src="../assets/icons/DarkMode/library.svg",document.getElementById("settings-icon").src="../assets/icons/DarkMode/settings.svg",document.getElementById("bell-icon").src="../assets/icons/DarkMode/bell.svg",document.getElementById("previous-btn-icon").src="../assets/icons/DarkMode/previous-btn.svg",(0===o.currentTime||o.paused)&&(document.getElementById("play-btn-icon").src="../assets/icons/DarkMode/play-btn.svg"),document.getElementById("next-btn-icon").src="../assets/icons/DarkMode/next-btn.svg",g.classList.contains("repeat")?g.children[0].src="../assets/icons/DarkMode/repeat-on.svg":g.children[0].src="../assets/icons/DarkMode/repeat-off.svg",L()):(document.getElementById("favicon").href="../assets/icons/LightMode/logo.png",document.getElementById("home-icon").src="../assets/icons/LightMode/home.svg",document.getElementById("albums-icon").src="../assets/icons/LightMode/albums.svg",document.getElementById("artists-icon").src="../assets/icons/LightMode/artists.svg",document.getElementById("videos-icon").src="../assets/icons/LightMode/videos.svg",document.getElementById("clock-icon").src="../assets/icons/LightMode/clock.svg",document.querySelectorAll("#like-icon").forEach((function(e){e.src="../assets/icons/LightMode/like.svg"})),document.getElementById("library-icon").src="../assets/icons/LightMode/library.svg",document.getElementById("settings-icon").src="../assets/icons/LightMode/settings.svg",document.getElementById("bell-icon").src="../assets/icons/LightMode/bell.svg",document.getElementById("previous-btn-icon").src="../assets/icons/LightMode/previous-btn.svg",(0===o.currentTime||o.paused)&&(document.getElementById("play-btn-icon").src="../assets/icons/LightMode/play-btn.svg"),document.getElementById("next-btn-icon").src="../assets/icons/LightMode/next-btn.svg",g.classList.contains("repeat")?g.children[0].src="../assets/icons/LightMode/repeat-on.svg":g.children[0].src="../assets/icons/LightMode/repeat-off.svg",L())}));var k=document.getElementsByTagName("video")[0],S=document.querySelector(".video-controls"),M=document.getElementById("video-play"),x=document.getElementById("video-volume"),I=document.getElementById("video-expand"),B=document.getElementById("video-container"),C=document.querySelector(".video-progress-container"),F=document.querySelector(".video-progress"),q=document.querySelectorAll(".btn"),w=document.getElementById("video-timestamp");function N(){k.paused?(k.play(),document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?M.firstElementChild.className="fas fa-pause fa-2x":M.firstElementChild.className="fas fa-pause"):(k.pause(),document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?M.firstElementChild.className="fas fa-play fa-2x":M.firstElementChild.className="fas fa-play")}function T(){S.style.opacity="1"}function D(){S.style.opacity="0"}function j(){I.firstElementChild.classList.remove("fa-expand"),I.firstElementChild.classList.add("fa-compress"),C.style.width="78%",w.style.fontSize="18px",C.style.height="7px",B.removeEventListener("mouseenter",T),B.removeEventListener("mouseleave",D),S.addEventListener("mouseenter",T),S.addEventListener("mouseleave",D)}function z(){I.firstElementChild.classList.remove("fa-compress"),I.firstElementChild.classList.add("fa-expand"),C.style.width="60%",w.style.fontSize="13px",C.style.height="5px",B.addEventListener("mouseenter",T),B.addEventListener("mouseleave",D),S.removeEventListener("mouseenter",T),S.removeEventListener("mouseleave",D)}k.addEventListener("click",N),M.addEventListener("click",N),C.addEventListener("click",(function(e){var t=e.offsetX,n=this.clientWidth;k.currentTime=k.duration*t/n})),k.addEventListener("timeupdate",(function(){k.paused?document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?M.firstElementChild.className="fas fa-play fa-2x":M.firstElementChild.className="fas fa-play":document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?M.firstElementChild.className="fas fa-pause fa-2x":M.firstElementChild.className="fas fa-pause";var e=Math.floor(k.currentTime/60);e<10&&(e="0"+String(e));var t=Math.floor(k.duration/60);t<10&&(t="0"+String(t));var n=Math.floor(k.currentTime%60);n<10&&(n="0"+String(n));var s=Math.floor(k.duration%60);s<10&&(s="0"+String(s)),w.innerText="".concat(e,":").concat(n," / ").concat(t,":").concat(s);var o=k.currentTime/k.duration*100;F.style.width="".concat(o,"%")})),x.addEventListener("click",(function(){0===k.volume?(k.volume=1,document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?x.firstElementChild.className="fas fa-volume-up fa-2x":x.firstElementChild.className="fas fa-volume-up"):(k.volume=0,document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?x.firstElementChild.className="fas fa-volume-mute fa-2x":x.firstElementChild.className="fas fa-volume-mute")})),B.addEventListener("mouseenter",T),B.addEventListener("mouseleave",D),k.addEventListener("ended",(function(){document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?M.firstElementChild.className="fas fa-play fa-2x":M.firstElementChild.className="fas fa-play"})),I.addEventListener("click",(function(){B.requestFullscreen&&"btn"===I.className?(j(),B.requestFullscreen()):B.mozRequestFullScreen&&"btn"===I.className?(j(),B.mozRequestFullScreen()):B.webkitRequestFullscreen&&"btn"===I.className?(j(),B.webkitRequestFullscreen()):B.msRequestFullscreen&&"btn"===I.className&&(j(),B.msRequestFullscreen()),document.exitFullscreen&&"btn expanded"===I.className?(z(),document.exitFullscreen()):document.mozCancelFullScreen&&"btn expanded"===I.className?(z(),document.mozCancelFullScreen()):document.webkitExitFullscreen&&"btn expanded"===I.className?(z(),document.webkitExitFullscreen()):document.msExitFullscreen&&"btn expanded"===I.className&&(z(),document.msExitFullscreen()),q.forEach((function(e){e.firstElementChild.classList.toggle("fa-2x")})),I.classList.toggle("expanded")}))}]);
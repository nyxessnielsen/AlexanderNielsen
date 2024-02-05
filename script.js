var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

/* SONG NAMES */
let titles = [
  "I'M THE ONE",
  "TRAP QUEEN",
  "WHAT WOULD I CHANGE IT TO?",
  
];
/* ARTIST NAMES */
let names = [
  "JUSTIN BIEBER",
  "FETTY WAP",
  "AVICII",
  
];
/* IMAGES */
let icons = [
  "https://i1.sndcdn.com/artworks-000226163796-ol97v3-t500x500.jpg",
  "https://upload.wikimedia.org/wikipedia/en/a/a4/Fetty_Wap_-_Trap_Queen.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/AV%C4%AACI_%2801%29.jpg/220px-AV%C4%AACI_%2801%29.jpg",

];
/* VIDEOS */
let urls = [
  "158plNHX4vw",
  "tmPm5iYOklg",
  "14TRb4w3BzY",
  
];

/* OTHER */
var prevButton = document.getElementById('prev-song');
var nextButton = document.getElementById('next-song');
var playButton = document.getElementById('play-song');
var pauseButton = document.getElementById('pause-song');
var songButtons = document.getElementById('bark-left-songs');

/* SETUP */
let currentSong = 0;

$("#songtitle").html(titles[currentSong]);
$("#artistname").html(names[currentSong]);
$("#songtitle2").html(titles[currentSong]);
$("#artistname2").html(names[currentSong]);
$("#bark-music-img img").attr("src", icons[currentSong]);

titles.forEach(function(id, i){
    var activeClass = '';
    if ( i === currentSong ) {
      activeClass = 'is-active';
    }
    songButtons.innerHTML += '<div class="bark-songs '+activeClass+'">'+id+'</div>';
  });

barkSongs = document.querySelectorAll('.bark-songs');

function onYouTubeIframeAPIReady() {
  
  musicPlayer(urls[currentSong]);

  function musicPlayer(id) {
    player = new YT.Player('player', {
      height: '0',
      width: '0',
      videoId: urls[currentSong],
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}
  
  prevButton.addEventListener('click', playPrevVideo);
  nextButton.addEventListener('click', playNextVideo);
  playButton.addEventListener('click', playVideo);
  pauseButton.addEventListener('click', pauseVideo);
  
  function onPlayerReady(event) {
    console.log('onPlayerReady', event);
  }
  
  function playNextVideo() {    
    $('.bark-record').addClass('rotate');
    currentSong += 1;
    player.loadVideoById(urls[currentSong], 0, "large");
    for ( var i=0; urls.length > i; i++ ) {
      barkSongs[i].className = barkSongs[i].className.split('is-active').join('');
      barkSongs[currentSong].className += ' is-active';
    }
    $('#play-song').addClass('hidden');
    $('#pause-song').removeClass('hidden');
    $("#songtitle").html(titles[currentSong]);
    $("#artistname").html(names[currentSong]);
    $("#songtitle2").html(titles[currentSong]);
    $("#artistname2").html(names[currentSong]);
    $("#bark-music-img img").attr("src", icons[currentSong]);
  }
  
  function playPrevVideo() {
    $('.bark-record').addClass('rotate');
    if (currentSong > 0) {
    currentSong -= 1;
    player.loadVideoById(urls[currentSong], 0, "large");
    for ( var i=0; barkSongs.length > i; i++ ) {
      barkSongs[i].className = barkSongs[i].className.split('is-active').join('');
      barkSongs[currentSong].className += ' is-active';
    }
    $('#play-song').addClass('hidden');
    $('#pause-song').removeClass('hidden');
    $("#songtitle").html(titles[currentSong]);
    $("#artistname").html(names[currentSong]);
    $("#songtitle2").html(titles[currentSong]);
    $("#artistname2").html(names[currentSong]);
    $("#bark-music-img img").attr("src", icons[currentSong]);
    }
  }
  
  function playVideo() {
    player.playVideo();
    $('#play-song').addClass('hidden');
    $('#pause-song').removeClass('hidden');
    $('.bark-record').addClass('rotate');
  }
  
  function pauseVideo() {
    player.pauseVideo();
    $('#pause-song').addClass('hidden');
    $('#play-song').removeClass('hidden');
    $('.bark-record').removeClass('rotate');
  }
  
  function onPlayerStateChange(event) {
    if (currentSong > urls.length - 2) {
      currentSong = -1;
    }
    if ( event.data === 0 ) {
      playNextVideo();
    }
  }
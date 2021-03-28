const x = document.querySelector('#close');
const video = document.querySelector('.video');
const watch = document.querySelector('.watch');
const movie = document.querySelector('video')

x.addEventListener('click', function(){
    console.log('close');
    if(video.classList.contains('show')) {
        video.classList.remove('show');
    } else {
        video.classList.add('show');
    }
});


watch.addEventListener('click', playPauseMedia);
function playPauseMedia() {
    if(movie.paused) {
      watch.setAttribute('data-icon','u');
      movie.play();
    } else {
      watch.setAttribute('data-icon','P');
      movie.pause();
    }
  };

  x.addEventListener('click', stopMedia);
movie.addEventListener('ended', stopMedia);

function stopMedia() {
    movie.pause();
    movie.currentTime = 0;
    watch.setAttribute('data-icon','P');
  }

watch.addEventListener('click', function(){
    console.log('show');

    if(video.classList.contains('show')) {
        video.classList.toggle('show');
    } else {
        video.classList.add('show');
    }
});
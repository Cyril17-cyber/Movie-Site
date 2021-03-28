const slide = document.querySelector('.blood__images');
const images = document.querySelectorAll('.blood__images img');

// buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter
let counter = 1;
const size = images[0].clientWidth;

slide.style.transform = 'translateX(' + (-size * counter ) + 'px)';

// Button Listener

nextBtn.addEventListener('click', function() {
    slide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    slide.style.transform = 'translateX(' + (-size * counter ) + 'px)';
});

prevBtn.addEventListener('click', function() {
    slide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    slide.style.transform = 'translateX(' + (-size * counter ) + 'px)';
});

slide.addEventListener('transitioned', function(){
    console.log(images[counter]);
    if(images[counter].id === 'lastClone'){
        slide.style.transition = "none";
        counter = images.length -2;
        slide.style.transform = 'translateX(' + (-size * counter ) + 'px)';
    }
});
const menu = document.querySelector('#menu');
const env = document.querySelector('.body')
const tab = document.querySelector('.menu');
const mobile = document.querySelector('.mobile__menu');
const dark = document.querySelector('#dark');
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const now = document.querySelector('.now');

now.addEventListener('click', function(){
    if(env.classList.contains('toogle')) { // adding menu
        nav.classList.remove('off');
        env.classList.remove('visible');
        env.classList.remove('toogle');
        tab.classList.add('fade-in');
        tab.classList.remove('fade-out');
        body.classList.remove('burger');
        env.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        env.classList.remove('search');
    } else { // removing menu
        nav.classList.add('off');
        env.classList.add('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        env.classList.add('visible');
    }
});


menu.addEventListener('click', function() {
    console.log('menu');

    if(env.classList.contains('toogle')) { // adding menu
        nav.classList.remove('off');
        env.classList.remove('visible');
        env.classList.remove('toogle');
        tab.classList.add('fade-in');
        tab.classList.remove('fade-out');
        body.classList.remove('burger');
        env.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        env.classList.remove('search');
    } else { // removing menu
        nav.classList.add('off');
        env.classList.add('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        env.classList.add('visible');
    }
});

dark.addEventListener('click', function(){
    console.log('dark');

    if(body.classList.contains('mode')){
        body.classList.remove('mode');
        env.classList.remove('done');
    } else {
        body.classList.add('mode');
        env.classList.add('done');
    }
});

const hamburger = document.querySelector('#hamburger');

hamburger.addEventListener('click', function() {
    console.log('burger');

    if(body.classList.contains('burger')) {// removing menu
        body.classList.remove('burger');
        env.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        env.classList.add('visible');
    } else { //adding menu
        env.classList.remove('visible');
        nav.classList.add('off');
        body.classList.add('burger');
        env.classList.add('toogle');
        env.classList.add('body-out');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        mobile.classList.remove('mobile-out');
        mobile.classList.add('mobile-in');
        env.classList.remove('search');
    }
});

const search = document.querySelector('#search');
const look = document.querySelector('.body__search')

search.addEventListener('click', function(){
    console.log('search');

    if(env.classList.contains('search')) {// Leaving search
        env.classList.remove('search');
        env.classList.add('visible');
        look.classList.add('fade-out');
        look.classList.remove('fade-in');
    } else {// Entering search
        look.classList.remove('fade-out');
        look.classList.add('fade-in');
        nav.classList.add('off');
        env.classList.remove('visible');
        env.classList.add('search');
        env.classList.add('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        body.classList.remove('burger');
        env.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
    }
});


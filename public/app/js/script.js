const menu = document.querySelector('#menu');
const bodyDiv = document.querySelector('.body')
const tab = document.querySelector('.menu');
const mobile = document.querySelector('.mobile__menu');
const dark = document.querySelector('#dark');
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const now = document.querySelector('.now');
const logOut = document.querySelector('#logout');
const logOutClass = document.querySelector('.logout');
const cancel = document.querySelector('#cancel');

logOut.addEventListener('click', function(){
    console.log('logout');
    if(logOutClass.classList.contains('log')) {//making logout invisible
        logOutClass.classList.toggle('log');
        body.classList.remove('hidden');
    } else {//making logout visible
        logOutClass.classList.add('log');
        body.classList.add('hidden');
        nav.classList.add('off');
        bodyDiv.classList.remove('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        bodyDiv.classList.remove('visible');
        body.classList.remove('burger');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        bodyDiv.classList.remove('search');
    }
});

cancel.addEventListener('click', function(){
    console.log('logout');
    if(logOutClass.classList.contains('log')) {//making logout invisible
        logOutClass.classList.toggle('log');
        body.classList.remove('hidden');
    } else {//making logout visible
        logOutClass.classList.add('log');
        body.classList.add('hidden');
        nav.classList.add('off');
        bodyDiv.classList.remove('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        bodyDiv.classList.remove('visible');
        body.classList.remove('burger');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        bodyDiv.classList.remove('search');
    }
});

now.addEventListener('click', function(){
    if(bodyDiv.classList.contains('toogle')) { // adding menu
        nav.classList.remove('off');
        bodyDiv.classList.add('visible');
        bodyDiv.classList.add('toogle');
        tab.classList.add('fade-in');
        tab.classList.remove('fade-out');
        body.classList.remove('burger');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        bodyDiv.classList.remove('search');
        logOutClass.classList.remove('log');
        body.classList.remove('hidden');
    } else { // removing menu
        nav.classList.add('off');
        bodyDiv.classList.remove('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        bodyDiv.classList.remove('visible');
    }
});


menu.addEventListener('click', function() {
    console.log('menu');

    if(bodyDiv.classList.contains('toogle')) { // adding menu
        nav.classList.remove('off');
        logOutClass.classList.remove('log');
        body.classList.remove('hidden');
        bodyDiv.classList.add('visible');
        bodyDiv.classList.remove('toogle');
        tab.classList.add('fade-in');
        tab.classList.remove('fade-out');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
    } else { // removing menu
        nav.classList.add('off');
        bodyDiv.classList.add('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        bodyDiv.classList.remove('visible');
        bodyDiv.classList.remove('search');
        body.classList.remove('burger');
    }
});

dark.addEventListener('click', function(){
    console.log('dark');

    if(body.classList.contains('mode')){
        body.classList.remove('mode');
        bodyDiv.classList.remove('done');
    } else {
        body.classList.add('mode');
        bodyDiv.classList.add('done');
    }
});

const hamburger = document.querySelector('#hamburger');

hamburger.addEventListener('click', function() {
    console.log('burger');

    if(body.classList.contains('burger')) {// removing menu
        body.classList.remove('burger');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
        bodyDiv.classList.add('visible');
    } else { //adding menu
        bodyDiv.classList.remove('visible');
        logOutClass.classList.remove('log');
        body.classList.remove('hidden');
        nav.classList.remove('off');
        body.classList.add('burger');
        bodyDiv.classList.remove('toogle');
        bodyDiv.classList.add('body-out');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        mobile.classList.remove('mobile-out');
        mobile.classList.add('mobile-in');
        bodyDiv.classList.remove('search');
    }
});

const search = document.querySelector('#search');
const look = document.querySelector('.body__search')

search.addEventListener('click', function(){
    console.log('search');

    if(bodyDiv.classList.contains('search')) {// Leaving search
        bodyDiv.classList.remove('search');
        bodyDiv.classList.add('visible');
        look.classList.add('fade-out');
        look.classList.remove('fade-in');
    } else {// Entering search
        look.classList.remove('fade-out');
        logOutClass.classList.remove('log');
        body.classList.remove('hidden');
        look.classList.add('fade-in');
        nav.classList.remove('off');
        bodyDiv.classList.remove('visible');
        bodyDiv.classList.add('search');
        bodyDiv.classList.remove('toogle');
        tab.classList.add('fade-out');
        tab.classList.remove('fade-in');
        body.classList.remove('burger');
        bodyDiv.classList.remove('body-out');
        mobile.classList.add('mobile-out');
        mobile.classList.remove('mobile-in');
    }
});


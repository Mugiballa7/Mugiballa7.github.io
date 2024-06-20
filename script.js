window.addEventListener('scroll', reveal);


function reveal(){
var reveals = document.querySelectorAll('.reveal');


for(var i = 0; i < reveals.length; i++){


    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;


    if(revealtop < windowheight - revealpoint){
    reveals[i].classList.add('active');
    }
    else{
    reveals[i].classList.remove('active');
    }
}
}

//DYNAMIC TEXT

let dynamic_text = document.querySelector(".dynamic_text");
let timeNow = new Date().getHours();
let activity =
    timeNow >= 7 && timeNow < 8
        ? '<span class = "emoji">🥐</span>Breakfast'
        : timeNow >= 8 && timeNow < 12
        ? '<span class = "emoji">👨🏿‍💻</span>Work'
        : timeNow >= 12 && timeNow < 13
        ? '<span class = "emoji">🥪</span>Lunch'
        : timeNow >= 13 && timeNow < 18
        ? '<span class = "emoji">👨🏿‍💻</span>Work'
        : timeNow >= 17.5 && timeNow < 19.5
        ? '<span class = "emoji">🎾</span>Tennis'
        : timeNow >= 19.5 && timeNow < 21
        ? '<span class = "emoji">🍝</span>Dinner'
        : timeNow >= 21 && timeNow < 23.5
        ? '<span class = "emoji">😃</span>Free time'
        : '<span class = "emoji">🛌🏿</span>Sleep';

dynamic_text.innerHTML = `<p>${activity}</p>`;

//SLIDE Project SECTIO?

function openNav() {
document.getElementById("mySidenav").style.width = "100%";
document.getElementById("closebtn").style.visibility= "visible";
document.getElementById("body").style.overflowY= "hidden";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
document.getElementById("closebtn").style.visibility = "hidden";
document.getElementById("body").style.overflowY= "scroll";
}

// Set Time Intervel
setInterval(displayTime, 1000);

// Display Time Function

function displayTime() {
    // Initializing the variables
    let currentTime = new Date;
    let hour = currentTime.getHours();
    let min = currentTime.getMinutes();
    let amPM = "AM (UTC+2)"

    // Initializing the HTML variables 
    let hourHTML = document.getElementById('hour');
    let minHTML = document.getElementById('min');
    let secHTML = document.getElementById('sec');
    let amPMHTML = document.getElementById('ampm');

    // Some Logic
    if (hour > 12) {
        hour -= 12;
        amPM = "PM (UTC+2)"
    }

    function makeSingleToDoubleDigit(num) {
        if (num.toString().length == 1) {
            num = "0" + num
        }
        return num
    }

    // Making Single to Doouble Digits
    sec = makeSingleToDoubleDigit(sec)
    min = makeSingleToDoubleDigit(min)
    hour = makeSingleToDoubleDigit(hour)


    // Displaying Time in HTML
    hourHTML.innerHTML = hour;
    minHTML.innerHTML = min;
    secHTML.innerHTML = sec;
    amPMHTML.innerHTML = amPM
}

//DARK MODE
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

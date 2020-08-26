if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register('sw.js').then(reg => {

                console.log(`registed ${reg}`)
            })
        }

    });
}


window.history.pushState({}, '', '#root')






function goBack() {
    window.location.hash = window.location.lasthash[window.location.lasthash.length - 1];
    //blah blah blah
    window.location.lasthash.pop();
}

function updateHistory(curr) {
    window.location.lasthash.push(window.location.hash);
    window.location.hash = curr;
}
document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}

window.onhashchange = function() {
    if (window.innerDocClick) {
        //Your own in-page mechanism triggered the hash change
    } else {
        //Browser back button was clicked
    }
}


const page = document.getElementById('pages_container');
var touch;
var left = 0;
var crntpage = 1;

var home_nav = document.getElementById('home_nav');
var right_nav = document.getElementById('right_nav');

page.addEventListener("touchstart", touchstart);

function touchstart(e) {
    touch = e.touches[0].clientX;
    page.classList.remove('transition_page')


}

page.addEventListener("touchmove", touchmove);

function touchmove(e) {
    var leftP = Number(page.style.left.replace('px', ''));


    if (leftP <= 0) {
        page.style.left = e.touches[0].clientX - touch + left + 'px';
    }


}

page.addEventListener("touchend", touchend);

function touchend(e) {
    page.classList.add('transition_page')
    var leftp = Number(page.style.left.replace('px', ''));
    var winW = window.innerWidth;

    if (leftp / winW > -0.2 && crntpage == 1) {

        page1();

    } else if (crntpage == 1) {

        page2()

    } else if (leftp / winW > -0.8 && crntpage == 2) {

        page1()


    } else if (crntpage == 2) {

        page2();

    }

    left = Number(page.style.left.replace('px', ''));



}


function page1() {
    home_nav.style.color = '#89f'
    right_nav.style.color = '#aaa'

    page.classList.add('transition_page')
    page.style.left = "0px";
    crntpage = 1;
    left = Number(page.style.left.replace('px', ''));

}

function page2() {
    window.history.pushState({}, '', '#pag2')
    home_nav.style.color = '#aaa'
    right_nav.style.color = '#89f'

    page.classList.add('transition_page')
    page.style.left = -window.innerWidth + "px";
    crntpage = 2;
    left = Number(page.style.left.replace('px', ''));
}

var sidenav = document.getElementById('sidenav');
var more_icon = document.getElementById('more_nav');

var back_black = document.getElementById('back_black');
const more_cick = document.getElementById('more_cick');

function push_sidenav() {
    window.history.pushState({}, '', '#setting')

    more_icon.style.color = '#89f'
    sound();
    sidenav.style.left = '0px';
    back_black.style.display = 'block';
    back_black.style.opacity = '1';
    more_cick.onclick = function() {
        pop_sidenav(more_cick);
    }
}

function pop_sidenav() {
    more_icon.style.color = '#aaa'
    sound();
    sidenav.style.left = '-390px';
    back_black.style.display = 'none';
    back_black.style.opacity = '0';
    more_cick.onclick = function() {
        push_sidenav(more_cick);
    }
    // var  = document.getElementById('');

}
// sound click . 
var audio = new Audio('./audio/click.mp3');
audio.muted = true;

async function sound() {
    audio.muted = false;
    audio.volume = 0.15;
    await audio.play();
}

document.getElementsByTagName('button').ontoutch = function(e) {
    e.preventDefault()
    console.log(e)
}

const page_2 = document.getElementById('page2');
const content_page2 = document.getElementById('content_page2');
// const page_2_title = document.getElementById('page2_title');

var settengPage;
async function getSetting() {


    await fetch('./component/setting.html').then(res => res.text()).then(data => {
        page_2.innerHTML = data;
        page2();
        pop_sidenav();
        /*controll on off  notfiction + sound chickbox  */

        console.log("setting_page Activated");
        var switchA = document.getElementById("switchA").addEventListener('change', onOffchicker);
        var switchB = document.getElementById("switchB").addEventListener('change', onOffchicker);
        // chick for setteng controlers 
        function onOffchicker() {
            if (this.checked) {
                // Checkbox is checked..
                if (this.id == "switchA") {
                    console.log("switchA ON");
                }
                if (this.id == "switchB") {
                    console.log("switchB ON");
                }
            } else {
                // Checkbox is not checked..
                if (this.id == "switchA") {
                    console.log("switchA OFF");
                }
                if (this.id == "switchB") {
                    console.log("switchB OFF");
                }

            }

        };

    })
    settengPage = true;
}
console.log(settengPage);
async function getScores() {


    await fetch('./component/scores.html').then(res => res.text()).then(data => {
        page_2.innerHTML = data;

    }).then(() => {
        page2();
        pop_sidenav()
    })
}

async function getAbout() {


    await fetch('./component/about.html').then(res => res.text()).then(data => {
        page_2.innerHTML = data;

    }).then(() => {
        page2();
        pop_sidenav()
    })
}

window.addEventListener('popstate', () => {
    console.log(location)
    if (window.location.hash != "#setting") {
        pop_sidenav()
    } else if (window.location.hash != "#page2") {
        page1();
    }

    switch (window.location.hash) {
        case '#setting':

            break;
        case "#page2":
            // code block
            break;
        case "#root":
            sidenav.style.left !== '-390px' ? pop_sidenav() : null;
            page1();
            break;
        default:
            //
    }
})

// functin slide about card 
let slideIndex = 1;


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    // 3 dots 
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }


    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


// end slide about card 

// show hide chose qustions alert . 
function prompHideShow(e) {
    sound();
    document.getElementsByClassName('alert')[0].style.display = `${e}`;
}








function logOut() {
    // body... clear data from local storage.
    alert(" log out  ")
}
'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
const toolbarSwitch = document.querySelector('#toolbar-toggle');
const toolbarSwitchIcon = document.querySelector('#icon');
const toolbar = document.getElementById('toolbar-buttons');
const prev = document.getElementById('slider-previous');
const next = document.getElementById('slider-next');
const toggle = document.getElementById('slider-toggle');
const toggleIcon = document.querySelector('#slider-toggle i');
const shuffle = document.getElementById('slider-random');
const img1 = new Image("images/1.jpg", "Street art");
const img2 = new Image("images/2.jpg", "Panorama");
const img3 = new Image("images/3.jpg", "Architecture");
const img4 = new Image("images/4.jpg", "Immeuble");
const img5 = new Image("images/5.jpg", "Grande ville");
const img6 = new Image("images/6.jpg", "Paris");
const figure = document.querySelector('figure img');
const figcaption = document.querySelector('figcaption');
const imagesArray = [img1, img2, img3, img4, img5, img6];
const sel1 = document.querySelector('#sel1');
const sel2 = document.querySelector('#sel2');
const sel3 = document.querySelector('#sel3');
const sel4 = document.querySelector('#sel4');
const sel5 = document.querySelector('#sel5');
const sel6 = document.querySelector('#sel6');
let currentImage = 0;
let autoplay;
let randomNbr;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/
function toolbarToggle(event) {
    event.preventDefault();
    toolbar.classList.toggle("visible");
    toolbarSwitchIcon.classList.toggle("visible");
}

function Image(src, legend) {
    this.src = src;
    this.legend = legend;
}

function nextSlide() {
    if (currentImage == imagesArray.length - 1) {
        currentImage = 0;
        figure.src = imagesArray[currentImage].src;
        figure.alt = imagesArray[currentImage].legend;
        figcaption.innerText = imagesArray[currentImage].legend;
        colorToggle(currentImage + 1);
    } else {
        figure.src = imagesArray[currentImage + 1].src;
        figure.alt = imagesArray[currentImage + 1].legend;
        figcaption.innerText = imagesArray[currentImage + 1].legend;
        currentImage++
        colorToggle(currentImage + 1);
    }
}

function previousSlide() {
    if (currentImage == 0) {
        figure.src = imagesArray[imagesArray.length - 1].src;
        figure.alt = imagesArray[imagesArray.length - 1].legend;
        figcaption.innerText = imagesArray[imagesArray.length - 1].legend;
        currentImage = imagesArray.length - 1;
    } else {
        figure.src = imagesArray[currentImage - 1].src;
        figure.alt = imagesArray[currentImage - 1].legend;
        figcaption.innerText = imagesArray[currentImage - 1].legend;
        currentImage--
    }
}

function toggleSlide() {
    if (!autoplay) {
        autoplay = setInterval(nextSlide, 1500);
        toggleIcon.classList.add("fa-pause");
        toggleIcon.classList.remove("fa-play");
    } else {
        clearInterval(autoplay);
        toggleIcon.classList.add("fa-play");
        toggleIcon.classList.remove("fa-pause");
        autoplay = null;
    }
}

function shuffleSlide() {
    randomNbr = Math.floor(Math.random() * imagesArray.length)
    if (currentImage != randomNbr) {
        figure.src = imagesArray[randomNbr].src;
        figure.alt = imagesArray[randomNbr].legend;
        figcaption.innerText = imagesArray[randomNbr].legend;
        currentImage = randomNbr;
    } else {
        shuffleSlide()
    }
}

function colorToggle(i) {
    console.log(i);
    let sel = "sel" + i;
    let prevSel = "sel" + (i - 1);
    const currE = document.getElementById(sel);
    const prevE = document.getElementById(prevSel);
    if (currentImage == 0) {
        currE.classList.toggle("colored")
    } else if {

    }
    currE.classList.toggle("colored");
    prevE.classList.toggle("colored");
}
/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
figure.src = imagesArray[currentImage].src;
figure.alt = imagesArray[currentImage].legend;
figcaption.innerText = imagesArray[currentImage].legend;
toolbarSwitch.addEventListener('click', toolbarToggle);
next.addEventListener('click', nextSlide);
prev.addEventListener('click', previousSlide);
toggle.addEventListener('click', toggleSlide);
shuffle.addEventListener('click', shuffleSlide);
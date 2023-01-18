'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
const toolbarSwitch = document.querySelector('#toolbar-toggle'); // Sélectionne le lien de la barre d'outils
const toolbarSwitchIcon = document.querySelector('#icon'); // Sélectionne l'icône du lien de la barre d'outils
const toolbar = document.getElementById('toolbar-buttons'); // Sélectionne la barre d'outils
const prev = document.getElementById('slider-previous'); // Sélectionne le bouton "précédent"
const next = document.getElementById('slider-next'); // Sélectionne le bouton "suivant"
const toggle = document.getElementById('slider-toggle'); // Sélectionne le bouton "lecture automatique"
const toggleIcon = document.querySelector('#slider-toggle i'); // Sélectionne l'icône du bouton "lecture automatique"
const shuffle = document.getElementById('slider-random'); // Sélectionne le bouton "aléatoire"
const img1 = new Image("images/1.jpg", "Street art"); // Crée une nouvelle image avec l'url et la légende
const img2 = new Image("images/2.jpg", "Panorama"); // Crée une nouvelle image avec l'url et la légende
const img3 = new Image("images/3.jpg", "Architecture"); // Crée une nouvelle image avec l'url et la légende
const img4 = new Image("images/4.jpg", "Immeuble"); // Crée une nouvelle image avec l'url et la légende
const img5 = new Image("images/5.jpg", "Grande ville"); // Crée une nouvelle image avec l'url et la légende
const img6 = new Image("images/6.jpg", "Paris"); // Crée une nouvelle image avec l'url et la légende
const figure = document.querySelector('figure img'); // Sélectionne l'élément de l'image à afficher
const figcaption = document.querySelector('figcaption'); // Sélectionne l'élément de la légende de l'image
const imagesArray = [img1, img2, img3, img4, img5, img6]; // Tableau contenant toutes les images
const ul = document.querySelector('#selectors'); // Sélectionne l'élément des sélecteurs
let currentImage = 0; // Image actuellement affichée
let autoplay; // Etat de la lecture automatique
let randomNbr; // Nombre aléatoire pour la fonction "mélanger"

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/
function toolbarToggle(event) { // Fonction pour afficher/masquer la barre d'outils
    event.preventDefault(); // Empêche l'action par défaut de l'événement (clic)
    toolbar.classList.toggle("visible"); // Ajoute ou supprime la classe "visible" à l'élément de la barre d'outils pour l'afficher/masquer
    toolbarSwitchIcon.classList.toggle("visible"); // Ajoute ou supprime la classe "visible" à l'icône de l'outil de bouton pour l'afficher/masquer
}

function Image(src, legend) { // Fonction constructeur pour créer une nouvelle image
    this.src = src; // L'URL de l'image
    this.legend = legend; // La légende de l'image
}

function nextSlide() { // Fonction pour afficher la prochaine image
    if (currentImage == imagesArray.length - 1) { // Si l'image actuelle est la dernière de la liste
        currentImage = 0; // Retourne à la première image
        figure.src = imagesArray[currentImage].src; // Change la source de l'image à afficher
        figure.alt = imagesArray[currentImage].legend; // Change la légende de l'image à afficher
        figcaption.innerText = imagesArray[currentImage].legend; // Change le texte de la légende de l'image à afficher
        colorToggle(currentImage);
    } else {
        figure.src = imagesArray[currentImage + 1].src; // Change la source de l'image à afficher
        figure.alt = imagesArray[currentImage + 1].legend; // Change la légende de l'image à afficher
        figcaption.innerText = imagesArray[currentImage + 1].legend; // Change le texte de la légende de l'image à afficher
        currentImage++; // Incrémente l'image actuelle
        colorToggle(currentImage);
    }
}

function previousSlide() { // Fonction pour afficher l'image précédente
    if (currentImage == 0) { // Si l'image actuelle est la première de la liste
        figure.src = imagesArray[imagesArray.length - 1].src; // Change la source de l'image à afficher
        figure.alt = imagesArray[imagesArray.length - 1].legend; // Change la légende de l'image à afficher
        figcaption.innerText = imagesArray[imagesArray.length - 1].legend; // Change le texte de la légende de l'image à afficher
        colorToggle(imagesArray.length - 1);
        currentImage = imagesArray.length - 1;
    } else {
        figure.src = imagesArray[currentImage - 1].src; // Change la source de l'image à afficher
        figure.alt = imagesArray[currentImage - 1].legend; // Change la légende de l'image à afficher
        figcaption.innerText = imagesArray[currentImage - 1].legend; // Change le texte de la légende de l'image à afficher
        colorToggle(currentImage - 1);
        currentImage--; // Décrémente l'image actuelle
    }
}

function toggleSlide() { // Fonction pour activer/désactiver la lecture automatique
    if (!autoplay) { // Si la lecture automatique n'est pas active
        autoplay = setInterval(nextSlide, 1500); // Active la lecture automatique en appelant la fonction nextSlide toutes les 1500ms
        toggleIcon.classList.add("fa-pause"); // Ajoute la classe pour l'icône de pause
        toggleIcon.classList.remove("fa-play"); // Supprime la classe pour l'icône de lecture
    } else {
        clearInterval(autoplay); // Désactive la lecture automatique
        toggleIcon.classList.add("fa-play"); // Ajoute la classe pour l'icône de lecture
        toggleIcon.classList.remove("fa-pause"); // Supprime la classe pour l'icône de pause
        autoplay = null; // Remet la variable à null
    }
}

function shuffleSlide() { // Fonction pour mélanger les images
    randomNbr = Math.floor(Math.random() * imagesArray.length) // Génère un nombre aléatoire entre 0 et la longueur du tableau d'images
    if (currentImage != randomNbr) { // Si l'image actuelle n'est pas la même que l'image générée aléatoirement
        figure.src = imagesArray[randomNbr].src; // Change la source de l'image à afficher
        figure.alt = imagesArray[randomNbr].legend; // Change la légende de l'image à afficher
        figcaption.innerText = imagesArray[randomNbr].legend; // Change le texte de la légende de l'image à afficher
        currentImage = randomNbr; // Change l'image actuelle à celle générée aléatoirement
        colorToggle(randomNbr);
    } else {
        shuffleSlide(); // Sinon, relance la fonction pour générer une nouvelle image aléatoire
    }
}


function colorToggle(index) { // Fonction pour ajouter/supprimer la classe "colored" aux éléments sélectionnés
    let selector = document.querySelectorAll('#selectors li'); // Sélectionne tous les éléments <li> de l'élément <ul> avec l'ID "selectors"
    selector.forEach(function (element) { // Pour chaque élément <li>
        element.classList.remove("colored"); // Supprime la classe "colored"
    });
    selector[index].classList.add("colored"); // Ajoute la classe "colored" à l'élément <li> correspondant à l'image actuelle
}

function selSlide(i) { // Fonction pour afficher l'image correspondante à l'élément <li> cliqué
    figure.src = imagesArray[i].src; // Change la source de l'image à afficher
    figure.alt = imagesArray[i].legend; // Change la légende de l'image à afficher
    figcaption.innerText = imagesArray[i].legend; // Change le texte de la légende de l'image à afficher
    colorToggle(i); // Ajoute/Supprime la classe "colored" à l'élément <li> correspondant
    currentImage = i; // Change l'image actuelle à celle correspondant au sélecteur cliqué
}

/*************************************************************************************************/
/* ****************************************** CODE PRINCIPAL ****************************************** */
/*************************************************************************************************/

toolbarSwitch.addEventListener('click', toolbarToggle); // Ajoute un gestionnaire d'événement au bouton de la barre d'outils pour l'afficher/masquer
prev.addEventListener('click', previousSlide); // Ajoute un gestionnaire d'événement au bouton "précédent" pour afficher l'image précédente
next.addEventListener('click', nextSlide); // Ajoute un gestionnaire d'événement au bouton "suivant" pour afficher la prochaine image
toggle.addEventListener('click', toggleSlide); // Ajoute un gestionnaire d'événement au bouton "lecture automatique" pour activer/désactiver la lecture automatique
shuffle.addEventListener('click', shuffleSlide); // Ajoute un gestionnaire d'événement au bouton "aléatoire" pour affihcer une image aléatoire

// Boucle pour ajouter les sélecteurs d'images
imagesArray.forEach((img, i) => { // Pour chaque élément dans le tableau d'images
    let li = document.createElement("li"); // Crée un nouvel élément <li>
    li.innerHTML = `<a href="#"></a>`; // Ajoute un élément <a> à l'intérieur de l'élément <li>
    li.id = `sel-${i}`; // Ajoute un ID unique à chaque élément <li> en utilisant l'index de l'élément dans le tableau
    ul.appendChild(li); // Ajoute l'élément <li> à l'élément <ul>
    li.addEventListener("click", function (e) { // Ajoute un écouteur d'événement au clic sur chaque élément <li> pour afficher l'image correspondante
        e.preventDefault(); // Empêche le comportement par défaut du lien <a>
        selSlide(i); // Appelle la fonction selSlide avec l'index de l'élément <li> cliqué en argument
    });
});
selSlide(0); // Appelle la fonction selSlide avec l'index de la première image en argument pour l'afficher au chargement de la page
toolbarSwitch.addEventListener('click', toolbarToggle); // Ajoute un écouteur d'événement au bouton de la barre d'outils pour l'afficher/masquer
next.addEventListener('click', nextSlide); // Ajoute un écouteur d'événement au bouton "suivant" pour afficher la prochaine image
prev.addEventListener('click', previousSlide); // Ajoute un écouteur d'événement au bouton "précédent" pour afficher l'image précédente
toggle.addEventListener('click', toggleSlide); // Ajoute un écouteur d'événement au bouton "lecture automatique" pour activer/désactiver la lecture automatique
shuffle.addEventListener('click', shuffleSlide); // Ajoute un écouteur d'événement au bouton "mélanger" pour mélanger les images
document.addEventListener('keydown', (event) => { // Ajoute un écouteur d'événement pour les flèches droite et gauche et la barre d'espacement pour naviguer entre les images
    if (event.code === "ArrowRight") {
        nextSlide();
    } else if (event.code === "ArrowLeft") {
        previousSlide();
    } else if (event.code === "Space") {
        toggleSlide();
    }
});

    

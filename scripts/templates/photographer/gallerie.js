// scripts/templates/gallerie.js

function galleryTemplate(data) {
    const { photographerId, image, title, likes, tags } = data;

    if (!photographerId || !image) {
        console.error("photographerId ou image manquants pour cet élément de média:", data);
        return null; // Si les valeurs manquent, on retourne null
    }


    function updateTotalLikes(change) {
        const likesElement = document.getElementById("likes-count");
        if (likesElement) {
            let currentTotalLikes = parseInt(likesElement.textContent);
            currentTotalLikes += change;
            likesElement.textContent = currentTotalLikes;
        } else {
            console.error("Élément #likes-count non trouvé");
        }
    }
    
    const divGallery = document.createElement("div");
    divGallery.classList.add("gallery-item");

    const img = document.createElement("img");
    img.setAttribute("src", `assets/${photographerId}/${image}`);
    img.setAttribute("alt", title);

    const divGalleryContent = document.createElement("div");
    divGalleryContent.classList.add("gallery-content");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const divLikes = document.createElement("div");
    divLikes.classList.add("likes");

    const i = document.createElement("i"); // i = Icone Like
    i.classList.add("far", "fa-heart");  // Initialement, l'icône est vide


    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");

    const lightboxImg = document.createElement("img");
    lightboxImg.classList.add("lightbox-img");
    lightboxImg.id = "lightbox-img";
    // lightboxImg.setAttribute("src", `assets/${photographerId}/${image}` || "https://via.placeholder.com/150");
    lightboxImg.src = `assets/${photographerId}/${image}` || "https://via.placeholder.com/150";
    lightboxImg.setAttribute("alt", title) || "Image non trouvée";


    const returnButton = document.createElement("i");
    returnButton.classList.add("fas", "fa-arrow-left");

    const nextButton = document.createElement("i");
    nextButton.classList.add("fas", "fa-arrow-right");

    const closeButton = document.createElement("i");
    closeButton.classList.add("fas", "fa-times");

    const titleLightbox = document.createElement("h2");
    titleLightbox.textContent = title;


    closeButton.addEventListener("click", function() {
        lightboxContent.style.display = "none";
    }
    );

    // Ajout d'un événement onclick pour gérer les likes/dislikes
    i.addEventListener("click", function() {
        let currentLikes = parseInt(this.previousElementSibling.textContent); //let car la variable peut changer de valeur

        if (isNaN(currentLikes)) {
            console.error("Nombre de likes non valide:", currentLikes); //si le nombre de likes n'est pas un nombre ou vide
            currentLikes = 0; //on initialise le nombre de likes à 0
        }

        if (this.classList.contains("liked")) {
            // Si déjà liké, on décrémente le nombre de likes et enlève la classe liked
            this.previousElementSibling.textContent = currentLikes - 1;
            this.classList.remove("liked");
            this.classList.remove("fas");
            this.classList.add("far"); // Icône du cœur vide (non liké)
            this.previousElementSibling.classList.remove("red-like"); // Couleur du texte en noir
            
            updateTotalLikes(-1); // Décrémenter le total des likes
        } else {
            // Si pas encore liké, on incrémente le nombre de likes et ajoute la classe liked
            this.previousElementSibling.textContent = currentLikes + 1;
            this.classList.add("liked");
            this.classList.remove("far");
            this.classList.add("fas"); // Icône du cœur plein (liké)
            this.previousElementSibling.classList.add("red-like"); // Couleur du texte en rouge
            
            updateTotalLikes(1); // Incrémenter le total des likes
        }
    });


    function displayLightbox(clickedImg) {
        const lightbox = document.querySelector(".lightbox-content");
        let lightboxImg = document.getElementById("lightbox-img");
        let currentImg = lightboxImg.getAttribute("src");
        if (lightbox) {
            lightbox.style.display = "flex"; // Assurez-vous que l'élément existe avant d'appliquer le style
            lightboxImg.classList.add("lightbox-img");
            lightboxImg.setAttribute("src", clickedImg);
        } else {
            console.error("Lightbox element not found.");
        }

        let currentImgIndex = mediaArray.findIndex((media) => "http://127.0.0.1:5500/assets/"+ photographerId + "/" + media.image === currentImg);

        if (currentImgIndex === -1) {
            returnButton.setAttribute("style", "display: none");
        } else {
            returnButton.setAttribute("style", "display: block");
        }



        if (currentImgIndex === mediaArray.length - 2) {
            nextButton.setAttribute("style", "display: none");
        }
    }

    // Ajout d'un événement onclick pour gérer les likes/dislikes
    img.addEventListener("click", function(e) {
        let clickedImg = e.srcElement.currentSrc; //let car la variable peut changer de valeur

        if (!clickedImg) {
            return;
        }

        displayLightbox(clickedImg);
    });

    function getPhotographerIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')); // Convertit en entier l'ID extrait
    }

    returnButton.addEventListener("click", function() {
        const lightbox = document.querySelector(".lightbox-content");
        let lightboxImg = document.getElementById("lightbox-img");
        let currentImg = lightboxImg.getAttribute("src");
        getPhotographerIdFromUrl();
        let currentImgIndex = mediaArray.findIndex((media) => "http://127.0.0.1:5500/assets/"+ photographerId + "/" + media.image === currentImg);

        if (currentImgIndex < mediaArray.length) {
            let prevImg = "http://127.0.0.1:5500/assets/" + mediaArray[currentImgIndex - 1].photographerId + "/" +  mediaArray[currentImgIndex - 1].image;
            lightboxImg.setAttribute("src", prevImg);
            if (currentImgIndex === 1) {
                returnButton.setAttribute("style", "display: none");
            } else {
                returnButton.setAttribute("style", "display: block");
            }
        }

        if (currentImgIndex < mediaArray.length) {
            nextButton.setAttribute("style", "display: block");
        } else {
            nextButton.setAttribute("style", "display: none");
        }
    }
    );



    nextButton.addEventListener("click", function() {
        const lightbox = document.querySelector(".lightbox-content");
        let lightboxImg = document.getElementById("lightbox-img");
        let currentImg = lightboxImg.getAttribute("src");
        getPhotographerIdFromUrl();
        let currentImgIndex = mediaArray.findIndex((media) => "http://127.0.0.1:5500/assets/"+ photographerId + "/" + media.image === currentImg);

        if (currentImgIndex < mediaArray.length - 1) {
            let nextImg = "http://127.0.0.1:5500/assets/" + mediaArray[currentImgIndex + 1].photographerId + "/" +  mediaArray[currentImgIndex + 1].image;
            lightboxImg.setAttribute("src", nextImg);
        }

        if (currentImgIndex === mediaArray.length - 2) {
            nextButton.setAttribute("style", "display: none");
        } else {
            nextButton.setAttribute("style", "display: block");
        }

        if (currentImgIndex === -1) {
            returnButton.setAttribute("style", "display: none");
        } else {
            returnButton.setAttribute("style", "display: block");
        }

    }
    );
    


    const span = document.createElement("span");
    span.textContent = likes;  // Affiche les likes initiaux

    const ul = document.createElement("ul");
    ul.classList.add("tags");

    // Assurez-vous que 'tags' est défini avant de boucler dessus
    if (Array.isArray(tags)) {
        tags.forEach((tag) => {
            const li = document.createElement("li");
            li.textContent = "#" + tag;
            ul.appendChild(li);
        });
    } else {
        console.warn("Tags non définis pour cet élément de média:", data);
    }

    divGallery.appendChild(img);
    divGalleryContent.appendChild(h2);
    divLikes.appendChild(span);  // On place le compteur de likes avant l'icône
    divLikes.appendChild(i);  // On place l'icône après le compteur de likes
    divGalleryContent.appendChild(divLikes);
    // divGalleryContent.appendChild(ul);
    divGallery.appendChild(divGalleryContent);
    divGallery.prepend(lightboxContent);
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(returnButton);
    lightboxContent.appendChild(nextButton);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(titleLightbox);


    return divGallery;
}

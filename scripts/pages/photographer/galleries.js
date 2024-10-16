//scripts/pages/galleries.js

document.addEventListener('DOMContentLoaded', (event) => {
    initGallery();  // Charger la galerie et appliquer le tri dès le chargement de la page
});

const selectedFilter = document.getElementById('filter');

selectedFilter.addEventListener('change', (event) => {
    const selectedOrder = event.target.value;
    orderGalleries(selectedOrder); // Trier les images selon la sélection
});



function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id || isNaN(parseInt(id))) {
        console.error("No valid photographer ID found in URL");
        return null; // Ajout d'un contrôle pour un ID invalide
    }
    return parseInt(id);
}

let mediaArray = [];

async function initGallery() {
    const { media } = await getPhotos();
    if (media && media.length > 0) {
        mediaArray = media; // Stocke les médias dans la variable globale
        const filterElement = document.getElementById('filter');
        const selectedOrder = filterElement.value;
        orderGalleries(selectedOrder);  // Trier les images selon la sélection
    } else {
        console.error("No media available for display.");
    }
}



async function getPhotos() {
    const photographerId = getPhotographerIdFromUrl(); // Récupère l'ID depuis l'URL
    const response = await fetch("data/photographers.json");
    const profils_photographers_json = await response.json();

    // Vérifiez si la section "media" existe
    const profils_media_all = profils_photographers_json.media;

    if (!profils_media_all) {
        console.error("No media data found in JSON file.");
        return { media: [] }; // Retourne un tableau vide si aucun média n'est trouvé
    }

    // Filtrez les médias par photographerId
    const profils_media = profils_media_all.filter((media) => {
        return media.photographerId === photographerId;
    });

    return {
        media: profils_media
    };
}



async function displayMedia(mediaArray) {
    const gallerySection = document.getElementById("gallerie-photos");
    gallerySection.innerHTML = ''; // Vider la galerie avant d'afficher les nouveaux éléments

    if (!Array.isArray(mediaArray) || mediaArray.length === 0) {
        console.error("Pas d\'images trouvé");
        return; // Arrête l'exécution si le tableau est vide ou invalide
    }

    mediaArray.forEach((media) => {
        const galleryModel = galleryTemplate(media);
        if (galleryModel) {
            gallerySection.appendChild(galleryModel);
        } else {
            console.error("L'image :", media, "a un problème.");
        }
    });
}



function orderGalleries(order) {
    if (order === "popularite") {
        mediaArray.sort((a, b) => b.likes - a.likes);
    } else if (order === "date") {
        mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "titre") {
        mediaArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayMedia(mediaArray);  
}




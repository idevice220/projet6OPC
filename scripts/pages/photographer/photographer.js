//pages/photographer/photographer.js

console.log("Le script photographer.js est chargé");

function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')); // Convertit en entier l'ID extrait
}

async function getProfilsPhotographers() {
    const photographerId = getPhotographerIdFromUrl();
    
    // Vérifiez que l'ID est valide
    if (isNaN(photographerId)) {
        console.error("ID du photographe invalide ou manquant dans l'URL");
        return { photographers: [] };
    }

    try {
        const response = await fetch("../data/photographers.json");
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier JSON");
        }

        const profils_photographers_json = await response.json();
        console.log("Données JSON récupérées:", profils_photographers_json);
        
        const profils_photographers_all = profils_photographers_json.photographers;
        const profils_photographers = profils_photographers_all.filter((photographer) => {
            return photographer.id === photographerId;
        });
        console.log("Photographes filtrés:", profils_photographers);
        return { photographers: profils_photographers };
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return { photographers: [] };
    }
}


async function init() {
    const { photographers } = await getProfilsPhotographers();
    displayData(photographers);
}

init().then(() => {
    console.log("Profil chargé, lancement de la galerie");
    initGallery();
});


async function displayData(photographers) {
    const photographersSection = document.getElementById("photograph-header");

    if (!photographersSection) {
        console.error("L'élément #photograph-header est introuvable dans le DOM");
        // return;
    }

    photographers.forEach((photographer) => {
        const photographerModel = profilPhotographerTemplate(photographer);
        const getProfilUserCardDom = photographerModel.getProfilUserCardDom();
        photographersSection.appendChild(getProfilUserCardDom);
    });
}

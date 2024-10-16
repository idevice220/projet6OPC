// Récupérer les données du photographe et des médias depuis le JSON
async function getPhotographerData(id) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    
    // Récupérer les informations du photographe
    const photographer = data.photographers.find(p => p.id === id);
    
    // Récupérer les médias associés au photographe
    const media = data.media.filter(m => m.photographerId === id);
    
    return { photographer, media };
}

// Calculer le total des likes à partir des médias
function calculateTotalLikes(media) {
    return media.reduce((total, item) => total + item.likes, 0);
}

// Afficher le profil du photographe et le total des likes
async function displayPhotographerProfile() {
    const photographerId = getPhotographerIdFromUrl(); // Suppose que tu as cette fonction pour obtenir l'ID depuis l'URL
    const { photographer, media } = await getPhotographerData(photographerId);

    if (photographer && media) {
        // Calculer le total des likes
        const totalLikes = calculateTotalLikes(media);

        // Afficher le nombre total de likes
        const likesElement = document.getElementById("likes-count");
        if (likesElement) {
            likesElement.textContent = totalLikes;
        }

        // Afficher le tarif
        const tarifElement = document.querySelector(".tarif");
        if (tarifElement) {
            tarifElement.textContent = `${photographer.price}€/ jour`;
        }
    } else {
        console.error("Données du photographe ou des médias non trouvées.");
    }
}

// Appeler la fonction au chargement de la page
displayPhotographerProfile();

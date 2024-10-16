//scripts/templates/photographer/profil.js

function profilPhotographerTemplate(data) {
    const { name, portrait, city, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getProfilUserCardDom() {

        const infoPhotographer = document.createElement("div");
        infoPhotographer.classList.add("info-photographer");

        const left = document.createElement("div");
        left.classList.add("left");


        const namePhotographer = document.createElement("h2");
        namePhotographer.classList.add("photograph-name");
        namePhotographer.textContent = name;

        const cityPhotographer = document.createElement("h3");
        cityPhotographer.classList.add("photograph-location");
        cityPhotographer.textContent = city;

        const taglinePhotographer = document.createElement("p");
        taglinePhotographer.classList.add("photograph-tagline");
        taglinePhotographer.textContent = tagline;

        const button = document.createElement("button");
        button.classList.add("contact_button");
        button.textContent = "Contactez-moi";
        button.setAttribute("onclick", "displayModal()");

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.classList.add("photograph-img");


        infoPhotographer.appendChild(left);
        left.appendChild(namePhotographer);
        left.appendChild(cityPhotographer);
        left.appendChild(taglinePhotographer);
        infoPhotographer.appendChild(button);
        infoPhotographer.appendChild(img);

        return infoPhotographer; // Ajout du return pour renvoyer l'élément DOM
    }

    return { name, city, tagline, picture,  getProfilUserCardDom }; // Retourne l'objet contenant la méthode
}

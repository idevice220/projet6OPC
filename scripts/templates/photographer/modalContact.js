





function photographerTemplateName(data) {
    const { name } = data;
    function getUserCardDOM() {
        const article = document.createElement("article");
        article.classList.add("article");
        const h2 = document.createElement("h2");

        const modalForm = document.createElement("form");
        modalForm.classList.add("modalForm");

        const labelPrenom = document.createElement("label");
        labelPrenom.textContent = "Prénom";
        labelPrenom.classList.add("modalLabelPrenom");

        const inputPrenom = document.createElement("input");
        inputPrenom.setAttribute("type", "text");
        inputPrenom.classList.add("modalInputPrenom");

        const labelNom = document.createElement("label");
        labelNom.textContent = "Nom";
        labelNom.classList.add("modalLabelNom");

        const inputNom = document.createElement("input");
        inputNom.setAttribute("type", "text");
        inputNom.classList.add("modalInputNom");

        const labelEmail = document.createElement("label");
        labelEmail.textContent = "Email";
        labelEmail.classList.add("modalLabelEmail");

        const inputEmail = document.createElement("input");
        inputEmail.setAttribute("type", "email");
        inputEmail.classList.add("modalInputEmail");

        const labelMessage = document.createElement("label");
        labelMessage.textContent = "Votre message";
        labelMessage.classList.add("modalLabelMessage");

        const inputMessage = document.createElement("textarea");
        inputMessage.setAttribute("type", "text");
        inputMessage.classList.add("modalInputMessage");

        const button = document.createElement("button");
        button.textContent = "Envoyer";
        button.classList.add("modalButton");


        h2.textContent = name;
        h2.classList.add("photographer_name");


    
        article.appendChild(h2);
        article.appendChild(modalForm);
        modalForm.appendChild(labelPrenom);
        modalForm.appendChild(inputPrenom);
        modalForm.appendChild(labelNom);
        modalForm.appendChild(inputNom);
        modalForm.appendChild(labelEmail);
        modalForm.appendChild(inputEmail);
        modalForm.appendChild(labelMessage);
        modalForm.appendChild(inputMessage);
        modalForm.appendChild(button);
        return article;
    }
    return { name, getUserCardDOM };
  }
  



  //je récupère les données des photographes

  async function getPhotographersName() {

    // // Récupérer les données du fichier JSON
    const response = await fetch("../../../data/photographers.json");
    const photographers_json = await response.json();
    const photographers = photographers_json.photographers; //je récupère les données des photographes

    const filterPhotographersName = photographers.filter((photographer) => {
        return photographer.id === getPhotographerIdFromUrl();
    }
    );
        return ({
            photographers: filterPhotographersName //je retourne les données des photographes
        })
}

async function displayDataName(photographers) {
    const ModalSection =  document.querySelector(".modal");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplateName(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        ModalSection.appendChild(userCardDOM);
    });
}

async function initName() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographersName(); 
    displayDataName(photographers);
}

initName();





function displayModal() {
    const modal = document.querySelector(".modal"); // Utilisez querySelector pour sélectionner un seul élément
    if (modal) {
        modal.style.display = "flex"; // Assurez-vous que l'élément existe avant d'appliquer le style
        getProfils();
        initName();
        
    } else {
        console.error("Modal element not found.");
    }
}

function closeModal() {
    const modal = document.querySelector(".modal"); // Utilisez querySelector pour sélectionner un seul élément
    if (modal) {
        modal.style.display = "none"; // Assurez-vous que l'élément existe avant d'appliquer le style
    } else {
        console.error("Modal element not found.");
    }
}
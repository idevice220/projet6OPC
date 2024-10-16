function photographerTemplate(data) {
  const { name, portrait, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const redirectImg = document.createElement("a");
    const redirectTitle = document.createElement("a");
    redirectTitle.classList.add("Title_a");
    const citydata = document.createElement("h4");
    const taglineData = document.createElement("h5");
    const priceData = document.createElement("p");

    redirectImg.setAttribute("href", "photographer.html?id=" + id);
    redirectTitle.setAttribute("href", "photographer.html?id=" + id);
    const img = document.createElement("img");
    article.setAttribute("href", "photographer.html");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    citydata.textContent = city;
    taglineData.textContent = tagline;
    priceData.textContent = price + "€/jour";
    

    article.appendChild(redirectImg);
    redirectImg.appendChild(img);
    article.appendChild(redirectTitle);
    redirectTitle.appendChild(h2);
    redirectTitle.appendChild(citydata);
    redirectTitle.appendChild(taglineData);
    redirectTitle.appendChild(priceData);
    return article;
  }
  return { name, picture, city, tagline, price, id, getUserCardDOM };
}

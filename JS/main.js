import { initMap } from "./Modules/map.js";
import { initCart } from "./Modules/cart.js";
import { initProducts } from "./Modules/productListing.js";
import { initMapView } from "./Modules/labMap.js";
import { fetchData } from "./Modules/fetchDataWrapper.js";

//Making sure the HTML is all loaded
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("Initializing webpage");

    const page = document.querySelector("[data-page]").dataset.page
    console.log(page);
    

    if (page === "map") {
        initMap();
    } else if (page === "cart") {
        initCart();
    } else if (page === "products") {
        initProducts();
    } else if (page === "labMap") {
        initMapView();
    }

    // displayGames(games);
}

function displayGames(games) {
    console.log("Displaying Games");

    let gameList = "<ol>";
    games.array.forEach(game => {
        console.log(game);
        gameList += `<li>${game.displayInfo()}</li>`
    });
    gameList += '</ol>';
    const gamePlaceholder = document.getElementById("gameList");
    gamePlaceholder.innerHTML = gameList;
}

class Game {
    constructor(title, genre, price, rating) {
        this.title = title;
        this.genre = genre;
        this.price = price;
        this.rating = rating;
    }

    displayInfo() {
        return `${title}, ${genre}, ${price}, ${rating}`;
    }
}

//Carousel in index.html

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("Data/catalog.json");
    if (!response.ok){
        throw new Error("Failed to load catalog");
    } 
    const data = await response.json();

    const products = data.products.slice(0, 3); // Load only first 3 games
    const carouselInner = document.getElementById("carouselInner");

    products.forEach((product, index) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");
      if (index === 0){ 
        item.classList.add("active");
      }

      const link = document.createElement("a");
      link.href = "details.html";
      link.addEventListener("click", () => {
        localStorage.setItem("show-id", JSON.stringify(product));
      });

      const img = document.createElement("img");
      img.src = product.Thumbnail;
      img.className = "d-block w-100";
      img.alt = product.GameTitle;
      img.style.maxHeight = "500px";
      img.style.objectFit = "cover";

      link.appendChild(img);
      item.appendChild(link);
      carouselInner.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading carousel data:", err);
  }
});
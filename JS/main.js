import { initMap } from "./Modules/map.js";
import { initCart } from "./Modules/cart.js";
import { initProducts } from "./Modules/productListing.js";
import { initMapView } from "./Modules/labMap.js";
import { fetchData } from "./Modules/fetchDataWrapper.js";
import { initDetailsPage } from "./Modules/details.js";

//Making sure the HTML is all loaded
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("Initializing webpage");

    const page = document.querySelector("[data-page]").dataset.page
    console.log(page);
    

    if (page === "map") {
        console.log("initializing map");
        
        initMap();
    } else if (page === "cart") {
        console.log("initializing cart page");
        initCart();
    } else if (page === "products") {
        console.log("initializing products");
        initProducts();
    } else if (page === "labMap") {
        initMapView();
    } else if (page === "details") {
        initDetailsPage();
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
      img.style.maxHeight = "800px";
      img.style.objectFit = "cover";

      link.appendChild(img);
      item.appendChild(link);
      carouselInner.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading carousel data:", err);
  }
});

//freetogame API table (Nicolas)

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("categorySelect");
  const gamesTableBody = document.querySelector("#gamesTable tbody");
  const gamesContainer = document.getElementById("gamesContainer");
  const showGamesBtn = document.getElementById("showGamesBtn");

  function fetchGames(category = "") {
    let url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    //Using fetch() for HTTP Get request to API
    fetch(url, {
      //RapidAPI headers
      method: "GET",
      headers: {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": "1b4ad3e367mshd7fe57842d61e43p1220fcjsn49a2b8876e63"
      }
    })
      .then((response) => response.json())
      .then((games) => {
        displayGames(games);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }

  function displayGames(games) {
    gamesTableBody.innerHTML = "";

    games.forEach((game) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><a href="${game.game_url}" target="_blank">${game.title}</a></td>
        <td>${game.genre}</td>
        <td>${game.platform}</td>
        <td>${game.publisher}</td>
        <td>${game.release_date}</td>
      `;

      gamesTableBody.appendChild(row);
    });
  }
 // Show the game list when button is clicked
  showGamesBtn.addEventListener("click", () => {
    gamesContainer.style.display = "block"; // Show the table
    fetchGames(); // Fetch games immediately when revealed
  });

  // Filter by category on selection
  categorySelect.addEventListener("change", () => {
    fetchGames(categorySelect.value);
  });
});


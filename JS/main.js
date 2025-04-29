import { initMap } from "./Modules/map.js";
import { initCart } from "./Modules/cart.js";

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
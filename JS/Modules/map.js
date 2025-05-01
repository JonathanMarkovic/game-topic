import { fetchData } from "./fetchDataWrapper.js";

export function initMap() {
    console.log("Loading Map");
    loadMap();
    loadPlaces();
}


function loadMap() {
    console.log("Loading map");
    var x = 51.505;
    var y = -0.09;
    var z = 0;
    
    var map = L.map('map').setView([45.51357076414713, -73.6178719676218], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    console.log("map loaded");
}

async function loadPlaces() {
    try {
      const resourceURI = "Data/places.json"; // Adjust path if needed
      const places = await fetchData(resourceURI);
      console.log(places);
      
      displayPlaces(places);
    } catch (error) {
      console.error(`Error fetching products: ${error.message}`);
    }
  }
  
  function displayPlaces(data) {
    const locationsList = document.getElementById("locations");
    // Create a map of categories for easy lookup
    const categoriesMap = {};
    data.categories.forEach(category => {
      categoriesMap[category.id] = category.name;
    });
  
    data.places.forEach(place => {
        const id = place.id;
        // console.log(id);
        const name = place.name;
        // console.log(name);
        const description = place.description;
        // console.log(description);
        const categoryName = categoriesMap[id]
        const location = document.createElement('li');
        location.innerHTML = `<P>ID: ${id} <br>
                              Name: ${name}<br>
                              About: ${description}<br>
                              Category: ${categoryName}</p>`;

        locationsList.appendChild(location);
      });
      
}
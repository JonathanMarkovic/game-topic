import { fetchData } from "./fetchDataWrapper.js";

export function initMap() {
    console.log("Loading Map");
    loadPlaces();
}


function loadMap(data) {
    console.log("Loading map");
    var x = 51.505;
    var y = -0.09;
    var z = 0;
    
    const map = L.map('map').setView([45.51357076414713, -73.6178719676218], 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    console.log("map loaded");

    const categoriesMap = {};
    data.categories.forEach(category => {
      categoriesMap[category.id] = category.name;
    });

    console.log("Placing Markers");
    data.places.forEach(place => {
      var coords = place.point.coordinates.split(',');
        var x = parseFloat(coords[0]);
        var y = parseFloat(coords[1]);
        var marker = L.marker([x,y]).addTo(map);
        var placeInfo = `<h5>${place.name}</h5>
                         <p>${place.description}</p>
                         <p>${categoriesMap[place.categoryId]}</p>`
        marker.bindPopup(placeInfo)
      });
}

async function loadPlaces() {
    try {
      const resourceURI = "Data/places.json"; // Adjust path if needed
      const places = await fetchData(resourceURI);
      console.log(places);
      
      displayPlaces(places);
      loadMap(places);
    } catch (error) {
      console.error(`Error fetching products: ${error.message}`);
    }
}
  
function displayPlaces(data) {
    console.log("Displaying Places");
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
        location.innerHTML = `<P>Name: ${name}<br>`;

        
        
        location.addEventListener('click', () => {
        });
        locationsList.appendChild(location);

        
      });
      
}
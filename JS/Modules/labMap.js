import { fetchData } from "./fetchDataWrapper.js";

// We are going to implement the map functionality
// Load the content of the places,JSON
// Handle the user interaction of the list of places

export function initMapView() {
    // 1) Create an Instance of the Leaflet map and set the initial view to 
    // your preferred location
    loadMap();

    
}

function loadMap() {
    console.log("Loading map");
    var x = 51.505;
    var y = -0.09;
    var z = 0;
    
    const map = L.map('leafletMap').setView([45.51357076414713, -73.6178719676218], 11);

    // 2) set the map layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    console.log("map loaded");

    // 3) placing a marker on the map
    var marker = L.marker([45.605391336221054, -73.56483937772526]).addTo(map);
    const placeInfo = `<h4>Game Stop</h4>
    <p>The Description foes here</p>
    <p>The address of the business</p>`
    marker.bindPopup(placeInfo)

    loadPlaces();
    displayPlaces();
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

        
        var marker = L.marker(place.point.coordinates.split(',')).addTo(map);
        location.addEventListener('click', () => {
        });
        locationsList.appendChild(location);
      });
      
}
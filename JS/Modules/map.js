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
        var category = categoriesMap[place.categoryId];
        
        
        // Link for doing the custom icons
        // https://leafletjs.com/examples/custom-icons/
        // var icon = L.icon({iconUrl: data.categories[place.categoryId].markerIcon});

        // 5) adding the custom marker for the map
        // For the current place, we need to find the matching category (search by ID in the categories array)
        const currentCategory = data.categories[place.categoryId - 1];
        const uri = currentCategory.markerIcon;
        console.log(uri);

        const customIcon = L.icon({
          iconUrl: uri
        })

        var marker = L.marker([x,y], {icon: customIcon}).addTo(map);
        var placeInfo = `<h5>${place.name}</h5>
                         <p>${place.description}</p>
                         <p>${category}</p>`
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
        location.setAttribute("class" , "list-group-item list-group-item-action");
        location.innerHTML = `<P>Name: ${name}<br>`;

        var coords = place.point.coordinates.split(',');
        var x = parseFloat(coords[0]);
        var y = parseFloat(coords[1]);
        
        location.addEventListener('click', () => {

        });
        locationsList.appendChild(location);

        
      });
      
}
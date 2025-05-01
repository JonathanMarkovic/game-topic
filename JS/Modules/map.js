import { fetchData } from "./fetchDataWrapper.js";

export function initMap() {
    console.log("Loading Map");
    loadMap();
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
      displayPlaces(places);
    } catch (error) {
      console.error(`Error fetching products: ${error.message}`);
    }
  }
  
//   async function fetchData(resourceURI) {
//       try {
//           //1) Implementing an HTTP client / making AJAX calls.
//           const response = await fetch(resourceURI);
//           console.log(response)
//           //2) Validate the HTTP response message
//           if(!response.ok) {
//               //We got an invalid response
//               throw new Error(`An error occurred by processing the request ${response.status}`);
//           }
//           //3) Retrieve the payload (the data we fetched) from the response.
//           const data = await response.json(); //json returns a 'promise' that's why we use 'await'
//           // console.log(data);
//           return data;
//       } catch (error) {
//           throw error;
//       }
//   }
  
  function displayPlaces(data) {
    const tblProducts = document.getElementById("tbl-products");
  
    // Create a map of categories for easy lookup
    const categoriesMap = {};
    data.categories.forEach(category => {
      categoriesMap[category.id] = category.name;
    });
  
   
}
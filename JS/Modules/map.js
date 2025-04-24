export function initMap() {
    console.log("Loading Map");

}


function loadMap() {
    console.log("Loading map");
    
    var map = L.map('map').setView([45.50282324556003, -73.56256104677308], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
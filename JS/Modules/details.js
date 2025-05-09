document.addEventListener("DOMContentLoaded", initDetailsPage);

export function initDetailsPage() {
    console.log("content initialized");
    // get id from local storage API
    const id = JSON.parse(localStorage.getItem("show-id"));
    // 2) Select or find the product by its ID
    console.log(id);
}


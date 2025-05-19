document.addEventListener("DOMContentLoaded", initDetailsPage);

export function initDetailsPage() {
    console.log("content initialized");
    // get id from local storage API
    const id = JSON.parse(localStorage.getItem("show-id"));
    // 2) Select or find the product by its ID
    console.log(id);

    const container = document.getElementById("detailsContainer");
    
    // load the image into the document from local storage
    const image = document.getElementById("detailsImage");
    image.src = id.Thumbnail;

    // load the description from the local storage
    const desc = document.getElementById("description");
    desc.innerText = id.Description;

    // load the price from the local storage
    const price =  document.getElementById('price');
    price.innerText = id.Price;

    // load the publisher from the local storage
    const publisher = document.getElementById('publisher');
    publisher.innerText = id.Publisher;

    // load the category from the local storage
    

    // load title from local storage
    const title = document.getElementById('title');
    title.innerText = id.GameTitle;

    //get the add to cart button and add event listener
    const addCart = document.getElementById("addCart");
    addCart.addEventListener('click', () => {
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);

        if (cart === null || cart === undefined) {
            cart = [];
        }

        cart.push(JSON.stringify(id));
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(cart);
    });
}
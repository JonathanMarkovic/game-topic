//ESM Modules for implementing the shopping cart logic 

// function renderCart(games) {

//   const cartItems = document.getElementById("cart-items");

//     // Create a map of categories for easy lookup
//     const categoriesMap = {};
//     data.categories.forEach(category => {
//       categoriesMap[category.categoryID] = category.CategoryName;
//     });
  
//     // Add products to table
//     data.products.forEach(product => {
//       const tr = document.createElement('tr');
      
//       // Category Name
//       const categoryTd = document.createElement('td');
//       categoryTd.textContent = categoriesMap[product.CategoryID] || 'Unknown';
//       tr.appendChild(categoryTd);
      
//       // Product Name
//       const nameTd = document.createElement('td');
//       nameTd.textContent = product.GameTitle;
//       tr.appendChild(nameTd);
      
//       // Price
//       const priceTd = document.createElement('td');
//       priceTd.textContent = product.Price === 0 ? 'Free' : `$${product.Price.toFixed(2)}`;
//       tr.appendChild(priceTd);
      
//       // Image
//       const imgTd = document.createElement('td');
//       const img = document.createElement('img');
//       img.src = product.Thumbnail;
//       img.width = 100;
//       img.height = 100;
//       img.alt = product.GameTitle;
//       imgTd.appendChild(img);
//       tr.appendChild(imgTd);
      
//       cartItems.appendChild(tr);
//     });
// }

export function initCart() {
  loadCart();
}

function loadCart() {
  console.log("loading cart");
  
  const cartList = document.getElementById("cart-items");
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);

  if (cart === null) {
    cart = [];
  }

  console.log(cart);
  cartList.innerHTML = ``;
  //creating an element for each cart item in the list
  cart.forEach(cartGame => {
    // const img = item.Thumbnail;\
    console.log(cartGame);
    cartGame = JSON.parse(cartGame);
    console.log(cartGame);
    
    const Title = cartGame.GameTitle;
    console.log(Title);
    
    const Price = cartGame.Price;
    console.log(Price);

    const cartItem = document.createElement('li');
    // const button = document.createElement('button');

    const titleDiv = document.createElement('div');
    titleDiv.innerText = Title;

    const priceDiv = document.createElement('div');
    priceDiv.innerText = Price;

    const button = document.createElement('button');
    button.textContent = "Remove";

    button.addEventListener('click', () => {
      const index = cart.indexOf(cartGame);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    })

    cartItem.appendChild(titleDiv);
    cartItem.appendChild(priceDiv);
    cartItem.appendChild(button);
    
    cartList.appendChild(cartItem);
  })
}

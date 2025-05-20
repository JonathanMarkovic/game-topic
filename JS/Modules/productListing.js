import { fetchData } from "./fetchDataWrapper.js";

export async function initProducts() {
  console.log("Initializing the product listing page...");
  await fetchProducts();
  document.getElementById("searchInput").addEventListener("input", searchTable);
}

async function fetchProducts() {
  try {
    console.log("Fetching products...");
    const resourceURI = "Data/catalog.json"; // Adjust path if needed
    const catalogData = await fetchData(resourceURI);
    displayProducts(catalogData);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
  }
}

// async function fetchData(resourceURI) {
//     try {
//         //1) Implementing an HTTP client / making AJAX calls.
//         const response = await fetch(resourceURI);
//         console.log(response)
//         //2) Validate the HTTP response message
//         if(!response.ok) {
//             //We got an invalid response
//             throw new Error(`An error occurred by processing the request ${response.status}`);
//         }
//         //3) Retrieve the payload (the data we fetched) from the response.
//         const data = await response.json(); //json returns a 'promise' that's why we use 'await'
//         // console.log(data);
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

function displayProducts(data) {
  const tblProducts = document.getElementById("tbl-products");

  // Create a map of categories for easy lookup
  const categoriesMap = {};
  data.categories.forEach(category => {
    categoriesMap[category.categoryID] = category.CategoryName;
  });

  // Add products to table
  data.products.forEach(product => {
    const tr = document.createElement('tr');
    
    // Category Name
    const categoryTd = document.createElement('td');
    categoryTd.textContent = categoriesMap[product.CategoryID] || 'Unknown';
    tr.appendChild(categoryTd);
    
    // Product Name
    const nameTd = document.createElement('td');
    const nameLink = document.createElement('span'); // Could be a <button> or <a> instead
    nameLink.textContent = product.GameTitle;
    nameLink.style.textDecoration = 'underline';
    nameLink.style.cursor = 'pointer';

    // Set custom attribute
    nameLink.dataset.showId = product.ProductID;

    // Click event to store in localStorage and redirect
    nameLink.addEventListener('click', (ev) => {
      localStorage.setItem("show-id", JSON.stringify(product)); // Save whole object
      window.location = "details.html"; // Redirect to details page
    });

    nameTd.appendChild(nameLink);
    tr.appendChild(nameTd);
    
    // Price
    const priceTd = document.createElement('td');
    priceTd.textContent = product.Price === 0 ? 'Free' : `$${product.Price.toFixed(2)}`;
    tr.appendChild(priceTd);
    
    // Image
    const imgTd = document.createElement('td');
    const img = document.createElement('img');
    img.src = product.Thumbnail;
    img.width = 100;
    img.height = 100;
    img.alt = product.GameTitle;
    imgTd.appendChild(img);
    tr.appendChild(imgTd);

    // Add to Cart Button
    const cartTd = document.createElement('td');
    const addCartBtn = document.createElement('button');
    addCartBtn.innerHTML = '<i class="bi bi-cart-plus"></i>';
    addCartBtn.className = 'btn btn-primary btn-sm';
    
    addCartBtn.addEventListener('click', () => {
      let cart = localStorage.getItem('cart');
      cart = JSON.parse(cart);

      if (cart === null || cart === undefined) {
        cart = [];
      }

      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));

      console.log(cart);
      alert(`${product.GameTitle} added to cart!`);
    });
    
    cartTd.appendChild(addCartBtn);
    tr.appendChild(cartTd);
    
    tblProducts.appendChild(tr);
  });
}

//search bar function
function searchTable() {
    console.log("searchTable running");
    const filter = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('tbl-products');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length > 0) {
            const category = cells[0].textContent.toLowerCase();
            const name = cells[1].textContent.toLowerCase();

            // Show row if filter matches either category or name
            if (category.includes(filter) || name.includes(filter)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

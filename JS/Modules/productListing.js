import { fetchData } from "./fetchDataWrapper.js";

document.addEventListener('DOMContentLoaded', initProducts);

export async function initProducts() {
  console.log("Initializing the product listing page...");
  await fetchProducts();
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

    // Set custom attribute (not required here, but preserved for example)
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
    
    tblProducts.appendChild(tr);
  });
}
//ESM Modules for implementing the shopping cart logic 

function renderCart(games) {
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
      nameTd.textContent = product.GameTitle;
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

export function initCart() {
    const btnRenderCart = document.getElementById("btn-render-cart");
    btnRenderCart.addEventListener('click', () => {
        renderCart(localStorage.getItem("games"));
    });
}

// =======================================================
// 🔍 VELNOXA SEARCH & FEATURED PRODUCTS RENDER (FIXED)
// =======================================================

const productContainer = document.getElementById("product-container");

document.addEventListener("DOMContentLoaded", () => {
    // Agar products array available hai toh shuru me saare products render karein
    if (typeof products !== 'undefined') {
        renderProducts(products);
    }
});

function renderProducts(productsList) {
    if (!productContainer) return;
    
    productContainer.innerHTML = ""; 

    if (productsList.length === 0) {
        productContainer.innerHTML = `<h3 style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 40px 0;">No products found matching your search. 😕</h3>`;
        return;
    }

    productsList.forEach(product => {
        // Check karo kya ye product wishlist me hai?
        let savedWish = JSON.parse(localStorage.getItem("velnoxa_wishlist")) || [];
        const isWishlisted = savedWish.some(item => item.id === product.id);
        const heartIcon = isWishlisted ? "❤️" : "🤍";
        const bgStyle = isWishlisted ? "background: #ffe4e6;" : "background: #ffffff;";

        productContainer.innerHTML += `
        <div class="product-card" style="position: relative;">
            <span class="discount">20% OFF</span>
            
            <button class="wishlist-btn" data-id="${product.id}" onclick="toggleWishlist(${product.id})" style="position: absolute; top: 10px; right: 10px; ${bgStyle} border: 1px solid #e2e8f0; font-size: 18px; cursor: pointer; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); z-index: 10;">
                ${heartIcon}
            </button>
            
            <a href="pages/product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit; display: block;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: contain;">
                <h3>${product.name}</h3>
            </a>
            
            <div class="rating">⭐⭐⭐⭐⭐</div>
            <p class="price">₹${product.price}</p>
            <button class="add-cart" data-id="${product.id}">🛒 Add To Cart</button>
        </div>
        `;
    });
}
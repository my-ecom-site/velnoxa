// ===============================
// DYNAMIC PRODUCT DETAILS
// ===============================

// 1. URL se Product ID nikalna (jaise ?id=5)
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// 2. products.js wale array me se us ID wala product dhoondhna
const product = products.find(p => p.id === productId);

// 3. Agar product mil jaye, toh page par uski details set karna
if (product) {
    // Check karna ki image link internet ka hai ya local folder ka
    const imagePath = product.image.startsWith('http') ? product.image : '../' + product.image;
    
    // HTML elements ko update karna
    document.getElementById('main-img').src = imagePath;
    document.querySelector('.pro-info h4').innerText = product.name;
    
    // Price update karna (Fake original price banakar dikhana taaki discount lage)
    const originalPrice = product.price + 500;
    document.querySelector('.pro-info h2').innerHTML = `₹${product.price} <del>₹${originalPrice}</del> <span class="offer">(Special OFF)</span>`;
    
    // Page ka Title (Tab name) bhi change karna
    document.title = `${product.name} - Velnoxa`;
} else {
    // Agar user kisi galat link par aa jaye toh error message dikhana
    document.querySelector('.pro-detail').innerHTML = `<h2>Oops! Product not found. 😕</h2>`;
}
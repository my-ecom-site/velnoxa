// =======================================================
// ❤️ VELNOXA WISHLIST SYSTEM LOGIC (SAFE CORRECTION)
// =======================================================

let wishlist = JSON.parse(localStorage.getItem("velnoxa_wishlist")) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateWishlistCount();
    setupWishlistButtons();
});

function updateWishlistCount() {
    const wishlistCountBadge = document.getElementById("wishlist-count");
    if (wishlistCountBadge) {
        wishlistCountBadge.textContent = wishlist.length;
    }
}

function toggleWishlist(productId) {
    if (typeof products === 'undefined') return;

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const existingIndex = wishlist.findIndex(item => item.id === parseInt(productId));
    
    // Sabhi buttons ko dhoondhna jinpar ye product ID hai
    const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`);

    if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        buttons.forEach(btn => {
            btn.innerHTML = "🤍";
            btn.style.background = "#ffffff";
        });
        if(typeof showToast === 'function') showToast("Removed from Wishlist! 🤍");
    } else {
        // Add to wishlist
        wishlist.push(product);
        buttons.forEach(btn => {
            btn.innerHTML = "❤️";
            btn.style.background = "#ffe4e6";
        });
        if(typeof showToast === 'function') showToast("Added to Wishlist! ❤️");
    }

    localStorage.setItem("velnoxa_wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

// Page load par check karega kaun-kaun se buttons red hone chahiye
function setupWishlistButtons() {
    const wishButtons = document.querySelectorAll(".wishlist-btn");
    wishButtons.forEach(btn => {
        const id = btn.getAttribute("data-id");
        const isExist = wishlist.some(item => item.id === parseInt(id));
        if (isExist) {
            btn.innerHTML = "❤️";
            btn.style.background = "#ffe4e6";
        } else {
            btn.innerHTML = "🤍";
            btn.style.background = "#ffffff";
        }
    });
}
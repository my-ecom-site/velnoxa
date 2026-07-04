// =======================================================
// 🛒 VELNOXA MASTER CART SYSTEM
// =======================================================

// 1. Cart load karna (Universal Key: velnoxa_cart)
let cart = JSON.parse(localStorage.getItem("velnoxa_cart")) || [];

// Page load hone par sabse pehle count update karo aur page check karo
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    
    // Agar hum cart.html wale page par hain, toh items render karo
    if (document.getElementById("cart-items-container")) {
        renderCartPage();
    }
});

// 2. Navbar me Cart ka number (count) update karna
function updateCartCount() {
    const cartCountBadge = document.getElementById("cart-count");
    if (cartCountBadge) {
        let total = 0;
        cart.forEach(item => total += (item.quantity || 1));
        cartCountBadge.textContent = total;
    }
}

// 3. Product ko Cart me Add karna (Event Delegation for all buttons)
document.addEventListener("click", function(e) {
    // Check agar click kiya gaya element "add-cart" button hai
    if (e.target && e.target.classList.contains("add-cart")) {
        const productId = e.target.getAttribute("data-id");
        
        // Ensure products array exists (from products.js)
        if (typeof products === 'undefined') {
            console.error("Products array is missing!");
            return;
        }

        const product = products.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Check agar product pehle se cart me hai
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            // Memory me save karna
            localStorage.setItem("velnoxa_cart", JSON.stringify(cart));
            updateCartCount();

            // Success Message
            if (typeof showToast === 'function') {
                showToast(`🛒 ${product.name} added to cart!`);
            } else {
                alert(`🛒 ${product.name} added to cart!`);
            }
        }
    }
});

// 4. Cart Page par Items dikhana (`cart.html` ke liye)
function renderCartPage() {
    const container = document.getElementById("cart-items-container");
    const summaryItems = document.getElementById("summary-items");
    const summaryTotal = document.getElementById("summary-total");
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg" style="text-align: center; padding: 40px; color: #64748b;"><h3>Your Cart is Empty 😔</h3><p>Start adding some premium products!</p></div>`;
        summaryItems.textContent = "0";
        summaryTotal.textContent = "₹0";
        return;
    }

    container.innerHTML = "";
    let totalAmount = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        let cleanPrice = typeof item.price === 'string' ? item.price.replace(/[^\d]/g, '') : item.price;
        let itemTotal = parseInt(cleanPrice) * (item.quantity || 1);
        
        totalAmount += itemTotal;
        totalItems += (item.quantity || 1);

        container.innerHTML += `
        <div class="cart-item" style="display: flex; gap: 15px; border-bottom: 1px solid #e2e8f0; padding: 15px 0; align-items: center;">
            <img src="../${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f8fafc; border-radius: 8px;">
            <div style="flex: 1;">
                <h3 style="font-size: 16px; margin-bottom: 5px; color: #1e293b;">${item.name}</h3>
                <p style="font-weight: bold; color: #0f172a;">₹${cleanPrice}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 14px; font-weight: 600;">Qty: ${item.quantity || 1}</span>
                <button onclick="removeFromCart(${index})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer;">Delete</button>
            </div>
        </div>`;
    });

    summaryItems.textContent = totalItems;
    summaryTotal.textContent = `₹${totalAmount}`;
}

// 5. Cart se item delete karna
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("velnoxa_cart", JSON.stringify(cart));
    updateCartCount();
    renderCartPage();
};
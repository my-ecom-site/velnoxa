// =======================================================
// 🛍️ VELNOXA CHECKOUT & ORDER SYSTEM (WITH HISTORY)
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("velnoxa_cart")) || 
               JSON.parse(localStorage.getItem("cart")) || 
               JSON.parse(localStorage.getItem("cartItems")) || [];
    
    if (cart.length === 0) {
        alert("⚠️ Your cart is empty! Please add some products first.");
        window.location.href = "../index.html";
        return;
    }

    let totalItems = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        totalItems += item.quantity || 1;
        let cleanPrice = typeof item.price === 'string' ? item.price.replace(/[^\d]/g, '') : item.price;
        totalAmount += (parseInt(cleanPrice) * (item.quantity || 1));
    });

    document.getElementById("chk-total-items").textContent = totalItems;
    document.getElementById("chk-total-amount").textContent = `₹${totalAmount}`;
    
    const checkoutForm = document.getElementById("checkout-form");
    
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            const name = document.getElementById("chk-name").value;

            // 🔥 ORDER HISTORY SAVE KARNE KA NAYA LOGIC
            let previousOrders = JSON.parse(localStorage.getItem("velnoxa_orders")) || [];
            let newOrder = {
                orderId: "VLX" + Math.floor(100000 + Math.random() * 900000), // Jaise VLX459821
                date: new Date().toLocaleDateString(),
                amount: totalAmount,
                method: paymentMethod,
                items: cart
            };
            previousOrders.push(newOrder);
            localStorage.setItem("velnoxa_orders", JSON.stringify(previousOrders));

            // Success Alert
            alert(`🎉 Congratulations ${name}!\nYour Order (ID: ${newOrder.orderId}) has been placed.\nYou can view it in your Profile.`);

            // Cart Khali karna
            localStorage.removeItem("velnoxa_cart");
            localStorage.removeItem("cart");
            localStorage.removeItem("cartItems");

            window.location.href = "../index.html";
        });
    }
});
// =======================================================
// ⚙️ VELNOXA SECRET ADMIN LOGIC (WITH PHOTO UPLOAD)
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Total Orders aur Sales calculation
    let orders = JSON.parse(localStorage.getItem("velnoxa_orders")) || [];
    let totalSales = 0;

    const ordersListContainer = document.getElementById("admin-orders-list");
    
    if (orders.length === 0) {
        ordersListContainer.innerHTML = "<p style='color: #64748b;'>No orders placed by customers yet.</p>";
    } else {
        ordersListContainer.innerHTML = "";
        orders.forEach(order => {
            totalSales += parseInt(order.amount) || 0;
            
            ordersListContainer.innerHTML += `
                <div style="border-bottom: 1px solid #e2e8f0; padding: 10px 0;">
                    <strong>ID:</strong> ${order.orderId} | <strong>Amt:</strong> ₹${order.amount} <br>
                    <span style="font-size: 12px; color: #64748b;">Method: ${order.method} | Date: ${order.date}</span>
                </div>
            `;
        });
    }

    document.getElementById("total-orders-count").textContent = orders.length;
    document.getElementById("total-sales-amount").textContent = `₹${totalSales}`;

    // 2. Form submit karke naya product photo ke sath add karna
    const addProductForm = document.getElementById("add-product-form");
    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("prod-name").value;
            const category = document.getElementById("prod-category").value;
            const price = document.getElementById("prod-price").value;
            const imageFile = document.getElementById("prod-image").files[0];

            if (imageFile) {
                // Image Size check karein (Max 2MB)
                if (imageFile.size > 2 * 1024 * 1024) {
                    alert("⚠️ Image is too large! Please upload a photo smaller than 2MB.");
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Image = event.target.result; // Photo text me convert ho gayi

                    // Naya product object banate hain
                    let newProduct = {
                        id: "PRD" + Math.floor(1000 + Math.random() * 9000),
                        name: name,
                        category: category,
                        price: `₹${price}`,
                        image: base64Image, // Save the actual photo!
                        rating: "⭐⭐⭐⭐⭐"
                    };

                    // Custom dynamic products array memory me save karte hain
                    let customProducts = JSON.parse(localStorage.getItem("velnoxa_custom_products")) || [];
                    customProducts.push(newProduct);
                    localStorage.setItem("velnoxa_custom_products", JSON.stringify(customProducts));

                    alert(`🎉 "${name}" with image has been successfully added to your store!`);
                    addProductForm.reset();
                };

                reader.readAsDataURL(imageFile);
            }
        });
    }
});
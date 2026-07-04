// =======================================================
// 👤 VELNOXA ADVANCED PROFILE & LOGOUT LOGIC
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Active User ka naam nikalna
    const activeUserName = localStorage.getItem("velnoxa_active_user");
    
    // Agar koi bina login kiye direct profile page par aane ki koshish kare
    if (!activeUserName) {
        alert("⚠️ Please Login first to access your profile!");
        window.location.href = "login.html";
        return;
    }

    // Naam set karna aur Avatar ka pehla akshar (Letter) nikalna
    document.getElementById("profile-name").textContent = activeUserName;
    document.getElementById("avatar-letter").textContent = activeUserName.charAt(0).toUpperCase();

  // 2. Database se user ka data nikalna
    let registeredUsers = JSON.parse(localStorage.getItem("velnoxa_users")) || [];
    let currentUserData = registeredUsers.find(user => user.name === activeUserName);

    if (currentUserData) {
        document.getElementById("profile-mobile").textContent = `📲 +91 ${currentUserData.mobile}`;
        
        // Input box me pehle se user ka current naam dikhana
        document.getElementById("profile-edit-name").value = currentUserData.name;
    }

    // 3. Name Update / Save karne ka Logic
    const saveNameBtn = document.getElementById("save-name-btn");
    if (saveNameBtn) {
        saveNameBtn.addEventListener("click", () => {
            const newName = document.getElementById("profile-edit-name").value.trim();
            
            if (newName === "") {
                alert("⚠️ Name cannot be empty!");
                return;
            }

            if (currentUserData) {
                // 1. Database me naam update karo
                currentUserData.name = newName; 
                localStorage.setItem("velnoxa_users", JSON.stringify(registeredUsers));
                
                // 2. Active User (Login Session) ka naam bhi update karo
                localStorage.setItem("velnoxa_active_user", newName);

                // 3. Screen par turant naya naam aur naya Avatar letter dikhao
                document.getElementById("profile-name").textContent = newName;
                document.getElementById("avatar-letter").textContent = newName.charAt(0).toUpperCase();

                alert("🎉 Name updated successfully!");
            }
        });
    }
    // 4. Logout Button ka Logic
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Memory se active user ko hata do
            localStorage.removeItem("velnoxa_active_user");
            alert("🔒 Logged out successfully! Redirecting to Home.");
            window.location.href = "../index.html"; // Wapas home page par bhej do
        });
    }

    // 5. Order History Render Karna (Puraana Logic)
    const ordersContainer = document.getElementById("orders-container");
    let previousOrders = JSON.parse(localStorage.getItem("velnoxa_orders")) || [];

    if (previousOrders.length === 0) {
        ordersContainer.innerHTML = `<p style="color: #64748b; text-align: center; padding: 40px 0; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">You haven't placed any orders yet. 🛍️</p>`;
        return;
    }

    ordersContainer.innerHTML = "";
    // Naye orders upar dikhane ke liye reverse kiya
    [...previousOrders].reverse().forEach(order => {
        let itemNames = order.items.map(item => `${item.name} (Qty: ${item.quantity || 1})`).join(", ");

        ordersContainer.innerHTML += `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <strong>Order ID:</strong> ${order.orderId} <br>
                    <span style="font-size: 12px; color: #64748b;">Placed on: ${order.date}</span>
                </div>
                <div style="text-align: right;">
                    <strong style="font-size: 16px; color: #0f172a;">₹${order.amount}</strong> <br>
                    <span class="order-status">Successful (${order.method})</span>
                </div>
            </div>
            <div class="order-items-list">
                <strong>Items:</strong> ${itemNames}
            </div>
        </div>`;
    });
// ==========================================
    // 📸 PHOTO UPLOAD LOGIC
    // ==========================================
    const photoUpload = document.getElementById("photo-upload");
    const avatarElement = document.getElementById("avatar-letter");

    // Agar user ki pehle se koi photo save hai, toh use dikhao
    if (currentUserData && currentUserData.photo) {
        avatarElement.style.backgroundImage = `url(${currentUserData.photo})`;
        avatarElement.textContent = ""; // Letter hata do
    }

    if (photoUpload) {
        photoUpload.addEventListener("change", function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // Photo ka size check karna (Agar 2MB se badi hai toh mana kar do)
                if (file.size > 2 * 1024 * 1024) {
                    alert("⚠️ Photo is too large! Please upload an image smaller than 2MB.");
                    return;
                }

                // File ko padhne ke liye FileReader ka use karenge
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const base64Image = e.target.result; // Photo text format (Base64) me convert ho gayi
                    
                    // 1. Screen par turant photo lagao
                    avatarElement.style.backgroundImage = `url(${base64Image})`;
                    avatarElement.textContent = ""; // Letter hata do
                    
                    // 2. Database me save karo
                    if (currentUserData) {
                        currentUserData.photo = base64Image;
                        localStorage.setItem("velnoxa_users", JSON.stringify(registeredUsers));
                        alert("📸 Profile photo updated successfully!");
                    }
                };
                
                // File ko read karna shuru karo
                reader.readAsDataURL(file);
            }
        });
    }
});
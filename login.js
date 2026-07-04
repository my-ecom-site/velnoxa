// =======================================================
// 🔑 VELNOXA MOBILE OTP LOGIN LOGIC
// =======================================================

const loginSendOtpBtn = document.getElementById("login-send-otp");
const loginVerifyBtn = document.getElementById("login-verify-btn");
const loginOtpSection = document.getElementById("login-otp-section");
const loginForm = document.getElementById("login-form");

let loginGeneratedOTP = "";
let currentLoginUser = ""; // Naam save rakhne ke liye

if (loginSendOtpBtn) {
    loginSendOtpBtn.addEventListener("click", function () {
        const mobile = document.getElementById("login-mobile").value.trim();

        if (mobile.length !== 10) {
            alert("⚠️ Please enter a valid 10-digit Mobile Number.");
            return;
        }

        // Check karna ki number registered hai ya nahi
        let registeredUsers = JSON.parse(localStorage.getItem("velnoxa_users")) || [];
        const validUser = registeredUsers.find(user => user.mobile === mobile);

        if (!validUser) {
            alert("❌ No account found with this number! Please Sign Up first.");
            return;
        }

        currentLoginUser = validUser.name; // Username store kar liya
        loginGeneratedOTP = Math.floor(1000 + Math.random() * 9000).toString();
        
        alert(`📲 Velnoxa SMS: Your Login OTP is ${loginGeneratedOTP}.`);

        loginOtpSection.style.display = "block";
        loginSendOtpBtn.style.display = "none";
        loginVerifyBtn.style.display = "block";
        document.getElementById("login-mobile").disabled = true;
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const enteredOTP = document.getElementById("login-otp").value.trim();

        if (enteredOTP === loginGeneratedOTP) {
            // User ko logged in mark kar diya
            localStorage.setItem("velnoxa_active_user", currentLoginUser);
            alert(`🎉 Welcome back, ${currentLoginUser}!`);
            window.location.href = "../index.html";
        } else {
            alert("❌ Invalid OTP! Try again.");
        }
    });
}
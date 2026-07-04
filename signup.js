// =======================================================
// 📱 VELNOXA MOBILE OTP SIGN UP LOGIC
// =======================================================

const sendOtpBtn = document.getElementById("send-otp-btn");
const verifyBtn = document.getElementById("verify-btn");
const otpSection = document.getElementById("otp-section");
const signupForm = document.getElementById("signup-form");

let generatedOTP = ""; // OTP save rakhne ke liye variable

// 1. Send OTP Button Click Logic
if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", function () {
        const name = document.getElementById("signup-name").value.trim();
        const mobile = document.getElementById("signup-mobile").value.trim();

        if (name === "" || mobile.length !== 10) {
            alert("⚠️ Please enter a valid Name and 10-digit Mobile Number.");
            return;
        }

        // Check karo ki ye number pehle se registered toh nahi hai
        let registeredUsers = JSON.parse(localStorage.getItem("velnoxa_users")) || [];
        const userExists = registeredUsers.some(user => user.mobile === mobile);

        if (userExists) {
            alert("⚠️ This Mobile Number is already registered! Please Login.");
            window.location.href = "login.html";
            return;
        }

        // Fake OTP Generate karna (1000 se 9999 ke beech)
        generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
        
        // 🚨 YAHAN HUM SMS BHEJNE KI JAGAH SCREEN PAR OTP DIKHA RAHE HAIN 
        alert(`📲 Velnoxa SMS: Your verification OTP is ${generatedOTP}. Do not share this with anyone.`);

        // OTP daalne ka box dikhao aur Send button chhupao
        otpSection.style.display = "block";
        sendOtpBtn.style.display = "none";
        verifyBtn.style.display = "block";
        
        // Mobile number edit karna band kar do
        document.getElementById("signup-mobile").disabled = true;
        document.getElementById("signup-name").disabled = true;
    });
}

// 2. Verify & Sign Up Logic
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const enteredOTP = document.getElementById("signup-otp").value.trim();

        if (enteredOTP === generatedOTP) {
            // OTP sahi hai, data save karo
            const name = document.getElementById("signup-name").value.trim();
            const mobile = document.getElementById("signup-mobile").value.trim();

            let registeredUsers = JSON.parse(localStorage.getItem("velnoxa_users")) || [];
            registeredUsers.push({ name: name, mobile: mobile });
            localStorage.setItem("velnoxa_users", JSON.stringify(registeredUsers));

            alert("🎉 Sign Up Successful! Welcome to Velnoxa.");
            
            // Login page par bhej do
            window.location.href = "login.html";
        } else {
            alert("❌ Invalid OTP! Please try again.");
        }
    });
}
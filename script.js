// ===============================
// LOGIN FUNCTIONALITY
// ===============================

const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Page ko faaltu me refresh hone se rokne ke liye

        // Email aur Password box ki value pakadna
        const emailInput = document.querySelector(".input-group input[type='email']").value.trim();
        const passwordInput = document.querySelector(".input-group input[type='password']").value.trim();

        if (emailInput === "" || passwordInput === "") {
            // Agar khali chhod diya toh warning toast
            if (typeof showToast === "function") {
                showToast("⚠️ Please enter both Email and Password.");
            } else {
                alert("⚠️ Please enter both Email and Password.");
            }
        } else {
            // User ka data browser ki memory (localStorage) me save karna
            localStorage.setItem("velnoxa_active_user", emailInput);
            
            // Success Message (Toast)
            if (typeof showToast === "function") {
                showToast("🎉 Login Successful! Redirecting...");
            } else {
                alert("🎉 Login Successful! Welcome back to Velnoxa.");
            }
            
            // Login hone ke baad 1.5 seconds ka wait, fir Home page par bhejna
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1500);
        }
    });
}

// =======================================================
// 🎪 VELNOXA PREMIUM BANNER SLIDER LOGIC
// =======================================================
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlides() {
    if (slides.length === 0) return; // Agar kisi page par slider nahi hai toh error na aaye

    // Saare slides ko chhupao
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    // Current slide aur dot ko active karo
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    // Agle 4 second me firse run karo
    setTimeout(showSlides, 4000); 
}

// Dot par click karne par slide change karne ka option
window.currentSlide = function(index) {
    slideIndex = index;
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
};

// Page load hote hi slider shuru karo
document.addEventListener("DOMContentLoaded", () => {
    if(slides.length > 0) {
        setTimeout(showSlides, 4000);
    }
});
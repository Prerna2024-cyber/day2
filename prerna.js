document.addEventListener("DOMContentLoaded", function () {
    const createHackathonBtn = document.getElementById("create-hackathon-btn");
    const showHackathonsBtn = document.getElementById("show-hackathons-btn");
    const logoutBtn = document.getElementById("logout");

    const createHackathonSection = document.getElementById("create-hackathon-form");
    // const showHackathonsSection = document.getElementById("hackathon-list-container");

    const closeCreateBtn = document.getElementById("close-create-form");
    const closeShowBtn = document.getElementById("close-hackathon-list");

    const loginPopup = document.getElementById("login-popup");
    const loginBtn = document.getElementById("login-btn");
    const closeLoginPopup = document.getElementById("close-login-popup");
    const emailInput = document.getElementById("admin-email");
    const passwordInput = document.getElementById("admin-password");

    // Show Create Hackathon Form
    createHackathonBtn.addEventListener("click", function () {
        createHackathonSection.style.display = "block";
    });

    // Show Login Popup Before Showing Hackathons
    showHackathonsBtn.addEventListener("click", function () {
        loginPopup.style.display = "block";
    });

    closeLoginPopup.addEventListener("click", function () {
        loginPopup.style.display = "none";
    });

    loginBtn.addEventListener("click", function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === "admin@example.com" && password === "admin123") { // Replace with actual authentication
            loginPopup.style.display = "none";
            showHackathonsSection.style.display = "block";
        } else {
            alert("Invalid email or password");
        }
    });

    // Close Forms
    closeCreateBtn.addEventListener("click", function () {
        createHackathonSection.style.display = "none";
    });

    closeShowBtn.addEventListener("click", function () {
        showHackathonsSection.style.display = "none";
    });

    // Logout Function
    logoutBtn.addEventListener("click", function () {
        alert("Logging out...");
        window.location.href = "login.html"; // Redirect to login page
    });
});

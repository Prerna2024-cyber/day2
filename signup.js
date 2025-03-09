document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const signupType = document.getElementById("signup-type").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const signupMessage = document.getElementById("signup-message");

    // Determine API endpoint
    const apiEndpoint = signupType === "admin" 
        ? "http://localhost:3000/api/v1/admin/signup" 
        : "http://localhost:3000/api/v1/user/signup";

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            signupMessage.textContent = "Signup successful! Redirecting to login...";
            signupMessage.style.color = "green";
            setTimeout(() => window.location.href = "login.html", 2000);
        } else {
            signupMessage.textContent = data.error || "Signup failed. Try again.";
            signupMessage.style.color = "red";
        }
    } catch (error) {
        signupMessage.textContent = "Error connecting to server.";
        signupMessage.style.color = "red";
        console.error("Error:", error);
    }
});

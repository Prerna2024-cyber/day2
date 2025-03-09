document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const loginType = document.getElementById("login-type").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const apiEndpoint = loginType === "admin" 
        ? "http://localhost:3000/api/v1/admin/signin" 
        : "http://localhost:3000/api/v1/user/signin";

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert(`Login successful as ${loginType}!`);
            window.location.href = loginType === "admin" ? "admin.html" : "user.html";
        } else {
            errorMessage.textContent = data.error || "Invalid email or password.";
        }
    } catch (error) {
        errorMessage.textContent = "Error connecting to server.";
        console.error("Error:", error);
    }
});

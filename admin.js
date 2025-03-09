document.addEventListener("DOMContentLoaded", function () {
    const createForm = document.getElementById("create-hackathon-form");
    const updateForm = document.getElementById("update-hackathon-form");
    const message = document.getElementById("message");
    const logoutButton = document.getElementById("logout");

    // Check if the admin is logged in
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Unauthorized access! Please log in.");
        window.location.href = "login.html";
    }

    // Logout Function
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    });

    // Handle Hackathon Creation
    createForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const prize = parseFloat(document.getElementById("prize").value);
        const startDate = new Date(document.getElementById("start-date").value);
        const submissionDate = new Date(document.getElementById("submission-date").value);

        if (prize < 0 || submissionDate <= startDate) {
            message.textContent = "Invalid input: check prize and dates.";
            message.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/admin/hackathon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, prize, date_of_start: startDate.toISOString(), date_of_submission: submissionDate.toISOString() })
            });
            
            const data = await response.json();
            message.textContent = response.ok ? "Hackathon created successfully!" : (data.error || "Failed to create hackathon.");
            message.style.color = response.ok ? "green" : "red";
            if (response.ok) createForm.reset();
        } catch (error) {
            message.textContent = "Error connecting to server.";
            message.style.color = "red";
            console.error("Error:", error);
        }
    });

    // Handle Hackathon Update
    updateForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const hackathonId = document.getElementById("hackathon-id").value;
        const updatedData = {
            title: document.getElementById("update-title").value,
            description: document.getElementById("update-description").value,
            prize: document.getElementById("update-prize").value,
            date_of_start: document.getElementById("update-start-date").value,
            date_of_submission: document.getElementById("update-submission-date").value
        };

        // Remove empty fields
        Object.keys(updatedData).forEach(key => {
            if (!updatedData[key]) delete updatedData[key];
        });

        try {
            const response = await fetch(`http://localhost:3000/api/v1/admin/hackathon/${hackathonId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            
            const data = await response.json();
            message.textContent = response.ok ? "Hackathon updated successfully!" : (data.error || "Failed to update hackathon.");
            message.style.color = response.ok ? "green" : "red";
            if (response.ok) updateForm.reset();
        } catch (error) {
            message.textContent = "Error connecting to server.";
            message.style.color = "red";
            console.error("Error:", error);
        }
    });
});

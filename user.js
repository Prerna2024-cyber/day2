document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById("logout");
    const participatedList = document.getElementById("participated-hackathons");
    const hackathonSelect = document.getElementById("hackathon-select");
    const submitForm = document.getElementById("submit-project-form");
    const message = document.getElementById("message");

    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Unauthorized access! Please log in.");
        window.location.href = "login.html";
    }

    // Logout function
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    });

    // Fetch participated hackathons
    async function fetchParticipatedHackathons() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/participated-hackathons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                participatedList.innerHTML = "";
                hackathonSelect.innerHTML = "<option value='' disabled selected>Select a Hackathon</option>";

                data.hackathons.forEach(hackathon => {
                    // Add to the list
                    const li = document.createElement("li");
                    li.textContent = hackathon.title;
                    participatedList.appendChild(li);

                    // Add to the dropdown
                    const option = document.createElement("option");
                    option.value = hackathon._id;
                    option.textContent = hackathon.title;
                    hackathonSelect.appendChild(option);
                });
            } else {
                message.textContent = data.error || "Failed to load hackathons.";
                message.style.color = "red";
            }
        } catch (error) {
            message.textContent = "Error connecting to server.";
            message.style.color = "red";
            console.error("Error:", error);
        }
    }

    // Handle project submission
    submitForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const hackathonId = hackathonSelect.value;
        const githubLink = document.getElementById("github-link").value;

        if (!hackathonId) {
            message.textContent = "Please select a hackathon.";
            message.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/submit-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ hackathonId, githubLink })
            });

            const data = await response.json();
            if (response.ok) {
                message.textContent = "Project submitted successfully!";
                message.style.color = "green";
                submitForm.reset();
            } else {
                message.textContent = data.error || "Failed to submit project.";
                message.style.color = "red";
            }
        } catch (error) {
            message.textContent = "Error connecting to server.";
            message.style.color = "red";
            console.error("Error:", error);
        }
    });


    async function registerForHackathon(hackathonId) {
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/register-hackathon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ hackathonId })
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Successfully registered for the hackathon!");
                fetchParticipatedHackathons(); // Refresh participated hackathons
                fetchAvailableHackathons(); // Refresh available hackathons
            } else {
                alert(data.error || "Registration failed.");
            }
        } catch (error) {
            console.error("Error registering:", error);
        }
    }
    

    // Load hackathons on page load
    fetchParticipatedHackathons();
});

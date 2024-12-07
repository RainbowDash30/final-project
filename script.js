document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedbackForm");
    const commentsList = document.getElementById("commentsList");
    let editingComment = null; // Variable to store the comment being edited

    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const feedback = document.getElementById("feedback").value.trim();

        if (name === "" || feedback === "") {
            alert("Please fill out both fields.");
            return;
        }

        if (editingComment) {
            // Update the existing comment
            editingComment.innerHTML = `<strong>${name}:</strong> ${feedback} <button class="edit-btn">Edit</button>`;
            editingComment = null; // Reset editing state
        } else {
            // Create a new comment
            const commentItem = document.createElement("li");
            commentItem.innerHTML = `<strong>${name}:</strong> ${feedback} <button class="edit-btn">Edit</button>`;
            commentsList.appendChild(commentItem);
        }

        // Clear the form
        feedbackForm.reset();
    });

    // Handle edit button clicks
    commentsList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit-btn")) {
            // Load comment data back into the form for editing
            const commentItem = e.target.parentElement;
            const nameText = commentItem.querySelector("strong").innerText.replace(":", "").trim();
            const feedbackText = commentItem.innerText.split(":")[1].trim().replace("Edit", "").trim();

            document.getElementById("name").value = nameText;
            document.getElementById("feedback").value = feedbackText;

            // Store the comment item being edited
            editingComment = commentItem;
        }
    });
});

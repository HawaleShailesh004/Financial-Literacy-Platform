document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editProfileForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting to the server

        // Perform validations
        if (!validateForm()) {
            return false; // Stop the form submission if validation fails
        }

        alert('Profile updated successfully!');
    });
});

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('profileImagePreview').querySelector('img');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function validateForm() {
    // Validate Name
    const name = document.getElementById('name').value;
    if (!name.match(/^[a-zA-Z ]+$/)) {
        alert('Name should only contain letters and spaces.');
        return false;
    }

    // Validate Age
    const age = parseInt(document.getElementById('age').value, 10);
    if (age <= 14) {
        alert('Age must be greater than 14.');
        return false;
    }

    // Validate Bio
    const bio = document.getElementById('bio').value;
    const wordCount = bio.trim().split(/\s+/).length;
    if (wordCount < 20 || wordCount > 50) {
        alert('Bio should be between 20 to 50 words.');
        return false;
    }

    return true;
}

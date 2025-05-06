document.getElementById('startQuizBtn').addEventListener('click', function() {
    document.getElementById('quizModal').style.display = 'block';
    
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('quizModal').style.display = 'none';
});

document.getElementById('beginQuizBtn').addEventListener('click', function() {
    document.getElementById('quizModal').style.display = 'none';
    // Additional logic to start the quiz can be added here
    window.location.href = "quiz"
});
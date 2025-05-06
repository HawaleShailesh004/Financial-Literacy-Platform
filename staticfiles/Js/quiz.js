const quizData = {
  questions: [{
          question: "What is the purpose of a budget?",
          options: [
              "To track historical spending",
              "To plan future spending",
              "To increase debt",
              "To avoid saving money",
          ],
          answer: "2",
          explanation: "Correct answer is B. A budget is planned to ensure that there's a plan for spending in the future, helping to manage finances effectively.",
          isAttempted: "0",
      },
      {
          question: "What does APR stand for?",
          options: [
              "Average Payment Rate",
              "Annual Percentage Rate",
              "Accumulated Principal Return",
              "Asset Protection Ratio",
          ],
          answer: "2",
          explanation: "Correct answer is B. APR stands for Annual Percentage Rate, which measures the cost of credit per year.",
          isAttempted: "0",
      },
      {
          question: "Which of the following is an example of a liquid asset?",
          options: ["Real estate", "Stocks", "Savings account", "Jewelry"],
          answer: "3",
          explanation: "Correct answer is C. A savings account is considered a liquid asset because the funds are readily accessible.",
          isAttempted: "0",
      },
      {
          question: "What is the purpose of diversification in investment?",
          options: [
              "To put all money in one investment",
              "To reduce risk by investing in different assets",
              "To limit potential returns",
              "To complicate the investment process",
          ],
          answer: "2",
          explanation: "Correct answer is B. Diversification spreads risk across different assets, reducing the impact of a poor performance by any single investment.",
          isAttempted: "0",
      },
      {
          question: "Which of the following is considered a liability?",
          options: ["House", "Car", "Credit card debt", "Savings account"],
          answer: "3",
          explanation: "Correct answer is C. Credit card debt is a liability because it's an obligation to pay money to another party.",
          isAttempted: "0",
      },
      {
          question: "What is the recommended minimum emergency fund size?",
          options: [
              "One month's income",
              "Three months' expenses",
              "Six months' income",
              "One year's expenses",
          ],
          answer: "2",
          explanation: "Correct answer is B. It's advisable to have an emergency fund that covers at least three months' expenses for financial security.",
          isAttempted: "0",
      },
      {
          question: "Which of the following retirement accounts offers tax advantages for contributions?",
          options: [
              "Traditional IRA",
              "Savings account",
              "Checking account",
              "Certificate of deposit (CD)",
          ],
          answer: "1",
          explanation: "Correct answer is A. A Traditional IRA offers tax advantages, including tax-deductible contributions for qualified individuals.",
          isAttempted: "0",
      },
      {
          question: "What is the purpose of insurance?",
          options: [
              "To increase risk",
              "To transfer risk",
              "To eliminate risk",
              "To avoid risk",
          ],
          answer: "2",
          explanation: "Correct answer is B. Insurance transfers the financial risk from the insured to the insurer, providing financial protection against unforeseen events.",
          isAttempted: "0",
      },
      {
          question: "What is the correct order of steps in the financial planning process?",
          options: [
              "Set goals, create a budget, save and invest, review and revise",
              "Save and invest, set goals, create a budget, review and revise",
              "Create a budget, set goals, save and invest, review and revise",
              "Review and revise, save and invest, set goals, create a budget",
          ],
          answer: "1",
          explanation: "Correct answer is A. The first step in financial planning is setting goals, followed by creating a budget, saving and investing, and then reviewing and revising the plan.",
          isAttempted: "0",
      },
      {
          question: "What is compound interest?",
          options: [
              "Interest paid only once",
              "Interest calculated on the initial principal and also on the accumulated interest",
              "Interest paid by banks",
              "Interest calculated annually",
          ],
          answer: "2",
          explanation: "Correct answer is B. Compound interest is calculated on both the initial principal and the accumulated interest, leading to exponential growth over time.",
          isAttempted: "0",
      },
      {
          question: "What does ROI stand for?",
          options: [
              "Return on Investment",
              "Rate of Income",
              "Revenue of Interest",
              "Risk of Investment",
          ],
          answer: "1",
          explanation: "Correct answer is A. ROI stands for Return on Investment, which measures the efficiency of an investment.",
          isAttempted: "0",
      },
      {
          question: "What does FICO score measure?",
          options: [
              "Driving ability",
              "Creditworthiness",
              "Income level",
              "Savings rate",
          ],
          answer: "2",
          explanation: "Correct answer is B. A FICO score measures creditworthiness, indicating how likely individuals are to repay borrowed money.",
          isAttempted: "0",
      },
      {
          question: "Which of the following is a tax-deductible expense?",
          options: ["Entertainment", "Groceries", "Medical expenses", "Clothing"],
          answer: "3",
          explanation: "Correct answer is C. Medical expenses can be tax-deductible if they exceed a certain portion of the taxpayer's adjusted gross income.",
          isAttempted: "0",
      },
      {
          question: "What does ETF stand for?",
          options: [
              "Extra Tax Fund",
              "Efficient Trading Fund",
              "Exchange-Traded Fund",
              "Earnings Tracking Fund",
          ],
          answer: "3",
          explanation: "Correct answer is C. ETF stands for Exchange-Traded Fund, which is a type of investment fund that is traded on stock exchanges.",
          isAttempted: "0",
      },
      {
          question: "What is the purpose of a will?",
          options: [
              "To distribute assets after death according to one's wishes",
              "To avoid paying taxes",
              "To transfer debt to heirs",
              "To appoint a guardian for minor children",
          ],
          answer: "1",
          explanation: "Correct answer is A. A will is used to distribute someone's assets after their death according to their wishes.",
          isAttempted: "0",
      },
  ],
};



let timer = document.getElementById("timeLeft");
let countdownTimer; // Moved outside to keep track of the interval across different runs

function isTimeLeft(timeLeft) {
  return timeLeft > -1;
}

function stopTimer() {
  if (countdownTimer) {
      clearInterval(countdownTimer); // Clear existing timer if it exists
  }
}

function runTimer(timerElement, timeLeft) {
  stopTimer(); // Stop any existing timer before starting a new one

  const timerCircle = timerElement.querySelector("svg > circle + circle");
  timerElement.classList.add("animatable");
  timerCircle.style.strokeDashoffset = 1;

  countdownTimer = setInterval(function() {
      if (isTimeLeft(timeLeft)) {
          const timeRemaining = timeLeft--;
          const normalizedTime = (60 - timeRemaining) / 60;
          // For clockwise animation
          // const normalizedTime = (timeRemaining - 60) / 60;
          timerCircle.style.strokeDashoffset = normalizedTime;
          timer.innerHTML = timeRemaining;
      } else {
          alert("Time Out!");
          addExplanation(currentQuestion);
          nextBtn.disabled = currentQuestion == 15 ? true : false;
          prevBtn.disabled = currentQuestion == 1 ? true : false;

          showCorrectAnswer(currentQuestion);
          quizData["questions"][currentQuestion - 1]["isAttempted"] = true;
          clearInterval(countdownTimer);
          timerElement.classList.remove("animatable");
      }
  }, 1000);
}

// Example usage:
runTimer(document.querySelector(".timer"), 59);

let currentQuestion = 1;
var Score = 0;
displayDataInElements(currentQuestion);

// Handling Event for Next 7 Previous button
let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#prevBtn");
nextBtn.disabled = true;
prevBtn.disabled = true;

let correctIndex = quizData["questions"][currentQuestion - 1]["answer"];

nextBtn.addEventListener("click", (event) => {
  nextQuestion();
});

prevBtn.addEventListener("click", (event) => {
  currentQuestion--;
  let buttons = Array.from(
      optionContainer.getElementsByClassName("option-button")
  );

  buttons.forEach((element) => {
      element.classList.remove("correct", "incorrect");
      element.disabled = false;
  });
  displayDataInElements(currentQuestion);
  stopTimer();

  addExplanation(currentQuestion);
  correctIndex = quizData["questions"][currentQuestion - 1]["answer"];
  buttons.forEach((button, index) => {
      console.log("index ", index);
      console.log("Correct Index", correctIndex);
      if (index + 1 == correctIndex) {
          button.classList.add("correct");
      } else {
          button.classList.add("incorrect");
      }
      button.disabled = true;
  });

  nextBtn.disabled = false;
  if (currentQuestion == 1) {
      prevBtn.disabled = true;
  } else {
      prevBtn.disabled = false;
  }
});

document.querySelector(".next-step-btn").addEventListener("click", () => {
  window.location.href = "sign-up";
});
// Handling Events for Option Buttons
const optionContainer = document.querySelector(".options-section");

if (currentQuestion == 1) {
  prevBtn.disabled = true;
}
optionContainer.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "BUTTON") {
      stopTimer();
      const buttons = Array.from(
          optionContainer.getElementsByClassName("option-button")
      );
      // Reset styles for all buttons
      buttons.forEach((button) => {
          button.classList.remove("correct", "incorrect");
      });
      const selectedOptionIndex = buttons.indexOf(e.target);

      // Assume checkAnswer returns true if the answer is correct
      const isCorrect = checkAnswer(currentQuestion, selectedOptionIndex + 1);

      // Apply the correct style to the selected button and incorrect style to others
      let index = buttons.indexOf(e.target);

      console.log("Current Question", currentQuestion);
      addExplanation(currentQuestion);
      if (isCorrect) {
          // e.target.classList.add('correct');
          addScore();

          document.querySelector(".score").textContent =
              Score > 9 ? Score : `0${Score}`;
      }

      correctIndex = quizData["questions"][currentQuestion - 1]["answer"];
      buttons.forEach((button, index) => {
          // console.log("index ", index)
          // console.log("Correct Index", correctIndex)
          if (index + 1 == correctIndex) {
              button.classList.add("correct");
          } else {
              button.classList.add("incorrect");
          }
      });

      console.log(
          "Selected option number:",
          selectedOptionIndex + 1,
          isCorrect ? " is Correct" : " is Wrong!"
      );

      buttons.forEach((element) => {
          element.disabled = true;
      });

      quizData["questions"][currentQuestion - 1]["isAttempted"] = 1;
      console.log(quizData["questions"][currentQuestion - 1]);

      nextBtn.disabled = currentQuestion == 15 ? true : false;
      prevBtn.disabled = currentQuestion == 1 ? true : false;

      if (currentQuestion == 15) {
          nextBtn.disabled = true;
          openModal();
      }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  document
      .getElementById("seeResultBtn")
      .addEventListener("click", function() {
          closeModal();

         
          // Here you can add functionality to show the quiz results
          // For example, redirecting to a result page or displaying result in the modal itself
      
          document.querySelector("#result").style.display = "block";
          document.querySelector("#quiz-cont").style.display = "none";
          document.querySelector(".user-score").textContent = Score;
          document.querySelector("#result-p").style.width = `${
      (Score / 15) * 100
    }%`;

          setFeedback(Score); // Adjust this call based on the actual score
      });
});

function nextQuestion() {
  currentQuestion++;
  console.log(quizData["questions"][currentQuestion - 1]["isAttempted"]);
  console.log(quizData["questions"][currentQuestion - 1]);
  console.log(currentQuestion);
  let buttons = Array.from(
      optionContainer.getElementsByClassName("option-button")
  );

  console.log(checkIfAttempted(currentQuestion));

  buttons.forEach((element) => {
      element.classList.remove("correct", "incorrect");
      element.disabled = false;
  });

  stopTimer();
  runTimer(document.querySelector(".timer"), 59);

  displayDataInElements(currentQuestion);
  if (checkIfAttempted(currentQuestion)) {
      correctIndex = quizData["questions"][currentQuestion - 1]["answer"];
      buttons.forEach((button, index) => {
          console.log("index ", index);
          console.log("Correct Index", correctIndex);
          if (index + 1 == correctIndex) {
              button.classList.add("correct");
          } else {
              button.classList.add("incorrect");
          }
          button.disabled = true;
      });

      stopTimer();

      addExplanation(currentQuestion);
  }

  nextBtn.disabled = false;
  if (currentQuestion == 1) {
      prevBtn.disabled = true;
  } else {
      prevBtn.disabled = false;
  }

  const p = (currentQuestion / 15) * 100;
  document.getElementById("p-bar").style.width = `${p}%`;
  // appendWidthById('p-bar');

  nextBtn.disabled = checkIfAttempted(currentQuestion) ? false : true;
  prevBtn.disabled = true;
}

function checkIfAttempted(qNo) {
  let aT = +quizData["questions"][qNo - 1]["isAttempted"];
  console.log("At", aT);
  return aT == 0 ? false : true;
}

function addExplanation(qNo) {
  let expText = quizData["questions"][qNo - 1]["explanation"];

  let explanationSecEle = document.querySelector("#exp");
  let expTextSection = document.querySelector("#explanationText");

  explanationSecEle.style.display = "block";
  expTextSection.textContent = expText;
  console.log("Exp");
}

// Function add Score
function addScore() {
  Score++;
  const animationContainer = document.getElementById("animationContainer");
  const scoreText = document.createElement("div");
  scoreText.classList.add("scoreText");
  scoreText.textContent = "Score +1";

  // Adjusting these styles to position the text based on your layout
  scoreText.style.left = "50%";
  scoreText.style.top = "50%";
  scoreText.style.transform = "translate(-50%, -50%)";

  animationContainer.appendChild(scoreText);

  // Remove the text after the animation ends (2 seconds)
  setTimeout(() => {
      scoreText.remove();
  }, 2000);
}

// Function to Display Question data in Elements
function displayDataInElements(qNo) {
  var questionTtlEle = document.querySelector(".question-text");
  var questionNoEle = document.querySelector(".question-title");
  var explanationSecEle = document.querySelector("#exp");

  explanationSecEle.style.display = "none";

  let queTitle = quizData["questions"][qNo - 1]["question"];
  questionTtlEle.innerHTML = queTitle;
  questionNoEle.textContent = `Question ${qNo}/15`;

  // Options Elements
  var option = document.querySelectorAll(".option-button");

  var optionsText = quizData["questions"][qNo - 1]["options"];

  for (let i = 0; i < 4; i++) {
      option[i].textContent = optionsText[i];
  }
}

function showCorrectAnswer(qNo) {
  const buttons = Array.from(
      optionContainer.getElementsByClassName("option-button")
  );
  // Reset styles for all buttons
  buttons.forEach((button) => {
      button.classList.remove("correct", "incorrect");
  });
  correctIndex = quizData["questions"][qNo - 1]["answer"];
  buttons.forEach((button, index) => {
      // console.log("index ", index)
      // console.log("Correct Index", correctIndex)
      if (index + 1 == correctIndex) {
          button.classList.add("correct");
      } else {
          button.classList.add("incorrect");
      }
  });
}

function resetBtnClasses() {
  const buttons = Array.from(
      optionContainer.getElementsByClassName("option-button")
  );
  // Reset styles for all buttons
  buttons.forEach((button) => {
      button.classList.remove("correct", "incorrect");
  });
}

function checkAnswer(qNo, selectedOption) {
  let queAns = +quizData["questions"][qNo - 1]["answer"];

  if (selectedOption == queAns) {
      return true;
  }

  return false;
}

function openModal() {
  const modal = document.getElementById("quizCompletedModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("quizCompletedModal");
  modal.style.display = "none";
}

function setFeedback(score) {
  let progressBar = document.querySelector("#result-p");
  let title, description, className;

//   alert("Set Feedback Callled");
  // Remove all possible classes first
  progressBar.classList.remove(
      "beginner",
      "learner",
      "skilled",
      "expert",
      "master"
  );

  if (score < 3) {
      title = "Beginner";
      description =
          "You are at the beginning of your finance journey. Keep learning!";
      className = "beginner";
  } else if (score < 5 && score > 3) {
      title = "Learner";
      description =
          "You have started to grasp basic finance concepts. Good progress!";
      className = "learner";
  } else if (score < 8 && score > 5) {
      title = "Skilled";
      description = "Impressive! You have a good handle on finance basics.";
      className = "skilled";
  } else if (score < 10 && score > 8) {
      title = "Expert";
      description = "You are almost a finance expert. Well done!";
      className = "expert";
  } else {
      title = "Master";
      description = "Congratulations! You are a master of finance.";
      className = "master";
  }

  // Update the title and description
  document.getElementById("scoreTitle").textContent = title;
  document.getElementById("scoreDescription").textContent = description;
  // Add the new class to change the emoji
  progressBar.classList.add(className);
  console.log(progressBar.classList);
}
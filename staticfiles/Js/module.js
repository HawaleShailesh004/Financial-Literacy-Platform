// console.log("Before Binding");
// window.onbeforeunload = function (event) {
//   // alert("Leaving Page Save the data!");
//   console.log("Leaving Page Save the data!");

//   return "Want to Quit ?";
// };
// console.log("After Binding");
document.addEventListener("DOMContentLoaded", function () {
  userData = localStorage.getItem("username");
  cM = localStorage.getItem("module");
  object = JSON.parse(userData);

  var currentConcept = 0;
  var currentChapter = 0;
  var currentNo = 1;
  var currentQuestion = 0;
  var Score = 0;
  var allData = new Object();
  var currentQuiz = 1;

  var handleNextClickWrapper = null;
  var handlePrevClickWrapper = null;

  var nextBtn = document.getElementById("next");
  var prevBtn = document.getElementById("prev");

  getAllData();

  async function getAllData() {
    const username = object.un;

    try {
      const encodedModuleTitle = encodeURIComponent(localStorage.getItem("module"));
      const response = await fetch(
        `/user/get-module-with-chapters/${username}/of/${encodedModuleTitle}/`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // localStorage.setItem("moduleData", JSON.stringify(data));
          allData = data;
          console.log("Got Data for next Module")
          localStorage.setItem("moduleData", JSON.stringify(data))
          currentChapter = data.cChapter;
          currentConcept = data.cConcept;
          currentQuiz = data.cQuiz;

          currentChapter = parseInt(currentQuiz / 3 +1);

          console.log("Current Chapter", currentChapter)
          console.log("Current Concept", currentConcept)
          console.log("Current Quiz", currentQuiz)

          if (currentChapter == 4 && currentQuiz == 9) {
            currentQuiz++;
          }
          console.log("Current Quiz got from DB", currentQuiz);
          currentQuestion = 0;
          Score = 0;
          setChapter_Titles(data);
          setConcepts(data, 1);
          setConceptData(data, currentChapter, currentConcept);
          setupEventHandlers(data);
          // setConceptData(data, 1)
        }
      } else {
        alert(
          `Error fetching user data. inside Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please try again.", error);
    }
  }

  function setChapter_Titles(data) {
    document.getElementById("module-title").textContent = cM;

    const t = document.querySelectorAll("#c-title");
    let chaps = document.querySelectorAll(".chapter");
    const chapterCount = Math.min(data.data.length, t.length); // Assuming data.data is an array

    let arr = Object.keys(data.data);
    start = parseInt(arr[0])
    end = start + 5;
    console.log(arr)
   
    j = 0;
    for (let i = start; i < end; i++) {
      t[j].textContent = data.data[`${arr[j]}`]
        ? data.data[`${arr[j]}`].title
        : "";
        console.log("for loop", i, " ", currentChapter)
      if (i > currentChapter) {
        if (
          chaps[j].classList.contains("unlocked-chapter-class") &&
          !data.data[`${arr[j]}`].isCompleted
        ) {
          chaps[j].classList.remove("unlocked-chapter-class");
          chaps[j].classList.add("locked-chapter-class");
        } else {
          chaps[j].classList.remove("locked-chapter-class");
          chaps[j].classList.add("unlocked-chapter-class");
        }
        // Adjust indexing if necessary
      } else {
        if (chaps[j].classList.contains("locked-chapter-class")) {
          chaps[j].classList.remove("locked-chapter-class");
        }
        chaps[j].classList.add("unlocked-chapter-class");
      }

      j++;
    }
  }

  function setConcepts(data, chapterNo) {
   
    let arr = Object.keys(data.data[`${currentChapter}`].concepts);
    console.log(arr)
    // alert(`Current Concept ${currentConcept}`);

    for (let i = 0; i < arr.length; i++) {
      document.getElementById(`concept-${i + 1}`).textContent = arr[i];

      let d = document.getElementById(`concept-content-${i + 1}`);
      if (i > currentConcept) {
        if (d.classList.contains("unlocked-class")) {
          d.classList.remove("unlocked-class");
          d.classList.add("locked-class");
        }
      } else {
        if (d.classList.contains("locked-class")) {
          d.classList.remove("locked-class");
          d.classList.add("unlocked-class");
        }
        d.classList.add("unlocked-class");
      }
    }

  
  }

  function setConceptData(data, chapterNo, conceptNo) {
    currentConcept = conceptNo;
    console.log("inside setConcept Data", currentChapter)
    let arr = Object.keys(data.data[`${currentChapter}`].concepts);
    console.log(arr)

    let title = arr[currentConcept];

    document.getElementById("concept-title").textContent = `${title} - Fact`;

    let fact =
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .fact;
    document.getElementById("text-content-concept").style.display =
      "block";
    document.getElementById("quiz-div").style.display = "none";
    // document.getElementById("exp").style.visibility = "collapse";

    document.getElementById("text-content-concept").textContent = fact;
    if (currentNo == 0) {
      currentNo = 1;
    }

    // alert("fact");
  }

  function setContent(data, chapterNo, conceptNo, currentNo) {
    console.log(currentChapter);
    let arr = Object.keys(data.data[`${currentChapter}`].concepts);
    let fact =
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .fact;
    let def_exp =
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .definition_explanation;
    let real_w_ex =
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .real_world_example;

    let title = arr[currentConcept];

    switch (currentNo) {
      case 1:
        document.getElementById(
          "concept-title"
        ).textContent = `${title} - Fact`;
        document.getElementById("text-content-concept").textContent = fact;
        break;

      case 2:
        // alert(currentNo)

        document.getElementById(
          "concept-title"
        ).textContent = `${title} - Definition`;
        document.getElementById("text-content-concept").textContent = def_exp;
        break;

      case 3:
        document.getElementById("text-content-concept").style.display =
          "block";
        document.getElementById("quiz-div").style.display = "none";
        // document.getElementById("exp").style.visibility = "collapse";
        document.getElementById(
          "concept-title"
        ).textContent = `${title} - Example`;
        document.getElementById("text-content-concept").textContent = real_w_ex;
        break;

      case 4:
        document.getElementById(
          "concept-title"
        ).textContent = `${title} - Quiz`;
        setQuiz(data, chapterNo, conceptNo, 0);
        break;

      case 5:
        document.getElementById(
          "concept-title"
        ).textContent = `${title} - Quiz`;
        setQuiz(data, chapterNo, conceptNo, 1);
        break;

      case 6:
        console.log(currentChapter)
     
        if (Score >= 2 && currentConcept == 2 ) {
        if(currentChapter == 4){
          updateConceptInDB(data);
          console.log("Updating Chapter");
          updateChapterInDB(data);
          console.log("Updating Module");
          updateModuleInDB(data);
        } else {
          updateConceptInDB(data);
          console.log("Updating Chapter");
          updateChapterInDB(data);
        }
        } else if (Score >= 2) {
          setConcepts(data, currentChapter);
          currentConcept = conceptNo + 1;
          setConceptData(data, currentChapter, conceptNo++);
          updateConceptInDB(data);
        } else {
          document.getElementById("quizModal").style.display = "flex";
          document.getElementById(
            "restartHead"
          ).textContent = `Ohh Snap! ${Score}/2`;
        }

        break;

      default:
        document.getElementById("text-content-concept").textContent = fact;
        break;
    }
  }

  function setQuiz(data, chapterNo, conceptNo, currentQuestion) {
    console.log("Current Concept ", currentConcept);
    // alert(currentQuestion);
    document.getElementById("text-content-concept").style.display =
      "none";
    document.getElementById("quiz-div").style.display = "flex";
    // document.getElementById("exp").style.visibility = "collapse";
    let arr = Object.keys(data.data[`${currentChapter}`].concepts);

    console.log("Current Concept Title", arr[currentConcept]);
    console.log("current Quiz", currentQuiz);
    console.log("current Chapter", currentChapter);

    if (currentChapter == 4 && currentQuiz == 9) {
      currentQuiz = 10;
    }
    if (currentChapter == 3 && currentQuiz == 6) {
      currentQuiz = 7;
    }

    currentQuiz = currentQuiz == 19 ? 22 : currentQuiz;

    let questionsArr = Object.keys(
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .quizzes[`${currentQuiz}`].questions
    );

    console.log(questionsArr);
    const que_text =
      data.data[`${currentChapter}`].concepts[`${arr[currentConcept]}`]
        .quizzes[`${currentQuiz}`].questions[`${questionsArr[currentQuestion]}`]
        .title;

    document.getElementById("question").textContent = que_text;

    // alert(que_text);

    const buttons = Array.from(
      document.getElementsByClassName("option-button")
    );

    // Reset styles for all buttons
    buttons.forEach((button) => {
      button.classList.remove("correct", "incorrect");
    });

    let optionsArrOfKeys =
      data.data[`${currentChapter }`].concepts[`${arr[conceptNo]}`].quizzes[
        `${currentQuiz}`
      ].questions[`${questionsArr[currentQuestion]}`];

    correctAnswer = optionsArrOfKeys["correct_ans"];
    correctIndex = 0;
    let str = "ABCD";
    for (let i = 0; i < 4; i++) {
      buttons[i].textContent = optionsArrOfKeys[`${str[i]}`];
      if (str[i] == correctAnswer) {
        correctIndex = i;
        // alert(`Correct Index : ${correctIndex}`)
      }
    }

    const optionContainer = document.querySelector(".options-section");
    let scoreAdded = false;
    optionContainer.addEventListener("click", (e) => {
      if (e.target && e.target.nodeName == "BUTTON" && !scoreAdded) {
        const buttons = Array.from(
          optionContainer.getElementsByClassName("option-button")
        );
        // Reset styles for all buttons
        buttons.forEach((button) => {
          button.classList.remove("correct", "incorrect");
        });

        // alert(buttons.indexOf(e.target))
        const selectedOptionIndex = buttons.indexOf(e.target);
        // alert(selectedOptionIndex);
        // alert(correctIndex);
        if (selectedOptionIndex == correctIndex) {
          addScore();
          scoreAdded = true;
          console.log("Called ", Score);
          document.querySelector(".score").textContent =
            Score > 9 ? Score : `0${Score}`;
        }

        buttons.forEach((button, index) => {
          if (index == correctIndex) {
            button.classList.add("correct");
          } else {
            button.classList.add("incorrect");
          }
          currentQuestion = currentQuestion == 2 ? 0 : currentQuestion + 1;
        });

        // document.getElementById("exp").style.visibility = "visible";
      }
    });
  }

  function changeConcept(data) {
    document.getElementById("quiz-div").style.display = "none";
    // document.getElementById("exp").style.visibility = "collapse";
    document.getElementById("text-content-concept").style.display =
      "block";

    updateConceptInDB(data);
    setConcepts(data, 1);
    currentConcept++;
    currentQuiz++;
    // console.log("cQuiz in uCIDB", currentQuiz)
    setConceptData(data, currentChapter + 1, currentConcept);
  }

  // Function to get the CSRF token from cookies
  function getCsrfToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      if (cookie.startsWith("csrftoken=")) {
        return cookie.substring("csrftoken=".length);
      }
    }
    return undefined; // Return undefined if the CSRF token isn't found
  }

  // The updated asynchronous function
  async function updateConceptInDB(data) {
    const username = object.un;
    const arr = Object.keys(data.data[`${currentChapter + 1}`].concepts);
    const title = arr[currentConcept];
    const encodedConceptTitle = encodeURIComponent(title);
    const csrfToken = getCsrfToken(); // Get the CSRF token from cookies

    try {
      if (!csrfToken) {
        console.error("CSRF token is not available.");
        alert("CSRF token is missing. Please make sure cookies are enabled.");
        return; // Exit the function if no CSRF token is found
      }

      const response = await fetch(
        `/user/update_concept/${username}/of/${encodedConceptTitle}/`,
        {
          method: "POST", // Specify the method, assuming it's a POST request
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include the CSRF token in the request headers
          },
         
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Concept Updated", responseData);
        // Proceed with your success handling
        Score = 0;
        currentConcept++;
        currentQuiz++;
        currentNo = 0;
        setConcepts(allData, 1);
        setConceptData(allData, currentChapter + 1, currentConcept);
        setupEventHandlers(allData);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(`An error occurred. Please try again. ${error}`);
    }
  }

  async function updateChapterInDB(data) {
    removeEventHandlers();

    const username = object.un;

    let title = data.data[`${currentChapter + 1}`].title;
    console.log(title);

    try {
      const encodedChapterTitle = encodeURIComponent(title);
      const response = await fetch(
        `/user/update_chapter/${username}/of/${encodedChapterTitle}/`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Chapter Updated");

          currentChapter++;
          console.log("Current Chapter ", currentChapter)
          allData = null;
          getAllData();
          console.log("Again!");
        }
      } else {
        alert(
          `Error fetching user data. inside Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please try again.", error);
    }
  }

  async function updateModuleInDB() {
    removeEventHandlers();
    const username = object.un;
    
    const csrfToken = getCsrfToken(); // Get the CSRF token from cookies

    try {
      const encodedModuleTitle = encodeURIComponent(localStorage.getItem("module"));
      if (!csrfToken) {
        console.error("CSRF token is not available.");
        alert("CSRF token is missing. Please make sure cookies are enabled.");
        return; // Exit the function if no CSRF token is found
      }

      const response = await fetch(
        `/user/update_module/${username}/of/${encodedModuleTitle}/`,
        {
          method: "POST", // Specify the method, assuming it's a POST request
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include the CSRF token in the request headers
          },
         
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Module Updated", responseData.success);
        // Proceed with your success handling
        localStorage.setItem("module", responseData.module)
        Score = 0;
        allData = null;
        getAllData();
        currentNo = 0;
        setConcepts(allData, 1);
        setConceptData(allData, currentChapter, currentConcept);
        setupEventHandlers(allData);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(`An error occurred. Please try again. ${error}`);
    }
  }
  function setupEventHandlers(data) {
    // Remove existing listeners to prevent duplicates
    removeEventHandlers();

    // Create a wrapper function for handleNextClick that includes 'data'
    handleNextClickWrapper = () => handleNextClick(data);
    nextBtn.addEventListener("click", handleNextClickWrapper);

    // For handlePrevClick, if it doesn't need data, you can directly reference it
    // But for consistency and potential future changes, wrap it similarly
    handlePrevClickWrapper = () => handlePrevClick(data);
    prevBtn.addEventListener("click", handlePrevClickWrapper);
  }

  function removeEventHandlers() {
    if (handleNextClickWrapper) {
      nextBtn.removeEventListener("click", handleNextClickWrapper);
    }
    if (handlePrevClickWrapper) {
      prevBtn.removeEventListener("click", handlePrevClickWrapper);
    }
  }

  function handleNextClick(data) {
    console.log("Click");
    console.log("Current No ", currentNo);
    currentNo++;
    console.log("Current No after", currentNo);
    setContent(data, currentChapter, currentConcept, currentNo);
    console.log("Current No after all", currentNo);
  }

  function handlePrevClick(data) {
    console.log("Click");
    console.log("Current No ", currentNo);
    if (currentNo > 1) {
      currentNo--;
      setContent(data, currentChapter, currentConcept, currentNo);
      console.log("Current No after", currentNo);
      console.log("Current No after all", currentNo);
    } else {
      currentNo = 1;
      console.log("No Previous");
    }
  }

  function addScore() {
    Score += 1;
    const animationContainer = document.getElementById("animationContainer");
    const scoreText = document.createElement("div");
    scoreText.classList.add("scoreText");
    scoreText.textContent = "Score +1";

    // Adjusting these styles to position the text based on your layout
    scoreText.style.left = "30%";
    scoreText.style.top = "-20%";
    scoreText.style.transform = "translate(-50%, -50%)";

    animationContainer.appendChild(scoreText);

    // Remove the text after the animation ends (2 seconds)
    setTimeout(() => {
      scoreText.remove();
    }, 2000);
  }

  document
    .getElementById("restartConceptBtn")
    .addEventListener("click", (e) => {
      document.getElementById("quizModal").style.display = "none";
      Score = 0;
      console.log("CN", currentNo);

      currentNo = 0;
      console.log("CNaA", currentNo);
      setConcepts(allData, 1);
      setConceptData(allData, currentChapter + 1, currentConcept);
      setupEventHandlers(allData);
    });

  

  // async function updateQuiz(){
  //   try {

  //     const response = await fetch(
  //       `/user/update_quiz/${username}/of/${currentQuiz}/`
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.success) {

  //         console.log("Quiz Updated");
  //       }
  //     } else {
  //       alert(
  //         `Error fetching user data. inside Server responded with status: ${response.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     alert("An error occurred. Please try again.", error);
  //   }
  // }
});

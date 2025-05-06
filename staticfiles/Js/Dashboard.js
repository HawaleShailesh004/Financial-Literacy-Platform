document.addEventListener("DOMContentLoaded", function () {
  userData = localStorage.getItem("username");
  object = JSON.parse(userData);

  fetchUserData();
  console.log("Data Fetched");
  document.getElementById("edit-icon").addEventListener("click", (event) =>{

    window.location.replace("/user/editProfile")
  })

  document.querySelector("#explore-chapters").addEventListener("click", (event) => {
    window.location.replace("/user/module");
  });

 
  var nameP = document.getElementById("profile-userName");
  nameP.textContent = object.fn;

  async function fetchUserData() {
    const username = object.un;

    try {
      const response = await fetch(`/user/get-user-data/${username}`); // Use 'GET' request

      if (response.ok) {
        const data = await response.json(); // Await the parsing of JSON response
        if (data.success) {
          // console.log(data.userData.username); // Use console.log or update the DOM as needed
          // alert(
          //   `${data.userData.username} - ${data.Chapters[1].title} - Exp: ${data.achievements.Experience} - Current Level: ${data.achievements.Level} - ${data.achievements.Badge}`
          // ); // Call displayUserData to update the DOM
          localStorage.setItem("completeData", data);
          localStorage.setItem("module", data.progress.Module.title);
          setData(data);
          setCompletedChapters(data);
        } else {
          alert(
            "Submission was not successful. Please check the data you have entered."
          );
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

  function addChapters(containerId, numberOfChapters, staticPaths) {
    const container = document.getElementById(containerId);

    for (let i = 1; i <= numberOfChapters; i++) {
      const chapterHTML = `
          <div class="chapter" id="chapter-${i}">
              <div class="chapter-content">
                  <img src="${staticPaths.selfpacedImage}" alt="" class="chapter-image">
                  <h5 class="chapter-title">Chapter Title ${i}</h5>
              </div>
              <div class="progress-container">
                  <div class="progress-bar" id="p-bar-${i}"></div>
              </div> 
          </div>
      `;

      // Append the chapterHTML to the container
      container.innerHTML += chapterHTML;
    }
  }

  function setData(data) {
    let exp = document.getElementById("exp-points");
    let cLevel = document.getElementById("current-level");
    let cBadge = document.getElementById("badge");
    let coins = document.getElementById("coins");
    let module_title = document.getElementById("current-module-title");

    exp.textContent = `Exp Points: ${data.achievements.Points}`;
    cLevel.textContent = `Curr Level: ${data.achievements.Level}`;
    cBadge.textContent = `${data.achievements.Badge}`;
    coins.textContent = `Coins: ${data.achievements.Coins}`;

    module_title.textContent = data.progress.Module.title;

    for (let i = 1; i <= data.Chapters.length; i++) {
      title = data.Chapters[i - 1].title;
      title_elem = document.getElementById(`chapter-${i}`);

      title_elem.textContent = title;
    }
  }

  async function setCompletedChapters(data) {
    const username = object.un;
    let module_title = data.progress.Module.title;
    try {
      const encodedModuleTitle = encodeURIComponent(module_title);
      const url = `/user/get-completed-chapters/${username}/of/${encodedModuleTitle}/`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          c = data.completedChapters;
          // alert(c);
          counter = 0;
          chapters = Object.keys(c);
          // alert(chapters)
          
          if (chapters.length > 0) {
            for (let i = 1; i <= 5; i++) {
              if (i == chapters[counter]) {
                p = (c[i] / 5) * 100;
                // alert(`percentage ${p}%`)
                document.getElementById(`p-bar-${i}`).style.width = `${p}%`;
                counter++;
              }else {
                let ele = document.getElementById(`chapter-content-${i}`);
                if (ele.classList.contains("unlocked-class")) {
                  ele.classList.remove("unlocked-class");
                  ele.classList.add("locked-class");
                  document.getElementById(`p-bar-${i}`).style.width = `0%`
                }
              }
            }
          } else {
            // p = (0 / 5) * 100;
            document.getElementById(`p-bar-${1}`).style.width = `0%`
            for (let i = 2; i <= 5; i++) {

                let ele = document.getElementById(`chapter-content-${i}`);
                if (ele.classList.contains("unlocked-class")) {
                  ele.classList.remove("unlocked-class");
                  ele.classList.add("locked-class");
                  document.getElementById(`p-bar-${i}`).style.width = "0";
                }
              }
          }

        } else {
          alert(
            "Submission was not successful. Please check the data you have entered."
          );
        }
      } else {
        alert(
          `Error fetching user data.Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please try again.", error);
    }
  }

let moduleTitles = [];
let chapterTitles = [];
let conceptTitles = [];

// Function to fetch data from the server
function fetchData() {
    fetch('/user/get-curriculum-titles')
    .then(response => response.json())
    .then(data => {
        // The data needs to be parsed because Django serialize returns a JSON string
        moduleTitles = JSON.parse(data.modules).map(item => item.fields.title);
        chapterTitles = JSON.parse(data.chapters).map(item => item.fields.title);
        conceptTitles = JSON.parse(data.concepts).map(item => item.fields.title);

        console.log("Modules:", moduleTitles);
        console.log("Chapters:", chapterTitles);
        console.log("Concepts:", conceptTitles);
        generateCurriculum(moduleTitles, chapterTitles, conceptTitles);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function generateCurriculum(moduleTitles, chapterTitles, conceptTitles) {
  const accordion = document.getElementById("accordion");
  accordion.innerHTML = ''; // Clear existing content

  let chapterIndex = 0;
  let conceptIndex = 0;

  moduleTitles.forEach((moduleTitle, moduleNumber) => {
      let moduleLabel = `Module ${moduleNumber + 1}: ${moduleTitle}`;
      let modDiv = document.createElement("button");
      modDiv.className = "accordion";
      modDiv.innerText = moduleLabel;
      accordion.appendChild(modDiv);
      let panel = document.createElement("div");
      panel.className = "panel";

      for (let j = 0; j < 5; j++) { // Assume each module has 5 chapters
          let chapterLabel = `Chapter ${j + 1}: ${chapterTitles[chapterIndex]}`;
          let chapDiv = document.createElement("button");
          chapDiv.className = "accordion";
          chapDiv.innerText = chapterLabel;
          panel.appendChild(chapDiv);
          let subPanel = document.createElement("div");
          subPanel.className = "panel";

          for (let k = 0; k < 3; k++) { // Assume each chapter has 3 concepts
              let conceptLabel = `Concept ${k + 1}: ${conceptTitles[conceptIndex]}`;
              let conceptP = document.createElement("p");
              conceptP.innerText = conceptLabel;
              subPanel.appendChild(conceptP);
              conceptIndex++;
          }

          chapDiv.addEventListener("click", function() {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
          });
          panel.appendChild(subPanel);
          chapterIndex++;
      }

      modDiv.addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
      });
      accordion.appendChild(panel);
  });
}
document.getElementById("complete-cir").addEventListener("click", (event)=>{
  fetchData()
  
  document.getElementById("curriculumModal").style.display = "block";
})

document.getElementsByClassName("close")[0].onclick = function() {
  document.getElementById("curriculumModal").style.display = "none";
};
});

// Arrays to store the titles


// Call the function to fetch data when needed


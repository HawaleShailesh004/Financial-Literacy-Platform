// initiliazation of Elements
let getStarted = document.querySelector(".main-content-btn");
let takeQuiz = document.querySelector("#takeQuiz") ;
let ctaButton = document.querySelector(".cta-button") ;




getStarted.addEventListener("click", (e)=>{
    window.location.href = 'account/sign-up';
})

ctaButton.addEventListener("click", (e)=>{
    window.location.href = 'account/sign-up';
    // window.open("sign-up", "_self");
});

takeQuiz.addEventListener("click", (e)=>{
    window.location.href = ("account/quiz-welcome");
});




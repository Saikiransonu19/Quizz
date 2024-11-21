
const questions= [
    {
        question : "How many states are there in india?",
        answers: [
            { text : "25", correct:false},
            { text : "28", correct:false},
            { text : "29", correct:true},
            { text : "31", correct:false},
        ]
    },

    {
        question : "which is the biggest country in the world",
        answers: [
            { text : "Russia", correct:true},
            { text : "Canada", correct:false},
            { text : "China", correct:false},
            { text : "United States", correct:false},
        ]
    },

    {
        question : "when was the second world war happended?",
        answers: [
            { text : "1914", correct:false},
            { text : "1941", correct:false},
            { text : "1933", correct:false},
            { text : "1939", correct:true},
        ]
    },
];

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        optionsElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectOption);
    });
}

function selectOption(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(optionsElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    if(score == questions.length){
        questionElement.innerHTML= `greate ! You scored ${score} out of ${questions.length}`;
    }
    else{
        questionElement.innerHTML= `You scored ${score} out of ${questions.length}`;
    }
    nextButton.style.display = "block";
    nextButton.innerHTML="Play again";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function resetState(){
    nextButton.style.display="none";
    while(optionsElement.firstChild)
        optionsElement.removeChild(optionsElement.firstChild);
}
startQuiz();
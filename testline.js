const userName = document.getElementById("userName"),
startScreen = document.querySelector(".startScreen"),
playground = document.querySelector(".playground"),
endScreen = document.querySelector(".endScreen"),
questionCount = document.getElementById("questionCount"),
questionTimer = document.getElementById("questionTimer"),
question = document.getElementById("question"),
quizOptions = document.getElementById("quizOptions"),
quizBody = document.querySelector(".quizBody"),
loader = document.querySelector(".loader"),
finalScore = document.getElementById("finalScore");
finialScore =  document.querySelector(".finalScore"),
goldMedal = document.querySelector(".goldMedal"),
silverMedal = document.querySelector(".silverMedal"),
bronzeMedal = document.querySelector(".bronzeMedal"),
resultUserName = document.getElementById("resultUserName");

let arrayQuestion = [],
questionIndex = 0,
    score = 0,
    count = 10,
    countdown;

    function startQuiz() {
        if(userName.value != "") {
          questionIndex = score = 0;
          startScreen.style.display = "none";
          playground.style.display = "block";
          endScreen.style.display = "none";
          nextButton.innerHTML = "Next";
          quizBody.style.display = "none";
          loader.style.display = "block";

          loadQuestion();
        }
        else{
            userName.style.border = "2px solid red";
        }
    }
   
    let url = "https://opentdb.com/api.php?amount=15&type=multiple";
  
    function loadQuestion(){
       fetch(url)
       .then((response) => response.json())
       .then((data) =>{
        console.log(data);
        arrayQuestion = data.results;
        displayQuestion(arrayQuestion[questionIndex])
       });
    }

function displayQuestion(questionData){
    console.log(questionData);
    count = 10;
    clearInterval(countdown);
    questionCount.innerHTML = questionIndex + 1;
    question.innerHTML = questionData.question;
    loadAnswers(questionData);
}

function loadAnswers(questionData){
   quizOptions.innerHTML = "";
   let answers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
];
console.log(answers);
answers = answers.sort(() => Math.random() -0.5);

answers.forEach((answer) =>{
    let option = document.createElement("li");
    option.innerHTML = answer ;
    option.addEventListener("click",() => {
        checkAnswer(option, answers, questionData.correct_answer)
    });
    quizOptions.append(option);
});

quizBody.style.display = "block";

loader.style.display = "none";
displayTimer();
}

function checkAnswer(answerOptions, answers, correctAnswer){
    //console.log(answerOptions, answers,correctAnswer);
    let correctElement;


    answers.forEach((answer)=> {
        if(htmlDecode(answer) === htmlDecode(correctAnswer)) 
            {
            correctElement = [...quizOptions.childNodes].find(
                (li) => li.innerText === htmlDecode(correctAnswer)
            );
        }
    });
    quizOptions.childNodes.forEach((li) => {
        li.classList.add("disable");
    });

    if(htmlDecode(correctAnswer) === answerOptions.innerText){
        answerOptions.classList.add("correct");
        score++;
    }
    else{
        answerOptions.classList.add("Incorrect");
        correctElement.classList.add("correct");
    }

    //console.log(correctElement);
    clearInterval(countdown);
} 

nextButton.addEventListener("click",()=> {
    questionTimer.innerHTML = "10";

    if(nextButton.innerText=="Next"){
       questionIndex = questionIndex + 1;
       displayQuestion(arrayQuestion[questionIndex]);
    }
    else{
        showAnswer();
    }
     
    if(questionIndex == 14) {
        nextButton.innerText = "Submit";
    }
    
});

function showAnswer(){
    playground.style.display = "none";
    endScreen.style.display  = "block";
    finalScore.textContent = score;
    resultUserName.textContent = userName.value;
    questionCount.innerHTML = 1;
    clearInterval(countdown);
    count = 10;
}

function htmlDecode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const displayTimer = () => {
    countdown = setInterval(() => {
        count--;
        questionTimer.innerHTML = count;

        if (count == 0) {
            clearInterval(countdown);
    
            quizOptions.childNodes.forEach((li) => {
                li.classList.add("disable");
    
            });
        }
    },1000);
};

if (score > 10){
    goldMedal.style.display = "block";
    silverMedal.style.display = "none";
    bronzeMedal.style.display  = "none";
} 
else if(score <10 && score > 5){
    goldMedal.style.display = "none";
    silverMedal.style.display = "none";
    bronzeMedal.style.display  = "block";
}
else{
    goldMedal.style.display = "none";
    silverMedal.style.display = "none";
    bronzeMedal.style.display  = "block"; 
}


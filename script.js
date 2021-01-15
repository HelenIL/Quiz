// Question and Answer Array
var questions = [{
    title: "How did Fry arrive in the future?",
    choices: ["Cryogenics Tube", "Time Machine", "Car", "Worm Hole"],
    answer: "Cryogenics Tube"
},
{
    title: "How many eyes does Leela have?",
    choices: ["Seven", "Two", "One", "Four"],
    answer: "One"
},
{
    title: "What job title does Scruffy hold?",
    choices: ["Pilot", "Staff Doctor", "Bending Unit", "Janitor"],
    answer: "Janitor"
},
{
    title: "Where did the crew travel to on Fry's first mission into space?",
    choices: ["The Moon", "Mars", "Omicron Persei 8", "The Sun"],
    answer: "The Moon"
},
{
    title: "What is Bender's last name?",
    choices: ["Farnsworth", "Rodriguez", "Turanga", "Wong"],
    answer: "Rodriguez"
}
]
// Setting Variables For Functions
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Start Timer
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);
    
    next();
    }
    //Stop Timer And End Game 
function endGame() {
    clearInterval(timer);
    
    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set Score!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
    //Stores Score Local
    function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
    }
    
    
    function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
    //Clears Score And Local Storage Value
    function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    
    resetGame();
    }
    
    //Game Reset
    function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;
    
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    var quizContent = `
    <h1>
        Futurama Quiz!
    </h1>
    <h3>
        Let's Go Already!   
    </h3>
    <button id="btn" onclick="start()"><strong>Start</strong></button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
    
    //Time Decrease For Incorrect Answer
    function incorrect() {
    timeLeft -= 15; 
    next();
    }
    
    //Score Increase
    function correct() {
    score += 20;
    next();
    }
    
    //Question Loop 
    function next() {
    currentQuestion++;
    
    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    
    
    document.getElementById("quizBody").innerHTML = quizContent;
    }
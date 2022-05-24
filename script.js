function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


// Displaying the question
function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "How many children does a binary tree have?", 
        ["2", "0","any number", "1"], "2"
    ),
    new Question(
        "What is a hash table?", 
        ["A structure that maps values to keys", "A structure that maps keys to values", "A structure used for storage", "A structure used to implement stack and queue"], "A structure that maps keys to values"
    ),
    new Question(
        "Which data structure is used to perform recursion?", 
        ["Array", "Binary tree","Queue", "Stack"], "Stack"
        ),
    new Question(
        "A graph in which all nodes are of an equal degree is known as?", 
        ["Multigraph", "Non-regular graph", "Regular graph", "Complete graph"], "Regular graph"
        ),
    new Question(
        "Consider a linked list implementation of a queue with two pointers: front and rear. The time needed to insert element in a queue of length n is?", 
        ["O(1)", "O(log2n)","O(n)", "O(n*log2n)"], "O(1)"
        )
];

// Loop through the array and get the answers
// questions.forEach((answer) => {
//     console.log(answer.choice);
//     let quizAnswers = document.getElementById("quiz-answers");
//     // quizAnswers.innerHTML = questions.text;
// })


// create quiz
let quiz = new Quiz(questions);

// display quiz
displayQuestion();

// Add A CountDown for the Quiz
let time = 1;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        showScores();
    } else {
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    }
},1000);
}

startCountdown();

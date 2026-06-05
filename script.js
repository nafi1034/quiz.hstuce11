// Quiz Questions Data
const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "Python", "C++", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correct: 1
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const timeLeftSpan = document.getElementById('time-left');
const finalScoreSpan = document.getElementById('final-score');
const scoreFeedback = document.getElementById('score-feedback');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});
restartBtn.addEventListener('click', startQuiz);

// Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    switchScreen(quizScreen);
    showQuestion();
}

function switchScreen(screen) {
    [startScreen, quizScreen, resultsScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function showQuestion() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    
    // Update Progress
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    
    // Render Options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timeLeftSpan.innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftSpan.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoRevealCorrectAnswer();
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = optionsContainer.querySelectorAll('.option');
    
    buttons.forEach((button, index) => {
        button.disabled = true; // Disable further clicking
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('wrong');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }
    
    nextBtn.classList.remove('hidden');
}

function autoRevealCorrectAnswer() {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = optionsContainer.querySelectorAll('.option');
    
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add('correct');
        }
    });
    
    nextBtn.classList.remove('hidden');
}

function showResults() {
    switchScreen(resultsScreen);
    finalScoreSpan.innerText = `${score}/${quizData.length}`;
    
    // Custom feedback based on score
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        scoreFeedback.innerText = "Perfect! You're a certified genius.";
    } else if (percentage >= 50) {
        scoreFeedback.innerText = "Good job! Nicely done.";
    } else {
        scoreFeedback.innerText = "Better luck next time! Keep practicing.";
    }
}

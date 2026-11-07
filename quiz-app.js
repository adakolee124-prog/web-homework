// ==========================================================================
// Assignment 5.3: Interactive Multiple-Choice Quiz Controller
// ==========================================================================

// 1. Quiz Question Dataset Array
const quizQuestions = [
    {
        question: "Which HTML tag is used to pair a text description directly with a form input?",
        answers: [
            { text: "<span-input>", correct: false },
            { text: "<label>", correct: true },
            { text: "<caption-box>", correct: false },
            { text: "<title>", correct: false }
        ]
    },
    {
        question: "Which CSS layout property is best for arranging items in a single flexible row or column?",
        answers: [
            { text: "display: flex;", correct: true },
            { text: "position: float;", correct: false },
            { text: "align-content: block;", correct: false },
            { text: "text-wrap: grid;", correct: false }
        ]
    },
    {
        question: "Which JavaScript method saves data permanently inside the user's web browser?",
        answers: [
            { text: "sessionCache.save()", correct: false },
            { text: "document.keepData()", correct: false },
            { text: "localStorage.setItem()", correct: true },
            { text: "window.storeMemory()", correct: false }
        ]
    },
    {
        question: "Which array method creates a brand-new array containing only elements that pass a test?",
        answers: [
            { text: ".reduce()", correct: false },
            { text: ".forEach()", correct: false },
            { text: ".sort()", correct: false },
            { text: ".filter()", correct: true }
        ]
    }
];

// 2. DOM Element Hooks
const activeScreen = document.getElementById("quiz-active-screen");
const resultsScreen = document.getElementById("quiz-results-screen");
const questionCounter = document.getElementById("question-counter");
const liveScoreBadge = document.getElementById("live-score-badge");
const questionTextElement = document.getElementById("question-text");
const answerButtonsGrid = document.getElementById("answer-buttons-grid");
const nextQuestionBtn = document.getElementById("next-question-btn");
const finalScoreMessage = document.getElementById("final-score-message");
const restartQuizBtn = document.getElementById("restart-quiz-btn");

// 3. Quiz State Tracking Variables
let currentQuestionIndex = 0;
let userScore = 0;

// 4. Initialize or Restart Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    liveScoreBadge.innerText = `Score: ${userScore}`;
    
    resultsScreen.classList.add("hidden-element");
    activeScreen.classList.remove("hidden-element");
    nextQuestionBtn.classList.add("hidden-element");
    
    renderQuestion();
}

// 5. Render Current Question & Answer Buttons
function renderQuestion() {
    // Clear previous answer buttons
    answerButtonsGrid.innerHTML = "";
    nextQuestionBtn.classList.add("hidden-element");

    const currentData = quizQuestions[currentQuestionIndex];
    questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    questionTextElement.innerText = currentData.question;

    // Generate choice buttons dynamically
    currentData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("quiz-choice-btn");
        
        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        answerButtonsGrid.appendChild(button);
    });
}

// 6. Handle User Answer Selection
function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct-answer");
        userScore++;
        liveScoreBadge.innerText = `Score: ${userScore}`;
    } else {
        selectedBtn.classList.add("wrong-answer");
    }

    // Highlight the right answer automatically & lock all buttons
    Array.from(answerButtonsGrid.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct-answer");
        }
        button.disabled = true;
    });

    // Reveal Next button
    nextQuestionBtn.classList.remove("hidden-element");
}

// 7. Advance to Next Question or Final Screen
nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        showFinalResults();
    }
});

// 8. Display Final Score Screen
function showFinalResults() {
    activeScreen.classList.add("hidden-element");
    resultsScreen.classList.remove("hidden-element");
    finalScoreMessage.innerText = `You scored ${userScore} out of ${quizQuestions.length}!`;
}

// Attach Restart Handler & Start App
restartQuizBtn.addEventListener("click", startQuiz);
startQuiz();

const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const home = document.getElementById('home');
const questionElement = document.getElementById('question');
const choiceButtons = Array.from(document.getElementsByClassName('choice-btn'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const endScreen = document.getElementById('end');
const finalScoreText = document.getElementById('finalScore');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

const MAX_QUESTIONS = 3;
const CORRECT_BONUS = 10;

startBtn.addEventListener('click', startGame);
choiceButtons.forEach(button => {
    button.addEventListener('click', handleAnswer);
});
restartBtn.addEventListener('click', startGame);
homeBtn.addEventListener('click', () => {
    home.classList.remove('hide');
    endScreen.classList.add('hide');
});

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    home.classList.add('hide');
    quiz.classList.remove('hide');
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        quiz.classList.add('hide');
        endScreen.classList.remove('hide');
        finalScoreText.innerText = score;
        return;
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choiceButtons.forEach(button => {
        const number = button.dataset['number'];
        button.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

function handleAnswer(e) {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.dataset['number'];

    const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
    }

    selectedButton.classList.add(classToApply);

    setTimeout(() => {
        selectedButton.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
}

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

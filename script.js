const startButton = document.getElementById('start-game-btn');
const restartButton = document.getElementById('restart-game-btn');
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const scoreDisplay = document.getElementById('score-display');

let currentQuestionIndex = 0;
let score = 0;

// Questions array
const questions = [
  {
    question: "Siapa yang membacakan teks proklamasi kemerdekaan?",
    answers: ["Mohammad Hatta", "Sutomo", "Soekarno", "Raden Ajeng Kartini"],
    correct: 2,
  },
  {
    question: "Tanggal berapakah Indonesia merdeka?",
    answers: ["17 Agustus 1945", "20 Mei 1945", "10 November 1945", "1 Juni 1945"],
    correct: 0,
  },
  {
    question: "Apa warna bendera Indonesia?",
    answers: ["Merah-Biru", "Merah-Putih", "Putih-Hijau", "Putih-Biru"],
    correct: 1,
  },
];

// Start game
startButton.addEventListener('click', () => {
  introScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadQuestion();
});

// Load question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  answerButtons.forEach((button, index) => {
    button.innerText = currentQuestion.answers[index];
    button.dataset.correct = index === currentQuestion.correct;
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
  });
}

// Handle answer click
answerButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const correct = e.target.dataset.correct === 'true';
    if (correct) {
      score++;
      e.target.classList.add('correct');
    } else {
      e.target.classList.add('wrong');
    }
    answerButtons.forEach((btn) => (btn.disabled = true));
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        endGame();
      }
    }, 1000);
  });
});

// End game
function endGame() {
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreDisplay.innerText = `Skor Anda: ${score} dari ${questions.length}`;
}

// Restart game
restartButton.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add('hidden');
  introScreen.classList.remove('hidden');
});
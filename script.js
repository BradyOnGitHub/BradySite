let questions = [];
let currentIndex = 0;
let score = 0;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => {
    console.error("Error loading questions:", error);
  });

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const endScreenEl = document.getElementById("endScreen");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  resultEl.textContent = "";
  nextBtn.classList.add("hidden");

  choicesEl.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, q.answer));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach(b => b.disabled = true);

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    resultEl.textContent = "Correct!";
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    resultEl.textContent = "Wrong! The answer is " + correctAnswer;
    buttons.forEach(b => {
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
});

function showEndScreen() {
  quizEl.classList.add("hidden");
  progressEl.classList.add("hidden");
  endScreenEl.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  quizEl.classList.remove("hidden");
  progressEl.classList.remove("hidden");
  endScreenEl.classList.add("hidden");
  loadQuestion();
});
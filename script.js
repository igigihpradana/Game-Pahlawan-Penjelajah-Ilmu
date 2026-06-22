// Data soal lengkap 5 level
const levels = [
  {
    title: "Level 1: Hutan Bilangan",
    questions: [
      { question: "Berapa hasil dari 2 + 2?", options: ["3", "4", "5", "6"], answer: 1, explanation:"2 + 2 = 4" },
      { question: "Bilangan genap berikut adalah?", options: ["3", "5", "8", "7"], answer: 2, explanation:"8 adalah bilangan genap" },
      { question: "Berapa hasil dari 10 - 4?", options: ["5", "6", "7", "8"], answer: 1, explanation:"10 - 4 = 6" },
      { question: "Bilangan prima terkecil adalah?", options: ["1", "2", "3", "4"], answer: 1, explanation:"2 adalah bilangan prima terkecil" },
      { question: "Berapa hasil dari 3 x 3?", options: ["6", "7", "8", "9"], answer: 3, explanation:"3 x 3 = 9" },
    ],
  },
  {
    title: "Level 2: Gua Bahasa",
    questions: [
      { question: "Sinonim dari 'besar' adalah?", options: ["Kecil", "Luas", "Gede", "Tinggi"], answer: 1, explanation:"Luas adalah sinonim besar" },
      { question: "Antonim dari 'panjang' adalah?", options: ["Pendek", "Lebar", "Tinggi", "Besar"], answer: 0, explanation:"Pendek adalah antonim panjang" },
      { question: "Huruf vokal dalam kata 'rumah' adalah?", options: ["1", "2", "3", "4"], answer: 1, explanation:"Huruf vokal: u dan a = 2" },
      { question: "Kata baku dari 'aktifitas' adalah?", options: ["Aktifitas", "Aktivitas", "Aktif", "Aktiv"], answer: 1, explanation:"Aktivitas adalah kata baku" },
      { question: "Kata kerja dalam kalimat 'Dia membaca buku' adalah?", options: ["Dia", "Membaca", "Buku", "Kalimat"], answer: 1, explanation:"Membaca adalah kata kerja" },
    ],
  },
  {
    title: "Level 3: Pulau Sains",
    questions: [
      { question: "Berapa jumlah planet di tata surya kita?", options: ["7", "8", "9", "10"], answer: 1, explanation:"Ada 8 planet" },
      { question: "Warna pelangi yang benar adalah?", options: ["Merah, Biru, Hijau", "Merah, Jingga, Kuning, Hijau, Biru, Nila, Ungu", "Hanya Merah dan Biru", "Tidak ada warna"], answer: 1, explanation:"7 warna pelangi" },
      { question: "Hewan yang hidup di air adalah?", options: ["Singa", "Ikan", "Burung", "Gajah"], answer: 1, explanation:"Ikan hidup di air" },
      { question: "Berapa sisi pada segitiga?", options: ["2", "3", "4", "5"], answer: 1, explanation:"Segitiga memiliki 3 sisi" },
      { question: "Tumbuhan membutuhkan apa untuk tumbuh?", options: ["Hanya air", "Air, cahaya, dan nutrisi", "Hanya cahaya", "Hanya nutrisi"], answer: 1, explanation:"Tumbuhan butuh air, cahaya, nutrisi" },
    ],
  },
  {
    title: "Level 4: Benteng Nusantara",
    questions: [
      { question: "Siapa proklamator Indonesia?", options: ["Soekarno saja", "Hatta saja", "Soekarno dan Hatta", "Bung Karno"], answer: 2, explanation:"Soekarno & Hatta proklamator" },
      { question: "Tanggal kemerdekaan Indonesia adalah?", options: ["17 Agustus 1945", "17 Agustus 1944", "17 Agustus 1946", "17 Agustus 1947"], answer: 0, explanation:"17 Agustus 1945" },
      { question: "Berapa banyak pulau di Indonesia?", options: ["Lebih dari 10.000", "Kurang dari 1.000", "Sekitar 5.000", "Sekitar 8.000"], answer: 0, explanation:"Lebih dari 17.000 pulau" },
      { question: "Ibu kota Indonesia adalah?", options: ["Bandung", "Jakarta", "Surabaya", "Medan"], answer: 1, explanation:"Jakarta ibu kota" },
      { question: "Lagu kebangsaan Indonesia adalah?", options: ["Indonesia Raya", "Garuda Pancasila", "Hari Merdeka", "Tanah Airku"], answer: 0, explanation:"Indonesia Raya lagu kebangsaan" },
    ],
  },
  {
    title: "Level 5: Istana Pengetahuan",
    questions: [
      { question: "Berapa hasil dari 25 ÷ 5 + 3?", options: ["5", "8", "10", "13"], answer: 1, explanation:"25 ÷ 5 = 5 + 3 = 8" },
      { question: "Kata yang terdiri dari 4 suku kata adalah?", options: ["Makan", "Buku", "Keluarga", "Rumah"], answer: 2, explanation:"Keluarga = 4 suku kata" },
      { question: "Organ tubuh yang memompa darah adalah?", options: ["Paru-paru", "Jantung", "Hati", "Ginjal"], answer: 1, explanation:"Jantung memompa darah" },
      { question: "Pancasila memiliki berapa sila?", options: ["3", "4", "5", "6"], answer: 2, explanation:"Pancasila punya 5 sila" },
      { question: "Energi terbarukan yang ramah lingkungan adalah?", options: ["Batu bara", "Minyak bumi", "Tenaga surya", "Gas alam"], answer: 2, explanation:"Tenaga surya energi terbarukan" },
    ],
  },
];

// Variabel global
let currentLevel = 0;
let currentQuestion = 0;
let score = 0;
let playerName = "";
let totalQuestions = 0;
let correctAnswers = 0;

// Elemen DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const levelTitleEl = document.getElementById("level-title");
const questionCountEl = document.getElementById("question-count");
const finalScoreEl = document.getElementById("final-score");
const badgeEl = document.getElementById("badge");
const successRateEl = document.getElementById("success-rate");
const finalMessageEl = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");
const viewLeaderboardBtn = document.getElementById("view-leaderboard-btn");
const leaderboardEl = document.getElementById("leaderboard");

// Event listeners
startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("⚠️ Masukkan nama kamu terlebih dahulu!");
    return;
  }
  totalQuestions = levels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
  correctAnswers = 0;
  score = 0;
  scoreEl.textContent = score;

  startScreen.classList.remove("active");
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");

  currentLevel = 0;
  currentQuestion = 0;
  loadLevel();
  displayLeaderboard();
});

restartBtn.addEventListener("click", () => location.reload());

viewLeaderboardBtn.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  startScreen.classList.add("active");
  displayLeaderboard();
});

// Load level
function loadLevel() {
  const level = levels[currentLevel];
  levelTitleEl.textContent = level.title;
  currentQuestion = 0;
  loadQuestion();
}

// Load pertanyaan
function loadQuestion() {
  const level = levels[currentLevel];
  const question = level.questions[currentQuestion];

  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";

  question.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(i));
    optionsEl.appendChild(btn);
  });

  updateProgress();
}

// Check jawaban
function checkAnswer(selected) {
  const level = levels[currentLevel];
  const question = level.questions[currentQuestion];

  // Disable semua tombol
  [...optionsEl.children].forEach(b => b.disabled = true);

  if (selected === question.answer) {
    score += 10;
    correctAnswers++;
    optionsEl.children[selected].style.backgroundColor = "#4caf50";
    optionsEl.children[selected].style.color = "white";
    alert(`✅ Benar! +10 poin\n\n${question.explanation}`);
  } else {
    optionsEl.children[selected].style.backgroundColor = "#f44336";
    optionsEl.children[selected].style.color = "white";
    optionsEl.children[question.answer].style.backgroundColor = "#4caf50";
    optionsEl.children[question.answer].style.color = "white";
    alert(`❌ Salah!\n\n${question.explanation}`);
  }

  scoreEl.textContent = score;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < level.questions.length) {
      loadQuestion();
    } else {
      score += 50; // bonus level selesai
      scoreEl.textContent = score;
      currentLevel++;
      if (currentLevel < levels.length) {
        alert(`🎉 Level selesai! +50 poin bonus!\nLanjut ke level berikutnya.`);
        loadLevel();
      } else {
        endGame();
      }
    }
  }, 1500);
}

// Update progress bar dan teks soal
function updateProgress() {
  const level = levels[currentLevel];
  const progressPercent = ((currentQuestion + 1) / level.questions.length) * 100;
  progressEl.style.width = progressPercent + "%";
  questionCountEl.textContent = `Soal ${currentQuestion + 1} dari ${level.questions.length}`;
}

// Akhiri game, simpan skor dan tampilkan hasil
function endGame() {
  saveScore(playerName, score);

  const successRate = Math.round((correctAnswers / totalQuestions) * 100);

  quizScreen.classList.remove("active");
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultScreen.classList.add("active");

  finalScoreEl.textContent = score;
  badgeEl.textContent = getBadge();
  successRateEl.textContent = successRate + "%";

  if (successRate === 100) {
    finalMessageEl.textContent = `🏆 Selamat ${playerName}! Kamu adalah Legenda Pengetahuan!`;
  } else if (successRate >= 80) {
    finalMessageEl.textContent = `🌟 Kerja bagus ${playerName}! Kamu mengembalikan sebagian besar Kristal Pengetahuan!`;
  } else if (successRate >= 60) {
    finalMessageEl.textContent = `👍 Bagus ${playerName}! Terus belajar dan berlatih!`;
  } else {
    finalMessageEl.textContent = `📚 Jangan menyerah, ${playerName}! Ayo coba lagi untuk jadi Legenda Pengetahuan!`;
  }
}

// Badge berdasarkan skor
function getBadge() {
  if (score >= 300) return "🏆 Legenda Pengetahuan";
  if (score >= 250) return "👑 Master Ilmu";
  if (score >= 200) return "⭐ Ahli";
  if (score >= 150) return "🌟 Penjelajah";
  if (score >= 100) return "🎯 Pemula Bersemangat";
  return "🌱 Pemula";
}

// Simpan skor ke localStorage
function saveScore(name, points) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, points });
  // Urutkan descending
  leaderboard.sort((a, b) => b.points - a.points);
  // Simpan 10 teratas
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Tampilkan leaderboard di halaman awal
function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardEl.innerHTML = "";

  if (leaderboard.length === 0) {
    leaderboardEl.innerHTML = "<li>Belum ada skor.</li>";
    return;
  }

  leaderboard.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="rank">${index + 1}</span> <span>${entry.name}</span> <span class="score">${entry.points} pt</span>`;
    leaderboardEl.appendChild(li);
  });
}

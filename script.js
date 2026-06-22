// Database Soal Kompleks dengan Pengelompokan Topik / Kompetensi Dasar
const questions = [
  {
    question: "Siapa tokoh yang membacakan teks proklamasi kemerdekaan Indonesia?",
    answers: ["Mohammad Hatta", "Sutomo", "Soekarno", "Raden Ajeng Kartini"],
    correct: 2,
    topic: "Tokoh Proklamasi"
  },
  {
    question: "Tanggal berapakah Indonesia secara resmi memproklamasikan kemerdekaan?",
    answers: ["17 Agustus 1945", "20 Mei 1945", "10 November 1945", "1 Juni 1945"],
    correct: 0,
    topic: "Peristiwa Sejarah"
  },
  {
    question: "Apa warna bendera kebangsaan Negara Kesatuan Republik Indonesia?",
    answers: ["Merah-Biru", "Merah-Putih", "Putih-Hijau", "Putih-Biru"],
    correct: 1,
    topic: "Simbol Negara"
  },
  {
    question: "Lagu Kebangsaan Indonesia Raya diciptakan oleh komponis nasional yaitu...",
    answers: ["Ismail Marzuki", "Ibu Sud", "Kusbini", "W.R. Supratman"],
    correct: 3,
    topic: "Simbol Negara"
  },
  {
    question: "Rumusan Pancasila sebagai dasar negara disahkan secara konstitusional pada tanggal...",
    answers: ["1 Juni 1945", "22 Juni 1945", "17 Agustus 1945", "18 Agustus 1945"],
    correct: 3,
    topic: "Peristiwa Sejarah"
  }
];

// State Aplikasi Game
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let sessionLog = []; // Menyimpan riwayat jawaban detail siswa untuk dianalisis

// Sinkronisasi Selektor DOM Berdasarkan HTML
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const levelTitle = document.getElementById('level-title');
const progressBar = document.getElementById('progress');
const questionCountText = document.getElementById('question-count');

// Inisialisasi Aplikasi Saat Memuat Halaman
document.addEventListener("DOMContentLoaded", () => {
  renderLeaderboard();
});

// Sistem Navigasi Antar Halaman/Screen secara Mulus
function changeScreen(fromScreen, toScreen) {
  fromScreen.classList.add('hidden');
  fromScreen.classList.remove('active');
  toScreen.classList.remove('hidden');
  toScreen.classList.add('active');
}

// Mulai Petualangan Game
startBtn.addEventListener('click', () => {
  const nameInput = document.getElementById('player-name').value.trim();
  if (!nameInput) {
    alert("Silakan masukkan nama kamu terlebih dahulu!");
    return;
  }
  playerName = nameInput;
  currentQuestionIndex = 0;
  score = 0;
  sessionLog = [];
  
  changeScreen(startScreen, quizScreen);
  loadQuestion();
});

// Memuat Data Soal Aktif ke Layar
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  
  // Set UI Header & Progress bar
  levelTitle.innerText = `Topik: ${currentQuestion.topic}`;
  scoreDisplay.innerText = score;
  
  const currentProgress = Math.round((currentQuestionIndex / questions.length) * 100);
  progressBar.style.width = `${currentProgress}%`;
  progressBar.innerText = `${currentProgress}%`;
  questionCountText.innerText = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
  
  // Set Teks Pertanyaan
  questionElement.innerText = currentQuestion.question;
  
  // Render Opsi Jawaban secara Dinamis
  optionsContainer.innerHTML = '';
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('option-btn');
    button.addEventListener('click', () => handleAnswerSelection(index, button));
    optionsContainer.appendChild(button);
  });
}

// Pengendali Klik Opsi Jawaban (Alur gameplay dibikin anti-flicker & responsif)
function handleAnswerSelection(selectedIndex, clickedButton) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correct;
  const isCorrect = (selectedIndex === correctIndex);
  
  // Menonaktifkan semua tombol pilihan agar siswa tidak bisa double-click klik saat animasi jeda
  const allButtons = optionsContainer.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);
  
  // Logging data jawaban siswa secara lengkap demi fitur Analisis
  sessionLog.push({
    question: currentQuestion.question,
    topic: currentQuestion.topic,
    userAnswer: currentQuestion.answers[selectedIndex],
    correctAnswer: currentQuestion.answers[correctIndex],
    isCorrect: isCorrect
  });

  // Feedback Visual Instan
  if (isCorrect) {
    score += 20; // Bobot skor per soal
    clickedButton.classList.add('correct');
  } else {
    clickedButton.classList.add('wrong');
    allButtons[correctIndex].classList.add('correct'); // Tunjukkan jawaban yang benar
  }
  
  // Memberikan jeda 1.2 detik agar siswa memahami kesalahannya sebelum lanjut otomatis
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      finishGame();
    }
  }, 1200);
}

// Menyelesaikan Game & Melakukan Kalkulasi Dashboard Guru-Siswa
function finishGame() {
  // Update Bar Kuis ke Status Maksimal 100%
  progressBar.style.width = '100%';
  progressBar.innerText = '100%';
  
  saveLeaderboard(playerName, score);
  
  // Olah Informasi Ringkasan
  const successRate = Math.round((sessionLog.filter(item => item.isCorrect).length / questions.length) * 100);
  let badge = "Pemula";
  let message = "Jangan menyerah, teruslah membaca dan belajar kembali!";
  
  if (successRate >= 80) {
    badge = "Pahlawan Utama";
    message = "Luar biasa! Kamu menguasai materi sejarah bangsa dengan sangat baik.";
  } else if (successRate >= 60) {
    badge = "Penjelajah Ulung";
    message = "Kerja bagus! Tingkatkan lagi belajarmu untuk mencapai hasil sempurna.";
  }
  
  // Tampilkan Informasi Statistik Utama
  document.getElementById('player-display').innerText = playerName;
  document.getElementById('final-score').innerText = score;
  document.getElementById('badge').innerText = badge;
  document.getElementById('success-rate').innerText = `${successRate}%`;
  document.getElementById('final-message').innerText = message;
  
  // Jalankan Generator Fitur Tambahan (Analisis Siswa & Refleksi Guru)
  generateStudentAnalysis();
  generateTeacherReflection();
  
  // Pindah ke halaman hasil kuis
  changeScreen(quizScreen, resultScreen);
}

// ==========================================
// FITUR TAMBAHAN: REKOMENDASI & DIAGNOSIS EVALUASI
// ==========================================

// 1. Pembuat Ulasan Detail Hasil Jawaban Siswa
function generateStudentAnalysis() {
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = ''; // Reset penampung data lama
  
  sessionLog.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('review-item', item.isCorrect ? 'correct-item' : 'wrong-item');
    
    itemDiv.innerHTML = `
      <p class="review-q">${index + 1}. ${item.question}</p>
      <p class="review-a">
        👉 Jawaban Kamu: <strong>${item.userAnswer}</strong> 
        ${item.isCorrect ? '✅ (Benar)' : `<br>❌ Salah, yang benar: <strong>${item.correctAnswer}</strong>`}
      </p>
    `;
    reviewList.appendChild(itemDiv);
  });
}

// 2. Pembuat Matriks Refleksi Guru Berdasarkan Penguasaan Topik / Kompetensi
function generateTeacherReflection() {
  const topicMatrix = document.getElementById('topic-matrix');
  const adviceElement = document.getElementById('pedagogical-advice');
  topicMatrix.innerHTML = '';
  
  // Klasifikasi data berdasarkan klaster nama topik materi
  const topicStats = {};
  sessionLog.forEach(item => {
    if (!topicStats[item.topic]) {
      topicStats[item.topic] = { total: 0, correct: 0 };
    }
    topicStats[item.topic].total++;
    if (item.isCorrect) topicStats[item.topic].correct++;
  });
  
  let weakTopics = [];
  let strongTopics = [];
  
  // Hitung tingkat pemahaman persentase per topik pelajaran
  for (const topic in topicStats) {
    const data = topicStats[topic];
    const percentage = Math.round((data.correct / data.total) * 100);
    
    let statusClass = "status-remedial";
    let statusText = "Remedial Needed";
    
    if (percentage >= 80) {
      statusClass = "status-mastered";
      statusText = "Tuntas Tuntas";
      strongTopics.push(topic);
    } else {
      if (percentage >= 50) {
        statusClass = "status-review";
        statusText = "Butuh Penguatan";
      }
      weakTopics.push(topic);
    }
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="text-align: left; font-weight: bold;">${topic}</td>
      <td>${data.correct}/${data.total} (${percentage}%)</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
    topicMatrix.appendChild(row);
  }
  
  // Pengolah Logika Rekomendasi Pedagogis Guru Otomatis (Rapor Refleksi)
  let adviceText = "";
  if (weakTopics.length === 0) {
    adviceText = `Siswa atas nama <strong>${playerName}</strong> telah menuntaskan seluruh materi dengan pencapaian sempurna. Guru disarankan memberikan materi pengayaan tingkat lanjut (Higher Order Thinking Skills/HOTS) pada kompetensi ${strongTopics.join(', ')}.`;
  } else if (strongTopics.length === 0) {
    adviceText = `Siswa atas nama <strong>${playerName}</strong> mengalami kendala pemahaman yang cukup sistemik di seluruh bidang materi. Guru perlu melakukan pendekatan konseling atau asistensi tatap muka *one-on-one* serta merancang ulang metode penyampaian kelas interaktif.`;
  } else {
    adviceText = `Siswa atas nama <strong>${playerName}</strong> menunjukkan penguasaan yang kokoh pada topik <strong>${strongTopics.join(', ')}</strong>. Namun, guru direkomendasikan memberikan bimbingan remedial terfokus atau tugas pendalaman mandiri pada topik: <span style="color: #dc3545; font-weight: bold;">${weakTopics.join(', ')}</span>.`;
  }
  adviceElement.innerHTML = adviceText;
}

// Sistem Kontrol Pengganti Tab Menu Hasil Akhir
window.switchTab = function(tabId) {
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
};

// ==========================================
// MANAJEMEN SKOR TERTINGGI (LOCAL STORAGE)
// ==========================================
function saveLeaderboard(name, finalScore) {
  let leaderboard = JSON.parse(localStorage.getItem('quiz_leaderboard')) || [];
  leaderboard.push({ name: name, score: finalScore, date: new Date().toLocaleDateString() });
  
  // Sortir dari skor tertinggi ke terkecil, batasi maksimal hanya tampilkan 5 besar
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  
  localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));
  renderLeaderboard();
}

function renderLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard');
  if (!leaderboardList) return;
  
  const leaderboard = JSON.parse(localStorage.getItem('quiz_leaderboard')) || [];
  leaderboardList.innerHTML = '';
  
  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = `<li style="justify-content: center; color: #666;">Belum ada pencatatan skor. Jadilah yang pertama!</li>`;
    return;
  }
  
  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="rank">${index + 1}</span>
        <span>${entry.name}</span>
      </div>
      <span class="score">${entry.score} Pts</span>
    `;
    leaderboardList.appendChild(li);
  });
}

// Event Listener Tombol Navigasi Keluar / Pengulangan
restartBtn.addEventListener('click', () => {
  document.getElementById('player-name').value = "";
  changeScreen(resultScreen, quizScreen);
  currentQuestionIndex = 0;
  score = 0;
  sessionLog = [];
  loadQuestion();
});

viewLeaderboardBtn.addEventListener('click', () => {
  document.getElementById('player-name').value = "";
  changeScreen(resultScreen, startScreen);
});

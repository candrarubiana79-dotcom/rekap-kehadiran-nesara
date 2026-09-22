// auth-guard.js
const WAKTU_INAKTIF = 2 * 60 * 60 * 1000; // 2 Jam

function catatAktivitas() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    localStorage.setItem("lastActivity", Date.now().toString());
  }
}

function cekStatusAktivitas() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const lastActivity = parseInt(localStorage.getItem("lastActivity") || "0", 10);
  const sekarang = Date.now();

  // Jika belum login
  if (!isLoggedIn) {
    window.location.href = "imput.html";
    return;
  }

  // Jika sudah lebih dari 2 jam diam
  if (lastActivity > 0 && (sekarang - lastActivity > WAKTU_INAKTIF)) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastActivity");
    alert("Sesi kamu telah berakhir karena tidak ada aktivitas selama 2 jam.");
    window.location.href = "imput.html";
  }
}

// Cek langsung saat halaman dibuka
cekStatusAktivitas();

// Pantau aktivitas pengguna
['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, catatAktivitas, { passive: true });
});

// Cek rutin tiap 1 menit
setInterval(cekStatusAktivitas, 60000);

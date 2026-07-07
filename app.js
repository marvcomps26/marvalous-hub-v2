document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  setTimeout(() => {
    if (splash) splash.classList.add("hide");
  }, 2400);
});
// DAILY CODE POPUP

function showDailyCode() {
  document.getElementById("dailyCodePopup").classList.add("show");
}

function closeDailyCode() {
  document.getElementById("dailyCodePopup").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".gold-button");

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      showDailyCode();
    });
  }
});
// AUTO DAILY CODE - CHANGES EVERY DAY AT 9AM UK TIME

function getDailyCodeDateKey(){
  const now = new Date();

  // UK time offset handling using Europe/London
  const ukNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));

  // If before 9am, keep yesterday's code
  if (ukNow.getHours() < 9) {
    ukNow.setDate(ukNow.getDate() - 1);
  }

  return ukNow.toISOString().slice(0, 10);
}

function generateDailyCode(){
  const words = [
    "MARV", "ICE", "LUCKY", "ELITE", "WIN", "VAULT",
    "GOLD", "BONUS", "ARCTIC", "PRIZE", "CASH", "VIP",
    "FROST", "SPIN", "MEGA", "POWER"
  ];

  const key = getDailyCodeDateKey();
  let seed = 0;

  for (let i = 0; i < key.length; i++) {
    seed += key.charCodeAt(i) * (i + 1);
  }

  const word = words[seed % words.length];
  const day = key.slice(-2);

  return word + day;
}

function setDailyCode(){
  const codeBox = document.getElementById("dailyCodeText");
  if (codeBox) {
    codeBox.textContent = generateDailyCode();
  }
}

document.addEventListener("DOMContentLoaded", setDailyCode);

const drawDate = new Date("2026-07-12T19:00:00+01:00").getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = drawDate - now;

  if(distance <= 0){
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-mins").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((distance / (1000 * 60)) % 60);

  document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

function toggleIphoneSteps(){
  document.getElementById("iphoneSteps").classList.toggle("show");
}
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");
  if (!installBtn) return;

  installBtn.style.display = "flex";

  installBtn.addEventListener("click", async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.style.display = "none";
  });
});

window.addEventListener("appinstalled", () => {
  const installBtn = document.getElementById("installBtn");
  if (installBtn) installBtn.style.display = "none";
});

if (window.matchMedia("(display-mode: standalone)").matches) {
  const installBtn = document.getElementById("installBtn");
  if (installBtn) installBtn.style.display = "none";
}

async function turnOnNotifications(){
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  OneSignalDeferred.push(async function(OneSignal) {
    try {
      await OneSignal.Slidedown.promptPush();
    } catch(e) {
      alert("Alerts are still loading. Please refresh and try again.");
    }
  });
}
setTimeout(() => {
  turnOnNotifications();
}, 3000);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./onesignalsdkworker.js")
    .then(() => console.log("OneSignal worker registered"))
    .catch(err => console.log("OneSignal worker error", err));
}

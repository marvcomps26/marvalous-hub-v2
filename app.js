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
// DAILY CODE FROM GOOGLE SHEET

const SETTINGS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlaiXI-x0C_wLvxmELI21rTu9uFR87MYtx9gqV_z_Z3hZ5nOCQBnb9No6i9MtZyqBD3c9wTo1tmz6x/pub?output=csv";

function csvSplit(row){
  const matched = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  return matched ? matched.map(v => v.replace(/^"|"$/g, "").trim()) : [];
}

async function setDailyCode(){
  const codeBox = document.getElementById("dailyCodeText");
  if (!codeBox) return;

  try{
    const res = await fetch(SETTINGS_CSV_URL + "&t=" + Date.now(), {
      cache: "no-store"
    });

    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);

    const row = csvSplit(lines[0]);
    codeBox.textContent = row[1].toUpperCase();

  } catch(err){
    codeBox.textContent = "Code unavailable";
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", setDailyCode);
async function setTickerText(){
  try{
    const res = await fetch(SETTINGS_CSV_URL + "&t=" + Date.now(), {
      cache: "no-store"
    });

    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);

    const row = csvSplit(lines[1]);
    const tickerText = row[1];

    if(!tickerText) return;

    document.querySelectorAll(".ticker-track span").forEach(span=>{
      span.textContent = tickerText;
    });

  }catch(err){
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", setTickerText);
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
function openLeagueForm(){
  document.getElementById("leagueModal").style.display = "flex";
}

function closeLeagueForm(){
  document.getElementById("leagueModal").style.display = "none";
}

function submitLeagueSignup(){
  const name = document.getElementById("leagueName").value.trim();
  const email = document.getElementById("leagueEmail").value.trim();
  const status = document.getElementById("leagueStatus");

  if(!name || !email){
    alert("Please enter your name and email.");
    return;
  }

  status.textContent = "Sending...";

  fetch("https://script.google.com/macros/s/AKfycbwqv0mOcwHVa2AaGzvwMLjw-nqV4LonCg3-MXpDcgcMbhmw2ORo4JmO8JiCxXZkBScC/exec", {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      type: "leagueSignup",
      name: name,
      email: email
    })
  }).then(() => {
    status.textContent = "Request sent! We’ll add you shortly 💜";
    document.getElementById("leagueSubmitBtn").style.display = "none";
    document.getElementById("leagueCloseBtn").textContent = "Close";
  }).catch(() => {
    status.textContent = "Something went wrong. Please try again.";
  });
}
(function startTicker() {
  const track = document.querySelector(".ticker-track");
  const firstGroup = document.querySelector(".ticker-group");

  if (!track || !firstGroup) return;

  let position = 0;
  let groupWidth = 0;
  let lastTime = performance.now();

  function measureTicker() {
    groupWidth = firstGroup.getBoundingClientRect().width;
  }

  function moveTicker(currentTime) {
    const elapsed = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;

    position -= 18 * elapsed;

    if (groupWidth && position <= -groupWidth) {
      position += groupWidth;
    }

    track.style.transform = `translate3d(${position}px, 0, 0)`;

    requestAnimationFrame(moveTicker);
  }

  window.addEventListener("resize", measureTicker);

  requestAnimationFrame(() => {
    measureTicker();
    requestAnimationFrame(moveTicker);
  });
})();

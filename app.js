document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  setTimeout(() => {
    if (splash) splash.classList.add("hide");
  }, 2100);
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

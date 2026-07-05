// Marvalous App V2

function openTab(tabId, btn){
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  if(btn){
    btn.classList.add("active");
  }

  window.scrollTo({top:0, behavior:"smooth"});
}

setTimeout(() => {
  const splash = document.getElementById("splash");
  if(splash){
    splash.style.display = "none";
  }
}, 1500);

const nextDrawDate = new Date("2026-07-12T18:00:00+01:00");
const facebookLiveUrl = "https://www.facebook.com/share/1BVvdYFSW6/";

function updateCountdown(){
  const now = new Date();
  const diff = nextDrawDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secsEl = document.getElementById("secs");

  const liveTitle = document.getElementById("liveTitle");
  const liveMessage = document.getElementById("liveMessage");
  const livePill = document.getElementById("livePill");
  const liveAction = document.getElementById("liveAction");

  if(diff <= 0){
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minsEl.textContent = "0";
    secsEl.textContent = "0";

    liveTitle.textContent = "Facebook Live Starts Soon";
    liveMessage.textContent = "Ticket sales are closed. Join Dave and Mark live on Facebook at 7pm.";
    livePill.textContent = "Live Soon";
    livePill.classList.add("live-now");
    liveAction.textContent = "Watch Facebook Live";
    liveAction.href = facebookLiveUrl;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minsEl.textContent = mins;
  secsEl.textContent = secs;

  liveTitle.textContent = "Next Live Draw";
  liveMessage.textContent = "Ticket sales close at 6pm. Live draw starts on Facebook at 7pm.";
  livePill.textContent = "Upcoming";
  liveAction.textContent = "View Competitions";
  liveAction.href = "https://www.marvalouscompetitions.co.uk";
}

updateCountdown();
setInterval(updateCountdown, 1000);

let deferredPrompt;

window.addEventListener("beforeinstallprompt", function(e){
  e.preventDefault();
  deferredPrompt = e;
});

const installBtn = document.getElementById("installButton");

if(installBtn){
  installBtn.addEventListener("click", function(e){
    e.preventDefault();

    if(deferredPrompt){
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
      });
    } else {
      alert("To install the app, tap your browser menu and choose Add to Home Screen.");
    }
  });
}

async function turnOnNotifications(){
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  OneSignalDeferred.push(async function(OneSignal) {
    try {
      await OneSignal.Notifications.requestPermission();

      if (OneSignal.Notifications.permission) {
        alert("Marvalous alerts are switched on 🔔");
      } else {
        alert("Notifications were not switched on. Tap Allow when asked.");
      }
    } catch(e) {
      alert("Alerts are still loading. Try again in a moment.");
    }
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./onesignalsdkworker.js")
    .catch(err => console.log("Service worker error", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  setTimeout(() => {
    if (splash) splash.classList.add("hide");
  }, 1100);
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

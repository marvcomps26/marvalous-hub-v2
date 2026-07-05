document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  setTimeout(() => {
    if (splash) {
      splash.style.opacity = "0";
      splash.style.pointerEvents = "none";
    }
  }, 1200);

  setTimeout(() => {
    if (splash) {
      splash.style.display = "none";
    }
  }, 1700);
});

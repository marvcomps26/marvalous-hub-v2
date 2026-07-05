document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  setTimeout(() => {
    if (splash) splash.classList.add("hide");
  }, 1100);
});


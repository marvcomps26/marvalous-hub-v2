function loadPage(url){
  document.getElementById("appFrame").src = url;
}

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
}, 1200);

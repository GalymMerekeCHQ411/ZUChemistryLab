document.getElementById("homeBtn").onclick = () => showSection("homeSection");
document.getElementById("calcBtn").onclick = () => showSection("calcSection");
document.getElementById("expBtn").onclick = () => showSection("expSection");
document.getElementById("reactBtn").onclick = () => showSection("reactSection");

function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Эксперименты
function playExperiment(num) {
  const videoPlayer = document.getElementById("videoPlayer");
  const video = document.getElementById("expVideo");
  const title = document.getElementById("expTitle");
  const reaction = document.getElementById("expReaction");

  title.textContent = "Эксперимент " + num;
  video.src = "experiment" + num + ".mp4"; // Подставь видеофайлы
  reaction.textContent = "Реакция #" + num;
  videoPlayer.classList.remove("hidden");
}

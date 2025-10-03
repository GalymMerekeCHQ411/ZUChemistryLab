function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";

  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

// Эксперименты
const experiments = {
  1: { title: "Горение магния", video: "videos/mg_fire.mp4", reaction: "2Mg + O2 → 2MgO" },
  2: { title: "Натрий и вода", video: "videos/na_water.mp4", reaction: "2Na + 2H2O → 2NaOH + H2" },
  3: { title: "Гашение извести", video: "videos/caoh2.mp4", reaction: "CaO + H2O → Ca(OH)2" },
  4: { title: "Разложение H2O2", video: "videos/h2o2.mp4", reaction: "2H2O2 → 2H2O + O2" },
  5: { title: "AgNO3 + NaCl", video: "videos/agcl.mp4", reaction: "AgNO3 + NaCl → AgCl + NaNO3" },
  6: { title: "Горение серы", video: "videos/s_fire.mp4", reaction: "S + O2 → SO2" },
  7: { title: "Горение углерода", video: "videos/c_fire.mp4", reaction: "C + O2 → CO2" },
  8: { title: "Fe + S", video: "videos/fes.mp4", reaction: "Fe + S → FeS" },
  9: { title: "Разложение CaCO3", video: "videos/caco3.mp4", reaction: "CaCO3 → CaO + CO2" },
  10: { title: "Фейерверк", video: "videos/kno3.mp4", reaction: "2KNO3 → 2KNO2 + O2" }
};

function openExperiment(num) {
  const exp = experiments[num];
  document.getElementById("experimentTitle").innerText = exp.title;
  document.getElementById("experimentSource").src = exp.video;
  document.getElementById("experimentVideo").load();
  document.getElementById("experimentReaction").innerText = exp.reaction;
  document.getElementById("experimentModal").style.display = "block";
}

function closeExperiment() {
  document.getElementById("experimentModal").style.display = "none";
  document.getElementById("experimentVideo").pause();
}

const reactionsDB = {
  "H2 + O2": "2H2 + O2 → 2H2O",
  "Na + Cl2": "2Na + Cl2 → 2NaCl",
  "CaCO3": "CaCO3 → CaO + CO2",
  "Fe + O2": "4Fe + 3O2 → 2Fe2O3"
};

function findReaction() {
  let input = document.getElementById("reactionInput").value.trim();
  let result = reactionsDB[input];
  document.getElementById("reactionResult").innerText = result || "Реакция не найдена в базе.";
}

document.getElementById("reactionInput").addEventListener("keydown", e => {
  if (e.key === "Enter") findReaction();
});

const reactionsDB = [
  { reactants: ["H2", "O2"], products: ["H2O"] },
  { reactants: ["Na", "Cl2"], products: ["NaCl"] },
  { reactants: ["CaCO3"], products: ["CaO", "CO2"] },
  { reactants: ["Fe", "O2"], products: ["Fe2O3"] },
  { reactants: ["C", "O2"], products: ["CO2"] },
  { reactants: ["CH4", "O2"], products: ["CO2", "H2O"] },
  { reactants: ["Mg", "HCl"], products: ["MgCl2", "H2"] }
];

function findReaction() {
  const input = document.getElementById("reactionInput").value.trim();
  const reagents = input.split("+").map(s => s.trim());
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  let found = reactionsDB.filter(r => reagents.every(reag => r.reactants.includes(reag)));

  if (found.length > 0) {
    found.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r.reactants.join(" + ") + " → " + r.products.join(" + ");
      li.onclick = () => {
        document.getElementById("reactionResult").innerText = li.textContent;
      };
      suggestions.appendChild(li);
    });
  } else {
    document.getElementById("reactionResult").innerText = "Реакция не найдена.";
  }
}

document.getElementById("reactionInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    findReaction();
  }
});

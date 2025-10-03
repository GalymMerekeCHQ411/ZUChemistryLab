const reactionDatabase = [
  // Горение
  { reactants: ["CH4", "O2"], products: ["CO2", "H2O"] },
  { reactants: ["C2H6", "O2"], products: ["CO2", "H2O"] },
  { reactants: ["C3H8", "O2"], products: ["CO2", "H2O"] },
  { reactants: ["C", "O2"], products: ["CO2"] },
  { reactants: ["CO", "O2"], products: ["CO2"] },

  // Металлы + кислород
  { reactants: ["Fe", "O2"], products: ["Fe2O3"] },
  { reactants: ["Mg", "O2"], products: ["MgO"] },
  { reactants: ["Al", "O2"], products: ["Al2O3"] },
  { reactants: ["Na", "O2"], products: ["Na2O"] },
  { reactants: ["K", "O2"], products: ["K2O"] },

  // Металлы + галогены
  { reactants: ["Na", "Cl2"], products: ["NaCl"] },
  { reactants: ["K", "Cl2"], products: ["KCl"] },
  { reactants: ["Fe", "Cl2"], products: ["FeCl3"] },
  { reactants: ["Cu", "Cl2"], products: ["CuCl2"] },

  // Основания
  { reactants: ["CaO", "H2O"], products: ["Ca(OH)2"] },
  { reactants: ["Na2O", "H2O"], products: ["NaOH"] },
  { reactants: ["K2O", "H2O"], products: ["KOH"] },

  // Кислоты
  { reactants: ["SO3", "H2O"], products: ["H2SO4"] },
  { reactants: ["CO2", "H2O"], products: ["H2CO3"] },
  { reactants: ["P2O5", "H2O"], products: ["H3PO4"] },
  { reactants: ["N2O5", "H2O"], products: ["HNO3"] },

  // Нейтрализация
  { reactants: ["HCl", "NaOH"], products: ["NaCl", "H2O"] },
  { reactants: ["H2SO4", "KOH"], products: ["K2SO4", "H2O"] },
  { reactants: ["HNO3", "Ca(OH)2"], products: ["Ca(NO3)2", "H2O"] },

  // Осаждение (ионы)
  { reactants: ["AgNO3", "NaCl"], products: ["AgCl", "NaNO3"] },
  { reactants: ["BaCl2", "Na2SO4"], products: ["BaSO4", "NaCl"] },
  { reactants: ["Pb(NO3)2", "KI"], products: ["PbI2", "KNO3"] },

  // Восстановление / Окисление
  { reactants: ["Zn", "HCl"], products: ["ZnCl2", "H2"] },
  { reactants: ["Fe", "H2SO4"], products: ["FeSO4", "H2"] },
  { reactants: ["Al", "HCl"], products: ["AlCl3", "H2"] },
  { reactants: ["Mg", "H2SO4"], products: ["MgSO4", "H2"] }
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
      li.textContent = `${r.reactants.join(" + ")} → ${r.products.join(" + ")}`;
      li.onclick = () => {
        document.getElementById("reactionResult").innerText = li.textContent;
      };
      suggestions.appendChild(li);
    });
  } else {
    document.getElementById("reactionResult").innerText = "Реакция не найдена.";
  }
}

// Обработка только Enter
document.getElementById("reactionInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    findReaction();
  }
});

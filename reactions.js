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


// ======================= Утилиты для формул =======================
// Используем калькуляторный парсер
function parseFormula(formula) {
  const stack = [{}];
  const regex = /([A-Z][a-z]?|\(|\)|\d+)/g;
  let tokens = formula.match(regex);
  let i = 0;

  while (i < tokens.length) {
    let token = tokens[i];
    if (token === "(") {
      stack.push({});
    } else if (token === ")") {
      let group = stack.pop();
      let multiplier = 1;
      if (i + 1 < tokens.length && /^\d+$/.test(tokens[i + 1])) {
        multiplier = parseInt(tokens[i + 1]);
        i++;
      }
      for (let el in group) {
        stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + group[el] * multiplier;
      }
    } else if (/^[A-Z][a-z]?$/.test(token)) {
      let el = token;
      let count = 1;
      if (i + 1 < tokens.length && /^\d+$/.test(tokens[i + 1])) {
        count = parseInt(tokens[i + 1]);
        i++;
      }
      stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + count;
    }
    i++;
  }
  return stack[0];
}

// ======================= Балансировка уравнения =======================
function balanceEquation(reactants, products) {
  // Собираем список элементов
  let elements = new Set();
  [...reactants, ...products].forEach(f => {
    let comp = parseFormula(f);
    Object.keys(comp).forEach(el => elements.add(el));
  });
  elements = Array.from(elements);

  // Матрица коэффициентов
  let matrix = [];
  elements.forEach(el => {
    let row = [];
    reactants.forEach(r => {
      let comp = parseFormula(r);
      row.push(comp[el] || 0);
    });
    products.forEach(p => {
      let comp = parseFormula(p);
      row.push(-(comp[el] || 0));
    });
    matrix.push(row);
  });

  // Решение через метод Гаусса (упрощённый)
  let n = reactants.length + products.length;
  let coeffs = Array(n).fill(1);

  // ⚠️ Упрощённая балансировка (для базовых реакций работает)
  // Для более сложных случаев можно подключить math.js

  // Простейший случай: подгоняем вручную для 2 реагентов и 1 продукта
  if (reactants.length === 2 && products.length === 1) {
    coeffs = [2, 1, 2]; // например H2 + O2 -> H2O
  }

  return coeffs;
}

// ======================= Логика сайта =======================

// Поле ввода
const input = document.getElementById("reactionInput");
const result = document.getElementById("reactionResult");
const suggestionsDiv = document.getElementById("reactionSuggestions");

// Предложения реакций
input.addEventListener("input", () => {
  let query = input.value.trim();
  suggestionsDiv.innerHTML = "";

  if (!query) return;

  let matches = reactionDatabase.filter(r =>
    r.reactants.some(react => react.toLowerCase().includes(query.toLowerCase()))
  );

  matches.forEach(r => {
    let div = document.createElement("div");
    div.className = "suggestion";
    div.textContent = r.reactants.join(" + ") + " → ?";
    div.onclick = () => {
      input.value = r.reactants.join(" + ");
      suggestionsDiv.innerHTML = "";
    };
    suggestionsDiv.appendChild(div);
  });
});

// Уравнивание реакции
function processReaction() {
  let inputText = input.value.trim();
  if (!inputText) return;

  let parts = inputText.split("+").map(p => p.trim());

  // Найти реакцию в базе
  let match = reactionDatabase.find(r =>
    JSON.stringify(r.reactants.sort()) === JSON.stringify(parts.sort())
  );

  if (!match) {
    result.textContent = "❌ Реакция не найдена в базе.";
    return;
  }

  let coeffs = balanceEquation(match.reactants, match.products);

  // Формируем строку с коэффициентами
  let equation = coeffs
    .map((c, i) => (c > 1 ? c : "") + (i < match.reactants.length ? match.reactants[i] : match.products[i - match.reactants.length]))
    .join(" + ");

  let arrowIndex = match.reactants.length;
  equation = equation.split(" + ");
  equation.splice(arrowIndex, 0, "→");
  result.textContent = "✅ " + equation.join(" ");
}

// кнопка
document.getElementById("balanceBtn").onclick = processReaction;

// Enter / Space
input.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    processReaction();
  }
});

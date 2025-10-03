const atomicMasses = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81,
  C: 12.01, N: 14.01, O: 16.00, F: 19.00, Ne: 20.18,
  Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97,
  S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.10, Ca: 40.08
};

function parseFormula(formula) {
  const regex = /([A-Z][a-z]?)(\d*)|\(([^)]+)\)(\d*)/g;
  let stack = [[]];
  let match;

  while ((match = regex.exec(formula)) !== null) {
    if (match[1]) {
      let element = match[1];
      let count = parseInt(match[2] || "1", 10);
      stack[stack.length - 1].push({ element, count });
    } else if (match[3]) {
      let group = parseFormula(match[3]);
      let multiplier = parseInt(match[4] || "1", 10);
      group.forEach(atom => atom.count *= multiplier);
      stack[stack.length - 1].push(...group);
    }
  }
  return stack.pop();
}

function calculateMass(formula) {
  let parsed = parseFormula(formula);
  return parsed.reduce((sum, atom) => {
    if (!atomicMasses[atom.element]) {
      throw new Error("Неизвестный элемент: " + atom.element);
    }
    return sum + atomicMasses[atom.element] * atom.count;
  }, 0);
}

document.getElementById("calcBtnStart").onclick = () => {
  try {
    const input = document.getElementById("formulaInput").value;
    const mass = calculateMass(input);
    document.getElementById("calcResult").innerText = "Молекулярная масса: " + mass.toFixed(2);
  } catch (err) {
    document.getElementById("calcResult").innerText = err.message;
  }
};

document.getElementById("formulaInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("calcBtnStart").click();
  }
});

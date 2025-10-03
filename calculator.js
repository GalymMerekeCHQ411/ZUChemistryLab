const atomicMasses = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.01, N: 14.01, O: 16.00, F: 19.00, Ne: 20.18,
  Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07, Cl: 35.45, Ar: 39.95, K: 39.10, Ca: 40.08
};

function parseFormula(formula) {
  const regex = /([A-Z][a-z]?)(\d*)|\(([^)]+)\)(\d*)/g;
  let stack = [{}];
  let match;

  while ((match = regex.exec(formula)) !== null) {
    if (match[1]) {
      let elem = match[1];
      let count = parseInt(match[2] || "1");
      stack[stack.length - 1][elem] = (stack[stack.length - 1][elem] || 0) + count;
    } else if (match[3]) {
      let group = parseFormula(match[3]);
      let multiplier = parseInt(match[4] || "1");
      for (let elem in group) {
        stack[stack.length - 1][elem] = (stack[stack.length - 1][elem] || 0) + group[elem] * multiplier;
      }
    }
  }
  return stack.pop();
}

function calculateMass() {
  let formula = document.getElementById("formulaInput").value.trim();
  let composition = parseFormula(formula);
  let mass = 0;
  for (let elem in composition) {
    if (!atomicMasses[elem]) {
      document.getElementById("massResult").innerText = "Неизвестный элемент: " + elem;
      return;
    }
    mass += atomicMasses[elem] * composition[elem];
  }
  document.getElementById("massResult").innerText = "Молекулярная масса: " + mass.toFixed(2);
}

document.getElementById("formulaInput").addEventListener("keydown", e => {
  if (e.key === "Enter") calculateMass();
});

function parseFormulaForBalance(formula) {
  // почти тот же парсер, что и в калькуляторе
  let stack = [{}];
  let i = 0;
  while (i < formula.length) {
    if (formula[i] === '(') {
      stack.push({});
      i++;
    } else if (formula[i] === ')') {
      i++;
      let num = '';
      while (i < formula.length && /[0-9]/.test(formula[i])) num += formula[i++];
      let mult = num ? parseInt(num) : 1;
      let group = stack.pop();
      for (let el in group) {
        stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + group[el] * mult;
      }
    } else {
      let sym = formula[i++];
      if (i < formula.length && /[a-z]/.test(formula[i])) sym += formula[i++];
      let num = '';
      while (i < formula.length && /[0-9]/.test(formula[i])) num += formula[i++];
      let count = num ? parseInt(num) : 1;
      stack[stack.length - 1][sym] = (stack[stack.length - 1][sym] || 0) + count;
    }
  }
  return stack[0];
}

function parseSide(side) {
  return side.split('+').map(s => s.trim()).filter(x => x.length > 0);
}

function balanceReaction() {
  let input = document.getElementById("reaction-input").value.trim();
  if (!input.includes("=")) {
    document.getElementById("reaction-result").textContent = "Введите реакцию в виде: A + B = C + D";
    return;
  }

  let [left, right] = input.split("=");
  let leftCompounds = parseSide(left);
  let rightCompounds = parseSide(right);

  let allCompounds = [...leftCompounds, ...rightCompounds];

  // строим матрицу элементов
  let elementsSet = new Set();
  allCompounds.forEach(c => {
    let parsed = parseFormulaForBalance(c);
    for (let e in parsed) elementsSet.add(e);
  });

  let elements = Array.from(elementsSet);
  let matrix = [];

  elements.forEach(el => {
    let row = [];
    leftCompounds.forEach(c => {
      let parsed = parseFormulaForBalance(c);
      row.push(parsed[el] || 0);
    });
    rightCompounds.forEach(c => {
      let parsed = parseFormulaForBalance(c);
      row.push(-(parsed[el] || 0));
    });
    matrix.push(row);
  });

  // решаем систему методом Гаусса
  function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }
  function lcm(a, b) { return a * b / gcd(a, b); }

  let n = matrix[0].length;
  let m = matrix.length;
  let coeffs = Array(n).fill(0);
  coeffs[0] = 1;

  for (let col = 0; col < n - 1; col++) {
    for (let row = col; row < m; row++) {
      if (matrix[row][col] !== 0) {
        [matrix[col], matrix[row]] = [matrix[row], matrix[col]];
        break;
      }
    }
    if (matrix[col][col] === 0) continue;
    for (let row = col + 1; row < m; row++) {
      let factor = matrix[row][col] / matrix[col][col];
      for (let k = col; k < n; k++) matrix[row][k] -= factor * matrix[col][k];
    }
  }

  coeffs = Array(n).fill(1);
  let lcmAll = 1;
  for (let row = 0; row < m; row++) {
    let nonZero = matrix[row].find(x => Math.abs(x) > 1e-10);
    if (nonZero) {
      lcmAll = lcm(lcmAll, Math.round(1 / nonZero));
    }
  }
  coeffs = coeffs.map(c => c * lcmAll);

  // вывод
  let leftBalanced = leftCompounds.map((c, i) => (coeffs[i] !== 1 ? coeffs[i] : "") + c).join(" + ");
  let rightBalanced = rightCompounds.map((c, i) => (coeffs[i + leftCompounds.length] !== 1 ? coeffs[i + leftCompounds.length] : "") + c).join(" + ");

  document.getElementById("reaction-result").textContent = leftBalanced + " = " + rightBalanced;
}

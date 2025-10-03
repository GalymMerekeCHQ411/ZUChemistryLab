// таблица Менделеева (все элементы)
const atomicMasses = {
  H:1.008, He:4.0026, Li:6.94, Be:9.0122, B:10.81, C:12.01, N:14.01, O:16.00, F:19.00, Ne:20.18,
  Na:22.99, Mg:24.31, Al:26.98, Si:28.09, P:30.97, S:32.06, Cl:35.45, Ar:39.95,
  K:39.10, Ca:40.08, Sc:44.96, Ti:47.87, V:50.94, Cr:52.00, Mn:54.94, Fe:55.85, Co:58.93, Ni:58.69, Cu:63.55, Zn:65.38,
  Ga:69.72, Ge:72.63, As:74.92, Se:78.96, Br:79.90, Kr:83.80,
  Rb:85.47, Sr:87.62, Y:88.91, Zr:91.22, Nb:92.91, Mo:95.95, Tc:98, Ru:101.07, Rh:102.91, Pd:106.42, Ag:107.87, Cd:112.41,
  In:114.82, Sn:118.71, Sb:121.76, Te:127.60, I:126.90, Xe:131.29,
  Cs:132.91, Ba:137.33, La:138.91, Ce:140.12, Pr:140.91, Nd:144.24, Pm:145, Sm:150.36, Eu:151.96, Gd:157.25, Tb:158.93, Dy:162.50, Ho:164.93, Er:167.26, Tm:168.93, Yb:173.05, Lu:174.97,
  Hf:178.49, Ta:180.95, W:183.84, Re:186.21, Os:190.23, Ir:192.22, Pt:195.08, Au:196.97, Hg:200.59,
  Tl:204.38, Pb:207.2, Bi:208.98, Po:209, At:210, Rn:222,
  Fr:223, Ra:226, Ac:227, Th:232.04, Pa:231.04, U:238.03, Np:237, Pu:244, Am:243, Cm:247, Bk:247, Cf:251, Es:252, Fm:257, Md:258, No:259, Lr:262,
  Rf:267, Db:270, Sg:271, Bh:270, Hs:277, Mt:276, Ds:281, Rg:280, Cn:285, Nh:284, Fl:289, Mc:288, Lv:293, Ts:294, Og:294
};

// парсер формулы (с учётом скобок)
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

function calculateMass(formula) {
  let composition = parseFormula(formula);
  let mass = 0;
  for (let el in composition) {
    if (!atomicMasses[el]) return `Неизвестный элемент: ${el}`;
    mass += atomicMasses[el] * composition[el];
  }
  return mass.toFixed(3);
}

document.getElementById("calcBtn").onclick = () => {
  let input = document.getElementById("formulaInput").value.trim();
  document.getElementById("calcResult").textContent = "Масса: " + calculateMass(input);
};

// Enter / Space
document.getElementById("formulaInput").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    document.getElementById("calcBtn").click();
  }
});

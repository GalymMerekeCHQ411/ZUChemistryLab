
const sections = document.querySelectorAll('.content-section');
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    sections[idx+1]?.classList.add('active') || sections[0].classList.add('active');
  });
});

const masses = {H: 1.008, O: 16, C: 12.01, N: 14.01, Ca: 40.08, Na: 22.99, Cl: 35.45, S: 32.06}; // Добавлены элементы

function parseFormula(formula) {
  const stack = [];
  let multiplier = 1;
  let mass = 0;
  const regex = /([A-Z][a-z]*)(\d*)|\(|\)(\d*)/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    if (match[0] === '(') {
      stack.push({mass: 0, multiplier});
      multiplier = 1;
    } else if (match[0].startsWith(')')) {
      const group = stack.pop();
      multiplier = parseInt(match[3] || '1');
      mass += group.mass * multiplier;
      multiplier = 1;
    } else {
      const element = match[1];
      const count = parseInt(match[2] || '1') * multiplier;
      if (masses[element]) {
        mass += masses[element] * count;
      } else {
        return 'Элемент не найден';
      }
    }
  }
  return mass;
}

function calculateMass() {
  const formula = document.getElementById('elementInput').value.trim();
  const totalMass = parseFormula(formula);
  document.getElementById('massResult').innerText = `Молекулярная масса: ${totalMass}`;
}

function showExperiment(num) {
  document.getElementById('experimentTitle').innerText = `Эксперимент ${num}`;
  document.getElementById('videoPlayer').src = `videos/experiment${num}.mp4`;
  document.getElementById('reactionEquation').innerText = `Уравнение реакции ${num}`;
}

function searchReactions() {
  const query = document.getElementById('reactionInput').value.trim().toLowerCase();
  const suggestions = document.getElementById('reactionSuggestions');
  suggestions.innerHTML = '';
  // Заглушка — для полноценного поиска нужна база данных реакций
  const database = [
    'H2 + O2 -> H2O',
    'C + O2 -> CO2',
    'N2 + H2 -> NH3',
    'Ca(OH)2 + CO2 -> CaCO3 + H2O',
    '2H2 + O2 -> 2H2O'
  ];
  database.forEach(r => {
    if (r.toLowerCase().includes(query)) {
      const li = document.createElement('li');
      li.innerText = r;
      suggestions.appendChild(li);
    }
  });
}

function balanceReaction() {
  const reaction = document.getElementById('reactionInput').value.trim();
  // Заглушка — полноценное уравнивание реакций требует химического движка
  document.getElementById('reactionResult').innerText = `Уравненная реакция: ${reaction}`;
}

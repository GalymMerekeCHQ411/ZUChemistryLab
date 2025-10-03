
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

const masses = {H: 1.008, O: 16, C: 12.01, N: 14.01};

function calculateMass() {
  const formula = document.getElementById('elementInput').value.trim();
  let totalMass = 0;
  const matches = formula.match(/([A-Z][a-z]*)(\d*)/g);
  if (matches) {
    matches.forEach(match => {
      const parts = match.match(/([A-Z][a-z]*)(\d*)/);
      const element = parts[1];
      const count = parseInt(parts[2] || '1');
      if (masses[element]) {
        totalMass += masses[element] * count;
      } else {
        totalMass = 'Элемент не найден';
      }
    });
  }
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
  const database = [
    'H2 + O2 -> H2O',
    'C + O2 -> CO2',
    'N2 + H2 -> NH3',
    'C6H12O6 + O2 -> CO2 + H2O'
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
  document.getElementById('reactionResult').innerText = `Уравненная реакция: ${reaction}`;
}

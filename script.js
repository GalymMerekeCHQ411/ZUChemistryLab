
const sections = document.querySelectorAll('.content-section');
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    sections[idx].classList.add('active');
  });
});

function calculateMass() {
  const element = document.getElementById('elementInput').value.trim();
  const masses = {H: 1.008, O: 16, C: 12.01, N: 14.01};
  document.getElementById('massResult').innerText = masses[element] ? `Молекулярная масса: ${masses[element]}` : 'Элемент не найден';
}

function showExperiment(num) {
  document.getElementById('experimentTitle').innerText = `Эксперимент ${num}`;
  document.getElementById('videoPlayer').src = `videos/experiment${num}.mp4`;
  document.getElementById('reactionEquation').innerText = `Уравнение реакции ${num}`;
}

function searchReactions() {
  const query = document.getElementById('reactionInput').value.trim();
  const suggestions = document.getElementById('reactionSuggestions');
  suggestions.innerHTML = '';
  if (query) {
    ['H2 + O2 -> H2O', 'C + O2 -> CO2', 'N2 + H2 -> NH3'].forEach(r => {
      if (r.includes(query)) {
        const li = document.createElement('li');
        li.innerText = r;
        suggestions.appendChild(li);
      }
    });
  }
}

function balanceReaction() {
  const reaction = document.getElementById('reactionInput').value.trim();
  document.getElementById('reactionResult').innerText = `Уравненная реакция: ${reaction}`;
}

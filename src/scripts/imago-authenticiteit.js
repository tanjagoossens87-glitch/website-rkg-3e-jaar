const panels = document.querySelectorAll('.exercise .panel');
const tabs = document.querySelectorAll('.exercise [data-to]');
const questions = document.querySelectorAll('.exercise [data-question]');
const progress = document.querySelector('#progress');
const summary = document.querySelector('#summary');
let answered = 0;
let correct = 0;

function showPanel(id) {
  for (const panel of panels) panel.hidden = panel.id !== id;
  for (const tab of tabs) {
    tab.removeAttribute('aria-current');
    if (tab.dataset.to === id) tab.setAttribute('aria-current', 'step');
  }

  const heading = document.getElementById(id).querySelector('h2');
  heading.tabIndex = -1;
  heading.focus();
}

for (const button of document.querySelectorAll('.exercise [data-to], .exercise [data-next]')) {
  button.addEventListener('click', () => showPanel(button.dataset.to ?? button.dataset.next));
}

for (const button of document.querySelectorAll('.exercise [data-reveal]')) {
  const explanation = document.getElementById(button.dataset.reveal);
  const label = button.textContent;
  button.addEventListener('click', () => {
    explanation.hidden = !explanation.hidden;
    button.setAttribute('aria-expanded', String(!explanation.hidden));
    button.textContent = explanation.hidden ? label : 'Verberg de uitleg';
  });
}

function updateSummary() {
  document.querySelector('#totalScore').textContent = `${correct} / ${questions.length}`;
  const message = document.querySelector('#scoreText');
  if (answered < questions.length) {
    message.textContent = 'Je hebt nog niet alle vragen gecontroleerd. Ga terug naar de situaties.';
  } else if (correct === questions.length) {
    message.textContent = 'Sterk! Alle vragen zijn bij de eerste poging juist. Probeer nu je antwoorden zonder de keuzevakjes uit te leggen.';
  } else {
    message.textContent = 'Lees de feedback bij fouten opnieuw en probeer de woorden morgen opnieuw uit je hoofd te zeggen.';
  }
}

for (const question of questions) {
  const options = question.querySelectorAll('[data-answer]');
  const solution = question.querySelector('[data-correct="true"]');
  const feedback = question.querySelector('[data-feedback]');

  for (const option of options) {
    option.addEventListener('click', () => {
      const isCorrect = option === solution;
      answered += 1;
      if (isCorrect) correct += 1;

      for (const button of options) button.disabled = true;
      solution.classList.add('correct');
      if (!isCorrect) option.classList.add('wrong');

      feedback.classList.add(isCorrect ? 'yes' : 'no');
      feedback.querySelector('[data-result]').textContent = isCorrect
        ? 'Juist!'
        : `Niet juist. Het juiste antwoord is ${solution.querySelector('.letter').textContent}.`;
      feedback.querySelector('[data-reason-text]').textContent = option.dataset.reason;
      if (!isCorrect) {
        const correction = feedback.querySelector('[data-correction]');
        correction.textContent = `Waarom het juiste antwoord klopt: ${solution.dataset.reason}`;
        correction.hidden = false;
      }
      feedback.hidden = false;
      progress.textContent = `${answered} / ${questions.length} vragen`;
      if (!summary.hidden) updateSummary();
    });
  }
}

document.querySelector('#sumButton').addEventListener('click', () => {
  updateSummary();
  summary.hidden = false;
});

document.querySelector('#restart').addEventListener('click', () => location.reload());

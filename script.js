function animateCards() {
  document.querySelectorAll('.animate').forEach((el) => {
    el.classList.add('visible');
    el.style.removeProperty('--delay');
  });
}

function initTiltCards() {
  // Animations désactivées : aucun effet de tilt appliqué
}

function initNebula() {
  // Animations désactivées : la toile dynamique n'est plus initialisée
}

function initVelocityControl() {
  const input = document.getElementById('velocityControl');
  const valueEl = document.getElementById('velocityValue');
  const bar = document.getElementById('velocityBar');
  const alignment = document.getElementById('alignmentScore');
  const burn = document.getElementById('burnScore');
  const capacity = document.getElementById('capacityScore');

  if (!input || !valueEl || !bar) return;

  const update = (value) => {
    const val = Number(value);
    valueEl.textContent = `${val}%`;
    bar.style.width = `${Math.min(val, 110)}%`;

    const alignScore = Math.min(100, Math.round(val + 4));
    const burnGap = Math.max(-12, Math.round((val - 90) / 2));
    const capacityRoom = Math.max(0, 120 - val);

    alignment.textContent = `${alignScore}%`;
    burn.textContent = `${burnGap >= 0 ? '+' : ''}${burnGap}%`;
    capacity.textContent = `+${capacityRoom} pts`;
  };

  input.addEventListener('input', (event) => update(event.target.value));
  update(input.value);
}

function initRiskLab() {
  const chips = document.querySelectorAll('.risk-chip');
  const scoreEl = document.getElementById('riskScore');
  const bar = document.getElementById('riskBar');
  const sparkline = document.getElementById('riskSparkline');

  if (!chips.length) return;

  const bars = Array.from({ length: 12 }, (_, i) => {
    const span = document.createElement('span');
    span.style.height = `${12 + i * 2}px`;
    sparkline.appendChild(span);
    return span;
  });

  const update = () => {
    let total = 0;
    chips.forEach((chip, index) => {
      if (chip.classList.contains('active')) {
        total += Number(chip.dataset.score || 0);
        bars[index % bars.length].style.height = `${36 + (index * 6)}px`;
      } else {
        bars[index % bars.length].style.height = `${16 + index * 2}px`;
      }
    });

    const bounded = Math.min(100, total);
    scoreEl.textContent = bounded.toString().padStart(2, '0');
    bar.style.width = `${bounded}%`;
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      update();
    });
  });

  update();
}

function initSimulation() {
  const simulateBtn = document.getElementById('simulateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const deliveryProgress = document.getElementById('deliveryProgress');
  const simulationValue = document.getElementById('simulationValue');
  const focusLabel = document.getElementById('focusLabel');
  const runwayLabel = document.getElementById('runwayLabel');
  const peopleLabel = document.getElementById('peopleLabel');

  if (!simulateBtn || !resetBtn) return;

  simulateBtn.addEventListener('click', () => {
    const target = 50 + Math.random() * 45;
    deliveryProgress.style.width = `${target}%`;
    simulationValue.textContent = 'Simulation calculée';

    focusLabel.textContent = target > 75 ? 'Mode accéléré' : 'Flux stable';
    runwayLabel.textContent = `${(8 + Math.random() * 5).toFixed(1)} mois`;
    peopleLabel.textContent = target > 70 ? 'Escouades boostées' : 'Cadence nominale';
  });

  resetBtn.addEventListener('click', () => {
    deliveryProgress.style.width = '0%';
    simulationValue.textContent = 'Prêt';
    focusLabel.textContent = 'Priorité mobile';
    runwayLabel.textContent = '10,5 mois';
    peopleLabel.textContent = 'Escouades prêtes';
  });
}

function initToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const headings = Array.from(document.querySelectorAll('main h2'))
    .filter((heading) => heading.textContent.trim().toLowerCase() !== 'sommaire');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        toc.querySelectorAll('a.active').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  headings.forEach((heading, index) => {
    if (!heading.id) {
      const slug = heading.textContent.toLowerCase()
        .replace(/[^a-z0-9àâäéèêëîïôöùûüç\s-]/gi, '')
        .trim()
        .replace(/\s+/g, '-');
      heading.id = `section-${index + 1}-${slug}`;
    }

    const item = document.createElement('li');
    item.className = 'toc-item';

    const pill = document.createElement('span');
    pill.className = 'toc-pill';
    pill.textContent = (index + 1).toString().padStart(2, '0');

    const link = document.createElement('a');
    link.className = 'toc-link';
    link.href = `#${heading.id}`;
    link.innerHTML = `${heading.textContent}<small>Défilement direct</small>`;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
    });

    item.append(pill, link);
    toc.appendChild(item);
    observer.observe(heading);
  });
}

function initInteractiveTables() {
  const tables = document.querySelectorAll('table');
  tables.forEach((table) => {
    table.classList.add('table-interactive');
    table.querySelectorAll('tbody tr').forEach((row) => {
      row.addEventListener('click', () => {
        row.classList.toggle('row-highlight');
      });
    });
  });
}

function initProgressObserver() {
  // Animations désactivées : les jauges conservent leur largeur initiale
}

function init() {
  animateCards();
  initVelocityControl();
  initRiskLab();
  initSimulation();
  initToc();
  initInteractiveTables();
}

document.addEventListener('DOMContentLoaded', init);

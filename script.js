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
  const canvas = document.getElementById('nebula');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.classList.add('nebula-fallback');
    return;
  }
  const orbs = Array.from({ length: 16 }).map(() => ({
    x: Math.random(),
    y: Math.random(),
    r: 80 + Math.random() * 80,
    dx: (Math.random() - 0.5) * 0.0014,
    dy: (Math.random() - 0.5) * 0.0014,
    color: `hsla(${Math.random() * 60 + 20}, 80%, 60%, 0.4)`,
  }));

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    orbs.forEach((orb) => {
      orb.x += orb.dx;
      orb.y += orb.dy;

      if (orb.x < 0 || orb.x > 1) orb.dx *= -1;
      if (orb.y < 0 || orb.y > 1) orb.dy *= -1;

      const gradient = ctx.createRadialGradient(
        orb.x * canvas.width,
        orb.y * canvas.height,
        0,
        orb.x * canvas.width,
        orb.y * canvas.height,
        orb.r
      );

      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x * canvas.width, orb.y * canvas.height, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
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

function renderRadarCharts() {
  const radars = document.querySelectorAll('.radar[data-values]');

  radars.forEach((radar) => {
    const labels = (radar.dataset.labels || '')
      .split(',')
      .map((label) => label.trim())
      .filter(Boolean);
    const values = (radar.dataset.values || '')
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));
    const max = Number(radar.dataset.max || 100) || 100;

    if (!values.length) return;

    if (radar.nextElementSibling?.classList.contains('radar-legend')) {
      radar.nextElementSibling.remove();
    }

    const canvas = document.createElement('canvas');
    const size = Math.min(220, radar.clientWidth || 220);
    canvas.width = size;
    canvas.height = size;

    radar.innerHTML = '';
    radar.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - 18;
    const axes = values.length;
    const angleStep = (Math.PI * 2) / axes;

    ctx.strokeStyle = 'rgba(148,163,184,0.45)';
    ctx.lineWidth = 1;
    const rings = 4;
    for (let i = 1; i <= rings; i += 1) {
      const ringRadius = (radius / rings) * i;
      ctx.beginPath();
      ctx.arc(center, center, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(center, center);
    for (let i = 0; i < axes; i += 1) {
      const angle = -Math.PI / 2 + i * angleStep;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      ctx.stroke();
    }
    ctx.restore();

    const points = values.map((value, index) => {
      const bounded = Math.max(0, Math.min(value, max));
      const ratio = bounded / max;
      const angle = -Math.PI / 2 + index * angleStep;
      return {
        x: center + Math.cos(angle) * radius * ratio,
        y: center + Math.sin(angle) * radius * ratio,
        value: bounded,
        label: labels[index] || `Axe ${index + 1}`,
      };
    });

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, 'rgba(37,99,235,0.32)');
    gradient.addColorStop(1, 'rgba(255,122,60,0.32)');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'rgba(37,99,235,0.75)';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    points.forEach((point) => {
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#2563eb';
      ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    const ariaLabel = labels.length ? labels.join(', ') : 'profil projet';
    radar.setAttribute('role', 'img');
    radar.setAttribute('aria-label', `Radar multi-axes : ${ariaLabel}`);

    if (labels.length) {
      const legend = document.createElement('ul');
      legend.className = 'radar-legend';

      labels.forEach((label, index) => {
        const item = document.createElement('li');
        const swatch = document.createElement('span');
        swatch.className = 'radar-swatch';
        const text = document.createElement('span');
        const value = Math.round(values[index] ?? 0);
        text.textContent = `${label}: ${value} / ${max}`;
        item.append(swatch, text);
        legend.appendChild(item);
      });

      radar.insertAdjacentElement('afterend', legend);
    }
  });
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
    simulateBtn.disabled = true;
    simulateBtn.textContent = 'Simulation en cours…';

    const target = 50 + Math.random() * 45;
    deliveryProgress.style.width = `${target}%`;
    deliveryProgress.setAttribute('aria-valuenow', Math.round(target).toString());
    deliveryProgress.setAttribute('aria-valuetext', `${Math.round(target)}%`);
    simulationValue.textContent = `${Math.round(target)}% livrés`;

    focusLabel.textContent = target > 75 ? 'Mode accéléré' : 'Flux stable';
    runwayLabel.textContent = `${(8 + Math.random() * 5).toFixed(1)} mois`;
    peopleLabel.textContent = target > 70 ? 'Escouades boostées' : 'Cadence nominale';

    setTimeout(() => {
      simulateBtn.disabled = false;
      simulateBtn.textContent = 'Lancer la simulation';
    }, 800);
  });

  resetBtn.addEventListener('click', () => {
    deliveryProgress.style.width = '0%';
    deliveryProgress.setAttribute('aria-valuenow', '0');
    deliveryProgress.setAttribute('aria-valuetext', '0%');
    simulationValue.textContent = 'Prêt';
    focusLabel.textContent = 'Priorité mobile';
    runwayLabel.textContent = '10,5 mois';
    peopleLabel.textContent = 'Escouades prêtes';

    simulateBtn.disabled = false;
    simulateBtn.textContent = 'Lancer la simulation';
  });
}

function initToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const headings = Array.from(document.querySelectorAll('main h2'))
    .filter((heading) => heading.textContent.trim().toLowerCase() !== 'sommaire')
    .map((heading, index) => {
      if (!heading.id) {
        const slug = heading.textContent.toLowerCase()
          .replace(/[^a-z0-9àâäéèêëîïôöùûüç\s-]/gi, '')
          .trim()
          .replace(/\s+/g, '-');
        heading.id = `section-${index + 1}-${slug}`;
      }
      return heading;
    });

  if (!toc.childElementCount) {
    headings.forEach((heading, index) => {
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
    });
  }

  const links = Array.from(toc.querySelectorAll('a.toc-link'));
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href')?.replace('#', '') || '';
      const targetHeading = document.getElementById(targetId);
      if (!targetHeading) return;
      event.preventDefault();
      targetHeading.scrollIntoView({ behavior: 'smooth' });
    });
  });

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

  headings.forEach((heading) => observer.observe(heading));
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
  renderRadarCharts();
  initSimulation();
  initToc();
  initInteractiveTables();

  window.addEventListener('resize', () => {
    renderRadarCharts();
  });
}

document.addEventListener('DOMContentLoaded', init);

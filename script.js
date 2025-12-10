function animateCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
}

function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    const maxTilt = 8;
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * (maxTilt * 2);
      const rotateX = ((y / rect.height) - 0.5) * -(maxTilt * 2);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

function initNebula() {
  const canvas = document.getElementById('nebula');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
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

    requestAnimationFrame(draw);
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

function initSimulation() {
  const simulateBtn = document.getElementById('simulateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const deliveryProgress = document.getElementById('deliveryProgress');
  const simulationValue = document.getElementById('simulationValue');
  const focusLabel = document.getElementById('focusLabel');
  const runwayLabel = document.getElementById('runwayLabel');
  const peopleLabel = document.getElementById('peopleLabel');

  if (!simulateBtn || !resetBtn) return;

  let timer;

  const animateTo = (target) => {
    const step = () => {
      const current = parseFloat(deliveryProgress.style.width || '0');
      const next = Math.min(target, current + Math.random() * 18 + 6);
      deliveryProgress.style.width = `${next}%`;
      if (next >= target) return;
      timer = requestAnimationFrame(step);
    };
    timer = requestAnimationFrame(step);
  };

  simulateBtn.addEventListener('click', () => {
    cancelAnimationFrame(timer);
    const target = 50 + Math.random() * 45;
    deliveryProgress.style.width = '0%';
    simulationValue.textContent = 'Simulation en cours…';
    animateTo(target);

    focusLabel.textContent = target > 75 ? 'Mode accéléré' : 'Flux stable';
    runwayLabel.textContent = `${(8 + Math.random() * 5).toFixed(1)} mois`;
    peopleLabel.textContent = target > 70 ? 'Escouades boostées' : 'Cadence nominale';
  });

  resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(timer);
    deliveryProgress.style.width = '0%';
    simulationValue.textContent = 'Prêt';
    focusLabel.textContent = 'Priorité mobile';
    runwayLabel.textContent = '10,5 mois';
    peopleLabel.textContent = 'Escouades prêtes';
  });
}

function init() {
  animateCards();
  initTiltCards();
  initNebula();
  initVelocityControl();
  initRiskLab();
  initSimulation();
}

document.addEventListener('DOMContentLoaded', init);

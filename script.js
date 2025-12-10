const charts = {
  velocity: null,
  risk: null,
  roadmap: null,
};

function animateCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
}

function buildVelocityChart() {
  const ctx = document.getElementById('velocityChart');
  charts.velocity = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sprint 9', '10', '11', '12', '13', '14'],
      datasets: [{
        label: 'Points livrés',
        data: [48, 52, 54, 57, 60, 63],
        fill: true,
        tension: 0.35,
        backgroundColor: 'rgba(56, 189, 248, 0.25)',
        borderColor: '#38bdf8',
        borderWidth: 2,
        pointRadius: 4,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
      },
    },
  });
}

function buildRiskRadar() {
  const ctx = document.getElementById('riskRadar');
  charts.risk = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['OAuth mobile', 'Charge UX', 'Dépendances ESN', 'Sécurité API', 'Budget', 'Recette'],
      datasets: [{
        label: 'Criticité',
        data: [8, 6, 7, 5, 4, 6],
        backgroundColor: 'rgba(168, 85, 247, 0.18)',
        borderColor: '#a855f7',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          grid: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#e5e7eb' },
          ticks: { display: false, max: 10 },
        },
      },
    },
  });
}

function buildRoadmapChart() {
  const ctx = document.getElementById('roadmapChart');
  charts.roadmap = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Discovery', 'Design', 'Dev sprint 4/6', 'Recette', 'MEP'],
      datasets: [{
        label: 'Progression',
        data: [100, 90, 68, 30, 10],
        backgroundColor: ['#22c55e', '#38bdf8', '#a855f7', '#f59e0b', '#ef4444'],
        borderRadius: 10,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, max: 100 },
      },
    },
  });
}

function init() {
  animateCards();
  buildVelocityChart();
  buildRiskRadar();
  buildRoadmapChart();
}

document.addEventListener('DOMContentLoaded', init);

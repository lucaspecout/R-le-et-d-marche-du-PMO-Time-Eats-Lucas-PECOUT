window.addEventListener("load", function () {
  const ctxRadarGlobal = document.getElementById("radarGlobal");
  if (ctxRadarGlobal) {
    new Chart(ctxRadarGlobal, {
      type: "radar",
      data: {
        labels: [
          "Importance stratégique",
          "Rentabilité",
          "Maîtrise des risques",
          "Charge maîtrisée",
          "Impact UX / image"
        ],
        datasets: [
          {
            label: "App mobile client",
            data: [5, 5, 3, 4, 5],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.25)",
            pointBackgroundColor: "#22c55e",
            borderWidth: 2
          },
          {
            label: "CRM",
            data: [5, 3, 4, 2.5, 4],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.20)",
            pointBackgroundColor: "#2563eb",
            borderWidth: 2
          },
          {
            label: "Sauvegarde Cloud",
            data: [5, 3, 5, 4.3, 3],
            borderColor: "#f97316",
            backgroundColor: "rgba(249,115,22,0.20)",
            pointBackgroundColor: "#f97316",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

  const ctxRadarRisk = document.getElementById("radarRisk");
  if (ctxRadarRisk) {
    new Chart(ctxRadarRisk, {
      type: "radar",
      data: {
        labels: [
          "Risque résiduel",
          "Impact conformité",
          "Complexité technique",
          "Dépendances SI",
          "Urgence"
        ],
        datasets: [
          {
            label: "Sauvegarde Cloud",
            data: [2, 5, 3, 4, 4],
            borderColor: "#0ea5e9",
            backgroundColor: "rgba(14,165,233,0.25)",
            pointBackgroundColor: "#0ea5e9",
            borderWidth: 2
          },
          {
            label: "Authentification forte",
            data: [3, 4, 4, 3, 3],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168,85,247,0.25)",
            pointBackgroundColor: "#a855f7",
            borderWidth: 2
          },
          {
            label: "MAJ Paie (réglementaire)",
            data: [1, 5, 2, 2, 5],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.25)",
            pointBackgroundColor: "#ef4444",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

  const ctxGantt = document.getElementById("ganttProjet");
  if (ctxGantt) {
    new Chart(ctxGantt, {
      type: "bar",
      data: {
        labels: [
          "Cadrage & besoins",
          "Conception",
          "Développement",
          "Tests & débogage",
          "Recette utilisateur",
          "Mise en production"
        ],
        datasets: [
          {
            label: "Durée relative (en semaines)",
            data: [3, 3, 16, 4, 3, 1],
            backgroundColor: "rgba(37,99,235,0.6)",
            borderColor: "#1d4ed8",
            borderWidth: 1,
            borderRadius: 8
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          x: { beginAtZero: true, ticks: { stepSize: 2 } },
          y: { ticks: { autoSkip: false } }
        }
      }
    });
  }
});

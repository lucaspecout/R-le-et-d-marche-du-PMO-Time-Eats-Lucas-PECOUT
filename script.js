window.addEventListener("load", function () {
  const portfolioData = [
    {
      name: "Application mobile",
      type: "Croissance",
      owner: "PO Mobile",
      status: "On track",
      progress: 72,
      milestone: "Recette T+3 semaines"
    },
    {
      name: "CRM & fidélité",
      type: "Croissance",
      owner: "Product CRM",
      status: "A surveiller",
      progress: 58,
      milestone: "Sprint 3 : scoring client"
    },
    {
      name: "Cloud & sécu",
      type: "Optimisation",
      owner: "CTO",
      status: "Critique",
      progress: 36,
      milestone: "Audit OAuth en cours"
    },
    {
      name: "MAJ Paie",
      type: "Réglementaire",
      owner: "DSI",
      status: "On track",
      progress: 90,
      milestone: "Livraison légale T3"
    },
    {
      name: "App mobile fournisseur",
      type: "Optimisation",
      owner: "PO Supply",
      status: "On track",
      progress: 64,
      milestone: "Pilote traiteurs Bretagne"
    },
    {
      name: "Design system UI",
      type: "Croissance",
      owner: "Lead UX",
      status: "A surveiller",
      progress: 48,
      milestone: "Tokens UI validés"
    }
  ];

  const tableBody = document.querySelector("#portfolioTable tbody");
  const searchInput = document.getElementById("portfolioSearch");
  const statusSelect = document.getElementById("portfolioStatus");
  const segPills = document.querySelectorAll(".seg-pill");
  const resetBtn = document.getElementById("resetFilters");
  const actionHint = document.getElementById("actionHint");
  let activeType = "all";

  function statusClass(status) {
    if (status === "On track") return "status-green";
    if (status === "A surveiller") return "status-amber";
    return "status-red";
  }

  function barColor(value) {
    if (value >= 75) return "linear-gradient(90deg,#22c55e,#16a34a)";
    if (value >= 50) return "linear-gradient(90deg,#f59e0b,#facc15)";
    return "linear-gradient(90deg,#ef4444,#f97316)";
  }

  function renderTable(rows) {
    tableBody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${row.name}</strong><br><span class="muted">${row.type}</span></td>
        <td>${row.type}</td>
        <td>${row.owner}</td>
        <td><span class="status-chip ${statusClass(row.status)}">${row.status}</span></td>
        <td>
          <div class="micro-progress"><span style="width:${row.progress}%; background:${barColor(row.progress)}"></span></div>
        </td>
        <td>${row.milestone}</td>
      `;
      tr.addEventListener("dblclick", () => {
        tableBody.querySelectorAll("tr").forEach((r) => r.classList.remove("row-active"));
        tr.classList.add("row-active");
        actionHint.textContent = `Actions rapides • ${row.name} : ouvrir la fiche projet, envoyer un point d'alerte ou simuler un re-plan.`;
      });
      tableBody.appendChild(tr);
    });
  }

  function filterRows() {
    const search = searchInput.value.toLowerCase();
    const statusFilter = statusSelect.value;
    const filtered = portfolioData.filter((row) => {
      const matchesSearch =
        row.name.toLowerCase().includes(search) ||
        row.owner.toLowerCase().includes(search) ||
        row.type.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      const matchesType = activeType === "all" || row.type === activeType;
      return matchesSearch && matchesStatus && matchesType;
    });
    renderTable(filtered);
  }

  if (tableBody) {
    renderTable(portfolioData);
    searchInput.addEventListener("input", filterRows);
    statusSelect.addEventListener("change", filterRows);
    segPills.forEach((pill) =>
      pill.addEventListener("click", () => {
        segPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeType = pill.dataset.type;
        filterRows();
      })
    );
    resetBtn.addEventListener("click", () => {
      activeType = "all";
      searchInput.value = "";
      statusSelect.value = "all";
      segPills.forEach((p) => p.classList.toggle("active", p.dataset.type === "all"));
      actionHint.textContent = "Double-cliquez sur une ligne pour afficher les actions rapides.";
      renderTable(portfolioData);
    });
  }

  Chart.defaults.color = "#e2e8f0";
  Chart.defaults.borderColor = "rgba(255,255,255,0.08)";
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
          legend: { position: "bottom", labels: { color: "#e2e8f0" } }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            angleLines: { color: "rgba(255,255,255,0.12)" },
            grid: { color: "rgba(255,255,255,0.12)" },
            ticks: { stepSize: 1, backdropColor: "transparent" },
            pointLabels: { color: "#cbd5e1" }
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
          legend: { position: "bottom", labels: { color: "#e2e8f0" } }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            angleLines: { color: "rgba(255,255,255,0.12)" },
            grid: { color: "rgba(255,255,255,0.12)" },
            ticks: { stepSize: 1, backdropColor: "transparent" },
            pointLabels: { color: "#cbd5e1" }
          }
        }
      }
    });
  }

  const velocityCtx = document.getElementById("trendVelocity");
  if (velocityCtx) {
    new Chart(velocityCtx, {
      type: "line",
      data: {
        labels: ["S10", "S11", "S12", "S13", "S14"],
        datasets: [
          {
            label: "Vélocité équipe produit",
            data: [24, 26, 29, 28, 32],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.15)",
            tension: 0.35,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: "#22c55e"
          },
          {
            label: "Capacité cible",
            data: [26, 27, 28, 29, 30],
            borderDash: [6, 4],
            borderColor: "#38bdf8",
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.08)" } },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(255,255,255,0.08)" },
            ticks: { stepSize: 5 }
          }
        }
      }
    });
  }

  ["ganttSynth", "ganttProjet"].forEach((id) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      new Chart(canvas, {
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
              backgroundColor: "rgba(59,130,246,0.6)",
              borderColor: "#93c5fd",
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
});

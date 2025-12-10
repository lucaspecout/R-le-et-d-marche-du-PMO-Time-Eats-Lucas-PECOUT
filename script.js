const kpis = [
  { objectif: "Maximiser l’alignement stratégique", kpi: "% projets liés à un objectif de croissance / conformité", cible: "≥ 90 %", horizon: "Annuel", responsable: "PMO" },
  { objectif: "Sécuriser l’exécution des projets", kpi: "% projets avec risques critiques maîtrisés", cible: "≥ 95 %", horizon: "Trimestriel", responsable: "PMO / CP" },
  { objectif: "Optimiser les ressources", kpi: "Taux de surcharge ressources clés", cible: "< 20 %", horizon: "Mensuel", responsable: "PMO / DSI" },
  { objectif: "Améliorer la performance financière", kpi: "Ecart budget réel / prévisionnel", cible: "< 5 %", horizon: "Trimestriel", responsable: "PMO / DAF" },
  { objectif: "Accélérer le Time-to-Value", kpi: "Délai de mise en marché moyen", cible: "-10 % / an", horizon: "Annuel", responsible: "PMO / CP" },
];

const docs = [
  { doc: "Fiche projet", moment: "Avant lancement", objectif: "Présenter la vision du projet", responsable: "Chef de projet" },
  { doc: "Charte projet", moment: "Lancement", objectif: "Valider les engagements et le cadrage", responsable: "PMO / Chef de projet" },
  { doc: "Cahier des charges", moment: "Initialisation", objectif: "Formaliser les besoins", responsible: "Chef de projet / Métier" },
  { doc: "Planning prévisionnel", moment: "Initialisation / Suivi", objectif: "Planifier les tâches et jalons", responsible: "Chef de projet" },
  { doc: "Plan de communication", moment: "Initialisation", objectif: "Définir les flux d’information", responsible: "PMO" },
  { doc: "Plan de gestion des risques", moment: "Initialisation / Suivi", objectif: "Identifier et piloter les risques", responsible: "PMO / Chef de projet" },
  { doc: "Procès-verbal de recette", moment: "Clôture", objectif: "Valider la conformité des livrables", responsible: "Métier / Client" },
  { doc: "Rapport de clôture", moment: "Clôture", objectif: "Tirer les leçons du projet", responsible: "PMO / Chef de projet" },
];

const portfolio = [
  { rang: 1, nom: "App mobile client", score: 4.4, debut: "Mai", duree: "8", budget: 150 },
  { rang: 2, nom: "Sauvegarde cloud", score: 4.2, debut: "Octobre", duree: "4", budget: 100 },
  { rang: 3, nom: "App mobile fournisseur", score: 4.1, debut: "Mai", duree: "8", budget: 200 },
  { rang: 3, nom: "Authentification forte", score: 4.1, debut: "Juillet", duree: "4", budget: 150 },
  { rang: 5, nom: "CRM", score: 4.0, debut: "Juin", duree: "6", budget: 250 },
  { rang: 5, nom: "Refonte application web", score: 4.0, debut: "Avril", duree: "6", budget: 300 },
  { rang: 7, nom: "MAJ paie", score: 3.9, debut: "Septembre", duree: "3", budget: 50 },
  { rang: 8, nom: "Système de gestion des fichiers", score: 3.7, debut: "Octobre", duree: "3", budget: 100 },
  { rang: 8, nom: "Office 365", score: 3.7, debut: "Avril", duree: "3", budget: 100 },
  { rang: 10, nom: "Plateforme CI/CD", score: 3.1, debut: "Avril", duree: "3", budget: 100 },
  { rang: 10, nom: "Migration vers Azure", score: 3.1, debut: "Août", duree: "5", budget: 200 },
];

const risks = [
  { nom: "Retard maquettes UX", prob: 3, impact: 4, action: "Sprints tampon, prototypage rapide" },
  { nom: "Défaillance prestataire", prob: 2, impact: 5, action: "Backup contractuel, suivi rapproché" },
  { nom: "Rejet UX", prob: 3, impact: 3, action: "Tests utilisateurs itératifs" },
  { nom: "Sécurité données", prob: 2, impact: 4, action: "Audit sécurité, bonnes pratiques" },
  { nom: "Manque de ressources", prob: 3, impact: 3, action: "Renfort ponctuel ESN" },
  { nom: "Conflits parties prenantes", prob: 2, impact: 3, action: "Clarifier rôles (RACI)" },
];

const comms = [
  { public: "Équipe projet", canal: "Daily stand-up", frequence: "Quotidien", responsable: "Scrum Master" },
  { public: "Direction DSI / PMO", canal: "Réunion de suivi", frequence: "Hebdomadaire", responsable: "Chef de projet" },
  { public: "Métiers / MOA", canal: "Comité de pilotage", frequence: "Toutes les 3 semaines", responsable: "Responsable produit" },
  { public: "Utilisateurs finaux", canal: "Newsletter", frequence: "Mensuelle", responsable: "Communication / Produit" },
  { public: "Prestataire (ESN)", canal: "Point technique Teams", frequence: "2 fois/semaine", responsable: "Lead Dev / Chef projet" },
];

const projectKpi = [
  { indicateur: "Avancement du planning", objectif: "≥ 90 % des tâches à l’heure", frequence: "Hebdomadaire", seuil: "< 80 %" },
  { indicateur: "Respect du budget", objectif: "< 100 % consommation", frequence: "Mensuelle", seuil: "> 110 %" },
  { indicateur: "Bugs bloquants", objectif: "0 bug critique", frequence: "À chaque sprint", seuil: "≥ 2" },
  { indicateur: "Satisfaction utilisateurs", objectif: "≥ 80 %", frequence: "Fin de tests", seuil: "< 70 %" },
  { indicateur: "Avancement documentation", objectif: "100 % livrée", frequence: "Toutes les 3 semaines", seuil: "Retard > 1 sprint" },
];

const raci = [
  { livrable: "Charte projet", pmo: "A", cp: "R", moa: "C", tech: "I", rssi: "I" },
  { livrable: "Cahier des charges", pmo: "C", cp: "R", moa: "A", tech: "I", rssi: "I" },
  { livrable: "Plan de communication", pmo: "A", cp: "R", moa: "C", tech: "I", rssi: "I" },
  { livrable: "Gestion des risques", pmo: "A", cp: "R", moa: "C", tech: "C", rssi: "C" },
  { livrable: "Tests fonctionnels", pmo: "C", cp: "R", moa: "A", tech: "C", rssi: "C" },
  { livrable: "Mise en production", pmo: "C", cp: "A", moa: "I", tech: "R", rssi: "C" },
];

function fillTable(id, rows, renderRow) {
  const tbody = document.getElementById(id);
  tbody.innerHTML = rows.map(renderRow).join("");
}

fillTable("kpi-table", kpis, (r) => `<tr><td>${r.objectif}</td><td>${r.kpi}</td><td>${r.cible}</td><td>${r.horizon}</td><td>${r.responsable}</td></tr>`);
fillTable("docs-table", docs, (r) => `<tr><td>${r.doc}</td><td>${r.moment}</td><td>${r.objectif}</td><td>${r.responsable}</td></tr>`);
fillTable("portfolio-table", portfolio, (r) => `<tr><td>${r.rang}</td><td>${r.nom}</td><td>${r.score.toFixed(1)}</td><td>${r.debut}</td><td>${r.duree} mois</td><td>${r.budget}</td></tr>`);
fillTable("risk-table", risks, (r) => `<tr><td>${r.nom}</td><td>${r.prob}</td><td>${r.impact}</td><td>${r.action}</td></tr>`);
fillTable("comms-table", comms, (r) => `<tr><td>${r.public}</td><td>${r.canal}</td><td>${r.frequence}</td><td>${r.responsable}</td></tr>`);
fillTable("project-kpi-table", projectKpi, (r) => `<tr><td>${r.indicateur}</td><td>${r.objectif}</td><td>${r.frequence}</td><td>${r.seuil}</td></tr>`);
fillTable("raci-table", raci, (r) => `<tr><td>${r.livrable}</td><td>${r.pmo}</td><td>${r.cp}</td><td>${r.moa}</td><td>${r.tech}</td><td>${r.rssi}</td></tr>`);

const colors = ["#ff6b4a", "#3ea6ff", "#7ee0a3", "#f2c94c", "#9b51e0", "#2d9cdb"];

const ctxScore = document.getElementById("scoreChart");
new Chart(ctxScore, {
  type: "bar",
  data: {
    labels: portfolio.slice(0, 6).map(p => p.nom),
    datasets: [{
      label: "Score global",
      data: portfolio.slice(0, 6).map(p => p.score),
      backgroundColor: portfolio.slice(0, 6).map((_, i) => colors[i % colors.length]),
      borderRadius: 6,
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 5, ticks: { color: '#9fb3d5' } }, x: { ticks: { color: '#9fb3d5' } } }
  }
});

const ctxRadar = document.getElementById("radarChart");
new Chart(ctxRadar, {
  type: "radar",
  data: {
    labels: ["Importance", "Rentabilité", "Risques", "Charge inversée"],
    datasets: portfolio.slice(0,3).map((p, i) => ({
      label: p.nom,
      data: [
        p.nom.includes("app mobile") ? 5 : 4,
        p.nom.includes("Refonte") ? 5 : 3 + (i % 2),
        5 - i,
        2 + i
      ],
      borderColor: colors[i],
      backgroundColor: colors[i] + "33",
      pointBackgroundColor: colors[i]
    }))
  },
  options: {
    plugins: { legend: { position: 'bottom', labels: { color: '#cdd9f5' } } },
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.08)' },
        grid: { color: 'rgba(255,255,255,0.08)' },
        pointLabels: { color: '#cdd9f5' },
        ticks: { display: false, beginAtZero: true, max: 5 }
      }
    }
  }
});

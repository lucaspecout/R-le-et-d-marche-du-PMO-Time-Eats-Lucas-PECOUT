# Time'Eats PMO – Tableau de bord web

Une page web statique qui met en scène le rapport PMO sous forme de tableaux, graphiques et cartes synthétiques. Le site est servi via Nginx dans un conteneur Docker pour un déploiement rapide.

## Démarrer en local

```bash
# Build
docker build -t timeeats-pmo .

# Run
docker run -p 8080:80 timeeats-pmo
```

Ouvrez ensuite <http://localhost:8080> dans votre navigateur.

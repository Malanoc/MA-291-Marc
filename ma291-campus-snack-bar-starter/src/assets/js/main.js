import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');
const salesPointsContainer = document.querySelector('#sales-points-container');
// TODO task004: ajouter les références DOM nécessaires pour les points de vente
const toggleSalesPointsBtn = document.querySelector('#toggle-sales-points-btn');

// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données
let isSalesPointsVisible = false;
let salesPointsLoaded = false;

loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente
toggleSalesPointsBtn.addEventListener('click', toggleSalesPoints);

// cacher la section au départ
salesPointsContainer.style.display = 'none';

async function loadSnacks() {
  feedback.textContent = '';

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les snacks.';
  }
}

function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');

  // TODO task002: adapter le rendu selon le cahier des charges
}

// TODO task003: créer une fonction loadSalesPoints
async function loadSalesPoints() {
  feedback.textContent = '';

  try {
    const salesPoints = await fetchSalesPoints();
    await displaySalesPoints(salesPoints);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les points de vente.';
  }
}

// TODO task003: créer une fonction displaySalesPoints
async function displaySalesPoints(salesPoints) {

  // charger le template HTML fourni
  const response = await fetch('../../specs/task003/index-sales-points.html');
  const template = await response.text();

  // injecter le template
  salesPointsContainer.innerHTML = template;

  // récupérer la grille
  const grid = salesPointsContainer.querySelector('.sales-points-grid');

  // remplacer le contenu par les données JSON
  grid.innerHTML = salesPoints.map((sale) => `
    <article class="sales-point-card">
      <h3>${sale.building}</h3>
      <p><strong>Salle :</strong> ${sale.room}</p>
      <p><strong>Horaires :</strong> ${sale.openingHours}</p>
      <p><strong>Email :</strong> ${sale.email}</p>
    </article>
  `).join('');
}

async function toggleSalesPoints() {

  // charger une seule fois
  if (!salesPointsLoaded) {
    try {
      await loadSalesPoints();
      salesPointsLoaded = true;
    } catch (error) {
      console.error(error);
      feedback.textContent = 'Impossible de charger les points de vente.';
      return;
    }
  }

  // toggle affichage
  isSalesPointsVisible = !isSalesPointsVisible;

  salesPointsContainer.style.display = isSalesPointsVisible ? 'block' : 'none';

  // change le texte du bouton
  toggleSalesPointsBtn.textContent = isSalesPointsVisible
      ? 'Masquer les points de vente'
      : 'Afficher les points de vente';
}

// TODO task005: afficher un message lisible si le chargement échoue
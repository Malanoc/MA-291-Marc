// Import des fonctions pour récupérer les données
import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

// Récupération des éléments du DOM
const loadSnacksBtn = document.querySelector('#load-snacks-btn'); // bouton pour charger les snacks
const snacksContainer = document.querySelector('#snacks-container'); // conteneur des snacks
const feedback = document.querySelector('#feedback'); // zone d'affichage des messages (erreurs, infos)
const salesPointsContainer = document.querySelector('#sales-points-container'); // conteneur des points de vente
const toggleSalesPointsBtn = document.querySelector('#toggle-sales-points-btn'); // bouton afficher/masquer

// Variables d'état
let isSalesPointsVisible = false; // indique si la section est visible ou non
let salesPointsLoaded = false;   // évite de recharger les données plusieurs fois

// Association des événements aux boutons
loadSnacksBtn.addEventListener('click', loadSnacks);
toggleSalesPointsBtn.addEventListener('click', toggleSalesPoints);

// Cache la section des points de vente au chargement de la page
salesPointsContainer.style.display = 'none';


// ===================== SNACKS =====================

// Fonction appelée au clic sur "Load snacks"
async function loadSnacks() {
  feedback.textContent = ''; // reset message utilisateur

  try {
    const snacks = await fetchSnacks(); // récupération des données
    displaySnacks(snacks); // affichage
  } catch (error) {
    console.error(error); // debug console
    feedback.textContent = 'Impossible de charger les snacks.'; // message utilisateur
  }
}

// Affichage des snacks dans le DOM
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
}


// ===================== POINTS DE VENTE =====================

// Charge les données des points de vente
async function loadSalesPoints() {
  feedback.textContent = ''; // reset message

  try {
    const salesPoints = await fetchSalesPoints(); // fetch JSON
    await displaySalesPoints(salesPoints); // affichage avec template

  } catch (error) {
    console.error(error); // debug

    // message visible pour l'utilisateur
    feedback.textContent = 'Impossible de charger les points de vente.';

    // on vide le conteneur pour éviter d'afficher du contenu cassé
    salesPointsContainer.innerHTML = '';
  }
}


// Affiche les points de vente en utilisant le template HTML fourni
async function displaySalesPoints(salesPoints) {

  // Chargement du template HTML externe
  const response = await fetch('../../specs/task003/index-sales-points.html');
  const template = await response.text();

  // Injection du template dans la page
  salesPointsContainer.innerHTML = template;

  // Sélection de la grille à l'intérieur du template
  const grid = salesPointsContainer.querySelector('.sales-points-grid');

  // Remplacement du contenu exemple par les données réelles
  grid.innerHTML = salesPoints.map((sale) => `
    <article class="sales-point-card">
      <h3>${sale.building}</h3>
      <p><strong>Salle :</strong> ${sale.room}</p>
      <p><strong>Horaires :</strong> ${sale.openingHours}</p>
      <p><strong>Email :</strong> ${sale.email}</p>
    </article>
  `).join('');
}


// ===================== Toggle boutton qui appelle loadSalesPoints =====================

// Fonction pour afficher / masquer les points de vente
async function toggleSalesPoints() {

  // Si les données ne sont pas encore chargées → on les charge UNE seule fois
  if (!salesPointsLoaded) {
    try {
      await loadSalesPoints(); // fetch + affichage
      salesPointsLoaded = true; // on marque comme chargé

    } catch (error) {
      console.error(error);
      feedback.textContent = `Impossible de charger les points de vente.`;
      return; // on stop si erreur
    }
  }

  // Inverse l'état (visible / caché)
  isSalesPointsVisible = !isSalesPointsVisible;

  // Applique l'affichage
  salesPointsContainer.style.display = isSalesPointsVisible ? 'block' : 'none';

  // Met à jour le texte du bouton
  toggleSalesPointsBtn.textContent = isSalesPointsVisible
      ? 'Masquer les points de vente'
      : 'Afficher les points de vente';
}
import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données

loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente

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
// TODO task003: créer une fonction displaySalesPoints
// TODO task005: afficher un message lisible si le chargement échoue

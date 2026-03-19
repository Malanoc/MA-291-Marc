export default async function fetchSalesPoints() {
  const response = await fetch('../../data/points-of-sale.json');

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des points de vente');
  }

  return await response.json();
}
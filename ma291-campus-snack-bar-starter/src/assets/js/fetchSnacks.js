export default async function fetchSnacks() {
  const response = await fetch('../../data/snacks.json');

  if (!response.ok) {
    throw new Error(`Unable to load snacks: ${response.status}`);
  }

  return response.json();
}

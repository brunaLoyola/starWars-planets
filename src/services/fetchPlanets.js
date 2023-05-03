export const fetchPlanets = async () => {
  const data = await fetch('https://swapi.dev/api/planets');
  const planets = await data.json();
  const { results } = planets;
  return results;
};

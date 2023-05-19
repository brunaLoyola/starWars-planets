import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const tabela = ['name', 'rotation_period', 'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url'];
function Table() {
  const { planets, search, filters } = useContext(PlanetsContext);
  const mappedFiltersArray = filters.map((filter) => {
    const { columnFilter, comparison, number } = filter;
    return `${columnFilter} ${comparison} ${number}`;
  });
  return (
    <>
      {filters !== null && (
        mappedFiltersArray.map((mapped, index) => (
          <div data-testid="filter" key={ index }>
            <p>
              {mapped}
            </p>
            {/* <button
              data-testid="buttonDelete"
              value={ JSON.stringify(filters[index]) }
              onClick={ ({ target }) => removeFilter(JSON.parse(target.value)) }
            >
              🗑

            </button> */}
          </div>
        ))
      )}
      <section>
        <table>
          <thead>
            <tr>
              {tabela.map((coluna) => (
                <th key={ coluna }>{coluna}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planets.filter((e) => (e.name.includes(search))).map((item, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Table;

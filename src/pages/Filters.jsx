import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    search,
    setSearch,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparasion,
    setComparasion,
    number,
    setNumber } = useContext(PlanetsContext);
  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="Pesquisa"
          value={ search }
          data-testid="name-filter"
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </section>
      <form>
        <select
          name="colum-filter"
          id="colum-filter"
          value={ columnFilter }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparasion }
          onChange={ ({ target }) => setComparasion(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          min={ 0 }
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ buttonFilter }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Filters;

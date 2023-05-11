import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanets } from '../services/fetchPlanets';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [planets, setInfoPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setInfoPlanets(response);
    }
    fetchData();
  }, []);

  const buttonFilter = useCallback(() => {
    if (comparison.includes('maior que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       > Number(number));
      setInfoPlanets(filter);
      setFilters([...filters,
        { columnFilter, comparison, number }]);
    } else if (comparison.includes('menor que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
      < Number(number));
      setInfoPlanets(filter);
      setFilters([...filters,
        { columnFilter, comparison, number }]);
    } else if (comparison.includes('igual a')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       === Number(number));
      setInfoPlanets(filter);
      setFilters([...filters,
        { columnFilter, comparison, number }]);
    }
  }, [columnFilter, comparison, number, planets, filters]);

  const values = useMemo(() => ({
    planets,
    search,
    setSearch,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparison,
    setComparison,
    number,
    setNumber,
  }), [search,
    setSearch,
    planets,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparison,
    setComparison,
    number,
    setNumber,
  ]);

  return (
    <PlanetsContext.Provider value={ values }>
      <div>
        { children }
      </div>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

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
  const [sort, setSort] = useState('ASC');
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

  const handleButtonSort = useCallback(() => {
    if (sort.includes('ASC')) {
      const unknown = planets.filter((e) => e[columnFilter] === 'unknown');
      const exist = planets.filter((e) => e[columnFilter] !== 'unknown');
      const arraysort = exist.sort((a, b) => Number(a[columnFilter])
      - Number(b[columnFilter]));
      setInfoPlanets([...arraysort, ...unknown]);
      setFilters([...filters,
        { columnFilter, sort }]);
    } else if (sort.includes('DESC')) {
      const unknown = planets.filter((e) => e[columnFilter] === 'unknown');
      const exist = planets.filter((e) => e[columnFilter] !== 'unknown');
      const arraysort = exist
        .sort((a, b) => Number(b[columnFilter]) - Number(a[columnFilter]));
      setInfoPlanets([...arraysort, ...unknown]);
      setFilters([...filters,
        { columnFilter, sort }]);
    }
  }, [columnFilter, sort, filters, planets]);

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
    setSort,
    handleButtonSort,
    setNumber,
  }), [search,
    setSearch,
    planets,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparison,
    setComparison,
    setSort,
    number,
    handleButtonSort,
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

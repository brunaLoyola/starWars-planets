import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanets } from '../services/fetchPlanets';
import PlanetsContext from './PlanetsContext';

const columnIncial = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];
function PlanetsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [planets, setInfoPlanets] = useState([]);
  const [initialStateApi, setInitialStateApi] = useState([]);
  const [filtersColumn, setFiltersColumn] = useState(columnIncial);
  const [columnFilter, setColumnFilter] = useState('population');
  const [columnFilterSort, setColumnFilterSort] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [sort, setSort] = useState('ASC');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setInfoPlanets(response);
      setInitialStateApi(response);
    }
    fetchData();
  }, []);

  const buttonFilter = useCallback(() => {
    if (comparison.includes('maior que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       > Number(number));
      setInfoPlanets(filter);
    } if (comparison.includes('menor que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
      < Number(number));
      setInfoPlanets(filter);
    } if (comparison.includes('igual a')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       === Number(number));
      setInfoPlanets(filter);
    }
    const returnColumn = filtersColumn.filter((filterCol) => filterCol !== columnFilter);
    setFiltersColumn(returnColumn);
    setColumnFilter(returnColumn[0]);
    setComparison('maior que');
    setNumber(0);
    setFilters([...filters,
      { columnFilter, comparison, number }]);
  }, [columnFilter, comparison, number, planets, filters, filtersColumn]);

  const handleButtonSort = useCallback(() => {
    if (sort.includes('ASC')) {
      const unknown = planets.filter((e) => e[columnFilterSort] === 'unknown');
      const exist = planets.filter((e) => e[columnFilterSort] !== 'unknown');
      const arraysort = exist.sort((a, b) => Number(a[columnFilterSort])
      - Number(b[columnFilterSort]));
      setInfoPlanets([...arraysort, ...unknown]);
      setFilters([...filters,
        { columnFilterSort, sort }]);
    } if (sort.includes('DESC')) {
      const unknown = planets.filter((e) => e[columnFilterSort] === 'unknown');
      const exist = planets.filter((e) => e[columnFilterSort] !== 'unknown');
      const arraysort = exist
        .sort((a, b) => Number(b[columnFilterSort]) - Number(a[columnFilterSort]));
      setInfoPlanets([...arraysort, ...unknown]);
      setFilters([...filters,
        { columnFilterSort, sort }]);
    }
  }, [columnFilterSort, sort, filters, planets]);

  // const removeFilter = useCallback((value) => {
  //   const column = value.columnFilter;
  //   setFiltersColumn([...filtersColumn, column]);
  //   const newFilters = [...filters];
  //   const index = newFilters.indexOf(value);
  //   newFilters.splice(index, 1);
  //   setFilters(newFilters);

  //   let filteredPlanets = initialStateApi;
  //   newFilters.forEach((filter) => {
  //     const columnFilterAtt = filter.columnFilter;
  //     const comparisonAtt = filter.comparison;
  //     const numberAtt = filter.number;
  //     filteredPlanets = filteredPlanets.filter((planet) => {
  //       if (comparisonAtt.includes('maior que')) {
  //         return Number(planet[columnFilterAtt]) > Number(numberAtt);
  //       } if (comparisonAtt.includes('menor que')) {
  //         return Number(planet[columnFilterAtt]) < Number(numberAtt);
  //       } if (comparisonAtt.includes('igual a')) {
  //         return Number(planet[columnFilterAtt]) === Number(numberAtt);
  //       }
  //       return true;
  //     });
  //   });
  //   setInfoPlanets(filteredPlanets);
  // }, [filters, filtersColumn, initialStateApi]);

  const handleDeleteAllFilters = useCallback(() => {
    setInfoPlanets(initialStateApi);
    setFilters([]);
  }, [initialStateApi]);

  const values = useMemo(() => ({
    planets,
    search,
    setSearch,
    buttonFilter,
    setColumnFilterSort,
    columnFilter,
    setColumnFilter,
    comparison,
    filtersColumn,
    setFiltersColumn,
    setComparison,
    number,
    setSort,
    handleButtonSort,
    setNumber,
    // removeFilter,
    filters,
    handleDeleteAllFilters,
  }), [search,
    setSearch,
    handleDeleteAllFilters,
    filtersColumn,
    setFiltersColumn,
    planets,
    // removeFilter,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparison,
    setComparison,
    setSort,
    number,
    handleButtonSort,
    setNumber,
    filters,
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

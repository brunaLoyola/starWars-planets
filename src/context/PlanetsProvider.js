import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanets } from '../services/fetchPlanets';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [planets, setInfoPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparasion, setComparasion] = useState('maior que');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setInfoPlanets(response);
    }
    fetchData();
  }, []);

  const buttonFilter = useCallback(() => {
    if (comparasion.includes('maior que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       > Number(number));
      setInfoPlanets(filter);
    } else if (comparasion.includes('menor que')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
      < Number(number));
      setInfoPlanets(filter);
    } else if (comparasion.includes('igual a')) {
      const filter = planets.filter((planet) => Number(planet[columnFilter])
       === Number(number));
      setInfoPlanets(filter);
    }
  }, [columnFilter, comparasion, number, planets]);

  const values = useMemo(() => ({
    planets,
    search,
    setSearch,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparasion,
    setComparasion,
    number,
    setNumber,
  }), [search,
    setSearch,
    planets,
    buttonFilter,
    columnFilter,
    setColumnFilter,
    comparasion,
    setComparasion,
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

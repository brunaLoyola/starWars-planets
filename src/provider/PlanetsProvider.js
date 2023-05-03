import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanets } from '../services/fetchPlanets';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setInfoPlanets] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setInfoPlanets(response);
    }
    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      <div>
        { children }
        {console.log(planets)}
      </div>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

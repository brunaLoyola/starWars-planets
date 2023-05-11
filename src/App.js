import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Filters from './pages/Filters';

export default function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

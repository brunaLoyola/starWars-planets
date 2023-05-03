import React from 'react';
import PlanetsProvider from './provider/PlanetsProvider';
import Table from './components/Table';

export default function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mock from './mock';


const tableHeader = ['Name', 'Rotation Period', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'URL'];

describe('Teste a página de Formuláro', () => {
 beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock),
    });
  });

  it("Deve testar se aparece o cabeçalho corretamente da tabela e as linhas também", async () => {
    render(
      <PlanetsProvider>
          <App />
      </PlanetsProvider>
    );

    const header = screen.getAllByRole("columnheader");
    expect(header).toHaveLength(13);

    await waitFor(() => {
      const tatooine = screen.getByRole("cell", { name: /tatooine/i });
      expect(tatooine).toBeInTheDocument();
    });
  });

  it('Deve filtrar os planetas por nome', async () => {
    render(
      <PlanetsProvider>
          <App />
      </PlanetsProvider>
    );

    await waitFor(() => {
      const tatooine = screen.getByRole("cell", { name: /tatooine/i });
      expect(tatooine).toBeInTheDocument();
    });

    const nameFilter = screen.getByRole('textbox');
    expect(nameFilter).toBeInTheDocument();

    userEvent.type(nameFilter, 'o');    
    const planets = ['Tatooine', 'Hoth', 'Dagobah', 'Endor', 'Naboo', 'Coruscant', 'Kamino'];
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(8);
    planets.forEach((planet) => {
      expect(screen.getByRole('cell', { name: new RegExp(`^${planet}$`, 'i') })).toBeInTheDocument();
    });

    userEvent.type(nameFilter, 'o');
    const row = screen.getAllByRole('row');
    expect(row).toHaveLength(3);
    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /naboo/i })).toBeInTheDocument();
  });

  it('Deve testar se filtra e deleta da forma correta', async () => {
    render(
      <PlanetsProvider>
          <App />
      </PlanetsProvider>
    );

    await waitFor(() => {
      const tatooine = screen.getByRole("cell", { name: /tatooine/i });
      expect(tatooine).toBeInTheDocument();
    });

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');

    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '9000');

    const filtrar = screen.getByRole('button', {name: /filtrar/i});
    expect(filtrar).toBeInTheDocument();
    userEvent.click(filtrar);

    // const apagar = screen.getByTestId("buttonDelete");
    // expect(apagar).toBeInTheDocument();
    // userEvent.click(apagar);
    // expect(apagar).not.toBeInTheDocument();

    userEvent.clear(value);
    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '1000000');
    userEvent.click(filtrar);

    userEvent.clear(value);
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '23');
    userEvent.click(filtrar);

    const apagarTudo = screen.getByTestId("button-remove-filters");
    expect(apagarTudo).toBeInTheDocument();
    userEvent.click(apagarTudo);
  });

  it('Filtra os planetas de forma ascendente', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();

    const planets = screen.getAllByTestId('planet-name');
    expect(planets[0]).toContainHTML('Tatooine')

    const columnSort = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc')
    const buttonSort = screen.getByTestId('column-sort-button')

    expect(columnSort).toBeInTheDocument()
    expect(inputAsc).toBeInTheDocument()
    expect(buttonSort).toBeInTheDocument()

    userEvent.selectOptions(columnSort, 'population')
    userEvent.click(inputAsc);
    userEvent.click(buttonSort);

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName[0].textContent).toBe('Yavin IV')
    expect(planetName[1].textContent).toBe('Tatooine')
  })
  it('Filtra os planetas de forma descendente', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
  
    const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
  
    const planets = screen.getAllByTestId('planet-name');
    expect(planets[0].textContent).toBe('Tatooine');
  
    const columnSort = screen.getByTestId('column-sort');
    const inputDesc = screen.getByTestId('column-sort-input-desc')
    const buttonSort = screen.getByTestId('column-sort-button')
  
    expect(columnSort).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(buttonSort).toBeInTheDocument();
  
    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(inputDesc);
    userEvent.click(buttonSort);
  
    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName[0].textContent).toBe('Coruscant');
    expect(planetName[1].textContent).toBe('Naboo');
  });
  it('Deve apagar o item correto', async () => {
    render(
      <PlanetsProvider>
          <App />
      </PlanetsProvider>
    );

    const column = await screen.findByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const filter = screen.getByTestId('button-filter')

    const planetName = await screen.findAllByTestId('planet-name');
    expect(planetName[0].textContent).toBe('Tatooine');
    expect(planetName[1].textContent).toBe('Alderaan');

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.clear(value)
    userEvent.type(value, '26')
    userEvent.click(filter)

    expect(planetName[0].textContent).toBe('Naboo');

  //   const removeAllFiltersBtn = screen.getByRole('button', {  name: /🗑/i})
  //   userEvent.click(removeAllFiltersBtn)

  //   expect(planetName[0].textContent).toBe('Tatooine');
  })
})
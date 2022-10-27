import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('30%',()=>{
it('testing app', () => {
    render(<App />);
  const name=screen.getByText(/Name/i);
  const rotation=screen.getByText(/Rotation Period/i);
  const orbital=screen.getByText(/Orbital Period/i);
  const diameter=screen.getByText('Diameter');
  const climate=screen.getByText(/Climate/i);
  const gravity=screen.getByText(/Gravity/i);
  const terrrain=screen.getByText(/terrain/i);
  const surface=screen.getByText(/Surface Water/i);
  const population=screen.getByText('Population');
  const films=screen.getByText(/Films/i);
  const created=screen.getByText(/Created/i);
  const Edited=screen.getByText(/Edited/i);
  const url=screen.getByText(/URL/i);

  expect(name).toBeInTheDocument();
  expect(rotation).toBeInTheDocument();
  expect(orbital).toBeInTheDocument();
  expect(diameter).toBeInTheDocument();
  expect(climate).toBeInTheDocument();
  expect(gravity).toBeInTheDocument();
  expect(terrrain).toBeInTheDocument();
  expect(surface).toBeInTheDocument();
  expect(population).toBeInTheDocument();
  expect(films).toBeInTheDocument();
  expect(created).toBeInTheDocument();
  expect(Edited).toBeInTheDocument();
  expect(url).toBeInTheDocument();
});
it('all filters equals to  ', async() => {
  global.fetch=jest.fn(async()=>({
  }))

  await act(async () => {
    render(<App/>);
  });

  const comparison=screen.getByTestId("comparison-filter");
  const value=screen.getByTestId("value-filter");
  const column=screen.getByTestId("column-filter");
  const button=screen.getByRole('button',{ name: /Filtrar/i });

  userEvent.selectOptions(column, 'orbital_period');
  userEvent.selectOptions(comparison, 'igual a');

  userEvent.type(value,'364');

  userEvent.click(button);

const deleteFiltro = screen.getByRole('button', {
    name:'X'
  });

  await userEvent.click(deleteFiltro);
});
it('all filter ', async() => {
  global.fetch=jest.fn(async()=>({
  }))

  await act(async () => {
    render(<App/>);
  });

  const comparison=screen.getByTestId("comparison-filter");
  const value=screen.getByTestId("value-filter");
  const column=screen.getByTestId("column-filter");

  userEvent.selectOptions(column, 'rotation_period');
  userEvent.selectOptions(comparison, 'menor que');

  userEvent.type(value,'24');

  const button=screen.getByRole('button',{ name: /Filtrar/i });
  userEvent.click(button);
});
it('filter column parameter', async() => {
  global.fetch=jest.fn(async()=>({
  }))

  await act(async () => {
    render(<App/>);
  });

  const column=screen.getByTestId("column-filter");
  userEvent.selectOptions(column, 'population');
  const comparison=screen.getByTestId("comparison-filter");
  userEvent.selectOptions(comparison, 'maior que');
  const value=screen.getByTestId("value-filter");
  userEvent.type(value,'1000');
  const button=screen.getByRole('button',{ name: /Filtrar/i });
  userEvent.click(button);
  const deleteFiltros = screen.getByRole('button', {
    name: /Excluir/i
  });

  expect(deleteFiltros).toBeInTheDocument();

  await userEvent.click(deleteFiltros);

  setTimeout(()=>expect(todosPlanetas).toHaveLength(10),1000);
});
});

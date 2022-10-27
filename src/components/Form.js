import { useContext } from 'react';
import AppContext from '../context/AppContext';

const arrayOfColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Form() {
  const { data, filteredData, setFilteredData, inputText, setInputText,
    columnFilter, setColumnFilter, comparisonFilter, setComparisonFilter,
    number, setNumber, columnNew, setColumnNew,
    filters, setFilters } = useContext(AppContext);

  const filterByPopulation = (
    d = filteredData,
    f = columnFilter,
    c = comparisonFilter,
    n = number,
  ) => {
    const newData = d.filter((planets) => {
      switch (c) {
      case 'maior que':
        setColumnNew(columnNew.filter((e) => e !== f));
        setColumnFilter(columnNew[0]);
        return Number(planets[f]) > Number(n);
      case 'menor que':
        setColumnNew(columnNew.filter((e) => e !== f));
        setColumnFilter(columnNew[0]);
        return Number(planets[f]) < Number(n);
      default:
        setColumnNew(columnNew.filter((e) => e !== f));
        setColumnFilter(columnNew[0]);
        return Number(planets[f]) === Number(n);
      }
    });
    return newData;
  };

  // const refreshFilters = () => {

  //   setFilteredData(filterByPopulation());
  // };

  const handleClick = () => {
    // chamando o filterByPopulation --> mudando a tabela
    setFilteredData(filterByPopulation());
    const newFilter = { columnFilter, comparisonFilter, number };
    setFilters([...filters, newFilter]);
  };

  const deleteFiltros = () => {
    setFilteredData(data);
    setColumnNew(arrayOfColumn);
    setFilters([]);
  };

  const deleteFiltro = (element) => {
    const filter = filters.filter((e) => e.columnFilter !== element.columnFilter);
    setFilters(filter);
    setColumnNew([...columnNew, element.columnFilter]);
    if (filter.length) {
      filter.forEach((f, i) => {
        if (i === 0) {
          setFilteredData(
            filterByPopulation(data, f.columnFilter, f.comparisonFilter, f.number),
          );
        } else {
          setFilteredData(
            filterByPopulation(null, f.columnFilter, f.comparisonFilter, f.number),
          );
        }
      });
    } else { setFilteredData(data); }
  };

  return (
    <form>
      <label htmlFor="pesquisa">
        <input
          data-testid="name-filter"
          type="text"
          id="pesquisa"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </label>
      <label className="inputs" htmlFor="columnfilter">
        <select
          className="inputs"
          name="columnfilter"
          id="columnfilter"
          value={ columnFilter }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {columnNew.map((values, index) => (
            <option key={ index } value={ values }>{ values }</option>
          ))}
        </select>
      </label>
      <label className="inputs" htmlFor="comparison-filter">

        <select
          className="inputs"
          name="comparison-filter"
          id="comparison-filter"
          value={ comparisonFilter }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          type="number"
          id="number"
          value={ number }
          data-testid="value-filter"
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteFiltros }
      >
        Excluir
      </button>
      <div>
        <p>Filtros Selecionados:</p>
        {
          filters?.map((e, i) => (
            <div data-testid="filter" key={ i }>
              <p>{`${e.columnFilter} ${e.comparisonFilter} ${e.number}`}</p>
              <button
                type="button"
                onClick={ () => deleteFiltro(e) }
              >
                X
              </button>

            </div>
          ))
        }
      </div>
    </form>
  );
}

export default Form;

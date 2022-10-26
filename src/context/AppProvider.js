import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const arrayOfColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columnNew, setColumnNew] = useState(arrayOfColumn);
  const [columnFilter, setColumnFilter] = useState(arrayOfColumn[0]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const nova = results.filter((e) => e !== e.residents);
      setData(nova);
      setFilteredData(nova);
    };
    requestApi();
  }, []);

  const contexto = useMemo(() => ({
    data,
    setData,
    filteredData,
    setFilteredData,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    number,
    setNumber,
    columnNew,
    setColumnNew,
    filters,
    setFilters,
  }), [data, filteredData, inputText, columnFilter, comparisonFilter,
    number, columnNew, filters]);

  return (
    <AppContext.Provider value={ contexto }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;

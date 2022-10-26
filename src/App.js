import React from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Form />
      <Table />
    </AppProvider>
  );
}

export default App;

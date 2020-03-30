import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router'
import AddSale from '../AddSaleComponent/AddSale'

function App() {
  return (
    <div className="container-fluid">
      <h1 className="col-xs-6">Charter Sales Assignment</h1>
      <BrowserRouter>
      <Route exact component={AddSale}></Route>
    </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation'
import CarsList from './components/CarsList'
import CreateCar from './components/CreateCar'
import CreateUser from './components/CreateUser'
import Search from './components/Search'

function App() {
  return (
    <Router>
      <Navigation />
      <Search />

      <div className="container p-4">
        <Route path="/" exact component={CarsList} />
        <Route path="/edit/:id" component={CreateCar} />
        <Route path="/create" component={CreateCar} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

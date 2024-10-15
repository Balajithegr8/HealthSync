import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          
          <Route path="/" exact component={LoginRegister} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

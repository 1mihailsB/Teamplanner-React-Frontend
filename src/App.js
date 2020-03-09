import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import Account from './Components/Account'
import About from './Components/About'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserProvider} from './State/UserContext'

function App() {
  return (
    
    <UserProvider>
      <Router>
      <Nav />
      <Switch>
          <Route exact path="/about" exact component={About}/>
          <Route exact path="/account" exact component={Account}/>
      </Switch>
      </Router>
    </UserProvider>
    
  );
}

export default App;

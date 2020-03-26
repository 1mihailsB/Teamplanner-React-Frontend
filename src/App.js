import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import Account from './Components/Account'
import About from './Components/About'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserProvider} from './State/UserContext'
import Unauthorized from './Components/Unauthorized';
import {ProtectedRoute} from './Components/ProtectedRoute'

function App() {
  return (
    
    <UserProvider>
      <Router>
      <Nav />
      <Switch>
          <Route path="/unauthorized" component={Unauthorized} />
          <ProtectedRoute path="/about" component={About}/>
          <ProtectedRoute path="/account" component={Account} />
          {/* <Route exact path="/about" exact >
            <About />
          </Route>
          <Route exact path="/account" exact component={Account}/>
           */}
         
      </Switch>
      </Router>
    </UserProvider>
    
  );
}

export default App;

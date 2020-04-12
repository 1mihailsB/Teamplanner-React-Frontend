import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import Account from './Components/Account'
import Games from './Components/Games'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserProvider} from './State/UserContext'
import Unauthorized from './Components/Unauthorized';
import Home from './Components/Home';
import {ProtectedRoute} from './Components/ProtectedRoute'
import ChooseNickname from './Components/Forms/ChooseNickname'
import CreatePlan from './Components/Forms/CreatePlan'

function App() {
  return (
    
    <UserProvider>
      <Router>
      <Nav />
      <div className="container" id="main-container">
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/unauthorized" component={Unauthorized} />
          <ProtectedRoute path="/games" component={Games}/>
          <ProtectedRoute path="/createPlan" component={CreatePlan} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/chooseNickname" component={ChooseNickname}/>
      </Switch>
      </div>
      </Router>
    </UserProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import Account from './Components/Account'
import Games from './Components/Games'
import Game from './Components/Game'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserProvider} from './State/UserContext'
import Unauthorized from './Components/Unauthorized';
import Home from './Components/Home';
import {ProtectedRoute} from './Components/ProtectedRoute'
import ChooseNickname from './Components/Forms/ChooseNickname'
import CreatePlan from './Components/Forms/CreatePlan'
import EditPlanText from './Components/Forms/EditPlanText'
import Friends from "./Components/Friends"
import AddFriend from "./Components/Forms/AddFriend"

function App() {
  return (
    
    <UserProvider>
      <Router>
        <Nav />
        <div className="container" id="main-container">
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/unauthorized" component={Unauthorized} />
              <ProtectedRoute path="/chooseNickname" component={ChooseNickname}/>
              <ProtectedRoute path="/games" exact component={Games}/>
              <ProtectedRoute path="/game/:id" exact component={Game} />
              <ProtectedRoute path="/createPlan" component={CreatePlan} />
              <ProtectedRoute path="/editPlan/:id" exact component={EditPlanText} />
              <ProtectedRoute path="/account" component={Account} />
              <ProtectedRoute path="/friends" component={Friends} />
              <ProtectedRoute path="/addFriend" component={AddFriend} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

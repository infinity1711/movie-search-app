import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import MDetails from './components/movie-details/details';
import Favourites from './components/favourites/favourites';
import NavBar from './components/navbar/navbar';

import { withRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="main">
          <Switch>
            <Route exact path="/" render={props => (<Dashboard />)} />
            <Route path="/details" render={props => (<MDetails />)} />
            <Route path="/favourites" render={props => (<Favourites />)} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;

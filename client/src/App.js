import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import FacebookLogin from './components/FacebookLogin';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import LogInPage from './components/LogInPage/TabsPage';
import AuthPage from './pages/AuthPage/AuthPage';
// import Example from './components/Nav/Nav';
import Home from './pages/homepage/home';
import JoinGame from './pages/JoinGame/JoinGame';
import Enrollcam from './pages/Enrollcam/Enrollcam';
import Verifycam from './pages/Enrollcam/Enrollcam';
import CreateGame from './pages/CreateGame/CreateGame';
import CurrentGame from './pages/CurrentGame/CurrentGame';
// import { Card, Button, CardHeader, CardFooter, CardBody,
// CardTitle, CardText } from 'reactstrap';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Route path="/" exact render={
            () => {
              return (<div>
                <AuthPage></AuthPage>
                <FacebookLogin></FacebookLogin>
              </div>)
            }
          } />

          <Route path="/home" exact render={
            () => {
              return (<Home />)
            }
          } />

          <Route path="/JoinGame" exact render={
            () => {
              return (<JoinGame />)
            }
          } />
          {/*<Example />*/}
          {/*<TabsPage></TabsPage>
           <FacebookLogin />*/}
           <Route path="/creategame" exact render={
            () => {
              return (<CreateGame />)
            }
          } />
          <Route path="/currentgame" exact render={
            () => {
              return (<CurrentGame />)
            }
          } />
           <Route path="/enrollcam" exact render={
            () => {
              return ( <Enrollcam /> )
            }
          } />
          <Route path="/verifycam" exact render={
            () => {
              return ( <Verifycam/> )
            }
          } />




        </div>
      </Router>
    );
  }
}

export default App;

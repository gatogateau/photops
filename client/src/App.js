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
<<<<<<< HEAD
import GamePage from './pages/GamePage/GamePage';
import 'whatwg-fetch';
import {
  getFromStorage
} from './Utils/storage';
=======
import Enrollcam from './pages/Enrollcam/Enrollcam';
import Verifycam from './pages/Verifycam/Verifycam';
import CreateGame from './pages/CreateGame/CreateGame';
import CurrentGame from './pages/CurrentGame/CurrentGame';
>>>>>>> master
// import { Card, Button, CardHeader, CardFooter, CardBody,
// CardTitle, CardText } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: ''
    };
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      //very token
      fetch('/api/account/verify?token' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            })
          }
        });
    } else {
      this.setState({
        isLoading: false
      })
    }

  }

  render() {
    const {
      // isLoading,
      token,
      // signInError,
      // signUpError
    } = this.state;


    if (!token) {
      return (
        <div>
          <AuthPage />
        </div>
      );
    }

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
          <Route path="/GamePage" exact render={
            () => {
              return (<GamePage />)
            }
          } />
          
          
          
          </div>
          </Router>
        );
        
      }
    }
    
    export default App;
    
    // <Example />
    // <TabsPage></TabsPage>
    // <FacebookLogin />
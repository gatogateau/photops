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
import Verifycam from './pages/Verifycam/Verifycam';
import CreateGame from './pages/CreateGame/CreateGame';
import CurrentGame from './pages/CurrentGame/CurrentGame';
import axios from 'axios';
// import { Card, Button, CardHeader, CardFooter, CardBody,
// CardTitle, CardText } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      userName: '',
      password: '',
      redirectTo: null,
      login: this.login,
      signUp: this.signUp,
      handleChange: this.handleChange
    }

    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login(event) {
    event.preventDefault()
    console.log('handleSubmit')
    // added login
    axios
      .post('/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          // this.props.updateUser({
          //     loggedIn: true,
          //     username: response.data.username
          // })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/home'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }
  signUp(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/api/users/allUsers', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          // this.props.updateUser({
          //     loggedIn: true,
          //     username: response.data.username
          // })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/home'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }

  //login function

  //sign up function

  render() {
    return (
      // if true, render this router, if false send back to login

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
              return (<Enrollcam />)
            }
          } />
          <Route path="/verifycam" exact render={
            () => {
              return (<Verifycam />)
            }
          } />




        </div>
      </Router>
    );
  }
}

export default App;

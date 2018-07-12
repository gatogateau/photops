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
import passport from 'passport';
// import { Card, Button, CardHeader, CardFooter, CardBody,
// CardTitle, CardText } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      username: '',
      redirectTo: null,
    }

    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount = () => {
    this.isLoggedIn();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isLoggedIn() {
    axios
      .get('/api/login/isLoggedIn')
      .then(response => {
        console.log(response)
        if(response.data.loggedIn){
          this.setState({
            loggedIn: response.data.loggedIn,
            username: response.data.username,
            redirectTo: response.data.redirectTo
          });
        } else {
          this.setState({
            loggedIn: false,
            username:'',
          })
        }

      }).catch(error => {
        console.log(error);

      })
  }

  logOut = (event) => {
    console.log("hit")
    event.preventDefault();
    axios
      .get('/api/login/logOut')
      .then(response => {
        console.log(response)
        this.setState({
          loggedIn: response.data.loggedIn,
          username: response.data.username,
          redirectTo: response.data.redirectTo
        });
        window.location.pathname = '/';
      }).catch(error => {
        console.log(error);
      })
  }

  login(event, username, password) {
    event.preventDefault()
    console.log('handleSubmit')
    // added login
    axios
      .post('/api/login', {
        username: username,
        password: password
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
            loggedIn: true,
            username: response.data.username,
            redirectTo: '/home'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }
  signUp(event, username, password) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/api/users/allUsers', {
        username: username,
        password: password
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
    console.log(this)
    return (
      // if true, render this router, if false send back to login
      //<Route path="/abc" render={()=><TestWidget num="2" someProp={100}/>}/>
      <Router>
        <div className="App">

          <Route path="/" exact render={
            () => {
              return (<div>

                <AuthPage login={this.login} redirectTo={this.state.redirectTo} signUp={this.signUp} ></AuthPage>
              </div>)
            }
          } />

          <Route path="/home" exact render={
            () => {
              return (<Home logOut={this.logOut} loggedIn={this.state.loggedIn} username={this.state.username}/>)
            }
          } />

          <Route path="/JoinGame" exact render={
            () => {
              return (<JoinGame username={this.state.username}/>)
            }
          } />
          {/*<Example />*/}
          {/*<TabsPage></TabsPage>
           <FacebookLogin />*/}
          <Route path="/creategame" exact render={
            () => {
              return (<CreateGame username={this.state.username}/>)
            }
          } />
          <Route path="/currentgame" exact render={
            () => {
              return (<CurrentGame username={this.state.username}/>)
            }
          } />
          <Route path="/enrollcam" exact render={
            () => {
              return (<Enrollcam username={this.state.username} />)
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

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
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
import StartGame from './pages/StartGame/StartGame';
import axios from 'axios';
// import { Card, Button, CardHeader, CardFooter, CardBody,
// CardTitle, CardText } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      username: '',
      redirectTo: null,
      target: '',
      targetURL: '',
      currentGame: '',
      getCurrentGame: this.getCurrentGame
    }

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
  }

  componentWillMount = () => {
    this.isLoggedIn();
    this.getTarget();
    this.getCurrentGame();
  }
  componentDidlMount = () => {
    this.isLoggedIn();
    this.getTarget();
    this.getCurrentGame();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  getCurrentGame = () => {
    axios
    .get('/api/game/updateActiveGames')
    .then(response => {
      console.log(response)
      if(response.data){
        this.setState({
          currentGame: response.data.activeGames,
        });
      }
    }).catch(error => {
      console.log(error);
      
    })
    console.log("this is the current game on state " +this.state.currentGame)
  }
  
  getTarget() {
    axios
    .get('/api/users/userTargets')
    .then(response => {
      console.log(response)
      if(response.data){
        this.setState({
          target: response.data.target,
        });
        this.snagPhotos();
      }
    }).catch(error => {
      console.log(error);
      
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
  
  snagPhotos() {
    let that = this;
    console.log("this is supposed to be the target " +typeof(this.state.target));
    axios
      .post('/api/users/snagPhotos', {
        username: that.state.target
      })
      .then(response => {
        console.log(response)
        if(response.data){
          this.setState({
            targetURL: response.data[0].userPicture,
          });
          console.log(response.data[0].userPicture)
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
              return (<Home logOut={this.logOut} loggedIn={this.state.loggedIn} username={this.state.username} target={this.state.target} targetURL={this.state.targetURL} currentGame={this.state.currentGame}/>)
            }
          } />

          <Route path="/JoinGame" exact render={
            () => {
              return (<JoinGame username={this.state.username} target={this.state.target} logOut={this.logOut} loggedIn={this.state.loggedIn} targetURL={this.state.targetURL} currentGame={this.state.currentGame}/>)
            }
          } />
          {/*<Example />*/}
          {/*<TabsPage></TabsPage>
           <FacebookLogin />*/}
          <Route path="/creategame" exact render={
            () => {
              return (<CreateGame username={this.state.username} target={this.state.target} logOut={this.logOut} loggedIn={this.state.loggedIn} targetURL={this.state.targetURL} currentGame={this.state.currentGame}/>)
            }
          } />
          <Route path="/currentgame" exact render={
            () => {
              return (<CurrentGame username={this.state.username} target={this.state.target} logOut={this.logOut} loggedIn={this.state.loggedIn} targetURL={this.state.targetURL} currentGame={this.state.currentGame}/>)
            }
          } />
          <Route path="/enrollcam" exact render={
            () => {
              return (<Enrollcam username={this.state.username} />)
            }
          } />
          <Route path="/verifycam" exact render={
            () => {
              return (<Verifycam target={this.state.target} currentGame={this.state.currentGame}/>)
            }
          } />
          <Route path="/startgame" exact render={
            () => {
              return (<StartGame username={this.state.username} target={this.state.target} logOut={this.logOut} loggedIn={this.state.loggedIn} targetURL={this.state.targetURL} getCurrentGame={this.state.getCurrentGame} currentGame={this.state.currentGame}/>)
            }
          } />




        </div>
      </Router>
    );
  }
}

export default App;

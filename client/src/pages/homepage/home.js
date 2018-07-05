import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, ButtonGroup } from "react-bootstrap";
import './home.css';
import { getFromStorage, setInStorage } from '../../utils/storage';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      masterError: '',
      signInusername: '',
      signInpassword: '',
      signUpusername: '',
      signUppassword: ''
    };

    this.onTextboxChangeSignInusername = this.onTextboxChangeSignInusername.bind(this);
    this.onTextboxChangeSignInpassword = this.onTextboxChangeSignInpassword.bind(this);
    this.onTextboxChangeSignUpusername = this.onTextboxChangeSignUpusername.bind(this);
    this.onTextboxChangeSignUppassword = this.onTextboxChangeSignUppassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
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
        })
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInusername(event) {
    this.setState({
      signInusername: event.target.value,
    });
  }

  onTextboxChangeSignInpassword(event) {
    this.setState({
      signInpassword: event.target.value,
    });
  }
  onTextboxChangeSignUpusername(event) {
    this.setState({
      signUpusername: event.target.value,
    });
  }

  onTextboxChangeSignUppassword(event) {
    this.setState({
      signUppassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    // Post request to backend
    const {
    signInusername,
      signInpassword
  } = this.state;

    //post request
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInusername,
        password: signInpassword
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInusername: '',
            signInpassword: '',
            token: json.token
          });
        } else {
          this.setState({
            signUpError: json.message,
          });
        }

      });



  }

  onSignUp() {
    const {
    signUpusername,
      signUppassword
  } = this.state;

    //post request
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signUpusername,
        password: signUppassword
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpusername: '',
            signUppassword: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
          });
        }

      });

  };

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInusername,
      signInpassword,
      signUpusername,
      signUppassword
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            <p>Sign In</p>
            <input type="text" placeholder="Assassin Name" value={signInusername} onChange={this.onTextboxChangeSignInusername} /><br />
            <input type="password" placeholder="Password" value={signInpassword} onChange={this.onTextboxChangeSignInpassword} /><br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            <p>Sign Up</p>
            <input type="text" placeholder="Assassin Name" value={signUpusername} onChange={this.onTextboxChangeSignUpusername} /><br />
            <input type="password" placeholder="Password" value={signUppassword} onChange={this.onTextboxChangeSignUppassword} /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>
      );
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar />
          </Col>
          <Col size="md-12">
            <Jumbotron />
          </Col>
          <Col size="md-12">
            <a href="/enrollcam">
              <Button className="btns">
                <h1>Upload Your Face</h1>
              </Button>
            </a>
            <a href="/currentgame">
              <Button className="btns">
                <h1>Current Game</h1>
              </Button>
            </a>
            <a href="/creategame">
              <Button className="btns">
                <h1>Create Game</h1>
              </Button>
            </a>
            <a href="/joingame">
              <Button className="btns">
                <h1>Join Game</h1>
              </Button>
            </a>
            <a href="/verifycam">
              <Button className="btns">
                <h1>Assassinate</h1>
              </Button>
            </a>
            <Button className="btns">
              <h1>Store</h1>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
import React, {Component} from 'react';
// import { ControlLabel, FormControl, Button,
//  Col, Form, FormGroup } from 'react-bootstrap';
import { setInStorage } from '../../Utils/storage';
import axios from 'axios';
// import ReactDOM from 'react-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInError: '',
      signInPassword: '',
      signInEmail: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  }
  authenticate = (response) => {
    console.log(response);
    // You can also grab the picture etc here
    // Api call to server so we can validate the token
  };

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    console.log('hit')
    //Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
 
 //Post reequest to backend
    axios.post('/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
    .then(json => {
     const {token} = json;
      if (json.success) {
        setInStorage('the_main_app', token);
        this.setState({
          signInError: json.messsage,
          isLoading: false,
          signInEmail: '',
          signInPassword: '',
          token: json.token,
        });
      }   
    });
}

  render() {
    const {
      signInError,
      signInPassword,
      signInEmail
    } = this.state;

    return (
      <div>
      {
        (signInError) ? (
          <p>{signInError}</p>
        ) : (null)
      }
      <input 
      type="email" placeholder="Email" value={signInEmail} 
      onChange={this.onTextboxChangeSignInEmail}
      /><br />
      <input 
      type="password" placeholder="Password" value={signInPassword} 
      onChange={this.onTextboxChangeSignInPassword}
      /><br />
      <button onClick={this.onSignIn}>Sign In</button>
      </div>
    )}
  }

  
  export default SignIn;
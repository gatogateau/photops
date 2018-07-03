import React, {Component} from 'react';
import axios from 'axios';
// import { ControlLabel, FormControl, Button, Col, Form, FormGroup } from 'react-bootstrap';
// import ReactDOM from 'react-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: ''
    };

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
  }
  authenticate = (response) => {
    console.log(response);
    // You can also grab the picture etc here
    // Api call to server so we can validate the token
  };

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
      //Grab state
      const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword,
      } = this.state;
   
   //Post reequest to backend
      axios.post('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      })
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.messsage,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          });
        }   
      });
  }

  render() {
    const {
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    return (
      <div>
      {
        (signUpError) ? (
          <p>{signUpError}</p>
        ) : (null)
      }
      <input 
      type="text" placeholder="First Name" 
      value={signUpFirstName}
      onChange={this.onTextboxChangeSignUpFirstName}
      /><br />
      <input 
      type="text" placeholder="LastName" 
      value={signUpLastName} 
      onChange={this.onTextboxChangeSignUpLastName}
      /><br />
      <input 
      type="email" placeholder="Email" 
      value={signUpEmail} 
      onChange={this.onTextboxChangeSignUpEmail}
      /><br />
      <input 
      type="password" placeholder="Password" 
      value={signUpPassword} 
      onChange={this.onTextboxChangeSignUpPassword}
      /><br />
      <button onClick={this.onSignUp}>Sign Up</button>
      </div>
    )}
  }

  
  export default SignUp;
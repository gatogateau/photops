import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import FacebookAuth from 'react-facebook-login';
import MyButton from './MyButton';

class FacebookLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  authenticate = (response) => {
    console.log(response);
    // You can also grab the picture etc here
    // Api call to server so we can validate the token
  };
  render() {
    return (
      <div>
        <FacebookAuth
          appId="368173613704409"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.authenticate}
          component={MyButton}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"/>
        
      </div>
    )}
  }

  
  export default FacebookLogin;
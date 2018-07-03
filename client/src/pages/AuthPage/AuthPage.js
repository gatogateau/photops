import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import classnames from 'classnames';
import './AuthPage.css';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  render() {
    return (
      <div className="card">
        <Tabs defaultActiveKey={1} animation={false} id="sign-in-form">
          <Tab eventKey={1} title="Sign In">
            <SignIn />
          </Tab>
          <Tab eventKey={2} title="Sign Up">
            <SignUp />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
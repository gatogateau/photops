import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./AuthPage.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    console.log(this);
    if (this.props.redirectTo) {
      return <Redirect to={{ pathname: this.props.redirectTo }} />;
    } else {
      return (
        <div>
          <Navbar />
          <Form className="form-horizontal signInForm">
            <h1 className="greet">Welcome</h1>
            <input
              className="form-input"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={this.props.username}
              onChange={this.handleChange}
            />

            <input
              className="form-input"
              placeholder="password"
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.handleChange}
            />

            <Button
              className="btnz"
              onClick={e =>
                this.props.login(e, this.state.username, this.state.password)
              }
              type="submit"
            >
              Login
            </Button>

            <Button
              className="btnz"
              onClick={e =>
                this.props.signUp(e, this.state.username, this.state.password)
              }
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default LoginForm;

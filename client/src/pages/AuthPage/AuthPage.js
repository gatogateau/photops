import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from "../../components/Navbar";
import './AuthPage.css';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: ''
        }

        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log(this)
        if (this.props.redirectTo) {
            return <Redirect to={{ pathname: this.props.redirectTo }} />
        } else {
            return (
                <div>
                <Navbar />
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.props.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.props.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={(e) => this.props.login(e, this.state.username, this.state.password)}
                                type="submit">Login</button>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={(e) => this.props.signUp(e, this.state.username, this.state.password)}
                                type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm

import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import './JoinGame.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import Verifycam from '../../components/Verifycam';
class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }
  render() {
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
            <div className="card">
              <h1>Enter Game</h1>
              <Input type="input" name="input" id="example"
                placeholder="GameName" bsSize="md" />
              <Button type="Success">Join</Button>
            </div>
            <button onClick={this._onButtonClick}>KIll CAM</button>
            {this.state.showComponent ?
              <Verifycam /> :
              null
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JoinGame;
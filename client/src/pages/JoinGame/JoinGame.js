import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button,Input } from "reactstrap";
import './JoinGame.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class JoinGame extends Component {
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
              <h1>Join</h1>
              <form>
              <Input type="input" name="input" id="example"
                placeholder="Group Name" bsSize="md" />
              <Input type="input" name="input" id="example"
                placeholder="Game ID" bsSize="md" />
              <Button type="Success">Join</Button>
              </form>
              <br/>
              <Button className="fag" type="Success">Find All Games</Button>
              <br/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JoinGame;
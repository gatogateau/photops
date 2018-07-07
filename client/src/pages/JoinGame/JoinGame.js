import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import './JoinGame.css';
import axios from "axios"
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class JoinGame extends Component {
findAllGames() {
  axios.get('/api/games/allGames')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
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
              <h1>Join</h1>
              <form>
              <Input type="input" name="input" id="example"
                placeholder="Group Name" bsSize="md" />
              <Input type="input" name="input" id="example"
                placeholder="Game ID" bsSize="md" />
              <Button type="Success">Join</Button>
              </form>
              <br/>
              <Button className="fag" type="Success" onClick={this.findAllGames}>Find All Games</Button>
              <br/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JoinGame;
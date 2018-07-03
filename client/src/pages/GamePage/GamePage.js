import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { Button,Input } from "reactstrap";
import './GamePage.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class GamePage extends Component {
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
              <h1>Create Game</h1>
              <form>
                <Input type="submit text" name="input" id="example"
                  placeholder="Game Name" bsSize="md" />
                <Input type="input" name="input" id="example"
                  placeholder="Start Date" bsSize="md" />
                <Input type="input" name="input" id="example"
                  placeholder="Duration" bsSize="md" />
                <Input type="radio" name="Private" value="Private"/> Private<br/>
                  <Input type="radio" name="Public" value="Public"/> Public<br/>
                    <Button type="Success">Create</Button>
                </form>
                    <form>
                      <Input type="input" name="input" id="example"
                        placeholder="Users" bsSize="md" />
                      <Button type="Success">Add Users</Button>
                    <Button type="Success">Search Users</Button>
                    </form>
            </div>
          </Col>
        </Row>
      </Container>
              );
  }
}

export default GamePage;
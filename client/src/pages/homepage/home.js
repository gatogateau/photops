import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, ButtonGroup } from "react-bootstrap";
import './home.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import Enrollcam from '../../components/Enrollcam';
class Home extends Component {
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
          <button className="btns" onClick={this._onButtonClick}>Add Profile Picture</button>
        {this.state.showComponent ?
          <Enrollcam /> :
          null
        }
          <Button className="btns">
          <h1>Current Game</h1>
          </Button>
          <Button className="btns">
          <h1>Create Game</h1>
          </Button>
          <Button className="btns">
          <h1>Join Game</h1>
          </Button>
          <Button className="btns">
          <h1>Store</h1>
          </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
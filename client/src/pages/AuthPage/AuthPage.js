import React from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Button,
  Row, Col, Form, FormGroup, Input
} from 'reactstrap';
import classnames from 'classnames';
import './AuthPage.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="card">
        <Nav tabs className="Card">
          <NavItem id="tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              SignIn
            </NavLink>
          </NavItem>
          <NavItem id="tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              SignUp
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" sm="6">
                <Form>
                  <FormGroup>
                    <Input type="email" name="email" id="example"
                      placeholder="Username" bsSize="lg" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="password" id="example"
                      placeholder="Password" bsSize="lg" />
                  </FormGroup>
                  <Button btnType="Success">Sign In</Button>
                </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="12" sm="6">
              <Form>
              <FormGroup>
                <Input type="name" name="name" id="example"
                  placeholder="Name" bsSize="lg" />
              </FormGroup>
              <FormGroup>
              <Input type="username" name="username" id="example"
                placeholder="Username" bsSize="lg" />
            </FormGroup>
            <FormGroup>
            <Input type="email" name="email" id="example"
              placeholder="Email" bsSize="lg" />
          </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="example"
                  placeholder="Password" bsSize="lg" />
              </FormGroup>
              <Button className="Btn" type="Submit">SignIn</Button>{' '}
            </Form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
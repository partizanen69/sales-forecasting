import React from 'react'

import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import Styles from './Styles';
import Home from './Home/';
import Linear from './Linear/';
import Multiple from './Multiple/';

class App extends React.Component {
  render(){
    return(
      <Styles>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed='top'>
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">

                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/linear'>
                  <Nav.Link>Linear</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/multiple'>
                  <Nav.Link>Multiple</Nav.Link>
                </LinkContainer>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Switch>
            <Route exact path="/linear" component={Linear} />
            <Route exact path="/multiple" component={Multiple} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Styles>
    )
  }
}

export default App;

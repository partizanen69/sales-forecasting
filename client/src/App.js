import React from 'react'

import { Container, Navbar, Nav } from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import Styles from './Styles';
import Home from './Home/';
import Linear from './Linear/';

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

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Switch>
            <Route exact path="/linear" component={Linear} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Styles>
    )
  }
}

export default App;
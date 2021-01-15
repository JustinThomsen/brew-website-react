import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function renderTapSelection(tapId, menu) {
  let id = 'ankeny-' + tapId;
  let beerOnTapCurrently = menu.find((tap) => {
    return tap.id === tapId;
  }) || {};

  return <>
    <label htmlFor={id}> {beerOnTapCurrently.gas} - {tapId + 1}</label>
    <select name={id} id={id}>
      <option value="">--Please choose a beer--</option>
      {this.props.beverages.map((beer) => {
        return <option value={beer.id} selected={beer.id === beerOnTapCurrently.beveragesid}>{beer.name}</option>;
      })}
    </select>
  </>
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    this.toggleModal();
    alert(`Password: ${this.password.value}`);
    event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <h1>Magic Bean Brewing</h1>
            <Nav>
              <NavItem>
                <NavLink activeClassName="activeLink" className="nav-link inactiveLink" to="/ankeny">
                  <span className="fa fa-home fa-lg" />
                  {' '}
                  Ankeny
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  activeClassName="activeLink"
                  className="nav-link inactiveLink"
                  to="/bettendorf"
                >
                  <span className="fa fa-beer fa-lg" />
                  {' '}
                  Bettendorf
                </NavLink>
              </NavItem>
              <NavItem>
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-sign-in fa-lg" />
                  {' '}
                  Login
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <h3>Ankeny</h3>
                {this.props.ankenyMenu.map((tap) => {
                  return renderTapSelection.call(this, tap.id, this.props.ankenyMenu);
                })}
                <h3>Bettendorf</h3>
                {this.props.bettendorfMenu.map((tap) => {
                  return renderTapSelection.call(this, tap.id, this.props.bettendorfMenu);
                })}
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => this.password = input}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Header;

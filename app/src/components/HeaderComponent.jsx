import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function renderTapSelection(tapId, menu, location) {
  let id = location + ' - ' + tapId;
  let beerOnTapCurrently = menu.find((tap) => {
    return tap.id === tapId;
  }) || {};
  if (beerOnTapCurrently.type === 'fermenter'){
    return <></>;
  }
  return (
    <>
      <label htmlFor={id}> {beerOnTapCurrently.gas}{beerOnTapCurrently.fermenter} - {beerOnTapCurrently.taphandle}</label>
      <select name={id} id={id}>
        <option value="">--Please choose a beer--</option>
        {this.props.beverages.map((beer) => {
          return <option value={beer.id} selected={beer.id === beerOnTapCurrently.beveragesid}>{beer.name}</option>
        })}
      </select>
      <br />
    </>
  )
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    let ankenyMenuAsString = JSON.stringify(this.props.ankenyMenu).trim();
    let bettendorfMenuAsString = JSON.stringify(this.props.bettendorfMenu).trim();
    let newBettendorfMenu = JSON.parse(bettendorfMenuAsString);
    let newAnkenyMenu = JSON.parse(ankenyMenuAsString);
    try {
      let newMenus =
        {
          password: this.password.value,
          ankeny:
            this.createNewMenu(newAnkenyMenu, this.props.ankenyMenu, 'ankeny'),
          bettendorf:
            this.createNewMenu(newBettendorfMenu, this.props.bettendorfMenu, 'bettendorf')
        }
      ;

    const updateHeaderState = this.toggleModal;
    this.props.updateTaps(newMenus, () => {
      console.log('close the modal');
      updateHeaderState();
    });
    event.preventDefault();
    } catch (err){
      console.log(err);
    }
  }

  createNewMenu (newMenu, currentMenu, location) {
    currentMenu.map((tap) => {
      if (tap.type === 'tap' || tap.type === 'fermenting' || tap.type === 'barrel') {
        let currentTap = location + ' - ' + tap.id
        newMenu[tap.id].beveragesid = parseInt(document.getElementById(currentTap).selectedOptions[0].value);
      }
    })
    return newMenu;
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
            <h2>Chip in for ingredients?
              <a href="https://paypal.me/tommytomsthomsen?locale.x=en_US">
                {' '}
                Chip In
              </a>
            </h2>
            <Nav>
              <NavItem>
                <NavLink activeClassName="activeLink" className="nav-link inactiveLink" to="/ankeny">
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
                  {' '}
                  Bettendorf
                </NavLink>
              </NavItem>
              <NavItem>
                <Button outline onClick={this.toggleModal}>
                  {' '}
                  Update
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Update</ModalHeader>
          <ModalBody>
            {this.props.update.isLoading ? <h1>switching out kegs</h1>: null}
            {this.props.update.successMess !== null ? <h1>{this.props.update.successMess}</h1>: null}
            <Form onSubmit={this.handleUpdate}>
              <FormGroup>
                <h3>Ankeny</h3>
                {this.props.ankenyMenu.map((tap) => {
                  return renderTapSelection.call(this, tap.id, this.props.ankenyMenu, "ankeny");
                })}
                <h3>Bettendorf</h3>
                {this.props.bettendorfMenu.map((tap) => {
                  return renderTapSelection.call(this, tap.id, this.props.bettendorfMenu, "bettendorf");
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

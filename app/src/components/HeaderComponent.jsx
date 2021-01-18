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
    let newMenus = [
      {
        password: this.password.value,
        ankeny:
          {
            "id": 0,
            "beveragesid": 1,
            "gas": "Co2",
            "type": "tap",
            "fermenter": "adam",
            "taphandle": 1
          },
        bettendorf:
          {
            "id": 0,
            "beveragesid": 3,
            "gas": "Co2",
            "type": "tap",
            "fermenter": "",
            "taphandle": 2
          }
      }
    ];

    const updateHeaderState = this.toggleModal;
    this.props.updateTaps(newMenus, () => {
      console.log('close the modal');
      updateHeaderState();
    });
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

import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavItem
} from "reactstrap";
import {NavLink} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <h1>Magic Bean Brewing</h1>
                        <Nav>
                            <NavItem>
                                <NavLink activeClassName="activeLink" className="nav-link inactiveLink" to="/ankeny">
                                    <span className="fa fa-home fa-lg"/> Ankeny
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink activeClassName="activeLink" className="nav-link inactiveLink"
                                         to="/bettendorf">
                                    <span className="fa fa-beer fa-lg"/> Bettendorf
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;

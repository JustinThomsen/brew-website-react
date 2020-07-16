import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavItem
} from "reactstrap";
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });

    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

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

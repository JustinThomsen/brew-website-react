import React, { Component } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import { fetchBeverages, fetchBettendorfBeverages, fetchAnkenyBeverages } from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  beverages: state.beverages,
  ankenyMenu: state.ankenyMenu,
  bettendorfMenu: state.bettendorfMenu,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBeverages: () => {
    dispatch(fetchBeverages());
  },
  fetchAnkenyBeverages: () => {
    dispatch(fetchAnkenyBeverages());
  },
  fetchBettendorfBeverages: () => {
    dispatch(fetchBettendorfBeverages());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchBeverages();
    this.props.fetchBettendorfBeverages();
    this.props.fetchAnkenyBeverages();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/ankeny"
            component={() => (
              <Menu
                page="ankeny"
                fermenting={this.props.ankenyMenu}
                location={this.props.ankenyMenu}
                beverages={this.props.beverages}
              />
            )}
          />
          <Route
            exact
            path="/bettendorf"
            component={() => (
              <Menu
                page="bettendorf"
                fermenting={this.props.ankenyMenu}
                location={this.props.bettendorfMenu}
                beverages={this.props.beverages}
              />
            )}
          />
          <Redirect to="/ankeny" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

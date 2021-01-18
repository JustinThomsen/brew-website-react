import React, { Component } from 'react'
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './HeaderComponent'
import Menu from './MenuComponent'
import {
  fetchBeverages,
  fetchBettendorfBeverages,
  fetchAnkenyBeverages,
  sendUpdatedTaps
} from '../redux/ActionCreators'

const mapStateToProps = (state) => {
  console.log('looking at state to find new props');
  return {
    beverages: state.beverages,
    ankenyMenu: state.ankenyMenu,
    bettendorfMenu: state.bettendorfMenu,
    update: state.update,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchBeverages: () => {
    dispatch(fetchBeverages())
  },
  fetchAnkenyBeverages: () => {
    dispatch(fetchAnkenyBeverages())
  },
  fetchBettendorfBeverages: () => {
    let actionToFetchBettenBevs = fetchBettendorfBeverages()
    dispatch(actionToFetchBettenBevs)
  },
  updateTaps: (newMenus, onSuccess) => {
    dispatch(sendUpdatedTaps(newMenus, onSuccess))
  }
})

class Main extends Component {
  componentDidMount () {
    this.props.fetchBeverages()
    this.props.fetchBettendorfBeverages()
    this.props.fetchAnkenyBeverages()
  }

  render () {
    return (
      <div>
        <Header
          ankenyMenu={this.props.ankenyMenu.ankenyMenu}
          bettendorfMenu={this.props.bettendorfMenu.bettendorfMenu}
          beverages={this.props.beverages.beverages}
          update={this.props.update}
          updateTaps={this.props.updateTaps}
        />
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
          <Redirect to="/ankeny"/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

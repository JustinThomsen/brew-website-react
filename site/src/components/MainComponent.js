import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import BeverageDetail from './BeverageDetailComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchBeverages, fetchBettendorfBeverages} from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        beverages: state.beverages,
        ankenyMenu: state.ankenyMenu,
        bettendorfMenu: state.bettendorfMenu
    }
};

const mapDispatchToProps = dispatch => ({
    fetchBeverages: () => {dispatch(fetchBeverages())},
    fetchAnkenyBeverages: () => {dispatch(fetchBettendorfBeverages())},
    fetchBettendorfBeverages: () => {dispatch(fetchBettendorfBeverages())}
});

function buildMenu(menu) {
    console.log(menu);
    return menu;
}

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBeverages();
        this.props.fetchBettendorfBeverages();
    }


    render() {
        const BeverageWithId = ({match}) => {
            return(
                <BeverageDetail beverage={this.props.beverages.beverages.filter((beverage) => beverage.id === parseInt(match.params.beverageId,10))[0]}
                                isLoading={this.props.beverages.isLoading}
                                errMess={this.props.beverages.errMess}
                />
            );
        };
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/ankeny" component={() => <Menu location={"ankeny"} beverages={this.props.beverages}/>} />
                    <Route path="/ankeny/:beverageId" component={ BeverageWithId } />
                    <Route exact path="/bettendorf" component={() => <Menu location={this.props.bettendorfMenu} beverages={this.props.beverages} />} />
                    <Route path="/bettendorf/:beverageId" component={ BeverageWithId } />
                    <Redirect to="/ankeny"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

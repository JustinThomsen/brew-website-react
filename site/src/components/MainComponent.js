import React, { Component } from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import BeverageDetail from './BeverageDetailComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLeaders, fetchBeverages, fetchPromos } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group"

const mapStateToProps = state => {
    return {
        beverages: state.beverages,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    fetchBeverages: () => {dispatch(fetchBeverages())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    fetchPromos: () => {dispatch(fetchPromos())},
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBeverages();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }


    render() {
        const HomePage = () => {
            return(
                <Menu beverages={this.props.beverages}
                />
            )
        };

        const BeverageWithId = ({match}) => {
            return(
                <BeverageDetail dish={this.props.beverages.beverages.filter((beverage) => beverage.id === parseInt(match.params.dishId,10))[0]}
                                isLoading={this.props.beverages.isLoading}
                                errMess={this.props.beverages.errMess}
                />
            );
        };
        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={ HomePage }/>
                            <Route exact path="/menu" component={() => <Menu beverages={this.props.beverages} />} />
                            <Route path="/menu/:beverageId" component={ BeverageWithId } />
                            <Route exact path="/bettendorf" component={() => <About leaders={this.props.leaders} />} />
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

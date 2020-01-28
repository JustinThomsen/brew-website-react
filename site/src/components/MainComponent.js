import React, { Component } from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
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
    fetchDishes: () => {dispatch(fetchBeverages())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    fetchPromos: () => {dispatch(fetchPromos())},
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }


    render() {
        const HomePage = () => {
            return(
                <Home beverage={this.props.beverages.beverages.filter((dish) => dish.featured)[0]}
                      beveragesLoading={this.props.beverages.isLoading}
                      beveragesErrMess={this.props.beverages.errMess}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMess={this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
                      leadersLoading={this.props.leaders.isLoading}
                      leadersErrMess={this.props.leaders.errMess}
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
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

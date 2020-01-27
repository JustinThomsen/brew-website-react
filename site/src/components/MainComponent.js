import React, { Component } from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLeaders, fetchDishes, fetchPromos } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group"

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => {dispatch(fetchDishes())},
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
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMess={this.props.dishes.errMess}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMess={this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
                      leadersLoading={this.props.leaders.isLoading}
                      leadersErrMess={this.props.leaders.errMess}
                />
            )
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
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
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" component={ DishWithId } />
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

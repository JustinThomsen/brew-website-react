import React, {Fragment} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardText, CardFooter} from 'reactstrap'
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({beverage}) {
    return(
        <Link to={`/ankeny/${beverage.id}`}>
            <Card className="fullHeightCard">
                <CardImg width="100%" src={baseUrl + beverage.image} alt={beverage.name}/>
                <CardImgOverlay>
                    <CardTitle className='col-12 '>{beverage.name}</CardTitle>
                    <CardTitle className='col-12 align-text-bottom'>{beverage.style}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
    )
}

const Menu = (props) => {

    const bettendorfMenu = props.location.bettendorfMenu.map((menuItem) => {
        console.log("hi");
        console.log(props.beverages.beverages.filter(beverage => beverage.id === menuItem.beveragesid));
        return (
            //beverage={this.props.beverages.beverages.filter((beverage) => beverage.id === parseInt(match.params.beverageId,10))[0]}
            <div key={menuItem.id} className="col-6 col-md-2">
                <RenderMenuItem beverage = {props.beverages.beverages.filter(beverage => beverage.id === menuItem.beveragesid)[0]} />
            </div>
        );
    });

    const menu = props.beverages.beverages.map((beverage) => {
        console.log("high");
        console.log(beverage);
        return (
            <div key={beverage.id} className="col-6 col-md-2">
                <RenderMenuItem beverage={beverage} />
            </div>
        );
    });
    if (props.beverages.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <h3>CO2</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Nitro</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {bettendorfMenu}
                </div>
            </Fragment>
        );
};

export default Menu;

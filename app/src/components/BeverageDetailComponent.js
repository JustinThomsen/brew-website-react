import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap'
import {Loading} from "./LoadingComponent";

function RenderBeverage({beverage}) {
    return (
        <Card>
            <CardImg width="100%" src={beverage.image} alt={beverage.name}/>
            <CardBody>
                <CardTitle>{beverage.name}</CardTitle>
                <CardText>{beverage.description}</CardText>
            </CardBody>
        </Card>
    )
}

const BeverageDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.beverage != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>{props.beverage.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1 d-inline-block">
                        <RenderBeverage beverage={props.beverage}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default BeverageDetail;

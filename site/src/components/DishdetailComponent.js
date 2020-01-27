import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb
} from 'reactstrap'
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderDish({dish}){
    return(
        <FadeTransform in
           transformProps={{
               exitTransform: 'scale(0.5) translateY(-50%)'
           }}>
            <Card>
                <CardImg width="100%" src={ baseUrl + dish.image } alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
         <div className="container">
            <div className="row">
                <Loading />
            </div>
         </div>
        );
    } else if (props.errMess) {
        return(
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
        )
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1 d-inline-block">
                        <RenderDish dish={props.dish}/>
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

export default DishDetail;

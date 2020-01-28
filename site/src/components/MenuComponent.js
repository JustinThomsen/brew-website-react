import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({beverage}) {
    return(
        <Link to={`/menu/${beverage.id}`}>
            <Card>
                <CardImg width="100%" src={baseUrl + beverage.image} alt={beverage.name}/>
                <CardImgOverlay className='ml-5'>
                    <CardTitle>{beverage.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
    )

}

const Menu = (props) => {
    const menu = props.beverages.beverages.map((beverage) => {
        return (
            <div key={beverage.id} className="col-12 col-md-5 m-1">
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
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
};

export default Menu;

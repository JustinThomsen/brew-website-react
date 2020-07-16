import React, {Fragment} from 'react';
import {
    Card,
    CardImg,
    CardTitle,
    CardHeader,
    CardDeck,
    CardGroup,
    ModalHeader,
    ModalBody,
    CardBody, CardText
} from 'reactstrap'
import {Loading} from "./LoadingComponent";
import {Modal} from 'reactstrap';
import {useState} from "react/cjs/react.production.min";


function RenderMenuItem(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <div className='hover' onClick={toggle}>
                <Card className={`fullHeightCard ${props.location} mr-0 ml-1`}>
                    <CardHeader>
                        <CardTitle className='col-12'>{props.beverage.name}</CardTitle>
                        <CardTitle className='col-12'>{props.beverage.style}</CardTitle>
                    </CardHeader>
                    <CardImg src={props.beverage.image} alt={props.beverage.name}/>
                </Card>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{props.beverage.name}</ModalHeader>
                <ModalBody>
                    <Card className='beverageDetail'>
                        <CardImg width="100%" src={props.beverage.image} alt={props.beverage.name}/>
                        <CardBody>
                            <CardTitle>{props.beverage.style}</CardTitle>
                            <CardText>{props.beverage.description}</CardText>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

const Menu = (props) => {
    let co2Menu = () => {
        return <div/>
    };
    let nitroMenu = () => {
        return <div/>
    };
    let fermentingMenu = () => {
        return <div/>
    };

    function getMenu(beverages) {
        return beverages.map((menuItem) => {
            let beverageList = props.beverages.beverages;

            return (
                <Fragment key={menuItem.id}>
                    <RenderMenuItem
                        location={props.page}
                        beverage={beverageList.filter(beverage => beverage.id === menuItem.beveragesid)[0]}
                    />
                </Fragment>
            );
        });
    }

    function getCo2Beverages(menu, co2Count) {
        return menu.filter((beer) => {
            let index = beer.id;
            if (index <= co2Count - 1) {
                return beer;
            }
        });
    }

    function getNitroBeverages(menu, co2Count, totalCount) {
        return menu.filter((beer) => {
            let index = beer.id;
            if (index >= co2Count && index < totalCount) {
                return beer;
            }
        });
    }

    function getFermentingBeverages(menu, ankenyCount) {
        return menu.filter((beer) => {
            let index = beer.id;
            if (index >= ankenyCount) {
                return beer;
            }
        });
    }


    if (props.page === "ankeny") {
        let co2Count = 4;
        let nitroCount = 3;
        let ankenyCount = co2Count + nitroCount;

        let ankenyMenu = props.location.ankenyMenu;
        let co2Beverages = getCo2Beverages(ankenyMenu, co2Count);
        let nitroBeverages = getNitroBeverages(ankenyMenu, co2Count, ankenyCount);
        let fermentingBeverages = getFermentingBeverages(props.fermenting.ankenyMenu, ankenyCount);

        co2Menu = getMenu(co2Beverages);
        nitroMenu = getMenu(nitroBeverages);
        fermentingMenu = getMenu(fermentingBeverages);

    } else if (props.page === "bettendorf") {
        let co2Count = 6;
        let nitroCount = 2;
        let totalCount = co2Count + nitroCount;
        let ankenyCount = 7;

        let bettendorfMenu = props.location.bettendorfMenu;
        let co2Beverages = getCo2Beverages(bettendorfMenu, co2Count);
        let nitroBeverages = getNitroBeverages(bettendorfMenu, co2Count, totalCount);
        let fermentingBeverages = getFermentingBeverages(props.fermenting.ankenyMenu, ankenyCount);

        co2Menu = getMenu(co2Beverages);
        nitroMenu = getMenu(nitroBeverages);
        fermentingMenu = getMenu(fermentingBeverages);
    }
    if (props.beverages.isLoading) {
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
        );
    } else
        return (
            <Fragment>
                <div className="flex-container">
                    <CardDeck className="fullHeightCard">
                        <h3>
                            CO2
                        </h3>
                        <CardDeck className="row m-auto">
                            {co2Menu}
                        </CardDeck>
                    </CardDeck>
                    <CardDeck className="fullHeightCard">
                        <h3>
                            Nitro
                        </h3>
                        <CardDeck className="row m-auto">
                            {nitroMenu}
                        </CardDeck>
                    </CardDeck>
                </div>

                <hr/>
                <Card className="fermenting">
                    <h3>
                        Fermenting
                    </h3>
                    <CardGroup className="row m-auto">
                        {fermentingMenu}
                    </CardGroup>
                </Card>
            </Fragment>
        );
};

export default Menu;

import React, { Fragment } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardHeader,
  CardDeck,
  ModalHeader,
  ModalBody,
  CardBody,
  CardText,
  Modal, CardImgOverlay,
} from 'reactstrap'
import { useState } from 'react/cjs/react.production.min';
import { Loading } from './LoadingComponent';
function RenderFermentationItem(props){
  const beerStatus = props.listOfFermentersAndFermentingBeer;
  const listOfFermentingBeers = beerStatus.filter((fermenting) => fermenting.type === "fermenting");
  const bevIDsOfFermentingBeers = listOfFermentingBeers.map((beer)=> beer.beveragesid);
    if (bevIDsOfFermentingBeers.includes(props.bevid)) {
      const currentReading = props.tempAndSGReadings.find((reading) => reading.recipe === props.beverage.recipeid);
      return (
        <CardImgOverlay className="overlay">
          SG: {typeof currentReading === 'undefined' ? null : currentReading.SG}
          <br/>
          Temp: {typeof currentReading === 'undefined' ? null : currentReading.Temp}F
        </CardImgOverlay>
      )
    }

  return <></>
}
function RenderMenuItem(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <div className="hover" onClick={toggle}>
        <Card className={`fullHeightCard ${props.location} mr-0 ml-1`}>
          <CardHeader>
            <CardTitle className="col-12">
              {props.beverage.name}
              :
            </CardTitle>
            <CardTitle className="col-12">{props.beverage.style}</CardTitle>
          </CardHeader>
            <CardImg src={props.beverage.image} alt={props.beverage.name} />
            <RenderFermentationItem bevid={props.bevid} beverage = {props.beverage} tempAndSGReadings={props.fermentationData.fermentation} listOfFermentersAndFermentingBeer={props.fermentationList}/>
        </Card>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.beverage.name}</ModalHeader>
        <ModalBody>
          <Card className="beverageDetail">
            <CardImg width="100%" src={props.beverage.image} alt={props.beverage.name} />
            <CardBody>
              <CardTitle>{props.beverage.style}</CardTitle>
              <CardText>{props.beverage.description}</CardText>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

const Menu = (props) => {
  let secondGas = () => <div />;
  let firstGas = () => <div />;
  let fermentingMenu = () => <div />;
  let locationFirstGas = "";
  let locationSecondGas = "";

  function getMenu(beverages) {
    return beverages.map((menuItem) => {
      const beverageList = props.beverages.beverages;
      return (
        <Fragment key={menuItem.id}>
          <RenderMenuItem
            location={props.page}
            beverage={beverageList.filter((beverage) => beverage.id === menuItem.beveragesid)[0]}
            fermentationData={props.fermentation}
            fullMenu={props.location}
            bevid={menuItem.beveragesid}
            fermentationList={beverages}
          />
        </Fragment>
      );
    });
  }

  function getCo2Beverages(menu) {
    return menu.filter((beer) => {
      return beer.gas === "Co2";

    });
  }

  function getNitroBeverages(menu) {
    return menu.filter((beer) => {
      return beer.gas === "Nitro";
    });
  }

  function getFermentingBeverages(menu) {
    return menu.filter((beer) => {
      return beer.type !== 'tap';
    });
  }

  if (props.page === 'ankeny') {
    locationFirstGas = "CO2";
    locationSecondGas = "Nitro";

    const { ankenyMenu } = props.location;
    const co2Beverages = getCo2Beverages(ankenyMenu);
    const nitroBeverages = getNitroBeverages(ankenyMenu);
    const fermentingBeverages = getFermentingBeverages(props.fermenting.ankenyMenu);

    firstGas = getMenu(co2Beverages);
    secondGas = getMenu(nitroBeverages);
    fermentingMenu = getMenu(fermentingBeverages);
  } else if (props.page === 'bettendorf') {
    locationFirstGas = "Nitro";
    locationSecondGas = "CO2";

    const { bettendorfMenu } = props.location;
    const co2Beverages = getCo2Beverages(bettendorfMenu);
    const nitroBeverages = getNitroBeverages(bettendorfMenu);
    const fermentingBeverages = getFermentingBeverages(props.fermenting.ankenyMenu);

    secondGas = getMenu(co2Beverages);
    firstGas = getMenu(nitroBeverages);
    fermentingMenu = getMenu(fermentingBeverages);
  }
  if (props.beverages.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } return (
    <>
      <div className="flex-container">
        <CardDeck className="fullHeightCard">
            <h3>
              {locationFirstGas}
            </h3>
          <CardDeck className="row m-auto">
              {firstGas}
          </CardDeck>
        </CardDeck>
        <CardDeck className="fullHeightCard">
          <h3>
            {locationSecondGas}
          </h3>
          <CardDeck className="row m-auto">
              {secondGas}
          </CardDeck>
        </CardDeck>
      </div>

      <hr />
      <div className="fermenting">
        <CardDeck className="fullHeightCard">
          <h3>
            Fermenting
          </h3>
          <CardDeck className="row m-auto">
            {fermentingMenu}
          </CardDeck>
        </CardDeck>
      </div>
    </>
  );
};

export default Menu;

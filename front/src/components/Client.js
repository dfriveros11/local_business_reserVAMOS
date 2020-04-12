import React, { useState, useEffect } from "react";
import Questions from "./Questions.js";
import Maps from "./Maps.js";

const apikey = process.env.REACT_APP_GOOGLEAPIKEY;

const googlemapsurl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  apikey +
  "&libraries=geometry,drawing,places";
console.log("KEY", apikey);
const Client = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [currentPage, setCurrentPage] = useState([1]);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage, setIiemsPerPage] = useState([10]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const geo = navigator.geolocation.getCurrentPosition(function success(pos) {
      var crd = pos.coords;
      setLat(crd.latitude);
      setLon(crd.longitude);
    });

    fetch("./getRestaurants")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setError(error);
        }
      )
      .then(() => setIsLoaded(true));
    const dir = "calle 78# 7-98";
    let fet =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      dir +
      "&key=" +
      apikey;
    fetch(fet, {
      method: "POST", // or 'PUT'
      body: {}, // data can be `string` or {object}!
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("adress coords", result.results[0].geometry.location);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log("fallamos");
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const indexLastITem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastITem - itemsPerPage;

    return (
      <div className="Client">
        <div>
          <div>
            <h1 className="display-4 " id="storesTitle">
              Tiendas cercanas
            </h1>
          </div>
        </div>
        <div>
          <div className="row">
            <div id="storesDiv" className="col-md-6">
              <Questions stores={items} lat={lat} lon={lon}></Questions>
            </div>

            <div className="col-md-6">
              <div id="rowDiv">
                <Maps
                  isMarkerShown
                  googleMapURL={googlemapsurl}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div style={{ height: `100%`, width: `100%` }} />
                  }
                  mapElement={<div style={{ height: `85vh` }} />}
                  mar={{ lat: lat, lng: lon }}
                  tiendas={items}
                ></Maps>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Client;

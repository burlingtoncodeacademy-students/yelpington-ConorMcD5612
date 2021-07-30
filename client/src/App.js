// importing everything thats going to be used
import "./App.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import MainMap from "./components/MainMap";
import Restaurant from "./components/Restaurant";

function App() {
  //Making leaflet icon
  const leafIcon = L.icon({
    iconUrl: icon,
    shadowUrl: shadow,
  });
  //Data is my restaurants.json array of restaurant objects
  const [data, setData] = useState([]);

  //Use effect so it updates on state change
  useEffect(() => {
    //Only update if we dont have the arary of objects
    if (data.length === 0) {
      //fetch restaurants.json from api endpoint
      fetch("/api/restaurants/")
        .then((res) => res.json())
        .then((result) => {
          //Set data to fetch result
          setData(result);
        });
    }
  });

  //Restids is the restuarant ids in directory.json
  const [restIds, setRestIds] = useState([]);
  //Use effect so it updates on state change
  useEffect(() => {
    //Only update if we dont have the arary
    if (restIds.length === 0) {
      //fetch directory.json
      fetch("/api/restaurant/")
        .then((res) => res.json())
        .then((result) => {
          //set rest id to fetch result 
          setRestIds(result);
        });
    }
  });

  //mapPosition state default at the center of williston
  const [mapPosition, setMapPosition] = useState([44.4454, -73.0992]);

  return (
    // Making a column of the header and the rest of the content
    <div className="column-flex">
      <header>Yelpers</header>
      {/* This is where the rest of the content lives */}
      <div className="row-flex">
        {/* using react-router so need browserRouter component wrapping everything */}
        <Router>
          {/* This is the nav of the restaurants */}
          <Nav data={data} />
          {/*Restuarant info depending on the current path, passing all states and map state setter as props + leaf icon */}
          <Restaurant
            leafIcon={leafIcon}
            restIds={restIds}
            data={data}
            mapPosition={mapPosition}
            setMapPosition={setMapPosition}
          />
          {/* This is the map centered on williston with all the restaurant markers */}
          <MainMap leafIcon={leafIcon} data={data} />
        </Router>
      </div>
    </div>
  );
}

export default App;

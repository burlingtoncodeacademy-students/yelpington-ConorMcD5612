import React from "react";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const MainMap = ({ data, leafIcon }) => {
  return (
    <MapContainer
      //Center is williston
      center={[44.4454, -73.0992]}
      //zoom to see all the markers
      zoom={13}
      // no scroll
      scrollWheelZoom={false}
      //Styles for Map
      style={{
        height: "600px",
        width: "600px",
        border: ".5vw solid black",
        borderRadius: "1vw",
      }}
    >
      {/* map skin */}
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*Doing the same pattern as the nav bar */}
      {data.map((restaurant, index) => (
        //For each restaurant object make a marker its posiiton being the objects latlng
        <Marker key={index} position={restaurant.latlng} icon={leafIcon}>
          <Popup>
            {/*Have a link to restaurant page inside of the popup */}
            <Link to={"/restaurant/" + restaurant.id}>
              {/* Link is rest name */}
              <h2>{restaurant.name}</h2>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MainMap;

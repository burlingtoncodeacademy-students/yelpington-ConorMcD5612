// importing everything thats going to be used
import "./App.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Making leaflet icon
const leafIcon = L.icon({
  iconUrl: icon,
  shadowUrl: shadow,
});

function App() {
  //Data is my restaurants.json array of restaurant objects
  const [data, setData] = useState([]);

  //Use effect so it updates on prop change
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
  //Use effect so it updates on prop change
  useEffect(() => {
    //Only update if we dont have the arary
    if (restIds.length === 0) {
      //fetch directory.json
      fetch("/api/restaurant/")
        .then((res) => res.json())
        .then((result) => {
          setRestIds(result);
        });
    }
  });

  //mapPosition prop default ats the center of williston
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
          <div className="rest-list">
            {/* mapping over our array of restaurant objects */}
            {data.map((restaurant, index) => (
              //for each object making a link that goes to /restaurant/restaurant-id
              <Link key={index} to={"/restaurant/" + restaurant.id}>
                {/* text content is just the name of the restaurants */}
                {restaurant.name}
              </Link>
            ))}
          </div>
          {/* Creating the route for the links created */}
          <Route
            path={"/restaurant/:id" /* Path is restaurant and id=restId */}
            component={(props) => {
              //need this check so tht when manually going to link it waits for the fetch before running
              if (restIds.length !== 0) {
                //Defining what index the restaurant is at in restaurants.json
                let restaurantIndex = restIds.indexOf(props.match.params.id);
                //Setting mapposting using latlng value in restuarant object
                setMapPosition(data[restaurantIndex].latlng);
                return (
                  //Container for restaurant box
                  <div className="rest-container">
                    <div>
                      {/* using restuarants.json to acess values of keys */}
                      <h1>{data[restaurantIndex].name}</h1>
                      <h2>{data[restaurantIndex].address}</h2>
                      <h3>{data[restaurantIndex].phonenumber}</h3>
                      <h3>{data[restaurantIndex].hours}</h3>
                      <p>{`${data[restaurantIndex].notes[0]}, ${data[restaurantIndex].notes[1]}`}</p>
                    </div>
                    {/*Making for route map center is mapPosition defined earlier, adding some styles */}
                    <MapContainer
                      center={mapPosition}
                      zoom={16}
                      scrollWheelZoom={false}
                      style={{
                        height: "100%",
                        marginTop: "2vw",
                        border: ".5vw solid black",
                        borderRadius: "1vw",
                      }}
                    >
                      {/* Making marker on restaurant lnglat */}
                      <Marker position={mapPosition} icon={leafIcon}>
                        <Popup>
                          {/*popup is just the name of the restaurant */}
                          <h2>{data[restaurantIndex].name}</h2>
                        </Popup>
                      </Marker>
                      {/* map tile layer */}
                      <TileLayer
                        attribution=""
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer>
                  </div>
                );
              } else {
                // while waiting for fetch
                return <h1>Loading...</h1>;
              }
            }}
          ></Route>
          {/* This is the map centered on williston with all the restaurant markers */}
          <MapContainer
            center={[44.4454, -73.0992]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "600px",
              width: "600px",
              border: ".5vw solid black",
              borderRadius: "1vw",
            }}
          >
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
        </Router>
      </div>
    </div>
  );
}

export default App;

import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Route } from "react-router-dom";

const Restaurant = ({
  restIds,
  data,
  mapPosition,
  setMapPosition,
  leafIcon,
}) => {
  return (
    <Route
      path={
        "/restaurant/:id" /* Path is restaurant and id is going to be restaurant id */
      }
      component={(props) => {
        //need this check so tht when manually going to link it waits for the fetch before running
        if (restIds.length !== 0) {
          //Rest ids is directory.json with names of restaurant, taking the index of /"restaurant-id"
          let restaurantIndex = restIds.indexOf(props.match.params.id);
          //Setting mappostition using latlng value in restuarant object
          //in directory.json restaurant ids are in the same order as the restaurant objects so restaurantIndex = index for restaurant object
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
  );
};

export default Restaurant;

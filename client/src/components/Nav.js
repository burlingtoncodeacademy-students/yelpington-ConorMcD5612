// importing everything thats going to be used
import "../App.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

//Making leaflet icon

const Nav = ({ data }) => {
  return (
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
  );
};

export default Nav;

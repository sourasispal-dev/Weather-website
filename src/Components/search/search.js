import "./search.css";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import bunny from "../images/bunny.gif";
import hot from "../images/hot.gif";

function Search() {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [tempF, setTempF] = useState();
  const [wind, setWind] = useState();
  const [date, setDate] = useState();
  const [humidity, setHumidity] = useState();

  const getWeather = (e) => {
    e.preventDefault();
    if (city) {
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "509236b530fb4065bef184627212112",
            q: city,
          },
        })
        .then((res) => {
          setTemp(res.data.current.temp_c);
          setTempF(res.data.current.temp_f);
          setWind(res.data.current.wind_kph);
          setDate(res.data.current.last_updated);
          setHumidity(res.data.current.humidity);
          console.log(res.data);
        });
    }
  };

  return (
    <div className="banner">
      <center>
        <div className="banner-content">
          <form onSubmit={getWeather}>
            <input
              type="text"
              placeholder="Enter City To Get Details"
              name="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              pattern="[a-z]*"
            />
            <button type="submit" className="btn-search">
              Get weather
            </button>
          </form>
        </div>
      </center>

      {/* weather data for cold places*/}
      <div className="weather-data">
        <div>
          {(() => {
            if (temp < 20) {
              return (
                <div className="temp">
                  <img src={bunny} alt="weather-img" />
                  <br />
                  Temperature : {temp}°C/{tempF}°F
                  <br />
                  Wind Speed : {wind} km/hr
                  <br />
                  Humidity : {humidity}
                  <br />
                  Last Updated :{" "}
                  {moment(date).format("MMMM Do YYYY, h:mm a (dddd)")}
                </div>
              );
              //  weather for hot places
            } else if (temp > 20) {
              return (
                <div className="temp">
                  <img src={hot} alt="weather-img" />
                  <br />
                  Temperature : {temp}°C/{tempF}°F
                  <br />
                  Wind Speed : {wind} km/hr
                  <br />
                  Humidity : {humidity}
                  <br />
                  Last Updated :{" "}
                  {moment(date).format("MMMM Do YYYY, h:mm a (dddd)")}
                </div>
              );
            } else {
              return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default Search;

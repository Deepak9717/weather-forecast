import { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (e) => {
    e.preventDefault();

    setInput("");
    setWeather({ ...weather, loading: true });
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "6d9fadded74fc7d8b7f6a7cd2bf4f8e7";

    await axios
      .get(url, {
        params: {
          q: input,
          units: "metric",
          appid: api_key,
        },
      })
      .then((res) => {
        console.log("res", res);
        setWeather({ data: res.data, loading: false, error: false });
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setInput("");
        console.log("error", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={(e) => search(e)}>
        <h1 className="title">Know Your Weather</h1>
        <div className="search-bar">          
          <input
            type="text"
            name="query"
            className="city-search"
            placeholder="Enter City..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Enter</button>
        </div>

        {weather.loading && (
          <>
            <Oval type="Oval" color="black" height={50} width={50}></Oval>
          </>
        )}
        {weather.error && (
          <>
            <span className="error-message">
              <FontAwesomeIcon icon={faFrown} />
              <span>City not found!!!</span>
            </span>
          </>
        )}
        {weather && weather.data && weather.data.main && (
          <div className="weather">
            <div className="city-name">
              <h2>{weather.data.name + "," + weather.data.sys.country}</h2>
            </div>
            <div className="date">
              <span>{toDateFunction()}</span>
            </div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              <span>
                {Math.round(weather.data.main.temp)}
                <sup className="deg">°C</sup>
              </span>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed : {weather.data.wind.speed}m/s</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;

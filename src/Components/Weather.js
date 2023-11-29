import React, { useEffect, useState } from "react";
import Header from "./WeatherComponents/Header";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
const Weather = () => {
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = async () => {
    if (city && selectedDate) {
      try {
        const apiKey = "cbc1626668a586235d0c9391beec50ce";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&dt=${selectedDate}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  function convertToFahrenheit(kelvin) {
    const celsius = kelvin - 273.15;
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  }
  function convertToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  const datePickerWrapperStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  };

  const calendarIconStyle = {
    color: "#3498db",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    outline: "none",
    width: "140px",
    backgroundColor: "#D9D9D9",
  };

  const windowWidth = window.innerWidth;

  // Conditionally set classes based on screen size
  const containerClasses = windowWidth <= 767 ? "" : "container  ";


  return (
    <div className="weather-container">
      <Header />
      <div className={containerClasses} >
      <div className=''>
        <div className="row">
          <div className="col-8">
            {weatherData && weatherData.city && (
              <div>
                <div className="d-flex align-items-center ">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="material-symbols:share-location">
                      <path
                        id="Vector"
                        d="M16.2188 27.4375V24.9375C17.0938 24.8125 17.9425 24.5729 18.765 24.2188C19.5883 23.8646 20.3646 23.4167 21.0938 22.875L22.9063 24.6875C21.9271 25.4583 20.875 26.0783 19.75 26.5475C18.625 27.0158 17.4479 27.3125 16.2188 27.4375ZM24.6562 22.875L22.9063 21.125C23.4479 20.4375 23.8854 19.6821 24.2188 18.8587C24.5521 18.0362 24.7812 17.1667 24.9062 16.25H27.4688C27.3021 17.5417 26.9846 18.7446 26.5163 19.8587C26.0471 20.9737 25.4271 21.9792 24.6562 22.875ZM24.9062 13.75C24.7812 12.8125 24.5521 11.9321 24.2188 11.1087C23.8854 10.2863 23.4479 9.54167 22.9063 8.875L24.6562 7.125C25.4479 8.04167 26.0888 9.0625 26.5788 10.1875C27.0679 11.3125 27.3646 12.5 27.4688 13.75H24.9062ZM13.7188 27.4375C10.5313 27.0625 7.87 25.6929 5.735 23.3288C3.59917 20.9638 2.53125 18.1875 2.53125 15C2.53125 11.7708 3.59917 8.97917 5.735 6.625C7.87 4.27083 10.5313 2.91667 13.7188 2.5625V5.0625C11.2188 5.41667 9.14583 6.53125 7.5 8.40625C5.85417 10.2812 5.03125 12.4792 5.03125 15C5.03125 17.5 5.85417 19.6875 7.5 21.5625C9.14583 23.4375 11.2188 24.5625 13.7188 24.9375V27.4375ZM21.1562 7.125C20.4062 6.5625 19.6146 6.10417 18.7812 5.75C17.9479 5.39583 17.0938 5.16667 16.2188 5.0625V2.5625C17.4479 2.66667 18.625 2.95292 19.75 3.42125C20.875 3.89042 21.9271 4.52083 22.9063 5.3125L21.1562 7.125ZM15 21.25C13.3125 19.8125 12.0575 18.4842 11.235 17.265C10.4117 16.0467 10 14.9167 10 13.875C10 12.3125 10.5054 11.0679 11.5163 10.1412C12.5262 9.21375 13.6875 8.75 15 8.75C16.3125 8.75 17.4742 9.21375 18.485 10.1412C19.495 11.0679 20 12.3125 20 13.875C20 14.9167 19.5883 16.0467 18.765 17.265C17.9425 18.4842 16.6875 19.8125 15 21.25ZM15 15C15.375 15 15.6929 14.87 15.9537 14.61C16.2137 14.3492 16.3437 14.0312 16.3437 13.6562C16.3437 13.3021 16.2137 12.9896 15.9537 12.7188C15.6929 12.4479 15.375 12.3125 15 12.3125C14.625 12.3125 14.3075 12.4479 14.0475 12.7188C13.7867 12.9896 13.6562 13.3021 13.6562 13.6562C13.6562 14.0312 13.7867 14.3492 14.0475 14.61C14.3075 14.87 14.625 15 15 15Z"
                        fill="#1D2540"
                      />
                    </g>
                  </svg>
                  <h3 className="mt-1 ms-2">
                    {city
                      ? `${city.charAt(0).toUpperCase() + city.slice(1)}, ${
                          weatherData.city.country
                        }`
                      : "Search a city in the search bar"}
                  </h3>
                </div>
                <div>
                  <p>{`${weatherData.city.coord.lat}°${
                    weatherData.city.coord.lat > 0 ? "N" : "S"
                  } & ${weatherData.city.coord.lon}°${
                    weatherData.city.coord.lon > 0 ? "E" : "W"
                  }`}</p>
                </div>
              </div>
            )}
          </div>

          <div className="col">
            <div className="input-group rounded">
              <div>
                <div className="p-3">
                  <Input
                    style={{
                      padding: "8px 0px 8px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      outline: "none",
                      width: "320px",
                    }}
                    placeholder="Search your city here..."
                    value={city}
                    onChange={handleCityChange}
                    endDecorator={
                      <SearchIcon onClick={handleSearch} />
                        
                      
                    }
                    sx={{ width: 300 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-1"></hr>

        <div className="">
          <div className="d-flex ">
            <div className="col-sm-2 col">
              <div>
                <div>
                  <div className="mt-5">
                    <p className="mb-0" style={{ fontSize: "13px" }}>
                      Select Date:
                    </p>
                    <div style={datePickerWrapperStyle}>
                      <i
                        className="fas fa-calendar-alt"
                        style={calendarIconStyle}
                      ></i>
                      <input
                        type="date"
                        id="datePicker"
                        name="datePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="p-3  " style={{ fontSize: "15px" }}>
                    <p>High Temperature</p>
                    <p>Low Temperature</p>
                    <p>Humidity</p>
                    <p>Sunrise Time</p>
                    <p>Sunset Time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col   " style={{ overflowX: "auto" }}>
              <div>
                <div className=" " style={{ overflowX: "auto" }}>
                  {weatherData ? (
                    weatherData.list && weatherData.list.length > 0 ? (
                      <div style={{ overflowX: "auto" }}>
                        <div className="d-flex">
                          {weatherData &&
                            weatherData.list
                              .filter((item, index) => index % 8 === 0)
                              .slice(0, 5)
                              .map((item, index) => (
                                <div key={index} className="col-md-2 ">
                                  {" "}
                                  <div className="text-dark text-center">
                                    <p
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                      }}
                                    >
                                      {" "}
                                      {formatDate(item.dt_txt)}
                                    </p>
                                  </div>
                                  <div
                                    className="card rounded-3   "
                                    style={{
                                      backgroundColor: "#464646",
                                      margin: "2px",
                                      width: "140px",
                                    }}
                                  >
                                    <div className="text-white d-flex align-items-center justify-content-center">
                                      <div>
                                        {item.weather[0].icon && (
                                          <img
                                            src={`http://openweathermap.org/img/wn/${
                                              item.weather[0].icon.includes(
                                                "01"
                                              )
                                                ? "01d"
                                                : "02d"
                                            }.png`}
                                            alt={item.weather[0].description}
                                            style={{
                                              color: "white",
                                              filter:
                                                item.weather[0].icon.includes(
                                                  "01"
                                                )
                                                  ? "brightness(1.5) saturate(1.3) sepia(0.3) hue-rotate(20deg)"
                                                  : "none",
                                            }}
                                          />
                                        )}
                                      </div>

                                      <h6 className="mt-1">
                                        {item.weather[0].description &&
                                          item.weather[0].description
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.weather[0].description.slice(
                                              1
                                            )}
                                      </h6>
                                    </div>
                                    <hr style={{ color: "white" }}></hr>
                                    <div className="text-white text-center">
                                      <p>
                                        {convertToCelsius(item.main.temp_max)}
                                        °C /{" "}
                                        {convertToFahrenheit(
                                          item.main.temp_max
                                        )}
                                        °F
                                      </p>
                                      <p>
                                        {convertToCelsius(item.main.temp_min)}
                                        °C /{" "}
                                        {convertToFahrenheit(
                                          item.main.temp_min
                                        )}
                                        °F
                                      </p>
                                      <p> {item.main.humidity}%</p>
                                    </div>
                                    <div className="text-white text-center">
                                      <p>
                                        {formatTime(weatherData.city.sunrise)}
                                      </p>
                                      <p>
                                        {formatTime(weatherData.city.sunset)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    ) : (
                      <p style={{ textAlign: "center", color: "red" }}>
                        No weather data available for the searched city.
                      </p>
                    )
                  ) : (
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                      Enter a city and Date then Search to get weather
                      information.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Weather;

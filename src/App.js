import React, { Component } from "react";
import Weather from "./Components/Weather"
import "./App.css";
import "bootstrap-4-react"

const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";

// const Title = () => {
//   return (
//     <div>
//       <h1 className="title-container__title">Weather Finder</h1>
//       <h3 className="title-container__subtitle">
//           check out your weather now
//       </h3>
//     </div>
//   );
// };

const Form = ({ onWeather }) => {
  return (
    <form onSubmit={e => onWeather(e)}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button className="form-button">get Weather</button>
    </form>
  );
};

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if (city && country) {
      try {
        const apiCall = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        const { main, sys, name, weather } = await apiCall.json();
        this.setState({
          temperature: main.temp,
          city: name,
          country: sys.country,
          humidity: main.humidity,
          description: weather[0].description,
          error: ""
        });
      } catch (ex) {
        console.log(ex.message);
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="sub-main">
              <div className="form-container">
                <Form onWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
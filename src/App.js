import React, {Component} from 'react';
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = "96c45c304868d4bdb8c21fef17d45f40";

class App extends Component{
    state = {
        temp: undefined,
        city: undefined,
        county: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined,
    };

    render() {
        return(
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    county={this.state.county}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;

        if (city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_url.json();

            let sunset = data.sys.sunset;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();

            this.setState({
                temp: data.main.temp - 273.15,
                city: data.name,
                county: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: "",
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                county: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Введите название города",
            });
        }

    }
}
export default App;
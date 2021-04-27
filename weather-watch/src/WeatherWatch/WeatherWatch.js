import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Cards from "./Card/Card";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "",
			icon: "",
			description: "",
			minTemp: "",
			maxTemp: "",
			humidity: "",
			windSpeed: "",
			sunrise: "",
			sunset: "",
		};
		this.apiClient = new ApiClient();
	}

	getWeather() {
		this.setState({
			description: "Loading weather...",
			fetching: true,
		});

		this.apiClient.fetchWeatherApi().then((response) => {
			this.updateWeather(response.data.daily[0]);
		});
	}

	updateWeather(response) {
		console.log(response);
		const dateTime = new Date(
			parseInt(response.dt) * 1000
		).toLocaleDateString();
		const sunriseTime = new Date(
			parseInt(response.sunrise) * 1000
		).toLocaleTimeString();
		const sunsetTime = new Date(
			parseInt(response.sunset) * 1000
		).toLocaleTimeString();
		this.setState({
			date: dateTime,
			icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`,
			description: response.weather[0].description,
			minTemp: response.temp.min,
			maxTemp: response.temp.max,
			humidity: response.humidity,
			windSpeed: response.wind_speed,
			sunrise: sunriseTime,
			sunset: sunsetTime,
		});
	}

	componentDidMount() {
		this.getWeather();
	}

	render() {
		return (
			<div>
				<h1>Weather Watch</h1>
				<Cards
					date={this.state.date}
					icon={this.state.icon}
					description={this.state.description}
					minTemp={this.state.minTemp}
					maxTemp={this.state.maxTemp}
					humidity={this.state.humidity}
					windSpeed={this.state.windSpeed}
					sunrise={this.state.sunrise}
					sunset={this.state.sunset}
				/>
			</div>
		);
	}
}

export default WeatherWatch;

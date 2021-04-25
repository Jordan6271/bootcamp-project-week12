import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			icon: "",
			temp: "",
			humidity: "",
			windSpeed: "",
			sunrise: "",
			sunset: "",
			appid: "ed18e45826554b0f52007a1992b575df",
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
		this.setState({
			description: response.weather[0].description,
			temp: response.temp.day,
			humidity: response.humidity,
			windSpeed: response.wind_speed,
			sunrise: response.sunrise,
			sunset: response.sunset,
		});
	}

	componentDidMount() {
		this.getWeather();
	}

	render() {
		return (
			<div>
				<h1>Weather Watch</h1>
				<h2>Luton</h2>
				<p>
					<b>Weather: </b>
					{this.state.weather}
				</p>
				<p>
					<b>Icon: </b>
				</p>
				<p>
					<b>Temperature: </b>
					{this.state.temp}
				</p>
				<p>
					<b>Humidity: </b>
					{this.state.humidity}
				</p>
				<p>
					<b>Wind Speed: </b>
					{this.state.windSpeed}
				</p>
				<p>
					<b>Sunrise: </b>
					{this.state.sunrise}
				</p>
				<p>
					<b>Sunset: </b>
					{this.state.sunset}
				</p>
			</div>
		);
	}
}

export default WeatherWatch;

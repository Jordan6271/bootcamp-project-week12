import React from "react";
import axios from "axios";

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
			fetching: true,
			appid: "ed18e45826554b0f52007a1992b575df",
		};
	}

	updateWeather(response) {
		console.log(response);
		this.setState({
			description: response.daily[0].weather[0].description,
			temp: response.daily[0].temp.day,
			humidity: response.daily[0].humidity,
			windSpeed: response.daily[0].wind_speed,
			sunrise: response.daily[0].sunrise,
			sunset: response.daily[0].sunset,
		});
	}

	status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}

	componentDidMount() {
		this.setState({
			description: "...loading",
			icon: "",
			temp: "",
			humidity: "",
			windSpeed: "",
			sunrise: "",
			sunset: "",
		});

		axios
			.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=51.8787&lon=0.4200&units=metric&exclude=hourly,minutely&appid=${this.state.appid}`
			)
			.then(this.status)
			.then((response) => this.updateWeather(response.data))
			.catch((error) => {
				console.error(error);
				alert(error);
			})
			.finally(() => {
				this.setState({ fetching: false });
			});
	}

	render() {
		return (
			<div>
				<h1>Weather Watch</h1>
				<h2>Luton</h2>
				<p>
					<b>Weather: </b>
					{this.state.description}
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

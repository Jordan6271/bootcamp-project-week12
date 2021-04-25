import React from "react";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: "",
			lon: "",
			weather: [],
		};
	}

	updateWeather(response) {
		this.setState({
			lat: response.lat,
			lon: response.lon,
			weather: response.weather,
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
			lat: "",
			lon: "",
			weather: ["...loading"],
		});

		fetch(
			"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=ed18e45826554b0f52007a1992b575df"
		)
			.then(this.status)
			.then((response) => response.json())
			.then((response) => this.updateWeather(response))
			.catch((error) => {
				console.error(error);
				alert(error);
			});
	}

	render() {
		return (
			<div>
				<h1>Weather Watch</h1>
				<p>
					<b>Weather: </b>
					{this.state.weather}
				</p>
				<p>
					<b>Latitude: </b>
					{this.state.lat}
				</p>
				<p>
					<b>Longitude: </b>
					{this.state.lon}
				</p>
			</div>
		);
	}
}

export default WeatherWatch;

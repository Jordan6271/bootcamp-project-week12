import React from "react";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: "",
			lon: "",
			appid: "",
			weather: [],
		};
	}

	componentDidMount() {
		this.setState({
			lat: "33.44",
			lon: "-94.04",
			appid: "ed18e45826554b0f52007a1992b575df",
			weather: ["Sunny", "Rain", "Very Cold"],
		});
	}

	render() {
		return (
			<div>
				<h1>Weather Watch</h1>
				<p>
					<b>Weather: </b>
					{this.state.weather.join(", ")}
				</p>
				<p>
					<b>Latitude: </b>
					{this.state.lat}
				</p>
				<p>
					<b>Longitude: </b>
					{this.state.lon}
				</p>
				<p>
					<b>API Key: </b>
					{this.state.appid}
				</p>
			</div>
		);
	}
}

export default WeatherWatch;

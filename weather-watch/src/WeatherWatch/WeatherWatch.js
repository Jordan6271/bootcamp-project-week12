import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import Cards from "./Cards/Cards";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			weather: [],
			loadState: "",
			// sunrise: "",
			// sunset: "",
		};
		this.apiClient = new ApiClient();
	}

	createCards() {
		return this.state.weather.slice(1, 8).map((current, i) => (
			<Col key={i}>
				<CardGroup>
					<Cards
						date={current.dt}
						icon={current.weather[0].icon}
						description={current.weather[0].description}
						minTemp={current.temp.min}
						maxTemp={current.temp.max}
						humidity={current.humidity}
						windSpeed={current.wind_speed}
						sunrise={current.sunrise}
						sunset={current.sunset}
					/>
					;
				</CardGroup>
			</Col>
		));
	}

	getWeather() {
		this.setState({
			loadState: "Loading weather...",
			fetching: true,
		});

		this.apiClient
			.fetchWeatherApi()
			.then((response) => {
				this.updateWeather(response.data.daily);
			})
			.finally(() => {
				this.setState({
					loadState: "",
				});
			});
	}

	updateWeather(response) {
		// const sunriseTime = new Date(
		// 	parseInt(response.sunrise) * 1000
		// ).toLocaleTimeString();
		// const sunsetTime = new Date(
		// 	parseInt(response.sunset) * 1000
		// ).toLocaleTimeString();
		this.setState({
			// sunrise: sunriseTime,
			// sunset: sunsetTime,
			weather: response,
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
				{this.createCards()}
			</div>
		);
	}
}

export default WeatherWatch;

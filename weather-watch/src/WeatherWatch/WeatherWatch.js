import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Cards from "./Cards/Cards";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

class WeatherWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentWeather: [],
			dailyWeather: [],
			loadState: "",
		};
		this.apiClient = new ApiClient();
	}

	createCards() {
		return this.state.dailyWeather.slice(0, 8).map((current, i) => (
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
			.fetchWeatherApi("Luton")
			.then((response) => {
				this.updateWeather(response.data);
			})
			.finally(() => {
				this.setState({
					loadState: "",
				});
			});
	}

	updateWeather(response) {
		console.log(response.current.temp);
		this.setState({
			currentWeather: response.current,
			dailyWeather: response.daily,
		});
	}

	componentDidMount() {
		this.getWeather();
	}

	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand>Weather Watch</Navbar.Brand>
					<div class="navbar-nav">
						<span class="nav-link disabled text-danger">Luton</span>
					</div>
				</Navbar>
				<Container>
					<b>Current Temp: {this.state.currentWeather.temp}</b>
					{this.createCards()}
				</Container>
			</div>
		);
	}
}

export default WeatherWatch;

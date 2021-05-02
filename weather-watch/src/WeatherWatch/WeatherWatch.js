import React, { useEffect, useState } from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Cards from "./Cards/Cards";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import ReactCardCarousel from "react-card-carousel";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

const WeatherWatch = (props) => {
	const [location, setLocation] = useState(`Luton`);
	const [currentWeather, setCurrentWeather] = useState([]);
	const [dailyWeather, setDailyWeather] = useState([]);
	const [loadState, setLoadState] = useState(``);
	const apiClient = new ApiClient();

	const createCards = () => {
		return dailyWeather.slice(0, 7).map((current, i) => (
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
	};

	const changeLocation = (current) => {
		setLocation(current).then(() => {
			getWeather();
		});
	};

	const getWeather = () => {
		setLoadState(`Loading weather...`);

		apiClient.fetchWeatherApi(location)
			.then((response) => {
				updateWeather(response.data);
			})
			.finally(() => {
				setLoadState(``);
			});
	};

	const updateWeather = (response) => {
		setCurrentWeather(response.current);
		setDailyWeather(response.daily);
	};

	useEffect(() => {
		getWeather();
	});

	return (
		<Router>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>Weather Watch</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link
							to="/Luton"
							className="nav-link text-danger"
							onClick={() => changeLocation("Luton")}
						>
							Luton
						</Link>
						<Link
							to="/London"
							className="nav-link text-danger"
							onClick={() => changeLocation("London")}
						>
							London
						</Link>
						<Link
							to="/Sheffield"
							className="nav-link text-danger"
							onClick={() => changeLocation("Sheffield")}
						>
							Sheffield
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container>
				<Switch>
					<Route path="/Luton">
						<h1
							style={{
								textAlign: "center",
								marginTop: "20px",
							}}
						>
							{location}{" "}
							<span
								style={{
									fontWeight: "normal",
									fontSize: "2rem",
								}}
							>
								(currently {currentWeather.temp}
								°C)
							</span>
						</h1>
						{loadState}
						<Row>
							<ReactCardCarousel disable_box_shadow={true}>
								{createCards()}
							</ReactCardCarousel>
						</Row>
					</Route>
					<Route path="/London">
						<h1
							style={{
								textAlign: "center",
								marginTop: "20px",
							}}
						>
							{location}{" "}
							<span
								style={{
									fontWeight: "normal",
									fontSize: "2rem",
								}}
							>
								(currently {currentWeather.temp}
								°C)
							</span>
						</h1>
						{loadState}
						<Row>
							<ReactCardCarousel disable_box_shadow={true}>
								{createCards()}
							</ReactCardCarousel>
						</Row>
					</Route>
					<Route path="/Sheffield">
						<h1
							style={{
								textAlign: "center",
								marginTop: "20px",
							}}
						>
							{location}{" "}
							<span
								style={{
									fontWeight: "normal",
									fontSize: "2rem",
								}}
							>
								(currently {currentWeather.temp}
								°C)
							</span>
						</h1>
						{loadState}
						<Row>
							<ReactCardCarousel disable_box_shadow={true}>
								{createCards()}
							</ReactCardCarousel>
						</Row>
					</Route>
					<Route exact path="/">
						<h1
							style={{
								textAlign: "center",
								marginTop: "20px",
								marginBottom: "80px",
							}}
						>
							{location}{" "}
							<span
								style={{
									fontWeight: "normal",
									fontSize: "2rem",
								}}
							>
								(currently {currentWeather.temp}
								°C)
							</span>
						</h1>
						{loadState}
						<Row>
							<ReactCardCarousel disable_box_shadow={true}>
								{createCards()}
							</ReactCardCarousel>
						</Row>
					</Route>
					<Route path="/">That location is not supported.</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default WeatherWatch;

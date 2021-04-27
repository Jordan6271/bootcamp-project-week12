import React from "react";
import Card from "react-bootstrap/Card";

class Cards extends React.Component {
	render() {
		const date = this.props.date;
		const icon = this.props.icon;
		const description = this.props.description;
		const minTemp = this.props.minTemp;
		const maxTemp = this.props.maxTemp;
		const humidity = this.props.humidity;
		const windSpeed = this.props.windSpeed;
		const sunrise = this.props.sunrise;
		const sunset = this.props.sunset;

		return (
			<div>
				<Card>
					<Card.Header>
						<h2>Luton</h2>
						<h3>Date: {date}</h3>
					</Card.Header>
					<Card.Body>
						<p
							style={{
								textTransform: "capitalize",
							}}
						>
							<img src={icon} alt="Icon of weather" />
							<br />
							{description}
						</p>
						<p>
							<b>Min Temp: </b>
							{minTemp}°C
						</p>
						<p>
							<b>Max Temp: </b>
							{maxTemp}°C
						</p>
						<p>
							<b>Humidity: </b>
							{humidity}%
						</p>
						<p>
							<b>Wind Speed: </b>
							{windSpeed}mph
						</p>
						<p>
							<b>Sunrise: </b>
							{sunrise}
						</p>
						<p>
							<b>Sunset: </b>
							{sunset}
						</p>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default Cards;

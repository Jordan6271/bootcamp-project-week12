import React from "react";
import Card from "react-bootstrap/Card";
import { days, months } from "../Date/Date";

const WeeklyCard = (props) => {
	const timestamp = new Date(parseInt(props.date) * 1000);
	const dateDay = days[timestamp.getDay(timestamp)];
	const dateMonth = months[timestamp.getMonth(timestamp)];
	const date = fixDate(timestamp.getDate(timestamp));
	const icon = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
	const description = props.description;
	const minTemp = props.minTemp;
	const maxTemp = props.maxTemp;
	const humidity = props.humidity;
	const windSpeed = props.windSpeed;
	const sunrise = new Date(
		parseInt(props.sunrise) * 1000
	).toLocaleTimeString();
	const sunset = new Date(parseInt(props.sunset) * 1000).toLocaleTimeString();

	function fixDate(date) {
		if (date.toString().match(/.*[1]$/g)) {
			return `${date}st`;
		} else if (date.toString().match(/.*[2]$/g)) {
			return `${date}nd`;
		} else if (date.toString().match(/.*[3]$/g)) {
			return `${date}rd`;
		} else {
			return `${date}th`;
		}
	}

	return (
		<div>
			<Card
				style={{
					width: "250px",
					minHeight: "500px",
					textAlign: "center",
					marginTop: "100px",
					border: "5px solid white",
					borderRadius: "10px",
				}}
			>
				<Card.Header className="bg-primary">
					<h3>
						{dateDay} {date} {dateMonth}
					</h3>
				</Card.Header>
				<Card.Body
					className="justify-content-center"
					style={{
						backgroundColor: "lightblue",
					}}
				>
					<p
						style={{
							textTransform: "capitalize",
						}}
					>
						<img src={icon} alt={description} />
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
};

export default WeeklyCard;

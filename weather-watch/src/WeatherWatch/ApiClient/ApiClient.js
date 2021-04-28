import axios from "axios";

export class ApiClient {
	status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}

	fetchWeatherApi(location) {
		if (location === "London") {
			return this.getRequest(
				`https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&units=metric&exclude=hourly,minutely&appid=ed18e45826554b0f52007a1992b575df`
			);
		} else if (location === "Sheffield") {
			return this.getRequest(
				`https://api.openweathermap.org/data/2.5/onecall?lat=53.3811&lon=1.4701&units=metric&exclude=hourly,minutely&appid=ed18e45826554b0f52007a1992b575df`
			);
		} else if (location === "Luton") {
			return this.getRequest(
				`https://api.openweathermap.org/data/2.5/onecall?lat=51.8787&lon=0.4200&units=metric&exclude=hourly,minutely&appid=ed18e45826554b0f52007a1992b575df`
			);
		} else {
			alert(`That location is not supported.`);
		}
	}

	getRequest(url) {
		return axios
			.get(url)
			.then(this.status)
			.catch(function (error) {
				console.error(error);
				alert(error);
			});
	}
}

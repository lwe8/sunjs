import { convertDecimalTime, timeDiff } from "./destime.js";
import suntime from "./suntime.js";

/**
 * Computes the sunrise, sunset, and daytime duration for a given location and date.
 *
 * @param {SuntimesOptions} options - An object containing the latitude, longitude, date, and optional timezone.
 * @returns {SuntimesResult} - An object containing the formatted sunrise, sunset, and daytime duration strings.
 *
 * The function uses the `suntime` function to calculate the decimal times for sunrise and sunset,
 * which are then converted to formatted strings using `convertDecimalTime`. If the sun never rises
 * or sets, the result will indicate "Never". If the times are not available, "N/A" is returned.
 */

export function suntimes(options: SuntimesOptions): SuntimesResult {
	const { latitude, longitude, date, timezone } = options;
	const [sunriseDecimal, sunsetDecimal] = suntime(
		latitude,
		longitude,
		date,
		timezone,
	);
	let sunrise: string;
	let sunset: string;
	let daytime: string;

	if (sunriseDecimal === null && sunsetDecimal === -1) {
		sunrise = "Never";
		sunset = "";
		daytime = "";
	} else if (sunriseDecimal === -1 && sunsetDecimal === null) {
		sunrise = "";
		sunset = "Never";
		daytime = "";
	} else if (sunriseDecimal !== null && sunsetDecimal !== null) {
		sunrise = convertDecimalTime(sunriseDecimal);
		sunset = convertDecimalTime(sunsetDecimal);
		daytime = timeDiff(sunriseDecimal, sunsetDecimal);
	} else {
		sunrise = "N/A";
		sunset = "N/A";
		daytime = "N/A";
	}

	return { sunrise, sunset, daytime };
}

export interface SuntimesOptions {
	latitude: number;
	longitude: number;
	date: Date;
	timezone?: number;
}

export interface SuntimesResult {
	sunrise: string;
	sunset: string;
	daytime: string;
}

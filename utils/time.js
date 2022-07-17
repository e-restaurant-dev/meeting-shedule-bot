const currentDate = new Date();
const acceptedTimeZones = {
	pl: {
		zone: 'GMT+2',
		offset: Math.abs(currentDate.getTime() - new Date(`${currentDate.toUTCString}+2`)),
	},
	vl: {
		zone: 'GMT+10',
		offset: Math.abs(currentDate.getTime() - new Date(`${currentDate.toUTCString}+10`)),
	},
};

/**
 * Returns Date instance with applied time zone
 * Time zone is apply by converting time from {dateString} to the local time
 * For example, if system in GMT+2, when you passing "10:20 GMT+10", the date object would have time "02:20"
 * @param {string} dateString parsable date string
 * @param {string} timeZone Time zone in format like "GMT+2"
 * @returns {Date}
 */
function getDateWithTimeZone(dateString, timeZone) {
	return new Date(`${dateString} ${timeZone}`);
}

function getScheduleTime(date) {
	return Object.entries(acceptedTimeZones).map(([location, info]) => ({
		location,
		zone: info.zone,
		date: new Date(date.getTime() + info.offset),
	}));
}

function getFormatDateString(date) {
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

module.exports = {
	getScheduleTime,
	getDateWithTimeZone,
	getFormatDateString,
	acceptedTimeZones,
};

function standardToMilitary(time) {
	var PM = time.match("PM") ? true : false;
	var hour;
	var minute;


	time = time.split(":");

	if (PM) {
		hour = 12 + parseInt(time[0], 10);
		minute = time[1].replace("PM", "");
	} else {
		hour = time[0];
		minute = time[1].replace("AM", "");
	}

	return `${hour}:${minute}`;
}

export default standardToMilitary;

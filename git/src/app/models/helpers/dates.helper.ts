import * as moment from "moment";
import * as is from "is_js";

export const AMAZE_DATE_FORMAT                = "MM/DD/YYYY";
export const AMAZE_DATE_TIME_FORMAT           = "MM/DD/YYYY, hh:mm";
export const AMAZE_DATE_TIME_WITH_HOUR_FORMAT = "MM/DD/YYYY, hh:mm A";
export const AMAZE_TIME_FORMAT                = "hh:mm A";
export const AMAZE_DATE_FILTER_FORMAT         = "YYYY-MM-DD";

export const AMAZE_DATE_HELPER = (options:any) => {
	let resultantDate = "";
	if(is.not.undefined(options)){
		const { date, format } = options;
		switch(format){
			case "date":
				resultantDate = moment(date).format(AMAZE_DATE_FORMAT);
				break;
			case "datetime":
				resultantDate = moment(date).format(AMAZE_DATE_TIME_FORMAT);
				break;
			case "longDatetime":
				resultantDate = moment(date).format(AMAZE_DATE_TIME_WITH_HOUR_FORMAT);
				break;
			case "time":
				resultantDate = moment(date).format(AMAZE_TIME_FORMAT);
				break;
			case "validity":
				break;
		}
	}
	return resultantDate;
};

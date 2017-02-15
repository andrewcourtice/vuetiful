import isValid from "date-fns/is_valid";
import isWithinRange from "date-fns/is_within_range";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import eachDay from "date-fns/each_day";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import setMonth from "date-fns/set_month";

import pageBy from "../utilities/page-by";
import firstOf from "../utilities/first-of.js";
import lastOf from "../utilities/last-of.js";

const EPOCH_MIN = new Date(-8640000000000000);
const EPOCH_MAX = new Date(8640000000000000);

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function cleanDate(date) {
    return isValid(date) ? date : new Date();
}



export default class CalendarMonth {

    get weekdays() {
        return weekdays;
    }

    get minDate() {
        return this._minDate;
    }

    set minDate(date) {
        this._minDate = cleanDate(date);
    }

    get maxDate() {
        return this._maxDate;
    }

    set maxDate(date) {
        this._maxDate = cleanDate(date);
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(date) {
        this._startDate = cleanDate(date);

        if (!isWithinRange(this._startDate, this._minDate, this._maxDate)) {
            this._startDate = this.minDate;
        }
    }

    get paddingStart() {
        let firstWeek = firstOf(this.weeks);
        let firstDay = firstOf(firstWeek);

        return firstDay.getDay();
    }

    get paddingEnd() {
        let weeks = this.weeks;
        let lastWeek = lastOf(weeks);
        let lastDay = lastOf(lastWeek);

        return 6 - lastDay.getDay();
    }

    generate() {
        let monthStart = startOfMonth(this.startDate);
        let monthEnd = endOfMonth(this.startDate);

        let days = eachDay(monthStart, monthEnd);

        this.weeks = pageBy(days, day => {
            let weekPosition = day.getDay() + 1;
            let monthPosition = day.getDate();

            let position = (13 - weekPosition + monthPosition) / 7;

            return Math.floor(position);
        });

        return this.weeks;
    }

    previousMonth() {
        this.startDate = subMonths(this.startDate, 1);
        return this.generate();
    }

    nextMonth() {
        this.startDate = addMonths(this.startDate, 1);
        return this.generate();
    }

    goToMonth(month) {
        this.startDate = setMonth(this.startDate, month);
        return this.generate();
    }

    constructor(startDate, minDate, maxDate) {
        this.minDate = minDate || EPOCH_MIN;
        this.maxDate = maxDate || EPOCH_MAX;
        this.startDate = startDate || new Date();

        this.generate();
    }

}
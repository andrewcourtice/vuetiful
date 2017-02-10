
import isValid from "date-fns/is_valid";
import isWithinRange from "date-fns/is_within_range";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import getDaysInMonth from "date-fns/get_days_in_month";
import eachDay from "date-fns/each_day";

import groupBy from "../utilities/group-by";

const EPOCH_MIN = new Date(-8640000000000000);
const EPOCH_MAX = new Date(8640000000000000);

function cleanDate(date) {
    return isValid(date) ? date : new Date();
}

export default class CalendarMonth {


    generate() {
        let monthStart = startOfMonth(this.startDate);
        let monthEnd = endOfMonth(this.startDate);

        let days = eachDay(monthStart, monthEnd);
        
        let weeks = groupBy(days, day => {
            let weekPosition = (day.getDay() + 1) / 7;
            let monthPosition = day.getDate() / days.length;

            console.log((7 * days.length) / (weekPosition * monthPosition));
        });

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

    constructor(startDate, minDate, maxDate) {
        this.minDate = minDate || EPOCH_MIN;
        this.maxDate = maxDate || EPOCH_MAX;
        this.startDate = startDate || new Date();

        this.generate();
    }

}
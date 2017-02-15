<template>
    <div class="calendar table-wrapper">
        <div class="calendar-header" layout="row center-justify">
            <button class="button" @click="previous">Previous</button>
            <div class="calendar-month-name">{{ calendar.startDate | date("MMMM YYYY") }}</div>
            <button class="button" @click="next">Next</button>
        </div>
        <table>
            <thead>
                <tr>
                    <td v-for="weekday in calendar.weekdays">{{ weekday }}</td>
                </tr>
            </thead>
            <tbody>
                <tr class="calendar-week" v-for="(week, index) in calendar.weeks">
                    <template v-if="index == 0">
                        <td class="calendar-day" v-for="spacer in calendar.paddingStart"></td>
                    </template>
                    <td class="calendar-day" v-for="day in week">
                        <div>{{ day.getDate() }}</div>
                    </td>
                    <template v-if="(index + 1) == calendar.weeks.length">
                        <td class="calendar-day" v-for="spacer in calendar.paddingEnd"></td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import CalendarMonth from "../../services/calendar.js";
    import format from "date-fns/format";

    export default {

        data() {
            return {
                calendar: new CalendarMonth()
            };
        },

        methods: {

            previous() {
                this.calendar.previousMonth();
            },

            next() {
                this.calendar.nextMonth();
            }

        },

        filters: {

            date(value, pattern) {
                return format(value, pattern);
            }

        }

    }
</script>
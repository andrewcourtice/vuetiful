<template>
    <div class="calendar table-wrapper">
        <table>
            <thead>
                <tr>
                    <td v-for="weekday in calendar.weekdays">{{ weekday }}</td>
                </tr>
            </thead>
            <tbody>
                <tr class="calendar-week" v-for="(week, index) in calendar.month">
                    <td class="calendar-day" v-for="day in week">
                        <div>{{ day.getDate() }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import CalendarMonth from "../../services/calendar.js";

    export default {

        data() {
            return {
                calendar: new CalendarMonth()
            };
        }

    }
</script>
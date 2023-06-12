import moment from 'moment';

export function checkDate(start_date, end_date) {
    const startDate = moment.unix(start_date / 1000).startOf('day');
    const endDate = moment.unix(end_date / 1000).startOf('day');
    const today = moment().startOf('day');
    return startDate.isSameOrBefore(today) && today.isSameOrBefore(endDate);
}
// This function gets the start date and end date and compares it with the current day-today and moment also converts the date into unix format
export function getAvailability(start_date, end_date) {
    const startDate = moment.unix(start_date / 1000).startOf('day');
    const endDate = moment.unix(end_date / 1000).startOf('day');
    const today = moment().startOf('day');

    // if end date comes before the current day, then it will return Unavailable
    if (endDate.isBefore(today)) {
        return { status: 'Unavailable', color: 'red' };
        // If the start date is same as current date or before, it'll show the remainder number of days the item is available using endDate.diff method.
    } else if (startDate.isSameOrBefore(today) && today.isSameOrBefore(endDate)) {
        return { status: `Available for next ${endDate.diff(today, 'days')} days`, color: 'green' };
        // If the dates don't fall into the above categories it will show the item available for number of days after the current date.
    } else {
        return { status: `Available after ${startDate.diff(today, 'days')} days`, color: 'orange' };
    }
}

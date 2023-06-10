import moment from 'moment';
export function checkDate(start_date, end_date) {
    const startDate = moment.unix(start_date / 1000).startOf('day');
    const endDate = moment.unix(end_date / 1000).startOf('day');
    const today = moment().startOf('day');
    return startDate.isSameOrBefore(today) && today.isSameOrBefore(endDate);
}
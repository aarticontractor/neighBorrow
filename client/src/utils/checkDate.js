import moment from 'moment';
export function checkDate(start_date, end_date) {
    const startDate = moment.unix(start_date / 1000);
    const endDate = moment.unix(end_date / 1000);
    const today = moment().startOf('day');
    return startDate <= today && today <= endDate;
}
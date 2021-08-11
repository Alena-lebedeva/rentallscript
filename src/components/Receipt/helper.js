import moment from 'moment';

export function generateTime(time) {
    let timeLabel;
    time = time == 25 ? 1 : time;
    time = time == 26 ? 2 : time;
    timeLabel = moment(time, ["HH"]).format("h A");
    
    return timeLabel;
}
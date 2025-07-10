import moment from 'moment-timezone';

export function formatToIST(utcDateString: string) {
  const istMoment = moment.utc(utcDateString).tz("Asia/Kolkata");

  return {
    day: istMoment.format("DD"),
    month: istMoment.format("MMM"),
    year: istMoment.format("YYYY"),
    weekday: istMoment.format("ddd"),
    time: istMoment.format("HH:mm:ss"),
    timezone: istMoment.format("z"), // IST
    full: istMoment.format("ddd MMM DD YYYY HH:mm:ss [GMT]Z")
  };
}

export function pad(number) {
  let s = number.toString();
  while (s.length < 2) s = `0${s}`;
  return s;
}

// Calculating time difference
export function calculateDifference(time1, time2) {
  function parse(time, index) {
    return parseInt(time.split(':')[index], 10);
  }

  function makeObject(time) {
    return {
      hour: parse(time, 0),
      minute: parse(time, 1),
    };
  }

  const firstTime = makeObject(time1);
  const secondTime = makeObject(time2);

  let hours = secondTime.hour - firstTime.hour;
  let minutes = secondTime.minute - firstTime.minute;
  if (hours < 0) {
    hours += 24;
  }
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }

  return `${pad(hours)}:${pad(minutes)}`;
}

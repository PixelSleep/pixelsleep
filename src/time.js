/**
 * Pad a value with leading zeros untill it's atleast 2 char big.
 * For example: pad(0) => '00'
 * @param  {number|string} val To be padded
 * @return {string}            Padded value
 */
export function pad(val) {
  let s = val.toString();
  while (s.length < 2) s = `0${s}`;
  return s;
}

/**
 * Calculate difference in time between two times
 * @param  {string} time1 format 'hh:mm'
 * @param  {string} time2 format 'hh:mm'
 * @return {string} in format 'hh:mm'
 */
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

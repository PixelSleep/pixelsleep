import $ from 'jquery';
import * as time from './time';

// Clock
function getClock() {
  function pad(num, size) {
    let s = num.toString();
    while (s.length < size) {
      s = `0${s}`;
    }
    return s;
  }

  // Get Current Time
  const d = new Date();
  const str = `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)}`;

  // Get the Context 2D or 3D
  const clock = document.getElementById('clock');
  const context = clock.getContext('2d');
  context.clearRect(0, 0, 500, 200);
  context.font = '80px Arial';
  context.fillStyle = '#717070';
  context.fillText(str, 42, 125);
}
setInterval(getClock, 1000);

$('input[name="slapen"], input[name="opstaan"]').change(() => {
  const slapen = $('input[name="slapen"]').val();
  const opstaan = $('input[name="opstaan"]').val();
  // Only calculate if both fields are filled in
  if (opstaan === '' || slapen === '') {
    return;
  }
  const diff = time.calculateDifference(slapen, opstaan);
  $('input[name="slaaptijd"]').val(diff);
});

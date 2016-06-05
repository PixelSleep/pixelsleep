import $ from 'jquery';
import * as time from './time';

// Clock
function getClock() {
    // Get Current Time
  const d = new Date();
  const str = `${time.pad(d.getHours())}:${time.pad(d.getMinutes())}:${time.pad(d.getSeconds())}`;

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

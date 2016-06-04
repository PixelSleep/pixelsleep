function pad(num, size) {
  let s = num.toString();
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

// Clock
function getClock() {
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

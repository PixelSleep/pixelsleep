// Clock
function getClock() {
    //Get Current Time
    const d = new Date();
    const str = prefixZero(d.getHours(), d.getMinutes(), d.getSeconds());

    //Get the Context 2D or 3D
    const clock = document.getElementById('clock');
    const context = clock.getContext("2d");
    context.clearRect(0, 0, 500, 200);
    context.font = "80px Arial";
    context.fillStyle = "#717070";
    context.fillText(str, 42, 125);
}

function prefixZero(hour, min, sec) {
    let curTime;
    if (hour < 10)
        curTime = "0" + hour.toString();
    else
        curTime = hour.toString();

    if (min < 10)
        curTime += ":0" + min.toString();
    else
        curTime += ":" + min.toString();

    if (sec < 10)
        curTime += ":0" + sec.toString();
    else
        curTime += ":" + sec.toString();
    return curTime;
}

setInterval(getClock, 1000);

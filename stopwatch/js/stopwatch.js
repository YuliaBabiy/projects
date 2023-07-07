const startBtn = document.querySelector('#start');
const resetAndLapBtn = document.querySelector('#reset-n-loop');
const lapTimeEl = document.querySelector('#laps');
const lapListEl = document.querySelector('#lap-num');

startBtn.addEventListener('click', toggleTimer);
resetAndLapBtn.addEventListener('click', lapOrRestTimer);

const time = {
  m: 0,
  s: 0,
  ms: 0,
  /**
   * Returns current time in "min:sec:ms" format
   * @returns {string}
   */
  formatted: function () {
    const format = (value) => {
      return value < 10 ? `0${value}` : value;
    };

    return format(this.m) + ':' +
           format(this.s) + ',' +
           format(this.ms);
  },
  /**
   * Resets the time to 0
   * @returns {void}
   */
  reset: function () {
    this.m = 0;
    this.s = 0;
    this.ms = 0;
  },
  get: function () {
    const { m, s, ms } = this;
    return { m, s, ms };
  },
};

let timerInterval;
let hasStarted = false;
let lapsCount = 0;
const laps = [];

updateTime();

function toggleTimer() {
  if (!hasStarted) {
    timerInterval = setInterval(updateTime, 10);
    hasStarted = true;
  } else {
    stopTimer();
  }

  resetAndLapBtn.innerHTML = hasStarted ? 'Lap' : 'Reset';

  if (hasStarted) {
    startBtn.innerHTML = 'Stop';
    startBtn.classList.add('stop');
  } else {
    startBtn.innerHTML = 'Start';
    startBtn.classList.remove('stop');
  }
}

function lapOrRestTimer() {
  if (!hasStarted) {
    resetTimer();
    laps = [];
    return;
  }

  lapsCount++;
  lapListEl.innerHTML += `Lap ${lapsCount}
    <br><div class="border"></div>`;

  const currentTimeMs = convertTimeToMs();
  const lastLapMS = laps.length
    ? convertTimeToMs(laps[laps.length - 1])
    : 0;
  const currentLapTime = laps.length
    ? convertMsToTime(currentTimeMs - lastLapMS)
    : time.formatted();

  lapTimeEl.innerHTML += `${currentLapTime}<br>`;

  laps.push(time.get());
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    hasStarted = false;
  }
}

function resetTimer() {
  stopTimer();
  time.reset();
  updateTime();
  clearLaps();
}

function clearLaps() {
  lapTimeEl.innerHTML = '';
  lapListEl.innerHTML = '';
  lapsCount = 0;
}

function updateTime() {
  document.querySelector('#stopwatch').innerHTML = time.formatted();

  timer();
}

function timer() {
  if (time.ms < 99) {
    time.ms++;
  } else {
    time.ms = 0;

    if (time.s < 59) {
      time.s++;
    } else {
      time.s = 0;

      if (time.m < 59) {
        time.m++;
      } else {
        time.m = 0;
        time.h++;
      }
    }
  }
}

function convertTimeToMs({ m, s, ms } = time) {
  let res = 0;

  res += ms;
  res += s * 100;
  res += m * 6000;

  return res;
}

function convertMsToTime(timestamp) {
  const format = (value = 0) => {
    return value < 10 ? `0${value}` : value;
  };

  const m = Math.floor(timestamp / 6000);
  const s = Math.floor(timestamp / 100);

  const ms = Number((timestamp.toString()).slice(-2));

  return format(m) + ':' + format(s) + ',' + format(ms);
}

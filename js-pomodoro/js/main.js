$(document).ready(function() {
  $('#increase-break').on('click', Pomodoro.increaseBreak);
  $('#decrease-break').on('click', Pomodoro.decreaseBreak);
  $('#increase-session').on('click', Pomodoro.increaseSession);
  $('#decrease-session').on('click', Pomodoro.decreaseSession);
  $('#circle').on('click', Pomodoro.togglePomodoro);

  Pomodoro.renderBreak();
  Pomodoro.renderSession();
  Pomodoro.renderCircle();

});

Pomodoro = {};

// State
Pomodoro.breakLength = 60;
Pomodoro.sessionLength = 60;
Pomodoro.timeLeft = Pomodoro.sessionLength;
Pomodoro.countdownLive = false;
Pomodoro.intervalID = undefined;

// functions
Pomodoro.increaseBreak = function() {
  if (Pomodoro.countdownLive) {
    return undefined;
  }

  Pomodoro.breakLength += 60;
  Pomodoro.renderBreak();
};
Pomodoro.decreaseBreak = function() {
  if (Pomodoro.countdownLive || Pomodoro.breakLength <= 60) {
    return undefined;
  }

  Pomodoro.breakLength -= 60;
  Pomodoro.renderBreak();
};
Pomodoro.increaseSession = function() {
  if (Pomodoro.countdownLive) {
    return undefined;
  }

  Pomodoro.sessionLength += 60;
  Pomodoro.afterSessionUpdateActions();
};
Pomodoro.decreaseSession = function() {
  if (Pomodoro.countdownLive || Pomodoro.sessionLength <= 60) {
    return undefined;
  }

  Pomodoro.sessionLength -= 60;
  Pomodoro.afterSessionUpdateActions();
};
Pomodoro.afterSessionUpdateActions = function() {
  Pomodoro.renderSession();
  Pomodoro.timeLeft = Pomodoro.sessionLength;
  Pomodoro.switchToSession();
  Pomodoro.renderCircle();
};
Pomodoro.renderCircle = function() {
  var seconds = Pomodoro.formatSeconds(Pomodoro.timeLeft % 60);
  var minutes = Pomodoro.formatMinutes(Pomodoro.timeLeft / 60);

  $('#time-left').text(minutes + ":" + seconds);
};
Pomodoro.formatSeconds = function(seconds) {
  var seconds = String(seconds);

  if (seconds.length == 1) {
    return "0" + seconds;
  }

  return seconds;
};
Pomodoro.formatMinutes = function(minutes) {
  var minutes = Math.floor(minutes);
  minutes = String(minutes);

  if (minutes.length === 1) {
    return "0" + minutes;
  }

  return minutes;
};
Pomodoro.renderBreak = function() {
  $('#break-time').html(Pomodoro.breakLength / 60);
};
Pomodoro.renderSession = function() {
  $('#session-time').html(Pomodoro.sessionLength / 60);
};
Pomodoro.togglePomodoro = function() {
  if (Pomodoro.countdownLive) {
    clearInterval(Pomodoro.intervalID);
    Pomodoro.countdownLive = false;
    Pomodoro.intervalID = undefined;
  } else {
    Pomodoro.countdownLive = true;
    Pomodoro.intervalID = setInterval(Pomodoro.elapseTime, 1000);
  }
}
Pomodoro.elapseTime = function() {
  Pomodoro.timeLeft -= 1;

  if (Pomodoro.timeLeft === 0) {
    Pomodoro.changeStatus();
  }

  Pomodoro.renderCircle();
};
Pomodoro.changeStatus = function() {
  var status = $('#status').text();

  if (status === "Session") {
    Pomodoro.switchToBreak();
  } else {
    Pomodoro.switchToSession();
  }
};
Pomodoro.switchToBreak = function() {
  $('#status').text('Break');
  $('#circle').attr('class', 'break');
  Pomodoro.timeLeft = Pomodoro.breakLength;
};
Pomodoro.switchToSession = function() {
  $('#status').text('Session');
  $('#circle').attr('class', 'session');
  Pomodoro.timeLeft = Pomodoro.sessionLength;
};

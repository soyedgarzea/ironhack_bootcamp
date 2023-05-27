var chronometer = new Chronometer();
var btnLeft     = document.getElementById('btnLeft');
var btnRight    = document.getElementById('btnRight');
var minDec      = document.getElementById('minDec');
var minUni      = document.getElementById('minUni');
var secDec      = document.getElementById('secDec');
var secUni      = document.getElementById('secUni');
var milCen      = document.getElementById('milCen');
var milDec      = document.getElementById('milDec');
var milUni      = document.getElementById('milUni');
var splits      = document.getElementById('splits');


function printTime() {
  return printMinutes() + ':' + printSeconds() + ':' + printMilliseconds()

}

function printMinutes() {
  let minutes = chronometer.getMinutes();
  let minutesTwoDigits = chronometer.twoDigitsNumber(minutes);
  minDec.innerHTML = minutesTwoDigits[0];
  minUni.innerHTML = minutesTwoDigits[1];
  return minutesTwoDigits
}

function printSeconds() {
  let seconds = chronometer.getSeconds();
  let secondsTwoDigits = chronometer.twoDigitsNumber(seconds);
  secDec.innerHTML = secondsTwoDigits[0];
  secUni.innerHTML = secondsTwoDigits[1];
  return secondsTwoDigits
}

function printMilliseconds() {
  let mili = chronometer.getMiliseconds();
  let miliThreeDigits = chronometer.threeDigitsNumber(mili);
  milCen.innerHTML = miliThreeDigits[0]
  milDec.innerHTML = miliThreeDigits[1];
  milUni.innerHTML = miliThreeDigits[2];
  return miliThreeDigits
}

function printSplit() {

}

function clearSplits() {

}

function setStopBtn() {

}

function setSplitBtn() {

}

function setStartBtn() {

}

function setResetBtn() {

}

// Start/Stop Button
btnLeft.addEventListener('click', function () {
  if (btnLeft.classList.contains('start')) {

    btnLeft.classList.add('stop');
    btnLeft.classList.remove('start');
    btnLeft.innerHTML = 'STOP';

    btnRight.classList.add('split');
    btnRight.classList.remove('reset');
    btnRight.innerHTML = 'SPLIT';

    chronometer.startClick();

  } else {

    btnLeft.classList.remove('stop');
    btnLeft.classList.add('start');
    btnLeft.innerHTML = 'START';

    btnRight.classList.add('reset');
    btnRight.classList.remove('split');
    btnRight.innerHTML = 'RESET';

    chronometer.stopClick();

  }
});

// Reset/Split Button
btnRight.addEventListener('click', function () {
  if (btnRight.classList.contains('split')) {
    let now = printTime();
    let li = document.createElement('li');
    li.innerHTML = now;
    splits.appendChild(li);
  } else {
    chronometer.resetClick();
    splits.innerHTML = '';
  }

});

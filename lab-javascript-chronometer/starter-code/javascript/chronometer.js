class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId;
  }

  startClick() {
    this.intervalId = setInterval(() => {
      this.currentTime++;
      printTime();
    }, 1)
  }

  getMinutes() {
    return Math.floor(this.currentTime / 60000)
  }

  getSeconds() {
    return Math.floor(this.currentTime / 1000)
  }

  getMiliseconds() {
    return this.currentTime % 1000
  }

  twoDigitsNumber(value) {
    return String(value).length == 1 ? '0' + String(value) : String(value)
  }

  threeDigitsNumber(value) {
    return String(value).length == 1 ? '00' + String(value) : String(value).length == 2 ? '0' + String(value) : String(value)
  }

  stopClick() {
    clearInterval(this.intervalId);
  }

  resetClick() {
    this.currentTime = 0;
    printTime();
  }

  splitClick() {}
}

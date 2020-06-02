// DOM Elements
const statusPane = document.querySelector('#status-pane');
const gbMaxElement = document.querySelector('#gb-max');
const gbUsedElement = document.querySelector('#gb-used');
const gbLeftElement = document.querySelector('#gb-left');
const gbMeterFill = document.querySelector('#gb-meter-fill');

// Time Intervals
let usedInterval = null, leftInterval = null;

// Functions
const setTicker = (element, interval, value, append = false) => {
  element.innerHTML = append ? `0 GB` : 0; 
  const milliseconds = 5;
  const totalIntervals = 200;
  const gainPerInterval = Math.ceil(value / totalIntervals);
  let current = 0;

  interval = setInterval(() => {
    current += gainPerInterval;

    if (current >= value) {
      current = value;
      clearInterval(interval);
    }

    element.innerHTML = append ? `${current} GB` : current;
  }, milliseconds);
};

const setMeterFill = (value, max) => {
  gbMeterFill.style.width = `${(value / max) * 100}%`;
};

// Window Onload
window.onload = () => {
  const { gbUsed, gbMax } = statusPane.dataset;

  setTicker(gbUsedElement, usedInterval, parseInt(gbUsed), true);
  setTicker(gbLeftElement, leftInterval, gbMax - gbUsed);
  setMeterFill(parseInt(gbUsed), parseInt(gbMax));
};

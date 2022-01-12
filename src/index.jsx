import React from 'react';
import { DateTime } from 'luxon';
import * as ReactDOM from 'react-dom';
import './index.css';

const endStamp = DateTime.fromISO('2022-04-03', { zone: 'Europe/Budapest' }).toMillis();

let newDate = new Date();
let newStamp = newDate.getTime();

function updateClock() {
  newDate = new Date();
  newStamp = newDate.getTime();
  let diff = Math.round((endStamp - newStamp) / 1000);

  const d = Math.floor(diff / (24 * 60 * 60));
  diff -= d * 24 * 60 * 60;
  const h = Math.floor(diff / (60 * 60));
  diff -= h * 60 * 60;
  const m = Math.floor(diff / (60));
  diff -= m * 60;
  const s = diff;

  const countdown = `${d} nap, ${h} óra, ${m} perc, ${s} másodperc`;
  const element = <div className="h-100 row align-items-center"><div className="col align-top-side">{countdown}</div></div>;

  ReactDOM.render(element, document.getElementById('root'));
}

updateClock();
setInterval(updateClock, 1000);

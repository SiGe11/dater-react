import React from 'react'
import { DateTime } from 'luxon'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { Buffer } from 'buffer'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container!)

const isDaterOn: boolean = false

const endStamp: number = DateTime.fromISO('2022-04-03', { zone: 'Europe/Budapest' }).toMillis()

let newDate: Date = new Date()
let newStamp: number = newDate.getTime()

function updateClock (): void {
  newDate = new Date()
  newStamp = newDate.getTime()
  let diff: number = Math.round((endStamp - newStamp) / 1000)

  const d: number = Math.floor(diff / (24 * 60 * 60))
  diff -= d * 24 * 60 * 60
  const h: number = Math.floor(diff / (60 * 60))
  diff -= h * 60 * 60
  const m: number = Math.floor(diff / (60))
  diff -= m * 60
  const s: number = diff

  const countdown: string = `${d} nap, ${h} óra, ${m} perc, ${s} másodperc`
  const element = <div className="h-100 row align-items-center">
    <div className="col align-top-side">{countdown}</div>
  </div>

  root.render(element)
}

function printDachshund (data: { items: string | any[] }): void {
  const rnd: number = Math.floor(Math.random() * data.items.length)
  const imageSrc = data.items[rnd].media.m.replace('_m', '_b')
  const imageUrl: URL = (new URL(imageSrc))
  if (!['https:'].includes(imageUrl.protocol)) {
    throw new Error('Api response is not https')
  }

  // @ts-ignore
  const element = <div className="h-100 row align-items-center"><div className="col align-top-side"><img src={imageUrl.toString()} fetchpriority="high" alt="dachshund"/></div>
  </div>

  root.render(element)
}

function checkForDoggoInDomain (): boolean {
  const currentHostname: string = window.location.hostname
  return currentHostname.includes('gizsgugya')
}

function showDachshund (): void {
  function generateAuthToken () : string {
    const userPass = Buffer.from('test:elek').toString('base64')
    return `Basic ${userPass}`
  }

  $.ajaxSetup({
    headers: {
      Authorization: generateAuthToken()
    }
  })
  $.getJSON('https://dogs.simongergely.eu/dogs', {}, printDachshund)
}

function showLoadbar (): void {
  // @ts-ignore
  const element = <div className="h-100 row align-items-center"><div className="col align-top-side"><img src="assets/loadinghound.gif" fetchpriority="high" alt="loading"/></div></div>
  root.render(element)
}

if (isDaterOn && !checkForDoggoInDomain()) {
  updateClock()
  setInterval(updateClock, 1000)
} else {
  showLoadbar()
  showDachshund()
}

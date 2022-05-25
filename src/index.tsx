import React from 'react'
import { DateTime } from 'luxon'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import './index.css'

const isDaterOn: boolean = false

const endStamp: number = DateTime.fromISO('2022-04-03', { zone: 'Europe/Budapest' }).toMillis()

let newDate: Date = new Date()
let newStamp: number = newDate.getTime()

function updateClock () : void {
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
  const element = <div className="h-100 row align-items-center"><div className="col align-top-side">{countdown}</div></div>

  const container = document.getElementById('root')
  const root = createRoot(container!)
  root.render(element)
}

function printDachshund (data: { items: string | any[] }) : void {
  const rnd: number = Math.floor(Math.random() * data.items.length)
  const imageSrc = data.items[rnd].media.m.replace('_m', '_b')
  const imageUrl: URL = (new URL(imageSrc))
  if (!['https:'].includes(imageUrl.protocol)) {
    throw new Error('Api response is not https')
  }

  // @ts-ignore
  const element = <div className="h-100 row align-items-center"><div className="col align-top-side"><img src={imageUrl.toString()} fetchpriority="high" alt="dachshund"/></div></div>

  const container = document.getElementById('root')
  const root = createRoot(container!)
  root.render(element)
}

function getTagmodeWithWeigh (): string {
  const tagmodes: string[] = ['all', 'all', 'any']
  return tagmodes[Math.floor(Math.random() * tagmodes.length)]
}

function getTags (tagmode: string): string {
  if (tagmode === 'any') {
    return 'wiener dog, sausage dog'
  }
  return 'dachshund, wiener dog, sausage dog'
}

function checkForDoggoInDomain () : boolean {
  const currentHostname: string = window.location.hostname
  return currentHostname.includes('gizsgugya')
}

function showDachshund () : void {
  const tagmode = getTagmodeWithWeigh()
  $.getJSON(
    'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
    {
      tags: getTags(tagmode),
      tagmode,
      format: 'json'
    },
    printDachshund
  )
}

if (isDaterOn && !checkForDoggoInDomain()) {
  updateClock()
  setInterval(updateClock, 1000)
} else {
  showDachshund()
}

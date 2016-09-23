'use strict'

var assign = require('lodash.assign')
var isElement = require('lodash.iselement')
var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

module.exports = SyncSliders

SyncSliders.defaults = {
  autoplay: true,
  autoplaySpeed: 3000,
  prevButton: '',
  nextButton: '',
  dotsSelector: ''
}

function SyncSliders (container, options) {
  if (!(this instanceof SyncSliders)) {
    return new SyncSliders(container, options)
  }

  this.options = assign({}, SyncSliders.defaults, options)

  this.syncSliders = this.getElement(container).querySelectorAll('.sync-slider')
  this.firstSlider = this.syncSliders[0]
  this.secondSlider = this.syncSliders[1]

  this.firstTrack = this.firstSlider.querySelector('.sync-slider-track')
  this.secondTrack = this.secondSlider.querySelector('.sync-slider-track')

  this.activeIndex = 0
  this.totalSlides = this.firstTrack.children.length

  this.createDots()
  this.createButtons()
  this.slideTo(0)

  // Only start when the height is set
  this.once('set height', function () {
    this.firstTrack.classList.add('transition-active')
    this.secondTrack.classList.add('transition-active')
    this.createInterval()
  })

  this.setHeight()
}

inherits(SyncSliders, EventEmitter)

var fn = SyncSliders.prototype

fn.getElement = function (el) {
  if (isElement(el)) return el
  return document.querySelector(el)
}

fn.slideTo = function (index) {
  var currentIndex = this.activeIndex
  this.emit('beforeChange', currentIndex, index)
  this.moveTrack(this.firstTrack, index * 100)
  var invertedActiveIndex = (this.totalSlides - 1) - index
  this.moveTrack(this.secondTrack, invertedActiveIndex * 100)
  this.activeIndex = index
  this.emit('afterChange', index, currentIndex)
}

fn.moveTrack = function (track, percentage) {
  track.style.transform = 'translateY(-' + percentage + '%)'
}

fn.next = function () {
  var nextIndex = (this.activeIndex + 1) % this.totalSlides
  this.pause()
  this.slideTo(nextIndex)
  this.resume()
}

fn.prev = function () {
  var prevIndex = this.activeIndex === 0
    ? this.totalSlides - 1
    : this.activeIndex - 1

  this.pause()
  this.slideTo(prevIndex)
  this.resume()
}

fn.setHeight = function () {
  var img = this.firstTrack.querySelector('img')

  if (img) {
    img.addEventListener('load', this.updateHeight.bind(this))
    if (img.complete) this.updateHeight()
  } else {
    this.updateHeight()
  }

  window.addEventListener('resize', this.updateHeight.bind(this))
}

fn.updateHeight = function () {
  var slide = this.firstTrack.children[0]
  var height = window.getComputedStyle(slide).height
  this.firstSlider.style.height = height
  this.secondSlider.style.height = height
  this.emit('set height')
}

fn.createInterval = fn.resume = function () {
  if (!this.options.autoplay) return
  this.interval = setInterval(function () {
    this.next()
  }.bind(this), this.options.autoplaySpeed)
}

fn.pause = function () {
  if (!this.options.autoplay) return
  clearInterval(this.interval)
}

fn.createDots = function () {
  if (!this.options.dotsSelector) return

  var dots = this.getElement(this.options.dotsSelector)
  var ul = document.createElement('ul')
  var activeLi = null

  ul.classList.add('sync-sliders-dots')
  dots.appendChild(ul)

  for (var i = 0; i < this.totalSlides; i += 1) {
    var li = document.createElement('li')
    var button = document.createElement('button')

    button.innerHTML = i + 1
    li.appendChild(button)
    ul.appendChild(li)

    button.addEventListener('click', function (index) {
      this.pause()
      this.slideTo(index)
      this.resume()
    }.bind(this, i))
  }

  this.on('afterChange', function (currentIndex) {
    var target = ul.children[currentIndex]
    if (activeLi) activeLi.classList.remove('active')
    activeLi = target
    activeLi.classList.add('active')
  })
}

fn.createButtons = function () {
  var options = this.options

  if (options.prevButton) {
    this.getElement(options.prevButton)
      .addEventListener('click', this.prev.bind(this))
  }

  if (options.nextButton) {
    this.getElement(options.nextButton)
      .addEventListener('click', this.next.bind(this))
  }
}

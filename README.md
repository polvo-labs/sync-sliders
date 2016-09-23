# sync-sliders

Vanilla module for creating synced vertical sliders.

## installation

`npm install polvo-labs/sync-sliders --save`

## usage

Make sure you have included both CSS and JS.

You should provide a markup like this:

```html
<div class="sync-sliders-container | js-sync-sliders">
  <div class="sync-sliders-column">
    <div class="sync-slider">
      <div class="sync-slider-track">
        <div class="sync-slide-item">
          <!-- Place your slide content here -->
        </div>
        <div class="sync-slide-item">
          <!-- Place your slide content here -->
        </div>
        <!-- ... -->
      </div>
    </div>
  </div>
  <div class="sync-sliders-column">
    <div class="sync-slider">
      <div class="sync-slider-track">
        <div class="sync-slide-item">
          <!-- Place your slide content here -->
        </div>
        <div class="sync-slide-item">
          <!-- Place your slide content here -->
        </div>
        <!-- ... -->
      </div>
    </div>
  </div>
</div>
```

Then, in your JS:

```js
var sliders = new SyncSliders('.js-sync-sliders', options)
```

## options

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| autoplay | `Boolean` | Enables autoplay | `true` |
| autoplaySpeed | `Boolean` | Autoplay speed in milliseconds | `3000` |
| prevButton | `Element` or `String` | Button for "Previous slide" | `null` |
| nextButton | `Element` or `String` | Button for "Next slide" | `null` |
| dotsSelector | `Element` or `String` | Element that contains the dots | `null`
| breakpoint | Number | Breakpoint for mobile | `768`

## public api

#### `pause()`

Pauses the autoplay.

#### `resume()`

Resumes the paused autoplay.

#### `activeIndex`

Property with the current slide's active index.

#### `slideTo(index, noTransition)`

Go to the slide.

#### `next()`

Go to the next slide.

#### `prev()`

Go to the previous slide.

## events

#### `afterChange`

Triggered **after** the current slide is changed:

```js
sliders.on('afterChange', function (currentIndex, previousIndex) {
  console.log('Now the current index is:', currentIndex)
})
```

#### `beforeChange`

Triggered **before** the current slide is changed:

```js
sliders.on('beforeChange', function (currentIndex, nextIndex) {
  console.log('The slider has changed the current slide to:', nextIndex)
})
```

## browser support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera.png" width="48" height="48"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari.png" width="48" height="48"> |
| --- | --- | --- | --- | --- |
| <div align="center">✔</div> | <div align="center">✔</div> | <div align="center">+IE9 ✔</div> | <div align="center">✔</div> | <div align="center">✔</div> |

## license

MIT

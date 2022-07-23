function domReady (callback) {
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', callback)
  }
  callback()
}

function onReady () {
  // Mobile Menu Trigger
  Array
    .from(document.getElementsByClassName('gh-burger'))
    .forEach((el) => el.addEventListener('click',
      () => document.body.classList.toggle('gh-head-open')))

  // FitVids - Makes video embeds responsive
  $('.gh-content').fitVids()
  // I plan to use vanilla JS to do this. Maybe https://github.com/webcraftsman/vanilla-fitvids
  // or https://codepen.io/chriscoyier/pen/YzXeXjK
  // or npmjs.com/package/fitvids
  // or https://gist.github.com/davatron5000/e9ef20f1d2ba4d9099711064c644d155
}

domReady(onReady);

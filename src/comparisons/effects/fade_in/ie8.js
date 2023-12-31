function fadeIn(el, speed = 400) {
  var opacity = 0;

  el.style.opacity = 0;
  el.style.filter = '';

  var last = +new Date();
  var tick = function () {
    opacity += (new Date() - last) / speed;
    if (opacity > 1) opacity = 1;
    el.style.opacity = opacity;
    el.style.filter = 'alpha(opacity=' + (100 * opacity || 0) + ')';

    last = +new Date();

    if (opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };

  tick();
}

fadeIn(el);

// A bunch of stuff jquery does, but much lighter
window.u = {
  $: function(selector, context) {
    return (context || document).querySelectorAll(selector);
  },
  $1: function(selector, context) {
    return (context || document).querySelector(selector);
  },
  jsonp: function(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function(request) {
      var response = request.currentTarget.response || request.target.responseText;
      response = JSON.parse(response);
      success(response);
    };
    xhr.send();
    return xhr;
  },
  css: function(el, styles) {
    for (var property in styles)
      el.style[property] = styles[property];
  },
  hasClass: function(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
  },
  addClass: function(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!this.hasClass(el, className)) el.className += ' ' + className;
  },
  removeClass: function(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  },
  toggleClass: function(el, className) {
    if (this.hasClass(el, className)) this.removeClass(el, className);
    else this.addClass(el, className);
  },
  prepend: function(el, parent) {
    parent.insertBefore(el, parent.firstChild);
  },
  click: function(el, func) {
    el.addEventListener('click', func);
  }
};


!(function(window, document, u) {
  class Ticker {
    constructor(symbol, price, close, el) {
      this.symbol = symbol;
      this.price = +price;
      this.close = +close;
      this.prevPrice = null;
      this.el = el || this.buildEl();
      this.$symbol = u.$1('.symbol', this.el);
      this.$price = u.$1('.price', this.el);
      this.$percent = u.$1('.percent', this.el);
      this.outputFields();
    }
    buildEl() {
      var el = make('div');
      el.className = 'ticker';
      ['symbol', 'price', 'percent'].forEach(function(name) {
        var child = make('div');
        child.className = name;
        el.appendChild(child);
      });
      u.$1('#more').appendChild(el);
      return el;
    }
    outputFields(list) {
      if (list) {
        list.forEach(item => {
          switch (item) {
            case 'symbol':
              this.updateSymbol();
              break;
            case 'price':
              this.updatePrice();
              break;
            case 'time':
              this.updatePercentage();
              break;
          }
        });
      } else {
        this.updateSymbol()
          .updatePrice(this.price, true)
          .updatePercentage();
      }
    }
    updateSymbol(symbol) {
      symbol = symbol || this.symbol;
      this.$symbol.textContent = symbol;
      return this;
    }
    updatePrice(price, first) {
      if (price != this.price || first) {
        this.prevPrice = this.price;
        this.price = +price;
        var currPriceStr = this.price.toFixed(2);
        var prevPriceStr = this.prevPrice.toFixed(2);
        
        this.$price.innerHTML = this.addSpan(currPriceStr);
        var $spans = u.$('span', this.$price);
        var direction = (this.price > this.prevPrice) ? 'up' : 'down';
        var changed = this.findChangedDigits(currPriceStr, prevPriceStr);
        var len = $spans.length;
        while (len--) {
          if (changed.indexOf(len) > -1) {
            u.addClass($spans[len], direction);
          }
        }
      }
      return this;
    }
    findChangedDigits(curr, prev) {
      var changed = [];
      var prevLen = prev.length;
      var currLen = curr.length;
      while (currLen--) {
        prevLen--;
        if (/\d/.test(curr[currLen]) &&
          (prevLen < 0 || curr[currLen] != prev[prevLen])
        ) {
          changed.push(currLen);
        }
      }
      return changed;
    }
    updatePercentage() {
      var percent = (this.price - this.close) / this.close * 100;
      var math = (percent > 0) ? '+' : '';
      this.$percent.textContent = math + percent.toFixed(2) + '%';
      return this;
    }
    addSpan(string) {
      return string.split('').map(function(char) {
        return '<span>' + char + '</span>';
      }).join('');
    }
  }

  function make(tag) {
    return document.createElement(tag);
  }
  function twoDecimals(num) {
    return Math.floor(num * 100) / 100;
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  window.bigTicker = new Ticker('AAPL', 127.42, 127, u.$1('#current'));
  window.smallTickers = [
    new Ticker('GOOG', 526.23, 526.4),
    new Ticker('TSLA', 256, 256),
    new Ticker('SSYS', 37.06, 37.9),
    new Ticker('MSFT', 45.65, 45.6)
  ];

  setInterval(function() {
    smallTickers.concat(bigTicker).forEach(function(ticker) {
      var price = ticker.price;
      var num = getRandomInt(0, 2);
      if (num === 1) {
        price += 0.01;
      } else {
        price -= 0.01;
      }
      ticker.updatePrice(price).updatePercentage();
    });
  }, 1000);

  var $progress = u.$1('#progress');
  setInterval(function() {
    var width = parseInt($progress.style.width.replace('%', ''), 10) || 0;
    width += 1;
    if (width > 100) width = 0;
    $progress.style.width = width + '%';
    u.$1('#time-text span').textContent = width;
  }, 1200);
})(window, document, window.u);

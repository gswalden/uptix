"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();window.u={$:function(e,t){return(t||document).querySelectorAll(e)},$1:function(e,t){return(t||document).querySelector(e)},jsonp:function(e,t){var s=new XMLHttpRequest;return s.open("GET",e),s.onload=function(e){var s=e.currentTarget.response||e.target.responseText;s=JSON.parse(s),t(s)},s.send(),s},css:function(e,t){for(var s in t)e.style[s]=t[s]},hasClass:function(e,t){return e.classList?e.classList.contains(t):new RegExp("\\b"+t+"\\b").test(e.className)},addClass:function(e,t){e.classList?e.classList.add(t):this.hasClass(e,t)||(e.className+=" "+t)},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")},toggleClass:function(e,t){this.hasClass(e,t)?this.removeClass(e,t):this.addClass(e,t)}},!function(e,t,s){function n(e){return t.createElement(e)}function i(e,t){return Math.floor(Math.random()*(t-e))+e}var r=function(){function e(t,n,i,r){_classCallCheck(this,e),this.symbol=t,this.price=+n,this.close=+i,this.prevPrice=null,this.el=r||this.buildEl(),this.$symbol=s.$1(".symbol",this.el),this.$price=s.$1(".price",this.el),this.$percent=s.$1(".percent",this.el),this.outputFields()}return _createClass(e,[{key:"buildEl",value:function(){var e=n("div");return e.className="ticker",["symbol","price","percent"].forEach(function(t){var s=n("div");s.className=t,e.appendChild(s)}),s.$1("#more").appendChild(e),e}},{key:"outputFields",value:function(e){var t=this;e?e.forEach(function(e){switch(e){case"symbol":t.updateSymbol();break;case"price":t.updatePrice();break;case"time":t.updatePercentage()}}):this.updateSymbol().updatePrice(this.price,!0).updatePercentage()}},{key:"updateSymbol",value:function(e){return e=e||this.symbol,this.$symbol.textContent=e,this}},{key:"updatePrice",value:function(e,t){if(e!=this.price||t){this.prevPrice=this.price,this.price=+e;var n=this.price.toFixed(2),i=this.prevPrice.toFixed(2);this.$price.innerHTML=this.addSpan(n);for(var r=s.$("span",this.$price),a=this.price>this.prevPrice?"up":"down",c=this.findChangedDigits(n,i),l=r.length;l--;)c.indexOf(l)>-1&&s.addClass(r[l],a)}return this}},{key:"findChangedDigits",value:function(e,t){for(var s=[],n=t.length,i=e.length;i--;)n--,/\d/.test(e[i])&&(0>n||e[i]!=t[n])&&s.push(i);return s}},{key:"updatePercentage",value:function(){var e=(this.price-this.close)/this.close*100,t=e>0?"+":"";return this.$percent.textContent=t+e.toFixed(2)+"%",this}},{key:"addSpan",value:function(e){return e.split("").map(function(e){return"<span>"+e+"</span>"}).join("")}}]),e}();e.bigTicker=new r("AAPL",127.42,127,s.$1("#current")),e.smallTickers=[new r("GOOG",526.23,526.4),new r("TSLA",256,256),new r("SSYS",37.06,37.9),new r("MSFT",45.65,45.6)],setInterval(function(){smallTickers.concat(bigTicker).forEach(function(e){var t=e.price,s=i(0,2);1===s?t+=.01:t-=.01,e.updatePrice(t).updatePercentage()})},1e3);var a=s.$1("#progress");setInterval(function(){var e=parseInt(a.style.width.replace("%",""),10)||0;e+=5,e>100&&(e=0),a.style.width=e+"%"},1e4)}(window,document,window.u);
//# sourceMappingURL=maps/uptix.js.map
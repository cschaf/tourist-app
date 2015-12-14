(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var backIcon, backgroundLayer, citySelectionModule, hamburgerMenuIcon, radar, radarModule, title, topMenu;

if (!Framer.Device) {
  Framer.Defaults.DeviceView = {
    "deviceScale": -1,
    "deviceType": "iphone-6-silver",
    "contentScale": 1,
    "orientation": 0
  };
  Framer.Defaults.DeviceComponent = {
    "deviceScale": -1,
    "deviceType": "iphone-6-silver",
    "contentScale": 1,
    "orientation": 0
  };
  Framer.Device = new Framer.DeviceView();
  Framer.Device.setupContext();
}

citySelectionModule = require("citySelectionModule");

radarModule = require("radarModule");

backgroundLayer = new BackgroundLayer({
  backgroundColor: "rgba(255,255,255,1)"
});

topMenu = new Layer({
  x: 0,
  y: 0,
  width: Screen.width,
  height: 100,
  backgroundColor: "white"
});

hamburgerMenuIcon = new Layer({
  x: Screen.width - 75,
  y: 25,
  width: 50,
  height: 50,
  image: "./images/icons/hamburger.png"
});

topMenu.addSubLayer(hamburgerMenuIcon);

backIcon = new Layer({
  x: 25,
  y: 25,
  width: 50,
  height: 50,
  image: "./images/icons/back.png"
});

topMenu.addSubLayer(backIcon);

title = new Layer({
  x: 120,
  y: 0,
  width: 500,
  height: 100,
  image: "./images/titles/stadt_download.png"
});

topMenu.addSubLayer(title);

radar = new radarModule.Radar({
  x: 0,
  y: 100,
  marginLeft: 15
});

radar.getRadarLayer().on(Events.Click, (function(_this) {
  return function() {
    return print("radar clicked!");
  };
})(this));


},{"citySelectionModule":2,"radarModule":3}],2:[function(require,module,exports){
var CitySelection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.CitySelection = CitySelection = (function(superClass) {
  extend(CitySelection, superClass);

  function CitySelection(options) {
    if (options == null) {
      options = {};
    }
    options.x = 0;
    options.y = 100;
    options.width = Screen.width;
    options.height = Screen.height - 100;
    options.opacity = 1;
    options.backgroundColor = "#ffffff";
    CitySelection.__super__.constructor.call(this, options);
    this.initControls();
  }

  CitySelection.prototype.initControls = function() {
    var b, bLayer, cities, hb, hbLayer, hh, hhLayer, m, mLayer;
    cities = new ScrollComponent({
      width: this.width,
      height: this.height,
      scrollHorizontal: false,
      contentInset: {
        top: 32,
        bottom: 32
      },
      superLayer: this
    });
    cities.content.draggable.overdrag = false;
    hbLayer = new Layer({
      backgroundColor: "#fff",
      width: cities.width - 48,
      height: 400,
      x: 24,
      y: (400 + 10) * 0,
      borderRadius: 6,
      superLayer: cities.content,
      scale: 1
    });
    hbLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";
    hb = new Layer({
      image: "./app/images/bremen.png",
      superLayer: hbLayer,
      width: cities.width,
      height: 400
    });
    hb.center();
    hhLayer = new Layer({
      backgroundColor: "#fff",
      width: cities.width - 48,
      height: 400,
      x: 24,
      y: (400 + 10) * 1,
      borderRadius: 6,
      superLayer: cities.content,
      scale: 1
    });
    hhLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";
    hh = new Layer({
      image: "./app/images/hamburg.png",
      superLayer: hhLayer,
      width: cities.width,
      height: 400
    });
    hh.center();
    mLayer = new Layer({
      backgroundColor: "#fff",
      width: cities.width - 48,
      height: 400,
      x: 24,
      y: (400 + 10) * 2,
      borderRadius: 6,
      superLayer: cities.content,
      scale: 1
    });
    mLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";
    m = new Layer({
      image: "./app/images/muenchen.png",
      superLayer: mLayer,
      width: cities.width,
      height: 400
    });
    m.center();
    bLayer = new Layer({
      backgroundColor: "#fff",
      width: cities.width - 48,
      height: 400,
      x: 24,
      y: (400 + 10) * 3,
      borderRadius: 6,
      superLayer: cities.content,
      scale: 1
    });
    bLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";
    b = new Layer({
      image: "./app/images/berlin.png",
      superLayer: bLayer,
      width: cities.width,
      height: 400
    });
    return b.center();
  };

  return CitySelection;

})(Layer);


},{}],3:[function(require,module,exports){
var Radar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Radar = Radar = (function(superClass) {
  extend(Radar, superClass);

  function Radar(options) {
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.height = Screen.height;
    options.opacity = 1;
    options.backgroundColor = "white";
    this.marginLeft = options.marginLeft;
    Radar.__super__.constructor.call(this, options);
    this.initControls();
  }

  Radar.prototype.initControls = function() {
    this.radarLayer = new Layer({
      x: this.marginLeft,
      y: 0,
      width: this.width,
      height: 720,
      backgroundColor: "white",
      superLayer: this
    });
    return this.radarLayer.html = "<div class='radar'><div class='waveguide'></div></div>";
  };

  Radar.prototype.getRadarLayer = function() {
    return this.radarLayer;
  };

  return Radar;

})(Layer);


},{}]},{},[1])


//# sourceMappingURL=app.js.map

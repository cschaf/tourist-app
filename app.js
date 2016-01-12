(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var backIcon, backgroundLayer, citySelectionModule, hamburgerMenuIcon, list, markerModule, profile, radar, radarModule, ranking, setting, tabBarLayer, tabbarModule, textLayer, title, topMenu;

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

textLayer = require('TextLayer');

tabbarModule = require("tabbarModule");

radarModule = require("radarModule");

markerModule = require('MarkerModule');

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
  opacity: 0,
  image: "./images/icons/back.png"
});

backIcon.on(Events.Click, (function(_this) {
  return function() {
    return tabBarLayer.showRadar();
  };
})(this));

topMenu.addSubLayer(backIcon);

title = new textLayer({
  x: 120,
  y: 10,
  width: 500,
  height: 100,
  text: "Tourist-App",
  color: "rgb(129,129,129)",
  textAlign: "center",
  fontSize: 50,
  fontFamily: "Calibri"
});

topMenu.addSubLayer(title);

radar = new radarModule.Radar({
  y: 100
});

ranking = new Layer({
  x: 0,
  y: -2500,
  width: Screen.width,
  height: Screen.height - 220
});

list = new Layer({
  x: 2500,
  y: 100,
  width: Screen.width,
  height: Screen.height - 220
});

profile = new Layer({
  x: 2500,
  y: 100,
  width: Screen.width,
  height: Screen.height - 220
});

setting = new Layer({
  x: 2500,
  y: 100,
  width: Screen.width,
  height: Screen.height - 220
});

tabBarLayer = new tabbarModule.Tabbar(ranking, radar, list, profile, setting, backIcon, title);


},{"MarkerModule":2,"TextLayer":3,"citySelectionModule":4,"radarModule":5,"tabbarModule":6}],2:[function(require,module,exports){
var Marker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Marker = Marker = (function(superClass) {
  extend(Marker, superClass);

  function Marker(options) {
    if (options == null) {
      options = {};
    }
    if (options.width == null) {
      options.width = 50;
    }
    if (options.height == null) {
      options.height = 50;
    }
    options.opacity = 1;
    options.image = "./images/icons/marker-einfach.png";
    this.isSelected = false;
    this.isNormal = true;
    this.isExplored = false;
    Marker.__super__.constructor.call(this, options);
    this.on(Events.Click, function() {
      if (this.isNormal) {
        return this.setSelected();
      } else {
        if (!this.isExplored && !this.isNormal) {
          return this.setNormal();
        }
      }
    });
  }

  Marker.prototype.setSelected = function() {
    this.isExplored = false;
    this.isSelected = true;
    this.isNormal = false;
    return this.image = "./images/icons/marker-selektiert.png";
  };

  Marker.prototype.setExplored = function() {
    this.isExplored = true;
    this.isSelected = false;
    this.isNormal = false;
    return this.image = "./images/icons/marker-endeckt.png";
  };

  Marker.prototype.setNormal = function() {
    this.isExplored = false;
    this.isSelected = false;
    this.isNormal = true;
    return this.image = "./images/icons/marker-einfach.png";
  };

  return Marker;

})(Layer);


},{}],3:[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    exports.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
  }

  exports.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  exports.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  exports.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  exports.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  exports.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  exports.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  exports.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  exports.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  exports.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  exports.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  exports.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  exports.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  exports.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  exports.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  exports.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  exports.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  exports.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  exports.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return exports;

})(Layer);


},{}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
var Radar, markerModule, textLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

markerModule = require('MarkerModule');

exports.Radar = Radar = (function(superClass) {
  extend(Radar, superClass);

  function Radar(options) {
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.height = 1100;
    options.opacity = 1;
    options.backgroundColor = "white";
    this.marginLeft = options.marginLeft;
    this.title = "Radar";
    Radar.__super__.constructor.call(this, options);
    this.initControls();
    this.bindEvents();
  }

  Radar.prototype.bindEvents = function() {
    this.plusIcon.on(Events.Click, (function(_this) {
      return function() {
        return _this.sliderA.value = _this.sliderA.value + 1;
      };
    })(this));
    return this.minusIcon.on(Events.Click, (function(_this) {
      return function() {
        return _this.sliderA.value = _this.sliderA.value - 1;
      };
    })(this));
  };

  Radar.prototype.initControls = function() {
    var arrowDown, cityName, currentSelectionLayer, dropdown, kmMax, kmMin, marker_1, marker_2, marker_3, sliderLayer, target, targetLabel;
    dropdown = new Layer({
      x: 10,
      y: 0,
      width: 250,
      height: 60,
      borderWidth: 5,
      borderColor: "rgb(129,129,129)",
      backgroundColor: "white",
      superLayer: this
    });
    cityName = new textLayer({
      x: 0,
      y: -5,
      width: 200,
      height: 60,
      text: "Bremen",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri"
    });
    dropdown.addSubLayer(cityName);
    arrowDown = new Layer({
      x: 175,
      y: 0,
      width: 75,
      height: 60,
      image: "./images/icons/arrow_down.png"
    });
    dropdown.addSubLayer(arrowDown);
    this.radarLayer = new Layer({
      x: this.marginLeft,
      y: 100,
      width: this.width,
      height: 720,
      backgroundColor: "white",
      superLayer: this
    });
    this.radarLayer.html = "<div class='radar'>></div>";
    marker_1 = new markerModule.Marker({
      x: 400,
      y: 200
    });
    marker_2 = new markerModule.Marker({
      x: 140,
      y: 170
    });
    marker_1.setSelected();
    marker_3 = new markerModule.Marker({
      x: 400,
      y: 490
    });
    marker_3.setExplored();
    this.radarLayer.addSubLayer(marker_1);
    this.radarLayer.addSubLayer(marker_2);
    this.radarLayer.addSubLayer(marker_3);
    sliderLayer = new Layer({
      x: 0,
      y: 860,
      width: this.width,
      height: 100,
      backgroundColor: "white",
      superLayer: this
    });
    this.minusIcon = new Layer({
      x: 50,
      y: 0,
      width: 75,
      height: 75,
      image: "./images/icons/minus.png"
    });
    sliderLayer.addSubLayer(this.minusIcon);
    this.plusIcon = new Layer({
      x: 615,
      y: 0,
      width: 75,
      height: 75,
      image: "./images/icons/plus.png"
    });
    sliderLayer.addSubLayer(this.plusIcon);
    kmMax = new textLayer({
      x: 520,
      y: 50,
      width: 150,
      height: 100,
      text: "10km",
      color: "rgb(129,129,129)",
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Calibri"
    });
    sliderLayer.addSubLayer(kmMax);
    kmMin = new textLayer({
      x: 70,
      y: 50,
      width: 150,
      height: 100,
      text: "1km",
      color: "rgb(129,129,129)",
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Calibri"
    });
    sliderLayer.addSubLayer(kmMin);
    this.sliderA = new SliderComponent({
      knobSize: 50,
      min: 0,
      max: 10,
      value: 5,
      height: 8,
      width: 453,
      x: 145,
      y: 30
    });
    this.sliderA.fill.backgroundColor = "green";
    this.sliderA.backgroundColor = "rgba(129,129,129,0.5)";
    this.sliderA.knob.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.1)";
    this.sliderA.knob.backgroundColor = "green";
    this.sliderA.knob.scale = 0.8;
    this.sliderA.knob.on(Events.DragStart, function() {
      return this.animate({
        properties: {
          scale: 1
        },
        curve: "spring(400, 30, 0)"
      });
    });
    this.sliderA.knob.on(Events.DragEnd, function() {
      return this.animate({
        properties: {
          scale: 0.8
        },
        curve: "spring(400, 30, 0)"
      });
    });
    sliderLayer.addSubLayer(this.sliderA);
    currentSelectionLayer = new Layer({
      x: 50,
      y: 1000,
      width: this.width - 100,
      height: 60,
      backgroundColor: "white",
      superLayer: this
    });
    targetLabel = new textLayer({
      x: 0,
      y: 0,
      width: 80,
      height: 60,
      text: "Ziel: ",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri"
    });
    currentSelectionLayer.addSubLayer(targetLabel);
    target = new textLayer({
      x: 90,
      y: 0,
      width: this.width - 180,
      height: 60,
      text: "Uebersee-Museum",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri"
    });
    return currentSelectionLayer.addSubLayer(target);
  };

  Radar.prototype.getRadarLayer = function() {
    return this.radarLayer;
  };

  Radar.prototype.getTitle = function() {
    return this.title;
  };

  return Radar;

})(Layer);


},{"MarkerModule":2,"TextLayer":3}],6:[function(require,module,exports){
var Tabbar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Tabbar = Tabbar = (function(superClass) {
  extend(Tabbar, superClass);

  function Tabbar(rankingView, radarView, listView, profileView, settingsView, backArrow, title, options) {
    this.rankingView = rankingView;
    this.radarView = radarView;
    this.listView = listView;
    this.profileView = profileView;
    this.settingsView = settingsView;
    this.backArrow = backArrow;
    this.title = title;
    if (options == null) {
      options = {};
    }
    this.pos1 = {
      x: 17,
      y: 105
    };
    this.pos2 = {
      x: 178,
      y: 105
    };
    this.pos3 = {
      x: 332,
      y: 105
    };
    this.pos4 = {
      x: 475,
      y: 105
    };
    this.pos5 = {
      x: 610,
      y: 105
    };
    options.width = Screen.width;
    options.height = 110;
    options.opacity = 1;
    options.x = 0;
    options.y = Screen.height - 120;
    options.image = "./images/tabbar.png";
    Tabbar.__super__.constructor.call(this, options);
    this.initControls();
    this.bindEvents();
    this.showRadar();
  }

  Tabbar.prototype.showRadar = function() {
    this.resetViews();
    this.marker.x = this.pos2.x;
    this.marker.y = this.pos2.y;
    this.backArrow.opacity = 0;
    this.resetViews();
    this.radarView.x = 0;
    this.radarView.y = 100;
    return this.title.text = this.radarView.getTitle();
  };

  Tabbar.prototype.showRanking = function() {
    this.marker.x = this.pos1.x;
    this.marker.y = this.pos1.y;
    this.backArrow.opacity = 0;
    this.resetViews();
    this.rankingView.x = 0;
    this.rankingView.y = 100;
    return this.title.text = "Ranking";
  };

  Tabbar.prototype.showList = function() {
    this.marker.x = this.pos3.x;
    this.marker.y = this.pos3.y;
    this.backArrow.opacity = 0;
    this.resetViews();
    this.listView.x = 0;
    this.listView.y = 100;
    return this.title.text = "List";
  };

  Tabbar.prototype.showProfile = function() {
    this.marker.x = this.pos4.x;
    this.marker.y = this.pos4.y;
    this.resetViews();
    this.profileView.x = 0;
    this.profileView.y = 100;
    this.backArrow.opacity = 1;
    return this.title.text = "Profile";
  };

  Tabbar.prototype.showSettings = function() {
    this.marker.x = this.pos5.x;
    this.marker.y = this.pos5.y;
    this.resetViews();
    this.settingsView.x = 0;
    this.settingsView.y = 100;
    this.backArrow.opacity = 1;
    return this.title.text = "Settings";
  };

  Tabbar.prototype.resetViews = function() {
    this.rankingView.x = 1500;
    this.rankingView.y = 1500;
    this.radarView.x = 1500;
    this.radarView.y = 1500;
    this.listView.x = 1500;
    this.listView.x = 1500;
    this.profileView.x = 1500;
    this.profileView.y = 1500;
    this.settingsView.x = 1500;
    return this.settingsView.y = 1500;
  };

  Tabbar.prototype.bindEvents = function() {
    this.rankingLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.showRanking();
      };
    })(this));
    this.radarLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.showRadar();
      };
    })(this));
    this.listLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.showList();
      };
    })(this));
    this.profileLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.showProfile();
      };
    })(this));
    return this.settingsLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.showSettings();
      };
    })(this));
  };

  Tabbar.prototype.initControls = function() {
    this.rankingLayer = new Layer({
      x: 17,
      y: 0,
      width: 150,
      height: 100,
      opacity: 0,
      superLayer: this
    });
    this.radarLayer = new Layer({
      x: 170,
      y: 0,
      width: 150,
      height: 100,
      opacity: 0,
      superLayer: this
    });
    this.listLayer = new Layer({
      x: 320,
      y: 0,
      width: 150,
      height: 100,
      opacity: 0,
      superLayer: this
    });
    this.profileLayer = new Layer({
      x: 468,
      y: 0,
      width: 150,
      height: 100,
      opacity: 0,
      superLayer: this
    });
    this.settingsLayer = new Layer({
      x: 600,
      y: 0,
      width: 150,
      height: 100,
      opacity: 0,
      superLayer: this
    });
    return this.marker = new Layer({
      x: this.pos2.x,
      y: this.pos2.y,
      width: 130,
      height: 10,
      backgroundColor: "green",
      opacity: 1,
      superLayer: this
    });
  };

  return Tabbar;

})(Layer);


},{}]},{},[1])


//# sourceMappingURL=app.js.map

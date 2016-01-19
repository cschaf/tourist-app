(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventEmitter, backIcon, backgroundLayer, cityModule, citySelectionModule, markerModule, pageComponent, pageSize, profile, radarModule, rankingListModule, setting, tabBarLayer, tabbarModule, textLayer, title, topMenu;

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

rankingListModule = require('rankingListModule');

cityModule = require('citySelectionModule');

EventEmitter = require('events').EventEmitter;

pageSize = {
  width: 750,
  height: Screen.height - 220
};

backgroundLayer = new BackgroundLayer({
  backgroundColor: "white"
});

topMenu = new Layer({
  x: 0,
  y: 0,
  width: Screen.width,
  height: 100,
  backgroundColor: "white"
});

backIcon = new Layer({
  x: 25,
  y: 25,
  width: 50,
  height: 50,
  opacity: 0,
  image: "./images/icons/back.png"
});

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

this.ranking = new rankingListModule.RankingList({
  x: 0,
  y: 0,
  width: pageSize.width,
  height: pageSize.height
});

this.radar = new radarModule.Radar({
  x: pageSize.width,
  y: 0,
  width: pageSize.width,
  height: pageSize.height
});

this.list = new Layer({
  x: pageSize.width * 2,
  width: pageSize.width,
  height: pageSize.height
});

profile = new Layer({
  x: 2500,
  y: 100,
  width: pageSize.width,
  height: pageSize.height + 120
});

setting = new Layer({
  x: 2500,
  y: 100,
  width: pageSize.width,
  height: Screen.height + 120
});

tabBarLayer = new tabbarModule.Tabbar(pageComponent, profile, setting, backIcon, title);

tabBarLayer.rankingLayer.on(Events.Click, (function(_this) {
  return function() {
    return pageComponent.snapToPage(_this.ranking, false);
  };
})(this));

tabBarLayer.radarLayer.on(Events.Click, (function(_this) {
  return function() {
    return pageComponent.snapToPage(_this.radar, false);
  };
})(this));

tabBarLayer.listLayer.on(Events.Click, (function(_this) {
  return function() {
    return pageComponent.snapToPage(_this.list, false);
  };
})(this));

tabBarLayer.profileLayer.on(Events.Click, (function(_this) {
  return function() {
    pageComponent.x = 1500;
    return tabBarLayer.showProfile();
  };
})(this));

tabBarLayer.settingsLayer.on(Events.Click, (function(_this) {
  return function() {
    pageComponent.x = 1500;
    return tabBarLayer.showSettings();
  };
})(this));

pageComponent = new PageComponent({
  width: pageSize.width,
  height: pageSize.height,
  y: 100,
  x: 0,
  scrollVertical: false
});

pageComponent.addPage(this.ranking);

pageComponent.addPage(this.radar);

pageComponent.addPage(this.list);

pageComponent.snapToPage(this.radar, false);

pageComponent.on("change:currentPage", function() {
  var currentPageIndex;
  currentPageIndex = pageComponent.horizontalPageIndex(pageComponent.currentPage);
  if (currentPageIndex === 0) {
    return tabBarLayer.showRanking();
  } else if (currentPageIndex === 1) {
    return tabBarLayer.showRadar();
  } else {
    return tabBarLayer.showList();
  }
});

backIcon.on(Events.Click, (function(_this) {
  return function() {
    pageComponent.x = 0;
    pageComponent.snapToPage(_this.radar, false);
    return tabBarLayer.showRadar();
  };
})(this));

this.radar.getRadarLayer().on(Events.Click, (function(_this) {
  return function() {
    return _this.radar.hideAllMarkers();
  };
})(this));


},{"MarkerModule":2,"TextLayer":4,"citySelectionModule":5,"events":9,"radarModule":6,"rankingListModule":7,"tabbarModule":8}],2:[function(require,module,exports){
var EventEmitter, Marker, isHeld, textLayer, triggerLongHold,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

textLayer = require('TextLayer');

isHeld = false;

exports.Marker = Marker = (function(superClass) {
  extend(Marker, superClass);

  function Marker(targetName, popupImage, options) {
    this.targetName = targetName != null ? targetName : "";
    this.popupImage = popupImage;
    if (options == null) {
      options = {};
    }
    this.isExplored = bind(this.isExplored, this);
    this.isSelected = bind(this.isSelected, this);
    this.isNormal = bind(this.isNormal, this);
    if (options.width == null) {
      options.width = 50;
    }
    if (options.height == null) {
      options.height = 50;
    }
    options.opacity = 1;
    options.image = "./images/icons/marker-einfach.png";
    this._isSelected = false;
    this._isNormal = true;
    this._isExplored = false;
    this.popupBackground = "./images/popup-ohne-bild.png";
    this.emitter = new EventEmitter;
    Marker.__super__.constructor.call(this, options);
    this.initControls();
    this.on(Events.TouchStart, function() {
      isHeld = true;
      return Utils.delay(.5, function() {
        if (isHeld) {
          return triggerLongHold();
        }
      });
    });
    this.on(Events.TouchEnd, function() {
      if (isHeld) {
        this.emitter.emit('selected');
        return isHeld = false;
      } else {
        this.popupLayer.states["switch"]("on");
        return Utils.delay(4, (function(_this) {
          return function() {
            return _this.popupLayer.states["switch"]("off");
          };
        })(this));
      }
    });
  }

  Marker.prototype.getEmitter = function() {
    return this.emitter;
  };

  Marker.prototype.initControls = function() {
    this.popupLayer = new Layer({
      x: this.x - 138,
      y: this.y + 55,
      width: 350,
      height: 350,
      image: this.popupBackground,
      opacity: 0
    });
    this.popupImageLayer = new Layer({
      x: 25,
      y: 50,
      width: 300,
      height: 175,
      image: this.popupImage
    });
    this.popupLayer.addSubLayer(this.popupImageLayer);
    this.popupTextLayer = new textLayer({
      x: 5,
      y: 0,
      width: 350,
      height: 40,
      color: "rgb(255,255,255)",
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Calibri",
      text: this.targetName
    });
    this.popupLayer.addSubLayer(this.popupTextLayer);
    this.popupLayer.states.add({
      on: {
        opacity: 1
      },
      off: {
        opacity: 0
      }
    });
    return this.popupLayer.states.animationOptions = {
      curve: "ease-out",
      time: 0.3
    };
  };

  Marker.prototype.setSelected = function() {
    this._isExplored = false;
    this._isSelected = true;
    this._isNormal = false;
    return this.image = "./images/icons/marker-selektiert.png";
  };

  Marker.prototype.setExplored = function() {
    this._isExplored = true;
    this._isSelected = false;
    this._isNormal = false;
    return this.image = "./images/icons/marker-endeckt.png";
  };

  Marker.prototype.setNormal = function() {
    this._isExplored = false;
    this._isSelected = false;
    this._isNormal = true;
    return this.image = "./images/icons/marker-einfach.png";
  };

  Marker.prototype.hidePopup = function() {
    return this.popupLayer.opacity = 0;
  };

  Marker.prototype.getTargetName = function() {
    return this.targetName;
  };

  Marker.prototype.isNormal = function() {
    return this._isNormal;
  };

  Marker.prototype.isSelected = function() {
    return this._isSelected;
  };

  Marker.prototype.isExplored = function() {
    return this._isExplored;
  };

  return Marker;

})(Layer);

triggerLongHold = function() {
  return isHeld = false;
};


},{"TextLayer":4,"events":9}],3:[function(require,module,exports){
var RankingRow, textLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

exports.RankingRow = RankingRow = (function(superClass) {
  extend(RankingRow, superClass);

  function RankingRow(scrollPanel, rank, playername, score, options) {
    this.scrollPanel = scrollPanel;
    this.rank = rank != null ? rank : "0";
    this.playername = playername != null ? playername : "Unknown";
    this.score = score != null ? score : "0";
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.height = 100;
    options.opacity = 1;
    options.borderRadius = 6;
    options.cale = 1;
    options.superLayer = this.scrollPanel.content;
    options.backgroundColor = "white";
    RankingRow.__super__.constructor.call(this, options);
    this.initControls();
  }

  RankingRow.prototype.initControls = function() {
    var nameLayer, rankLayer, scoreLayer;
    rankLayer = new textLayer({
      x: 10,
      y: 0,
      width: 80,
      text: this.rank,
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "left",
      backgroundColor: "white",
      superLayer: this
    });
    nameLayer = new textLayer({
      x: 90,
      y: 0,
      width: Screen.width - 140 - 100,
      text: this.playername,
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "center",
      backgroundColor: "white",
      superLayer: this
    });
    return scoreLayer = new textLayer({
      x: Screen.width - 150,
      y: 0,
      width: 140,
      text: this.score,
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "right",
      backgroundColor: "white",
      superLayer: this
    });
  };

  return RankingRow;

})(Layer);


},{"TextLayer":4}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
var CitySelection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.CitySelection = CitySelection = (function(superClass) {
  extend(CitySelection, superClass);

  function CitySelection(options) {
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.height = Screen.height - 220;
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


},{}],6:[function(require,module,exports){
var EventEmitter, Radar, markerModule, textLayer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

markerModule = require('MarkerModule');

EventEmitter = require('events').EventEmitter;

exports.Radar = Radar = (function(superClass) {
  extend(Radar, superClass);

  function Radar(options) {
    var ref, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    this.deSelectAllSelectedMarkers = bind(this.deSelectAllSelectedMarkers, this);
    options.width = (ref = options.width) != null ? ref : Screen.width;
    options.height = (ref1 = options.height) != null ? ref1 : Screen.height - 220;
    options.opacity = (ref2 = options.opacity) != null ? ref2 : 1;
    this.myBackgroundColor = (ref3 = options.backgroundColor) != null ? ref3 : 'white';
    options.backgroundColor = this.myBackgroundColor;
    this.title = "Radar";
    this.currentSelection = null;
    this.markers = [];
    Radar.__super__.constructor.call(this, options);
    this.initControls();
    this.bindEvents();
  }

  Radar.prototype.initControls = function() {
    var kmMax, kmMin, remainingDistanceLabel, remainingDistanceLayer, remainingDistanceValue, sliderLayer;
    this.radarLayer = new Layer({
      x: 0,
      y: Screen.height - 1070,
      height: 720,
      width: Screen.width,
      backgroundColor: this.myBackgroundColor,
      superLayer: this
    });
    this.radarLayer.html = "<div class='radar'>></div>";
    this.marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", {
      x: 400,
      y: 200
    });
    this.marker_2 = new markerModule.Marker("Roland", "./images/roland.png", {
      x: 140,
      y: 170
    });
    this.marker_1.setSelected();
    this.marker_3 = new markerModule.Marker("Bremer-Stadtmusikanten", "./images/stadtmusikanten.png", {
      x: 400,
      y: 490
    });
    this.marker_3.setExplored();
    this.markers.push(this.marker_1);
    this.markers.push(this.marker_2);
    this.markers.push(this.marker_3);
    this.currentSelection = this.markers[0];
    this.radarLayer.addSubLayer(this.marker_1);
    this.radarLayer.addSubLayer(this.marker_2);
    this.radarLayer.addSubLayer(this.marker_3);
    sliderLayer = new Layer({
      x: 0,
      y: Screen.height - 355,
      width: Screen.width,
      height: 150,
      backgroundColor: this.myBackgroundColor,
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
    sliderLayer.addSubLayer(this.sliderA);
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
    remainingDistanceLayer = new Layer({
      x: 0,
      y: Screen.height - 1260,
      width: Screen.width,
      height: 150,
      backgroundColor: this.myBackgroundColor,
      superLayer: this
    });
    remainingDistanceLabel = new textLayer({
      x: 0,
      y: 0,
      width: Screen.width,
      height: 120,
      backgroundColor: this.myBackgroundColor,
      text: "Entfernung bis zum markierten Ziel: ",
      color: "rgb(129,129,129)",
      textAlign: "center",
      fontSize: 50,
      fontFamily: "Calibri"
    });
    remainingDistanceLayer.addSubLayer(remainingDistanceLabel);
    remainingDistanceValue = new textLayer({
      x: 0,
      y: 60,
      width: Screen.width,
      height: 120,
      backgroundColor: this.myBackgroundColor,
      text: "5 km",
      color: "rgb(129,129,129)",
      textAlign: "center",
      fontSize: 60,
      fontFamily: "Calibri"
    });
    return remainingDistanceLayer.addSubLayer(remainingDistanceValue);
  };

  Radar.prototype.getRadarLayer = function() {
    return this.radarLayer;
  };

  Radar.prototype.getTitle = function() {
    return this.title;
  };

  Radar.prototype.hideAllMarkers = function() {
    this.marker_1.hidePopup();
    this.marker_2.hidePopup();
    return this.marker_3.hidePopup();
  };

  Radar.prototype.deSelectAllSelectedMarkers = function(myMarker) {
    var i, len, marker, ref, results;
    ref = this.markers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      marker = ref[i];
      if (myMarker !== marker && !marker.isExplored()) {
        results.push(marker.setNormal());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Radar.prototype.bindEvents = function() {
    this.plusIcon.on(Events.Click, (function(_this) {
      return function() {
        return _this.sliderA.value = _this.sliderA.value + 1;
      };
    })(this));
    this.minusIcon.on(Events.Click, (function(_this) {
      return function() {
        return _this.sliderA.value = _this.sliderA.value - 1;
      };
    })(this));
    this.marker_1.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.deSelectAllSelectedMarkers(_this.marker_1);
        if (_this.marker_1.isNormal()) {
          _this.marker_1.setSelected();
          return _this.target.text = _this.marker_1.getTargetName();
        } else {
          if (!_this.marker_1.isExplored() && !_this.marker_1.isNormal()) {
            return _this.marker_1.setNormal();
          }
        }
      };
    })(this));
    this.marker_2.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.deSelectAllSelectedMarkers(_this.marker_2);
        if (_this.marker_2.isNormal()) {
          _this.marker_2.setSelected();
          return _this.target.text = _this.marker_2.getTargetName();
        } else {
          if (!_this.marker_2.isExplored() && !_this.marker_2.isNormal()) {
            return _this.marker_2.setNormal();
          }
        }
      };
    })(this));
    return this.marker_3.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.deSelectAllSelectedMarkers(_this.marker_3);
        if (_this.marker_3.isNormal()) {
          _this.marker_3.setSelected();
          return _this.target.text = _this.marker_3.getTargetName();
        } else {
          if (!_this.marker_3.isExplored() && !_this.marker_3.isNormal()) {
            return _this.marker_3.setNormal();
          }
        }
      };
    })(this));
  };

  return Radar;

})(Layer);


},{"MarkerModule":2,"TextLayer":4,"events":9}],7:[function(require,module,exports){
var RankingList, rankingRow, textLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

rankingRow = require('RankingRow');

textLayer = require('TextLayer');

exports.RankingList = RankingList = (function(superClass) {
  extend(RankingList, superClass);

  function RankingList(options) {
    var ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    options.width = (ref = options.width) != null ? ref : Screen.width;
    options.height = (ref1 = options.height) != null ? ref1 : Screen.height - 215;
    options.opacity = (ref2 = options.opacity) != null ? ref2 : 1;
    options.backgroundColor = "white";
    RankingList.__super__.constructor.call(this, options);
    this.initControls();
  }

  RankingList.prototype.initControls = function() {
    var counter, i, line1, line2, lineHead, nameLabel, nameLayer, num, ownRankLayer, rankLabel, rankLayer, scoreLabel, scoreLayer, tableHeaderLayer;
    tableHeaderLayer = new Layer({
      x: 0,
      y: 0,
      width: this.width,
      height: 115,
      backgroundColor: "white",
      superLayer: this
    });
    rankLabel = new textLayer({
      x: 10,
      y: 20,
      width: 100,
      height: 150,
      text: "Platz",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "left"
    });
    tableHeaderLayer.addSubLayer(rankLabel);
    nameLabel = new textLayer({
      x: 90,
      y: 20,
      width: this.width - 140 - 100,
      height: 150,
      text: "Nickname",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "center"
    });
    tableHeaderLayer.addSubLayer(nameLabel);
    scoreLabel = new textLayer({
      x: this.width - 150,
      y: 20,
      width: 140,
      height: 150,
      text: "Score",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "right"
    });
    tableHeaderLayer.addSubLayer(scoreLabel);
    lineHead = new Layer({
      x: 0,
      y: 100,
      height: 5,
      width: this.width,
      backgroundColor: "rgb(129,129,129)"
    });
    tableHeaderLayer.addSubLayer(lineHead);
    this.items = new ScrollComponent({
      x: 0,
      y: 115,
      width: this.width,
      height: this.height - 215,
      scrollHorizontal: false,
      contentInset: {
        top: 15,
        bottom: 32
      },
      superLayer: this
    });
    this.items.content.draggable.overdrag = false;
    counter = 0;
    for (num = i = 1; i <= 99; num = ++i) {
      new rankingRow.RankingRow(this.items, num, " Nickname", "9999", {
        x: 0,
        y: (100 + 10) * counter
      });
      counter++;
    }
    new rankingRow.RankingRow(this.items, 100, " Volker", "120", {
      x: 0,
      y: (100 + 10) * counter
    });
    ownRankLayer = new Layer({
      x: 0,
      y: this.height - 100,
      width: this.width,
      height: 105,
      backgroundColor: "white",
      superLayer: this
    });
    line1 = new Layer({
      x: 0,
      y: 5,
      width: this.width,
      height: 5,
      backgroundColor: "rgb(129,129,129)"
    });
    ownRankLayer.addSubLayer(line1);
    line2 = new Layer({
      x: 0,
      y: 15,
      width: this.width,
      height: 5,
      backgroundColor: "rgb(129,129,129)"
    });
    ownRankLayer.addSubLayer(line2);
    rankLayer = new textLayer({
      x: 10,
      y: 20,
      width: 80,
      height: 150,
      text: "100",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "left"
    });
    ownRankLayer.addSubLayer(rankLayer);
    nameLayer = new textLayer({
      x: 90,
      y: 20,
      width: this.width - 140 - 100,
      height: 150,
      text: "Volker",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "center"
    });
    ownRankLayer.addSubLayer(nameLayer);
    scoreLayer = new textLayer({
      x: this.width - 150,
      y: 20,
      width: 140,
      height: 150,
      text: "120",
      color: "rgb(129,129,129)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "right"
    });
    ownRankLayer.addSubLayer(scoreLayer);
    return ownRankLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.items.scrollY = 11000;
      };
    })(this));
  };

  return RankingList;

})(Layer);


},{"RankingRow":3,"TextLayer":4}],8:[function(require,module,exports){
var Tabbar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Tabbar = Tabbar = (function(superClass) {
  extend(Tabbar, superClass);

  function Tabbar(pageComponent, profileView, settingsView, backArrow, title, options) {
    var ref, ref1, ref2;
    this.pageComponent = pageComponent;
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
    options.width = (ref = options.width) != null ? ref : Screen.width;
    options.height = 110;
    options.opacity = 1;
    options.x = (ref1 = options.x) != null ? ref1 : 0;
    options.y = (ref2 = options.y) != null ? ref2 : Screen.height - 120;
    options.image = "./images/tabbar.png";
    Tabbar.__super__.constructor.call(this, options);
    this.initControls();
    this.bindEvents();
  }

  Tabbar.prototype.showRadar = function() {
    this.resetViews();
    this.marker.x = this.pos2.x;
    this.marker.y = this.pos2.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    this.resetViews();
    return this.title.text = "Bremen";
  };

  Tabbar.prototype.showRanking = function() {
    this.marker.x = this.pos1.x;
    this.marker.y = this.pos1.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    this.resetViews();
    return this.title.text = "Ranking";
  };

  Tabbar.prototype.showList = function() {
    this.marker.x = this.pos3.x;
    this.marker.y = this.pos3.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    this.resetViews();
    return this.title.text = "Bremen";
  };

  Tabbar.prototype.showProfile = function() {
    this.marker.x = this.pos4.x;
    this.marker.y = this.pos4.y;
    this.opacity = 0;
    this.resetViews();
    this.profileView.x = 0;
    this.backArrow.opacity = 1;
    return this.title.text = "Profile";
  };

  Tabbar.prototype.showSettings = function() {
    this.marker.x = this.pos5.x;
    this.marker.y = this.pos5.y;
    this.opacity = 0;
    this.resetViews();
    this.settingsView.x = 0;
    this.backArrow.opacity = 1;
    return this.title.text = "Settings";
  };

  Tabbar.prototype.resetViews = function() {
    this.profileView.x = 1500;
    return this.settingsView.x = 1500;
  };

  Tabbar.prototype.bindEvents = function() {
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


},{}],9:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1])


//# sourceMappingURL=app.js.map

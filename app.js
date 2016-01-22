(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventEmitter, backgroundLayer, listModule, markerModule, radarModule, rankingListModule, tabbarModule, textLayer;

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

textLayer = require('TextLayer');

tabbarModule = require("tabbarModule");

radarModule = require("radarModule");

listModule = require("listModule");

markerModule = require('MarkerModule');

rankingListModule = require('rankingListModule');

EventEmitter = require('events').EventEmitter;

this.pageSize = {
  width: 750,
  height: Screen.height - 220
};

this.lastPage = null;

this.pageComponent = new PageComponent({
  width: this.pageSize.width,
  height: this.pageSize.height,
  y: 100,
  x: 0,
  scrollVertical: false
});

backgroundLayer = new BackgroundLayer({
  backgroundColor: "white",
  image: "./images/background_main.png"
});

this.topMenu = new Layer({
  x: 0,
  y: 0,
  width: Screen.width,
  height: 100,
  backgroundColor: "transparent"
});

this.backIcon = new Layer({
  x: 25,
  y: 25,
  width: 50,
  height: 50,
  opacity: 0,
  image: "./images/icons/back.png"
});

this.topMenu.addSubLayer(this.backIcon);

this.title = new textLayer({
  x: 120,
  y: 10,
  width: 500,
  height: 100,
  text: "Tourist-App",
  color: "rgb(255,255,255)",
  textAlign: "center",
  fontSize: 50,
  fontFamily: "Calibri"
});

this.topMenu.addSubLayer(this.title);

this.rankingView = new rankingListModule.RankingList({
  x: 0,
  width: this.pageSize.width,
  height: this.pageSize.height
});

this.pageComponent.addPage(this.rankingView);

this.radarView = new radarModule.Radar({
  x: this.pageSize.width,
  width: this.pageSize.width,
  height: this.pageSize.height
});

this.pageComponent.addPage(this.radarView);

this.listView = new listModule.List(this, {
  x: this.pageSize.width * 2,
  y: 0,
  width: this.pageSize.width,
  height: this.pageSize.height
});

this.pageComponent.addPage(this.listView);

this.profileView = new Layer({
  x: 2500,
  y: 100,
  width: this.pageSize.width,
  height: this.pageSize.height + 120,
  backgroundColor: "white"
});

this.settingView = new Layer({
  x: 2500,
  y: 100,
  width: this.pageSize.width,
  height: Screen.height + 120,
  backgroundColor: "white"
});

this.pageComponent.snapToPage(this.radarView, false);

this.lastPage = this.radarView;

this.tabBarLayer = new tabbarModule.Tabbar(this, this.backIcon, this.title);

this.listView.tabBarLayer = this.tabBarLayer;

this.pageComponent.on("change:currentPage", (function(_this) {
  return function() {
    var currentPageIndex;
    currentPageIndex = _this.pageComponent.horizontalPageIndex(_this.pageComponent.currentPage);
    if (currentPageIndex === 0) {
      _this.lastPage = _this.rankingView;
      return _this.tabBarLayer.showRanking();
    } else if (currentPageIndex === 1) {
      _this.lastPage = _this.radarView;
      return _this.tabBarLayer.showRadar();
    } else if (currentPageIndex === 2) {
      _this.lastPage = _this.listView;
      return _this.tabBarLayer.showList();
    }
  };
})(this));

this.backIcon.on(Events.Click, (function(_this) {
  return function() {
    var index;
    _this.tabBarLayer.resetViews();
    _this.pageComponent.x = 0;
    _this.tabBarLayer.x = 0;
    _this.pageComponent.snapToPage(_this.lastPage, false);
    index = _this.pageComponent.horizontalPageIndex(_this.pageComponent.currentPage);
    if (index === 0) {
      return _this.tabBarLayer.showRanking();
    } else if (index === 1) {
      return _this.tabBarLayer.showRadar();
    } else if (index === 2) {
      return _this.tabBarLayer.showList();
    }
  };
})(this));


},{"MarkerModule":2,"TextLayer":4,"events":11,"listModule":7,"radarModule":8,"rankingListModule":9,"tabbarModule":10}],2:[function(require,module,exports){
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
    this.setPopupEnabled = bind(this.setPopupEnabled, this);
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
    this.enablePopup = true;
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
        if (this.enablePopup) {
          this.popupLayer.states["switch"]("on");
          return Utils.delay(4, (function(_this) {
            return function() {
              return _this.popupLayer.states["switch"]("off");
            };
          })(this));
        }
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

  Marker.prototype.setPopupEnabled = function(enabled) {
    return this.enablePopup = enabled;
  };

  return Marker;

})(Layer);

triggerLongHold = function() {
  return isHeld = false;
};


},{"TextLayer":4,"events":11}],3:[function(require,module,exports){
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
    options.borderColor = "black";
    options.borderWidth = 1;
    options.backgroundColor = "transparent";
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
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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
var DetailSight, textLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

exports.DetailSight = DetailSight = (function(superClass) {
  extend(DetailSight, superClass);

  function DetailSight(nameText, imagePath, commonText, historyText, options) {
    this.nameText = nameText;
    this.imagePath = imagePath;
    this.commonText = commonText;
    this.historyText = historyText;
    if (options == null) {
      options = {};
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.height == null) {
      options.height = Screen.height - 100;
    }
    options.opacity = 1;
    options.backgroundColor = "white";
    DetailSight.__super__.constructor.call(this, options);
    this.initControls();
  }

  DetailSight.prototype.initControls = function() {
    var common, history, historyLayer, imageLayer, nameLayer;
    imageLayer = new Layer({
      x: 0,
      y: 0,
      width: this.width,
      height: 400,
      image: this.imagePath,
      superLayer: this
    });
    nameLayer = new textLayer({
      x: 0,
      y: 400,
      width: this.width,
      height: 100,
      text: this.nameText,
      textAlign: "center",
      color: "rgb(0,0,0)",
      superLayer: this,
      fontSize: 50
    });
    common = new textLayer({
      x: 10,
      y: 500,
      width: this.width - 20,
      height: 300,
      text: this.commonText,
      color: "#000",
      textAlign: "left",
      fontSize: 27,
      fontFamily: "Calibri",
      superLayer: this
    });
    historyLayer = new textLayer({
      x: 0,
      y: 800,
      width: this.width,
      height: 100,
      text: "Geschichte",
      textAlign: "center",
      color: "rgb(0,0,0)",
      superLayer: this,
      fontSize: 50
    });
    return history = new textLayer({
      x: 10,
      y: 900,
      width: this.width - 20,
      height: 500,
      text: this.historyText,
      color: "#000",
      textAlign: "left",
      fontSize: 27,
      fontFamily: "Calibri",
      superLayer: this
    });
  };

  return DetailSight;

})(Layer);


},{"TextLayer":4}],6:[function(require,module,exports){
var EventEmitter, ListItem, isHeld, markerModule, textLayer, triggerLongHold,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

markerModule = require('MarkerModule');

EventEmitter = require('events').EventEmitter;

isHeld = false;

exports.ListItem = ListItem = (function(superClass) {
  extend(ListItem, superClass);

  function ListItem(scrollPanel, sightImage, sightName, distance, options) {
    this.scrollPanel = scrollPanel;
    this.sightImage = sightImage;
    this.sightName = sightName;
    this.distance = distance;
    if (options == null) {
      options = {};
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.height == null) {
      options.height = 200;
    }
    options.opacity = 1;
    options.backgroundColor = "white";
    options.superLayer = this.scrollPanel.content;
    options.borderColor = "black";
    options.borderWidth = 1;
    this.emitter = new EventEmitter;
    ListItem.__super__.constructor.call(this, options);
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
        return isHeld = false;
      } else {
        return this.emitter.emit('selected');
      }
    });
  }

  ListItem.prototype.getEmitter = function() {
    return this.emitter;
  };

  ListItem.prototype.initControls = function() {
    var distanceLayer, sightImageLayer, sightNameLayer;
    sightImageLayer = new Layer({
      x: 10,
      y: 10,
      width: 200,
      height: 200,
      image: this.sightImage,
      superLayer: this
    });
    sightNameLayer = new textLayer({
      x: 225,
      y: 25,
      width: 450,
      height: 100,
      text: "Name: " + this.sightName,
      color: "rgb(0,0,0)",
      fontSize: 40,
      fontFamily: "Calibri",
      textAlign: "left",
      backgroundColor: "transparent",
      superLayer: this
    });
    distanceLayer = new textLayer({
      x: 225,
      y: 100,
      width: 450,
      height: 100,
      text: "Entfernung: " + this.distance,
      color: "rgb(0,0,0)",
      fontSize: 40,
      fontFamily: "Calibri",
      textAlign: "left",
      backgroundColor: "transparent",
      superLayer: this
    });
    this.marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", {
      x: 650,
      y: 75,
      width: 100,
      height: 100,
      superLayer: this
    });
    this.marker_1.setPopupEnabled(false);
    return this.marker_1.getEmitter().on('selected', (function(_this) {
      return function() {
        if (_this.marker_1.isNormal()) {
          return _this.marker_1.setSelected();
        } else {
          if (!_this.marker_1.isExplored() && !_this.marker_1.isNormal()) {
            return _this.marker_1.setNormal();
          }
        }
      };
    })(this));
  };

  return ListItem;

})(Layer);

triggerLongHold = function() {
  return isHeld = false;
};


},{"MarkerModule":2,"TextLayer":4,"events":11}],7:[function(require,module,exports){
var List, detailSightModule, listItemModule, textLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

textLayer = require('TextLayer');

listItemModule = require('listItemModule');

detailSightModule = require('detailSightModule');

exports.List = List = (function(superClass) {
  extend(List, superClass);

  function List(mainContext, options) {
    var ref, ref1;
    this.mainContext = mainContext;
    if (options == null) {
      options = {};
    }
    this.pageComponent = this.mainContext.pageComponent;
    this.backIcon = this.mainContext.backIcon;
    this.tabBarLayer = this.mainContext.tabBarLayer;
    this.backIcon.on(Events.Click, (function(_this) {
      return function() {
        _this.detailSightView1.x = 1500;
        _this.detailSightView2.x = 1500;
        return _this.detailSightView3.x = 1500;
      };
    })(this));
    options.width = (ref = options.width) != null ? ref : Screen.width;
    options.height = (ref1 = options.height) != null ? ref1 : Screen.height - 100;
    options.opacity = 1;
    options.backgroundColor = "white";
    List.__super__.constructor.call(this, options);
    this.initControls();
  }

  List.prototype.initControls = function() {
    var btnExploredLabel, btnUnexploreddLabel, commonText, historyText, item_1, item_2, item_3;
    this.btnExplored = new Layer({
      x: -1,
      y: 0,
      width: this.width / 2 + 1,
      height: 100,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 3,
      superLayer: this
    });
    btnExploredLabel = new textLayer({
      y: 10,
      width: this.width / 2,
      text: "Entdeckt",
      color: "rgb(0,0,0)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "center",
      superLayer: this.btnExplored
    });
    this.btnUnexplored = new Layer({
      x: this.width / 2,
      y: 0,
      width: (this.width / 2) + 3,
      height: 100,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 3,
      superLayer: this
    });
    btnUnexploreddLabel = new textLayer({
      y: 10,
      width: this.width / 2,
      text: "Unentdeckt",
      color: "rgb(0,0,0)",
      fontSize: 50,
      fontFamily: "Calibri",
      textAlign: "center",
      superLayer: this.btnUnexplored
    });
    this.items = new ScrollComponent({
      x: 0,
      y: 100,
      width: this.width,
      height: this.height + 20,
      scrollHorizontal: false,
      backgroundColor: "white",
      superLayer: this
    });
    this.items.content.draggable.overdrag = false;
    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland.";
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber.";
    this.detailSightView1 = new detailSightModule.DetailSight("Uebersee-Museum", "./images/uebersee-museum.png", commonText, historyText, {
      x: 1500,
      y: 100,
      width: this.width,
      height: this.height + 120
    });
    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland.";
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber.";
    this.detailSightView2 = new detailSightModule.DetailSight("Roland", "./images/roland.png", commonText, historyText, {
      x: 1500,
      y: 100,
      width: this.width,
      height: this.height + 120
    });
    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland.";
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber.";
    this.detailSightView3 = new detailSightModule.DetailSight("Bremer-Stadtmusikanten", "./images/stadtmusikanten.png", commonText, historyText, {
      x: 1500,
      y: 100,
      width: this.width,
      height: this.height + 120
    });
    item_1 = new listItemModule.ListItem(this.items, "./images/uebersee-museum_item.png", "Uebersee-Museum", "5km", {
      x: 0,
      y: 0
    });
    item_1.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.resetViews();
        _this.detailSightView1.x = 0;
        _this.backIcon.opacity = 1;
        return _this.mainContext.title.text = "Detail";
      };
    })(this));
    item_2 = new listItemModule.ListItem(this.items, "./images/roland_item.png", "Roland", "2km", {
      x: 0,
      y: 200
    });
    item_2.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.resetViews();
        _this.detailSightView2.x = 0;
        _this.backIcon.opacity = 1;
        return _this.mainContext.title.text = "Detail";
      };
    })(this));
    item_3 = new listItemModule.ListItem(this.items, "./images/stadtmusikanten_item.png", "Stadtmusikanten", "3km", {
      x: 0,
      y: 400
    });
    return item_3.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.resetViews();
        _this.detailSightView3.x = 0;
        _this.backIcon.opacity = 1;
        return _this.mainContext.title.text = "Detail";
      };
    })(this));
  };

  List.prototype.resetViews = function() {
    this.pageComponent.x = 1500;
    this.tabBarLayer.x = 1500;
    this.detailSightView1.x = 1500;
    this.detailSightView2.x = 1500;
    return this.detailSightView3.x = 1500;
  };

  return List;

})(Layer);


},{"TextLayer":4,"detailSightModule":5,"listItemModule":6}],8:[function(require,module,exports){
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
    this.myBackgroundColor = (ref3 = options.backgroundColor) != null ? ref3 : 'transparent';
    options.backgroundColor = this.myBackgroundColor;
    this.title = "Radar";
    this.currentSelection = null;
    this.markers = [];
    this.sliderValue = 1;
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
    this.radarLayer.html = "<div class='radar'></div>";
    this.swing = new Layer({
      x: this.radarLayer.width - 375,
      y: 0,
      width: 354,
      height: 349,
      originX: 0,
      originY: 1,
      image: "./images/swing_radar.png",
      superLayer: this.radarLayer
    });
    this.swingAnimation = new Animation({
      layer: this.swing,
      properties: {
        rotation: -360,
        originX: 0,
        originY: 1
      },
      time: 3.5,
      curve: "linear"
    });
    this.swingAnimation.start();
    this.swingAnimation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        _this.swing.rotation = 0;
        return _this.swingAnimation.start();
      };
    })(this));
    this.marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", {
      x: 400,
      y: 200
    });
    this.zoomOut = new Animation({
      layer: this.marker_1,
      properties: {
        x: this.marker_1.x + (Utils.round(this.sliderValue, 0) * 16.8),
        y: this.marker_1.y - (Utils.round(this.sliderValue, 0) * 16.8)
      }
    });
    this.zoomIn = new Animation({
      layer: this.marker_1,
      properties: {
        x: this.marker_1.x - (this.sliderValue * 16.8),
        y: this.marker_1.y + (this.sliderValue * 16.8)
      }
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
      color: "rgb(255,255,255)",
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
      color: "rgb(255,255,255)",
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Calibri"
    });
    sliderLayer.addSubLayer(kmMin);
    this.sliderA = new SliderComponent({
      knobSize: 50,
      min: 0,
      max: 10,
      value: 1,
      height: 8,
      width: 453,
      x: 145,
      y: 30
    });
    this.sliderValue = 1;
    sliderLayer.addSubLayer(this.sliderA);
    this.sliderA.fill.backgroundColor = "white";
    this.sliderA.backgroundColor = "rgba(255,255,255,0.5)";
    this.sliderA.knob.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.1)";
    this.sliderA.knob.backgroundColor = "white";
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
      text: "Entfernung bis zum Ziel: ",
      color: "rgb(255,255,255)",
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
      color: "rgb(255,255,255)",
      textAlign: "center",
      fontSize: 50,
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
    this.sliderA.on("change:value", (function(_this) {
      return function() {
        var roundedValue;
        roundedValue = Utils.round(_this.sliderA.value, 0);
        if (roundedValue > _this.sliderValue && roundedValue <= 10 && roundedValue !== _this.sliderValue) {
          _this.marker_1.x = _this.marker_1.x + 18.5;
          _this.marker_1.y = _this.marker_1.y - 18.5;
          _this.marker_2.x = _this.marker_2.x - 8;
          _this.marker_2.y = _this.marker_2.y - 8;
          _this.marker_3.x = _this.marker_3.x + 14;
          _this.marker_3.y = _this.marker_3.y + 14;
        } else if (roundedValue < _this.sliderValue && roundedValue >= 0 && roundedValue !== _this.sliderValue) {
          _this.marker_1.x = _this.marker_1.x - 18.5;
          _this.marker_1.y = _this.marker_1.y + 18.5;
          _this.marker_2.x = _this.marker_2.x + 8;
          _this.marker_2.y = _this.marker_2.y + 8;
          _this.marker_3.x = _this.marker_3.x - 14;
          _this.marker_3.y = _this.marker_3.y - 14;
        }
        return _this.sliderValue = roundedValue;
      };
    })(this));
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
          return _this.marker_1.setSelected();
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
          return _this.marker_2.setSelected();
        } else {
          if (!_this.marker_2.isExplored() && !_this.marker_2.isNormal()) {
            return _this.marker_2.setNormal();
          }
        }
      };
    })(this));
    this.marker_3.getEmitter().on('selected', (function(_this) {
      return function() {
        _this.deSelectAllSelectedMarkers(_this.marker_3);
        if (_this.marker_3.isNormal()) {
          return _this.marker_3.setSelected();
        } else {
          if (!_this.marker_3.isExplored() && !_this.marker_3.isNormal()) {
            return _this.marker_3.setNormal();
          }
        }
      };
    })(this));
    return this.radarLayer.on(Events.Click, (function(_this) {
      return function() {
        return _this.hideAllMarkers();
      };
    })(this));
  };

  return Radar;

})(Layer);


},{"MarkerModule":2,"TextLayer":4,"events":11}],9:[function(require,module,exports){
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
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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
      backgroundColor: "rgb(0,0,0)"
    });
    tableHeaderLayer.addSubLayer(lineHead);
    this.items = new ScrollComponent({
      x: 0,
      y: 115,
      width: this.width,
      height: this.height - 215,
      scrollHorizontal: false,
      contentInset: {
        top: -5,
        bottom: 32
      },
      superLayer: this
    });
    this.items.content.draggable.overdrag = false;
    counter = 0;
    for (num = i = 1; i <= 99; num = ++i) {
      new rankingRow.RankingRow(this.items, num + ".", " Nickname", "9999", {
        x: 0,
        y: 100. * counter
      });
      counter++;
    }
    new rankingRow.RankingRow(this.items, 100 + ".", " Volker", "120", {
      x: 0,
      y: 100. * counter
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
      backgroundColor: "rgb(0,0,0)"
    });
    ownRankLayer.addSubLayer(line1);
    line2 = new Layer({
      x: 0,
      y: 15,
      width: this.width,
      height: 5,
      backgroundColor: "rgb(0,0,0)"
    });
    ownRankLayer.addSubLayer(line2);
    rankLayer = new textLayer({
      x: 10,
      y: 20,
      width: 80,
      height: 150,
      text: "100",
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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
      color: "rgb(0,0,0)",
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


},{"RankingRow":3,"TextLayer":4}],10:[function(require,module,exports){
var Tabbar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Tabbar = Tabbar = (function(superClass) {
  extend(Tabbar, superClass);

  function Tabbar(mainContext, backArrow, title, options) {
    var ref, ref1, ref2;
    this.mainContext = mainContext;
    this.backArrow = backArrow;
    this.title = title;
    if (options == null) {
      options = {};
    }
    this.pos1 = {
      x: 35,
      y: 105
    };
    this.pos2 = {
      x: 176,
      y: 105
    };
    this.pos3 = {
      x: 320,
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
    this.pageComponent = this.mainContext.pageComponent;
    this.rankingView = this.mainContext.rankingView;
    this.radarView = this.mainContext.radarView;
    this.listView = this.mainContext.listView;
    this.profileView = this.mainContext.profileView;
    this.settingView = this.mainContext.settingView;
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
    this.marker.x = this.pos2.x;
    this.marker.y = this.pos2.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    return this.title.text = "Bremen";
  };

  Tabbar.prototype.showRanking = function() {
    this.marker.x = this.pos1.x;
    this.marker.y = this.pos1.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    return this.title.text = "Ranking";
  };

  Tabbar.prototype.showList = function() {
    this.marker.x = this.pos3.x;
    this.marker.y = this.pos3.y;
    this.opacity = 1;
    this.backArrow.opacity = 0;
    return this.title.text = "Bremen";
  };

  Tabbar.prototype.showProfile = function() {
    this.marker.x = this.pos4.x;
    this.marker.y = this.pos4.y;
    this.opacity = 0;
    this.backArrow.opacity = 1;
    return this.title.text = "Profile";
  };

  Tabbar.prototype.showSettings = function() {
    this.marker.x = this.pos5.x;
    this.marker.y = this.pos5.y;
    this.opacity = 0;
    this.backArrow.opacity = 1;
    return this.title.text = "Settings";
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
      width: 100,
      height: 10,
      backgroundColor: "white",
      opacity: 1,
      superLayer: this
    });
  };

  Tabbar.prototype.bindEvents = function() {
    this.rankingLayer.on(Events.Click, (function(_this) {
      return function() {
        _this.resetViews();
        _this.pageComponent.x = 0;
        _this.showRanking();
        return _this.pageComponent.snapToPage(_this.rankingView, false);
      };
    })(this));
    this.radarLayer.on(Events.Click, (function(_this) {
      return function() {
        _this.resetViews();
        _this.pageComponent.x = 0;
        _this.showRadar();
        return _this.pageComponent.snapToPage(_this.radarView, false);
      };
    })(this));
    this.listLayer.on(Events.Click, (function(_this) {
      return function() {
        _this.resetViews();
        _this.pageComponent.x = 0;
        _this.showList();
        return _this.pageComponent.snapToPage(_this.listView, false);
      };
    })(this));
    this.profileLayer.on(Events.Click, (function(_this) {
      return function() {
        _this.resetViews();
        _this.profileView.x = 0;
        return _this.showProfile();
      };
    })(this));
    return this.settingsLayer.on(Events.Click, (function(_this) {
      return function() {
        _this.resetViews();
        _this.settingView.x = 0;
        return _this.showSettings();
      };
    })(this));
  };

  Tabbar.prototype.resetViews = function() {
    this.opacity = 1;
    this.pageComponent.x = 1500;
    this.settingView.x = 1500;
    return this.profileView.x = 1500;
  };

  return Tabbar;

})(Layer);


},{}],11:[function(require,module,exports){
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

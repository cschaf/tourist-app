textLayer = require('TextLayer')

exports.DetailSight = class DetailSight extends Layer
  constructor: (@nameText, @imagePath, @commonText, @historyText, options = {}) ->
    options.width ?=  Screen.width
    options.height ?= Screen.height - 100
    options.opacity = 1
    options.backgroundColor = "white"
    super options

    this.initControls()

  initControls: ()->
    imageLayer = new Layer
      x:0
      y:0
      width:this.width
      height: 400
      image: @imagePath
      superLayer: this

    nameLayer = new textLayer
      x:0
      y:400
      width:this.width
      height: 100
      text: @nameText
      textAlign: "center"
      color: "rgb(0,0,0)"
      superLayer: this
      fontSize: 50

    common = new textLayer
      x:10
      y:500
      width: this.width - 20
      height: 300
      text: @commonText
      color: "#000"
      textAlign: "left"
      fontSize: 27
      fontFamily: "Calibri"
      superLayer: this

    historyLayer = new textLayer
      x:0
      y:800
      width:this.width
      height: 100
      text: "Geschichte"
      textAlign: "center"
      color: "rgb(0,0,0)"
      superLayer: this
      fontSize: 50

    history = new textLayer
      x:10
      y:900
      width: this.width - 20
      height: 500
      text: @historyText
      color: "#000"
      textAlign: "left"
      fontSize: 27
      fontFamily: "Calibri"
      superLayer: this
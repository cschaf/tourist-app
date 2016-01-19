textLayer = require('TextLayer')
markerModule = require('MarkerModule')
exports.ListItem = class ListItem extends Layer
  constructor: (@scrollPanel, @sightImage, @sightName, @distance, options = {}) ->
    options.width = options.width ? Screen.width
    options.height = options.height ? 200
    options.opacity= 1
    options.backgroundColor =  "white"
    options.superLayer= @scrollPanel.content
    options.borderColor = "black"
    options.borderWidth = 1
    super options

    this.initControls()

  initControls: ()->
    sightImageLayer = new Layer
      x: 10
      y: 10
      width: 200
      height: 200
      image: @sightImage
      superLayer:this

    sightNameLayer = new textLayer
      x: 225
      y: 25
      width: 450
      height: 100
      text: "Name: " + @sightName
      color: "rgb(0,0,0)"
      fontSize: 40
      fontFamily: "Calibri"
      textAlign: "left"
      backgroundColor:"transparent"
      superLayer:this

    distanceLayer = new textLayer
      x: 225
      y: 100
      width: 450
      height: 100
      text:  "Entfernung: " + @distance
      color: "rgb(0,0,0)"
      fontSize: 40
      fontFamily: "Calibri"
      textAlign: "left"
      backgroundColor:"transparent"
      superLayer:this


    @marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", x:650, y:75,width: 100, height: 100, superLayer:this)
    @marker_1.setPopupEnabled(false)

    @marker_1.getEmitter().on 'selected', =>
      if @marker_1.isNormal()
        @marker_1.setSelected()
      else
        if !@marker_1.isExplored() and not @marker_1.isNormal()
          @marker_1.setNormal()




textLayer = require('TextLayer')
markerModule = require('MarkerModule')
{EventEmitter} = require 'events'

exports.Radar = class Radar extends Layer
  constructor: (options = {}) ->
    options.width= options.width ? Screen.width
    options.height= options.height ? Screen.height - 220
    options.opacity = options.opacity ? 1
    @myBackgroundColor = options.backgroundColor ? 'transparent'

    options.backgroundColor= @myBackgroundColor
    @title = "Radar"
    @currentSelection = null
    @markers = []
    @sliderValue = 1

    super options

    this.initControls()
    this.bindEvents()


  initControls: () ->

    @radarLayer = new Layer
      x:0
      y:Screen.height - 1070
      height: 720
      width: Screen.width
      backgroundColor: @myBackgroundColor
      superLayer : this

    @radarLayer.html = "<div class='radar'></div>"

    @swing = new Layer
      x:@radarLayer.width - 375
      y:0
      width:354
      height:349
      originX:0
      originY:1
      image: "./images/swing_radar.png"
      superLayer:@radarLayer

    @swingAnimation = new Animation
      layer: @swing
      properties:
        rotation: -360
        originX:0
        originY:1
      time: 3.5
      curve: "linear"

    # Start animation
    @swingAnimation.start()
    # Loop animation
    @swingAnimation.on Events.AnimationEnd, =>
    # Reset rotation before looping
      @swing.rotation = 0
      @swingAnimation.start()

#    #marker
    @marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", x:400, y:200)

    @zoomOut = new Animation
      layer: @marker_1
      properties:
        x: @marker_1.x + (Utils.round(@sliderValue, 0)  * 16.8)
        y: @marker_1.y - (Utils.round(@sliderValue, 0) * 16.8)

    @zoomIn = new Animation
      layer: @marker_1
      properties:
        x: @marker_1.x - (@sliderValue  * 16.8)
        y: @marker_1.y + (@sliderValue * 16.8)

    @marker_2 = new markerModule.Marker("Roland", "./images/roland.png", x:140, y:170)
    @marker_1.setSelected()
    @marker_3 = new markerModule.Marker("Bremer-Stadtmusikanten", "./images/stadtmusikanten.png", x:400, y:490)
    @marker_3.setExplored()

    @markers.push(@marker_1)
    @markers.push(@marker_2)
    @markers.push(@marker_3)

    @currentSelection = @markers[0]

    @radarLayer.addSubLayer(@marker_1)
    @radarLayer.addSubLayer(@marker_2)
    @radarLayer.addSubLayer(@marker_3)

    sliderLayer = new Layer
      x:0
      y:Screen.height - 355
      width: Screen.width
      height: 150
      backgroundColor: @myBackgroundColor
      superLayer : this

    @minusIcon = new Layer
      x: 50
      y: 0
      width: 75
      height: 75
      image: "./images/icons/minus.png"
    sliderLayer.addSubLayer(@minusIcon);

    @plusIcon = new Layer
      x: 615
      y: 0
      width: 75
      height: 75
      image: "./images/icons/plus.png"
    sliderLayer.addSubLayer(@plusIcon);

    kmMax = new textLayer
      x: 520
      y: 50
      width: 150
      height: 100
      text:"10km"
      color: "rgb(255,255,255)"
      textAlign: "center"
      fontSize: 30
      fontFamily: "Calibri"
    sliderLayer.addSubLayer(kmMax);

    kmMin = new textLayer
      x: 70
      y: 50
      width: 150
      height: 100
      text:"1km"
      color: "rgb(255,255,255)"
      textAlign: "center"
      fontSize: 30
      fontFamily: "Calibri"
    sliderLayer.addSubLayer(kmMin);

    # Create a new Slider
    @sliderA = new SliderComponent
      knobSize: 50
      min: 0
      max: 10
      value: 1
      height: 8
      width:453
      x:145
      y:30

    @sliderValue = 1

    sliderLayer.addSubLayer(@sliderA );

    # Customize the slider
    @sliderA.fill.backgroundColor = "white"
    @sliderA.backgroundColor = "rgba(255,255,255,0.5)"
    @sliderA.knob.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.1)"

    @sliderA.knob.backgroundColor = "white"

    # We initially downscale the knob
    # This way, the knob never gets blurry
    @sliderA.knob.scale = 0.8

    # Scale to 1 on DragStart
    @sliderA.knob.on Events.DragStart, ->
      this.animate
        properties: {scale: 1}
        curve: "spring(400, 30, 0)"

    # Scale back to its original scale on DragEnd
    @sliderA.knob.on Events.DragEnd, ->
      this.animate
        properties: {scale: 0.8}
        curve: "spring(400, 30, 0)"

    sliderLayer.addSubLayer(@sliderA);

    remainingDistanceLayer = new Layer
      x:0
      y:Screen.height - 1260
      width: Screen.width
      height: 150
      backgroundColor: @myBackgroundColor
      superLayer : this

    remainingDistanceLabel = new textLayer
      x:0
      y:0
      width: Screen.width
      height:120
      backgroundColor: @myBackgroundColor
      text:"Entfernung bis zum Ziel: "
      color: "rgb(255,255,255)"
      textAlign: "center"
      fontSize: 50
      fontFamily: "Calibri"

    remainingDistanceLayer.addSubLayer(remainingDistanceLabel)

    remainingDistanceValue = new textLayer
      x:0
      y:60
      width: Screen.width
      height:120
      backgroundColor: @myBackgroundColor
      text:"5 km"
      color: "rgb(255,255,255)"
      textAlign: "center"
      fontSize: 50
      fontFamily: "Calibri"

    remainingDistanceLayer.addSubLayer(remainingDistanceValue)


  getRadarLayer: () ->
    return @radarLayer

  getTitle: () ->
    return @title

  hideAllMarkers: ()->
    @marker_1.hidePopup()
    @marker_2.hidePopup()
    @marker_3.hidePopup()

  deSelectAllSelectedMarkers: (myMarker)=>
    for marker in @markers
      if myMarker != marker and !marker.isExplored()
        marker.setNormal()


  bindEvents: ->

    @sliderA.on "change:value", =>
      roundedValue =  Utils.round(@sliderA.value, 0)

      if roundedValue > @sliderValue and roundedValue <= 10 and roundedValue != @sliderValue
        @marker_1.x = @marker_1.x + 18.5
        @marker_1.y = @marker_1.y - 18.5

        @marker_2.x = @marker_2.x - 8
        @marker_2.y = @marker_2.y - 8

        @marker_3.x = @marker_3.x + 14
        @marker_3.y = @marker_3.y + 14

      else if roundedValue < @sliderValue and roundedValue >= 0 and roundedValue != @sliderValue
        @marker_1.x = @marker_1.x - 18.5
        @marker_1.y = @marker_1.y + 18.5

        @marker_2.x = @marker_2.x + 8
        @marker_2.y = @marker_2.y + 8

        @marker_3.x = @marker_3.x - 14
        @marker_3.y = @marker_3.y - 14

      @sliderValue = roundedValue

    @plusIcon.on Events.Click, =>
      @sliderA.value  = @sliderA.value + 1

    @minusIcon.on Events.Click, =>
      @sliderA.value = @sliderA.value - 1

    @marker_1.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_1)
      if @marker_1.isNormal()
        @marker_1.setSelected()
#Hier Wert für Entfernung bis zum Ziel ändern
      else
        if !@marker_1.isExplored() and not @marker_1.isNormal()
          @marker_1.setNormal()

    @marker_2.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_2)
      if @marker_2.isNormal()
        @marker_2.setSelected()
        #Hier Wert für Entfernung bis zum Ziel ändern
      else
        if !@marker_2.isExplored() and not @marker_2.isNormal()
          @marker_2.setNormal()

    @marker_3.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_3)
      if @marker_3.isNormal()
        @marker_3.setSelected()
        #Hier Wert für Entfernung bis zum Ziel ändern
      else
        if !@marker_3.isExplored() and not @marker_3.isNormal()
          @marker_3.setNormal()

    @radarLayer.on Events.Click, =>
      this.hideAllMarkers()


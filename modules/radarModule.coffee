textLayer = require('TextLayer')
markerModule = require('MarkerModule')
{EventEmitter} = require 'events'

exports.Radar = class Radar extends Layer
  constructor: (@mainContext, options = {}) ->
    @pageComponent =  @mainContext.pageComponent
    @ListView =  @mainContext.ListView
    @backIcon = @mainContext.backIcon

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
      x:25
      y:Screen.height - 1070
      height: 700
      width: 700
      superLayer : this
      image:"./images/radar.png"


    @swing = new Layer
      x:@radarLayer.width - 350
      y:0
      width:354
      height:349
      originX:0
      originY:1
      image: "./images/swing_radar.png"
      opacity:1
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

    @zoomOut = null
    @zoomIn = null

#    #marker
    @marker_1 = new markerModule.Marker("Uebersee-Museum", "./images/uebersee-museum.png", x:400, y:200)


    @marker_1Animation_1 = new Animation
      layer: @marker_1
      path: Path.fromString("M424,249.5c0,0 0.707092,0.292892 0,1c-0.707092,0.707108 -0.292908,1.292892 -1,2c-0.707092,0.707108 -1,1 -1,2c0,1 -0.292908,1.292892 -1,2c-0.707092,0.707092 0,2 0,3c0,1 -0.458801,1.693451 -1,3c-0.38269,0.923889 -1,1 -1,2c0,1 0,2 0,3c0,1 -0.292908,1.292908 -1,2c-0.707092,0.707092 0.707092,2.292908 0,3c-0.707092,0.707092 -1,1 -1,2c0,1 0.707092,2.292908 0,3c-0.707092,0.707092 -0.292908,1.292908 -1,2c-0.707092,0.707092 -1,1 -1,2c0,1 -0.458801,1.693451 -1,3c-0.38269,0.923889 -0.61731,2.076111 -1,3c-0.541199,1.306549 -1.486267,1.823761 -2,4c-0.229767,0.973236 -1,1 -1,2c0,1 -1.770233,2.026764 -2,3c-0.513733,2.176239 -0.292908,3.292908 -1,4c-0.707092,0.707092 -2,0 -2,1c0,1 -0.61731,1.076111 -1,2c-0.541199,1.306549 -1,2 -2,2c-1,0 -1.076111,0.61731 -2,1c-1.306549,0.541199 -2.076111,2.61731 -3,3c-1.306549,0.541199 -3.458801,1.693451 -4,3c-0.38269,0.923889 -1.292908,1.292908 -2,2c-0.707092,0.707092 -2,0 -3,1c-1,1 -2.076111,1.61731 -3,2c-1.306549,0.541199 -1.292908,1.292908 -2,2c-0.707092,0.707092 -2.076111,0.61731 -3,1c-1.306549,0.541199 -1.61731,1.076111 -2,2c-0.541199,1.306549 -1.292908,1.292908 -2,2c-0.707092,0.707092 -2.149353,0.474274 -3,1c-1.9021,1.175568 -1,3 -2,3c-1,0 -2,0 -2,1c0,1 -0.292908,1.292908 -1,2c-0.707092,0.707092 -2.292908,0.292908 -3,1c-0.707092,0.707092 -0.292908,1.292908 -1,2c-0.707092,0.707092 -0.61731,1.076111 -1,2c-0.541199,1.306549 -1,2 -2,2c-1,0 -1.292908,0.292908 -2,1c-0.707092,0.707092 -0.292908,1.292908 -1,2c-0.707092,0.707092 -0.292908,1.292908 -1,2c-0.707092,0.707092 -1.292908,0.292908 -2,1c-0.707092,0.707092 -2,0 -3,0c-1,0 -1,1 -2,1l-1,0l-1,0l0,1")
      curve: 'linear'
      time: 3
      pathOptions:
        autoRotate: false

    @marker_1Animation_2 = new Animation
        layer: @marker_1
        path: Path.fromString("M343,344.5c0,0 -0.693451,-0.458801 -2,-1c-0.923889,-0.38269 -3.159271,-1.610657 -6,-3c-3.238922,-1.584106 -6.593994,-4.513 -9,-6c-2.690002,-1.662506 -4.152252,-2.234619 -6,-3c-1.306549,-0.541199 -2,-2 -3,-3c-1,-1 -2.486267,-0.823761 -3,-3c-0.229767,-0.973236 -0.692535,-3.186005 -2,-5c-0.826904,-1.147278 -1.458801,-2.693451 -2,-4c-0.38269,-0.923889 0,-4 0,-6c0,-2 0,-4 0,-5c0,-2 0,-3 0,-5c0,-2 -0.68927,-3.080261 0,-6c0.513733,-2.176239 0.61731,-3.076111 1,-4c1.082397,-2.613129 1.948547,-4.298706 3,-6c1.175568,-1.9021 2.173096,-2.852722 3,-4c1.307465,-1.813995 2.458801,-2.693451 3,-4c0.38269,-0.923889 0.61731,-2.076111 1,-3c1.082397,-2.613129 2.61731,-3.076111 3,-4c1.082397,-2.613129 2.852722,-4.173096 4,-5c1.813995,-1.307465 2.61731,-2.076111 3,-3c0.541199,-1.306549 1.693451,-1.458801 3,-2c0.923889,-0.38269 0.823761,-1.486267 3,-2c0.973236,-0.229767 2.053497,-0.540497 4,-1c2.176239,-0.513748 3.076111,-0.61731 4,-1c1.306549,-0.541199 4.025818,-1.679642 6,-2c3.121429,-0.506546 5.823761,-2.486252 8,-3c1.946503,-0.459503 3,0 5,0c2,0 2.823761,-0.486252 5,-1c1.946503,-0.459503 5,0 7,0c2,0 4,0 7,0c2,0 5,0 8,0c2,0 4,0 7,0c1,0 3,0 4,0c2,0 3,-1 4,-1c2,0 3,0 4,0c1,0 2,0 3,0l1,0")
        curve: 'linear'
        time: 1
        pathOptions:
          autoRotate: false


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
      min: 1
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

    @remainingDistanceLayer = new Layer
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

    @remainingDistanceLayer.addSubLayer(remainingDistanceLabel)

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

    @remainingDistanceLayer.addSubLayer(remainingDistanceValue)

    @exploredPopupLayer = new Layer
      x:1500
      y:0
      width:Screen.width
      height:260
      opacity:0
      backgroundColor: "transparent"
      superLayer: this

    @exploredPopup = new Layer
      width:393
      height:82
      image: "./images/ueberseemuseum-entdeckt-nachricht.png"
      superLayer : @exploredPopupLayer
    @exploredPopup.center()

    @exploredPopupLayer.states.add
      on: opacity: 1
      off: opacity: 0

    @exploredPopupLayer.states.animationOptions =
      curve: "ease-out"
      time: 0.3


    @marker_1Animation_1.on Events.AnimationEnd, =>
      #@marker_1Animation_2.start()
      @remainingDistanceLayer.x = 1500
      @exploredPopupLayer.x = 0
      @exploredPopupLayer.states.switch("on")

      Utils.delay 6, => @exploredPopupLayer.states.switch("off")
      Utils.delay 6, => @remainingDistanceLayer.x = 0
      Utils.delay 6, => @exploredPopupLayer.x = 1500


    @marker_1Animation_1.start()


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


  bindEvents: =>
    @exploredPopup.on Events.Click , =>
      @exploredPopupLayer.x = 1500
      @pageComponent.x = 1500
      @backIcon.opacity = 1
      @listView.detailSightView1.x = 0
      @remainingDistanceLayer.x = 0

    @sliderA.on "change:value", =>
      roundedValue =  Utils.round(@sliderA.value, 0)

      if roundedValue > @sliderValue and roundedValue <= 10 and roundedValue != @sliderValue
        @marker_1.x = @marker_1.x + 17.5
        @marker_1.y = @marker_1.y - 17.5

        @marker_2.x = @marker_2.x - 8.5
        @marker_2.y = @marker_2.y - 8.5

        @marker_3.x = @marker_3.x + 14
        @marker_3.y = @marker_3.y + 14

      else if roundedValue < @sliderValue and roundedValue >= 0 and roundedValue != @sliderValue
        @marker_1.x = @marker_1.x - 17.5
        @marker_1.y = @marker_1.y + 17.5

        @marker_2.x = @marker_2.x + 8.5
        @marker_2.y = @marker_2.y + 8.5

        @marker_3.x = @marker_3.x - 14
        @marker_3.y = @marker_3.y - 14

      @sliderValue = roundedValue

    @plusIcon.on Events.Click, =>
      roundedValue = Utils.round(@sliderA.value + 1, 0)
      if roundedValue < 11 and roundedValue != @sliderValue
        @sliderA.value  = roundedValue
        @sliderValue = roundedValue

    @minusIcon.on Events.Click, =>
      roundedValue = Utils.round(@sliderA.value - 1, 0)
      if roundedValue > 0 and roundedValue != @sliderValue
        @sliderA.value = roundedValue
        @sliderValue = roundedValue

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


textLayer = require('TextLayer')
markerModule = require('MarkerModule')
{EventEmitter} = require 'events'

exports.Radar = class Radar extends Layer
  constructor: (options = {}) ->
    options.width= Screen.width
    options.height= 1100
    options.opacity= 1
    options.backgroundColor= "white"
    @marginLeft = options.marginLeft
    @title = "Radar"
    @currentSelection = null
    @markers = []

    super options

    this.initControls()
    this.bindEvents()

  deSelectAllSelectedMarkers: (myMarker)=>
    for marker in @markers
      if myMarker != marker and !marker.isExplored()
        marker.setNormal()

  bindEvents: ->
    @plusIcon.on Events.Click, =>
      @sliderA.value  = @sliderA.value + 1

    @minusIcon.on Events.Click, =>
      @sliderA.value = @sliderA.value - 1

    @marker_1.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_1)
      if @marker_1.isNormal()
        @marker_1.setSelected()
        @target.text = @marker_1.getTargetName()
      else
        if !@marker_1.isExplored() and not @marker_1.isNormal()
          @marker_1.setNormal()

    @marker_2.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_2)
      if @marker_2.isNormal()
        @marker_2.setSelected()
        @target.text = @marker_2.getTargetName()
      else
        if !@marker_2.isExplored() and not @marker_2.isNormal()
          @marker_2.setNormal()

    @marker_3.getEmitter().on 'selected', =>
      this.deSelectAllSelectedMarkers(@marker_3)
      if @marker_3.isNormal()
        @marker_3.setSelected()
        @target.text  = @marker_3.getTargetName()
      else
        if !@marker_3.isExplored() and not @marker_3.isNormal()
          @marker_3.setNormal()

  initControls: () ->

  # City DropDown
    dropdown = new Layer
      x:10
      y:0
      width:250
      height:60
      borderWidth: 5
      borderColor:"rgb(129,129,129)"
      backgroundColor: "white"
      superLayer : this

    cityName = new textLayer
      x: 0
      y: -5
      width: 200
      height: 60
      text:"Bremen"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
    dropdown.addSubLayer(cityName)

    arrowDown = new Layer
      x: 175
      y: 0
      width: 75
      height: 60
      image: "./images/icons/arrow_down.png"
    dropdown.addSubLayer(arrowDown)

    @radarLayer = new Layer
      x:@marginLeft
      y:100
      width: this.width
      height: 720
      backgroundColor: "white"
      superLayer : this

    @radarLayer.html = "<div class='radar'>></div>"

    #marker
    @marker_1 = new markerModule.Marker("Uebersee-Museum", x:400, y:200)
    @marker_2 = new markerModule.Marker("Roland", x:140, y:170)
    @marker_1.setSelected()
    @marker_3 = new markerModule.Marker("Bremer-Stadtmusikanten", x:400, y:490)
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
      y:860
      width: this.width
      height: 100
      backgroundColor: "white"
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
      color: "rgb(129,129,129)"
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
      color: "rgb(129,129,129)"
      textAlign: "center"
      fontSize: 30
      fontFamily: "Calibri"
    sliderLayer.addSubLayer(kmMin);

    # Create a new Slider
    @sliderA = new SliderComponent
      knobSize: 50
      min: 0, max: 10
      value: 5
      height: 8
      width:453
      x:145
      y:30


    # Customize the slider
    @sliderA.fill.backgroundColor = "green"
    @sliderA.backgroundColor = "rgba(129,129,129,0.5)"
    @sliderA.knob.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.1)"

    @sliderA.knob.backgroundColor = "green"

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

    currentSelectionLayer = new Layer
      x:50
      y:1000
      width: this.width-100
      height:60
      backgroundColor: "white"
      superLayer : this

    targetLabel = new textLayer
      x:0
      y:0
      width: 80
      height: 60
      text:"Ziel: "
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"

    currentSelectionLayer.addSubLayer(targetLabel)

    @target = new textLayer
      x:90
      y:0
      width: this.width-180
      height: 60
      text:@currentSelection.getTargetName()
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
    currentSelectionLayer.addSubLayer(@target)

  getRadarLayer: () ->
    return @radarLayer

  getTitle: () ->
    return @title

  hideAllMarkers: ()->
    @marker_1.hidePopup()
    @marker_2.hidePopup()
    @marker_3.hidePopup()



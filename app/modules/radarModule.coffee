textLayer = require('TextLayer')
markerModule = require('MarkerModule')


exports.Radar = class Radar extends Layer
  constructor: (options = {}) ->
    options.width= Screen.width
    options.height= 1100
    options.opacity= 1
    options.backgroundColor= "white"
    @marginLeft = options.marginLeft
    @title = "Radar"

    super options
    this.initControls()
    this.bindEvents()

  bindEvents: ->
    @plusIcon.on Events.Click, =>
      @sliderA.value  = @sliderA.value + 1

    @minusIcon.on Events.Click, =>
      @sliderA.value = @sliderA.value - 1

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
    marker_1 = new markerModule.Marker(x:400, y:200)
    marker_2 = new markerModule.Marker(x:140, y:170)
    marker_1.setSelected()
    marker_3 = new markerModule.Marker(x:400, y:490)
    marker_3.setExplored()

    @radarLayer.addSubLayer(marker_1)
    @radarLayer.addSubLayer(marker_2)
    @radarLayer.addSubLayer(marker_3)

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

    target = new textLayer
      x:90
      y:0
      width: this.width-180
      height: 60
      text:"Uebersee-Museum"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
    currentSelectionLayer.addSubLayer(target)


  getRadarLayer: () ->
    return @radarLayer

  getTitle: () ->
    return @title

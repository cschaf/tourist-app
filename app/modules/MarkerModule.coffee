{EventEmitter} = require 'events'
textLayer = require('TextLayer')
isHeld = false
exports.Marker = class Marker extends Layer
  constructor: (@targetName = "",@popupImage, options = {}) ->
    options.width ?= 50
    options.height ?= 50
    options.opacity= 1
    options.image= "./images/icons/marker-einfach.png"
    @_isSelected = false
    @_isNormal = true
    @_isExplored = false
    @popupBackground = "./images/popup-ohne-bild.png"
    @emitter = new EventEmitter
    super options

    this.initControls()
    @on Events.TouchStart, () ->
      isHeld = true

      Utils.delay .5, () ->
        if isHeld then triggerLongHold()

    @on Events.TouchEnd, () ->
    # this is a regular tap
      if isHeld
        @emitter.emit 'selected'
        isHeld = false
    # this is the "long hold" release
      else
        # Animation on load
        @popupLayer.states.switch("on")
        Utils.delay 4, =>  @popupLayer.states.switch("off")

  getEmitter: ()->
    return @emitter


  initControls: ()->
    @popupLayer = new Layer
      x:@.x-135
      y:@.y-155
      width:350
      height:350
      image: @popupBackground
      opacity: 0

    @popupImageLayer = new Layer
      x:25
      y:50
      width:300
      height:175
      image: @popupImage
    @popupLayer.addSubLayer(@popupImageLayer)
    @popupTextLayer = new textLayer
      x:5
      y:0
      width:350
      height:40
      color: "rgb(255,255,255)"
      textAlign: "center"
      fontSize: 30
      fontFamily: "Calibri"
      text:@targetName

    @popupLayer.addSubLayer(@popupTextLayer)

    @popupLayer.states.add
      on: opacity: 1
      off: opacity: 0

    @popupLayer.states.animationOptions =
      curve: "ease-out"
      time: 0.3

  setSelected: () ->
    @_isExplored = false
    @_isSelected = true
    @_isNormal = false
    this.image =  "./images/icons/marker-selektiert.png"

  setExplored: () ->
    @_isExplored = true
    @_isSelected = false
    @_isNormal = false
    this.image =  "./images/icons/marker-endeckt.png"

  setNormal: () ->
    @_isExplored = false
    @_isSelected = false
    @_isNormal = true
    this.image =  "./images/icons/marker-einfach.png"
  hidePopup: ()->
    @popupLayer.opacity = 0

  getTargetName: ()->
    return @targetName

  isNormal: () =>
    return @_isNormal

  isSelected: () =>
    return @_isSelected

  isExplored: () =>
    return @_isExplored

triggerLongHold = () ->
# this is the long hold trigger
    isHeld = false
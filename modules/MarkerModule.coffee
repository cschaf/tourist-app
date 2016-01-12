{EventEmitter} = require 'events'
isHeld = false
exports.Marker = class Marker extends Layer
  constructor: (@targetName = "", options = {}) ->
    options.width ?= 50
    options.height ?= 50
    options.opacity= 1
    options.image= "./images/icons/marker-einfach.png"
    @_isSelected = false
    @_isNormal = true
    @_isExplored = false
    @popupImage = "./images/popup-ohne-bild.png"
    @emitter = new EventEmitter
    super options

# selection logic here
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
      x:@.x-80
      y:@.y-50
      width:250
      height:250
      image: @popupImage
      opacity: 0

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
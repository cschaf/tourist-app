exports.Marker = class Marker extends Layer
  constructor: (options = {}) ->
    options.width ?= 50
    options.height ?= 50
    options.opacity= 1
    options.image= "./images/icons/marker-einfach.png"
    @isSelected = false
    @isNormal = true
    @isExplored = false

    super options

    @on Events.Click ,->
      if @isNormal
        this.setSelected()
      else
        if !@isExplored and not @isNormal
          this.setNormal()

  setSelected: () ->
    @isExplored = false
    @isSelected = true
    @isNormal = false
    this.image =  "./images/icons/marker-selektiert.png"

  setExplored: () ->
    @isExplored = true
    @isSelected = false
    @isNormal = false
    this.image =  "./images/icons/marker-endeckt.png"

  setNormal: () ->
    @isExplored = false
    @isSelected = false
    @isNormal = true
    this.image =  "./images/icons/marker-einfach.png"
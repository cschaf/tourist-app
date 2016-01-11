exports.Marker = class Marker extends Layer
  constructor: (options = {}) ->
    options.width= 50
    options.height= 50
    options.opacity= 1
    options.image= "./images/icons/marker-einfach.png"
    super options

  setSelected: () ->
    this.image =  "./images/icons/marker-selektiert.png"

  setExplored: () ->
    this.image =  "./images/icons/marker-endeckt.png"

  setNormal: () ->
    this.image =  "./images/icons/marker-einfach.png"
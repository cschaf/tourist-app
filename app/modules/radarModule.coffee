exports.Radar = class Radar extends Layer
  constructor: (options = {}) ->
    options.width= Screen.width
    options.height= Screen.height
    options.opacity= 1
    options.backgroundColor= "white"
    @marginLeft = options.marginLeft

    super options
    this.initControls()

  initControls: () ->
    @radarLayer = new Layer
      x:@marginLeft
      y:0
      width: this.width
      height: 720
      backgroundColor: "white"
      superLayer : this

    @radarLayer.html = "<div class='radar'><div class='waveguide'></div></div>"

  getRadarLayer: () ->
    return @radarLayer

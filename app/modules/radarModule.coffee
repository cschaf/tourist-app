exports.Radar = class Radar extends Layer
  constructor: (options = {}) ->
    options.width= Screen.width
    options.height= 720
    options.opacity= 1
    options.backgroundColor= "white"

    super options
    this.initControls()

  initControls: () ->
    this.html = "<div class='radar'><div class='waveguide'></div></div>"

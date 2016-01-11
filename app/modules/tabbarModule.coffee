exports.Tabbar = class Tabbar extends Layer
  constructor: (options = {}) ->
    @pos1 = {x:17, y:105}
    @pos2 = {x:178, y:105}
    @pos3 = {x:332, y:105}
    @pos4 = {x:475, y:105}
    @pos5 = {x:610, y:105}

    options.width= Screen.width
    options.height= 110
    options.opacity= 1
    options.image= "./images/tabbar.png"
    super options
    this.initControls()
    this.bindEvents()


  bindEvents: ->
    @rankingLayer.on Events.Click, =>
      @marker.x = @pos1.x
      @marker.y = @pos1.y

    @radarLayer.on Events.Click, =>
      @marker.x = @pos2.x
      @marker.y = @pos2.y

    @listLayer.on Events.Click, =>
      @marker.x = @pos3.x
      @marker.y = @pos3.y

    @profileLayer.on Events.Click, =>
      @marker.x = @pos4.x
      @marker.y = @pos4.y

    @settingsLayer.on Events.Click, =>
      @marker.x = @pos5.x
      @marker.y = @pos5.y

  initControls: () ->

    @rankingLayer = new Layer
      x:17
      y:0
      width:150
      height:100
      opacity: 0
      superLayer : this

    @radarLayer = new Layer
      x:170
      y:0
      width:150
      height:100
      opacity: 0
      superLayer : this

    @listLayer = new Layer
      x:320
      y:0
      width:150
      height:100
      opacity:0
      superLayer : this

    @profileLayer = new Layer
      x:468
      y:0
      width:150
      height:100
      opacity: 0
      superLayer : this

    @settingsLayer = new Layer
      x:600
      y:0
      width:150
      height:100
      opacity: 0
      superLayer : this

    @marker = new Layer
      x: this.pos2.x
      y: this.pos2.y
      width: 130
      height: 10
      backgroundColor: "green"
      opacity: 1
      superLayer : this
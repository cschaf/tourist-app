exports.Tabbar = class Tabbar extends Layer
  constructor: (@rankingView, @radarView, @listView,@profileView, @settingsView ,@backArrow, options = {}) ->
    @pos1 = {x:17, y:105}
    @pos2 = {x:178, y:105}
    @pos3 = {x:332, y:105}
    @pos4 = {x:475, y:105}
    @pos5 = {x:610, y:105}

    options.width = Screen.width
    options.height = 110
    options.opacity= 1
    options.x= 0
    options.y= Screen.height-120
    options.image= "./images/tabbar.png"

    super options
    this.initControls()
    this.bindEvents()

  showRadar: () ->
    this.resetViews()
    @marker.x = @pos2.x
    @marker.y = @pos2.y
    @backArrow.opacity=0
    this.resetViews()

    @radarView.x = 0
    @radarView.y = 100

  showRanking: () ->
    @marker.x = @pos1.x
    @marker.y = @pos1.y
    @backArrow.opacity = 0
    this.resetViews()
    @rankingView.x = 0
    @rankingView.y = 100

  showList: () ->
    @marker.x = @pos3.x
    @marker.y = @pos3.y

    @backArrow.opacity=0
    this.resetViews()

    @listView.x = 0
    @listView.y = 100

  showProfile: () ->
    @marker.x = @pos4.x
    @marker.y = @pos4.y
    this.resetViews()
    @profileView.x = 0
    @profileView.y = 100
    @backArrow.opacity=1

  showSettings: () ->
    @marker.x = @pos5.x
    @marker.y = @pos5.y
    this.resetViews()
    @settingsView.x = 0
    @settingsView.y = 100
    @backArrow.opacity=1

  resetViews: () ->
    @rankingView.x = 1500
    @rankingView.y = 1500

    @radarView.x = 1500
    @radarView.y = 1500

    @listView.x = 1500
    @listView.x = 1500

    @profileView.x = 1500
    @profileView.y = 1500

    @settingsView.x = 1500
    @settingsView.y = 1500

  bindEvents: ->
    @rankingLayer.on Events.Click, =>
      this.showRanking()

    @radarLayer.on Events.Click, =>
      this.showRadar()

    @listLayer.on Events.Click, =>
      this.showList()

    @profileLayer.on Events.Click, =>
      this.showProfile()

    @settingsLayer.on Events.Click, =>
      this.showSettings()

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
exports.Tabbar = class Tabbar extends Layer
  constructor: (@backArrow,@title, options = {}) ->
    @pos1 = {x:17, y:105}
    @pos2 = {x:178, y:105}
    @pos3 = {x:332, y:105}
    @pos4 = {x:475, y:105}
    @pos5 = {x:610, y:105}

    options.width = options.width ? Screen.width
    options.height = 110
    options.opacity= 1
    options.x= options.x ? 0
    options.y= options.y ? Screen.height-120
    options.image= "./images/tabbar.png"

    super options
    this.initControls()

  showRadar: () ->
    @marker.x = @pos2.x
    @marker.y = @pos2.y
    this.opacity = 1
    @backArrow.opacity=0
    @title.text = "Bremen"

  showRanking: () ->
    @marker.x = @pos1.x
    @marker.y = @pos1.y
    @opacity = 1
    @backArrow.opacity = 0
    @title.text = "Ranking"

  showList: () ->
    @marker.x = @pos3.x
    @marker.y = @pos3.y
    this.opacity = 1
    @backArrow.opacity=0
    @title.text = "Bremen"

  showProfile: () ->
    @marker.x = @pos4.x
    @marker.y = @pos4.y
    this.opacity = 0
    @backArrow.opacity=1
    @title.text = "Profile"

  showSettings: () ->
    @marker.x = @pos5.x
    @marker.y = @pos5.y
    @opacity = 0
    @backArrow.opacity=1
    @title.text = "Settings"

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
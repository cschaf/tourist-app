textLayer = require('TextLayer')

exports.RankingRow = class RankingRow extends Layer
  constructor: (@scrollPanel, @rank = "0", @playername = "Unknown", @score="0", options = {}) ->
    options.width= Screen.width
    options.height= 100
    options.opacity= 1
    options.borderRadius= 6
    options.cale= 1
    options.superLayer= @scrollPanel.content
    options.borderColor = "black"
    options.borderWidth = 1
    options.backgroundColor = "transparent"
    super options


    this.initControls()

  initControls: () ->
    rankLayer = new textLayer
      x: 10
      y: 0
      width: 80
      text: @rank
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "left"
      backgroundColor:"white"
      superLayer:this

    nameLayer = new textLayer
      x: 90
      y: 0
      width: Screen.width - 140 - 100
      text: @playername
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"
      backgroundColor:"white"
      superLayer:this

    scoreLayer = new textLayer
      x: Screen.width-150
      y: 0
      width: 140
      text: @score
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"
      backgroundColor:"white"
      superLayer:this
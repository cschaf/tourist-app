textLayer = require('TextLayer')

exports.RankingRow = class RankingRow extends Layer
  constructor: (@scrollPanel, @rank = "0", @playername = "Unknown", @score="0", options = {}) ->
    options.width= Screen.width
    options.height= 100
    options.opacity= 1
    options.backgroundColor= "#ffffff"
    options.borderRadius= 6
    options.cale= 1
    options.superLayer= @scrollPanel.content

    super options

    this.initControls()

  initControls: () ->
    rankLayer = new textLayer
      x: 10
      y: 0
      width: 30
      height: 150
      text: @rank
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "left"
      superLayer:this

    nameLayer = new textLayer
      x: 80
      y: 0
      width: Screen.width - 150 - 100
      height: 150
      text: @playername
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"
      superLayer:this

    scoreLayer = new textLayer
      x: Screen.width-120
      y: 0
      width: 100
      height: 150
      text: @score
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"
      superLayer:this
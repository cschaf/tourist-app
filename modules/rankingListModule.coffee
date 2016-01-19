rankingRow = require('RankingRow')
textLayer = require('TextLayer')
exports.RankingList = class RankingList extends Layer

  constructor: (options = {}) ->
    options.width= options.width ? Screen.width
    options.height= options.height ? Screen.height - 215
    options.opacity= options.opacity ? 1
    options.backgroundColor = "white"
    super options
    this.initControls()

  initControls: () ->
    tableHeaderLayer = new Layer
      x: 0
      y: 0
      width: this.width
      height: 115
      backgroundColor:"white"
      superLayer: this

    rankLabel = new textLayer
      x: 10
      y: 20
      width: 100
      height: 150
      text: "Platz"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "left"

    tableHeaderLayer.addSubLayer(rankLabel)

    nameLabel  = new textLayer
      x: 90
      y: 20
      width: this.width - 140 - 100
      height: 150
      text: "Nickname"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"

    tableHeaderLayer.addSubLayer(nameLabel)
    scoreLabel = new textLayer
      x: this.width-150
      y: 20
      width: 140
      height: 150
      text: "Score"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"

    tableHeaderLayer.addSubLayer(scoreLabel)

    lineHead = new Layer
      x:0
      y:100
      height:5
      width:this.width
      backgroundColor:"rgb(129,129,129)"

    tableHeaderLayer.addSubLayer(lineHead)

    @rankRows = new ScrollComponent
      x:0
      y:115
      width: this.width
      height: this.height-215
      scrollHorizontal: false
      contentInset: {top:15,bottom: 32}
      superLayer: this

    @rankRows.content.draggable.overdrag = false
    counter = 0
    for num in [1..99]
      new rankingRow.RankingRow(@rankRows, num, " Nickname", "9999", x:0, y:(100 + 10) * counter)
      counter++

    new rankingRow.RankingRow(@rankRows, 100, " Volker", "120", x:0, y:(100 + 10) * counter)
    ownRankLayer = new Layer
      x:0
      y: this.height - 100
      width: this.width
      height: 105
      backgroundColor:"white"
      superLayer: this

    line1 = new Layer
      x:0
      y:5
      width:this.width
      height:5
      backgroundColor:"rgb(129,129,129)"

    ownRankLayer.addSubLayer(line1)

    line2 = new Layer
      x:0
      y:15
      width:this.width
      height:5
      backgroundColor:"rgb(129,129,129)"

    ownRankLayer.addSubLayer(line2)

    rankLayer = new textLayer
      x: 10
      y: 20
      width: 80
      height: 150
      text: "100"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "left"

    ownRankLayer.addSubLayer(rankLayer)
    nameLayer = new textLayer
      x: 90
      y: 20
      width: this.width - 140 - 100
      height: 150
      text: "Volker"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"

    ownRankLayer.addSubLayer(nameLayer)
    scoreLayer = new textLayer
      x: this.width-150
      y: 20
      width: 140
      height: 150
      text: "120"
      color: "rgb(129,129,129)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"

    ownRankLayer.addSubLayer(scoreLayer)

    ownRankLayer.on Events.Click, =>
      @rankRows.scrollY = 11000

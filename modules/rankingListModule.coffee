rankingRow = require('RankingRow')
textLayer = require('TextLayer')
exports.RankingList = class RankingList extends Layer

  constructor: (options = {}) ->
    options.width= options.width ? Screen.width
    options.height= options.height ? Screen.height - 215
    options.opacity= options.opacity ? 1
    options.backgroundColor = "white"
    @nameList = ["Rebbecca","Lucille","Terica","Marion","Francie","Nina","Karrie","Sonny","Thomasina","Shantae","Lyndia","Robby","Branden","Trevor","Forrest","Fransisca","Joeann","Seymour","Karin","Ozella","Clara","Tory","Kristina","Hong","Leone","Lawanna","Evelyne","Angelena","Delmar","Eartha","Christy","Lakenya","Bernita","Fernanda","Archie","Joella","Jordon","Tresa","Stephan","Cherilyn","Carry","Mui","Arnulfo","Zack","Patria","Rico","Caroline","Raymonde","Euna","Julie","Rebbecca","Lucille","Terica","Marion","Francie","Nina","Karrie","Sonny","Thomasina","Shantae","Lyndia","Robby","Branden","Trevor","Forrest","Fransisca","Joeann","Seymour","Karin","Ozella","Clara","Tory","Kristina","Hong","Leone","Lawanna","Evelyne","Angelena","Delmar","Eartha","Christy","Lakenya","Bernita","Fernanda","Archie","Joella","Jordon","Tresa","Stephan","Cherilyn","Carry","Mui","Arnulfo","Zack","Patria","Rico","Caroline","Raymonde","Euna","Julie","Rebbecca","Lucille","Terica","Marion","Francie","Nina","Karrie","Sonny","Thomasina","Shantae","Lyndia","Robby","Branden","Trevor","Forrest","Fransisca","Joeann","Seymour","Karin","Ozella","Clara","Tory","Kristina","Hong","Leone","Lawanna","Evelyne","Angelena","Delmar","Eartha","Christy","Lakenya","Bernita","Fernanda","Archie","Joella","Jordon","Tresa","Stephan","Cherilyn","Carry","Mui","Arnulfo","Zack","Patria","Rico","Caroline","Raymonde","Euna"]
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
      color: "rgb(0,0,0)"
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
      color: "rgb(0,0,0)"
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
      color: "rgb(0,0,0)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"

    tableHeaderLayer.addSubLayer(scoreLabel)

    lineHead = new Layer
      x:0
      y:100
      height:5
      width:this.width
      backgroundColor:"rgb(0,0,0)"

    tableHeaderLayer.addSubLayer(lineHead)

    @items = new ScrollComponent
      x:0
      y:115
      width: this.width
      height: this.height-215
      scrollHorizontal: false
      contentInset: {top:-5, bottom: 32}
      superLayer: this

    @items.content.draggable.overdrag = false
    counter = 0
    maxScore = 9999
    for num in [1..99]
      new rankingRow.RankingRow(@items, num + ".", @nameList[counter], maxScore / (counter + 1), x:0, y:(100) * counter)
      counter++

    new rankingRow.RankingRow(@items, 100 + ".", " Volker", "10", x:0, y:(100) * counter)
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
      backgroundColor:"rgb(0,0,0)"

    ownRankLayer.addSubLayer(line1)

    line2 = new Layer
      x:0
      y:15
      width:this.width
      height:5
      backgroundColor:"rgb(0,0,0)"

    ownRankLayer.addSubLayer(line2)

    rankLayer = new textLayer
      x: 10
      y: 20
      width: 80
      height: 150
      text: "100"
      color: "rgb(0,0,0)"
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
      color: "rgb(0,0,0)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"

    ownRankLayer.addSubLayer(nameLayer)
    scoreLayer = new textLayer
      x: this.width-150
      y: 20
      width: 140
      height: 150
      text: "10"
      color: "rgb(0,0,0)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "right"

    ownRankLayer.addSubLayer(scoreLayer)

    ownRankLayer.on Events.Click, =>
      @items.scrollY = 11000

textLayer = require('TextLayer')
listItemModule = require('listItemModule')
exports.List = class List extends Layer
  constructor: (options = {}) ->
    options.width = options.width ? Screen.width
    options.height = options.height ? Screen.height - 215
    options.opacity = 1
    options.backgroundColor = "white"
    super options

    this.initControls()

  initControls: ()->
    @btnExplored = new Layer
      x: -1
      y: 0
      width: this.width / 2 + 1
      height: 100
      backgroundColor: "white"
      borderColor: "black"
      borderWidth: 3
      superLayer: this

    btnExploredLabel = new textLayer
      y: 10
      width: this.width / 2
      text: "Entdeckt"
      color: "rgb(0,0,0)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"
      superLayer: @btnExplored

    @btnUnexplored = new Layer
      x: this.width / 2
      y: 0
      width: (this.width / 2) + 3
      height: 100
      backgroundColor: "white"
      borderColor: "black"
      borderWidth: 3
      superLayer: this


    btnUnexploreddLabel = new textLayer
      y: 10
      width: this.width / 2
      text: "Unentdeckt"
      color: "rgb(0,0,0)"
      fontSize: 50
      fontFamily: "Calibri"
      textAlign: "center"
      superLayer: @btnUnexplored


    @items = new ScrollComponent
      x: 0
      y: 100
      width: this.width
      height: this.height - 100
      scrollHorizontal: false
      backgroundColor: "white"
      superLayer: this

    @items.content.draggable.overdrag = false


    new listItemModule.ListItem(@items, "./images/uebersee-museum_item.png", "Uebersee-Museum", "5km", x: 0, y: 0)
    new listItemModule.ListItem(@items, "./images/uebersee-museum_item.png", "Uebersee-Museum", "5km", x: 0, y: 200)
    new listItemModule.ListItem(@items, "./images/uebersee-museum_item.png", "Uebersee-Museum", "5km", x: 0, y: 400)
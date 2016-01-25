textLayer = require('TextLayer')
listItemModule = require('listItemModule')
detailSightModule = require('detailSightModule')

exports.List = class List extends Layer
  constructor: (@mainContext, options = {}) ->
    @pageComponent =  @mainContext.pageComponent
    @radar =  @mainContext.radarView
    @backIcon = @mainContext.backIcon
    @tabBarLayer = @mainContext.tabBarLayer


    @backIcon.on Events.Click, =>
      @detailSightView1.x= 1500
      @detailSightView2.x = 1500
      @detailSightView3.x = 1500

    options.width = options.width ? Screen.width
    options.height = options.height ? Screen.height - 100
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
      height: this.height + 20
      scrollHorizontal: false
      backgroundColor: "white"
      superLayer: this

    @items.content.draggable.overdrag = false

    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView1 = new detailSightModule.DetailSight("Uebersee-Museum", "./images/uebersee-museum.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height + 120)

    commonText = "Der Roland ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView2 = new detailSightModule.DetailSight("Roland", "./images/roland.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height + 120)

    commonText = "Die Bremer - Stadtmusikanten sind ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView3 = new detailSightModule.DetailSight("Bremer-Stadtmusikanten", "./images/stadtmusikanten.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height + 120)

    @item_1 = new listItemModule.ListItem(@items, "./images/uebersee-museum_item.png", "Uebersee-Museum", "0 m", x: 0, y: 0)
    @item_1.getEmitter().on 'selected', =>
      this.resetViews()
      @detailSightView1.x = 0
      @backIcon.opacity = 1
      @mainContext.title.text = "Detail"


    @item_2 = new listItemModule.ListItem(@items, "./images/roland_item.png", "Roland", "1700 m", x: 0, y: 200)
    @item_2.getEmitter().on 'selected', =>
      this.resetViews()
      @detailSightView2.x = 0
      @backIcon.opacity = 1
      @mainContext.title.text = "Detail"



    @item_3 = new listItemModule.ListItem(@items, "./images/stadtmusikanten_item.png", "Stadtmusikanten", "1500 m", x: 0, y: 400)

    @item_3.getEmitter().on 'selected', =>
      this.resetViews()
      @detailSightView3.x = 0
      @backIcon.opacity = 1
      @mainContext.title.text = "Detail"

  resetViews: () ->
    @pageComponent.x = 1500
    @tabBarLayer.x = 1500
    @detailSightView1.x = 1500
    @detailSightView2.x = 1500
    @detailSightView3.x = 1500

  setMarker1Explored: () ->
    @item_1.marker_1.setExplored()

  setMarker2Explored: () ->
    @item_2.marker_1.setExplored()

  setMarker3Explored: () ->
    @item_3.marker_1.setExplored()

  setMarker1Selected: () ->
    @item_1.marker_1.setSelected()

  setMarker2Selected: () ->
    @item_2.marker_1.setSelected()

  setMarker3Selected: () ->
    @item_3.marker_1.setSelected()

  setMarker1Normal: () ->
    @item_1.marker_1.setNormal()

  setMarker2Normal: () ->
    @item_2.marker_1.setNormal()

  setMarker3Normal: () ->
    @item_3.marker_1.setNormal()

  deSelectAllSelectedMarkers: () =>
    if !@item_1.marker_1.isExplored()
      @item_1.marker_1.setNormal()

    if !@item_2.marker_1.isExplored()
      @item_2.marker_1.setNormal()

    if !@item_3.marker_1.isExplored()
      @item_3.marker_1.setNormal()

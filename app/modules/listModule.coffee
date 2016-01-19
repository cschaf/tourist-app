textLayer = require('TextLayer')
listItemModule = require('listItemModule')
detailSightModule = require('detailSightModule')
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


    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView1 = new detailSightModule.DetailSight("Uebersee-Museum", "./images/uebersee-museum.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height)

    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView2 = new detailSightModule.DetailSight("Roland", "./images/roland.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height)

    commonText = "Das Uebersee-Museum Bremen ist ein ueber 100 Jahre altes bedeutendes Museum in der Bremer Innenstadt direkt am Hauptbahnhof am Bahnhofsplatz. Das Gebaeude steht seit 1993 unter Denkmalschutz. In einer integrierten Ausstellung ueber Natur, Kultur und Handel praesentiert es Aspekte ueberseeischer Lebensraeume mit Dauerausstellungen zu Asien, Suedsee/Ozeanien, Amerika, Afrika und zu Globalisierungsthemen. Das Museum gehoert nach eigenen Angaben zu den meistbesuchten Museen in Deutschland."
    historyText = "Unter dem Namen 'Staedtische Sammlungen fuer Naturgeschichte und Ethnographie' gingen 1875 die Sammlungen des ''Naturwissenschaftlichen Vereins'', einer Gruendung der ''Gesellschaft Museum'', und Sammlungen einer 1872 gegruendeten ''Anthropologischen Kommission'' in das Eigentum der Stadt Bremen ueber."
    @detailSightView3 = new detailSightModule.DetailSight("Bremer-Stadtmusikanten", "./images/stadtmusikanten.png", commonText, historyText,x:1500, y:100, width: this.width, height:this.height)
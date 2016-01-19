if not Framer.Device
	# From framer.generated.js
	Framer.Defaults.DeviceView = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Defaults.DeviceComponent = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Device = new Framer.DeviceView();
	Framer.Device.setupContext();
	# End from framer.generated.js 

citySelectionModule = require("citySelectionModule")
textLayer = require('TextLayer')
tabbarModule = require("tabbarModule")
radarModule = require("radarModule")
listModule = require("listModule")
markerModule = require('MarkerModule')
rankingListModule = require('rankingListModule')
cityModule = require('citySelectionModule')
{EventEmitter} = require 'events'

pageSize = width:750, height:Screen.height - 220

# Set background to white
backgroundLayer = new BackgroundLayer
  backgroundColor: "white"
  image: "./images/background_main.png"

# Create Menu
topMenu = new Layer
  x: 0
  y: 0
  width: Screen.width
  height: 100
  backgroundColor: "transparent"

backIcon = new Layer
  x: 25
  y: 25
  width: 50
  height: 50
  opacity:0
  image: "./images/icons/back.png"

topMenu.addSubLayer(backIcon)

title = new textLayer
  x: 120
  y: 10
  width: 500
  height: 100
  text:"Tourist-App"
  color: "rgb(255,255,255)"
  textAlign: "center"
  fontSize: 50
  fontFamily: "Calibri"
topMenu.addSubLayer(title)

# ---- ranking list -----
@rankingView = new rankingListModule.RankingList(x:0, width: pageSize.width, height:pageSize.height)

# ---- Radar -----
@radarView = new radarModule.Radar(x:pageSize.width,width: pageSize.width, height:pageSize.height)

@listView = new listModule.List(x:pageSize.width * 2, width: pageSize.width, height:pageSize.height)

@profileView = new Layer
  x: 2500
  y:100
  width: pageSize.width
  height: pageSize.height + 120
  backgroundColor: "white"

@settingView = new Layer
  x: 2500
  y:100
  width: pageSize.width
  height: Screen.height + 120
  backgroundColor: "white"

# PageComponent settings

@pageComponent = new PageComponent
  width: pageSize.width
  height: pageSize.height
  y:  100
  x: 0
  scrollVertical: false

@pageComponent.addPage @rankingView
@pageComponent.addPage @radarView
@pageComponent.addPage @listView

@pageComponent.snapToPage(@radarView, false)

@pageComponent.on "change:currentPage", =>
  currentPageIndex = @pageComponent.horizontalPageIndex(@pageComponent.currentPage)
  if currentPageIndex == 0
    tabBarLayer.showRanking()
  else if currentPageIndex == 1
    tabBarLayer.showRadar()
  else if currentPageIndex == 2
    tabBarLayer.showList()


# Create Bottom Menu
tabBarLayer = new tabbarModule.Tabbar(this, backIcon, title)

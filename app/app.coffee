if not Framer.Device
	# From framer.generated.js
	Framer.Defaults.DeviceView = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Defaults.DeviceComponent = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Device = new Framer.DeviceView();
	Framer.Device.setupContext();
	# End from framer.generated.js

textLayer = require('TextLayer')
tabbarModule = require("tabbarModule")
radarModule = require("radarModule")
listModule = require("listModule")
markerModule = require('MarkerModule')
rankingListModule = require('rankingListModule')
{EventEmitter} = require 'events'

@pageSize = width:750, height:Screen.height - 220
@lastPage = null
@pageComponent = new PageComponent
  width: @pageSize.width
  height: @pageSize.height
  y:  100
  x: 0
  scrollVertical: false

# Set background to white
backgroundLayer = new BackgroundLayer
  backgroundColor: "white"
  image: "./images/background_main.png"

# Create Menu
@topMenu = new Layer
  x: 0
  y: 0
  width: Screen.width
  height: 100
  backgroundColor: "transparent"

@backIcon = new Layer
  x: 25
  y: 25
  width: 50
  height: 50
  opacity:0
  image: "./images/icons/back.png"

@topMenu.addSubLayer(@backIcon)

@title = new textLayer
  x: 120
  y: 10
  width: 500
  height: 100
  text:"Tourist-App"
  color: "rgb(255,255,255)"
  textAlign: "center"
  fontSize: 50
  fontFamily: "Calibri"
@topMenu.addSubLayer(@title)

# ---- ranking list -----
@rankingView = new rankingListModule.RankingList(x:0, width: @pageSize.width, height:@pageSize.height)
@pageComponent.addPage @rankingView

# ---- Radar -----
@radarView = new radarModule.Radar(x:@pageSize.width,width: @pageSize.width, height:@pageSize.height)
@pageComponent.addPage @radarView

@listView = new listModule.List(this, x:@pageSize.width * 2, y:0, width: @pageSize.width, height:@pageSize.height)
@pageComponent.addPage @listView


@profileView = new Layer
  x: 2500
  y:100
  width: @pageSize.width
  height: @pageSize.height + 120
  backgroundColor: "white"

@settingView = new Layer
  x: 2500
  y:100
  width: @pageSize.width
  height: Screen.height + 120
  backgroundColor: "white"


@pageComponent.snapToPage(@radarView, false)
@lastPage = @radarView

# Create Bottom Menu
@tabBarLayer = new tabbarModule.Tabbar(this, @backIcon, @title)
@listView.tabBarLayer = @tabBarLayer

@pageComponent.on "change:currentPage", =>
  currentPageIndex = @pageComponent.horizontalPageIndex(@pageComponent.currentPage)
  if currentPageIndex == 0
    @lastPage = @rankingView
    @tabBarLayer.showRanking()
  else if currentPageIndex == 1
    @lastPage = @radarView
    @tabBarLayer.showRadar()
  else if currentPageIndex == 2
    @lastPage = @listView
    @tabBarLayer.showList()




@backIcon.on Events.Click, =>
  @tabBarLayer.resetViews()
  @pageComponent.x = 0
  @tabBarLayer.x = 0
  @pageComponent.snapToPage(@lastPage, false)

  index = @pageComponent.horizontalPageIndex(@pageComponent.currentPage)
  if index == 0
    @tabBarLayer.showRanking()
  else if index == 1
    @tabBarLayer.showRadar()
  else if index == 2
    @tabBarLayer.showList()

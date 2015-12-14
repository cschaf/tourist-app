if not Framer.Device
	# From framer.generated.js
	Framer.Defaults.DeviceView = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Defaults.DeviceComponent = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Device = new Framer.DeviceView();
	Framer.Device.setupContext();
	# End from framer.generated.js 

citySelectionModule = require("citySelectionModule")
radarModule = require("radarModule")

# Set background to white
backgroundLayer = new BackgroundLayer
  backgroundColor: "rgba(255,255,255,1)"

# Create Menu
topMenu = new Layer
  x: 0
  y: 0
  width: Screen.width
  height: 100
  backgroundColor: "white"

hamburgerMenuIcon = new Layer
  x: Screen.width - 75
  y: 25
  width: 50
  height: 50
  image: "./app/images/icons/hamburger.png"

topMenu.addSubLayer(hamburgerMenuIcon)

backIcon = new Layer
  x: 25
  y: 25
  width: 50
  height: 50
  image: "./app/images/icons/back.png"
topMenu.addSubLayer(backIcon)

title = new Layer
  x: 120
  y: 0
  width: 500
  height: 100
  image: "./app/images/titles/stadt_download.png"
topMenu.addSubLayer(title)

# ---- City Selection -----
#citySelection = new citySelectionModule.CitySelection

# ---- Radar -----
radar = new radarModule.Radar(x:15, y:100)
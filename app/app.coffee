if not Framer.Device
	# From framer.generated.js
	Framer.Defaults.DeviceView = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Defaults.DeviceComponent = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};
	Framer.Device = new Framer.DeviceView();
	Framer.Device.setupContext();
	# End from framer.generated.js 

citySelectionModule = require("citySelectionModule")

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


# ---- City Selection -----

citySelectView = new Layer
  x: 0
  y: 0
  width: Screen.width
  height: Screen.height - 100
  opacity: 1
  backgroundColor: "#ffffff"

cities = new ScrollComponent
  width: Screen.width
  height: Screen.height - 100
  scrollHorizontal: false
  contentInset: {top: 32, bottom: 32}
  superLayer: citySelectView

cities.content.draggable.overdrag = false

hbLayer = new Layer
  backgroundColor: "#fff",
  width: cities.width - 48, height: 400
  x: 24, y: (400 + 10) * 0
  borderRadius: 6, superLayer: cities.content
  scale: 1

hbLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

hb = new Layer image: "./app/images/bremen.png", superLayer: hbLayer, width: cities.width, height: 400
hb.center()

hhLayer = new Layer
  backgroundColor: "#fff",
  width: cities.width - 48, height: 400
  x: 24, y: (400 + 10) * 1
  borderRadius: 6, superLayer: cities.content
  scale: 1

hhLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

# German Flag
hh = new Layer image: "./app/images/hamburg.png", superLayer: hhLayer, width: cities.width, height: 400
hh.center()

mLayer = new Layer
  backgroundColor: "#fff",
  width: cities.width - 48, height: 400
  x: 24, y: (400 + 10) * 2
  borderRadius: 6, superLayer: cities.content
  scale: 1

mLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

m = new Layer image: "./app/images/muenchen.png", superLayer: mLayer, width: cities.width, height: 400
m.center()


bLayer = new Layer
  backgroundColor: "#fff",
  width: cities.width - 48, height: 400
  x: 24, y: (400 + 10) * 3
  borderRadius: 6, superLayer: cities.content
  scale: 1

bLayer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"

b = new Layer image: "./app/images/berlin.png", superLayer: bLayer, width: cities.width, height: 400
b.center()

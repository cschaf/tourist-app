exports.CitySelection = class CitySelection extends Layer
	constructor: (options = {}) ->
		options.x: 0
		options.y: 100
		options.width: Screen.width
		options.height: Screen.height - 100
		options.opacity: 1
		options.backgroundColor: "#ffffff"
		super options

		#self.initControls()

		initControls: ()->
			cities = new ScrollComponent
				width: Screen.width
				height: Screen.height - 100
				scrollHorizontal: false
				contentInset: {top: 32, bottom: 32}
				superLayer: self

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


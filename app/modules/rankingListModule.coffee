rankingRow = require('RankingRow')
exports.RankingList = class RankingList extends Layer
  constructor: (options = {}) ->
    options.x = 0
    options.y = 0
    options.width= Screen.width
    options.height= Screen.height - 220
    options.opacity= 1
    options.backgroundColor= "#ffffff"
    super options
    this.initControls()

  initControls: () ->
    rankRows = new ScrollComponent
      x:0
      y:0
      width: Screen.width
      height: Screen.height - 220
      scrollHorizontal: false
      contentInset: {top: 32, bottom: 32}
      superLayer: this

    rankRows.content.draggable.overdrag = false
    for num in [1..100]
      new rankingRow.RankingRow(rankRows, num, " Nickname", "9999", x:0, y:(100 + 10) * num-1)
exports.Tabbar = class Tabbar extends Layer
  constructor: (options = {}) ->
    @pos1 = {x:17, y:105}
    @pos2 = {x:178, y:105}
    @pos3 = {x:332, y:105}
    @pos4 = {x:475, y:105}
    @pos5 = {x:610, y:105}
    options.width= Screen.width
    options.height= 110
    options.opacity= 1
    options.image= "./images/tabbar.png"
    super options
    this.initControls()


  initControls: () ->
    @marker = new Layer
      x: this.pos2.x
      y: this.pos2.y
      width: 130
      height: 10
      backgroundColor: "green"
      opacity: 1
      superLayer : this
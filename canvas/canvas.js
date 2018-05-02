const time = 1
const num = 50
var dots = []
var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')

function Dot (x, y, vx, vy) {
  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.size = Math.ceil(Math.random() * 3 + 2)
  this.ctx = {}
}

Dot.prototype.render = function (ctx) {
  ctx.save()
  this.ctx = ctx
  this.ctx.beginPath()
  this.ctx.fillStyle = 'lightgray'
  this.ctx.arc(this.x - this.size / 2, this.y - this.size / 2, this.size, 0, Math.PI * 2)
  this.ctx.closePath()
  this.ctx.fill()
  ctx.restore()
}

Dot.prototype.update = function () {
  // this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  this.x = this.x + this.vx * time
  this.y = this.y + this.vy * time
  this.vx = (this.x < canvas.width && this.x > 0) ? this.vx : (-this.vx)
  this.vy = (this.y < canvas.height && this.y > 0) ? this.vy : (-this.vy)
  this.render(this.ctx)
}

Dot.prototype.move = function (x, y) {
  let x1 = x - this.x
  let y1 = y - this.y
  this.vx = x1 / 30
  this.vy = y1 / 30
}

for (let i = 0; i < num; i++) {
  var x = Math.ceil(Math.random() * canvas.width)
  var y = Math.ceil(Math.random() * canvas.height)
  var vx = Math.ceil(Math.random() * 2)
  var vy = Math.ceil(Math.random() * 2)
  var d = new Dot(x, y, vx, vy)
  d.render(ctx)
  dots.push(d)
}
var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()
requestAnimFrame(anim)

function anim () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < dots.length; i++) {
    dots[i].update()
    // requestAnimationFrame(anim)
  }
  requestAnimFrame(anim)
}
// setInterval(anim, 10)

document.getElementById('myCanvas').onclick = function (event) {
  for (let i = 0; i < dots.length; i++) {
    dots[i].move(event.x, event.y)
  }
}

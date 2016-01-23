var Obstacle = function(x, y, width, height) {
    this.x = x;
    this.y = y;

    this.color = _.obstacle.color;

    this.width = width;
    this.height = height;
}

Obstacle.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
}
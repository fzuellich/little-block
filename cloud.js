var Cloud = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.color = _.board.cloud_color;
    this.border_color = _.board.cloud_border_color;
};

Cloud.prototype.draw = function(context) {
    context.fillStyle = this.cloud_color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = this.border_color;
    context.stroke();
};
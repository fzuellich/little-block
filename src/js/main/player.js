var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.gravity = 0.2
    this.velocity = 0;
    this.falling = false;
    this.score = 0;
}

Player.prototype.update_score = function(points) {
    this.score = this.score + points;
    this.score = Math.round(this.score);
}

Player.prototype.update = function() {
    if (this.falling === true) {
        this.y = this.y + this.velocity;
        this.velocity = this.velocity + this.gravity;
    }
}

Player.prototype.draw = function() {
    context.fillStyle = _.player.color;
    context.fillRect(this.x, this.y, _.player.width, _.player.height);
}

Player.prototype.jump = function() {
    this.falling = true;
    this.velocity = _.player.jump * -1;
}
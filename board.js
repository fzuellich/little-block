var Board = function(player) {
    this.update_frame = 0;
    this.player = player;

    this._clouds = new Array();
    this._updateClouds();
}

Board.prototype._updateClouds = function() {
    this._clouds = new Array();
    for (var i = 0; i < _.board.cloud_number; i++) {
        var x = _.board.cloud_width * i;
        var y = (_.board.cloud_radius + _.board.cloud_height) + (_.board.cloud_height * Math.random() * 1.5);
        this._clouds.push(new Cloud(x, y, _.board.cloud_radius));
    }
}

Board.prototype._drawClouds = function(context) {
    // draw base line to add clouds
    context.fillStyle = _.board.cloud_color;
    context.fillRect(0, 0, _.canvas.width, 25 + _.board.cloud_height);

    // draw clouds
    for (var i = 0; i < this._clouds.length; i++) {
        this._clouds[i].draw(context);
    }
}

Board.prototype.draw = function(context) {
    this.update_frame++;
    if (this.update_frame > _.board.framerate) {
        this.update_frame = 0;
        this._updateClouds();
    }

    this._drawClouds(context);

    // bottom border
    context.fillStyle = _.board.bottom_border_color;
    context.fillRect(0, _.obstacle_course.from_ground, _.canvas.width, _.canvas.height - _.obstacle_course.from_ground);

    context.fillStyle = '#333';
    context.font = "12px Georgia";
    context.fillText("Score: " + this.player.score, 700, 12);
}

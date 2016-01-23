define(
    ['./utils', './config', '../obstacles/obstacle'],
    function(utils, Config, Obstacle) {

        var ObstacleCourse = function(amount) {
            this.obstacles = new Array(); // shift and push!
            this.player_is_colliding = false;

            for (var i = 0; i < amount; i++) {
                this.obstacles.push(this._createObstacle());
            }
        }

        ObstacleCourse.prototype._createObstacle = function() {
            var height = utils.randomNumber(Config.obstacle.min_height, Config.obstacle.max_height);
            var y = Config.obstacle_course.from_ground - height;
            var x = (Config.obstacle.width + Config.obstacle.spacing) * this.obstacles.length;
            return new Obstacle(x, y, Config.obstacle.width, height);
        };

        ObstacleCourse.prototype._get_current = function() {
            for (var i = 0; i < this.obstacles.length; i++) {
                var obs = this.obstacles[i];
                if ((obs.x + Config.obstacle.width) >= Config.player.x &&
                    obs.x <= (Config.player.x + Config.player.width)) {
                    obs.color = 'green';
                    return obs;
                } else {
                    obs.color = Config.obstacle.color;
                }
            }
        }

        ObstacleCourse.prototype._move = function() {
            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].x = this.obstacles[i].x - Config.obstacle_course.speed;

                if (this.obstacles[i].x < (Config.obstacle.spacing * -1)) {
                    this.obstacles.shift();
                    this.obstacles.push(this._createObstacle());
                }
            }
        };

        ObstacleCourse.prototype.draw = function(context) {
            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw(context);
            }
        };

        ObstacleCourse.prototype.update = function(player) {
            this._move();
            var current_obstacle = this._get_current();
            if (typeof(current_obstacle) === 'undefined') {
                this.player_is_colliding = false;
                return;
            }

            if (current_obstacle.y <= (player.y + Config.player.height)) {
                current_obstacle.color = 'red';
                this.player_is_colliding = true;
            } else {
                var player_y = (player.y + Config.player.height);
                var obs_y = current_obstacle.y;
                var points = 1 * ((40 - Math.abs(player_y - obs_y)) / 40);
                player.update_score(points);
                this.player_is_colliding = false;
            }
        };

        ObstacleCourse.prototype.player_collides = function() {
            return this.player_is_colliding;
        }

        return ObstacleCourse;
    });
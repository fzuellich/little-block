requirejs(
    ["main/config", "main/board", "main/player", "main/obstacle_course"],
    function(Config, Board, Player, ObstacleCourse) {

        var context = document.getElementById('draw').getContext('2d');

        // register listener for keyboard
        var keylistener = new window.keypress.Listener();
        var interval_id = 0;

        var p = new Player(Config.player.x, 100);
        keylistener.simple_combo('w', function() {
            p.jump()
        });

        var board = new Board(p);
        var os = new ObstacleCourse(35);

        var current_state;

        var running_state = function() {
            p.update();
            os.update(p);

            if (os.player_collides() === true) {
                current_state = game_over;
            }

            board.draw(context);
            os.draw(context);
            p.draw(context);
        }

        var game_over = function() {
            context.fillStyle = '#eee';
            context.fillRect(0, 0, Config.canvas.width, Config.canvas.height);

            context.fillStyle = '#333';
            context.font = "20px Georgia";
            context.fillText("Game over!", 350, 100);

            context.font = "16px Georgia";
            context.fillText("Score: " + p.score, 350, 125);
        }

        current_state = running_state;

        var update = function() {
            context.clearRect(0, 0, Config.canvas.width, Config.canvas.height);
            current_state();
        };

        interval_id = setInterval(update, 25);
    });
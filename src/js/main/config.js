define({
    board: {
        bottom_border_color: '#ddd',
        cloud_number: 40,
        cloud_height: 7,
        cloud_width: 22,
        cloud_radius: 15,
        cloud_color: '#eee',
        cloud_border_color: '#ccc',
        framerate: 10
    },

    canvas: {
        height: 200,
        width: 800
    },

    player: {
        width: 36,
        height: 18,
        jump: 3,
        gravity: 0.2,
        x: 350,
        color: '#aaa'
    },

    obstacle: {
        width: 40,
        max_height: 50,
        min_height: 30,
        spacing: 40,
        color: '#333'
    },

    obstacle_course: {
        from_ground: 190,
        speed: 4
    }
});
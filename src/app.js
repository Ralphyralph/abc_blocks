

var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);


// environment variables 
var world_width = canvas.width;
var world_height = canvas.height;


var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;



var engine = Engine.create();



var box = Bodies.rectangle(400, 200, 80, 80);

// ground, walls and ceiling
var ground = Bodies.rectangle(world_width/2, world_height+50, world_width, 100, { isStatic: true });
var left_wall = Bodies.rectangle(-50, world_height/2, 100, world_height, { isStatic: true });
var right_wall = Bodies.rectangle(world_width+50, world_height/2, 100, world_height, { isStatic: true });
var ceiling = Bodies.rectangle(world_width/2, -50, world_width, 100, { isStatic: true });


World.add(engine.world, [box, ground, left_wall, right_wall, ceiling]);





(function render() {
    var bodies = Matter.Composite.allBodies(engine.world);

    window.requestAnimationFrame(render);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;

        context.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
        }

        context.lineTo(vertices[0].x, vertices[0].y);
    }

    context.lineWidth = 1;
    context.strokeStyle = '#999';
    context.stroke();
})();


// run the engine
Engine.run(engine);
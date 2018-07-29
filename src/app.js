//=====     Setup     =====
//
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// environment variables
var world_width = 700;
var world_height = 600;

// create an engine
var engine = Engine.create(),
world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: world_width,
        height: world_height
    }
});





//=====     Bodies    =====




// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
        sprite: {
            texture: 'a.png'
            // xScale: 1,
            // yScale: 1
        }
    }
});



var boxB = Bodies.rectangle(450, 50, 80, 80);

console.log(boxA.render.sprite.texture);

// boxA.render.sprite.texture = 'public/img/a.png';

// make boxes unspinnable
Body.setInertia(boxA, Infinity);
Body.setInertia(boxB, Infinity);

// ground, walls and ceiling
var ground = Bodies.rectangle(world_width/2, world_height+50, world_width, 100, { isStatic: true });
var left_wall = Bodies.rectangle(-50, world_height/2, 100, world_height, { isStatic: true });
var right_wall = Bodies.rectangle(world_width+50, world_height/2, 100, world_height, { isStatic: true });
var ceiling = Bodies.rectangle(world_width/2, -50, world_width, 100, { isStatic: true });




// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;






//=====     Run     ======
//
// add all of the bodies to the world
World.add(world, [boxA, boxB, ground, left_wall, right_wall, ceiling]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
/*
class Abc_blocks {
    constructor() {
        this.engine = Matter.Engine.create();
        this.render = Matter.Render;
        this.world = Matter.World;
        this.bodies = Matter.Bodies;
        this.body = Matter.Body;
        this.mouse = Matter.Mouse;
        this.MouseConstraint = Matter.MouseConstraint;

        this.world_width = 700;
        this.world_height = 700;

        this.word = ['a','b','c'];
    }



    init() {
        this.render = this.render.create({
            element: document.body,
            engine: engine,
            options: {
                width: world_width,
                height: world_height,
                wireframes: false
            }
        });
    }



}
const blocks = new Abc_blocks();
blocks.init();
*/

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
        height: world_height,
        wireframes: false
    }
});

//=====     Bodies    =====

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
        sprite: {
            texture: '../public/img/abc_blocks/a.png',
            xScale: 0.75,
            yScale: 0.75
        }
    }
});

var boxB = Bodies.rectangle(450, 50, 80, 80, {
    render: {
        sprite: {
            texture: '../public/img/abc_blocks/b.PNG',
            xScale: 0.75,
            yScale: 0.75
        }
    }
});

setTimeout(() => {
    console.log(boxA);
},4000);




// boxA.render.sprite.texture = 'public/img/a.png';

// make boxes unspinnable
Body.setInertia(boxA, Infinity);
Body.setInertia(boxB, Infinity);

// ground, walls and ceiling
var ground = Bodies.rectangle(world_width/2, world_height+50, world_width, 100, { isStatic: true });
var left_wall = Bodies.rectangle(-50, world_height/2, 100, world_height, { isStatic: true });
var right_wall = Bodies.rectangle(world_width+50, world_height/2, 100, world_height, { isStatic: true });
var ceiling = Bodies.rectangle(world_width/2, -50, world_width, 100, { isStatic: true });

var inter = setInterval(() => {
    console.log(Matter.SAT.collides(boxB,ground).collided);
},100);

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
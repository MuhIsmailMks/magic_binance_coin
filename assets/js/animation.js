const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);
  
  pos.x += diffX * speed;
  pos.y += diffY * speed;
  
  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);
  
  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
  const rotate = 'rotate(' + angle +'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });
  
  curosrModifier.addEventListener('mouseleave', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});







// footer element draggable
var _canvasContainer = document.getElementById('headerEffectCanvas');
//   element: canvasContainer,
		
var _width = _canvasContainer.clientWidth,
	_height = _canvasContainer.clientHeight,
		_width05 = _width /2,
		_height05 = _height /2;

// console.log(_width + " x " + _height);

function matterJS() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        // element: document.body,
        element: _canvasContainer,
        engine: engine,
        options: {
            // width: 800,
            // height: 600,
            width: _width,
            height: _height,
            // showAngleIndicator: true,
            showAngleIndicator: false,
						wireframes: false,
						background: ''
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
        var sides = Math.round(Common.random(1, 8));

        // triangles can be a little unstable, so avoid until fixed
        sides = (sides === 3) ? 4 : sides;

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }

        switch (Math.round(Common.random(0, 1))) {
        case 0:
            if (Common.random() < 0.8) {
              return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { 
              chamfer: chamfer,
              render: { fillStyle: '#9c9c9c' }  
          });

            } else {
               return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { 
    chamfer: chamfer,
    render: { fillStyle: '#fff' }   
});

            }
        case 1:
           return Bodies.polygon(x, y, sides, Common.random(25, 50), { 
    chamfer: chamfer,
    render: { fillStyle: '#000' }  
});

        }
    });

    World.add(world, stack);

    World.add(world, [
        // walls
        Bodies.rectangle(_width05, 0, _width, 10, { isStatic: true }),
        Bodies.rectangle(_width05, _height, _width, 10, { isStatic: true }),
        Bodies.rectangle(_width, _height05, 10, _height, { isStatic: true }),
        Bodies.rectangle(0, _height05, 10, _height, { isStatic: true })
    ]);

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

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: _width, y: _height }
    });

    // context for MatterTools.Demo
/*
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
		*/
};

matterJS();



















const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Hitung tengah canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Titik awal asli (sebelum digeser)
const originalPoints = {
  start: {x: 100, y: 200},
  control: {x: 200, y: 150},
  end: {x: 500, y: 180}
};

// Hitung titik tengah garis (rata-rata start dan end)
const midX = (originalPoints.start.x + originalPoints.end.x) / 2;
const midY = (originalPoints.start.y + originalPoints.end.y) / 2;

// Hitung offset supaya garis berada di tengah canvas
const offsetX = centerX - midX;
const offsetY = centerY - midY;

// Titik setelah digeser supaya garis pas di tengah canvas
let points = {
  start: {x: originalPoints.start.x + offsetX, y: originalPoints.start.y + offsetY},
  control: {x: originalPoints.control.x + offsetX, y: originalPoints.control.y + offsetY},
  end: {x: originalPoints.end.x + offsetX, y: originalPoints.end.y + offsetY}
};

let dragging = false;
let prevPos = {x: 0, y: 0};
const HIT_DISTANCE = 10;

function getPointOnQuadraticCurve(t, p0, p1, p2) {
  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
  return {x, y};
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function isNearCurve(mousePos) {
  for(let i=0; i<=20; i++) {
    let t = i / 20;
    let pt = getPointOnQuadraticCurve(t, points.start, points.control, points.end);
    if(distance(mousePos, pt) <= HIT_DISTANCE) return true;
  }
  return false;
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000000'; // warna hitam
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(points.start.x, points.start.y);
  ctx.quadraticCurveTo(points.control.x, points.control.y, points.end.x, points.end.y);
  ctx.stroke();
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height)
  };
}

canvas.addEventListener('mousedown', (e) => {
  const pos = getMousePos(e);
  if(isNearCurve(pos)) {
    dragging = true;
    prevPos = pos;
    canvas.style.cursor = 'grabbing';
  }
});

window.addEventListener('mousemove', (e) => {
  if(!dragging) return;
  const pos = getMousePos(e);
  const dx = pos.x - prevPos.x;
  const dy = pos.y - prevPos.y;

  points.start.x += dx; points.start.y += dy;
  points.control.x += dx; points.control.y += dy;
  points.end.x += dx; points.end.y += dy;

  prevPos = pos;
  draw();
});

window.addEventListener('mouseup', () => {
  if(dragging) {
    dragging = false;
    canvas.style.cursor = 'default';
  }
});

draw();

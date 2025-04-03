// Matter.js 모듈 가져오기
const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

// 공 생성 함수
function createBall(x, y, radius, color) {
    return Bodies.circle(x, y, radius, {
        restitution: 0.5,
        render: {
            fillStyle: color,
        },
    });
}

// 공 추가 함수가 실행되었는지 추적하는 플래그
let hasBallsBeenAdded = false;

// 공 추가 함수
function addBalls(containerWidth, engine) {
    if (!engine || !engine.world) {
        console.error('Engine is not properly initialized');
        return;
    }

    // 이미 공이 추가되었다면 함수 실행 중단
    if (hasBallsBeenAdded) {
        return;
    }

    const balls = [];
    for (let i = 0; i < 100; i++) {
        const x = containerWidth - 60;
        const y = -50;
        const color = i === 50 ? '#FF3B00' : '#D3AF1C';
        const ball = createBall(x, y, 20, color);
        balls.push(ball);
    }
    World.add(engine.world, balls);
    hasBallsBeenAdded = true; // 공이 추가되었음을 표시
}

// 엔진을 전역 변수로 선언하고 내보내기
let engine = null;

document.addEventListener('DOMContentLoaded', () => {
    // 엔진과 렌더러 생성
    engine = Engine.create();
    engine.world.gravity.y = 1;

    const render = Render.create({
        element: document.getElementById('balls'),
        engine: engine,
        options: {
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.48,
            wireframes: false,
            background: 'transparent',
        },
    });

    // 벽 생성 (모두 #container 안에 위치)
    const containerWidth = window.innerWidth * 0.5;
    const containerHeight = window.innerHeight * 0.48;

    const walls = [
        Bodies.rectangle(containerWidth / 2, containerHeight - 40, containerWidth, 20, {
            isStatic: true,
            restitution: 0.8,
            render: {
                visible: false,
            },
        }),
        Bodies.rectangle(0, containerHeight / 2 - 10, 20, containerHeight, {
            isStatic: true,
            restitution: 0.8,
            render: {
                visible: false,
            },
        }),
        Bodies.rectangle(containerWidth, containerHeight / 2 - 10, 20, containerHeight, {
            isStatic: true,
            restitution: 0.8,
            render: {
                visible: false,
            },
        }),
    ];

    World.add(engine.world, walls);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false,
            },
        },
    });

    World.add(engine.world, mouseConstraint);

    // 엔진과 렌더러 실행
    Engine.run(engine);
    Render.run(render);
});

// engine과 addBalls 함수를 전역 스코프로 내보내기
window.engine = engine;
window.addBalls = addBalls;

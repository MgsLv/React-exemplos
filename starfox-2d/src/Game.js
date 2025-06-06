import React, { useRef, useEffect, useState} from 'react';
import xwingImg from './assets/xwing.png';

const Game = () => {
    const canvasRef = useRef(null);
    const [isRunning, setIsRunning] = useState(true);
    const keys = useRef({});
    const player = useRef({
        x: 50,
        y: 200,
        width: 40,
        height: 30,
        speed: 5
    });
    const background = useRef({ x: 0 }); // <- Mova para cá
    const playerImage = useRef(null);
    const obstacles = useRef([]);
    const bullets = useRef([]);

    const shoot = () => {
        bullets.current.push({
            x: player.current.x + player.current.width,
            y: player.current.y + player.current.height / 2 - 2,
            width: 10,
            height: 4,
            speed: 8
            });
    };

    // Handle key presses
    useEffect(() => {
        playerImage.current = new Image();
        playerImage.current.src = xwingImg;

        const handleKeyDown = (e) => {
            keys.current[e.code] = true;
            if(e.code === 'Space') {
                shoot();
            }
        };
        const handleKeyUp = (e) => keys.current[e.code] = false;

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);

        obstacles.current = Array(5).fill(0).map(() => ({
            x: 800 + Math.random() * 400, // começam fora da tela à direita
            y: Math.random() * (500 - 40), // altura do canvas - altura do obstáculo
            width: 40,
            height: 40,
            speed: 3 + Math.random() * 2
            }));
        };
    }, []);

    // Game Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawBackground = () => {
        ctx.fillStyle = '#001020';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        for (let i = 0; i < 100; i++) {
            let starX = (i * 20 + background.current.x) % canvas.width;
            let starY = (i * 30) % canvas.height;
            ctx.fillRect(starX, starY, 2, 2);
        }
    };

    const updateBackground = () => {
        background.current.x -= 1;
        if (background.current.x < 0) background.current.x += canvas.width;
    };

    const drawPlayer = () => {
        const img = playerImage.current;
        if (img && img.complete) {
        ctx.drawImage(img, player.current.x, player.current.y, player.current.width, player.current.height);
        } else {
        // fallback para quando a imagem não carregar rápido, desenha triângulo
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(player.current.x, player.current.y + player.current.height / 2);
        ctx.lineTo(player.current.x + player.current.width, player.current.y);
        ctx.lineTo(player.current.x + player.current.width, player.current.y + player.current.height);
        ctx.closePath();
        ctx.fill();
        }
    };

    const updateObstacles = () => {
    obstacles.current.forEach(ob => {
        ob.x -= ob.speed;
        if (ob.x + ob.width < 0) {
        // reposiciona do lado direito com nova altura e velocidade
        ob.x = 800 + Math.random() * 400;
        ob.y = Math.random() * (500 - ob.height);
        ob.speed = 3 + Math.random();
        }
        });
    };

    const drawObstacles = () => {
        ctx.fillStyle = 'red';
        obstacles.current.forEach(ob => {
            ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
        });
    };

    const updateBullets = () => {
        bullets.current = bullets.current.filter(bullet => bullet.x < 800);
        bullets.current.forEach(bullet => {
            bullet.x += bullet.speed;
        });
    };

    const drawBullets = () => {
        ctx.fillStyle = 'yellow';
        bullets.current.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    };

    const update = () => {
        if (keys.current['ArrowUp'] && player.current.y > 0) player.current.y -= player.current.speed;
        if (keys.current['ArrowDown'] && player.current.y + player.current.height < canvas.height) player.current.y += player.current.speed;
        if (keys.current['ArrowLeft'] && player.current.x > 0) player.current.x -= player.current.speed;
        if (keys.current['ArrowRight'] && player.current.x + player.current.width < canvas.width) player.current.x += player.current.speed;
    };

    const loop = () => {
        if (!isRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updateBackground();
        drawBackground();

        updateObstacles();
        drawObstacles();

        update();
        drawPlayer();

        updateBullets();
        drawBullets();

        requestAnimationFrame(loop);
    };

    loop();
    }, [isRunning]);

    return (
    <div style={{ backgroundColor: 'black', height: '100vh'}}>
        <canvas
            ref={canvasRef}
            width={800}
            height={500}
            style={{ border : '2px solid white', display: 'block', margin: '0 auto', backgroundColor: 'black'}}
        />
    </div>
    );
}

export default Game;
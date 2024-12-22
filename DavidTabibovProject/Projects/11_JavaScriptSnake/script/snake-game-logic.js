const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// קביעת גודל הקנבס
canvas.width = 600;
canvas.height = 600;

// הגדרות משחק בסיסיות
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [];
let food = {};
let direction = 'right';
let gameSpeed = 100;
let gameLoop = null;
let score = 0;
let level = 1;
let particles = [];
let trail = [];
const maxTrailLength = 10;

// צבעים וסגנונות
const colors = {
    snakeGradient: ['#00ff87', '#00ffee', '#00d5ff'],
    foodGlow: '#ff0055',
    particleColors: ['#00ff87', '#00ffee', '#00d5ff', '#ff0055'],
    background: '#000'
};

// אתחול המשחק
function initGame() {
    snake = [
        { x: 5, y: 5, angle: 0 },
        { x: 4, y: 5, angle: 0 },
        { x: 3, y: 5, angle: 0 }
    ];
    direction = 'right';
    score = 0;
    level = 1;
    gameSpeed = 100;
    particles = [];
    trail = [];
    updateScore();
    createFood();
}

// יצירת אפקט חלקיקים
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size = Math.max(0, this.size - 0.1);
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// עדכון חלקיקים
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// ציור חלקיקים
function drawParticles() {
    particles.forEach(particle => particle.draw());
}

// יצירת אוכל חדש
function createFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
        pulseSize: 0,
        pulseDirection: 1
    };

    // הוספת חלקיקים בעת יצירת אוכל חדש
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            colors.foodGlow
        ));
    }
}

// עדכון נתיב הזוהר של הנחש
function updateTrail() {
    trail.unshift({ x: snake[0].x, y: snake[0].y });
    if (trail.length > maxTrailLength) {
        trail.pop();
    }
}

// ציור נתיב הזוהר
function drawTrail() {
    trail.forEach((pos, index) => {
        const alpha = (maxTrailLength - index) / maxTrailLength * 0.3;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(
            pos.x * gridSize + gridSize / 2,
            pos.y * gridSize + gridSize / 2,
            gridSize / 2,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = colors.snakeGradient[0];
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

// ציור הנחש
function drawSnake() {
    // ציור נתיב הזוהר
    drawTrail();

    // ציור גוף הנחש
    snake.forEach((segment, index) => {
        const gradient = ctx.createRadialGradient(
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            0,
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            gridSize / 2
        );

        gradient.addColorStop(0, colors.snakeGradient[0]);
        gradient.addColorStop(0.5, colors.snakeGradient[1]);
        gradient.addColorStop(1, colors.snakeGradient[2]);

        ctx.beginPath();
        ctx.arc(
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            gridSize / 2 - (index === 0 ? 0 : 2),
            0,
            Math.PI * 2
        );
        ctx.fillStyle = gradient;

        // הוספת אפקט זוהר
        ctx.shadowColor = colors.snakeGradient[0];
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // הוספת עיניים לראש הנחש
        if (index === 0) {
            const eyeOffset = gridSize / 4;
            const eyeSize = gridSize / 6;

            // עיניים
            ctx.fillStyle = '#fff';
            switch (direction) {
                case 'right':
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset, segment.y * gridSize + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
                case 'left':
                    ctx.fillRect(segment.x * gridSize + eyeOffset - eyeSize, segment.y * gridSize + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + eyeOffset - eyeSize, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
                case 'up':
                    ctx.fillRect(segment.x * gridSize + eyeOffset, segment.y * gridSize + eyeOffset - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
                case 'down':
                    ctx.fillRect(segment.x * gridSize + eyeOffset, segment.y * gridSize + gridSize - eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + gridSize - eyeOffset, eyeSize, eyeSize);
                    break;
            }

            // אישונים
            ctx.fillStyle = '#000';
            const pupilSize = eyeSize / 2;
            const pupilOffset = eyeSize / 4;
            switch (direction) {
                case 'right':
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset + pupilOffset, segment.y * gridSize + eyeOffset + pupilOffset, pupilSize, pupilSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset + pupilOffset, segment.y * gridSize + gridSize - eyeOffset - eyeSize + pupilOffset, pupilSize, pupilSize);
                    break;
                case 'left':
                    ctx.fillRect(segment.x * gridSize + eyeOffset - eyeSize + pupilOffset, segment.y * gridSize + eyeOffset + pupilOffset, pupilSize, pupilSize);
                    ctx.fillRect(segment.x * gridSize + eyeOffset - eyeSize + pupilOffset, segment.y * gridSize + gridSize - eyeOffset - eyeSize + pupilOffset, pupilSize, pupilSize);
                    break;
                case 'up':
                    ctx.fillRect(segment.x * gridSize + eyeOffset + pupilOffset, segment.y * gridSize + eyeOffset - eyeSize + pupilOffset, pupilSize, pupilSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize + pupilOffset, segment.y * gridSize + eyeOffset - eyeSize + pupilOffset, pupilSize, pupilSize);
                    break;
                case 'down':
                    ctx.fillRect(segment.x * gridSize + eyeOffset + pupilOffset, segment.y * gridSize + gridSize - eyeOffset + pupilOffset, pupilSize, pupilSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize + pupilOffset, segment.y * gridSize + gridSize - eyeOffset + pupilOffset, pupilSize, pupilSize);
                    break;
            }
        }
    });
}

// ציור האוכל
function drawFood() {
    // עדכון פעימת האוכל
    food.pulseSize += 0.1 * food.pulseDirection;
    if (food.pulseSize > 1 || food.pulseSize < 0) {
        food.pulseDirection *= -1;
    }

    const baseSize = gridSize / 2;
    const pulseEffect = Math.sin(food.pulseSize) * 3;

    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        baseSize + pulseEffect,
        0,
        Math.PI * 2
    );

    const gradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        0,
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        baseSize + pulseEffect
    );

    gradient.addColorStop(0, '#ff0055');
    gradient.addColorStop(0.5, '#ff0088');
    gradient.addColorStop(1, '#ff00aa');

    ctx.fillStyle = gradient;
    ctx.shadowColor = colors.foodGlow;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
}

// עדכון הנחש
function updateSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // בדיקת התנגשות עם הקירות
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return false;
    }

    // בדיקת התנגשות עם עצמו
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return false;
        }
    }

    // בדיקת אכילת אוכל
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        createFood();
        // הוספת חלקיקים בעת אכילה
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(
                head.x * gridSize + gridSize / 2,
                head.y * gridSize + gridSize / 2,
                colors.particleColors[Math.floor(Math.random() * colors.particleColors.length)]
            ));
        }
    } else {
        snake.pop();
    }

    snake.unshift(head);
    updateTrail();
    return true;
}

// עדכון הניקוד
// אתחול משתנה ה-High Score מ-Local Storage או ברירת מחדל ל-0
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

// עדכון הניקוד
function updateScore() {
    // עדכון הניקוד הנוכחי והשלב
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = Math.floor(score / 100) + 1;

    // עדכון ה-High Score במידת הצורך
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // שמירת ה-High Score ב-Local Storage
    }

    // עדכון הערך של highScore במסך
    document.getElementById('highScore').textContent = highScore;

    // עדכון מהירות המשחק במידת הצורך
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
        level = newLevel;
        gameSpeed = Math.max(50, 100 - (level * 5));
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, gameSpeed);
    }
}

// צעד במשחק
function gameStep() {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (updateSnake()) {
        updateParticles();
        drawParticles();
        drawFood();
        drawSnake();
    }
}
// כאשר הדף נטען, יש לעדכן את התצוגה של ה-High Score
document.addEventListener("DOMContentLoaded", function () {
    // עדכון התצוגה של ה-High Score מתוך ה-Local Storage
    document.getElementById('highScore').textContent = highScore;
});

// סיום משחק
function gameOver() {
    clearInterval(gameLoop);
    document.getElementById('gameOverModal').style.display = 'flex';
    document.getElementById('finalScore').textContent = score;
}

// התחלת משחק חדש
function startGame() {
    clearInterval(gameLoop);
    initGame();
    gameLoop = setInterval(gameStep, gameSpeed);
    document.getElementById('gameOverModal').style.display = 'none';
}

// טיפול באירועי מקלדת
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});


// טיפול בכפתורים
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);
document.getElementByI
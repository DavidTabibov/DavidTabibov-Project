document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startButton');
    const difficultySelect = document.getElementById('difficultySelect');
    const scoreElement = document.getElementById('score');
    const movesElement = document.getElementById('moves');
    const timerElement = document.getElementById('timer');
    const victoryModal = document.getElementById('victoryModal');
    const playAgainButton = document.getElementById('playAgainButton');

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let score = 0;
    let gameStarted = false;
    let timerInterval = null;
    let startTime = null;

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🐙', '🦋', '🦀', '🐠'];

    // Binding Events
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', () => {
        victoryModal.style.display = 'none';
        startGame();
    });

    function startGame() {
        console.log("Start Game called");
        // Reset Game
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        score = 0;
        gameStarted = true;
        clearInterval(timerInterval);
        updateStats();

        // Create Cards
        const numCards = parseInt(difficultySelect.value);
        const selectedEmojis = emojis.slice(0, numCards / 2);
        const cardPairs = [...selectedEmojis, ...selectedEmojis];
        shuffleArray(cardPairs);

        // Set number of columns
        const columns = numCards <= 12 ? 3 : 4;
        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        // Create Cards in the Board
        cardPairs.forEach((emoji, index) => {
            const card = createCard(emoji, index);
            gameBoard.appendChild(card);
            cards.push(card);
        });

        // Start Timer
        startTime = new Date();
        timerInterval = setInterval(() => updateTimer(), 1000);
    }

    function createCard(emoji, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-front">${emoji}</div>
            <div class="card-back">🎮</div>
        `;
        card.addEventListener('click', () => flipCard(card, emoji));
        return card;
    }

    function flipCard(card, emoji) {
        console.log("Card clicked");
        if (!gameStarted || flippedCards.length >= 2 ||
            card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        flippedCards.push({ card, emoji });

        if (flippedCards.length === 2) {
            moves++;
            updateStats();
            checkMatch();
        }
    }

    function checkMatch() {
        console.log("Checking match between flipped cards");
        const [card1, card2] = flippedCards;
        const match = card1.emoji === card2.emoji;

        if (match) {
            handleMatch(card1.card, card2.card);
        } else {
            handleMismatch(card1.card, card2.card);
        }
    }

    function handleMatch(card1, card2) {
        console.log("Match found");
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        score += 10;
        updateStats();
        flippedCards = [];

        if (matchedPairs === cards.length / 2) {
            endGame();
        }
    }

    function handleMismatch(card1, card2) {
        console.log("No match, flipping cards back");
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    function updateStats() {
        movesElement.textContent = moves;
        scoreElement.textContent = score;
    }

    function updateTimer() {
        const now = new Date();
        const timeDiff = now - startTime;
        const minutes = Math.floor(timeDiff / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);
        timerElement.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function endGame() {
        console.log("Game Ended");
        clearInterval(timerInterval);
        gameStarted = false;

        // Time Bonus
        const timeBonus = Math.max(0, Math.floor(1000 - (new Date() - startTime) / 1000));
        score += timeBonus;

        // Update Victory Stats
        document.getElementById('finalMoves').textContent = moves;
        document.getElementById('finalTime').textContent = timerElement.textContent;
        document.getElementById('finalScore').textContent = score;

        // Show Victory Modal
        setTimeout(() => {
            victoryModal.style.display = 'flex';
            createConfetti();
        }, 500);
    }

    function createConfetti() {
        console.log("Creating confetti"); // You can add confetti library here if needed
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});

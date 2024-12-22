class WarGame {
    constructor() {
        this.playerDeck = [];
        this.computerDeck = [];
        this.playerWins = 0;
        this.computerWins = 0;
        this.showStartAnimation().then(() => {
            this.setupGame();
            this.addEventListeners();
        });
    }

    async showStartAnimation() {
        const playerArea = document.getElementById('playerPlayArea');
        const computerArea = document.getElementById('computerPlayArea');

        // Create floating cards background
        for (let i = 0; i < 52; i++) {
            const card = document.createElement('div');
            card.className = 'floating-card';
            card.style.left = `${Math.random() * 100}%`;
            card.style.top = `${Math.random() * 100}%`;
            card.style.animationDelay = `${Math.random() * 2}s`;
            card.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(card);
        }

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Remove floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.classList.add('fade-out');
            setTimeout(() => card.remove(), 1000);
        });
    }

    setupGame() {
        this.createDecks();
        this.updateUI();
        this.setGameStatus('המשחק מוכן להתחלה! לחץ על "שחק קלף" או מקש רווח');
        this.enableDealButton();
    }

    addEventListeners() {
        document.getElementById('dealButton').addEventListener('click', () => this.playRound());
        document.getElementById('newGameButton').addEventListener('click', () => this.resetGame());
        document.getElementById('rulesButton').addEventListener('click', () => this.showRules());
        document.getElementById('closeRulesButton').addEventListener('click', () => this.hideRules());

        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.playRound();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const rulesModal = document.getElementById('rulesModal');
            if (event.target === rulesModal) {
                this.hideRules();
            }
        });
    }

    resetGame() {
        this.playerDeck = [];
        this.computerDeck = [];
        this.playerWins = 0;
        this.computerWins = 0;
        this.isAnimating = false;

        // Clear play areas
        document.getElementById('playerPlayArea').innerHTML = '';
        document.getElementById('computerPlayArea').innerHTML = '';

        // Reset buttons
        this.enableDealButton();

        // Remove game over modal only (not rules modal)
        const gameOverModal = document.querySelector('.modal:not(#rulesModal)');
        if (gameOverModal) {
            gameOverModal.remove();
        }

        // Remove victory animations
        const victoryAnimation = document.querySelector('.victory-animation');
        if (victoryAnimation) {
            victoryAnimation.remove();
        }

        this.setupGame();
    }

    showRules() {
        const rulesModal = document.getElementById('rulesModal');
        rulesModal.style.display = 'flex';
        rulesModal.classList.remove('hidden');
    }

    hideRules() {
        const rulesModal = document.getElementById('rulesModal');
        rulesModal.style.display = 'none';
        rulesModal.classList.add('hidden');
    }

    hideGameOverModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('animate__fadeIn');
        modal.classList.add('animate__fadeOut');
        setTimeout(() => {
            modal.remove();
        }, 500);
    }

    createDecks() {
        const suits = ['♥', '♦', '♠', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const fullDeck = [];

        for (const suit of suits) {
            for (const value of values) {
                fullDeck.push({
                    suit,
                    value,
                    isRed: suit === '♥' || suit === '♦'
                });
            }
        }

        // Fisher-Yates shuffle algorithm
        for (let i = fullDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
        }

        this.playerDeck = fullDeck.slice(0, 26);
        this.computerDeck = fullDeck.slice(26);
    }

    async playRound() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.disableDealButton();

        const playerCard = this.playerDeck.pop();
        const computerCard = this.computerDeck.pop();

        await this.animateCardPlay(playerCard, computerCard);
        const result = this.compareCards(playerCard, computerCard);
        await this.handleRoundResult(result, playerCard, computerCard);

        this.updateUI();
        this.isAnimating = false;

        if (!this.checkGameOver()) {
            this.enableDealButton();
        }
    }

    async animateCardPlay(playerCard, computerCard) {
        const playerArea = document.getElementById('playerPlayArea');
        const computerArea = document.getElementById('computerPlayArea');

        // Clear previous cards
        playerArea.innerHTML = '';
        computerArea.innerHTML = '';

        // Create and add new card elements
        const playerCardElement = this.createCardElement(playerCard);
        const computerCardElement = this.createCardElement(computerCard);

        playerArea.appendChild(playerCardElement);
        computerArea.appendChild(computerCardElement);

        // Add flip animation
        playerCardElement.classList.add('card-flip');
        computerCardElement.classList.add('card-flip');

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 600));
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.isRed ? 'red' : ''}`;

        const valueTop = document.createElement('span');
        valueTop.className = 'card-value top-left';
        valueTop.textContent = card.value;

        const valueBottom = document.createElement('span');
        valueBottom.className = 'card-value bottom-right';
        valueBottom.textContent = card.value;

        const suitSpan = document.createElement('span');
        suitSpan.className = 'card-suit';
        suitSpan.textContent = card.suit;

        cardDiv.appendChild(valueTop);
        cardDiv.appendChild(suitSpan);
        cardDiv.appendChild(valueBottom);

        return cardDiv;
    }

    compareCards(playerCard, computerCard) {
        const cardOrder = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
            '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };

        const playerValue = cardOrder[playerCard.value];
        const computerValue = cardOrder[computerCard.value];

        if (playerValue > computerValue) return 'player';
        if (computerValue > playerValue) return 'computer';
        return 'tie';
    }

    async handleRoundResult(result, playerCard, computerCard) {
        const playerArea = document.getElementById('playerPlayArea');
        const computerArea = document.getElementById('computerPlayArea');

        switch (result) {
            case 'player':
                this.playerWins++;
                playerArea.classList.add('winner-glow');
                this.setGameStatus(`שחקן 1 ניצח עם ${playerCard.value}${playerCard.suit} נגד ${computerCard.value}${computerCard.suit}!`);
                break;
            case 'computer':
                this.computerWins++;
                computerArea.classList.add('winner-glow');
                this.setGameStatus(`המחשב ניצח עם ${computerCard.value}${computerCard.suit} נגד ${playerCard.value}${playerCard.suit}!`);
                break;
            case 'tie':
                playerArea.classList.add('card-shake');
                computerArea.classList.add('card-shake');
                this.setGameStatus('תיקו! שחקו שוב');
                break;
        }

        // Wait for animations
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Remove animation classes
        playerArea.classList.remove('winner-glow', 'card-shake');
        computerArea.classList.remove('winner-glow', 'card-shake');
    }

    updateUI() {
        document.getElementById('playerCards').textContent = this.playerDeck.length;
        document.getElementById('computerCards').textContent = this.computerDeck.length;
        document.getElementById('playerWins').textContent = this.playerWins;
        document.getElementById('computerWins').textContent = this.computerWins;

        // Update stats with animation
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => stat.classList.add('score-change'));
        setTimeout(() => {
            stats.forEach(stat => stat.classList.remove('score-change'));
        }, 500);
    }

    setGameStatus(message) {
        const statusElement = document.getElementById('gameStatus');
        statusElement.textContent = message;
        statusElement.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            statusElement.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    }

    checkGameOver() {
        if (this.playerDeck.length === 0 || this.computerDeck.length === 0) {
            this.showGameOverModal();
            return true;
        }
        return false;
    }

    showGameOverModal() {
        const winner = this.playerWins > this.computerWins ? 'שחקן 1' : 'המחשב';
        const modalHTML = `
            <div class="modal-content game-over-modal">
                <h2 class="modal-title">המשחק נגמר!</h2>
                <div class="final-score">
                    <p>שחקן 1: ${this.playerWins} ניצחונות</p>
                    <p>מחשב: ${this.computerWins} ניצחונות</p>
                </div>
                <p>המנצח הוא: ${winner}!</p>
                <button class="action-button restart-button" onclick="window.location.reload()">
                    <span class="button-icon">🔄</span>
                    התחל משחק חדש
                </button>
            </div>
        `;

        const modal = document.createElement('div');
        modal.className = 'modal animate__animated animate__fadeIn';
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);

        this.createVictoryAnimation();
    }

    createVictoryAnimation() {
        const container = document.createElement('div');
        container.className = 'victory-animation';

        // Create confetti pieces

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.animationDelay = `${Math.random() * 4}s`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            container.appendChild(confetti);
        }

        document.body.appendChild(container);
    }

    enableDealButton() {
        document.getElementById('dealButton').removeAttribute('disabled');
    }

    disableDealButton() {
        document.getElementById('dealButton').setAttribute('disabled', 'disabled');
    }
};

new WarGame();  // Start the game



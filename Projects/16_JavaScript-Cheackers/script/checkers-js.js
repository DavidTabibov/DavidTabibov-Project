class CheckersGame {
    constructor() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.validMoves = [];
        this.scores = { red: 12, black: 12 };
        this.gameActive = true;
        this.moveHistory = [];

        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.clearSelections();
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.validMoves = [];
        this.scores = { red: 12, black: 12 };
        this.gameActive = true;
        this.moveHistory = [];

        const boardElement = document.getElementById('game-board');
        if (boardElement) {
            boardElement.innerHTML = '';
        }

        this.createBoard();
        this.placePieces();
        this.updateGameStatus();
    }

    setupEventListeners() {
        const boardElement = document.getElementById('game-board');
        const newGameButton = document.getElementById('new-game');
        const undoButton = document.getElementById('undo-move');

        if (boardElement) {
            boardElement.addEventListener('click', (event) => this.handleBoardClick(event));
        }

        if (newGameButton) {
            newGameButton.addEventListener('click', () => this.initializeGame());
        }

        if (undoButton) {
            undoButton.addEventListener('click', () => this.undoLastMove());
        }
    }

    clearBoard() {
        const boardElement = document.getElementById('game-board');
        if (boardElement) {
            boardElement.innerHTML = '';
        }
    }

    clearListeners() {
        const boardElement = document.getElementById('game-board');
        const newGameButton = document.getElementById('new-game');
        const undoButton = document.getElementById('undo-move');

        if (boardElement) {
            boardElement.replaceWith(boardElement.cloneNode(true));
        }

        if (newGameButton) {
            newGameButton.replaceWith(newGameButton.cloneNode(true));
        }

        if (undoButton) {
            undoButton.replaceWith(undoButton.cloneNode(true));
        }
    }

    createBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;
                boardElement.appendChild(square);
            }
        }
    }

    placePieces() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));

        // הצבת כלים אדומים
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.createPiece(row, col, 'red');
                }
            }
        }

        // הצבת כלים שחורים
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.createPiece(row, col, 'black');
                }
            }
        }
    }

    createPiece(row, col, color) {
        const square = this.getSquare(row, col);
        if (!square) return;

        const piece = document.createElement('div');
        piece.classList.add('piece', color);
        piece.dataset.row = row;
        piece.dataset.col = col;
        square.appendChild(piece);

        this.board[row][col] = { color, isKing: false };
    }

    getSquare(row, col) {
        return document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    }

    selectPiece(piece) {
        this.handlePieceSelection(piece);
    }

    handlePieceSelection(piece) {
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);

        if (isNaN(row) || isNaN(col)) return;

        this.clearSelections();
        this.selectedPiece = { row, col };
        piece.classList.add('selected');

        let allMoves = this.getValidMoves(row, col);

        this.validMoves = allMoves;
        this.highlightValidMoves(allMoves);
    }

    handleSquareClick(square) {
        const targetRow = parseInt(square.dataset.row);
        const targetCol = parseInt(square.dataset.col);

        if (this.isValidMove(square)) {
            this.executeMove(square);
        }
    }

    findValidMoves(row, col) {
        const piece = this.board[row]?.[col];
        if (!piece) return [];

        const moves = [];
        const directions = piece.isKing ? [-1, 1] : piece.color === 'red' ? [1] : [-1];

        // Check for jumps first
        moves.push(...this.findJumps(row, col, directions));

        // If no jumps available, check for regular moves
        if (moves.length === 0) {
            moves.push(...this.findRegularMoves(row, col, directions));
        }

        return moves;
    }

    findKingMoves(row, col) {
        const moves = [];
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

        directions.forEach(([dirRow, dirCol]) => {
            let currentRow = row;
            let currentCol = col;
            let canJumpMore = true;

            while (canJumpMore) {
                currentRow += dirRow;
                currentCol += dirCol;

                if (!this.isValidPosition(currentRow, currentCol)) break;

                const targetSquare = this.board[currentRow][currentCol];

                if (!targetSquare) {
                    moves.push({
                        row: currentRow,
                        col: currentCol,
                        isJump: false
                    });
                } else if (targetSquare.color !== this.currentPlayer) {
                    let jumpRow = currentRow + dirRow;
                    let jumpCol = currentCol + dirCol;

                    while (this.isValidPosition(jumpRow, jumpCol) && !this.board[jumpRow][jumpCol]) {
                        moves.push({
                            row: jumpRow,
                            col: jumpCol,
                            isJump: true,
                            captured: {
                                row: currentRow,
                                col: currentCol
                            }
                        });
                        jumpRow += dirRow;
                        jumpCol += dirCol;
                    }
                    break;
                } else {
                    break;
                }
            }
        });

        return moves;
    }

    findKingJumps(row, col, visited = new Set()) {
        const jumps = [];
        const visitedKey = `${row},${col}`;
        if (visited.has(visitedKey)) return jumps;
        visited.add(visitedKey);

        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

        directions.forEach(([dirRow, dirCol]) => {
            let currentRow = row;
            let currentCol = col;
            let foundPiece = false;
            let jumpedRow, jumpedCol;

            while (this.isValidPosition(currentRow + dirRow, currentCol + dirCol)) {
                currentRow += dirRow;
                currentCol += dirCol;

                if (this.board[currentRow][currentCol]) {
                    if (!foundPiece && this.board[currentRow][currentCol].color !== this.currentPlayer) {
                        foundPiece = true;
                        jumpedRow = currentRow;
                        jumpedCol = currentCol;
                        continue;
                    }
                    break;
                }

                if (foundPiece) {
                    jumps.push({
                        row: currentRow,
                        col: currentCol,
                        isJump: true,
                        captured: { row: jumpedRow, col: jumpedCol }
                    });

                    const furtherJumps = this.findKingJumps(
                        currentRow,
                        currentCol,
                        new Set(visited)
                    );

                    jumps.push(...furtherJumps.map(jump => ({
                        ...jump,
                        previousCaptures: [{ row: jumpedRow, col: jumpedCol }]
                            .concat(jump.previousCaptures || [])
                    })));
                }
            }
        });

        return jumps;
    }

    executeMove(square) {
        const targetRow = parseInt(square.dataset.row);
        const targetCol = parseInt(square.dataset.col);
        const move = this.validMoves.find(m => m.row === targetRow && m.col === targetCol);

        if (!move) return;

        const pieceElement = this.getSquare(this.selectedPiece.row, this.selectedPiece.col)?.querySelector('.piece');
        if (!pieceElement) return;

        // Save the move to history before executing it
        this.saveMoveToHistory(
            { row: this.selectedPiece.row, col: this.selectedPiece.col },
            { row: targetRow, col: targetCol },
            move.captured,
            this.board[this.selectedPiece.row][this.selectedPiece.col].isKing
        );

        // Handle capture if it's a jump move
        if (move.isJump && move.captured) {
            const capturedPiece = this.getSquare(move.captured.row, move.captured.col)?.querySelector('.piece');
            if (capturedPiece) {
                capturedPiece.remove();
                this.board[move.captured.row][move.captured.col] = null;
                this.scores[this.currentPlayer === 'red' ? 'black' : 'red']--;
                this.showMessage(`${this.currentPlayer === 'red' ? 'אדום' : 'שחור'} אכל כלי!`, 'success');
            }
        } else {
            this.showMessage(`${this.currentPlayer === 'red' ? 'אדום' : 'שחור'} זז`, 'info');
        }

        // Move the piece
        square.appendChild(pieceElement);
        pieceElement.dataset.row = targetRow;
        pieceElement.dataset.col = targetCol;

        this.board[targetRow][targetCol] = this.board[this.selectedPiece.row][this.selectedPiece.col];
        this.board[this.selectedPiece.row][this.selectedPiece.col] = null;

        // Check for king promotion
        this.checkForKing(targetRow, targetCol);

        this.finishTurn();
    }

    findJumps(row, col, directions) {
        const jumps = [];
        const piece = this.board[row]?.[col];
        if (!piece) return jumps;

        directions.forEach(dRow => {
            [-1, 1].forEach(dCol => {
                const jumpRow = row + dRow;
                const jumpCol = col + dCol;
                const targetRow = row + (dRow * 2);
                const targetCol = col + (dCol * 2);

                if (this.isValidJump(row, col, jumpRow, jumpCol, targetRow, targetCol)) {
                    jumps.push({
                        row: targetRow,
                        col: targetCol,
                        isJump: true,
                        captured: { row: jumpRow, col: jumpCol }
                    });
                }
            });
        });

        return jumps;
    }

    findRegularMoves(row, col, directions) {
        const moves = [];

        directions.forEach(dRow => {
            [-1, 1].forEach(dCol => {
                const newRow = row + dRow;
                const newCol = col + dCol;

                if (this.isValidPosition(newRow, newCol) && !this.board[newRow]?.[newCol]) {
                    moves.push({
                        row: newRow,
                        col: newCol,
                        isJump: false
                    });
                }
            });
        });

        return moves;
    }

    isValidJump(startRow, startCol, jumpRow, jumpCol, targetRow, targetCol) {
        if (!this.isValidPosition(targetRow, targetCol)) return false;

        const jumpedPiece = this.board[jumpRow]?.[jumpCol];
        const targetPiece = this.board[targetRow]?.[targetCol];

        return (
            jumpedPiece &&
            jumpedPiece.color !== this.currentPlayer &&
            !targetPiece
        );
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isValidMove(square) {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        return this.validMoves.some(move => move.row === row && move.col === col);
    }

    checkForKing(row, col) {
        const piece = this.board[row][col];
        if (!piece.isKing) {
            if ((piece.color === 'red' && row === 7) ||
                (piece.color === 'black' && row === 0)) {
                piece.isKing = true;
                const pieceElement = this.getSquare(row, col).querySelector('.piece');
                pieceElement.classList.add('king');
                this.showMessage(`${piece.color === 'red' ? 'אדום' : 'שחור'} הפך למלך! 👑`, 'success');
            }
        }
    }

    finishTurn() {
        this.selectedPiece = null;
        this.validMoves = [];
        document.querySelectorAll('.selected, .valid-move').forEach(el => {
            el.classList.remove('selected', 'valid-move');
        });

        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        this.updateGameStatus();
        this.checkForMandatoryJumps();
        this.checkForGameEnd();
    }

    clearSelections() {
        document.querySelectorAll('.piece').forEach(p => p.classList.remove('selected'));
        document.querySelectorAll('.square').forEach(s => {
            s.classList.remove('valid-move', 'jump-move');
        });
    }

    highlightValidMoves(moves) {
        moves.forEach(move => {
            const square = this.getSquare(move.row, move.col);
            if (square) {
                square.classList.add('valid-move');
                if (move.isJump) {
                    square.classList.add('jump-move');
                }
            }
        });
    }

    showMessage(text, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `game-message ${type}`;
        messageElement.textContent = text;

        // Remove any existing messages first
        const existingMessages = document.querySelectorAll('.game-message');
        existingMessages.forEach(msg => msg.remove());

        document.querySelector('.game-container').appendChild(messageElement);

        // Animate the message
        messageElement.style.animation = 'fadeInOut 2s ease-in-out';
        setTimeout(() => messageElement.remove(), 2000);
    }

    updateGameStatus() {
        const playerDisplay = document.getElementById('current-player');
        const redScore = document.getElementById('red-score');
        const blackScore = document.getElementById('black-score');

        playerDisplay.textContent = this.currentPlayer === 'red' ? 'אדום' : 'שחור';
        playerDisplay.className = this.currentPlayer;

        redScore.textContent = this.scores.red;
        blackScore.textContent = this.scores.black;

        document.querySelector('.red-score').classList.toggle('active', this.currentPlayer === 'red');
        document.querySelector('.black-score').classList.toggle('active', this.currentPlayer === 'black');
    }

    checkForMandatoryJumps() {
        this.mandatoryJumps = [];
        let hasJumps = false;

        // עובר על כל הלוח
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const moves = this.getValidMoves(row, col);
                    if (moves && moves.some(move => move.isJump)) {
                        this.mandatoryJumps.push({ row, col });
                        hasJumps = true;
                    }
                }
            }
        }

        this.isJumpAvailable = hasJumps;
        return hasJumps;
    }

    getValidMoves(row, col) {
        const piece = this.board[row]?.[col];
        if (!piece) return [];

        const moves = [];

        if (piece.isKing) {
            moves.push(...this.findKingMoves(row, col));
        } else {
            const directions = piece.color === 'red' ? [1] : [-1];
            const jumpMoves = this.findJumps(row, col, directions);

            if (jumpMoves.length > 0) {
                moves.push(...jumpMoves);
            } else {
                moves.push(...this.findRegularMoves(row, col, directions));
            }
        }

        return moves;
    }

    checkForGameEnd() {
        if (this.scores.red === 0) {
            this.gameActive = false;
            this.showMessage('שחור ניצח את המשחק! 🏆', 'success');
            this.announceWinner('שחור');
        } else if (this.scores.black === 0) {
            this.gameActive = false;
            this.showMessage('אדום ניצח את המשחק! 🏆', 'success');
            this.announceWinner('אדום');
        } else if (this.isStalemate()) {
            this.gameActive = false;
            this.showMessage('תיקו! אין מהלכים אפשריים', 'info');
        }
    }

    announceWinner(winner) {
        const announcement = document.createElement('div');
        announcement.className = 'winner-announcement';
        announcement.innerHTML = `
            <h2>המשחק הסתיים!</h2>
            <p>${winner} ניצח!</p>
            <button onclick="this.parentElement.remove(); new CheckersGame();">משחק חדש</button>
        `;
        document.querySelector('.game-container').appendChild(announcement);
    }

    isStalemate() {
        // Check if current player has any valid moves
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    if (this.getValidMoves(row, col).length > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    saveMoveToHistory(from, to, captured = null, wasKing = false) {
        this.moveHistory.push({
            from: { ...from },
            to: { ...to },
            captured: captured ? { ...captured } : null,
            wasKing,
            player: this.currentPlayer
        });
    }

    undoLastMove() {
        if (this.moveHistory.length === 0) {
            this.showMessage('אין מהלכים לביטול!', 'warning');
            return;
        }

        const lastMove = this.moveHistory.pop();

        // Get the piece that was moved
        const piece = this.getSquare(lastMove.to.row, lastMove.to.col)?.querySelector('.piece');
        if (!piece) return;

        // Move piece back to original position
        const originalSquare = this.getSquare(lastMove.from.row, lastMove.from.col);
        if (!originalSquare) return;

        originalSquare.appendChild(piece);
        piece.dataset.row = lastMove.from.row;
        piece.dataset.col = lastMove.from.col;

        // Update board array
        this.board[lastMove.from.row][lastMove.from.col] = this.board[lastMove.to.row][lastMove.to.col];
        this.board[lastMove.to.row][lastMove.to.col] = null;

        // Restore captured piece if there was one
        if (lastMove.captured) {
            const capturedSquare = this.getSquare(lastMove.captured.row, lastMove.captured.col);
            const capturedPiece = document.createElement('div');
            capturedPiece.classList.add('piece', this.currentPlayer);
            if (lastMove.captured.wasKing) {
                capturedPiece.classList.add('king');
            }
            capturedSquare.appendChild(capturedPiece);

            this.board[lastMove.captured.row][lastMove.captured.col] = {
                color: this.currentPlayer,
                isKing: lastMove.captured.wasKing
            };

            this.scores[this.currentPlayer]++;
        }

        // Revert king status if needed
        if (!lastMove.wasKing && piece.classList.contains('king')) {
            piece.classList.remove('king');
            this.board[lastMove.from.row][lastMove.from.col].isKing = false;
        }

        // Switch back to previous player
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        this.clearSelections();
        this.updateGameStatus();
        this.showMessage('המהלך האחרון בוטל', 'info');
    }

    handleBoardClick(event) {
        if (!this.gameActive) return;

        const piece = event.target.closest('.piece');
        const square = event.target.closest('.square');

        if (piece && piece.classList.contains(this.currentPlayer)) {
            this.selectPiece(piece);
        } else if (square && this.selectedPiece && this.isValidMove(square)) {
            this.executeMove(square);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CheckersGame();
});
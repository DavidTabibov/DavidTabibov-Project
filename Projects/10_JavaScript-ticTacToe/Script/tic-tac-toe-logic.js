document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let xIsNext = true;
    const X_CLASS = 'X';
    const O_CLASS = 'O';

    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
        [0, 4, 8], [2, 4, 6] // אלכסונים
    ];

    function startGame() {
        xIsNext = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
            cell.style.backgroundColor = '';
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        updateStatus();
    }

    function handleClick(e) {
        const cell = e.target;
        if (cell.textContent) return;

        const currentClass = xIsNext ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            switchTurns();
            updateStatus();
        }

        // מניעת פוקוס על התא לאחר לחיצה
        cell.blur();
    }

    function placeMark(cell, currentClass) {
        cell.textContent = currentClass;
        cell.style.color = currentClass === X_CLASS ? '#e74c3c' : '#3498db';
        cell.style.backgroundColor = '#f8f9fa';
        cell.classList.add(currentClass);
    }

    function switchTurns() {
        xIsNext = !xIsNext;
    }

    function updateStatus() {
        status.textContent = `תור שחקן ${xIsNext ? X_CLASS : O_CLASS}`;
        status.style.color = xIsNext ? '#e74c3c' : '#3498db';
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentClass;
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function endGame(draw) {
        if (draw) {
            status.textContent = 'תיקו!';
            status.style.color = '#2c3e50';
        } else {
            const winner = xIsNext ? X_CLASS : O_CLASS;
            status.textContent = `שחקן ${winner} ניצח!`;
            status.style.color = winner === X_CLASS ? '#e74c3c' : '#3498db';

            // הדגשת הקומבינציה המנצחת
            highlightWinningCombination(winner);
        }

        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    function highlightWinningCombination(winner) {
        WINNING_COMBINATIONS.forEach(combination => {
            if (combination.every(index => cells[index].textContent === winner)) {
                combination.forEach(index => {
                    cells[index].style.backgroundColor = '#dff9fb';
                });
            }
        });
    }

    // אתחול המשחק
    startGame();

    // הוספת מאזין לכפתור ההתחלה מחדש
    restartButton.addEventListener('click', startGame);
});

const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const mathForm = document.getElementById('mathForm');
const resultDiv = document.getElementById('result');
const answerInput = document.getElementById('answer');

let a, b, correctAnswer;

function generateQuestion() {
    a = Math.floor(Math.random() * 100);
    b = Math.floor(Math.random() * 100);
    correctAnswer = a + b;
    num1.textContent = a;
    num2.textContent = b;
    resultDiv.textContent = '';
    answerInput.value = '';
}

mathForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answerInput.value, 10);
    if (userAnswer === correctAnswer) {
        resultDiv.textContent = 'Correct! Great job!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent = `Wrong! The correct answer is ${correctAnswer}.`;
        resultDiv.style.color = 'red';
    }
    setTimeout(generateQuestion, 3000);
});

generateQuestion();

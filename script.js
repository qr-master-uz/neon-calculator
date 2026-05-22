let currentInput = '0';
let historyInput = '';

const currentDisplay = document.getElementById('current');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    historyDisplay.innerText = historyInput;
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return; // Ikkinchi nuqtani qo'ydirmaslik
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    // Agar ekranda son bo'lsa, operatorni tarixga o'tkazish
    if (currentInput !== '') {
        historyInput += ' ' + currentInput + ' ' + operator;
        currentInput = '0';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    historyInput = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    if (historyInput === '') return;
    
    let fullExpression = historyInput + ' ' + currentInput;
    try {
        // Xavfsiz hisoblash (oddiy kalkulyator funksiyasi)
        let result = eval(fullExpression);
        currentInput = Number(result.toFixed(8)).toString(); // Verguldan keyingi sonlarni tartibga solish
        historyInput = '';
    } catch (error) {
        currentInput = 'Xatolik';
    }
    updateDisplay();
}
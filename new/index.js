const numbers = document.querySelectorAll('.digits button');
const operations = document.querySelectorAll('.operations button');
const decimalBtn = document.getElementById('decimal');
const cancelBtn = document.querySelectorAll('.cancel button');
const resultBtn = document.getElementById('result');
const display = document.getElementById('display');
let currentNumber = '0';
let newNumber = false;
let pendingOperation = '';

for (let i=0; i<numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (let i=0; i<operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
};

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
    event.preventDefault();

    if (newNumber){
        display.value = number;
        newNumber = false;
    } else {
        if(display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
};

function operation(ops) {
    event.preventDefault();
    let localMemory = display.value;

    if (newNumber && pendingOperation !== '=') {
        display.value = newNumber;
    } else {
        newNumber = true;
        if (pendingOperation === '+') {
            currentNumber += parseFloat(localMemory);
        } else if (pendingOperation === '-') {
            currentNumber -= parseFloat(localMemory);
        } else if (pendingOperation === '*') {
            currentNumber *= parseFloat(localMemory);
        } else if (pendingOperation === '/') {
            currentNumber /= parseFloat(localMemory);
        } else {
            currentNumber = parseFloat(localMemory);
        };

        display.value = currentNumber;
        pendingOperation = ops;
    }
}

function decimal(argument) {
    event.preventDefault();
    
    let localDecMemory = display.value;

    if(newNumber) {
        localDecMemory = '0.';
        newNumber = false;
    } else {
        if(localDecMemory.indexOf('.') === -1) {
            localDecMemory += '.'
        };   
    };

    display.value = localDecMemory;
}
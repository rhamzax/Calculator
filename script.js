const nums = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');
const prevDisplay = document.querySelector('.prev');
const currentDisplay = document.querySelector('.current');

nums.forEach(num => num.addEventListener('click', updateNum));
operations.forEach(operator => operator.addEventListener('click', updateOperator));
clearBtn.addEventListener('click', clear)
equalBtn.addEventListener('click', equate);
deleteBtn.addEventListener('click', deleteNum)

let calculator = {
    currentNum: '',
    prevNum: '',
    storedOperation: '',
}

function updateNum(){
    if(calculator.currentNum.includes('.') && this.value === '.') return
    calculator.currentNum = calculator.currentNum.toString() + this.value.toString();
    updateDisplay()
}

function updateOperator(){
    if(calculator.currentNum === '' && calculator.prevNum === '') return
    if(calculator.currentNum === '') return
    if(calculator.prevNum === ''){
        calculator.prevNum = calculator.currentNum
        calculator.storedOperation = this.value; 
        calculator.currentNum = ''
    }
    else{
        if(calculator.storedOperation === '/' && calculator.currentNum === '0'){
            divideByZero()
        }
        else{
            calculator.prevNum = operate(calculator.storedOperation, parseFloat(calculator.prevNum), parseFloat(calculator.currentNum)).toString()
            calculator.currentNum = '';
            calculator.storedOperation = this.value; 
        }       
    }
    updateDisplay();
}
function updateDisplay(){
    currentDisplay.textContent = calculator.currentNum
    prevDisplay.textContent = `${calculator.prevNum} ${calculator.storedOperation}`
}

function clear(){
    calculator.currentNum = ''
    calculator.prevNum = ''
    calculator.storedOperation = ''
    updateDisplay()
}

function deleteNum(){
    calculator.currentNum = calculator.currentNum.slice(0, -1);
    updateDisplay()
}

function equate(){
    if(calculator.prevNum === '' || calculator.currentNum === '') return
    if(calculator.storedOperation === '/' && calculator.currentNum === '0'){
        divideByZero()
    }
    else{
        calculator.currentNum = operate(calculator.storedOperation, parseFloat(calculator.prevNum), parseFloat(calculator.currentNum)).toString()
        calculator.prevNum = ''
        calculator.storedOperation = ''
        updateDisplay()
        calculator.currentNum = ''
    }

}

function divideByZero(){
        currentDisplay.textContent = 'LMAO'
        prevDisplay.textContent = ''
        calculator.currentNum = ''
        calculator.prevNum = ''
        calculator.storedOperation = ''
}

function operate(operator, num1, num2){
    if (operator === "+"){
        return num1 + num2;
    }
    else if (operator === "-"){
        return num1 - num2;
    }
    else if (operator === "*"){
        return num1 * num2;
    }
    else if (operator === "/"){
        return num1 / num2;
    }
}


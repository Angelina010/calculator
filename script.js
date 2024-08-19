function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2){
    return num2 === 0? "Error: Division by 0" : num1 / num2
}

function operate (num1, num2, operator){
    switch (operator) {
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1,num2)
        case 'x':
            return multiply(num1,num2)
        case '/':
            return divide(num1, num2)
        default:
            return "Error: Invalid operator";
    }
}

function updateDisplay(){
    divDisplay.textContent = curDisplay;
}


let num1 = null;
let num2 = null;
let operator = "";

let curDisplay = "";

let isCalculated = false; //if true, num1 is the result of a previous calculation and not from user input

const divDisplay = document.querySelector(".display");

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener("click", (event) => {
        if (isCalculated){
            curDisplay = event.target.textContent;
            num1 =Number(curDisplay);
            isCalculated = false;
        }
        else if (operator === ""){
            curDisplay += event.target.textContent;
            num1 =Number(curDisplay);
        }
        else{
            curDisplay = event.target.textContent;
            num2 =Number(curDisplay);
        }
        updateDisplay();
        
    });
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) => {
        if (num1 != null && num2 != null){
            num1 = operate(num1, num2, operator)
        }
        operator = event.target.textContent;
        isCalculated = false;
    }
)
})


const equalsBtn = document.querySelector(".equals")
equalsBtn.addEventListener("click", () => {
    curDisplay = operate(num1, num2, operator);
    num1 = Number(curDisplay);
    num2 = null;
    operator = "";
    isCalculated = true;
    updateDisplay();
})


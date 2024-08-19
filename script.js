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

function updateMemoryDisplay(){
    let memoryDisplayText = ""
    if (num1 != null) {
        memoryDisplayText += num1 + " "
    }
    if (operator != "") {
        memoryDisplayText += operator + " "
    }

    if (num2 != null) {
        memoryDisplayText += num2
    }
    memoryDisplay.textContent = memoryDisplayText;
}


let num1 = null;
let num2 = null;
let operator = "";

let curDisplay = "";

let isCalculated = false; //if true, num1 is the result of a previous calculation and not from user input

const divDisplay = document.querySelector(".display");
const memoryDisplay = document.querySelector(".memory")

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
            isCalculated = false;
        }
        else{
            curDisplay += event.target.textContent;
            num2 =Number(curDisplay);
        }
        updateDisplay();
        updateMemoryDisplay();
        
    });
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) => {
        if (num1 != null && num2 != null){
            curDisplay = operate(num1, num2, operator)
            num1 = curDisplay
            num2 = null;
            updateDisplay();
        }
        operator = event.target.textContent;
        isCalculated = false;
        curDisplay = ""; //reset the display for num2
        updateMemoryDisplay();
    }
)
})


const equalsBtn = document.querySelector(".equals")
equalsBtn.addEventListener("click", () => {
    if (operator != ""){
        curDisplay = operate(num1, num2, operator);
    }
    num1 = Number(curDisplay);
    num2 = null;
    operator = "";
    isCalculated = true;
    updateDisplay();
    updateMemoryDisplay();
})


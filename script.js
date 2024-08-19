const DEFAULT_DISPLAY = 0;

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
        case '−':
            return subtract(num1,num2)
        case '×':
            return multiply(num1,num2)
        case '÷':
            return divide(num1, num2)
        default:
            return "Error: Invalid operator";
    }
}

function updateDisplay(){
    mainDisplay.textContent = numBuilder;
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
        memoryDisplayText += num2 + " "
    }
    memoryDisplay.textContent = memoryDisplayText;
}


let num1 = null;
let num2 = null;
let operator = "";

let numBuilder = "";

let isCalculated = false; //if true, num1 is the result of a previous calculation and not from user input

const mainDisplay = document.querySelector(".display");
const memoryDisplay = document.querySelector(".memory")

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener("click", (event) => {
        if (isCalculated) {
            numBuilder = event.target.textContent;
            num1 = Number(numBuilder);
            isCalculated = false;
        } else {
            numBuilder += event.target.textContent;
            if (operator === "") {
                num1 = Number(numBuilder);
            } else {
                num2 = Number(numBuilder);
            }
        }
        updateDisplay();
        updateMemoryDisplay();
        
    });
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) => {
        if (num1 != null && num2 != null){
            numBuilder = operate(num1, num2, operator)
            num1 = numBuilder
            num2 = null;
            updateDisplay();
        }
        operator = event.target.textContent;
        isCalculated = false;
        numBuilder = ""; //reset the display for num2
        updateMemoryDisplay();
    }
)
})


const equalsBtn = document.querySelector(".equals")
equalsBtn.addEventListener("click", () => {
    if (num1 != null && num2 != null){
        numBuilder = String(operate(num1, num2, operator));
        num1 = Number(numBuilder);
        num2 = null;
        operator = "";
        isCalculated = true;
        updateDisplay();
        memoryDisplay.textContent += "="
    }
})

const allClearBtn = document.querySelector(".all-clear")
allClearBtn.addEventListener("click", ()=> {
    num1 = null;
    num2 = null;
    operator = "";
    numBuilder = "";
    isCalculated = false;
    mainDisplay.textContent = DEFAULT_DISPLAY;
    updateMemoryDisplay();
})

const clearEntryBtn = document.querySelector(".clear-entry")
clearEntryBtn.addEventListener("click", ()=>{
    numBuilder = numBuilder.slice(0, -1);

    if (operator === ""){
        num1 = numBuilder.length > 0? Number(numBuilder) : null
    }
    else if (num2 != null){
        num2 = numBuilder.length > 0? Number(numBuilder) : null
    }
    else{
        operator = "";
    }

    updateMemoryDisplay();
    updateDisplay();
    if (mainDisplay.textContent === ""){
        mainDisplay.textContent = DEFAULT_DISPLAY;
    }
 } )

 const signButton = document.querySelector(".sign");
 let negative = false;
 signButton.addEventListener("click", () => {
    if (!negative){
        numBuilder = "-" + numBuilder;
        negative = true;
    }
    else{
        numBuilder = numBuilder.substring(1, numBuilder.length);
        negative = false;
    }
    if (num2 != null){
        num2 = -num2;
    }
    else {
        if (num1 != null){
            num1 = -num1;
        }
    }
    updateDisplay();
    updateMemoryDisplay();
    if (numBuilder === "-"){
        mainDisplay.textContent = "-" + DEFAULT_DISPLAY;
    }
    else if (numBuilder === ""){
        mainDisplay.textContent = DEFAULT_DISPLAY;
    }
 })




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
    if (numBuilder.length < 10){
        mainDisplay.textContent = Number(numBuilder).toLocaleString();
    }
    else{
        scientificNotation = Number(numBuilder).toExponential()
        mainDisplay.textContent = scientificNotation.length < 10? scientificNotation : Number(scientificNotation).toPrecision(7)
    }
    
}

function updateMemoryDisplay(){
    let memoryDisplayText = ""
    if (num1 != null) {
        memoryDisplayText += num1.toLocaleString() + " "
    }
    if (operator != "") {
        memoryDisplayText += operator + " "
    }
    if (num2 != null) {
        memoryDisplayText += num2.toLocaleString() + " "
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
        if (numBuilder.length < 9){

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
        }
        
    });
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) => {
        //if we already inputted two numbers, evaluate the pair first and store the result in num1
        if (num1 != null && num2 != null){
            numBuilder = operate(num1, num2, operator)
            num1 = numBuilder
            num2 = null;
            updateDisplay();
        }
        //operator buttons do nothing if we did not already enter a number
        if (num1 != null){
            operator = event.target.textContent;
            isCalculated = false;
            numBuilder = ""; //reset the display for num2
            negative = false; //reset the sign state for num2
            updateMemoryDisplay();
        }
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
        //if a number isCalculated, clicking the CE button removes the entire number instead of one digit at a time
        if (numBuilder.length === 0 || isCalculated || numBuilder === "-"){
            num1 = null
            numBuilder = "";
            negative = false;
        }
        else{
            num1 = Number(numBuilder);
        }
    }
    else if (num2 != null){
        if (num2.length === 0 || numBuilder === "-"){
            num2 = null
            numBuilder = ""
        }
        else{
            num2 = Number(numBuilder)
        }
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

 const signBtn = document.querySelector(".sign");
 let negative = false;
 signBtn.addEventListener("click", () => {
    if (!negative){
        numBuilder = "-" + numBuilder;
        negative = true;
    }
    else{
        numBuilder = numBuilder.substring(1, numBuilder.length); //removing the - sign
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

const decimalBtn = document.querySelector(".decimal")
decimalBtn.addEventListener("click", () => {
    // do not want multiple decimal points in a number
    if (!numBuilder.includes(".")){
        if (numBuilder === ""){
            numBuilder = "0."
        }
        else {
            numBuilder += "."
            // if we don't add a number after the decimal point, default it to .0
            if (operator === ""){
                num1 = Number(numBuilder + "0")
            }
            else {
                num2 = Number(numBuilder + "0")
            }
        }
        updateDisplay();
        updateMemoryDisplay();
    }
})


const percentBtn = document.querySelector(".percent")
percentBtn.addEventListener("click", () => {
    if (numBuilder != ""){
        numBuilder = String(Number(numBuilder) / 100)
        console.log(numBuilder)
    }
    if (operator === ""){
        num1 = numBuilder.length > 0? Number(numBuilder) : null;
    }
    else{
        num2 = numBuilder.length > 0? Number(numBuilder) : null;
    }
    updateDisplay();
    updateMemoryDisplay();
    if (mainDisplay.textContent == ""){
        mainDisplay.textContent = DEFAULT_DISPLAY;
    }
})





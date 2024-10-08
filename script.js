function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num2 === 0 ? "Error: Division by 0" : num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '−':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
        default:
            return "Error: Invalid operator";
    }
}

function formatNumber(num) {
    // if the number is very small, but zero, converting it to a String sometimes changes the number to a 0.
    // we handle this case by returning it in scientific notation to avoid this. 
    if (num !== 0 && Math.abs(num) < 0.000001) {
        return num.toExponential();
    }

    if (String(num).length < 10) {
        return num.toLocaleString();
    } else {
        let scientificNotation = num.toExponential();
        return scientificNotation.length < 10 ? scientificNotation : num.toPrecision(7);
    }
}

function updateMainDisplay() {
    if (numBuilder.includes(".") && numBuilder.length < 10) {
        // If numBuilder ends with a decimal point, show it as is without conversion
        mainDisplay.textContent = numBuilder;
    }
    else {
        mainDisplay.textContent = formatNumber(Number(numBuilder));
    }
}


function updateMemoryDisplay() {
    let memoryDisplayText = ""
    if (num1 != null) {
        memoryDisplayText += formatNumber(num1) + " ";
    }
    if (operator != "") {
        memoryDisplayText += operator + " ";
    }
    if (num2 != null) {
        memoryDisplayText += formatNumber(num2) + " ";
    }
    memoryDisplay.textContent = memoryDisplayText;
}

function resetMainDisplayIfEmpty() {
    if (mainDisplay.textContent === "") {
        mainDisplay.textContent = DEFAULT_DISPLAY;
    }
}

function updateDisplays() {
    updateMainDisplay();
    updateMemoryDisplay();
}

function handleDigitPress(digitText) {
    //prevents users from entering numbers greater than 9 digits
    if (numBuilder.length < 9) {
        if (isCalculated) {
            numBuilder = digitText;
            num1 = Number(numBuilder);
            isCalculated = false;
        } else {
            numBuilder += digitText;
            operator === "" ? num1 = Number(numBuilder) : num2 = Number(numBuilder);
        }
        updateDisplays();
    }
}

function handleOperatorPress(operatorText) {
    //if we already inputted two numbers, evaluate the pair first and store the result in num1
    if (num1 != null && num2 != null) {
        num1 = operate(num1, num2, operator);
        numBuilder = String(num1);
        num2 = null;
        updateMainDisplay();
    }
    //operator buttons do nothing if we did not already enter a number
    if (num1 != null) {
        operator = operatorText;
        isCalculated = false;
        //reset the display for num2
        numBuilder = "";
        //reset the sign state for num2
        negative = false;
        updateMemoryDisplay();
    }
}

function handleEqualPress() {
    if (num1 != null && num2 != null) {
        num1 = operate(num1, num2, operator);
        num2 = null;
        numBuilder = String(num1);
        operator = "";
        isCalculated = true;
        updateMainDisplay();
        memoryDisplay.textContent += "=";
    }
}

function handleAllClearPress() {
    num1 = null;
    num2 = null;
    operator = "";
    numBuilder = "";
    isCalculated = false;
    negative = false;
    mainDisplay.textContent = DEFAULT_DISPLAY;
    updateMemoryDisplay();
}

function handleClearEntryPress() {
    numBuilder = numBuilder.slice(0, -1);
    //3 cases: removing a digit off of num1, a digit off of num2, and removing the operator
    if (operator === "") {
        //if a number isCalculated, clicking the CE button removes the entire number instead of one digit at a time
        if (numBuilder.length === 0 || isCalculated || numBuilder === "-") {
            num1 = null;
            numBuilder = "";
            negative = false;
        }
        else {
            num1 = Number(numBuilder);
        }
    }
    else if (num2 != null) {
        if (numBuilder.length === 0 || numBuilder === "-") {
            num2 = null;
            numBuilder = "";
        }
        else {
            num2 = Number(numBuilder);
        }
    }
    else {
        operator = "";
    }

    updateDisplays();
    resetMainDisplayIfEmpty();
}

function handleDecimalPress() {
    // do not want multiple decimal points in a number
    if (!numBuilder.includes(".")) {
        if (numBuilder === "") {
            numBuilder = "0.";
        }
        else if (numBuilder === "-") {
            numBuilder = "-0.";
        }
        else {
            numBuilder += "."
            // if we don't add a number after the decimal point, default it to .0
            if (operator === "") {
                num1 = Number(numBuilder + "0");
            }
            else {
                num2 = Number(numBuilder + "0");
            }
        }
        updateDisplays();
    }
}

function handleSignChangePress() {
    if (!negative) {
        numBuilder = "-" + numBuilder;
        negative = true;
    }
    else {
        //removing the - sign
        numBuilder = numBuilder.substring(1);
        negative = false;
    }
    if (num2 != null) {
        //using num2 * -1 instead of num2 = -num2 because the latter shows as NaN if num2 is a negative number in scientific notation
        num2 = num2 * -1;
    }
    else if (num1 != null) {
        num1 = num1 * -1;

    }
    updateDisplays();
    resetMainDisplayIfEmpty();
    if (numBuilder === "-") {
        mainDisplay.textContent = "-" + DEFAULT_DISPLAY;
    }
}

function handlePercentagePress() {
    if (numBuilder != "") {
        numBuilder = String(Number(numBuilder) / 100);
    }
    if (operator === "") {
        num1 = numBuilder.length > 0 ? Number(numBuilder) : null;
    }
    else {
        num2 = numBuilder.length > 0 ? Number(numBuilder) : null;
    }
    updateDisplays();
    resetMainDisplayIfEmpty();
}

let num1 = null;
let num2 = null;
let operator = "";
let numBuilder = "";

//if true, num1 is the result of a previous calculation and not from user input
let isCalculated = false;

const DEFAULT_DISPLAY = 0;
const mainDisplay = document.querySelector(".display");
const memoryDisplay = document.querySelector(".memory");

const operatorSymbolsMap = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
};

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Backspace":
            handleClearEntryPress();
            break;

        case "+":
        case "-":
        case "*":
        case "/":
            handleOperatorPress(operatorSymbolsMap[event.key]);
            break;
        case "Enter": 13
        case "=":
            handleEqualPress();
            break;
        case ".":
            handleDecimalPress();
            break;
        case "%":
            handlePercentagePress();
            break;
        default:
            if (!isNaN(event.key)) {
                handleDigitPress(event.key);
            }
            break;
    }
})

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener("click", (event) => {
        handleDigitPress(event.target.textContent);
    });
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) => {
        handleOperatorPress(event.target.textContent);
    }
    )
})

const equalsBtn = document.querySelector(".equals")
equalsBtn.addEventListener("click", () => {
    handleEqualPress();
})

const allClearBtn = document.querySelector(".all-clear")
allClearBtn.addEventListener("click", () => {
    handleAllClearPress();
})

const handleClearEntryPressBtn = document.querySelector(".clear-entry")
handleClearEntryPressBtn.addEventListener("click", () => {
    handleClearEntryPress();
})

const signBtn = document.querySelector(".sign");
let negative = false;
signBtn.addEventListener("click", () => {
    handleSignChangePress();
})

const decimalBtn = document.querySelector(".decimal")
decimalBtn.addEventListener("click", () => {
    handleDecimalPress();
})

const percentBtn = document.querySelector(".percent")
percentBtn.addEventListener("click", () => {
    handlePercentagePress();
})

const darkModeBtn = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const calculator = document.querySelector(".calculator");
const buttons = document.querySelectorAll("button");
darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    calculator.classList.toggle("dark-mode");
    buttons.forEach((btn) => {
        btn.classList.toggle("dark-mode");
    })
    mainDisplay.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        darkModeBtn.src = "images/lightModeIcon.svg";
        darkModeBtn.alt = "Light Mode Icon";
    }
    else {
        darkModeBtn.src = "images/darkModeIcon.svg";
        darkModeBtn.alt = "Dark Mode Icon";
    }
})



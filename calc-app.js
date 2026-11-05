// ==========================================================================
// Assignment 5.2: Interactive Grid Calculator Computation Engine
// ==========================================================================

const displayElement = document.getElementById("calc-display");
let currentExpressionString = "";
let clearOnNextInput = false;

// Append individual digit values onto the display track layout
function appendNumber(number) {
    if (clearOnNextInput) {
        currentExpressionString = "";
        clearOnNextInput = false;
    }
    
    // Prevent starting with multiple structural zeroes
    if (currentExpressionString === "0" && number === "0") return;
    if (currentExpressionString === "0") currentExpressionString = "";

    currentExpressionString += number;
    updateDisplay();
}

// Append operational evaluation character blocks cleanly
function appendOperator(operator) {
    if (currentExpressionString === "") {
        // Allow starting equations with a negative calculation flag symbol
        if (operator === "-") {
            currentExpressionString = "-";
            updateDisplay();
        }
        return;
    }

    // Intercept back-to-back operational typos to swap symbols dynamically
    const lastChar = currentExpressionString.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        currentExpressionString = currentExpressionString.slice(0, -1) + operator;
    } else {
        currentExpressionString += operator;
    }
    
    clearOnNextInput = false;
    updateDisplay();
}

// Handle decimal inclusion rules correctly to block double decimal errors
function appendDecimal(dot) {
    if (clearOnNextInput) {
        currentExpressionString = "0";
        clearOnNextInput = false;
    }

    // Split expression by mathematical characters to safely inspect the current working number slot
    const numericParts = currentExpressionString.split(/[\+\-\*\/]/);
    const activeWorkingSegment = numericParts[numericParts.length - 1];

    if (activeWorkingSegment.includes(".")) return; // Ignore repeat decimal inputs
    if (currentExpressionString === "" || ["+", "-", "*", "/"].includes(currentExpressionString.slice(-1))) {
        currentExpressionString += "0.";
    } else {
        currentExpressionString += dot;
    }
    updateDisplay();
}

// Global interface clear reset block layout function
function clearDisplay() {
    currentExpressionString = "";
    displayElement.value = "0";
    clearOnNextInput = false;
}

// Read display view updates out safely
function updateDisplay() {
    displayElement.value = currentExpressionString === "" ? "0" : currentExpressionString;
}

// Core parsing evaluation math machine logic
function calculateResult() {
    if (currentExpressionString === "") return;

    try {
        // Trailing evaluation protection checks
        const lastChar = currentExpressionString.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
            currentExpressionString = currentExpressionString.slice(0, -1);
        }

        // Catch explicitly written attempts to divide numbers by zero
        if (/\/0(?![.0-9])/.test(currentExpressionString)) {
            displayElement.value = "Error: Div by 0";
            currentExpressionString = "";
            clearOnNextInput = true;
            return;
        }

        // Safely process structural numeric equation matrices using the Function constructor fallback mechanism
        let evaluatedTotal = new Function(`return (${currentExpressionString})`)();

        // Standard floating point rounding logic to hold layout constraints
        if (evaluatedTotal % 1 !== 0) {
            evaluatedTotal = Math.round(evaluatedTotal * 100000) / 100000;
        }

        displayElement.value = evaluatedTotal;
        currentExpressionString = String(evaluatedTotal);
        clearOnNextInput = true;

    } catch (syntaxError) {
        displayElement.value = "Calculation Error";
        currentExpressionString = "";
        clearOnNextInput = true;
    }
}

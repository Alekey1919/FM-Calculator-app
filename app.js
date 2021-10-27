// THEMES

const switchOne = document.getElementById("switch-one");
const switchTwo = document.getElementById("switch-two");
const switchThree = document.getElementById("switch-three");

const main = document.querySelector("main");

switchOne.addEventListener("click", () => {
  main.classList.remove("second");
  main.classList.remove("third");
});

switchTwo.addEventListener("click", () => {
  main.classList.add("second");
  main.classList.remove("third");
});

switchThree.addEventListener("click", () => {
  main.classList.add("third");
  main.classList.remove("second");
});

// Calculator

class Calculator {
  constructor(previousScreen, currentScreen) {
    this.previousScreen = previousScreen;
    this.currentScreen = currentScreen;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentScreen.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousScreen.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousScreen.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");

const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const equalsButton = document.querySelector("[data-equals]");

const previousScreen = document.querySelector("[data-previous-operand]");
const currentScreen = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousScreen, currentScreen);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 48:
      calculator.appendNumber("0");
      break;
    case 96:
      calculator.appendNumber("0");
      break;
    case 49:
      calculator.appendNumber("1");
      break;
    case 97:
      calculator.appendNumber("1");
      break;
    case 50:
      calculator.appendNumber("2");
      break;
    case 98:
      calculator.appendNumber("2");
      break;
    case 51:
      calculator.appendNumber("3");
      break;
    case 99:
      calculator.appendNumber("3");
      break;
    case 52:
      calculator.appendNumber("4");
      break;
    case 100:
      calculator.appendNumber("4");
      break;
    case 53:
      calculator.appendNumber("5");
      break;
    case 101:
      calculator.appendNumber("5");
      break;
    case 54:
      calculator.appendNumber("6");
      break;
    case 102:
      calculator.appendNumber("6");
      break;
    case 55:
      calculator.appendNumber("7");
      break;
    case 103:
      calculator.appendNumber("7");
      break;
    case 56:
      calculator.appendNumber("8");
      break;
    case 104:
      calculator.appendNumber("8");
      break;
    case 57:
      calculator.appendNumber("9");
      break;
    case 105:
      calculator.appendNumber("9");
      break;
    case 110:
      calculator.appendNumber(".");
      break;
    case 190:
      calculator.appendNumber(".");
      break;
    case 46:
      calculator.clear();
      break;
    case 8:
      calculator.delete();
      break;
    case 107:
      calculator.chooseOperation("+");
      break;
    case 109:
      calculator.chooseOperation("-");
      break;
    case 111:
      calculator.chooseOperation("/");
      break;
    case 106:
      calculator.chooseOperation("*");
      break;
    case 13:
      calculator.compute();
      break;
    default:
      return;
  }
  calculator.updateDisplay();
});

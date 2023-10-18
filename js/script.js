class Calculator {

  constructor() {
    this.upperValue = document.querySelector('#upper-number');
    this.resultValue = document.querySelector('#result-number');
    this.reset = 0;
  }

  clearValues() {
    this.upperValue.textContent = '0';
    this.resultValue.textContent = '0';
  }

  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2)
  }
  
  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2)
  }
  
  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2)
  }
  
  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2)
  }
  
  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }

  checkLastDigit(input, upperValue, reg) {
    if((
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    )) {
      return true;
    } else {
      return false;
    }
  }

  resolution() {
  
    let upperValueArr = (this.upperValue.textContent).split(" ");
    let result = 0;

    for(let i = 0; i <= upperValueArr.length; i++) {

      let operation = 0;
      let actualItem = upperValueArr[i];

      if(actualItem == "x") {
        result = calc.multiplication(upperValueArr[i - 1], upperValueArr[i + 1]);
        operation = 1;
      } else if(actualItem == "/") {
        result = calc.division(upperValueArr[i - 1], upperValueArr[i + 1]);
        operation = 1;
      } else if(!upperValueArr.includes('x') && !upperValueArr.includes('/')) {
        if(actualItem == "+") {
          result = calc.sum(upperValueArr[i - 1], upperValueArr[i + 1]);
          operation = 1;
        } else if(actualItem == "-") {
          result = calc.subtraction(upperValueArr[i - 1], upperValueArr[i + 1]);
          operation = 1;
        }
      }

      if(operation) {
        upperValueArr[i - 1] = result;
        upperValueArr.splice(i, 2);
        i = 0;
      }

    }

    if(result) {
      calc.reset = 1;
    }

    calc.refreshValues(result);

  }

  btnClick() {
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;
    var reg = new RegExp('^\\d+$');

    if(calc.reset && reg.test(input)) {
      upperValue = '0';
    }

    calc.reset = 0;

    if(input == 'AC') {

      calc.clearValues();

    } else if(input == "=") {

      calc.resolution();

    } else {

      if(calc.checkLastDigit(input, upperValue, reg)) {
        return false;
      }

      if(!reg.test(input)) {
        input = ` ${input} `;
      }

      if(upperValue == "0") {
        if(reg.test(input)) {
          calc.upperValue.textContent = input;
        }
      } else {
        calc.upperValue.textContent += input;
      }

    }

  }

}

let calc = new Calculator;

let buttons = document.querySelectorAll('.btn');

for(let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener('click', calc.btnClick);
}
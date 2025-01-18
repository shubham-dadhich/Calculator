var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");
var display_Min = document.getElementById("display-min");
// display.textContent = 0;
var operand1 = 0;
var operand2 = null;
var operator = null;
var isEqualClicked = false;

function isOperator(value) {
    return value == "+" || value == "-" || value == "*" || value == "/";
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {

        var value = this.getAttribute('data-value');
        var text = display.textContent.trim();

        if (isEqualClicked) {
            display.textContent = "";
            display_Min.textContent = "";
            isEqualClicked = false;
        }

        if (isOperator(value)) {
            operator = value;
            operand1 = parseFloat(text);
            display_Min.textContent = operand1 + ' ' + operator;
            display.textContent = "";
        } else if (value == "ac") {
            display_Min.textContent = "0";
            display.textContent = "0";
        } /*else if (value == "sign") {
            operand1 = parseFloat(text);
            operand1 = -1 * operand1;
            display.textContent = operand1;
        } */ else if (value == "x") {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1)
        } else if (value == ".") {
            if (text.length && !text.includes('.')) {
                display.textContent = text + '.';
            }
        } else if (value == "%") {
            operand1 = parseFloat(text);
            operand1 = operand1 / 100;
            display.textContent = operand1
        } else if (value == "=") {
            operand2 = parseFloat(text);
            if (display_Min.textContent == "0")
                display_Min.textContent = operand2;
            else
                if (isOperator(display_Min.textContent.substring(display_Min.textContent.length - 1, display_Min.textContent.length)))
                    display_Min.textContent = display_Min.textContent + ' ' + operand2;
                else
                    display_Min.textContent = operand2;
            var result = eval(operand1 + ' ' + operator + ' ' + operand2);
            if (result) {
                display.textContent = result;
                operand1 = result;
                operand2 = null;
                operator = null;
                isEqualClicked = true;
            }
        } else {
            if (display.textContent == "0")
                display.textContent = value;
            else
                if (display.textContent.length >= 12)
                    display.textContent = display.textContent.substring(1, display.textContent.length) + value;
                else
                    display.textContent += value;
        }
    });
}
document.addEventListener('keydown', function (event) {
    value = event.key;
    text = display.textContent.trim();

    if (isEqualClicked) {
        display.textContent = "";
        display_Min.textContent = "";
        isEqualClicked = false;
    }

    if (value == "Backspace") {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1)
    }
    else if (isOperator(value)) {
        operator = value;
        operand1 = parseFloat(text);
        display_Min.textContent = operand1 + ' ' + operator;
        display.textContent = "";
    } else if (value == "Escape") {
        display_Min.textContent = "0";
        display.textContent = "0";
    } else if (value == "sign") {
        operand1 = parseFloat(text);
        operand1 = -1 * operand1;
        display.textContent = operand1;
    } else if (value == ".") {
        if (text.length && !text.includes('.')) {
            display.textContent = text + '.';
        }
    } else if (value == "%") {
        operand1 = parseFloat(text);
        operand1 = operand1 / 100;
        display.textContent = operand1
    } else if (value == "=" || value == "Enter") {
        operand2 = parseFloat(text);
        if (display_Min.textContent == "0")
            display_Min.textContent = operand2;
        else
            if (isOperator(display_Min.textContent.substring(display_Min.textContent.length - 1, display_Min.textContent.length)))
                display_Min.textContent = display_Min.textContent + ' ' + operand2;
            else
                display_Min.textContent = operand2;
        var result = eval(operand1 + ' ' + operator + ' ' + operand2);
        if (result) {
            display.textContent = result;
            operand1 = result;
            operand2 = null;
            operator = null;
            isEqualClicked = true;
        }
    } else if (value >= "0" && value <= "9") {
        if (display.textContent == "0")
            display.textContent = value;
        else {
            if (display.textContent.length >= 12)
                display.textContent = display.textContent.substring(1, display.textContent.length) + value;
            else
                display.textContent += value;
        }
    }
});

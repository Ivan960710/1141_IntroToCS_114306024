// 114306024_JS2_HW8.js

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const op = document.getElementById("op");
const calcBtn = document.getElementById("calcBtn");
const msg = document.getElementById("msg");
const resultBox = document.getElementById("result");

// 四則運算函式
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return null;   // division-by-zero
    return a / b;
}

// 主計算函式
function calculate() {
    msg.textContent = ""; // 清空錯誤訊息

    const v1 = num1.value.trim();
    const v2 = num2.value.trim();

    if (v1 === "" || v2 === "") {
        msg.textContent = "兩個數字都必須輸入！";
        resultBox.textContent = "—";
        return;
    }

    const a = Number(v1);
    const b = Number(v2);

    if (isNaN(a) || isNaN(b)) {
        msg.textContent = "請輸入有效數字！";
        resultBox.textContent = "—";
        return;
    }

    let r;

    switch (op.value) {
        case "+":
            r = add(a, b);
            break;
        case "-":
            r = subtract(a, b);
            break;
        case "*":
            r = multiply(a, b);
            break;
        case "/":
            r = divide(a, b);
            if (r === null) {
                msg.textContent = "不能除以 0！";
                resultBox.textContent = "—";
                return;
            }
            break;
    }

    // 四捨五入到小數點兩位
    resultBox.textContent = r.toFixed(2);
}

calcBtn.addEventListener("click", calculate);

// Enter 也能計算
[num1, num2].forEach(el => {
    el.addEventListener("keydown", e => {
        if (e.key === "Enter") calculate();
    });
});

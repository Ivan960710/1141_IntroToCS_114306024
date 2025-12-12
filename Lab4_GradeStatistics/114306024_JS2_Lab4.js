/// 114306024_JS2_Lab4.js

const mathInput = document.getElementById("mathInput");
const engInput = document.getElementById("engInput");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const msg = document.getElementById("msg");

const gradesTable = document.getElementById("gradesTable");
const tbody = gradesTable.querySelector("tbody");
const mathColAvgCell = document.getElementById("mathColAvg");
const engColAvgCell = document.getElementById("engColAvg");
const overallAvgCell = document.getElementById("overallAvg");

let rowCount = 0;

function fmt(num) {
  if (isNaN(num)) return "—";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function updateColumnAverages() {
  const rows = tbody.querySelectorAll("tr");
  if (rows.length === 0) {
    mathColAvgCell.textContent = "—";
    engColAvgCell.textContent = "—";
    overallAvgCell.textContent = "—";
    return;
  }

  let mathSum = 0;
  let engSum = 0;
  let rowAvgSum = 0;

  rows.forEach((tr) => {
    const math = parseFloat(tr.dataset.math);
    const eng = parseFloat(tr.dataset.eng);
    const avg = (math + eng) / 2;

    mathSum += math;
    engSum += eng;
    rowAvgSum += avg;
  });

  const n = rows.length;
  mathColAvgCell.textContent = fmt(mathSum / n);
  engColAvgCell.textContent = fmt(engSum / n);
  overallAvgCell.textContent = fmt(rowAvgSum / n);
}

function addRow(mathVal, engVal) {
  rowCount += 1;

  const tr = document.createElement("tr");
  tr.dataset.math = mathVal;
  tr.dataset.eng = engVal;

  const tdIndex = document.createElement("td");
  tdIndex.textContent = rowCount;

  const tdMath = document.createElement("td");
  tdMath.className = "number";
  tdMath.textContent = fmt(mathVal);

  const tdEng = document.createElement("td");
  tdEng.className = "number";
  tdEng.textContent = fmt(engVal);

  const rowAvg = (Number(mathVal) + Number(engVal)) / 2;
  const tdAvg = document.createElement("td");
  tdAvg.className = "number";
  tdAvg.textContent = fmt(rowAvg);

  tr.appendChild(tdIndex);
  tr.appendChild(tdMath);
  tr.appendChild(tdEng);
  tr.appendChild(tdAvg);

  tbody.appendChild(tr);

  updateColumnAverages();
}

function validateInputs(mathStr, engStr) {
  if (mathStr === "" || engStr === "") {
    return { ok: false, reason: "Math 或 English 不可空白。" };
  }
  const math = Number(mathStr);
  const eng = Number(engStr);

  if (isNaN(math) || isNaN(eng)) {
    return { ok: false, reason: "請輸入有效的數字。" };
  }
  if (math < 0 || math > 100 || eng < 0 || eng > 100) {
    return { ok: false, reason: "分數需介於 0～100。" };
  }
  return { ok: true, math, eng };
}

submitBtn.addEventListener("click", function () {
  msg.textContent = "";
  const vMath = mathInput.value.trim();
  const vEng = engInput.value.trim();

  const check = validateInputs(vMath, vEng);
  if (!check.ok) {
    msg.textContent = check.reason;
    msg.style.color = "red";
    return;
  }

  addRow(check.math, check.eng);

  mathInput.value = "";
  engInput.value = "";
  mathInput.focus();

  msg.textContent = "新增成功！";
  msg.style.color = "green";
});

[mathInput, engInput].forEach((el) =>
  el.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitBtn.click();
  })
);

clearBtn.addEventListener("click", function () {
  tbody.innerHTML = "";
  rowCount = 0;
  updateColumnAverages();
  msg.textContent = "資料已清除。";
  msg.style.color = "#666";
});

updateColumnAverages();

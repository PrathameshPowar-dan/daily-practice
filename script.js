// ---------- TAB SWITCH ----------
function showTab(tab) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tabs button").forEach(el => el.classList.remove("active"));

    document.getElementById(tab).classList.add("active");
    event.target.classList.add("active");
}

// ---------- MCQ DATA ----------
const mcqData = [
    {
        question: "Which is NOT a falsy value in JS?",
        options: ["0", "null", "{}", "undefined"],
        answer: 2
    },
    {
        question: "Which method converts JSON string to object?",
        options: ["JSON.parse()", "JSON.stringify()", "toObject()", "parseJSON()"],
        answer: 0
    }
];

// ---------- RENDER MCQ ----------
const mcqContainer = document.getElementById("mcq-container");

mcqData.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
    <p>${i + 1}. ${q.question}</p>
    ${q.options.map((opt, idx) => `
      <label>
        <input type="radio" name="q${i}" value="${idx}"/> ${opt}
      </label><br/>
    `).join("")}
  `;

    mcqContainer.appendChild(div);
});

// ---------- MCQ SUBMIT ----------
function submitMCQ() {
    let score = 0;

    mcqData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && Number(selected.value) === q.answer) {
            score++;
        }
    });

    document.getElementById("mcq-result").innerText =
        `Score: ${score}/${mcqData.length}`;
}

// ---------- CODING DATA ----------
const codingData = [
    {
        title: "Mirror String",
        description: "Append reversed string to original",
        answer: "return str + str.split('').reverse().join('')"
    },
    {
        title: "Even Unique Numbers",
        description: "Return unique even numbers from array",
        answer: "[...new Set(arr.filter(n => n % 2 === 0))]"
    }
];

// ---------- RENDER CODING ----------
const codingContainer = document.getElementById("coding-container");

codingData.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
    <h3>${q.title}</h3>
    <p>${q.description}</p>
    <textarea id="code${i}" placeholder="Write your code..."></textarea>
    <button onclick="checkCode(${i})">Check</button>
    <p id="result${i}" class="result"></p>
  `;

    codingContainer.appendChild(div);
});

// ---------- CHECK CODE ----------
function checkCode(i) {
    const userCode = document.getElementById(`code${i}`).value
        .replace(/\s/g, '');

    const correct = codingData[i].answer.replace(/\s/g, '');

    const result = document.getElementById(`result${i}`);

    if (userCode.includes(correct)) {
        result.innerText = "✅ Correct";
        result.style.color = "lightgreen";
    } else {
        result.innerText = "❌ Try Again";
        result.style.color = "red";
    }
}
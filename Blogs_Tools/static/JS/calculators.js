document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 🔧 Utility Functions ---------- */

  const getValue = (id) => parseFloat(document.getElementById(id).value) || 0;
  const getInt = (id) => parseInt(document.getElementById(id).value) || 0;
  const setText = (id, text) => (document.getElementById(id).textContent = text);

  /* ---------- 💰 Loan Calculator ---------- */
  function calculateLoan() {
    const amount = getValue("loanAmount");
    const monthlyRate = getValue("loanInterest") / 100 / 12;
    const years = getInt("loanYears");
    const totalPayments = years * 12;

    const x = Math.pow(1 + monthlyRate, totalPayments);
    const monthly = (amount * x * monthlyRate) / (x - 1);

    setText("loanResult", Monthly Payment: ₹${monthly.toFixed(2)});
  }

  /* ---------- 📈 Investment Calculator ---------- */
  function calculateInvestment() {
    const principal = getValue("initialInvestment");
    const annualAddition = getValue("annualAddition");
    const rate = getValue("investmentRate") / 100;
    const years = getInt("investmentYears");

    let futureValue = principal * Math.pow(1 + rate, years);

    for (let i = 1; i <= years; i++) {
      futureValue += annualAddition * Math.pow(1 + rate, years - i);
    }

    setText("investmentResult", Future Value: ₹${futureValue.toFixed(2)});
  }

  /* ---------- 🏦 Savings Calculator ---------- */
  function calculateSavings() {
    let total = getValue("initialAmount");
    const monthlyDeposit = getValue("monthlyDeposit");
    const monthlyRate = getValue("interestRate") / 100 / 12;
    const months = getInt("years") * 12;

    for (let i = 0; i < months; i++) {
      total += monthlyDeposit;
      total += total * monthlyRate;
    }

    setText("savingsResult", Total Savings: ₹${total.toFixed(2)});
  }

  /* ---------- 🧾 Expense Tracker ---------- */
  function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = getValue("expenseAmount");
    if (!name || amount <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }

    const entry = document.createElement("li");
    entry.textContent = ${name}: ₹${amount.toFixed(2)};
    document.getElementById("expenseList").appendChild(entry);

    const total =
      parseFloat(document.getElementById("totalExpenses").textContent) || 0;
    setText("totalExpenses", (total + amount).toFixed(2));
    updateRemainingBudget();
  }

  function updateRemainingBudget() {
    const income = getValue("monthlyIncome");
    const expenses = parseFloat(
      document.getElementById("totalExpenses").textContent
    ) || 0;

    setText("remainingBudget", (income - expenses).toFixed(2));
  }

  /* ---------- 🧮 Tax Estimator ---------- */
  function calculateTax() {
    const inputs = [
      "incomeSalary",
      "incomeHouseProperty",
      "incomeCapitalGains",
      "incomeBusiness",
      "incomeOtherSources",
    ];
    const deductions = [
      "deduction80C",
      "deduction80D",
      "deductionHRA",
      "deductionInterestLoan",
      "deductionProfessionalTax",
    ];

    const age = getInt("age");
    const totalIncome = inputs.reduce((sum, id) => sum + getValue(id), 0);
    let totalDeductions = deductions.reduce((sum, id) => sum + getValue(id), 0);

    // Senior citizen bonus deduction
    if (age >= 60) totalDeductions += 50000;

    let taxableIncome = totalIncome - totalDeductions;

    const taxSlabs = [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 0.05 },
      { min: 500001, max: 1000000, rate: 0.2 },
      // Extend slabs as needed
    ];

    let taxAmount = 0;
    for (const { min, max, rate } of taxSlabs) {
      if (taxableIncome > max) {
        taxAmount += (max - min) * rate;
      } else {
        taxAmount += Math.max(taxableIncome - min, 0) * rate;
        break;
      }
    }

    setText("taxLiability", Tax Payable: ₹${taxAmount.toFixed(2)});
  }

  /* ---------- 🧠 Calculator View Manager ---------- */
  const calculators = document.querySelectorAll(".calculator");
  const buttons = document.querySelectorAll(".button-grid button");

  function showCalculator(targetId) {
    calculators.forEach((calc) =>
      calc.id === targetId
        ? calc.classList.remove("hidden")
        : calc.classList.add("hidden")
    );

    buttons.forEach((btn) => {
      const match = btn.getAttribute("onclick")?.match(/'([^']+)'/);
      const target = match ? match[1] : null;
      btn.style.display = target === targetId ? "none" : "inline-block";
    });
  }

  /* ---------- 🎛 Event Listeners ---------- */
  document.getElementById("cLoan").addEventListener("click", calculateLoan);
  document.getElementById("cInvestment").addEventListener("click", calculateInvestment);
  document.getElementById("cSavings").addEventListener("click", calculateSavings);
  document.getElementById("addExpenseButton").addEventListener("click", addExpense);
  document.getElementById("calculateTaxButton").addEventListener("click", calculateTax);

  // Handle calculator selection buttons
  document.querySelectorAll(".calc-selector").forEach((btn) => {
    btn.addEventListener("click", () => showCalculator(btn.dataset.type));
  });

  // Handle initial hash-based navigation (e.g., #loanCalculator)
  const hash = window.location.hash.replace("#", "");
  if (hash) showCalculator(hash);
});

/* ---------- 🏠 Mortgage Calculator ---------- */
function calculateMortgage() {
  const principal = getValue("mortgageAmount");
  const annualRate = getValue("mortgageRate") / 100;
  const years = getInt("mortgageYears");

  const monthlyRate = annualRate / 12;
  const totalPayments = years * 12;

  if (principal <= 0 || annualRate <= 0 || years <= 0) {
    alert("Please enter valid mortgage details.");
    return;
  }

  const x = Math.pow(1 + monthlyRate, totalPayments);
  const monthlyPayment = (principal * x * monthlyRate) / (x - 1);
  const totalPayment = monthlyPayment * totalPayments;
  const totalInterest = totalPayment - principal;

  setText("mortgageResult", `
    Monthly Payment: ₹${monthlyPayment.toFixed(2)}  
    | Total Payment: ₹${totalPayment.toFixed(2)}  
    | Total Interest: ₹${totalInterest.toFixed(2)}
  `);
}

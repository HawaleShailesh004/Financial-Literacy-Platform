document.addEventListener("DOMContentLoaded", function () {
  // ✅ Loan Calculator
  function calculateLoan() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const interest = parseFloat(document.getElementById("loanInterest").value) / 100 / 12;
    const years = parseInt(document.getElementById("loanYears").value);
    const payments = years * 12;
    const x = Math.pow(1 + interest, payments);
    const monthly = (amount * x * interest) / (x - 1);
    document.getElementById("loanResult").textContent = `Monthly Payment: ₹${monthly.toFixed(2)}`;
  }

  // ✅ Investment Calculator
  function calculateInvestment() {
    const principal = parseFloat(document.getElementById("initialInvestment").value);
    const annualAdd = parseFloat(document.getElementById("annualAddition").value);
    const rate = parseFloat(document.getElementById("investmentRate").value) / 100;
    const years = parseInt(document.getElementById("investmentYears").value);
    let futureValue = principal * Math.pow(1 + rate, years);
    for (let i = 1; i <= years; i++) {
      futureValue += annualAdd * Math.pow(1 + rate, years - i);
    }
    document.getElementById("investmentResult").textContent = `Future Value: ₹${futureValue.toFixed(2)}`;
  }

  // ✅ Savings Calculator
  function calculateSavings() {
    let initialAmount = parseFloat(document.getElementById("initialAmount").value);
    let monthlyDeposit = parseFloat(document.getElementById("monthlyDeposit").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let years = parseInt(document.getElementById("years").value);
    let totalAmount = initialAmount;
    let monthlyInterestRate = interestRate / 100 / 12;
    for (let i = 0; i < years * 12; i++) {
      totalAmount += monthlyDeposit;
      totalAmount += totalAmount * monthlyInterestRate;
    }
    document.getElementById("savingsResult").textContent = `Total Savings: ₹${totalAmount.toFixed(2)}`;
  }

  // ✅ Budget Planner
  function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }
    const list = document.getElementById("expenseList");
    const entry = document.createElement("li");
    entry.textContent = `${name}: ₹${amount}`;
    list.appendChild(entry);

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    const total = parseFloat(document.getElementById("totalExpenses").textContent) || 0;
    document.getElementById("totalExpenses").textContent = (total + amount).toFixed(2);
    updateRemainingBudget();
  }

  function updateRemainingBudget() {
    const income = parseFloat(document.getElementById("monthlyIncome").value) || 0;
    const expenses = parseFloat(document.getElementById("totalExpenses").textContent) || 0;
    document.getElementById("remainingBudget").textContent = (income - expenses).toFixed(2);
  }

  // ✅ Tax Estimator
  function calculateTax() {
    const get = (id) => parseFloat(document.getElementById(id).value) || 0;
    const age = parseInt(document.getElementById("age").value);
    const totalIncome =
      get("incomeSalary") + get("incomeHouseProperty") + get("incomeCapitalGains") +
      get("incomeBusiness") + get("incomeOtherSources");
    let totalDeductions =
      get("deduction80C") + get("deduction80D") + get("deductionHRA") +
      get("deductionInterestLoan") + get("deductionProfessionalTax");
    if (age >= 60) totalDeductions += 50000;
    let taxableIncome = totalIncome - totalDeductions;
    const slabs = [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 0.05 },
      { min: 500001, max: 1000000, rate: 0.2 },
      { min: 1000001, max: Infinity, rate: 0.3 },
    ];
    let tax = 0;
    for (const s of slabs) {
      if (taxableIncome > s.max) {
        tax += (s.max - s.min) * s.rate;
        taxableIncome -= s.max - s.min;
      } else {
        tax += taxableIncome * s.rate;
        break;
      }
    }
    document.getElementById("taxLiability").textContent = tax.toFixed(2);
  }

  // ✅ Mortgage Calculator
  function calculateMortgage() {
    const p = parseFloat(document.getElementById("mortgageAmount").value);
    const r = parseFloat(document.getElementById("mortgageInterest").value) / 100 / 12;
    const y = parseInt(document.getElementById("mortgageYears").value);
    const tax = parseFloat(document.getElementById("propertyTax").value) || 0;
    const ins = parseFloat(document.getElementById("insurance").value) || 0;
    const n = y * 12;
    const x = Math.pow(1 + r, n);
    const monthly = (p * x * r) / (x - 1) + tax / 12 + ins / 12;
    document.getElementById("mortgageResult").textContent =
      `Total Monthly Payment: ₹${monthly.toFixed(2)} (incl. tax & insurance)`;
  }

  // ✅ Retirement Calculator
  function calculateRetirement() {
    const currentAge = parseInt(document.getElementById("currentAge").value);
    const retirementAge = parseInt(document.getElementById("retirementAge").value);
    const currentSavings = parseFloat(document.getElementById("currentSavings").value);
    const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value);
    const annualReturn = parseFloat(document.getElementById("annualReturn").value) / 100;
    const months = (retirementAge - currentAge) * 12;
    const monthlyRate = annualReturn / 12;
    let fv = currentSavings * Math.pow(1 + monthlyRate, months);
    for (let i = 0; i < months; i++) fv += monthlyContribution * Math.pow(1 + monthlyRate, months - i);
    document.getElementById("retirementResult").textContent = `Estimated Retirement Savings: ₹${fv.toFixed(2)}`;
  }

  // ✅ Event Listeners
  document.getElementById("cSavings")?.addEventListener("click", calculateSavings);
  document.getElementById("cLoan")?.addEventListener("click", calculateLoan);
  document.getElementById("cInvestment")?.addEventListener("click", calculateInvestment);
  document.getElementById("addExpenseButton")?.addEventListener("click", addExpense);
  document.getElementById("calculateTaxButton")?.addEventListener("click", calculateTax);
  document.getElementById("cMortgage")?.addEventListener("click", calculateMortgage);
  document.getElementById("cRetirement")?.addEventListener("click", calculateRetirement);
});

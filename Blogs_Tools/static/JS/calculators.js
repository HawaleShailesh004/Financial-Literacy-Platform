document.addEventListener("DOMContentLoaded", function () {
  function calculateLoan() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const interest =
      parseFloat(document.getElementById("loanInterest").value) / 100 / 12;
    const years = parseInt(document.getElementById("loanYears").value);
    const payments = years * 12;
    const x = Math.pow(1 + interest, payments);
    const monthly = (amount * x * interest) / (x - 1);

    document.getElementById(
      "loanResult"
    ).textContent = `Monthly Payment: ${monthly.toFixed(2)}`;
  }

  function calculateInvestment() {
    const principal = parseFloat(
      document.getElementById("initialInvestment").value
    );
    const annualAdd = parseFloat(
      document.getElementById("annualAddition").value
    );
    const rate =
      parseFloat(document.getElementById("investmentRate").value) / 100;
    const years = parseInt(document.getElementById("investmentYears").value);
    let futureValue = principal * Math.pow(1 + rate, years);

    for (let i = 1; i <= years; i++) {
      futureValue += annualAdd * Math.pow(1 + rate, years - i);
    }

    document.getElementById(
      "investmentResult"
    ).textContent = `Future Value: ₹{futureValue.toFixed(2)}`;
  }

  function calculateSavings() {
    let initialAmount = parseFloat(
      document.getElementById("initialAmount").value
    );
    let monthlyDeposit = parseFloat(
      document.getElementById("monthlyDeposit").value
    );
    let interestRate = parseFloat(
      document.getElementById("interestRate").value
    );
    let years = parseInt(document.getElementById("years").value);

    let totalAmount = initialAmount;
    let monthlyInterestRate = interestRate / 100 / 12;

    for (let i = 0; i < years * 12; i++) {
      totalAmount += monthlyDeposit;
      totalAmount += totalAmount * monthlyInterestRate;
    }

    document.getElementById("savingsResult").textContent =
      "Total Savings: $" + totalAmount.toFixed(2);
  }

  function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }
    const list = document.getElementById("expenseList");
    const entry = document.createElement("li");
    entry.appendChild(document.createTextNode(name + ": $" + amount));
    list.appendChild(entry);

    const total =
      parseFloat(document.getElementById("totalExpenses").textContent) || 0;
    document.getElementById("totalExpenses").textContent = (
      total + amount
    ).toFixed(2);
    updateRemainingBudget();
  }

  function updateRemainingBudget() {
    const income =
      parseFloat(document.getElementById("monthlyIncome").value) || 0;
    const expenses =
      parseFloat(document.getElementById("totalExpenses").textContent) || 0;
    document.getElementById("remainingBudget").textContent = (
      income - expenses
    ).toFixed(2);
  }

  // Tax Estimator Functions
  function calculateTax() {
    // Input Values (Replace with your actual values)
    const age = parseInt(document.getElementById("age").value);
    const incomeSalary = parseFloat(
      document.getElementById("incomeSalary").value
    );
    const incomeHouseProperty = parseFloat(
      document.getElementById("incomeHouseProperty").value
    );
    const incomeCapitalGains = parseFloat(
      document.getElementById("incomeCapitalGains").value
    );
    const incomeBusiness = parseFloat(
      document.getElementById("incomeBusiness").value
    );
    const incomeOtherSources = parseFloat(
      document.getElementById("incomeOtherSources").value
    );

    const deduction80C = parseFloat(
      document.getElementById("deduction80C").value
    );
    const deduction80D = parseFloat(
      document.getElementById("deduction80D").value
    );
    const deductionHRA = parseFloat(
      document.getElementById("deductionHRA").value
    );
    const deductionInterestLoan = parseFloat(
      document.getElementById("deductionInterestLoan").value
    );
    const deductionProfessionalTax = parseFloat(
      document.getElementById("deductionProfessionalTax").value
    );

    // Calculation Steps

    // 1. Calculate Total Income
    let totalIncome =
      incomeSalary +
      incomeHouseProperty +
      incomeCapitalGains +
      incomeBusiness +
      incomeOtherSources;

    // 2. Calculate Total Deductions
    let totalDeductions =
      deduction80C +
      deduction80D +
      deductionHRA +
      deductionInterestLoan +
      deductionProfessionalTax;

    // 3. Consider Senior Citizen Benefits (placeholder logic, replace with actual rules)
    if (age >= 60) {
      totalDeductions += 50000; // Add additional deduction for senior citizens (replace with actual benefit)
    }

    // 4. Calculate Taxable Income
    let taxableIncome = totalIncome - totalDeductions;

    // 5. Replace with Actual Tax Slabs and Rates for FY 24-25 (placeholder values)
    const taxSlabs = [
      { min: 0, max: 250000, rate: 0 }, // No tax up to Rs. 2,50,000
      { min: 250001, max: 500000, rate: 0.05 }, // 5% tax on income between Rs. 2,50,001 and Rs. 5,00,000
      { min: 500001, max: 1000000, rate: 0.2 }, // 20% tax on income exceeding Rs. 5,00,000
      // Add more slabs as needed for higher income brackets
    ];

    // 6. Calculate Tax Amount
    let taxAmount = 0;
    for (const slab of taxSlabs) {
      if (taxableIncome > slab.max) {
        taxAmount += (slab.max - slab.min) * slab.rate;
        taxableIncome -= slab.max - slab.min;
      } else {
        taxAmount += taxableIncome * slab.rate;
        break;
      }
    }

    // 7. Display Tax Liability
    const resultDiv = document.getElementById("taxLiability");
    resultDiv.textContent = taxAmount.toFixed(2);
  }

  // Add event listeners for buttons
  document
    .getElementById("cSavings")
    .addEventListener("click", calculateSavings);
  document.getElementById("cLoan").addEventListener("click", calculateLoan);
  document
    .getElementById("cInvestment")
    .addEventListener("click", calculateInvestment);
  document
    .querySelector("#addExpenseButton")
    .addEventListener("click", addExpense);
  document
    .querySelector("#calculateTaxButton")
    .addEventListener("click", calculateTax);

  const buttons = document.querySelectorAll(".button-grid button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const calculatorType = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      showCalculator(calculatorType);
    });
  });

  const calculators = document.querySelectorAll(".calculator");
  const buttonss = document.querySelectorAll(".button-grid button");

  function showCalculator(selectedCalculator) {
    // Hide all calculators and show only the selected one
    calculators.forEach((calculator) => {
      if (calculator.id === selectedCalculator) {
        calculator.classList.remove("hidden");
      } else {
        calculator.classList.add("hidden");
      }
    });

    // Update button visibility: Hide the button for the active calculator
    buttonss.forEach((button) => {
      const targetCalculator = button.onclick.toString().match(/'([^']+)'/)[1];
      if (targetCalculator === selectedCalculator) {
        button.style.display = "none";
      } else {
        button.style.display = "inline-block";
      }
    });
  }

  // Attach event listeners to buttons
  buttonss.forEach((button) => {
    button.addEventListener("click", function () {
      const targetCalculator = this.onclick.toString().match(/'([^']+)'/)[1];
      showCalculator(targetCalculator);
    });
  });

  function updateButtonVisibility(activeType) {
    buttons.forEach((button) => {
      const buttonType =
        button.getAttribute("onclick").match(/'([^']+)'Calculator/)[1] +
        "Calculator";
      if (buttonType === activeType) {
        button.style.display = "none";
      } else {
        button.style.display = "inline-block";
      }
    });
  }

  document.querySelectorAll(".calc-selector").forEach((button) => {
    button.addEventListener("click", function () {
      const calculatorType = this.getAttribute("data-type");
      // alert(calculatorType)
      showCalculator(calculatorType);
    });
  });

  const urlHash = window.location.hash.replace("#", "");
  if (urlHash) {
    showCalculator(urlHash);
  }
});

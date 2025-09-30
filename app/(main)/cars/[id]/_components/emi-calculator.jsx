"use client";

import React, { useEffect, useState } from "react";

function EmiCalculator({ price = 1000 }) {
  const [loanAmount, setLoanAmount] = useState(price);
  const [downPayment, setDownPayment] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTenure, setLoanTenure] = useState(1);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleLoanAmountChange = (value) => {
    const newLoanAmount = Math.min(Math.max(value, 1000), 150000);
    setLoanAmount(newLoanAmount);
    const newDownPayment = (downPaymentPercent / 100) * newLoanAmount;
    setDownPayment(newDownPayment);
    calculateLoan(newLoanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleDownPaymentChange = (value) => {
    const newDownPayment = Math.min(Math.max(value, 0), loanAmount);
    setDownPayment(newDownPayment);
    setDownPaymentPercent((newDownPayment / loanAmount) * 100);
    calculateLoan(loanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleDownPaymentPercentChange = (percent) => {
    const newPercent = Math.min(Math.max(percent, 0), 100);
    setDownPaymentPercent(newPercent);
    const newDownPayment = (newPercent / 100) * loanAmount;
    setDownPayment(newDownPayment);
    calculateLoan(loanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleInterestRateChange = (value) => {
    const newRate = Math.min(Math.max(value, 0.1), 25);
    setInterestRate(newRate);
    calculateLoan(loanAmount, downPayment, newRate, loanTenure);
  };

  const handleLoanTenureChange = (value) => {
    const newTenure = Math.min(Math.max(value, 1), 8);
    setLoanTenure(newTenure);
    calculateLoan(loanAmount, downPayment, interestRate, newTenure);
  };

  const calculateLoan = (principal, down, rate, years) => {
    const loanPrincipal = principal - down;
    if (loanPrincipal <= 0) {
      setResults(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const emi =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanPrincipal;

    setResults({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      loanPrincipal: loanPrincipal.toFixed(2),
      downPayment: down.toFixed(2),
    });
  };

  useEffect(() => {
    calculateLoan(loanAmount, downPayment, interestRate, loanTenure);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto pr-1">
      <div className="w-full space-y-5">
        {/* Vehicle Price */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Vehicle Price
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">$</span>
              </div>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) =>
                  handleLoanAmountChange(parseFloat(e.target.value))
                }
                className="w-full pl-9 pr-4 py-3 text-lg font-semibold rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="150000"
              value={loanAmount}
              onChange={(e) =>
                handleLoanAmountChange(parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Down Payment
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">$</span>
              </div>
              <input
                type="number"
                value={downPayment}
                onChange={(e) =>
                  handleDownPaymentChange(parseFloat(e.target.value))
                }
                className="w-full pl-9 pr-4 py-3 text-lg font-semibold rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max={loanAmount}
              value={downPayment}
              onChange={(e) =>
                handleDownPaymentChange(parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-sm text-gray-500">
              Down payment: {downPaymentPercent.toFixed(1)}% of vehicle price
            </div>
          </div>
        </div>

        {/* Interest Rate & Loan Term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h2 className="text-base font-semibold text-gray-700 mb-4">
              Interest Rate
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) =>
                    handleInterestRateChange(parseFloat(e.target.value))
                  }
                  className="w-full pr-10 py-3 text-lg font-semibold rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) =>
                  handleInterestRateChange(parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h2 className="text-base font-semibold text-gray-700 mb-4">
              Loan Term
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) =>
                    handleLoanTenureChange(parseFloat(e.target.value))
                  }
                  className="w-full pr-16 py-3 text-lg font-semibold rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium text-sm">
                    Years
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={loanTenure}
                onChange={(e) =>
                  handleLoanTenureChange(parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-blue-100 mb-2">
                Monthly Payment
              </div>
              <div className="text-4xl font-bold">
                ${formatNumber(results.emi)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-xs text-blue-100 mb-1">Vehicle Price</div>
                <div className="text-xl font-bold">
                  ${formatNumber(loanAmount)}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-xs text-blue-100 mb-1">Down Payment</div>
                <div className="text-xl font-bold">
                  ${formatNumber(results.downPayment)}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-xs text-blue-100 mb-1">Loan Amount</div>
                <div className="text-xl font-bold">
                  ${formatNumber(results.loanPrincipal)}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-xs text-blue-100 mb-1">Total Interest</div>
                <div className="text-xl font-bold">
                  ${formatNumber(results.totalInterest)}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg col-span-2">
                <div className="text-xs text-blue-100 mb-1">
                  Total Amount (Down + Payments)
                </div>
                <div className="text-xl font-bold">
                  $
                  {formatNumber(
                    parseFloat(results.downPayment) +
                      parseFloat(results.totalPayment)
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center px-4">
          This is an estimate. Actual EMI may vary based on your credit score
          and lender terms.
        </p>
      </div>
    </div>
  );
}

export default EmiCalculator;

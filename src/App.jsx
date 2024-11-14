import React, { useState } from 'react';

const ternixToDecimal = (ternix) => {
  let decimal = 0, power = 1;
  for (let i = ternix.length - 1; i >= 0; i--) {
    decimal += (ternix[i] - '0') * power;
    power *= 3;
  }
  return decimal;
};

const decimalToTernix = (decimal) => {
  let result = "";
  do {
    result = (decimal % 3) + result;
    decimal = Math.floor(decimal / 3);
  } while (decimal > 0);
  return result;
};

const convertToDecimal = (input, base) => {
  return base === 3 ? ternixToDecimal(input) : parseInt(input, base);
};

const allConversionsFromDecimal = (decimal) => {
  return {
    decimal,
    ternix: decimalToTernix(decimal),
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    hexadecimal: decimal.toString(16).toUpperCase(),
  };
};

const performOperation = (num1, num2, base, operation) => {
  const dec1 = convertToDecimal(num1, base);
  const dec2 = convertToDecimal(num2, base);
  const result = operation === 'add' ? dec1 + dec2 : dec1 - dec2;
  return allConversionsFromDecimal(result);
};

// React Components
const Converter = () => {
  const [input, setInput] = useState("");
  const [base, setBase] = useState(10);
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    const decimal = convertToDecimal(input, base);
    setResult(allConversionsFromDecimal(decimal));
  };

  return (
    <div className="bg-white shadow-lg shadow-[#097969] font-bold text-white] rounded-lg p-6 mb-6">
      <h2 className="text-xl text-center font-bold mb-4 text-gray-700">Number Conversion</h2>
      <input
        type="text"
        placeholder="Enter number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <select
        required
        onChange={(e) => setBase(parseInt(e.target.value))}
        className="select select-bordered w-full mb-4"
      >
        <option value={10}>Decimal</option>
        <option value={2}>Binary</option>
        <option value={8}>Octal</option>
        <option value={16}>Hexadecimal</option>
        <option value={3}>Ternix</option>
      </select>
      <button onClick={handleConvert} className="btn bg-[#097969] font-bold text-white w-full">Convert</button>
      {result && (
        <div className="mt-6 space-y-2 text-gray-600">
          <p><strong>Decimal:</strong> {result.decimal}</p>
          <p><strong>Ternix:</strong> {result.ternix}</p>
          <p><strong>Binary:</strong> {result.binary}</p>
          <p><strong>Octal:</strong> {result.octal}</p>
          <p><strong>Hexadecimal:</strong> {result.hexadecimal}</p>
        </div>
      )}
    </div>
  );
};

const Arithmetic = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [base, setBase] = useState(10);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const handleOperation = () => {
    setResult(performOperation(num1, num2, base, operation));
  };

  return (
    <div className="bg-white shadow-md shadow-[#097969] rounded-lg p-6">
      <h2 className="text-xl text-center font-bold mb-4 text-gray-700">Arithmetic Operations</h2>
      <input
        type="text"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <select
        onChange={(e) => setBase(parseInt(e.target.value))}
        className="select select-bordered w-full mb-4"
      >
        <option value={10}>Decimal</option>
        <option value={2}>Binary</option>
        <option value={8}>Octal</option>
        <option value={16}>Hexadecimal</option>
        <option value={3}>Ternix</option>
      </select>
      <select
        onChange={(e) => setOperation(e.target.value)}
        className="select select-bordered w-full mb-4"
      >
        <option value="add">Addition</option>
        <option value="subtract">Subtraction</option>
      </select>
      <button onClick={handleOperation} className="btn bg-[#097969] font-bold text-white w-full">Calculate</button>
      {result && (
        <div className="mt-6 space-y-2 text-gray-600">
          <p><strong>Decimal:</strong> {result.decimal}</p>
          <p><strong>Ternix:</strong> {result.ternix}</p>
          <p><strong>Binary:</strong> {result.binary}</p>
          <p><strong>Octal:</strong> {result.octal}</p>
          <p><strong>Hexadecimal:</strong> {result.hexadecimal}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#097969] flex flex-col items-center p-4">
      <h1 className="text-xl font-bold text-white font-poppin uppercase mb-6">Number Conversion and Arithmetic Operrations</h1>
      <div className="w-full max-w-lg ">
        <Converter />
        <Arithmetic />
      </div>
    </div>
  );
};

export default App;

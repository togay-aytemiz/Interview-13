import React, { useState } from "react";

function App() {
  return <CustomProgram />;
}

const half = (number) => number / 2;
const double = (number) => number * 2;
const increment = (number) => number + 1;
const decrement = (number) => number - 1;

const CustomProgram = () => {
  const [listOfFunctions, setListOfFunctions] = useState([]);
  const [fieldValue, setFieldValue] = useState("");
  const [result, setResult] = useState([]);

  const handleOperation = (e) => {
    const value = e.target.innerText.toLowerCase();
    const funcMap = {
      half: half,
      double: double,
      increment: increment,
      decrement: decrement,
    };

    if (value === "clear") {
      setListOfFunctions([]);
      setResult([]);
    } else {
      setListOfFunctions((prev) => [...prev, funcMap[value]]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fieldValue === "") {
      alert("Please enter a number");
    } else if (listOfFunctions.length === 0) {
      alert("Please select an operation");
    } else {
      let finalResult = parseFloat(fieldValue);
      const operationsResult = [
        { operation: "Initial value", result: finalResult },
      ];
      setFieldValue("");

      listOfFunctions.forEach((func) => {
        finalResult = func(finalResult);
        operationsResult.push({ operation: func.name, result: finalResult });
      });

      operationsResult.push({ operation: "Last value", result: finalResult });
      setResult(operationsResult);
    }
  };

  return (
    <>
      <div className="mt-10 ml-10">
        {/* Button area */}
        <div className="flex gap-2">
          <button
            className="p-2 bg-slate-100 border rounded-md"
            onClick={handleOperation}
          >
            Half
          </button>
          <button
            className="p-2 bg-slate-100 border rounded-md"
            onClick={handleOperation}
          >
            Double
          </button>
          <button
            className="p-2 bg-slate-100 border rounded-md"
            onClick={handleOperation}
          >
            Increment
          </button>
          <button
            className="p-2 bg-slate-100 border rounded-md"
            onClick={handleOperation}
          >
            Decrement
          </button>

          <div className="w-[1px] bg-slate-600 mx-4"></div>

          <button
            className="p-2 bg-slate-100 border rounded-md"
            onClick={handleOperation}
          >
            Clear
          </button>
        </div>

        {/* Function list */}
        <div>
          <h1 className="text-3xl font-bold mt-5 mb-2">Functions</h1>
          {listOfFunctions.map((func, index) => (
            <p key={index} className="ml-2 mt-1">
              {" "}
              ➡️ {func.name}
            </p>
          ))}
        </div>

        <div className="my-10">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Enter value"
              className="p-2 border rounded-md"
              onChange={(e) => setFieldValue(e.target.value)}
              value={fieldValue}
            />
            <button
              type="submit"
              className="p-2 bg-slate-100 border rounded-md"
            >
              Send
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Results</h2>
          {result.slice(0, -1).map((res, index) => (
            <p key={index} className="font-light">
              {res.operation}: {res.result}
            </p>
          ))}
          {result.length > 0 && (
            <p className="font-semibold">
              {result[result.length - 1].operation}:{" "}
              {result[result.length - 1].result}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

import React, { useState, useRef, useEffect } from "react";
import ArrayField from "../components/ArrayField";

export default function LinearSearch() {
  function getRandomNumber() {
    return Math.floor(Math.random() * (100 - 10 + 1) + 10);
  }

  const [array, setArray] = useState(
    [...Array(5).keys()].map((i) => getRandomNumber())
  );

  const [color, setColor] = useState(Array(5).fill("transparent"));
  const timeouts = useRef([]);
  const [resutlText, setResultText] = useState("");

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const handleSearch = () => {
    if (timeouts.current.length > 0) {
      return;
    }

    if (document.getElementById("target-number").value === "") {
      alert("Please enter a target value");
      return;
    }
    setResultText("");
    const target = parseInt(document.getElementById("target-number").value);
    const newColors = Array(array.length).fill("transparent");

    array.forEach((value, index) => {
      const timeout = setTimeout(() => {
        if (value === target) {
          newColors[index] = "green";
          setColor([...newColors]);
          setResultText(`Target found at index ${index}`);
          clearAllTimeouts(); // Stop further timeouts when target is found
        } else {
          newColors[index] = "red";
          setColor([...newColors]);
          if (index === array.length - 1) {
            setResultText("Target not found");
            clearAllTimeouts();
          }
        }
      }, index * 100);
      timeouts.current.push(timeout);
    });
  };

  const clearAllTimeouts = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
  };

  const handleReset = () => {
    clearAllTimeouts();
    setResultText("");
    setColor(Array(array.length).fill("transparent"));
  };

  return (
    <div className="linear-search " style={{ display: "none" }}>
      <h1 className="font-bold text-3xl">Linear Search</h1>
      <p className="m-5">
        Linear search is a simple search algorithm that finds the position of a
        target value within an array.
      </p>
      <p className="m-5">
        It sequentially checks each element of the array until a match is found
        or the whole array has been searched.
      </p>
      <p className="m-5">
        Linear search has a time complexity of O(n) where n is the number of
        elements in the array.
      </p>
      <div className="flex justify-center">
        <label className="text-lg" htmlFor="array-size">
          Set Array Size:
        </label>
        <input
          type="range"
          className="w-[50%]"
          style={{ maxWidth: "500px" }}
          min={5}
          max={100}
          defaultValue={5}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            const newArray = [...Array(value).keys()].map((i) =>
              getRandomNumber()
            );
            setArray(newArray);
            setColor(Array(value).fill("transparent")); // Reset colors
            clearAllTimeouts(); // Clear all timeouts
          }}
        />
        <h2 className="mx-2">{array.length}</h2>
      </div>
      <div className="border p-5 rounded-lg array-fields flex gap-3 justify-center m-5 flex-wrap">
        {array.map((value, index) => (
          <ArrayField value={value} key={index} bgColor={color[index]} />
        ))}
      </div>
      <div className="flex justify-center gap-5 sm:flex-col-rev">
        <input
          type="number"
          className="border"
          placeholder="Enter target value"
          id="target-number"
          style={{ width: "200px", padding: "5px" }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <h2 className="m-5 text-xl">{resutlText}</h2>
    </div>
  );
}

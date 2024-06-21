import React, { useEffect, useState, useRef } from "react";
import ArrayField from "../components/ArrayField";

export default function BinarySearch() {
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

  const clearAllTimeouts = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
  };
  const handleReset = () => {
    clearAllTimeouts();
    setResultText("");
    setColor(Array(array.length).fill("transparent"));
  };

  const handleSearch = () => {
    if (timeouts.current.length > 0) {
      return;
    }

    array.sort((a, b) => a - b);
    setArray([...array]);

    if (document.getElementById("target-number").value === "") {
      alert("Please enter a target value");
      return;
    }

    setResultText("");
    const target = parseInt(document.getElementById("target-number").value);
    const newColors = Array(array.length).fill("transparent");

    let start = 0;
    let end = array.length - 1;
    let mid = Math.floor((start + end) / 2);

    const binarySearch = () => {
      const timeout = setTimeout(() => {
        if (start > end) {
          setResultText("Target not found");
          clearAllTimeouts();
          return;
        }

        if (array[mid] === target) {
          newColors[mid] = "green";
          setColor([...newColors]);
          setResultText(`Target found at index ${mid}`);
          clearAllTimeouts();
          return;
        } else if (array[mid] < target) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }

        mid = Math.floor((start + end) / 2);
        newColors[mid] = "red";
        setColor([...newColors]);
        if (start > end) {
          setResultText("Target not found");
          clearAllTimeouts();
        }
      }, 100);
      timeouts.current.push(timeout);
    };
    binarySearch();
  };

  return (
    <div className="binary-search ">
      <h1 className="font-bold text-3xl">Binary Search</h1>
      <p className="m-5">
        Binary search is a fast search algorithm with run-time complexity of
        O(log n). This search algorithm works on the principle of divide and
        conquer. For this algorithm to work properly, the data collection should
        be in the sorted form.
      </p>
      <p className="m-5">
        Binary search looks for a particular item by comparing the middle most
        item of the collection. If a match occurs, then the index of item is
        returned. If the middle item is greater than the item, then the item is
        searched in the sub-array to the left of the middle item. Otherwise, the
        item is searched for in the sub-array to the right of the middle item.
        This process continues on the sub-array as well until the size of the
        subarray reduces to zero.
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
          max={20}
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
      <div className="border p-3 rounded-lg array-fields flex gap-2 justify-center m-5 flex-wrap">
        {array.map((value, index) => (
          <ArrayField
            value={value}
            key={index}
            bgColor={color[index]}
            padding={"14px"}
          />
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

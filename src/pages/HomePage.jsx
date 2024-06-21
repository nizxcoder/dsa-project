import React, { useState, useRef } from "react";
import LinearSearch from "./LinearSearch.jsx";
import BinarySearch from "./BinarySearch.jsx";

export default function HomePage() {
  return (
    <div>
      {/* <LinearSearch /> */}
      <BinarySearch />
    </div>
  );
}

import React from "react";

export default function ArrayField(props) {
  return (
    <div
      className="rounded-lg border p-5"
      style={{ backgroundColor: props.bgColor }}
    >
      {props.value}
    </div>
  );
}

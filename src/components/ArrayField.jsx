import React from "react";

export default function ArrayField(props) {
  const { bgColor, padding } = props;
  return (
    <div
      className="rounded-lg border p-5 text-center "
      style={{ backgroundColor: bgColor, padding: padding }}
    >
      {props.value}
    </div>
  );
}

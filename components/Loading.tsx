import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

import {Link} from "react-router";
import React from "react";

export default function CreateThreadLink() {
  return (
    <Link
      data-cy="create-thread-link"
      to="/threads/new"
      className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
      data-id="element-107"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-plus h-4 w-4"
        aria-hidden="true"
        data-id="element-108"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      New Thread
    </Link>
  );
}
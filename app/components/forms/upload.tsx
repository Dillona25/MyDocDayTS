"use client";

import { useState, type ChangeEvent } from "react";

export const Upload = () => {
  return (
    <fieldset className="group min-w-0 rounded-lg border border-gray-500 px-3 focus-within:border-secondary">
      <legend className="-ml-1 px-1 text-xs font-semibold text-primary">
        Profile Photo
      </legend>
      <input
        type="file"
        accept="image/*"
        className="w-full bg-transparent pb-2 pt-1 text-sm outline-none"
      />
    </fieldset>
  );
};

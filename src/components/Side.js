"use client";

import { MenuItems } from "./MenuItems";
import { Logo } from "./Logo";

export const Side = ({ children }) => {
  return (
    <div className="sticky top-0 space-y-4">
      <Logo />
      <MenuItems />
    </div>
  );
};

"use client";

import { signOut } from "next-auth/react";
import { BookManagement } from "../BookManagement";

export const HomeComponent = () => {
  return (
    <div>
      <div className="p-5 flex flex-row gap-2 justify-between">
        <h4> HomeComponent</h4>
        <button
          onClick={async () => {
            signOut();
          }}
          className="bg-black text-white p-2 border-2 border-black rounded-sm hover:border-black hover:border-2 hover:bg-white hover:text-black"
        >
          SignOut
        </button>
      </div>
      <BookManagement />
    </div>
  );
};

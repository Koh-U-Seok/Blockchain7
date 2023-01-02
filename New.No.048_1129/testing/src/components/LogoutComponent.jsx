import { useState } from "react";

const LogoutComp = ({ logout }) => {
  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default LogoutComp;

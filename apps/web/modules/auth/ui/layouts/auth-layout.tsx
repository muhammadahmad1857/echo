import React from "react";
export const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8">
      {children}
    </div>
  );
};

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="max-w-screen-lg mx-auto px-4">{children}</div>;
};

export default Layout;

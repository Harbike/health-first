import React from "react";

interface HeaderProps {
  headerRight?: React.ReactNode;
}

function HeaderLayout({ headerRight }: HeaderProps) {
  return (
    <header className="w-full bg-gray-50/50 shadow-md flex justify-between items-center pt-6 pb-2 px-3 md:px-7 lg:px-10">
{/* Left Section */}
    <div className="flex items-center gap-1">
         <img src="src\assets\medical-icon.svg" className="h-7" />
         <span className="text-xl font-bold">HealthFirst</span>
       </div>

        {/* Right Section */}
     {headerRight}
    </header>
  );
}

export default HeaderLayout;

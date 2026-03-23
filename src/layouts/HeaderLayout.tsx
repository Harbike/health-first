import React from "react";
import medicalIcon from "@/assets/medical-icon.svg";

interface HeaderProps {
  headerRight?: React.ReactNode;
  headerMiddle?: React.ReactNode;
}

function HeaderLayout({ headerRight, headerMiddle }: HeaderProps) {
  return (
    <header className="w-full bg-gray-50/50 shadow-md flex justify-between items-center pt-6 pb-2 px-3 md:px-7 lg:px-10">
{/* Left Section */}
    <div className="flex items-center gap-1">
         <img src={medicalIcon} className="h-7" />
         <span className="text-xl font-bold">HealthFirst</span>
       </div>

        {/* Middle Section */}
     {headerMiddle}
       
        {/* Right Section */}
     {headerRight}
    </header>
  );
}

export default HeaderLayout;

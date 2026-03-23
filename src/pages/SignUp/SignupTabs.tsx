import { Link, useLocation } from "react-router-dom";

function SignupTabs() {
  const location = useLocation();

  const tabs = [
    { label: "Basic Info", path: "/signup/basic-info", number: 1 },
    { label: "Password", path: "/signup/password", number: 2 },
    { label: "Profile", path: "/signup/profile", number: 3 },
  ];

  return (
    <div className="flex gap-10 items-center">
      {tabs.map((tab, processIndicator) => {
        const active = location.pathname === tab.path;

        return (
          <div key={tab.path} className="flex flex-col items-center">
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center text-center"
            >
              {/* Number Circle */}

            <div
            className={`
              w-8 h-8 flex items-center justify-center rounded-full border
              ${active
                ? "bg-blue-500 text-white border-blue-500" : "bg-gray-200 text-gray-500 border-gray-300"}"}
            `}
          >
            {tab.number}
            </div>

            {/* Label */}
             <span
                className={`text-sm mt-1 
                ${active ? "text-blue-600 font-medium"
                         : "text-gray-500"}
              `}
              >
            {tab.label}
            </span>
          </Link>

          {/* Line under circle (except last item) */}
            {processIndicator < tabs.length - 1 && (
              <div className="h-px w-14 bg-gray-300 mt-2" />
            )}
            </div>
        );
      })}
    </div>
  );
}

export default SignupTabs;
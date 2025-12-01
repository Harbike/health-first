import { Link, Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { Button } from "@/components/ui/button";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

      <HeaderLayout
        headerRight={
          <Link to="/signup">
            <Button
              variant="outline"
              className="text-blue-500 bg-blue-100 font-semibold hover:bg-green-200/90 hover:text-green-700"
            >
              Hello User
            </Button>
          </Link>
        }
      />

      {/* Main Content */}
      <main className="flex-1 p-4 w-full max-w-sm">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

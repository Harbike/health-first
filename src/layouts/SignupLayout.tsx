import HeaderLayout from "@/layouts/HeaderLayout";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SignupTabs from "@/pages/SignUp/SignupTabs";

function SignupLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="w-full min-w-3xs">
        <HeaderLayout
          headerRight={
            <Link to="/signin">
              <Button
                variant="outline"
                className="text-blue-500 bg-blue-100 font-semibold hover:bg-green-200/90 hover:text-green-700"
              >
                Log in
              </Button>
            </Link>
          }
        />
      </div>

      {/* SignUp forms */}
      <main className="flex flex-col flex-1 py-10 items-center w-full">
        <div className="flex flex-col items-center w-full mb-6">
          <h1 className="text-3xl tracking-wide font-bold ">
            Create your account
          </h1>
          <p className="text-xs text-center py-1">
            Your health journey starts here.
          </p>
        </div>

        <form className="space-y-5">
          <div className="flex flex-col gap-6 bg-white p-5 rounded-lg shadow-lg inset-shadow-2xs max-w-sm w-80 md:w-100">
            {/* Tabs */}
            <div className="flex justify-center py-4">
              <SignupTabs />
            </div>

            <Outlet />
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignupLayout;

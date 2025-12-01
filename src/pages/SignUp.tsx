import { Link } from "react-router-dom";
import HeaderLayout from "@/layouts/HeaderLayout";
import { Button } from "@/components/ui/button";

function SignUp() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="w-full min-w-3xs">
        <HeaderLayout
          headerRight={
            <>
              <nav className="flex gap-4 text-lg  font-semibold text-red-300">
                <Link to="/auth/signin"> Find a Doctor </Link>
                <Link to="#"> Speacialties </Link>
                <Link to="#"> For Providers </Link>
                <Link to="#"> For Employers </Link>
              </nav>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="text-blue-500 bg-blue-100 font-semibold hover:bg-green-200/90 hover:text-green-700"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          }
        />
      </div>
      <main className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button className="bg-green-500 text-white p-2 rounded">Sign Up</button>
      </main>
    </div>
  );
}

export default SignUp;

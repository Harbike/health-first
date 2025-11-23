import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("user123");
    navigate("/home");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign In
      </button>
      <p className="mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
}

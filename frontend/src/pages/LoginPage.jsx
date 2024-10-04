import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { toast } from "../components/Toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
	  try {
		  e.preventDefault();
		  const responseMsg = await login(email, password);
		toast.success(responseMsg)
	} catch (error) {
		toast.error(error)
	}
  };

  return (
    <div className=" lg:w-3/4 flex items-center justify-center bg-[#020d19]">
      <div className="bg-[#0b1b29] rounded-lg shadow-lg p-8 w-full max-w-md border border-[#ff9800]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#f0f0f0] font-mono">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
              iconColor="#ff9800"  // Changed icon color
            />
          </div>

          <div className="mb-4">
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
              iconColor="#ff9800"  // Changed icon color
			  autocomplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link to="/forgot-password" className="text-sm text-[#ff9800] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-[#ff9800] text-[#0b1b29] font-bold rounded-lg shadow-lg hover:bg-[#f9b34c] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 focus:ring-offset-[#0b1b29] transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto text-[#0b1b29]" /> : "Login"}
          </button>
        </form>
		<div className="mt-4 bg-[#0b1b29] bg-opacity-50 w-full max-w-md p-4 text-center rounded-lg">
        <p className="text-sm text-[#f0f0f0]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#ff9800] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};
export default LoginPage;

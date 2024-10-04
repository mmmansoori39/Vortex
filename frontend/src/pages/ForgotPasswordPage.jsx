import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "../components/Toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const responseMsg = await forgotPassword(email);
      toast.success(responseMsg);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="lg:w-3/4 flex items-center justify-center bg-[#020d19]">
      <div className="bg-[#0b1b29] rounded-lg shadow-lg p-8 w-full max-w-md border border-[#ff9800]">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              iconColor="#ff9800" // Set icon color to orange
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c] outline-none"
            />
            <button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 w-full py-3 px-4 bg-[#ff9800] text-[#0b1b29] 
							font-bold rounded-lg shadow-lg hover:bg-[#f9b34c] focus:outline-none 
							focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2
							focus:ring-offset-[#0b1b29] transition duration-200"
              type="submit"
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-[#ff9800] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}

        <div className="px-8 py-4 bg-[#0b1b29] bg-opacity-50 flex justify-center mt-4 rounded-lg">
          <Link
            to="/login"
            className="text-sm text-[#ff9800] hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

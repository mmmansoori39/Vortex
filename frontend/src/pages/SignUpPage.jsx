import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { toast } from "../components/Toast";
import { motion } from "framer-motion";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const responseMsg = await signup(name, userName, email, password);
			toast.success(responseMsg)
			navigate("/");
		} catch (error) {
			toast.error(error)
		}
	};

	return (
		<div className=" lg:w-3/4 flex items-center justify-center bg-[#020d19] mt-4">
			<div className="bg-[#0b1b29] rounded-lg shadow-lg py-4 px-8 w-full max-w-md border border-[#ff9800]">
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-transparent bg-clip-text">
					Create Account
				</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
						iconColor="#ff9800"  // Set icon color to orange
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c] outline-none"
					/>
					<Input
						icon={User}
						iconColor="#ff9800" 
						type="text"
						placeholder="UserName"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c] outline-none"
					/>
					<Input
						icon={Mail}
						iconColor="#ff9800" 
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c] outline-none"
					/>
					<Input
						icon={Lock}
						iconColor="#ff9800" 
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c] outline-none"
					/>
					<PasswordStrengthMeter password={password} />

					<motion.button
						className="mt-5 w-full py-3 px-4 bg-[#ff9800] text-[#0b1b29] 
						font-bold rounded-lg shadow-lg hover:bg-[#f9b34c] focus:outline-none 
						focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2
						focus:ring-offset-[#0b1b29] transition duration-200"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
					</motion.button>
				</form>
				<div className="px-8 bg-[#0b1b29] bg-opacity-50 flex justify-center mt-2 rounded-lg">
				<p className="text-sm text-[#f0f0f0]">
					Already have an account?{" "}
					<Link to="/login" className="text-[#ff9800] hover:underline">
						Login
					</Link>
				</p>
			</div>
			</div>
		</div>
	);
};

export default SignUpPage;

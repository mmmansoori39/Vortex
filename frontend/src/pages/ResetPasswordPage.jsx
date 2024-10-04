import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import { toast } from "../components/Toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);
			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#020d19]'>
			<div className='max-w-md w-full bg-[#0b1b29] rounded-lg shadow-lg p-8 border border-[#ff9800]'>
				<motion.h2
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-transparent bg-clip-text'
				>
					Reset Password
				</motion.h2>
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className='bg-[#141414] text-[#f0f0f0] border-2 border-[#ff9800] focus:border-[#f9b34c] focus:outline-none mb-4'
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className='bg-[#141414] text-[#f0f0f0] border-2 border-[#ff9800] focus:border-[#f9b34c] focus:outline-none mb-4'
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-[#0b1b29] font-bold rounded-lg shadow-lg hover:bg-[#f9b34c] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 focus:ring-offset-[#020d19] transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;

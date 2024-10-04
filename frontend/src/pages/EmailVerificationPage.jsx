import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { toast } from "../components/Toast";

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { isLoading, verifyEmail } = useAuthStore();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			const response = await verifyEmail(verificationCode);
			navigate("/");
			toast.success(response.message);
		} catch (error) {
			toast.error(error)
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#020d19]'>
			<div className='max-w-md w-full bg-[#0b1b29] rounded-lg shadow-lg p-8 border border-[#ff9800]'>
				<motion.h2
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-transparent bg-clip-text'
				>
					Verify Your Email
				</motion.h2>
				<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='1'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-[#141414] text-[#f0f0f0] border-2 border-[#ff9800] rounded-lg focus:border-[#f9b34c] focus:outline-none'
							/>
						))}
					</div>
					<button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-[#ff9800] to-[#f9b34c] text-[#0b1b29] font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-[#f9b34c] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default EmailVerificationPage;

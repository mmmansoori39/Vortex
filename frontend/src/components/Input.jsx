const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-[#ff9800]' />
			</div>
			<input
				{...props}
				className=' pl-10 pr-3 py-2 bg-opacity-50 rounded-lg border focus:ring-2 focus:ring-[#ff9800] placeholder-gray-400 transition duration-200 w-full p-2 bg-[#020d19] text-[#f0f0f0] border-[#ff9800] focus:border-[#f9b34c]'
			/>
		</div>
	);
};
export default Input;
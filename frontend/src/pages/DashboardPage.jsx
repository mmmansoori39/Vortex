import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 sm:p-2 justify-items-center gap-5 mt-24 mb-10 *:rounded-md font-mono *:border *:border-orange-500 ">
      <div
        className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex
	  justify-around flex-col gap-2 items-center p-5 "
      >
        <div className="">
          <h1 className="text-[#f0f0f0] text-2xl font-mono ">Challenges</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat nostrud aute duis aute
            <br />
            <br />
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat{" "}
          </p>
        </div>
        <div className="w-full py-2">
          <Link to={"/ctf"} className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white">
            Challenge Now
          </Link>
        </div>
      </div>
      <div
        className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex
	  justify-around flex-col gap-2 items-center p-5 "
      >
        <div className="">
          <h1 className="text-[#f0f0f0] text-2xl font-mono ">Blogs</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat nostrud aute duis aute
            <br />
            <br />
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat{" "}
          </p>
        </div>
        <div className="w-full py-2">
          <Link to={"/blog"} className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white">
            See Blogs
          </Link>
        </div>
      </div>
      <div
        className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex
	  justify-around flex-col gap-2 items-center p-5 "
      >
        <div className="">
          <h1 className="text-[#f0f0f0] text-2xl font-mono ">All Labs</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat nostrud aute duis aute
            <br />
            <br />
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat{" "}
          </p>
        </div>
        <div className="w-full py-2">
          <Link className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white">
            Lab Now
          </Link>
        </div>
      </div>
      <div
        className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex
	  justify-around flex-col gap-2 items-center p-5 "
      >
        <div className="">
          <h1 className="text-[#f0f0f0] text-2xl font-mono ">Super Challenge</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat nostrud aute duis aute
            <br />
            <br />
            Cillum ipsum tempor nostrud ea. Mollit laborum laborum id elit
            aliqua. Cupidatat{" "}
          </p>
        </div>
        <div className="w-full py-2">
          <Link className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

{
  /* <div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl border border-gray-800'
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Dashboard
			</h2>

			<div className='space-y-6'>
				<div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</div>
				<div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>

						{formatDate(user.lastLogin)}
					</p>
				</div>
			</div>

			<div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
				<button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</button>
			</div>
		</div> */
}

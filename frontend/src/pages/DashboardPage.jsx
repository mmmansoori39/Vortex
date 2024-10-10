import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 sm:p-2 justify-items-center gap-5 mt-24 mb-10 *:rounded-md font-mono *:border *:border-orange-500 ">
      <div className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex justify-around flex-col gap-2 items-center p-5">
        <div>
          <h1 className="text-[#f0f0f0] text-2xl font-mono">Challenges</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Test your skills with our diverse range of challenges designed to
            improve your problem-solving abilities and deepen your understanding
            of various concepts in technology and coding. Join now to tackle
            real-world scenarios and earn rewards!
          </p>
        </div>
        <div className="w-full py-2">
          <Link
            to={"/ctf"}
            className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white"
          >
            Challenge Now
          </Link>
        </div>
      </div>
      <div className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex justify-around flex-col gap-2 items-center p-5">
        <div>
          <h1 className="text-[#f0f0f0] text-2xl font-mono">Blogs</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Explore our latest blogs that cover a wide range of topics in
            technology, coding tutorials, and industry trends. Stay updated with
            insightful articles that provide valuable information to enhance
            your skills and knowledge.
          </p>
        </div>
        <div className="w-full py-2">
          <Link
            to={"/blog"}
            className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white"
          >
            See Blogs
          </Link>
        </div>
      </div>
      <div className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex justify-around flex-col gap-2 items-center p-5">
        <div>
          <h1 className="text-[#f0f0f0] text-2xl font-mono">All Labs</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Gain hands-on experience through our interactive labs. Whether you
            want to practice coding, experiment with new technologies, or
            collaborate with peers, our labs provide a practical learning
            environment for you.
          </p>
        </div>
        <div className="w-full py-2">
          <Link
            to={"/labs"}
            className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white"
          >
            Lab Now
          </Link>
        </div>
      </div>
      <div className="bg-[#0b1b29] text-orange-700 w-96 h-96 font-bold flex justify-around flex-col gap-2 items-center p-5">
        <div>
          <h1 className="text-[#f0f0f0] text-2xl font-mono">Super Challenge</h1>
        </div>
        <div>
          <p className="text-[#b0b0b0] text-sm">
            Ready for an advanced test of your skills? Our Super Challenge is
            designed for experienced participants looking to tackle complex
            problems and showcase their expertise. Join now to prove your
            mettle!
          </p>
        </div>
        <div className="w-full py-2">
          <Link
            to={"/super-challenge"}
            className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import React from "react";
import { Link } from "react-router-dom";

const challengesData = [
  {
    id: "1",
    difficulty: "Trivial",
    name: "A little something to get you started",
    skills: "Web",
    completion: "0 / 1",
  },
  {
    id: "2",
    difficulty: "Easy",
    name: "Encrypted Pastebin",
    skills: "Web",
    completion: "0 / 4",
  },
  {
    id: "3",
    difficulty: "Hard",
    name: "Photo Gallery",
    skills: "Web",
    completion: "0 / 3",
  },
  {
    id: "4",
    difficulty: "Moderate",
    name: "Postbook",
    skills: "Crypto",
    completion: "0 / 4",
  },
];

const ChallengesPage = () => {
  const userScore = 75; 
  const progress = 55; 

  return (
    <div className="min-h-screen bg-[#0b1b29] text-white p-4 mt-24 rounded-lg">
      <div className="container mx-auto max-w-4xl mb-8">
        <div className=" p-3 rounded-lg ">
          <p className="text-lg mb-2">Score: {userScore}</p>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-[#ff9800] h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progress}% Progress</p>
        </div>
        <hr />

        <h2 className="text-3xl font-bold mt-6 mb-4">Challenges</h2>
        <table className="min-w-full bg-[#141a24] rounded-lg">
          <thead>
            <tr className="*:px-4 *:text-md border-b">
              <th className="py-2 text-left  font-semibold text-gray-300">
                Difficulty
              </th>
              <th className="py-2 text-left font-semibold text-gray-300">
                Name
              </th>
              <th className="py-2 text-left  font-semibold text-gray-300">
                Skills
              </th>
              <th className="py-2 text-left font-semibold text-gray-300">
                Completion
              </th>
              <th className="py-2 text-left font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {challengesData.map((challenge, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-4 px-4 text-sm text-gray-400">
                  {challenge.difficulty}
                </td>
                <td className="py-4 px-4 text-sm text-gray-400">
                  {challenge.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-400">
                  {challenge.skills}
                </td>
                <td className="py-4 px-4 text-sm text-gray-400">
                  {challenge.completion}
                </td>
                <td className="py-4 px-4 text-sm text-gray-400 ">
                  <Link
                    to={`${challenge.id}`}
                    className="text-cyan-500 hover:text-white   focus:outline-none focus:text-cyan-200 disabled:text-cyan-300 py-1 px-3
                  hover:bg-[#ff9800] rounded-lg text-md border border-[#ff9800] shadow-lg hover:underline mr-2"
                  >
                    Start
                  </Link>
                  <Link to="#" className="text-[#ff9800] hover:underline mr-2">
                    Hint
                  </Link>
                  <Link to="#" className="text-[#ff9800] hover:underline">
                    Terminate
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallengesPage;

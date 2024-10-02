import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="bg-[#141a24] p-5 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-semibold text-[#ff9800]">{challenge.name}</h3>
      <p className="text-gray-300">Difficulty: {challenge.difficulty}</p>
      <p className="text-gray-300">Skills: {challenge.skills}</p>
      <p className="text-gray-300">Completion: {challenge.completion}</p>
      <Link
        to={`/ctf/c`}
        className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-white mt-4 block text-center"
      >
        Start
      </Link>
    </div>
  );
};

export default ChallengeCard;

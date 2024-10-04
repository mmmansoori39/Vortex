import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeStore } from "../store/challengeStore";

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const {
    challenges,
    fetchChallengeById,
    isLoading,
    error,
    fileType,
    codeContent,
  } = useChallengeStore();
  const [pythonOutput, setPythonOutput] = useState("");

  // Fetch challenge by ID
  useEffect(() => {
    const fetchChallenge = async () => {
      setPythonOutput("");
      await fetchChallengeById(id);
    };

    fetchChallenge();
  }, [id, fetchChallengeById]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!challenges) return <div>Challenge not found</div>;

  return (
    <div className="lg:w-2/3 sm:w-4/5 min-w-96 p-4 mt-20 rounded-md font-mono">
      <div>
        <h1 className="text-2xl font-bold">{challenges.name}</h1>
        <div className="flex justify-between text-sm">
          <p>Difficulty: {challenges.difficulty}</p>
          <p>
            Skills:{" "}
            {challenges.skills?.map((item, i) => (
              <span key={i}>{item} </span>
            ))}
          </p>
        </div>
      </div>
      <div className="challenge-container mt-4">
        {fileType === "html" ? (
          <iframe
            key={codeContent}
            srcDoc={codeContent}
            title="html-content"
            width="100%"
            height="500px"
          />
        ) : fileType === "python" ? (
          <pre>{pythonOutput || "Running Python code..."}</pre>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 space-x-2">
              <span className="word-animation">The</span>
              <span className="word-animation">challenge</span>
              <span className="word-animation">is</span>
              <span className="word-animation">being</span>
              <span className="word-animation">prepared</span>
              <span className="word-animation">for</span>
              <span className="word-animation">you,</span>
              <span className="word-animation">Please</span>
              <span className="word-animation">wait</span>
              <span className="word-animation">...</span>
              <span className="word-animation">!</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;


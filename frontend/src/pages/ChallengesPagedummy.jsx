import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

const challengesData = [
  {
    id: '1',
    difficulty: 'Trivial',
    name: 'A little something to get you started',
    skills: 'Web',
    completion: '0 / 1',
    code: '<p>Hello World!</p>', // Example HTML code
  },
  {
    id: '2',
    difficulty: 'Easy',
    name: 'Encrypted Pastebin',
    skills: 'Web',
    completion: '0 / 4',
    code: 'print("Hello, World!")', // Example Python code
  },
  {
    id: '3',
    difficulty: 'Hard',
    name: 'Photo Gallery',
    skills: 'Web',
    completion: '0 / 3',
    code: 'public class Hello { public static void main(String[] args) { System.out.println("Hello, World!"); } }', // Example Java code
  },
  {
    id: '4',
    difficulty: 'Moderate',
    name: 'Postbook',
    skills: 'Crypto',
    completion: '0 / 4',
    code: 'def add(a, b): return a + b', // Example Python function
  },
];

const ChallengesPagedummy = () => {
  return (
    <div className="min-h-screen bg-[#0b1b29] text-white p-4">
      <div className="container mx-auto max-w-4xl mb-8">
        <h2 className="text-3xl font-bold mt-6 mb-4">Challenges</h2>
        {challengesData.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default ChallengesPagedummy;

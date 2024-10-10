import React from 'react';
import ChallengesPagedummy from './ChallengesPagedummy';

const AboutUsPage = () => {
  return (
    <div className=" bg-[#0b1b29] border border-orange-500 mb-12 mt-24 rounded-md text-white py-2  px-4 font-mono">
      <div className="container mx-auto max-w-2xl ">
        <h1 className="text-4xl font-bold mt-4 mb-6 text-center">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Vortex! We are a dedicated team passionate about technology, innovation, and making a difference in the digital world. Our mission is to provide top-quality content and services to help our users stay ahead in the fast-paced world of tech.
        </p>
        <p className="text-lg mb-4">
          At Vortex, we believe that knowledge and collaboration are the keys to success. Our platform offers a wide range of resources, including blogs, tutorials, and forums where enthusiasts can learn and share insights about the latest developments in technology.
        </p>
        <p className="text-lg mb-4">
          Whether you're a seasoned professional or just starting, we are here to support you on your journey to mastering the digital landscape.
        </p>
        <p className="text-lg">
          Thank you for being a part of our community!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;

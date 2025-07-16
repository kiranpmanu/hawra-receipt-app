import React from 'react';
import { useNavigate } from 'react-router-dom';
import hawraLogo from './assets/hawra-logo.png';
import jskaLogo from './assets/jska-logo.png';
import banner from './assets/banner.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <img src={hawraLogo} alt="Hawra Logo" className="h-12 w-auto" />
        
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-red-700">
            HAWRA SPORTS HALL INTERNATIONAL
          </h1>
          <div className="text-xs font-medium text-black tracking-wide">
            SCHOOL OF MARTIAL ARTS
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <img src={jskaLogo} alt="JSKA Logo" className="h-12 w-auto" />
          <button className="text-2xl font-bold">☰</button>
        </div>
      </header>

      {/* Banner */}
      <section className="flex flex-col items-center mt-8 px-4">
        <img
          src={banner}
          alt="Banner"
          className="w-full max-w-4xl rounded-xl shadow-lg mb-6"
        />

        {/* Welcome Message */}
        <div className="text-center bg-black bg-opacity-60 text-white p-4 rounded-md w-full max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome to Our Dojo
          </h2>
          <p className="text-sm sm:text-base">
            Discipline, Strength, and Respect
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/receipt')}
            className="bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-800 transition-all shadow-md"
          >
            Generate Receipt
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            View Receipt History
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

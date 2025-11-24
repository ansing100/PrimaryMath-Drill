import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <i className="fa-solid fa-calculator text-lg"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">MathGenius AI</h1>
          <p className="text-xs text-gray-500 font-medium">智能口算生成器</p>
        </div>
      </div>
      <a 
        href="https://github.com/google/gemini-api" 
        target="_blank" 
        rel="noreferrer" 
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <i className="fa-brands fa-github text-xl"></i>
      </a>
    </header>
  );
};

export default Header;
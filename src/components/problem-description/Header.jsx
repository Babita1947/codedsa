import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, Shuffle, Play, CheckCircle2, User, X, Search } from 'lucide-react';
import axios from 'axios';
import { problemEndpoints } from '@/services/api';
import { Link, useNavigate } from 'react-router-dom';
import CodeBite from '../../assets/CodeBite.png';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [problem, setProblem] = useState([]);
  const [drawerSearch, setDrawerSearch] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetch_problem = async () => {
    try {
      const response = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
      setProblem(response.data.data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    fetch_problem();
  }, []);

  const handleNavigate = (title, problemId) => {
    setShowSidebar(false);
    navigate(`/problems/${title}`, { state: problemId });
  };

  const handleRandomProblem = () => {
    if (problem.length > 0) {
      const randomIndex = Math.floor(Math.random() * problem.length);
      const randProb = problem[randomIndex];
      navigate(`/problems/${randProb.title}`, { state: randProb._id });
    }
  };

  const filteredProblems = problem.filter((p) =>
    p?.title?.toLowerCase().includes(drawerSearch.toLowerCase()) ||
    p?.topic?.toLowerCase().includes(drawerSearch.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 bg-white dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-[#282828] px-4 py-1.5 text-neutral-800 dark:text-neutral-200 transition-colors">
        <div className="flex items-center justify-between relative h-10">

          {/* Left Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link to="/" className="flex items-center space-x-2 mr-2 group">
              <img src={CodeBite} className="h-7 w-7 rounded-full" alt="Logo" />
              <span className="font-bold text-base text-neutral-900 dark:text-neutral-100 tracking-tight hidden md:inline">
                CodeDSA
              </span>
            </Link>

            <button
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-[#282828] hover:bg-neutral-200 dark:hover:bg-[#333333] rounded-md transition text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-[#383838] cursor-pointer text-xs font-medium select-none"
              onClick={() => setShowSidebar(true)}
              title="Problem List"
            >
              <List className="w-3.5 h-3.5 text-neutral-500" />
              <span>Problem List</span>
            </button>

            {/* Prev / Next & Random buttons */}
            <div className="hidden lg:flex items-center space-x-0.5">
              <button
                onClick={handleRandomProblem}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition cursor-pointer"
                title="Random Problem"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Section (Run / Submit) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2">
            <button className="flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#2c2c2c] dark:hover:bg-[#383838] text-neutral-700 dark:text-neutral-200 border border-neutral-300/80 dark:border-neutral-700 px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer select-none">
              <Play className="w-3 h-3 text-neutral-500 fill-neutral-500" />
              <span>Run</span>
            </button>
            <button className="flex items-center gap-1.5 bg-[#00b8a3] hover:bg-[#00a390] text-white px-3.5 py-1 rounded-md text-xs font-medium transition cursor-pointer select-none shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            {!isAuthenticated ? (
              <div className="flex items-center space-x-1.5 text-xs font-medium">
                <Link
                  to="/signin"
                  className="px-2.5 py-1 bg-neutral-100 dark:bg-[#282828] hover:bg-neutral-200 dark:hover:bg-[#333333] text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-200 dark:border-neutral-700 transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-2.5 py-1 bg-[#00b8a3] hover:bg-[#00a390] text-white rounded-md transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link to="/profile" className="relative group">
                <img
                  className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-600 hover:border-[#00b8a3] transition"
                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  alt="user"
                />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* LeetCode Problem Drawer */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowSidebar(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-50 w-full sm:w-80 md:w-96 bg-white dark:bg-[#202020] h-full shadow-2xl overflow-hidden flex flex-col border-r border-neutral-200 dark:border-[#333333] transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-200 dark:border-[#333333]">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Problem List
              </h2>
              <button
                className="p-1 hover:bg-neutral-100 dark:hover:bg-[#2c2c2c] text-neutral-500 rounded-md transition cursor-pointer"
                onClick={() => setShowSidebar(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search filter */}
            <div className="p-3 border-b border-neutral-200 dark:border-[#333333]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:border-[#00b8a3] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-[#2a2a2a] text-xs">
              {filteredProblems.map((prob, idx) => (
                <div
                  key={prob._id || prob.id || idx}
                  className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-[#282828] cursor-pointer transition-colors flex items-center justify-between gap-2"
                  onClick={() => handleNavigate(prob.title, prob._id)}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      {idx + 1}. {prob.title}
                    </p>
                    {prob.topic && (
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                        {prob.topic}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      prob.difficulty === 'Easy'
                        ? 'text-[#00b8a3] bg-[#00b8a3]/10'
                        : prob.difficulty === 'Medium'
                        ? 'text-[#ffc01e] bg-[#ffc01e]/10'
                        : 'text-[#ff375f] bg-[#ff375f]/10'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>
              ))}
              {filteredProblems.length === 0 && (
                <p className="text-center text-neutral-400 dark:text-neutral-500 py-8 text-xs">
                  No problems found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

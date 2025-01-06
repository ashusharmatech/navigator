import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">NAVigator</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your comprehensive platform for analyzing mutual funds and making informed investment decisions.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                All Funds
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/ashusharmatech/navigator.git" target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/ashusharma31/" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} NAVigator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0b0f17] border-t border-slate-200 dark:border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1 */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              TaskMaster
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The next-generation productivity platform designed to help teams and individuals organize, execute, and track tasks effortlessly.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Product
          </h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Pricing</a></li>
            <li><Link to="/register" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Get Started</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Resources
          </h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Connect
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} TaskMaster Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for modern productivity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

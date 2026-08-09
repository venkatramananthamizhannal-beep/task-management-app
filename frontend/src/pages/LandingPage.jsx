import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  CheckSquare,
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckSquare,
      title: 'Easy Task Management',
      description: 'Create, update, and track tasks with intuitive drag-and-drop clarity and quick actions.',
    },
    {
      icon: Layers,
      title: 'Smart Organization',
      description: 'Group tasks by custom categories, priorities, and color-coded tag systems.',
    },
    {
      icon: BarChart3,
      title: 'Productivity Analytics',
      description: 'Visualize completion trends and metrics with real-time interactive charts.',
    },
    {
      icon: Calendar,
      title: 'Due Date Reminders',
      description: 'Never miss a deadline with automated notifications and calendar integrations.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure JWT Authentication',
      description: 'Enterprise-grade encryption with bcrypt and role-scoped database access.',
    },
    {
      icon: Zap,
      title: 'Real-Time Sync',
      description: 'Instant updates across all device sessions powered by Socket.IO sockets.',
    },
  ];

  const steps = [
    { number: '01', title: 'Create an Account', desc: 'Sign up in seconds and access your personalized productivity workspace.' },
    { number: '02', title: 'Create Your Tasks', desc: 'Add tasks with due dates, priority tags, and detailed notes.' },
    { number: '03', title: 'Organize & Prioritize', desc: 'Filter by priority or custom category to focus on what matters most.' },
    { number: '04', title: 'Complete Your Work', desc: 'Mark tasks completed and receive instant notification milestones.' },
    { number: '05', title: 'Track Your Progress', desc: 'Analyze completion rates and boost your daily workflow.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Glowing backdrop blur */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary-600/20 to-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Task Management SaaS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Organize Your Work.{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Get Things Done.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A simple and powerful task management platform to plan, organize, and track everything that matters—from personal goals to college projects and team deliverables.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg shadow-primary-500/25 transition-all hover:scale-105 active:scale-95 text-base"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-base"
              >
                Live Demo Login
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to Start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card Required
              </span>
            </div>
          </motion.div>

          {/* Right Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
              <div className="bg-white dark:bg-[#131926] rounded-xl p-5 space-y-4">
                {/* Mock Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    app.taskmaster.io/dashboard
                  </span>
                </div>

                {/* Mock Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                    <span className="text-[10px] font-bold uppercase text-indigo-500">
                      Total Tasks
                    </span>
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      24
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-[10px] font-bold uppercase text-emerald-500">
                      Completed
                    </span>
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      14
                    </p>
                  </div>
                </div>

                {/* Mock Task Item */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Complete React SaaS Dashboard
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                    HIGH
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white dark:bg-[#131926]/60 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
              Built with performance, security, and beauty in mind for modern workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            Start organizing your day in 5 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <span className="text-3xl font-black text-primary-500/30 dark:text-primary-400/20">
                {step.number}
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Take Control of Your Tasks?
          </h2>
          <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of students, developers, and professionals managing their projects effortlessly.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-bold shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
          >
            Start Managing Tasks Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Code2, BarChart3, Trophy, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

const features = [
  {
    name: 'Curated Problemset',
    description: 'Hundreds of coding problems covering Arrays, Dynamic Programming, Graphs, Trees, and more, categorized by difficulty.',
    icon: Code2,
    color: 'text-[#00b8a3]',
    bg: 'bg-[#00b8a3]/10',
    border: 'border-[#00b8a3]/20',
  },
  {
    name: 'Progress & Analytics',
    description: 'Track your solved problems, acceptance rates, and submission history in real-time with comprehensive user analytics.',
    icon: BarChart3,
    color: 'text-[#ffc01e]',
    bg: 'bg-[#ffc01e]/10',
    border: 'border-[#ffc01e]/20',
  },
  {
    name: 'Multi-Language Execution',
    description: 'Run and test your code in C++, Java, Python, and JavaScript with fast code execution and real-time verdicts.',
    icon: Zap,
    color: 'text-[#3b82f6]',
    bg: 'bg-[#3b82f6]/10',
    border: 'border-[#3b82f6]/20',
  },
  {
    name: 'AI Problem Assistant',
    description: 'Get contextual hints, edge case analysis, and time-space complexity optimization from your built-in AI tutor.',
    icon: Lightbulb,
    color: 'text-[#ff375f]',
    bg: 'bg-[#ff375f]/10',
    border: 'border-[#ff375f]/20',
  },
];

const Feature = () => {
  return (
    <div className="py-16 sm:py-24 text-neutral-800 dark:text-neutral-200 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#00b8a3]">
            Engineered for DSA Mastery
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Everything you need to crack coding interviews
          </p>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Practice effectively with real interview test cases, multi-language compiler support, and instant feedback.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-16 lg:max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-xl border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#242424] p-6 shadow-xs hover:border-[#00b8a3]/40 transition duration-200"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 border ${feature.border}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {feature.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;

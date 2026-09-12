import React, { useState } from 'react';
import { Tag, Building2, Lightbulb, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

const ProblemDetail = ({ problem }) => {
    const [hintOpen, setHintOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, idx) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full text-neutral-800 dark:text-neutral-200 transition-colors pb-10 font-sans">
            <div className="space-y-5">

                {/* Problem Title */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
                        {problem?.sno ? `${problem.sno}. ` : ''}{problem?.title}
                    </h1>

                    {/* LeetCode Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        {problem?.difficulty && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                problem.difficulty === 'Easy'
                                    ? 'text-[#00b8a3] bg-[#00b8a3]/10'
                                    : problem.difficulty === 'Medium'
                                    ? 'text-[#ffc01e] bg-[#ffc01e]/10'
                                    : 'text-[#ff375f] bg-[#ff375f]/10'
                            }`}>
                                {problem.difficulty}
                            </span>
                        )}

                        {problem?.topic && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] transition cursor-pointer">
                                <Tag size={12} className="opacity-70" />
                                <span>{problem.topic}</span>
                            </span>
                        )}

                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] transition cursor-pointer">
                            <Building2 size={12} className="opacity-70" />
                            <span>Companies</span>
                        </span>

                        <button
                            onClick={() => setHintOpen(!hintOpen)}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] transition cursor-pointer"
                        >
                            <Lightbulb size={12} className="text-amber-500" />
                            <span>Hint</span>
                            {hintOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                        </button>
                    </div>

                    {/* Hint Drawer */}
                    {hintOpen && (
                        <div className="mt-3 p-3.5 rounded-md bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#383838] text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 animate-fadeIn">
                            💡 <span className="font-semibold text-neutral-900 dark:text-neutral-100">Hint:</span> Think about using a hash map for constant time lookups or two pointers to scan through the elements.
                        </div>
                    )}
                </div>

                <div className="h-px bg-neutral-200 dark:bg-[#333333]" />

                {/* Problem Statement */}
                <div className="text-[14px] sm:text-[14.5px] leading-relaxed text-neutral-800 dark:text-neutral-200 whitespace-pre-line space-y-3">
                    {problem?.description}
                </div>

                {/* Examples Section */}
                {problem?.examples?.length > 0 && (
                    <div className="space-y-4 pt-2">
                        {problem.examples.map((ex, idx) => (
                            <div key={ex._id || idx} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                                        Example {idx + 1}:
                                    </p>
                                    <button
                                        onClick={() => handleCopy(`Input: ${ex.input}\nOutput: ${ex.output}`, idx)}
                                        className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 px-2 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-[#333333] transition flex items-center gap-1 cursor-pointer"
                                        title="Copy example"
                                    >
                                        {copiedIndex === idx ? (
                                            <>
                                                <Check size={12} className="text-[#00b8a3]" />
                                                <span className="text-[#00b8a3]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={12} />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="bg-neutral-50 dark:bg-[#202020] border-l-2 border-neutral-300 dark:border-neutral-600 p-3.5 rounded-r-md text-[13px] font-mono leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-1 select-text">
                                    <div>
                                        <strong className="text-neutral-900 dark:text-neutral-100 font-semibold select-none">Input: </strong>
                                        <span>{ex.input}</span>
                                    </div>
                                    <div>
                                        <strong className="text-neutral-900 dark:text-neutral-100 font-semibold select-none">Output: </strong>
                                        <span>{ex.output}</span>
                                    </div>
                                    {ex.explanation && (
                                        <div>
                                            <strong className="text-neutral-900 dark:text-neutral-100 font-semibold select-none">Explanation: </strong>
                                            <span className="font-sans text-neutral-700 dark:text-neutral-300">{ex.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Constraints Section */}
                {problem?.constraints && problem.constraints.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                            Constraints:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-[13px] text-neutral-700 dark:text-neutral-300">
                            {problem.constraints.map((constraint, idx) => (
                                <li key={idx}>
                                    <code className="bg-neutral-100 dark:bg-[#202020] px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-[#383838]">
                                        {constraint}
                                    </code>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDetail;
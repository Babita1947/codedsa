import React, { useEffect, useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const TestCase = ({ examples }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [example, setExample] = useState({});
  const [copied, setCopied] = useState(false);

  const onClickTestCase = (ind) => {
    setActiveIndex(ind);
    setExample(examples[ind]);
  };

  useEffect(() => {
    if (examples?.length > 0) {
      setExample(examples[0]);
    }
  }, [examples]);

  const copyTestCase = () => {
    if (!example) return;
    navigator.clipboard.writeText(`Input: ${example.input}\nOutput: ${example.output}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full p-3 bg-white dark:bg-[#282828] rounded-lg shadow-xs border border-neutral-200 dark:border-[#333333] text-neutral-800 dark:text-neutral-200 transition-colors flex flex-col overflow-hidden font-sans">
      {/* Top Testcase Tabs Header */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-[#333333] pb-2 mb-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <Terminal size={14} className="text-[#00b8a3] mr-0.5 flex-shrink-0" />
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mr-1 select-none hidden sm:inline">
            Testcase
          </span>
          <div className="h-3.5 w-px bg-neutral-200 dark:bg-[#383838] mx-0.5" />
          {examples?.map((_, ind) => (
            <button
              onClick={() => onClickTestCase(ind)}
              key={ind}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer select-none flex-shrink-0 ${
                activeIndex === ind
                  ? "bg-neutral-200 dark:bg-[#383838] text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#303030]"
              }`}
            >
              Case {ind + 1}
            </button>
          ))}
        </div>

        <button
          onClick={copyTestCase}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 px-2 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-[#333333] transition cursor-pointer flex-shrink-0"
        >
          {copied ? (
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

      {/* Case Input / Output Panels */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
        <div>
          <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Input:
          </label>
          <div className="p-2.5 rounded-md bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#383838] text-xs font-mono text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap select-text">
            <code>{example?.input || ""}</code>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Expected Output:
          </label>
          <div className="p-2.5 rounded-md bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#383838] text-xs font-mono text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap select-text">
            <code>{example?.output || ""}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCase;

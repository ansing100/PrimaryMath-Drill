import React from 'react';
import { MathQuestion, GradeLevel, Semester, MathTopic, AppStatus } from '../types';

interface WorksheetProps {
  questions: MathQuestion[];
  grade: GradeLevel;
  semester: Semester;
  topic: MathTopic | null;
  status: AppStatus;
  showAnswers: boolean;
}

const Worksheet: React.FC<WorksheetProps> = ({
  questions,
  grade,
  semester,
  topic,
  status,
  showAnswers
}) => {
  if (status === AppStatus.IDLE) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl text-gray-300">
          <i className="fa-regular fa-file-lines"></i>
        </div>
        <p>请在左侧选择年级与题型，点击生成开始。</p>
      </div>
    );
  }

  if (status === AppStatus.ERROR) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-red-400 p-8">
        <i className="fa-solid fa-circle-exclamation text-4xl mb-4"></i>
        <p>生成失败，请检查网络或API Key后重试。</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-100/50">
      <div className="max-w-4xl mx-auto bg-paper shadow-sm border border-gray-200 min-h-[800px] p-12 relative" id="worksheet-paper">
        
        {/* Paper Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-hand font-bold text-gray-800 mb-2">口算天天练</h1>
            <p className="text-sm text-gray-600 font-sans">
              {grade}年级{semester} · {topic?.name}
            </p>
          </div>
          <div className="text-right">
             <div className="flex gap-4 text-sm text-gray-500 mb-1">
                 <span>日期: ____________</span>
                 <span>用时: ____________</span>
             </div>
             <div className="text-sm text-gray-500">
                 <span>得分: ____________</span>
             </div>
          </div>
        </div>

        {/* Questions Grid */}
        {questions.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 font-hand text-xl text-gray-800">
            {questions.map((q, idx) => (
              <div key={idx} className="flex items-center border-b border-gray-200/50 border-dashed pb-1">
                <span className="text-gray-400 text-sm font-sans w-8 mr-2">{idx + 1}.</span>
                <span className="tracking-wide mr-2">{q.question}</span>
                {showAnswers && (
                  <span className="ml-auto text-red-500 font-bold">{q.answer}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
             // Skeleton loading state
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 animate-pulse">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
            </div>
        )}
        
        {/* Footer */}
        <div className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-300 font-sans">
            MathGenius AI Generated Worksheet
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
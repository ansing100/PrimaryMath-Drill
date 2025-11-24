import React from 'react';
import { GradeLevel, Semester, MathTopic, AppStatus } from '../types';
import { CURRICULUM_DATA } from '../constants';

interface ControlPanelProps {
  grade: GradeLevel;
  setGrade: (g: GradeLevel) => void;
  semester: Semester;
  setSemester: (s: Semester) => void;
  selectedTopic: MathTopic | null;
  setSelectedTopic: (t: MathTopic) => void;
  onGenerate: () => void;
  status: AppStatus;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  grade,
  setGrade,
  semester,
  setSemester,
  selectedTopic,
  setSelectedTopic,
  onGenerate,
  status
}) => {
  
  const currentTopics = CURRICULUM_DATA[grade]?.[semester] || [];

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col h-full overflow-y-auto">
      <h2 className="text-sm uppercase text-gray-400 font-bold mb-6 tracking-wider">设置</h2>

      {/* Grade Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">选择年级</label>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3, 4, 5, 6] as GradeLevel[]).map((g) => (
            <button
              key={g}
              onClick={() => {
                 setGrade(g);
                 // Reset topic when grade changes to avoid mismatch
                 setSelectedTopic(CURRICULUM_DATA[g][semester][0]);
              }}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                grade === g
                  ? 'bg-primary text-white shadow-md shadow-indigo-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {g}年级
            </button>
          ))}
        </div>
      </div>

      {/* Semester Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">选择学期</label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {Object.values(Semester).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSemester(s);
                 // Reset topic when semester changes
                 setSelectedTopic(CURRICULUM_DATA[grade][s][0]);
              }}
              className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                semester === s
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selector */}
      <div className="mb-8 flex-1">
        <label className="block text-sm font-semibold text-gray-700 mb-2">知识点 / 题型</label>
        <div className="space-y-2">
          {currentTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group ${
                selectedTopic?.id === topic.id
                  ? 'border-primary bg-indigo-50/50 ring-1 ring-primary/20'
                  : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedTopic?.id === topic.id ? 'border-primary' : 'border-gray-300 group-hover:border-gray-400'
              }`}>
                  {selectedTopic?.id === topic.id && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <div>
                <div className={`text-sm font-medium ${selectedTopic?.id === topic.id ? 'text-primary' : 'text-gray-700'}`}>
                    {topic.name}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{topic.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onGenerate}
        disabled={status === AppStatus.GENERATING || !selectedTopic}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
          status === AppStatus.GENERATING
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-indigo-600 hover:shadow-indigo-200 active:scale-95'
        }`}
      >
        {status === AppStatus.GENERATING ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            <span>正在生成...</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>生成口算题</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ControlPanel;
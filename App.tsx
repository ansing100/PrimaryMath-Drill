import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import Worksheet from './components/Worksheet';
import { GradeLevel, Semester, MathTopic, MathQuestion, AppStatus } from './types';
import { CURRICULUM_DATA } from './constants';
import { generateQuestions } from './services/geminiService';
import { exportToPDF, exportToWord } from './utils/exportUtils';

const App: React.FC = () => {
  // Config State
  const [grade, setGrade] = useState<GradeLevel>(GradeLevel.ONE);
  const [semester, setSemester] = useState<Semester>(Semester.FIRST);
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);

  // Data State
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  // Initialize Default Topic
  useEffect(() => {
    const defaultTopic = CURRICULUM_DATA[grade][semester][0];
    setSelectedTopic(defaultTopic);
  }, []); // Run once on mount, logic handled in setters for updates

  const handleGenerate = async () => {
    if (!selectedTopic) return;
    
    setStatus(AppStatus.GENERATING);
    setQuestions([]); // Clear previous
    setShowAnswers(false);

    try {
      const result = await generateQuestions(grade, semester, selectedTopic);
      setQuestions(result);
      setStatus(AppStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(AppStatus.ERROR);
    }
  };

  const handleExportPDF = () => {
    if (!selectedTopic || questions.length === 0) return;
    exportToPDF(questions, grade, semester, selectedTopic, showAnswers);
  };

  const handleExportWord = () => {
    if (!selectedTopic || questions.length === 0) return;
    exportToWord(questions, grade, semester, selectedTopic, showAnswers);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <ControlPanel 
          grade={grade}
          setGrade={setGrade}
          semester={semester}
          setSemester={setSemester}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          onGenerate={handleGenerate}
          status={status}
        />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Toolbar for the Worksheet */}
          {status === AppStatus.SUCCESS && (
            <div className="absolute top-4 right-8 z-10 flex gap-2">
              <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm border transition-colors ${
                    showAnswers 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fa-solid ${showAnswers ? 'fa-eye-slash' : 'fa-eye'} mr-2`}></i>
                {showAnswers ? '隐藏答案' : '显示答案'}
              </button>

              <div className="h-9 w-px bg-gray-300 mx-1"></div>

              <button 
                onClick={handleExportPDF}
                className="bg-white border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-file-pdf"></i>
                下载 PDF
              </button>
              <button 
                onClick={handleExportWord}
                className="bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-file-word"></i>
                下载 Word
              </button>
            </div>
          )}

          <Worksheet 
            questions={questions}
            grade={grade}
            semester={semester}
            topic={selectedTopic}
            status={status}
            showAnswers={showAnswers}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
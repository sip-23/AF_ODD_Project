// QuestionnaireLayout.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CorporateGovernanceStructure from '../components/CorporateGovernanceStructure';

const QuestionnaireLayout = () => {
  const { id } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Load completion status and progress
  useEffect(() => {
    const savedCompletion = localStorage.getItem(`questionnaire${id}Completed`);
    const savedProgress = localStorage.getItem(`questionnaire${id}Progress`);
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }
    if (savedProgress) {
      setCurrentProgress(parseInt(savedProgress));
    }
  }, [id]);

  const handleProgressUpdate = (answeredQuestions) => {
    setCurrentProgress(answeredQuestions);
    // Update the global progress for the card view
    const globalProgress = JSON.parse(localStorage.getItem('questionnaireProgress') || '{}');
    globalProgress[id] = answeredQuestions;
    localStorage.setItem('questionnaireProgress', JSON.stringify(globalProgress));
  };

  const handleSaveProgress = () => {
    alert('Progress saved successfully!');
  };

  const handleComplete = () => {
    localStorage.setItem(`questionnaire${id}Completed`, 'true');
    setIsCompleted(true);
    alert('Questionnaire completed successfully!');
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem(`questionnaire${id}Completed`, 'false');
  };

  // Define total questions for each section - UPDATED
  const getTotalQuestions = () => {
    switch (parseInt(id)) {
      case 1: return 10; // Corporate Governance NOW HAS 10 QUESTIONS
      case 2: return 11; // Financials and Audit
      case 3: return 11; // Organisational Structure
      default: return 11;
    }
  };

  // Render different components based on the ID
  const renderQuestionnaire = () => {
    switch (parseInt(id)) {
      case 1:
        return (
          <CorporateGovernanceStructure 
            isCompleted={isCompleted} 
            onProgressUpdate={handleProgressUpdate}
          />
        );
      case 2:
        return <div>Financials and Audit Component - To be implemented</div>;
      case 3:
        return <div>Organisational Structure Component - To be implemented</div>;
      default:
        return <div>Questionnaire not found</div>;
    }
  };

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        {/* Completion Status Banner */}
        {isCompleted && (
          <div className="flex justify-between items-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium flex items-center">
              <span className="mr-2">✓</span>
              This section has been completed and saved to your progress.
            </p>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium"
            >
              Edit
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-800">
              Progress: {currentProgress}/{getTotalQuestions()} questions answered
            </span>
            <span className="text-sm font-semibold text-blue-800">
              {Math.round((currentProgress / getTotalQuestions()) * 100)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentProgress / getTotalQuestions()) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderQuestionnaire()}
      </div>

      {/* Footer with Save and Complete buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSaveProgress}
          className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium"
        >
          Save Progress
        </button>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className="px-6 py-2 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          style={{ 
            backgroundColor: !isCompleted ? '#158087' : '#9CA3AF',
            cursor: !isCompleted ? 'pointer' : 'not-allowed'
          }}
        >
          {isCompleted ? (
            <>
              <span className="mr-2">✓</span>
              Completed
            </>
          ) : (
            'Mark as Completed'
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireLayout;
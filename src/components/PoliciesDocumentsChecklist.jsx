import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PoliciesDocumentsChecklist = () => {
  const navigate = useNavigate();
  const [checkboxes, setCheckboxes] = useState({
    doc1: false,
    doc2: false,
    doc3: false,
    doc4: false,
    doc5: false,
    doc6: false,
    doc7: false,
    doc8: false,
    doc9: false,
    doc10: false,
    doc11: false,
    doc12: false,
    doc13: false,
    doc14: false,
    doc15: false,
    doc16: false,
    doc17: false,
    doc18: false,
    doc19: false,
    doc20: false,
    doc21: false,
    doc22: false,
    doc23: false,
    doc24: false,
    doc25: false,
    doc26: false,
    doc27: false,
    doc28: false,
    doc29: false,
    doc30: false,
    doc31: false,
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Check if all checkboxes are ticked
  const allChecked = Object.values(checkboxes).every(Boolean);

  // Load saved progress and completion status from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('policiesDocumentsProgress');
    const savedCompletion = localStorage.getItem('policiesDocumentsCompleted');
    
    if (savedProgress) {
      setCheckboxes(JSON.parse(savedProgress));
    }
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }
  }, []);

  // Update completion status when all checkboxes are checked OR unchecked
  useEffect(() => {
    if (allChecked) {
      localStorage.setItem('policiesDocumentsCompleted', 'true');
      setIsCompleted(true);
    } else {
      // If not all checked, remove completion status
      localStorage.setItem('policiesDocumentsCompleted', 'false');
      setIsCompleted(false);
    }
  }, [allChecked]);

  const handleCheckboxChange = (key) => {
    setCheckboxes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveProgress = () => {
    localStorage.setItem('policiesDocumentsProgress', JSON.stringify(checkboxes));
    alert('Progress saved successfully!');
  };

  const handleEdit = () => {
    // Enable editing by removing completion status
    localStorage.setItem('policiesDocumentsCompleted', 'false');
    setIsCompleted(false);
  };

  const handleComplete = () => {
    if (allChecked) {
      localStorage.setItem('policiesDocumentsCompleted', 'true');
      setIsCompleted(true);
      alert('Section completed successfully!');
      // You can navigate to next section or show success message
    }
  };

  const checkboxItems = [
    { id: 'doc1', label: 'Completed company and/or fund ODD questionnaire' },
    { id: 'doc2', label: 'Company registration documents' },
    { id: 'doc3', label: 'Tax clearance certificate' },
    { id: 'doc4', label: 'Latest B-BBEE certificate' },
    { id: 'doc5', label: 'All insurance certificates' },
    { id: 'doc6', label: 'Proof of the appointment and approval of your compliance officer/s by the Regulator' },
    { id: 'doc7', label: `FSCA approval number or relevant regulatory authority licence details including approved FSCA categories (for advisory and intermediary services)` },
    { id: 'doc8', label: 'Details of any additional regulatory licences or registrations held in jurisdictions outside South Africa' },
    { id: 'doc9', label: `Compliance manual and Code of Ethics (including conflicts of interest policy, personal account trading policy, gifts and inducements policy and privacy policy)` },
    { id: 'doc10', label: 'Organisational chart with staff in each department' },
    { id: 'doc11', label: 'Client take-on procedures, including anti-money laundering and know-your-client policies' },
    { id: 'doc12', label: 'Operations policies and procedures.' },
    { id: 'doc13', label: 'Actuarial report (Life company)' },
    { id: 'doc14', label: 'Approved broker, dealer, ISDA and other counterparty list' },
    { id: 'doc15', label: 'Audited financial statements for the applicable pooled vehicles for the past three years' },
    { id: 'doc16', label: 'Audited financial statements for the company for the past two years' },
    { id: 'doc17', label: 'Authorised trader list (including any limits that apply to certain people)' },
    { id: 'doc18', label: 'Business continuity and disaster recovery policies and test results' },
    { id: 'doc19', label: 'Best execution policy' },
    { id: 'doc20', label: 'Breaches and complaints log' },
    { id: 'doc21', label: 'Broker selection policy' },
    { id: 'doc22', label: 'Complaints policy' },
    { id: 'doc23', label: 'Counterparty exposure' },
    { id: 'doc24', label: 'Investment allocation policy' },
    { id: 'doc25', label: 'IT policies and procedures, including data protection, data security, cyber security and change management' },
    { id: 'doc26', label: 'Operational risk management policy and plan/matrix' },
    { id: 'doc27', label: 'Softing dollar policy' },
    { id: 'doc28', label: 'Trade error policy' },
    { id: 'doc29', label: 'Offering documents for the applicable pooled vehicles' },
    { id: 'doc30', label: 'Most recent fund factsheet(s) for the applicable pooled vehicles' },
    { id: 'doc31', label: `Provide the most recent two years internal controls reviews of the investment manager (such as the SSAE 16/ISAE 3402 / AAF 01/06 / GS007 or any procedures you've agreed upon)` },
  ];

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Policies & Documents Checklist</h1>
        
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
        
        <p className="text-gray-600 mb-8">
          Please include copies of the following documents as early in the process as possible:
        </p>
        
        <div className="space-y-4">
          {checkboxItems.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center p-4 border rounded-lg transition-colors ${
                checkboxes[item.id] 
                  ? 'border-[#158087] bg-[#f0f9fa]' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                id={item.id}
                checked={checkboxes[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
                disabled={isCompleted}
                className="h-5 w-5 text-[#158087] border-gray-300 rounded focus:ring-[#158087] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label 
                htmlFor={item.id}
                className={`ml-3 block w-[85%] text-sm font-medium cursor-pointer ${
                  checkboxes[item.id] ? 'text-[#158087]' : 'text-gray-700'
                } ${isCompleted ? 'opacity-70' : ''}`}
              >
                {item.label}
                {checkboxes[item.id] && (
                  <span className="ml-6 text-green-500 text-xs">✓ Completed</span>
                )}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg">
          <p className="text-sm text-[#158087]">
            <strong>Note:</strong> All documents must be reviewed and acknowledged before proceeding. 
            Your progress will be saved automatically when you click the Save button.
            {isCompleted && " This section has been marked as completed."}
          </p>
        </div>
      </div>

      {/* Footer with Save and Complete buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSaveProgress}
          className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:opacity-50 transition-colors font-medium"
        >
          Save Progress
        </button>
        
        <button
          onClick={handleComplete}
          disabled={!allChecked || isCompleted}
          className="px-6 py-2 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          style={{ 
            backgroundColor: (allChecked && !isCompleted) ? '#158087' : '#9CA3AF',
            cursor: (allChecked && !isCompleted) ? 'pointer' : 'not-allowed'
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

export default PoliciesDocumentsChecklist;
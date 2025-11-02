import { useState, useEffect } from "react";

const Declaration = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    position: '',
    contactNumber: '',
    emailAddress: '',
    confirmation: false,
    date: '',
    signature: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('declarationData');
    const savedCompletion = localStorage.getItem('declarationCompleted');
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProgress = () => {
    localStorage.setItem('declarationData', JSON.stringify(formData));
    alert('Declaration progress saved successfully!');
  };

  const handleComplete = () => {
    // Validate required fields
    const requiredFields = ['name', 'surname', 'position', 'contactNumber', 'emailAddress', 'date', 'signature'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '') && formData.confirmation;

    if (isValid) {
      localStorage.setItem('declarationCompleted', 'true');
      localStorage.setItem('declarationData', JSON.stringify(formData));
      setIsCompleted(true);
      alert('Declaration submitted successfully!');
    } else {
      alert('Please fill in all required fields and confirm the declaration before submitting.');
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem('declarationCompleted', 'false');
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Declaration</h1>
        
        {/* Completion Status Banner */}
        {isCompleted && (
          <div className="flex justify-between items-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium flex items-center">
              <span className="mr-2">✓</span>
              Declaration has been completed and submitted.
            </p>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium"
            >
              Edit Declaration
            </button>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6 text-[#158087] border-b pb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surname *
                  </label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter your surname"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter your position"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Declaration Confirmation */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6 text-[#158087] border-b pb-2">
                Declaration Statement
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 text-lg font-medium italic text-center">
                  "I confirm that the information provided in this questionnaire is true and accurate."
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="confirmation"
                  checked={formData.confirmation}
                  onChange={(e) => {
                    if (!isCompleted) {
                      handleInputChange('confirmation', e.target.checked);
                    }
                  }}
                  disabled={isCompleted}
                  className="mt-1 h-5 w-5 text-[#158087] border-gray-300 rounded focus:ring-[#158087] disabled:opacity-50"
                />
                <div>
                  <label 
                    htmlFor="confirmation" 
                    className={`block text-sm font-medium cursor-pointer ${
                      isCompleted ? 'opacity-70' : ''
                    }`}
                  >
                    I hereby confirm and agree to the above declaration statement.
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    By checking this box, you confirm that all information provided is true and accurate to the best of your knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Date and Signature */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-6 text-[#158087] border-b pb-2">
                Final Confirmation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date || getCurrentDate()}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature *
                  </label>
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100 font-signature"
                    placeholder="Type your full name as signature"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Type your full name to serve as your digital signature
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700 text-sm">
                By submitting this declaration, you acknowledge that all information provided throughout this entire questionnaire is complete, accurate, and truthful to the best of your knowledge. Any misrepresentation may result in consequences as per applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Save and Complete buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSaveProgress}
          disabled={isCompleted}
          className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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
              Declaration Submitted
            </>
          ) : (
            'Submit Declaration'
          )}
        </button>
      </div>
    </div>
  );
};

export default Declaration;
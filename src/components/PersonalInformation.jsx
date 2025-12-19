import { useState, useEffect } from "react";

const PersonalInformation = () => {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    contactNumber: '',
    email: '',
    designation: '',
    date: '',
    signature: ''
  });

  // Load saved status from localStorage
  useEffect(() => {
    const savedAcknowledgment = localStorage.getItem('personalInformationAcknowledged');
    const savedCompletion = localStorage.getItem('personalInformationCompleted');
    const savedContactInfo = localStorage.getItem('personalContactInformation');
    
    if (savedAcknowledgment === 'true') {
      setIsAcknowledged(true);
    }
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }

    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo));
    }
  }, []);

  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAcknowledge = () => {
    // Validate contact info if acknowledgment is checked
    if (isAcknowledged) {
      const requiredFields = ['name', 'contactNumber', 'email', 'designation', 'date', 'signature'];
      const isContactInfoValid = requiredFields.every(field => 
        contactInfo[field] && contactInfo[field].trim() !== ''
      );

      if (!isContactInfoValid) {
        alert('Please fill in all key contact information fields before completing this section.');
        return;
      }
    }

    localStorage.setItem('personalInformationAcknowledged', 'true');
    localStorage.setItem('personalInformationCompleted', 'true');
    localStorage.setItem('personalContactInformation', JSON.stringify(contactInfo));
    setIsAcknowledged(true);
    setIsCompleted(true);
    alert('Acknowledgement saved successfully!');
  };

  const handleEdit = () => {
    localStorage.setItem('personalInformationCompleted', 'false');
    setIsCompleted(false);
  };

  const handleSaveProgress = () => {
    localStorage.setItem('personalInformationAcknowledged', isAcknowledged.toString());
    localStorage.setItem('personalContactInformation', JSON.stringify(contactInfo));
    alert('Progress saved successfully!');
  };

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Personal Information, Privacy and Security</h1>
        
        {/* Completion Status Banner */}
        {isCompleted && (
          <div className="flex justify-between items-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <p className="text-green-700 font-medium flex items-center">
                <span className="mr-2">✓</span>
                This section has been completed and saved to your progress.
              </p>
              <p className="text-green-600 text-sm mt-1">
                Contact information provided by: {contactInfo.name}
              </p>
            </div>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium"
            >
              Edit
            </button>
          </div>
        )}

        <div className="space-y-6">
          {/* Introduction Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4">
              We take data protection seriously. We comply with legislation that protects data and personal information like the
              <strong className="text-[#158087]"> Protection of Personal Information Act</strong>.
            </p>
            <p className="text-gray-700">
              By signing this document, you confirm that you have the necessary permission to provide us with personal or
              special information about other people or children if required.
            </p>
          </div>

          {/* Data Usage Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">
              We will keep your personal information or share it with third parties to:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#158087] mr-3 mt-1">•</span>
                <span className="text-gray-700">
                  act on your instructions for as long as we, or the fund, need to
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#158087] mr-3 mt-1">•</span>
                <span className="text-gray-700">
                  comply with any law that requires it
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#158087] mr-3 mt-1">•</span>
                <span className="text-gray-700">
                  communicate with you about our services and products where appropriate
                </span>
              </li>
            </ul>
          </div>

          {/* Data Retention Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">
              Once we no longer have a need or legal basis to keep your personal information, we will:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="bg-[#158087] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  ✓
                </div>
                <span className="text-gray-700 font-medium w-[85%]">Delete it</span>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="bg-[#158087] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  ✓
                </div>
                <span className="text-gray-700 font-medium w-[85%]">
                  Remove the personal information that identifies you
                </span>
              </div>
            </div>
          </div>

          {/* Key Contact Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Key Contact Information</h2>
            <p className="text-gray-600 mb-6">
              Please provide your contact information and signature to acknowledge the privacy and security policy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name and surname *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => handleContactInfoChange('name', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact number *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.contactNumber}
                    onChange={(e) => handleContactInfoChange('contactNumber', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation or role *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.designation}
                    onChange={(e) => handleContactInfoChange('designation', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="e.g., Compliance Officer, Director"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={contactInfo.date}
                    onChange={(e) => handleContactInfoChange('date', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Signature *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.signature}
                    onChange={(e) => handleContactInfoChange('signature', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100 italic"
                    placeholder="Type your full name as signature"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    By typing your full name, you agree that this constitutes your electronic signature.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Summary of provided information */}
            {contactInfo.name && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Information Summary:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <div className="font-medium">{contactInfo.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <div className="font-medium">{contactInfo.designation}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <div className="font-medium">{contactInfo.date}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4">
              Please contact us using the details provided to update or correct your personal information.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Complaints Process</h3>
              <p className="text-yellow-700 text-sm mb-3">
                If you believe that we have not complied with data protection laws in handling your personal information, please
                undertake to resolve any concerns with us. If you are not satisfied with the outcome of this process, you may lodge
                a complaint with the Information Regulator using the complaints email address:
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium text-yellow-800 w-20">Website:</span>
                  <a 
                    href="https://www.justice.gov.za/inforeg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#158087] hover:underline"
                  >
                    https://www.justice.gov.za/inforeg
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-yellow-800 w-20">Email:</span>
                  <a 
                    href="mailto:POPIAComplaints@inforegulator.org.za"
                    className="text-[#158087] hover:underline"
                  >
                    POPIAComplaints@inforegulator.org.za
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acknowledge"
                checked={isAcknowledged}
                onChange={(e) => {
                  if (!isCompleted) {
                    setIsAcknowledged(e.target.checked);
                  }
                }}
                disabled={isCompleted}
                className="mt-1 h-5 w-5 text-[#158087] border-gray-300 rounded focus:ring-[#158087] disabled:opacity-50"
              />
              <div>
                <label 
                  htmlFor="acknowledge" 
                  className={`block text-sm font-medium cursor-pointer ${
                    isCompleted ? 'opacity-70' : ''
                  }`}
                >
                  I acknowledge that I have read and understood the Personal Information, Privacy and Security policy above.
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  By checking this box, you confirm your understanding of how we handle and protect your personal information.
                </p>
                <p className="text-xs text-red-500 mt-2">
                  * All contact information fields must be completed before acknowledgment.
                </p>
              </div>
            </div>
          </div>
        </div>
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
          onClick={handleAcknowledge}
          disabled={!isAcknowledged || isCompleted}
          className="px-6 py-2 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          style={{ 
            backgroundColor: (isAcknowledged && !isCompleted) ? '#158087' : '#9CA3AF',
            cursor: (isAcknowledged && !isCompleted) ? 'pointer' : 'not-allowed'
          }}
        >
          {isCompleted ? (
            <>
              <span className="mr-2">✓</span>
              Acknowledged
            </>
          ) : (
            'Confirm Acknowledgement'
          )}
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
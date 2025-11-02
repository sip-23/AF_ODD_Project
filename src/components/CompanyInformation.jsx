import { useState, useEffect } from "react";

const CompanyInformation = () => {
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    registrationNumber: '',
    taxNumber: '',
    companyType: '',
    dateOfIncorporation: '',
    jurisdiction: '',
    
    // Contact Information
    physicalAddress: '',
    postalAddress: '',
    telephone: '',
    email: '',
    website: '',
    
    // Directors/Trustees Information
    directors: [''],
    
    // Shareholding Structure
    shareholders: [{ name: '', percentage: '' }],
    
    // Regulatory Information
    fscaLicenseNumber: '',
    fscaCategories: '',
    otherLicenses: '',
    
    // Financial Information
    financialYearEnd: '',
    auditorName: '',
    auditorContact: '',
    
    // Banking Information
    bankName: '',
    accountNumber: '',
    branchCode: '',
    accountName: '',
    
    // Compliance Information
    complianceOfficerName: '',
    complianceOfficerEmail: '',
    complianceOfficerPhone: '',
  });

  const [licensedEntities, setLicensedEntities] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('companyInformationData');
    const savedEntities = localStorage.getItem('companyInformationEntities');
    const savedCompletion = localStorage.getItem('companyInformationCompleted');
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    if (savedEntities) {
      setLicensedEntities(JSON.parse(savedEntities));
    }
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (section, index, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], '']
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleShareholderChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.map((shareholder, i) => 
        i === index ? { ...shareholder, [field]: value } : shareholder
      )
    }));
  };

  const addShareholder = () => {
    setFormData(prev => ({
      ...prev,
      shareholders: [...prev.shareholders, { name: '', percentage: '' }]
    }));
  };

  const removeShareholder = (index) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.filter((_, i) => i !== index)
    }));
  };

  // Licensed Entities Functions
  const addLicensedEntity = () => {
    const newEntity = {
      id: Date.now(),
      licensedEntity: '',
      fspNumber: '',
      registrationNumber: '',
      dateOfInception: '',
    };
    setLicensedEntities(prev => [...prev, newEntity]);
  };

  const updateLicensedEntity = (id, field, value) => {
    setLicensedEntities(prev =>
      prev.map(entity =>
        entity.id === id ? { ...entity, [field]: value } : entity
      )
    );
  };

  const removeLicensedEntity = (id) => {
    setLicensedEntities(prev => prev.filter(entity => entity.id !== id));
  };

  const clearAllLicensedEntities = () => {
    if (window.confirm('Are you sure you want to remove all licensed entities?')) {
      setLicensedEntities([]);
    }
  };

  const handleSaveProgress = () => {
    localStorage.setItem('companyInformationData', JSON.stringify(formData));
    localStorage.setItem('companyInformationEntities', JSON.stringify(licensedEntities));
    alert('Company information saved successfully!');
  };

  const handleComplete = () => {
    // Basic validation - check required fields
    const requiredFields = [
      'companyName', 'registrationNumber', 'taxNumber', 'companyType',
      'physicalAddress', 'telephone', 'email', 'fscaLicenseNumber'
    ];
    
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');
    
    // Validate licensed entities (at least one complete entity is required)
    const hasValidEntities = licensedEntities.length > 0 && 
      licensedEntities.every(entity => 
        entity.licensedEntity.trim() !== '' && 
        entity.fspNumber.trim() !== '' && 
        entity.registrationNumber.trim() !== '' && 
        entity.dateOfInception.trim() !== ''
      );
    
    if (isFormValid && hasValidEntities) {
      localStorage.setItem('companyInformationCompleted', 'true');
      localStorage.setItem('companyInformationData', JSON.stringify(formData));
      localStorage.setItem('companyInformationEntities', JSON.stringify(licensedEntities));
      setIsCompleted(true);
      alert('Company information completed successfully!');
    } else {
      if (!isFormValid) {
        alert('Please fill in all required company information fields before completing this section.');
      } else if (!hasValidEntities) {
        alert('Please add at least one licensed entity and fill in all fields for each entity.');
      }
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem('companyInformationCompleted', 'false');
  };

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Company Information</h1>
        
        {/* Completion Status Banner */}
        {isCompleted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium flex items-center">
              <span className="mr-2">✓</span>
              Company information has been completed and saved.
            </p>
            <button
              onClick={handleEdit}
              className="mt-2 px-4 py-2 bg-[#158087] text-white rounded-lg hover:bg-[#0f444c] transition-colors text-sm"
            >
              Edit Information
            </button>
          </div>
        )}

        <div className="space-y-8">
          {/* Company Details Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyDetails', 'companyName', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('companyDetails', 'registrationNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Number *
                </label>
                <input
                  type="text"
                  value={formData.taxNumber}
                  onChange={(e) => handleInputChange('companyDetails', 'taxNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Type *
                </label>
                <select
                  value={formData.companyType}
                  onChange={(e) => handleInputChange('companyDetails', 'companyType', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                >
                  <option value="">Select Company Type</option>
                  <option value="Pty Ltd">Private Company (Pty Ltd)</option>
                  <option value="Public">Public Company</option>
                  <option value="Trust">Trust</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Incorporation
                </label>
                <input
                  type="date"
                  value={formData.dateOfIncorporation}
                  onChange={(e) => handleInputChange('companyDetails', 'dateOfIncorporation', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurisdiction
                </label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => handleInputChange('companyDetails', 'jurisdiction', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="e.g., South Africa"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Address *
                </label>
                <textarea
                  value={formData.physicalAddress}
                  onChange={(e) => handleInputChange('contactInfo', 'physicalAddress', e.target.value)}
                  disabled={isCompleted}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Address
                </label>
                <textarea
                  value={formData.postalAddress}
                  onChange={(e) => handleInputChange('contactInfo', 'postalAddress', e.target.value)}
                  disabled={isCompleted}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telephone *
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('contactInfo', 'telephone', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('contactInfo', 'website', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Directors/Trustees Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Directors/Trustees</h2>
            {formData.directors.map((director, index) => (
              <div key={index} className="flex gap-4 mb-3">
                <input
                  type="text"
                  value={director}
                  onChange={(e) => handleArrayChange('directors', index, e.target.value)}
                  disabled={isCompleted}
                  placeholder="Full name of director/trustee"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
                {!isCompleted && formData.directors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('directors', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {!isCompleted && (
              <button
                type="button"
                onClick={() => addArrayItem('directors')}
                className="px-4 py-2 bg-[#158087] text-white rounded-md hover:bg-[#0f444c]"
              >
                Add Director/Trustee
              </button>
            )}
          </div>

          {/* Shareholding Structure */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Shareholding Structure</h2>
            {formData.shareholders.map((shareholder, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border border-gray-100 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shareholder Name
                  </label>
                  <input
                    type="text"
                    value={shareholder.name}
                    onChange={(e) => handleShareholderChange(index, 'name', e.target.value)}
                    disabled={isCompleted}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={shareholder.percentage}
                    onChange={(e) => handleShareholderChange(index, 'percentage', e.target.value)}
                    disabled={isCompleted}
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
                {!isCompleted && formData.shareholders.length > 1 && (
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeShareholder(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!isCompleted && (
              <button
                type="button"
                onClick={addShareholder}
                className="px-4 py-2 bg-[#158087] text-white rounded-md hover:bg-[#0f444c]"
              >
                Add Shareholder
              </button>
            )}
          </div>

          {/* Licensed Entities Table Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#158087]">Licensed Entities</h2>
              {licensedEntities.length > 0 && !isCompleted && (
                <button
                  onClick={clearAllLicensedEntities}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-[#0f444c] text-white font-semibold">
                <div className="col-span-4">Licensed Entity</div>
                <div className="col-span-2">FSP Number</div>
                <div className="col-span-3">Registration Number</div>
                <div className="col-span-2">Date of Inception</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {licensedEntities.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No licensed entities added yet. Click "Add Entity" to get started.
                  </div>
                ) : (
                  licensedEntities.map((entity) => (
                    <div
                      key={entity.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Licensed Entity */}
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={entity.licensedEntity}
                          onChange={(e) => updateLicensedEntity(entity.id, 'licensedEntity', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Enter licensed entity name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* FSP Number */}
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={entity.fspNumber}
                          onChange={(e) => updateLicensedEntity(entity.id, 'fspNumber', e.target.value)}
                          disabled={isCompleted}
                          placeholder="FSP number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Registration Number */}
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={entity.registrationNumber}
                          onChange={(e) => updateLicensedEntity(entity.id, 'registrationNumber', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Registration number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Date of Inception */}
                      <div className="col-span-2">
                        <input
                          type="date"
                          value={entity.dateOfInception}
                          onChange={(e) => updateLicensedEntity(entity.id, 'dateOfInception', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex justify-center">
                        {!isCompleted && (
                          <button
                            onClick={() => removeLicensedEntity(entity.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            title="Remove entity"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Entity Button */}
            {!isCompleted && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={addLicensedEntity}
                  className="px-6 py-3 bg-[#158087] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Entity
                </button>
              </div>
            )}

            {/* Summary Statistics */}
            {licensedEntities.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">{licensedEntities.length}</div>
                    <div className="text-gray-600">Total Entities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">
                      {licensedEntities.filter(e => e.licensedEntity && e.fspNumber && e.registrationNumber && e.dateOfInception).length}
                    </div>
                    <div className="text-gray-600">Complete Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">
                      {licensedEntities.filter(e => !e.licensedEntity || !e.fspNumber || !e.registrationNumber || !e.dateOfInception).length}
                    </div>
                    <div className="text-gray-600">Incomplete Records</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Regulatory Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Regulatory Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FSCA License Number *
                </label>
                <input
                  type="text"
                  value={formData.fscaLicenseNumber}
                  onChange={(e) => handleInputChange('regulatory', 'fscaLicenseNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FSCA Approved Categories *
                </label>
                <input
                  type="text"
                  value={formData.fscaCategories}
                  onChange={(e) => handleInputChange('regulatory', 'fscaCategories', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="e.g., Category I, II, etc."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Regulatory Licenses
                </label>
                <textarea
                  value={formData.otherLicenses}
                  onChange={(e) => handleInputChange('regulatory', 'otherLicenses', e.target.value)}
                  disabled={isCompleted}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="List any other regulatory licenses held in other jurisdictions"
                />
              </div>
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

export default CompanyInformation;
import { useState, useEffect } from "react";

const CompanyInformation2 = () => {
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    companyType: '',
    physicalAddress: '',
    postalAddress: '',
    jurisdiction: '',
    docimile: '',
    website: '',
    registrationNumber: '',
    dateOfRegistration: '',
    licensedEntities: '',
    fscaLicenseNumber: '',
    dateOfRegApproval: '',
    taxNumber: '',
    financialYearEnd: '',
    bbbeeStatus: '',
    
    // Total company assets under management:
    mostRecentAuM: '',
    auM12MonthsAgo: '',
    auM24MonthsAgo: '',
    auM36MonthsAgo: '',
    
    // Total company AuM split:
    institutional: '',
    retail: '',
    other: '',

    // Total company AuM split (2):
    cis: '',
    lifePooled: '',
    segragated: '',

    // Number of funds:
    cisFund: '',
    lifePooledFund: '',
    segragatedFund: '',

    // Total insurance cover & provider/broker:
    professionalIndemnity: '',
    fedility: '',
    directorsAndOfficersLiability: '',
    cyberCrime: '',
    eAndO: '',
    OtherSpecify: '',
    
    // Auditor Information
    auditorCompanyName: '',
    auditorDateOfAppointment: '',
    
    // Key third-party service providers:
    Admin: '',
    Brokers: '',
    compliance: '',
    Legal: '',
    Mancos: '',
    Technology: '',
    others: '',

    // regulators
    regulatorsNames: ['', ''], 

    // Custodians
    custodians: '',

    // Total employees
    totalEmployees: '',

    // Additional fields from original example
    telephone: '',
    email: '',
    dateOfIncorporation: '',
    fscaCategories: '',
    otherLicenses: '',
  });

  const [licensedEntitiesList, setLicensedEntitiesList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('companyInformation2Data');
    const savedEntities = localStorage.getItem('companyInformation2Entities');
    const savedCompletion = localStorage.getItem('companyInformation2Completed');
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    if (savedEntities) {
      setLicensedEntitiesList(JSON.parse(savedEntities));
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

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
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
    setLicensedEntitiesList(prev => [...prev, newEntity]);
  };

  const updateLicensedEntity = (id, field, value) => {
    setLicensedEntitiesList(prev =>
      prev.map(entity =>
        entity.id === id ? { ...entity, [field]: value } : entity
      )
    );
  };

  const removeLicensedEntity = (id) => {
    setLicensedEntitiesList(prev => prev.filter(entity => entity.id !== id));
  };

  const clearAllLicensedEntities = () => {
    if (window.confirm('Are you sure you want to remove all licensed entities?')) {
      setLicensedEntitiesList([]);
    }
  };

  const handleSaveProgress = () => {
    localStorage.setItem('companyInformation2Data', JSON.stringify(formData));
    localStorage.setItem('companyInformation2Entities', JSON.stringify(licensedEntitiesList));
    alert('Company information saved successfully!');
  };

  const handleComplete = () => {
    // Basic validation - check required fields
    const requiredFields = [
      'companyName', 'registrationNumber', 'taxNumber', 'companyType',
      'physicalAddress', 'telephone', 'email', 'fscaLicenseNumber'
    ];
    
    const isFormValid = requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
    
    // Validate licensed entities (optional)
    const hasValidEntities = licensedEntitiesList.length === 0 || 
      licensedEntitiesList.every(entity => 
        entity.licensedEntity.trim() !== '' && 
        entity.fspNumber.trim() !== '' && 
        entity.registrationNumber.trim() !== '' && 
        entity.dateOfInception.trim() !== ''
      );
    
    if (isFormValid && hasValidEntities) {
      localStorage.setItem('companyInformation2Completed', 'true');
      localStorage.setItem('companyInformation2Data', JSON.stringify(formData));
      localStorage.setItem('companyInformation2Entities', JSON.stringify(licensedEntitiesList));
      setIsCompleted(true);
      alert('Company information completed successfully!');
    } else {
      if (!isFormValid) {
        alert('Please fill in all required company information fields before completing this section.');
      } else if (!hasValidEntities) {
        alert('Please ensure all licensed entities have complete information or remove incomplete ones.');
      }
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem('companyInformation2Completed', 'false');
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
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
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
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
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
                  Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
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
                  onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Registration
                </label>
                <input
                  type="date"
                  value={formData.dateOfRegistration}
                  onChange={(e) => handleInputChange('dateOfRegistration', e.target.value)}
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
                  onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="e.g., South Africa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Docimile
                </label>
                <input
                  type="text"
                  value={formData.docimile}
                  onChange={(e) => handleInputChange('docimile', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financial Year End
                </label>
                <input
                  type="text"
                  value={formData.financialYearEnd}
                  onChange={(e) => handleInputChange('financialYearEnd', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="e.g., 31 December"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  B-BBEE Status
                </label>
                <select
                  value={formData.bbbeeStatus}
                  onChange={(e) => handleInputChange('bbbeeStatus', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                >
                  <option value="">Select B-BBEE Status</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Level 4">Level 4</option>
                  <option value="Level 5">Level 5</option>
                  <option value="Non-Compliant">Non-Compliant</option>
                  <option value="Exempt">Exempt</option>
                </select>
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
                  onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
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
                  onChange={(e) => handleInputChange('postalAddress', e.target.value)}
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
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Assets Under Management Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Total Company Assets Under Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Most Recent AuM (ZAR)
                </label>
                <input
                  type="number"
                  value={formData.mostRecentAuM}
                  onChange={(e) => handleInputChange('mostRecentAuM', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  12 Months Ago (ZAR)
                </label>
                <input
                  type="number"
                  value={formData.auM12MonthsAgo}
                  onChange={(e) => handleInputChange('auM12MonthsAgo', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  24 Months Ago (ZAR)
                </label>
                <input
                  type="number"
                  value={formData.auM24MonthsAgo}
                  onChange={(e) => handleInputChange('auM24MonthsAgo', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  36 Months Ago (ZAR)
                </label>
                <input
                  type="number"
                  value={formData.auM36MonthsAgo}
                  onChange={(e) => handleInputChange('auM36MonthsAgo', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-4 text-[#0f444c]">Total Company AuM Split by Client Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institutional (%)
                </label>
                <input
                  type="number"
                  value={formData.institutional}
                  onChange={(e) => handleInputChange('institutional', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Retail (%)
                </label>
                <input
                  type="number"
                  value={formData.retail}
                  onChange={(e) => handleInputChange('retail', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other (%)
                </label>
                <input
                  type="number"
                  value={formData.other}
                  onChange={(e) => handleInputChange('other', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-4 text-[#0f444c]">Total Company AuM Split by Fund Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CIS (%)
                </label>
                <input
                  type="number"
                  value={formData.cis}
                  onChange={(e) => handleInputChange('cis', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Life Pooled (%)
                </label>
                <input
                  type="number"
                  value={formData.lifePooled}
                  onChange={(e) => handleInputChange('lifePooled', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segregated (%)
                </label>
                <input
                  type="number"
                  value={formData.segragated}
                  onChange={(e) => handleInputChange('segragated', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-4 text-[#0f444c]">Number of Funds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CIS Funds
                </label>
                <input
                  type="number"
                  value={formData.cisFund}
                  onChange={(e) => handleInputChange('cisFund', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Life Pooled Funds
                </label>
                <input
                  type="number"
                  value={formData.lifePooledFund}
                  onChange={(e) => handleInputChange('lifePooledFund', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segregated Funds
                </label>
                <input
                  type="number"
                  value={formData.segragatedFund}
                  onChange={(e) => handleInputChange('segragatedFund', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Insurance Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Total Insurance Cover & Provider/Broker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Cover Amount (ZAR)
                </label>
                <input
                  type="number"
                  value={formData.insuranceCover}
                  onChange={(e) => handleInputChange('insuranceCover', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Indemnity
                </label>
                <input
                  type="text"
                  value={formData.professionalIndemnity}
                  onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fedility
                </label>
                <input
                  type="text"
                  value={formData.fedility}
                  onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Directors And Officers Liability
                </label>
                <input
                  type="text"
                  value={formData.directorsAndOfficersLiability}
                  onChange={(e) => handleInputChange('insuranceBroker', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cybercrime
                </label>
                <input
                  type="text"
                  value={formData.cyberCrime}
                  onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Error And Ommisions
                </label>
                <input
                  type="text"
                  value={formData.eAndO}
                  onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other (specify)
                </label>
                <input
                  type="text"
                  value={formData.OtherSpecify}
                  onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Auditor Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Auditor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auditor Company Name
                </label>
                <input
                  type="text"
                  value={formData.auditorCompanyName}
                  onChange={(e) => handleInputChange('auditorCompanyName', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Appointment
                </label>
                <input
                  type="date"
                  value={formData.auditorDateOfAppointment}
                  onChange={(e) => handleInputChange('auditorDateOfAppointment', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Third-Party Service Providers */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Key Third-Party Service Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Administrator
                </label>
                <input
                  type="text"
                  value={formData.Admin}
                  onChange={(e) => handleInputChange('Admin', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brokers
                </label>
                <input
                  type="text"
                  value={formData.Brokers}
                  onChange={(e) => handleInputChange('Brokers', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compliance
                </label>
                <input
                  type="text"
                  value={formData.compliance}
                  onChange={(e) => handleInputChange('compliance', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legal
                </label>
                <input
                  type="text"
                  value={formData.Legal}
                  onChange={(e) => handleInputChange('Legal', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ManCos
                </label>
                <input
                  type="text"
                  value={formData.Mancos}
                  onChange={(e) => handleInputChange('Mancos', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technology
                </label>
                <input
                  type="text"
                  value={formData.Technology}
                  onChange={(e) => handleInputChange('Technology', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Others
                </label>
                <textarea
                  value={formData.others}
                  onChange={(e) => handleInputChange('others', e.target.value)}
                  disabled={isCompleted}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="List any other key service providers"
                />
              </div>
            </div>
          </div>

          {/* Regulators */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Regulators</h2>
            {formData.regulatorsNames.map((regulator, index) => (
              <div key={index} className="flex gap-4 mb-3">
                <input
                  type="text"
                  value={regulator}
                  onChange={(e) => handleArrayChange('regulatorsNames', index, e.target.value)}
                  disabled={isCompleted}
                  placeholder="Regulator name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
                {!isCompleted && formData.regulatorsNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('regulatorsNames', index)}
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
                onClick={() => addArrayItem('regulatorsNames')}
                className="px-4 py-2 bg-[#158087] text-white rounded-md hover:bg-[#0f444c]"
              >
                Add Regulator
              </button>
            )}
          </div>

          {/* Custodians */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Custodians</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custodian(s)
              </label>
              <textarea
                value={formData.custodians}
                onChange={(e) => handleInputChange('custodians', e.target.value)}
                disabled={isCompleted}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                placeholder="List your custodians"
              />
            </div>
          </div>

          {/* Total Employees */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">Total Employees</h2>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Employees
              </label>
              <input
                type="number"
                value={formData.totalEmployees}
                onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
                disabled={isCompleted}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                min="0"
              />
            </div>
          </div>

          {/* Licensed Entities Table Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#158087]">Licensed Entities</h2>
              {licensedEntitiesList.length > 0 && !isCompleted && (
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
                {licensedEntitiesList.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No licensed entities added yet. Click "Add Entity" to get started.
                  </div>
                ) : (
                  licensedEntitiesList.map((entity) => (
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
            {licensedEntitiesList.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">{licensedEntitiesList.length}</div>
                    <div className="text-gray-600">Total Entities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">
                      {licensedEntitiesList.filter(e => e.licensedEntity && e.fspNumber && e.registrationNumber && e.dateOfInception).length}
                    </div>
                    <div className="text-gray-600">Complete Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#158087]">
                      {licensedEntitiesList.filter(e => !e.licensedEntity || !e.fspNumber || !e.registrationNumber || !e.dateOfInception).length}
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
                  onChange={(e) => handleInputChange('fscaLicenseNumber', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Registration Approval
                </label>
                <input
                  type="date"
                  value={formData.dateOfRegApproval}
                  onChange={(e) => handleInputChange('dateOfRegApproval', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FSCA Approved Categories
                </label>
                <input
                  type="text"
                  value={formData.fscaCategories}
                  onChange={(e) => handleInputChange('fscaCategories', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="e.g., Category I, II, etc."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Regulatory Licenses
                </label>
                <textarea
                  value={formData.otherLicenses}
                  onChange={(e) => handleInputChange('otherLicenses', e.target.value)}
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

export default CompanyInformation2;
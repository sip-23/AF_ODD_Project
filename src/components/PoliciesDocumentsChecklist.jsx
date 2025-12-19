import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PoliciesDocumentsChecklist = () => {
  const navigate = useNavigate();
  
  // Define all document categories exactly as specified
  const documentCategories = [
    {
      id: 'bbbee',
      label: 'B-BBEE certificate',
      status: '',
      files: []
    },
    {
      id: 'dueDiligence',
      label: 'Completed company and/or fund Due Diligence Questionnaire',
      status: '',
      files: []
    },
    {
      id: 'amlQuestionnaire',
      label: 'Completed company AML Questionnaire',
      status: '',
      files: []
    },
    {
      id: 'registrationDocs',
      label: 'Company registration document/s',
      status: '',
      files: []
    },
    {
      id: 'nameChange',
      label: 'Company name change or ownership change (if any) document',
      status: '',
      files: []
    },
    {
      id: 'shareholderInfo',
      label: 'Company shareholder information',
      status: '',
      files: []
    },
    {
      id: 'shareholderPercentage',
      label: 'Individual shareholder percentage direct and via trust',
      status: '',
      files: []
    },
    {
      id: 'orgChart',
      label: 'Organisational chart with staff in each department',
      status: '',
      files: []
    },
    // Financials and audit section
    {
      id: 'companyFinancials',
      label: 'Audited financial statement for the company (past 3 years)',
      status: '',
      files: []
    },
    {
      id: 'fundFinancials',
      label: 'Audited financial statement for the fund/pooled vehicle (past 3 years)',
      status: '',
      files: []
    },
    {
      id: 'taxClearance',
      label: 'Tax clearance certificate',
      status: '',
      files: []
    },
    {
      id: 'auditLetter',
      label: 'ISAE 3402 / SSAE 16 / AAF 01/06 / GS007 / SOC 2 audit letter or any procedures agreed upon (past 3 years)',
      status: '',
      files: []
    },
    // Committee ToRs section
    {
      id: 'auditRiskCompliance',
      label: 'Term of reference (ToR) for Audit, Risk, and Compliance Committee',
      status: '',
      files: []
    },
    {
      id: 'boardCharter',
      label: 'Board Charter or Board ToR',
      status: '',
      files: []
    },
    {
      id: 'deiTransformation',
      label: 'Term of reference (ToR) for Diversity, Equity & Inclusion/Transformation Committee',
      status: '',
      files: []
    },
    {
      id: 'investmentCommittee',
      label: 'Term of reference (ToR) for Investment Committee',
      status: '',
      files: []
    },
    {
      id: 'operationsManagement',
      label: 'Term of reference (ToR) for Operations/Management Committee',
      status: '',
      files: []
    },
    {
      id: 'remunerationCommittee',
      label: 'Term of reference (ToR) for Remuneration Committee',
      status: '',
      files: []
    },
    {
      id: 'valuationCommittee',
      label: 'Term of reference (ToR) for Valuation Committee',
      status: '',
      files: []
    },
    {
      id: 'otherCommittees',
      label: 'Term of reference (ToR) for Other Committees (specify)',
      status: '',
      files: []
    },
    // Insurance certificates section
    {
      id: 'cybercrimeInsurance',
      label: 'Insurance certificate - Cybercrime',
      status: '',
      files: []
    },
    {
      id: 'directorsOfficersInsurance',
      label: 'Insurance certificate - Directors & Officers Liability',
      status: '',
      files: []
    },
    {
      id: 'fidelityInsurance',
      label: 'Insurance certificate - Fidelity',
      status: '',
      files: []
    },
    {
      id: 'professionalIndemnityInsurance',
      label: 'Insurance certificate - Professional indemnity',
      status: '',
      files: []
    },
    {
      id: 'otherInsurance',
      label: 'Insurance certificate - Other (specify)',
      status: '',
      files: []
    },
    // Regulatory authority license details section
    {
      id: 'categoryLicenses',
      label: 'Regulatory authority license details - Category License/s',
      status: '',
      files: []
    },
    {
      id: 'complianceOfficerProof',
      label: 'Regulatory authority license details - Compliance Officer proof',
      status: '',
      files: []
    },
    {
      id: 'keyIndividualsReps',
      label: 'Regulatory authority license details - Key Individuals & Representatives',
      status: '',
      files: []
    },
    {
      id: 'regulatoryLicenseJurisdiction',
      label: 'Regulatory authority license details - Regulatory License per jurisdiction',
      status: '',
      files: []
    },
    // Compliance policies and procedures section
    {
      id: 'amlPolicy',
      label: 'Compliance policy - Anti-money laundering',
      status: '',
      files: []
    },
    {
      id: 'antiBriberyCorruption',
      label: 'Compliance policy - Anti-bribery and anti-corruption',
      status: '',
      files: []
    },
    {
      id: 'codeOfEthics',
      label: 'Compliance policy - Code of ethics',
      status: '',
      files: []
    },
    {
      id: 'conflictOfInterest',
      label: 'Compliance policy - Conflict of interest',
      status: '',
      files: []
    },
    {
      id: 'debarmentPolicy',
      label: 'Compliance policy - Debarment',
      status: '',
      files: []
    },
    {
      id: 'fatcaPolicy',
      label: 'Compliance policy - Foreign Account Tax Compliance (FATCA)',
      status: '',
      files: []
    },
    {
      id: 'fitAndProper',
      label: 'Compliance policy - Fit and proper',
      status: '',
      files: []
    },
    {
      id: 'giftsInducements',
      label: 'Compliance policy - Gifts and inducements',
      status: '',
      files: []
    },
    {
      id: 'marketConduct',
      label: 'Compliance policy - Market conduct policy/framework',
      status: '',
      files: []
    },
    {
      id: 'outsourcingProcurement',
      label: 'Compliance policy - Outsourcing/procurement framework/policy',
      status: '',
      files: []
    },
    {
      id: 'personalAccountTrading',
      label: 'Compliance policy - Personal account trading',
      status: '',
      files: []
    },
    {
      id: 'privacyDataProtection',
      label: 'Compliance policy - Privacy/data protection',
      status: '',
      files: []
    },
    {
      id: 'materialNonPublicInfo',
      label: 'Compliance policy - Receipt of material non-public information',
      status: '',
      files: []
    },
    {
      id: 'rmcp',
      label: 'Compliance policy - Risk Management & Compliance Program (RMCP)',
      status: '',
      files: []
    },
    {
      id: 'tcf',
      label: 'Compliance policy - Market Conduct/Treating Customers Fairly (TCF)',
      status: '',
      files: []
    },
    {
      id: 'marketingAdvertising',
      label: 'Compliance policy - Marketing and Advertising',
      status: '',
      files: []
    },
    // Operations policies and procedures section
    {
      id: 'operationsPolicies',
      label: 'Operations policies and procedures',
      status: '',
      files: []
    },
    {
      id: 'actuarialReport',
      label: 'Actuarial report (Life company)',
      status: '',
      files: []
    },
    {
      id: 'approvedCounterpartyList',
      label: 'Approved broker, dealer, ISDA, and other counterparty list',
      status: '',
      files: []
    },
    {
      id: 'authorisedTraderList',
      label: 'Authorised trader list',
      status: '',
      files: []
    },
    {
      id: 'bestExecution',
      label: 'Best execution policy',
      status: '',
      files: []
    },
    {
      id: 'breachesComplaintsLog',
      label: 'Breaches and complaints log',
      status: '',
      files: []
    },
    {
      id: 'brokerSelection',
      label: 'Broker selection policy',
      status: '',
      files: []
    },
    {
      id: 'collateralManagement',
      label: 'Collateral management procedures',
      status: '',
      files: []
    },
    {
      id: 'confirmationSettlement',
      label: 'Confirmation and settlement procedures',
      status: '',
      files: []
    },
    {
      id: 'counterpartyExposure',
      label: 'Counterparty exposure policy',
      status: '',
      files: []
    },
    {
      id: 'investmentAllocation',
      label: 'Investment allocation policy',
      status: '',
      files: []
    },
    {
      id: 'approvedBrokersList',
      label: 'List of approved brokers',
      status: '',
      files: []
    },
    {
      id: 'mddFactSheet',
      label: 'MDD or Fund Fact Sheet',
      status: '',
      files: []
    },
    {
      id: 'navCalculation',
      label: 'NAV calculation process',
      status: '',
      files: []
    },
    {
      id: 'pricingValuation',
      label: 'Pricing and valuation policy and procedures',
      status: '',
      files: []
    },
    {
      id: 'proxyVotingCorporateActions',
      label: 'Proxy voting and corporate action procedures',
      status: '',
      files: []
    },
    {
      id: 'reconciliationProcedures',
      label: 'Reconciliation procedures',
      status: '',
      files: []
    },
    {
      id: 'sustainabilityFramework',
      label: 'Sustainability framework/policy',
      status: '',
      files: []
    },
    {
      id: 'tradeAllocation',
      label: 'Trade allocation policy',
      status: '',
      files: []
    },
    {
      id: 'tradeErrorPolicy',
      label: 'Trade error policy',
      status: '',
      files: []
    },
    // Risk Control section
    {
      id: 'riskControl',
      label: 'Risk Control',
      status: '',
      files: []
    },
    {
      id: 'incidentManagement',
      label: 'Incident management process',
      status: '',
      files: []
    },
    {
      id: 'riskManagementFramework',
      label: 'Risk management framework/policy',
      status: '',
      files: []
    },
    {
      id: 'riskRegister',
      label: 'Risk register',
      status: '',
      files: []
    },
    {
      id: 'riskMatrix',
      label: 'Risk matrix',
      status: '',
      files: []
    },
    // Business Continuity and IT policies & procedures section
    {
      id: 'businessContinuityIT',
      label: 'Business Continuity and IT policies & procedures',
      status: '',
      files: []
    },
    {
      id: 'bcDrPolicy',
      label: 'BC & DR policy',
      status: '',
      files: []
    },
    {
      id: 'bcDrTestResults',
      label: 'BC & DR latest test results',
      status: '',
      files: []
    },
    {
      id: 'byodPolicy',
      label: 'Bring your own device (BYOD) policy',
      status: '',
      files: []
    },
    {
      id: 'changeManagement',
      label: 'Change management policy/procedure',
      status: '',
      files: []
    },
    {
      id: 'cybersecurity',
      label: 'Cybersecurity policy/framework',
      status: '',
      files: []
    },
    {
      id: 'cyberIncidentResponse',
      label: 'Cyber incident management/response plan',
      status: '',
      files: []
    },
    {
      id: 'dataSecurity',
      label: 'Data security policy',
      status: '',
      files: []
    },
    {
      id: 'hybridWorkPolicy',
      label: 'Hybrid/work-from-home policy',
      status: '',
      files: []
    }
  ];

  // Initialize state with all categories
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('policiesDocumentsData');
    return saved ? JSON.parse(saved) : documentCategories;
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress and completion status from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('policiesDocumentsData');
    const savedCompletion = localStorage.getItem('policiesDocumentsCompleted');
    
    if (savedData) {
      setDocuments(JSON.parse(savedData));
    }
    
    if (savedCompletion === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const handleStatusChange = (id, status) => {
    setDocuments(prev => {
      const updated = prev.map(doc => 
        doc.id === id ? { ...doc, status } : doc
      );
      
      // If changing from Yes to another status, clear files
      if (status !== 'yes') {
        const docIndex = updated.findIndex(d => d.id === id);
        if (docIndex !== -1) {
          updated[docIndex].files = [];
        }
      }
      
      return updated;
    });
  };

  const handleFileUpload = (id, fileList) => {
    if (fileList && fileList.length > 0) {
      const files = Array.from(fileList).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        uploadDate: new Date().toISOString()
      }));
      
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === id ? { ...doc, files: [...doc.files, ...files] } : doc
        )
      );
    }
  };

  const handleRemoveFile = (docId, fileId) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId
          ? { ...doc, files: doc.files.filter(f => f.id !== fileId) }
          : doc
      )
    );
  };

  const handleSaveProgress = () => {
    localStorage.setItem('policiesDocumentsData', JSON.stringify(documents));
    alert('Progress saved successfully!');
  };

  const handleComplete = () => {
    // Check if all required items have a status selected
    const allHaveStatus = documents.every(doc => doc.status !== '');
    
    if (allHaveStatus) {
      localStorage.setItem('policiesDocumentsCompleted', 'true');
      localStorage.setItem('policiesDocumentsData', JSON.stringify(documents));
      setIsCompleted(true);
      alert('Checklist completed successfully!');
    } else {
      alert('Please select a status for all documents before completing.');
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem('policiesDocumentsCompleted', 'false');
  };

  // Calculate statistics
  const completedCount = documents.filter(doc => doc.status === 'yes').length;
  const notApplicableCount = documents.filter(doc => doc.status === 'na').length;
  const pendingCount = documents.filter(doc => doc.status === 'no').length;
  const totalFiles = documents.reduce((sum, doc) => sum + doc.files.length, 0);

  // Group documents by category for better organization
  const groupedDocuments = {
    'Company Information': documents.slice(0, 8),
    'Financials and Audit': documents.slice(8, 12),
    'Committee Terms of Reference': documents.slice(12, 20),
    'Insurance Certificates': documents.slice(20, 25),
    'Regulatory Licenses': documents.slice(25, 29),
    'Compliance Policies': documents.slice(29, 45),
    'Operations Policies': documents.slice(45, 66),
    'Risk Control': documents.slice(66, 71),
    'Business Continuity & IT': documents.slice(71)
  };

  const sectionTitles = Object.keys(groupedDocuments);

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-2">Policies & Documents Checklist</h1>
        <p className="text-gray-600 mb-6">
          Please include copies of the following documents as early in the process as possible:
        </p>
        
        {/* Completion Status Banner */}
        {isCompleted && (
          <div className="flex justify-between items-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <p className="text-green-700 font-medium flex items-center">
                <span className="mr-2">✓</span>
                This section has been completed and saved to your progress.
              </p>
              <p className="text-green-600 text-sm mt-1">
                {completedCount} documents marked for upload, {notApplicableCount} not applicable
              </p>
            </div>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#0f444c] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium"
            >
              Edit Checklist
            </button>
          </div>
        )}

        {/* Statistics Summary */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-[#158087]">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">To Upload</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{notApplicableCount}</div>
            <div className="text-sm text-gray-600">Not Applicable</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{totalFiles}</div>
            <div className="text-sm text-gray-600">Files Uploaded</div>
          </div>
        </div>

        {/* Documents List by Section */}
        <div className="space-y-8">
          {sectionTitles.map((sectionTitle, sectionIndex) => (
            <div key={sectionTitle} className="space-y-4">
              <h2 className="text-lg font-semibold text-[#158087] border-b pb-2">
                {sectionTitle}
              </h2>
              
              {groupedDocuments[sectionTitle].map((doc) => (
                <div 
                  key={doc.id}
                  className={`bg-white p-6 rounded-lg border ${
                    doc.status === 'yes' ? 'border-[#158087]' : 
                    doc.status === 'no' ? 'border-gray-300' :
                    doc.status === 'na' ? 'border-blue-200' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.label}</h3>
                    </div>
                    
                    <div className="flex space-x-4 mt-2 md:mt-0">
                      {/* Yes Option */}
                      <label className={`inline-flex items-center cursor-pointer ${isCompleted ? 'opacity-50' : ''}`}>
                        <input
                          type="radio"
                          name={`status-${doc.id}`}
                          value="yes"
                          checked={doc.status === 'yes'}
                          onChange={() => !isCompleted && handleStatusChange(doc.id, 'yes')}
                          disabled={isCompleted}
                          className="h-4 w-4 text-[#158087] border-gray-300 focus:ring-[#158087]"
                        />
                        <span className={`ml-2 ${doc.status === 'yes' ? 'text-[#158087] font-medium' : 'text-gray-700'}`}>
                          Yes
                        </span>
                      </label>
                      
                      {/* No Option */}
                      <label className={`inline-flex items-center cursor-pointer ${isCompleted ? 'opacity-50' : ''}`}>
                        <input
                          type="radio"
                          name={`status-${doc.id}`}
                          value="no"
                          checked={doc.status === 'no'}
                          onChange={() => !isCompleted && handleStatusChange(doc.id, 'no')}
                          disabled={isCompleted}
                          className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                        />
                        <span className={`ml-2 ${doc.status === 'no' ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>
                          No
                        </span>
                      </label>
                      
                      {/* Not Applicable Option */}
                      <label className={`inline-flex items-center cursor-pointer ${isCompleted ? 'opacity-50' : ''}`}>
                        <input
                          type="radio"
                          name={`status-${doc.id}`}
                          value="na"
                          checked={doc.status === 'na'}
                          onChange={() => !isCompleted && handleStatusChange(doc.id, 'na')}
                          disabled={isCompleted}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className={`ml-2 ${doc.status === 'na' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                          N/A
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* File Upload Section (only shows when Yes is selected) */}
                  {doc.status === 'yes' && !isCompleted && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Upload required documents ({doc.files.length} files uploaded)
                        </h4>
                        <div className="relative">
                          <input
                            type="file"
                            id={`file-upload-${doc.id}`}
                            onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                            multiple
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                          />
                          <label
                            htmlFor={`file-upload-${doc.id}`}
                            className="px-4 py-2 bg-[#158087] text-white rounded-md hover:bg-[#0f444c] transition-colors text-sm cursor-pointer flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Add Files
                          </label>
                        </div>
                      </div>
                      
                      {/* Uploaded Files List */}
                      {doc.files.length > 0 ? (
                        <div className="space-y-2">
                          {doc.files.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div>
                                  <div className="text-sm text-gray-700">{file.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB • Uploaded
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveFile(doc.id, file.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No files uploaded yet. Click "Add Files" to upload.</p>
                      )}
                      
                      <div className="mt-3 text-xs text-gray-500">
                        Accepted formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB each)
                      </div>
                    </div>
                  )}

                  {/* Read-only view for uploaded files when completed */}
                  {doc.status === 'yes' && isCompleted && doc.files.length > 0 && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Uploaded documents ({doc.files.length})
                      </h4>
                      <div className="space-y-2">
                        {doc.files.map((file) => (
                          <div key={file.id} className="flex items-center p-2 bg-white rounded border">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <div className="text-sm text-gray-700">{file.name}</div>
                              <div className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status indicators */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        {doc.status === 'yes' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Documents required
                          </span>
                        )}
                        {doc.status === 'no' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not required
                          </span>
                        )}
                        {doc.status === 'na' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Not applicable
                          </span>
                        )}
                      </div>
                      {doc.files.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {doc.files.length} file{doc.files.length !== 1 ? 's' : ''} uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-[#0f444c] font-medium mb-2">Instructions:</p>
          <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
            <li>Select <span className="font-medium text-[#158087]">"Yes"</span> if the document is required and available for upload</li>
            <li>Select <span className="font-medium text-gray-700">"No"</span> if the document is not required</li>
            <li>Select <span className="font-medium text-blue-600">"N/A"</span> if the document is not applicable to your organization</li>
            <li>When selecting "Yes", you will be able to upload the required documents</li>
            <li>All items must have a status selected before you can complete this section</li>
            <li>Documents are grouped by category for easier navigation</li>
          </ul>
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
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {documents.filter(d => d.status !== '').length} of {documents.length} items completed
          </div>
          <button
            onClick={handleComplete}
            disabled={documents.some(d => d.status === '') || isCompleted}
            className="px-6 py-2 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            style={{ 
              backgroundColor: (!documents.some(d => d.status === '') && !isCompleted) ? '#158087' : '#9CA3AF',
              cursor: (!documents.some(d => d.status === '') && !isCompleted) ? 'pointer' : 'not-allowed'
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
    </div>
  );
};

export default PoliciesDocumentsChecklist;
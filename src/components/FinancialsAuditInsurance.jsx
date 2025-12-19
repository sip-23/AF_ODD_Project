import { useState, useEffect } from "react";

const FinancialsAuditInsurance = () => {
  const [formData, setFormData] = useState({
    // 2.1 Financial Statements
    latestFinancialYearEnd: '',
    previousFinancialYearEnd: '',
    
    // Balance Sheet - Latest
    totalAssetsLatest: '',
    cashLatest: '',
    currentAssetsExcludingCashLatest: '',
    intangibleAssetsLatest: '',
    nonCurrentAssetsExcludingIntangibleLatest: '',
    totalLiabilitiesLatest: '',
    currentLiabilitiesLatest: '',
    longTermLiabilitiesLatest: '',
    
    // Balance Sheet - Previous
    totalAssetsPrevious: '',
    cashPrevious: '',
    currentAssetsExcludingCashPrevious: '',
    intangibleAssetsPrevious: '',
    nonCurrentAssetsExcludingIntangiblePrevious: '',
    totalLiabilitiesPrevious: '',
    currentLiabilitiesPrevious: '',
    longTermLiabilitiesPrevious: '',
    
    // Balance Sheet Comments
    totalAssetsComment: '',
    cashComment: '',
    currentAssetsComment: '',
    intangibleAssetsComment: '',
    nonCurrentAssetsComment: '',
    totalLiabilitiesComment: '',
    currentLiabilitiesComment: '',
    longTermLiabilitiesComment: '',
    
    // Income Statement - Latest
    revenueLatest: '',
    operatingExpensesLatest: '',
    profitBeforeTaxLatest: '',
    profitAfterTaxLatest: '',
    
    // Income Statement - Previous
    revenuePrevious: '',
    operatingExpensesPrevious: '',
    profitBeforeTaxPrevious: '',
    profitAfterTaxPrevious: '',
    
    // Income Statement Comments
    revenueComment: '',
    operatingExpensesComment: '',
    profitBeforeTaxComment: '',
    profitAfterTaxComment: '',
    
    // 2.2 Top 5 Investors
    topInvestors: [
      { id: 1, name: 'Investor A', rands: '', percentage: '' },
      { id: 2, name: 'Investor B', rands: '', percentage: '' },
      { id: 3, name: 'Investor C', rands: '', percentage: '' },
      { id: 4, name: 'Investor D', rands: '', percentage: '' },
      { id: 5, name: 'Investor E', rands: '', percentage: '' }
    ],
    
    // 2.3 - 2.9
    debtorsOver90DaysPercentage: '',
    debtorsAsPercentageOfRevenue: '',
    dividendsDeclared: 'no',
    dividendsValue: '',
    newBorrowing: 'no',
    newBorrowingDetails: '',
    solvencyRatioGreaterThanOne: '',
    currentRatioGreaterThanOne: '',
    fitAndProperCompliance: '',
    
    // 2.10 Compliance Officer Letter
    complianceOfficerLetter: null,
    
    // Audit Section 2.11-2.19
    currentAuditors: '',
    auditorTenure: '',
    plansToChangeAuditors: 'no',
    changeAuditorsDetails: '',
    lastAuditPartnerRotation: '',
    qualifiedOpinionPastThreeYears: 'no',
    qualifiedOpinionDetails: '',
    internalAuditorFunction: '',
    internalAuditProcess: '',
    internalControlReviewFrequency: '',
    internalControlReviewYearEndDate: '',
    internalControlQualifications: 'no',
    qualificationsDetails: '',
    mostRecentInternalControlsReview: null,
    licenseLimitations: 'no',
    licenseLimitationsDetails: '',
    
    // Insurance Section 2.20-2.27
    insuranceDocuments: [],
    
    // Insurance Policies
    insurancePolicies: [
      { id: 1, insurer: '', cover: '', amount: '', excess: '', details: '' },
      { id: 2, insurer: '', cover: '', amount: '', excess: '', details: '' },
      { id: 3, insurer: '', cover: '', amount: '', excess: '', details: '' }
    ],
    
    // Additional fields
    piCoverPercentage: '',
    adequateCover: '',
    totalAnnualAggregateLimit: '',
    capitalBacking: '',
    
    // Claims history
    piClaims: '',
    fidelityClaims: '',
    cybercrimeClaims: '',
    
    // 2.26 Incidents
    incidentsPast36Months: 'no',
    incidentsDetails: '',
    
    // 2.27 Insurance losses/profits
    largestInsuranceLoss1: '',
    largestInsuranceLoss2: '',
    futureCircumstances: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('financialsAuditInsuranceData');
    const savedCompletion = localStorage.getItem('financialsAuditInsuranceCompleted');
    
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

  const handleTopInvestorChange = (index, field, value) => {
    const updatedInvestors = formData.topInvestors.map((investor, i) => 
      i === index ? { ...investor, [field]: value } : investor
    );
    
    // Calculate total percentage
    if (field === 'percentage') {
      const totalPercentage = updatedInvestors.reduce((sum, inv) => {
        const percent = parseFloat(inv.percentage) || 0;
        return sum + percent;
      }, 0);
      
      // Update total in the last row
      if (index === 4) { // Investor E
        const totalRands = updatedInvestors.reduce((sum, inv) => {
          const rands = parseFloat(inv.rands) || 0;
          return sum + rands;
        }, 0);
        
        const lastInvestor = updatedInvestors[4];
        updatedInvestors[4] = {
          ...lastInvestor,
          rands: totalRands.toString(),
          percentage: totalPercentage.toFixed(2)
        };
      }
    }
    
    setFormData(prev => ({
      ...prev,
      topInvestors: updatedInvestors
    }));
  };

  const addInsurancePolicy = () => {
    const newPolicy = {
      id: Date.now(),
      insurer: '',
      cover: '',
      amount: '',
      excess: '',
      details: ''
    };
    setFormData(prev => ({
      ...prev,
      insurancePolicies: [...prev.insurancePolicies, newPolicy]
    }));
  };

  const updateInsurancePolicy = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      insurancePolicies: prev.insurancePolicies.map(policy =>
        policy.id === id ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const removeInsurancePolicy = (id) => {
    if (formData.insurancePolicies.length > 1) {
      setFormData(prev => ({
        ...prev,
        insurancePolicies: prev.insurancePolicies.filter(policy => policy.id !== id)
      }));
    }
  };

  const handleFileUpload = (field, files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: {
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
          }
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFileUpload = (files) => {
    if (files && files.length > 0) {
      const newDocuments = Array.from(files).map(file => {
        const reader = new FileReader();
        
        return new Promise((resolve) => {
          reader.onload = (e) => {
            resolve({
              id: Date.now(),
              name: file.name,
              size: file.size,
              type: file.type,
              data: e.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newDocuments).then(documents => {
        setFormData(prev => ({
          ...prev,
          insuranceDocuments: [...prev.insuranceDocuments, ...documents]
        }));
      });
    }
  };

  const removeFile = (field, index) => {
    if (field === 'insuranceDocuments') {
      setFormData(prev => ({
        ...prev,
        insuranceDocuments: prev.insuranceDocuments.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const calculateTotals = () => {
    const totalRands = formData.topInvestors.reduce((sum, investor) => {
      return sum + (parseFloat(investor.rands) || 0);
    }, 0);
    
    const totalPercentage = formData.topInvestors.reduce((sum, investor) => {
      return sum + (parseFloat(investor.percentage) || 0);
    }, 0);
    
    return { totalRands, totalPercentage };
  };

  const handleSaveProgress = () => {
    localStorage.setItem('financialsAuditInsuranceData', JSON.stringify(formData));
    alert('Progress saved successfully!');
  };

  const handleComplete = () => {
    // Basic validation for required fields
    const requiredFields = [
      'latestFinancialYearEnd',
      'previousFinancialYearEnd',
      'totalAssetsLatest',
      'totalLiabilitiesLatest',
      'currentAuditors'
    ];
    
    const isFormValid = requiredFields.every(field => 
      formData[field] && formData[field].toString().trim() !== ''
    );
    
    // Validate top investors (at least one should have data)
    const hasInvestorData = formData.topInvestors.some(investor => 
      investor.rands.trim() !== '' || investor.percentage.trim() !== ''
    );
    
    if (isFormValid && hasInvestorData) {
      localStorage.setItem('financialsAuditInsuranceCompleted', 'true');
      localStorage.setItem('financialsAuditInsuranceData', JSON.stringify(formData));
      setIsCompleted(true);
      alert('Financials, Audit & Insurance section completed successfully!');
    } else {
      if (!isFormValid) {
        alert('Please fill in all required fields before completing this section.');
      } else if (!hasInvestorData) {
        alert('Please provide data for at least one top investor.');
      }
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    localStorage.setItem('financialsAuditInsuranceCompleted', 'false');
  };

  const { totalRands, totalPercentage } = calculateTotals();

  return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Financials, Audit & Insurance</h1>

        <div className="space-y-8">
          {/* Section 2.1: Financial Statements */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">2.1 Financial Statements</h2>
            
            {/* Financial Year Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  As at your latest financial year end *
                </label>
                <input
                  type="date"
                  value={formData.latestFinancialYearEnd}
                  onChange={(e) => handleInputChange('latestFinancialYearEnd', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  As at your previous financial year end *
                </label>
                <input
                  type="date"
                  value={formData.previousFinancialYearEnd}
                  onChange={(e) => handleInputChange('previousFinancialYearEnd', e.target.value)}
                  disabled={isCompleted}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  required
                />
              </div>
            </div>

            {/* Balance Sheet Table */}
            <div className="mb-8">
              <h3 className="text-md font-semibold mb-3 text-[#0f444c]">Balance Sheet</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        As at latest financial year end
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        As at previous financial year end
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Total assets */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Total assets *</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.totalAssetsLatest}
                          onChange={(e) => handleInputChange('totalAssetsLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.totalAssetsPrevious}
                          onChange={(e) => handleInputChange('totalAssetsPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.totalAssetsComment}
                          onChange={(e) => handleInputChange('totalAssetsComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          placeholder="Add comment if needed"
                        />
                      </td>
                    </tr>
                    
                    {/* Cash */}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Cash</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.cashLatest}
                          onChange={(e) => handleInputChange('cashLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.cashPrevious}
                          onChange={(e) => handleInputChange('cashPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.cashComment}
                          onChange={(e) => handleInputChange('cashComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Current assets (excluding cash) */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Current assets (excluding cash)</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.currentAssetsExcludingCashLatest}
                          onChange={(e) => handleInputChange('currentAssetsExcludingCashLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.currentAssetsExcludingCashPrevious}
                          onChange={(e) => handleInputChange('currentAssetsExcludingCashPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.currentAssetsComment}
                          onChange={(e) => handleInputChange('currentAssetsComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Intangible assets */}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Intangible assets</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.intangibleAssetsLatest}
                          onChange={(e) => handleInputChange('intangibleAssetsLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.intangibleAssetsPrevious}
                          onChange={(e) => handleInputChange('intangibleAssetsPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.intangibleAssetsComment}
                          onChange={(e) => handleInputChange('intangibleAssetsComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Non-current assets (excluding intangible assets) */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Non-current assets (excluding intangible assets)</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.nonCurrentAssetsExcludingIntangibleLatest}
                          onChange={(e) => handleInputChange('nonCurrentAssetsExcludingIntangibleLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.nonCurrentAssetsExcludingIntangiblePrevious}
                          onChange={(e) => handleInputChange('nonCurrentAssetsExcludingIntangiblePrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.nonCurrentAssetsComment}
                          onChange={(e) => handleInputChange('nonCurrentAssetsComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Total liabilities */}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Total liabilities *</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.totalLiabilitiesLatest}
                          onChange={(e) => handleInputChange('totalLiabilitiesLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          required
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.totalLiabilitiesPrevious}
                          onChange={(e) => handleInputChange('totalLiabilitiesPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.totalLiabilitiesComment}
                          onChange={(e) => handleInputChange('totalLiabilitiesComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Current liabilities */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Current liabilities</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.currentLiabilitiesLatest}
                          onChange={(e) => handleInputChange('currentLiabilitiesLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.currentLiabilitiesPrevious}
                          onChange={(e) => handleInputChange('currentLiabilitiesPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.currentLiabilitiesComment}
                          onChange={(e) => handleInputChange('currentLiabilitiesComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    {/* Long term liabilities */}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Long term liabilities</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.longTermLiabilitiesLatest}
                          onChange={(e) => handleInputChange('longTermLiabilitiesLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.longTermLiabilitiesPrevious}
                          onChange={(e) => handleInputChange('longTermLiabilitiesPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.longTermLiabilitiesComment}
                          onChange={(e) => handleInputChange('longTermLiabilitiesComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Income Statement Table */}
            <div>
              <h3 className="text-md font-semibold mb-3 text-[#0f444c]">Income Statement</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        As at latest financial year end
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        As at previous financial year end
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Revenue</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.revenueLatest}
                          onChange={(e) => handleInputChange('revenueLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.revenuePrevious}
                          onChange={(e) => handleInputChange('revenuePrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.revenueComment}
                          onChange={(e) => handleInputChange('revenueComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Operating expenses</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.operatingExpensesLatest}
                          onChange={(e) => handleInputChange('operatingExpensesLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.operatingExpensesPrevious}
                          onChange={(e) => handleInputChange('operatingExpensesPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.operatingExpensesComment}
                          onChange={(e) => handleInputChange('operatingExpensesComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Profit before tax</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.profitBeforeTaxLatest}
                          onChange={(e) => handleInputChange('profitBeforeTaxLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.profitBeforeTaxPrevious}
                          onChange={(e) => handleInputChange('profitBeforeTaxPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.profitBeforeTaxComment}
                          onChange={(e) => handleInputChange('profitBeforeTaxComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Profit after tax</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.profitAfterTaxLatest}
                          onChange={(e) => handleInputChange('profitAfterTaxLatest', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={formData.profitAfterTaxPrevious}
                          onChange={(e) => handleInputChange('profitAfterTaxPrevious', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.profitAfterTaxComment}
                          onChange={(e) => handleInputChange('profitAfterTaxComment', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2.2: Top 5 Investors */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">
              2.2 Breakdown of assets under management (AuM) by the company's five largest investors
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rands</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.topInvestors.map((investor, index) => (
                    <tr key={investor.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{investor.name}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={investor.rands}
                          onChange={(e) => handleTopInvestorChange(index, 'rands', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={investor.percentage}
                          onChange={(e) => handleTopInvestorChange(index, 'percentage', e.target.value)}
                          disabled={isCompleted}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          max="100"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{totalRands.toLocaleString('en-ZA', {minimumFractionDigits: 2})}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{totalPercentage.toFixed(2)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2.3 - 2.9: Financial Questions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h1 className="text-xl font-bold mb-4 text-[#0f444c]">Financials</h1>
            <div className="space-y-6">
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.3 List the percentage of debtors over 90 days
                </h2>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={formData.debtorsOver90DaysPercentage}
                    onChange={(e) => handleInputChange('debtorsOver90DaysPercentage', e.target.value)}
                    disabled={isCompleted}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                  <span className="ml-2">%</span>
              </div>

              {/* 2.4 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.4 What percentage of revenue is the total debtors' book at the financial year end?
                </h2>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={formData.debtorsAsPercentageOfRevenue}
                    onChange={(e) => handleInputChange('debtorsAsPercentageOfRevenue', e.target.value)}
                    disabled={isCompleted}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>

              {/* 2.5 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.5 Were any dividends declared during the year?
                </h2>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="dividends"
                      value="yes"
                      checked={formData.dividendsDeclared === 'yes'}
                      onChange={(e) => handleInputChange('dividendsDeclared', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="dividends"
                      value="no"
                      checked={formData.dividendsDeclared === 'no'}
                      onChange={(e) => handleInputChange('dividendsDeclared', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.dividendsDeclared === 'yes' && (
                  <div className="mt-2">
                    <label className="text-lg font-semibold mb-4 text-[#158087]">
                      Value of dividends declared (ZAR)
                    </label>
                    <input
                      type="number"
                      value={formData.dividendsValue}
                      onChange={(e) => handleInputChange('dividendsValue', e.target.value)}
                      disabled={isCompleted}
                      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                )}
              </div>

              {/* 2.6 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.6 Has the company been granted new borrowing or loan in the past 12 months?
                </h2>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="newBorrowing"
                      value="yes"
                      checked={formData.newBorrowing === 'yes'}
                      onChange={(e) => handleInputChange('newBorrowing', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="newBorrowing"
                      value="no"
                      checked={formData.newBorrowing === 'no'}
                      onChange={(e) => handleInputChange('newBorrowing', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.newBorrowing === 'yes' && (
                  <div className="mt-2">
                    <label className="text-lg font-semibold mb-4 text-[#158087]">
                      Please provide details, including interest-bearing or not, secured or not, and repayment period
                    </label>
                    <textarea
                      value={formData.newBorrowingDetails}
                      onChange={(e) => handleInputChange('newBorrowingDetails', e.target.value)}
                      disabled={isCompleted}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>
                )}
              </div>

              {/* 2.7 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.7 Confirm if the company has a solvency ratio (total assets: total liabilities) of greater than 1 as of the financial year-end
                </h2>
                <select
                  value={formData.solvencyRatioGreaterThanOne}
                  onChange={(e) => handleInputChange('solvencyRatioGreaterThanOne', e.target.value)}
                  disabled={isCompleted}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="na">Not Applicable</option>
                </select>
              </div>

              {/* 2.8 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.8 Confirm if the company has a current ratio (current assets: current liabilities) of greater than 1 as of the financial year-end
                </h2>
                <select
                  value={formData.currentRatioGreaterThanOne}
                  onChange={(e) => handleInputChange('currentRatioGreaterThanOne', e.target.value)}
                  disabled={isCompleted}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="na">Not Applicable</option>
                </select>
              </div>

              {/* 2.9 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.9 Confirm if the company complies with the Fit and Proper Requirements relating to Financial Soundness Requirements
                </h2>
                <select
                  value={formData.fitAndProperCompliance}
                  onChange={(e) => handleInputChange('fitAndProperCompliance', e.target.value)}
                  disabled={isCompleted}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="partial">Partially Compliant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2.10: Compliance Officer Letter */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#158087]">
              2.10 Provide a letter from your Compliance Officer indicating the status of compliance concerning the Financial Soundness Requirements
            </h2>
            
            <div className="space-y-4">
              {formData.complianceOfficerLetter ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">{formData.complianceOfficerLetter.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({(formData.complianceOfficerLetter.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  {!isCompleted && (
                    <button
                      onClick={() => removeFile('complianceOfficerLetter')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="complianceLetter"
                    onChange={(e) => handleFileUpload('complianceOfficerLetter', e.target.files)}
                    disabled={isCompleted}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <label
                    htmlFor="complianceLetter"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload compliance officer letter</span>
                    <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Section 2.11-2.19: Audit */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h1 className="text-xl font-bold mb-4 text-[#0f444c]">Audit</h1>
            
            <div className="space-y-6">
              {/* 2.11 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.11 Who are your current auditors, and for how long have they been your auditors? *
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    value={formData.currentAuditors}
                    onChange={(e) => handleInputChange('currentAuditors', e.target.value)}
                    disabled={isCompleted}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Auditor company name"
                    required
                  />
                  <input
                    type="text"
                    value={formData.auditorTenure}
                    onChange={(e) => handleInputChange('auditorTenure', e.target.value)}
                    disabled={isCompleted}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="e.g., 5 years"
                  />
                </div>
                
                <label className="text-lg font-semibold mb-4 text-[#158087]">
                  Highlight any plans to change auditors in the next 12 to 24 months
                </label>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="changeAuditors"
                      value="yes"
                      checked={formData.plansToChangeAuditors === 'yes'}
                      onChange={(e) => handleInputChange('plansToChangeAuditors', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="changeAuditors"
                      value="no"
                      checked={formData.plansToChangeAuditors === 'no'}
                      onChange={(e) => handleInputChange('plansToChangeAuditors', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.plansToChangeAuditors === 'yes' && (
                  <div className="mt-2">
                    <textarea
                      value={formData.changeAuditorsDetails}
                      onChange={(e) => handleInputChange('changeAuditorsDetails', e.target.value)}
                      disabled={isCompleted}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      placeholder="Provide details of planned auditor change"
                    />
                  </div>
                )}
              </div>

              {/* 2.12 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.12 When last did you rotate your external audit partner?
                </h2>
                <input
                  type="date"
                  value={formData.lastAuditPartnerRotation}
                  onChange={(e) => handleInputChange('lastAuditPartnerRotation', e.target.value)}
                  disabled={isCompleted}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>

              {/* 2.13 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.13 Has the company received a qualified opinion in respect of any of its audited financial statements in the past three years?
                </h2>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="qualifiedOpinion"
                      value="yes"
                      checked={formData.qualifiedOpinionPastThreeYears === 'yes'}
                      onChange={(e) => handleInputChange('qualifiedOpinionPastThreeYears', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="qualifiedOpinion"
                      value="no"
                      checked={formData.qualifiedOpinionPastThreeYears === 'no'}
                      onChange={(e) => handleInputChange('qualifiedOpinionPastThreeYears', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.qualifiedOpinionPastThreeYears === 'yes' && (
                  <div className="mt-2">
                    <textarea
                      value={formData.qualifiedOpinionDetails}
                      onChange={(e) => handleInputChange('qualifiedOpinionDetails', e.target.value)}
                      disabled={isCompleted}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      placeholder="Provide details of qualified opinions"
                    />
                  </div>
                )}
              </div>

              {/* 2.14 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.14 Provide details of your internal auditor function or internal controls testing and how it is independent within the business
                </h2>
                <textarea
                  value={formData.internalAuditorFunction}
                  onChange={(e) => handleInputChange('internalAuditorFunction', e.target.value)}
                  disabled={isCompleted}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>

              {/* 2.15 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.15 Describe the internal audit process to create, approve and execute the internal audit program and ensure corrective actions are taken
                </h2>
                <textarea
                  value={formData.internalAuditProcess}
                  onChange={(e) => handleInputChange('internalAuditProcess', e.target.value)}
                  disabled={isCompleted}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>

              {/* 2.16 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.16 Confirm the frequency of receiving the above internal control reviews and the year-end date
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.internalControlReviewFrequency}
                    onChange={(e) => handleInputChange('internalControlReviewFrequency', e.target.value)}
                    disabled={isCompleted}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="e.g., Quarterly, Annually"
                  />
                  <input
                    type="date"
                    value={formData.internalControlReviewYearEndDate}
                    onChange={(e) => handleInputChange('internalControlReviewYearEndDate', e.target.value)}
                    disabled={isCompleted}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* 2.17 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.17 Have there been any qualifications or findings on your internal controls review?
                </h2>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="internalControlQualifications"
                      value="yes"
                      checked={formData.internalControlQualifications === 'yes'}
                      onChange={(e) => handleInputChange('internalControlQualifications', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="internalControlQualifications"
                      value="no"
                      checked={formData.internalControlQualifications === 'no'}
                      onChange={(e) => handleInputChange('internalControlQualifications', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.internalControlQualifications === 'yes' && (
                  <div className="mt-2">
                    <textarea
                      value={formData.qualificationsDetails}
                      onChange={(e) => handleInputChange('qualificationsDetails', e.target.value)}
                      disabled={isCompleted}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      placeholder="Provide details, including management responses"
                    />
                  </div>
                )}
              </div>

              {/* 2.18 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.18 Provide your most recent internal controls reviews
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="internalControlsReview"
                    onChange={(e) => handleFileUpload('mostRecentInternalControlsReview', e.target.files)}
                    disabled={isCompleted}
                    accept=".pdf"
                    className="hidden"
                  />
                  <label
                    htmlFor="internalControlsReview"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload internal controls review document</span>
                    <span className="text-xs text-gray-500 mt-1">PDF up to 10MB</span>
                  </label>
                </div>
                {formData.mostRecentInternalControlsReview && (
                  <div className="mt-2 flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">{formData.mostRecentInternalControlsReview.name}</span>
                    </div>
                    {!isCompleted && (
                      <button
                        onClick={() => removeFile('mostRecentInternalControlsReview')}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 2.19 */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.19 Confirm that there are currently no limitations or restrictions to your license that impact your relationship with Alexander Forbes Investments
                </h2>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="licenseLimitations"
                      value="yes"
                      checked={formData.licenseLimitations === 'yes'}
                      onChange={(e) => handleInputChange('licenseLimitations', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">Yes (No limitations)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="licenseLimitations"
                      value="no"
                      checked={formData.licenseLimitations === 'no'}
                      onChange={(e) => handleInputChange('licenseLimitations', e.target.value)}
                      disabled={isCompleted}
                      className="text-[#158087] focus:ring-[#158087]"
                    />
                    <span className="ml-2">No (There are limitations)</span>
                  </label>
                </div>
                {formData.licenseLimitations === 'no' && (
                  <div className="mt-2">
                    <textarea
                      value={formData.licenseLimitationsDetails}
                      onChange={(e) => handleInputChange('licenseLimitationsDetails', e.target.value)}
                      disabled={isCompleted}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      placeholder="Provide details of license limitations or restrictions"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2.20-2.27: Insurance */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h1 className="text-xl font-bold mb-4 text-[#0f444c]">Insurance</h1>
            
            {/* 2.20 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.20 Attach copies of your insurance cover documents
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="insuranceDocuments"
                  onChange={(e) => handleMultipleFileUpload(e.target.files)}
                  disabled={isCompleted}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="hidden"
                />
                <label
                  htmlFor="insuranceDocuments"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600">Upload insurance documents</span>
                  <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</span>
                </label>
              </div>
              
              {formData.insuranceDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.insuranceDocuments.map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">{doc.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({(doc.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      {!isCompleted && (
                        <button
                          onClick={() => removeFile('insuranceDocuments', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2.21 Insurance Policies Table */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                  2.21 Complete the table below for insurance policies
                </h2>
                {!isCompleted && (
                  <button
                    onClick={addInsurancePolicy}
                    className="px-4 py-2 bg-[#158087] text-white rounded-md hover:bg-[#0f444c] text-sm"
                  >
                    Add Policy
                  </button>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of insurer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of insurance cover</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount of cover (ZAR)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount of excess payable (ZAR)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details of cover, inclusions & exclusions</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.insurancePolicies.map((policy) => (
                      <tr key={policy.id}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={policy.insurer}
                            onChange={(e) => updateInsurancePolicy(policy.id, 'insurer', e.target.value)}
                            disabled={isCompleted}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={policy.cover}
                            onChange={(e) => updateInsurancePolicy(policy.id, 'cover', e.target.value)}
                            disabled={isCompleted}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                            placeholder="e.g., Professional Indemnity"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={policy.amount}
                            onChange={(e) => updateInsurancePolicy(policy.id, 'amount', e.target.value)}
                            disabled={isCompleted}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={policy.excess}
                            onChange={(e) => updateInsurancePolicy(policy.id, 'excess', e.target.value)}
                            disabled={isCompleted}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <textarea
                            value={policy.details}
                            onChange={(e) => updateInsurancePolicy(policy.id, 'details', e.target.value)}
                            disabled={isCompleted}
                            rows="2"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#158087] disabled:bg-gray-100"
                          />
                        </td>
                        <td className="px-4 py-3">
                          {!isCompleted && formData.insurancePolicies.length > 1 && (
                            <button
                              onClick={() => removeInsurancePolicy(policy.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2.22 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.22 What is your total PI cover as a percentage of total assets at the company level?
              </h2>
              <div className="flex items-center mb-3">
                <input
                  type="number"
                  value={formData.piCoverPercentage}
                  onChange={(e) => handleInputChange('piCoverPercentage', e.target.value)}
                  disabled={isCompleted}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <span className="ml-2">%</span>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you have adequate cover?
              </label>
              <select
                value={formData.adequateCover}
                onChange={(e) => handleInputChange('adequateCover', e.target.value)}
                disabled={isCompleted}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* 2.23 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.23 What is the total annual aggregate limit amount of all claims? (ZAR)
              </h2>
              <input
                type="number"
                value={formData.totalAnnualAggregateLimit}
                onChange={(e) => handleInputChange('totalAnnualAggregateLimit', e.target.value)}
                disabled={isCompleted}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* 2.24 */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.24 What capital backing do you have in the event of an insurance failure?
              </h2>
              <textarea
                value={formData.capitalBacking}
                onChange={(e) => handleInputChange('capitalBacking', e.target.value)}
                disabled={isCompleted}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
              />
            </div>

            {/* 2.25 */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.25 List any claims that have been lodged against your insurance cover in the past 3 years
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Professional Indemnity claims:</label>
                  <textarea
                    value={formData.piClaims}
                    onChange={(e) => handleInputChange('piClaims', e.target.value)}
                    disabled={isCompleted}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Fidelity cover claims:</label>
                  <textarea
                    value={formData.fidelityClaims}
                    onChange={(e) => handleInputChange('fidelityClaims', e.target.value)}
                    disabled={isCompleted}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Cybercrime claims:</label>
                  <textarea
                    value={formData.cybercrimeClaims}
                    onChange={(e) => handleInputChange('cybercrimeClaims', e.target.value)}
                    disabled={isCompleted}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* 2.26 */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.26 Have there been any instances of fraud, lawsuits, material malfunction, market abuse, breach of fiduciary duty, reportable offences, or other undesirable practices in your company in the past 36 months?
              </h2>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="incidents"
                    value="yes"
                    checked={formData.incidentsPast36Months === 'yes'}
                    onChange={(e) => handleInputChange('incidentsPast36Months', e.target.value)}
                    disabled={isCompleted}
                    className="text-[#158087] focus:ring-[#158087]"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="incidents"
                    value="no"
                    checked={formData.incidentsPast36Months === 'no'}
                    onChange={(e) => handleInputChange('incidentsPast36Months', e.target.value)}
                    disabled={isCompleted}
                    className="text-[#158087] focus:ring-[#158087]"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {formData.incidentsPast36Months === 'yes' && (
                <div className="mt-2">
                  <textarea
                    value={formData.incidentsDetails}
                    onChange={(e) => handleInputChange('incidentsDetails', e.target.value)}
                    disabled={isCompleted}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    placeholder="Provide details of incidents"
                  />
                </div>
              )}
            </div>

            {/* 2.27 */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4 text-[#158087]">
                2.27 Detail your two largest insurance losses or profits in the past 12 months
              </h2>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Largest insurance loss/profit #1:</label>
                  <textarea
                    value={formData.largestInsuranceLoss1}
                    onChange={(e) => handleInputChange('largestInsuranceLoss1', e.target.value)}
                    disabled={isCompleted}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Largest insurance loss/profit #2:</label>
                  <textarea
                    value={formData.largestInsuranceLoss2}
                    onChange={(e) => handleInputChange('largestInsuranceLoss2', e.target.value)}
                    disabled={isCompleted}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detail any circumstances likely to give rise to insurance losses or profits in the next 12 months
                </label>
                <textarea
                  value={formData.futureCircumstances}
                  onChange={(e) => handleInputChange('futureCircumstances', e.target.value)}
                  disabled={isCompleted}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FinancialsAuditInsurance;
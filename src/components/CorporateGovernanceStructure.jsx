import { useState, useEffect } from "react";

const CorporateGovernanceStructure = ({ isCompleted, onProgressUpdate }) => {
  const [formData, setFormData] = useState({
    ownershipDescription: '',
    ownershipDiagram: null,
    shareholders: [{ id: Date.now(), name: '', percentage: '', position: '' }],
    holdingCompanyDetails: '',
    holdingCompanyShareholders: [{ id: Date.now(), companyName: '', shareholderName: '', percentage: '', position: '' }],
    affiliatedRelationships: '',
    recentChanges: '',
    businessInitiatives: '',
    governanceChart: null,
    boards: [{ id: Date.now(), boardName: '', members: [{ id: Date.now(), name: '', independent: false, position: '', ownershipInterest: '', familyRelationship: '' }] }],
    committeeTerms: ''
  });

  // Define total questions for this section - now 10 questions
  const totalQuestions = 10;

  // Calculate answered questions
  const calculateAnsweredQuestions = () => {
    let answered = 0;

    // Question 1.1: Ownership description
    if (formData.ownershipDescription.trim() !== '') answered++;

    // Question 1.2: Ownership diagram (count as answered if file is selected)
    if (formData.ownershipDiagram) answered++;

    // Question 1.3: Shareholders table (count as answered if at least one shareholder has data)
    const hasShareholders = formData.shareholders.some(shareholder => 
      shareholder.name.trim() !== '' || shareholder.percentage !== '' || shareholder.position.trim() !== ''
    );
    if (hasShareholders) answered++;

    // Question 1.4: Holding company (count as answered if details or shareholders exist)
    const hasHoldingCompanyData = formData.holdingCompanyDetails.trim() !== '' || 
      formData.holdingCompanyShareholders.some(item => 
        item.companyName.trim() !== '' || item.shareholderName.trim() !== '' || 
        item.percentage !== '' || item.position.trim() !== ''
      );
    if (hasHoldingCompanyData) answered++;

    // Question 1.5: Affiliated relationships
    if (formData.affiliatedRelationships.trim() !== '') answered++;

    // Question 1.6: Recent changes
    if (formData.recentChanges.trim() !== '') answered++;

    // Question 1.7: Business initiatives
    if (formData.businessInitiatives.trim() !== '') answered++;

    // Question 1.8: Governance chart
    if (formData.governanceChart) answered++;

    // Question 1.9: Boards and committees (count as answered if at least one board has data)
    const hasBoardsData = formData.boards.some(board => 
      board.boardName.trim() !== '' || 
      board.members.some(member => 
        member.name.trim() !== '' || member.position.trim() !== '' || 
        member.ownershipInterest.trim() !== '' || member.familyRelationship.trim() !== ''
      )
    );
    if (hasBoardsData) answered++;

    // Question 1.10: Committee terms
    if (formData.committeeTerms.trim() !== '') answered++;

    return answered;
  };

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('questionnaire1Data');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  // Update progress when form data changes
  useEffect(() => {
    const answeredQuestions = calculateAnsweredQuestions();
    if (onProgressUpdate) {
      onProgressUpdate(answeredQuestions);
    }
    
    // Also save to localStorage for this specific questionnaire
    localStorage.setItem('questionnaire1Data', JSON.stringify(formData));
    localStorage.setItem('questionnaire1Progress', answeredQuestions.toString());
  }, [formData, onProgressUpdate]);

  // Update form data
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Shareholder table functions (existing)
  const addShareholder = () => {
    const newShareholder = {
      id: Date.now(),
      name: '',
      percentage: '',
      position: ''
    };
    setFormData(prev => ({
      ...prev,
      shareholders: [...prev.shareholders, newShareholder]
    }));
  };

  const updateShareholder = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.map(shareholder =>
        shareholder.id === id ? { ...shareholder, [field]: value } : shareholder
      )
    }));
  };

  const removeShareholder = (id) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.filter(shareholder => shareholder.id !== id)
    }));
  };

  const clearAllShareholders = () => {
    if (window.confirm('Are you sure you want to remove all shareholders?')) {
      setFormData(prev => ({
        ...prev,
        shareholders: []
      }));
    }
  };

  // Holding company shareholders functions (existing)
  const addHoldingCompanyShareholder = () => {
    const newHoldingShareholder = {
      id: Date.now(),
      companyName: '',
      shareholderName: '',
      percentage: '',
      position: ''
    };
    setFormData(prev => ({
      ...prev,
      holdingCompanyShareholders: [...prev.holdingCompanyShareholders, newHoldingShareholder]
    }));
  };

  const updateHoldingCompanyShareholder = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      holdingCompanyShareholders: prev.holdingCompanyShareholders.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeHoldingCompanyShareholder = (id) => {
    setFormData(prev => ({
      ...prev,
      holdingCompanyShareholders: prev.holdingCompanyShareholders.filter(item => item.id !== id)
    }));
  };

  const clearAllHoldingCompanyShareholders = () => {
    if (window.confirm('Are you sure you want to remove all holding company shareholders?')) {
      setFormData(prev => ({
        ...prev,
        holdingCompanyShareholders: []
      }));
    }
  };

  // Board and committee functions (new)
  const addBoard = () => {
    const newBoard = {
      id: Date.now(),
      boardName: '',
      members: [{ id: Date.now(), name: '', independent: false, position: '', ownershipInterest: '', familyRelationship: '' }]
    };
    setFormData(prev => ({
      ...prev,
      boards: [...prev.boards, newBoard]
    }));
  };

  const updateBoard = (boardId, field, value) => {
    setFormData(prev => ({
      ...prev,
      boards: prev.boards.map(board =>
        board.id === boardId ? { ...board, [field]: value } : board
      )
    }));
  };

  const removeBoard = (boardId) => {
    setFormData(prev => ({
      ...prev,
      boards: prev.boards.filter(board => board.id !== boardId)
    }));
  };

  const addBoardMember = (boardId) => {
    const newMember = {
      id: Date.now(),
      name: '',
      independent: false,
      position: '',
      ownershipInterest: '',
      familyRelationship: ''
    };
    setFormData(prev => ({
      ...prev,
      boards: prev.boards.map(board =>
        board.id === boardId 
          ? { ...board, members: [...board.members, newMember] }
          : board
      )
    }));
  };

  const updateBoardMember = (boardId, memberId, field, value) => {
    setFormData(prev => ({
      ...prev,
      boards: prev.boards.map(board =>
        board.id === boardId 
          ? {
              ...board,
              members: board.members.map(member =>
                member.id === memberId ? { ...member, [field]: value } : member
              )
            }
          : board
      )
    }));
  };

  const removeBoardMember = (boardId, memberId) => {
    setFormData(prev => ({
      ...prev,
      boards: prev.boards.map(board =>
        board.id === boardId 
          ? { ...board, members: board.members.filter(member => member.id !== memberId) }
          : board
      )
    }));
  };

  const clearAllBoards = () => {
    if (window.confirm('Are you sure you want to remove all boards and committees?')) {
      setFormData(prev => ({
        ...prev,
        boards: []
      }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">1 Corporate and governance structure</h1>
      
      {/* Existing Questions 1.1 to 1.4 remain the same */}
      {/* Question 1.1 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.1 Describe the current ownership and shareholding structure of the company.</h2>
        <textarea
          value={formData.ownershipDescription}
          onChange={(e) => handleInputChange('ownershipDescription', e.target.value)}
          disabled={isCompleted}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          placeholder="Describe the ownership and shareholding structure..."
        />
      </div>

      {/* Question 1.2 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.2 Provide a diagram illustrating the ownership structure.</h2>
        <input
          type="file"
          onChange={(e) => handleInputChange('ownershipDiagram', e.target.files[0])}
          disabled={isCompleted}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          accept="image/*,.pdf"
        />
      </div>

      {/* Question 1.3 - Shareholder Table */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#158087]">1.3 Complete the table below.</h2>
          {formData.shareholders.length > 0 && !isCompleted && (
            <button
              onClick={clearAllShareholders}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-[#0f444c] text-white font-semibold">
            <div className="col-span-4">Name of shareholder</div>
            <div className="col-span-3">Percentage of shareholding</div>
            <div className="col-span-4">Position in company</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {formData.shareholders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No shareholders added yet. Click "Add Shareholder" to get started.
              </div>
            ) : (
              formData.shareholders.map((shareholder) => (
                <div
                  key={shareholder.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Shareholder Name */}
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={shareholder.name}
                      onChange={(e) => updateShareholder(shareholder.id, 'name', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Enter shareholder name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>

                  {/* Percentage */}
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={shareholder.percentage}
                      onChange={(e) => updateShareholder(shareholder.id, 'percentage', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Percentage"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>

                  {/* Position */}
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={shareholder.position}
                      onChange={(e) => updateShareholder(shareholder.id, 'position', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Position in company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center">
                    {!isCompleted && (
                      <button
                        onClick={() => removeShareholder(shareholder.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove shareholder"
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

        {/* Add Shareholder Button */}
        {!isCompleted && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addShareholder}
              className="px-6 py-3 bg-[#158087] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Shareholder
            </button>
          </div>
        )}
      </div>

      {/* Question 1.4 - Holding Company Table */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.4 If there is a holding company, provide details of the shareholders of the holding company.</h2>
        
        <div className="mb-6">
          <textarea
            value={formData.holdingCompanyDetails}
            onChange={(e) => handleInputChange('holdingCompanyDetails', e.target.value)}
            disabled={isCompleted}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
            placeholder="Provide details about the holding company..."
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#158087]">Complete the table below:</h3>
          {formData.holdingCompanyShareholders.length > 0 && !isCompleted && (
            <button
              onClick={clearAllHoldingCompanyShareholders}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-[#0f444c] text-white font-semibold">
            <div className="col-span-3">Holding Company</div>
            <div className="col-span-3">Name of shareholder</div>
            <div className="col-span-2">Percentage of shareholding</div>
            <div className="col-span-3">Position in company</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {formData.holdingCompanyShareholders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No holding company shareholders added yet. Click "Add Shareholder" to get started.
              </div>
            ) : (
              formData.holdingCompanyShareholders.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Holding Company */}
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={item.companyName}
                      onChange={(e) => updateHoldingCompanyShareholder(item.id, 'companyName', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Holding company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>

                  {/* Shareholder Name */}
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={item.shareholderName}
                      onChange={(e) => updateHoldingCompanyShareholder(item.id, 'shareholderName', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Shareholder name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>

                  {/* Percentage */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.percentage}
                      onChange={(e) => updateHoldingCompanyShareholder(item.id, 'percentage', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Percentage"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>

                  {/* Position */}
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={item.position}
                      onChange={(e) => updateHoldingCompanyShareholder(item.id, 'position', e.target.value)}
                      disabled={isCompleted}
                      placeholder="Position in company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                    />
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center">
                    {!isCompleted && (
                      <button
                        onClick={() => removeHoldingCompanyShareholder(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove shareholder"
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

        {/* Add Holding Company Shareholder Button */}
        {!isCompleted && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addHoldingCompanyShareholder}
              className="px-6 py-3 bg-[#158087] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Shareholder
            </button>
          </div>
        )}
      </div>

      {/* New Questions 1.5 to 1.10 */}

      {/* Question 1.5 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.5 Describe relationships with any affiliated companies, politically exposed persons (PEP) or persons of interest. List the companies, PEPs, or persons of interest.</h2>
        <textarea
          value={formData.affiliatedRelationships}
          onChange={(e) => handleInputChange('affiliatedRelationships', e.target.value)}
          disabled={isCompleted}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          placeholder="Describe affiliated relationships, PEPs, or persons of interest..."
        />
      </div>

      {/* Question 1.6 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.6 Outline any recent (past 24 months) or pending changes to your ownership, shareholding, or group structure.</h2>
        <textarea
          value={formData.recentChanges}
          onChange={(e) => handleInputChange('recentChanges', e.target.value)}
          disabled={isCompleted}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          placeholder="Describe recent or pending changes..."
        />
      </div>

      {/* Question 1.7 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.7 Describe your business development initiatives or growth imperatives you intend to pursue over the next 2 years, and the investments earmarked for these purposes.</h2>
        <textarea
          value={formData.businessInitiatives}
          onChange={(e) => handleInputChange('businessInitiatives', e.target.value)}
          disabled={isCompleted}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          placeholder="Describe business development initiatives and investments..."
        />
      </div>

      {/* Question 1.8 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.8 Provide a chart illustrating company level board(s), committees and other governing bodies including the following:</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Board of directors or equivalent</li>
          <li>Sub-boards (such as audit, risk, investments and remuneration committees)</li>
          <li>Executive or management committees</li>
          <li>Other significant committees or working groups (operations, valuations, pricing and compliance)</li>
        </ul>
        <input
          type="file"
          onChange={(e) => handleInputChange('governanceChart', e.target.files[0])}
          disabled={isCompleted}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          accept="image/*,.pdf"
        />
      </div>

      {/* Question 1.9 - Boards and Committees Tables */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#158087]">1.9 In the below format, please complete separate tables for each of the board or committees outlined above.</h2>
          {formData.boards.length > 0 && !isCompleted && (
            <button
              onClick={clearAllBoards}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>

        {formData.boards.map((board) => (
          <div key={board.id} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-md font-semibold text-[#158087]">Name of board/committee:</h3>
                <input
                  type="text"
                  value={board.boardName}
                  onChange={(e) => updateBoard(board.id, 'boardName', e.target.value)}
                  disabled={isCompleted}
                  placeholder="Enter board or committee name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                />
              </div>
              {!isCompleted && (
                <button
                  onClick={() => removeBoard(board.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove Board
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-[#0f444c] text-white font-semibold">
                <div className="col-span-3">Board/Committee member</div>
                <div className="col-span-2">Independent from company</div>
                <div className="col-span-2">Position in company</div>
                <div className="col-span-2">Ownership interest in company</div>
                <div className="col-span-2">Family or significant relationship</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {board.members.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No members added yet. Click "Add Member" to get started.
                  </div>
                ) : (
                  board.members.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Member Name */}
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateBoardMember(board.id, member.id, 'name', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Member name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Independent */}
                      <div className="col-span-2">
                        <select
                          value={member.independent}
                          onChange={(e) => updateBoardMember(board.id, member.id, 'independent', e.target.value === 'true')}
                          disabled={isCompleted}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>

                      {/* Position */}
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => updateBoardMember(board.id, member.id, 'position', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Position"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Ownership Interest */}
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={member.ownershipInterest}
                          onChange={(e) => updateBoardMember(board.id, member.id, 'ownershipInterest', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Ownership interest"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Family Relationship */}
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={member.familyRelationship}
                          onChange={(e) => updateBoardMember(board.id, member.id, 'familyRelationship', e.target.value)}
                          disabled={isCompleted}
                          placeholder="Family relationship"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
                        />
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex justify-center">
                        {!isCompleted && (
                          <button
                            onClick={() => removeBoardMember(board.id, member.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            title="Remove member"
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

            {/* Add Member Button */}
            {!isCompleted && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => addBoardMember(board.id)}
                  className="px-4 py-2 bg-[#158087] text-white rounded hover:bg-[#0f444c] transition-colors text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Member
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Board Button */}
        {!isCompleted && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addBoard}
              className="px-6 py-3 bg-[#158087] text-white rounded-lg hover:bg-[#0f444c] transition-colors font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Board/Committee
            </button>
          </div>
        )}
      </div>

      {/* Question 1.10 */}
      <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-[#158087]">1.10 For each committee listed above, please provide the terms of reference including a description of the committee's decision-making powers and responsibilities and frequency of meetings.</h2>
        <textarea
          value={formData.committeeTerms}
          onChange={(e) => handleInputChange('committeeTerms', e.target.value)}
          disabled={isCompleted}
          rows="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#158087] disabled:bg-gray-100"
          placeholder="Provide terms of reference, decision-making powers, responsibilities, and meeting frequency..."
        />
      </div>
    </div>
  );
};

export default CorporateGovernanceStructure;
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import OperationalDueDiligence from './components/OperationalDueDiligence.jsx'
import PoliciesDocumentsChecklist from './components/PoliciesDocumentsChecklist.jsx'
import PersonalInformation from './components/PersonalInformation.jsx'
import CompanyInformation from './components/CompanyInformation.jsx'
import QuestionnaireBySection from './components/Questionnaire.jsx'
import Declaration from './components/Declaration.jsx'
import QuestionnaireLayout from './layouts/QuestionnaireLayout.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OperationalDueDiligence />} />
          <Route path="/operational-due-diligence" element={<OperationalDueDiligence />} />
          <Route path="/policies-documents" element={<PoliciesDocumentsChecklist />} />
          <Route path="/personal-information" element={<PersonalInformation />} />
          <Route path="/company-information" element={<CompanyInformation />} />
          <Route path="/questionnaire" element={<QuestionnaireBySection />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/questionnaire/:id" element={<QuestionnaireLayout />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
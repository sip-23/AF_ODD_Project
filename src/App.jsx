// App.js
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './layouts/layout.jsx'
import OperationalDueDiligence from './components/OperationalDueDiligence.jsx'
import PoliciesDocumentsChecklist from './components/PoliciesDocumentsChecklist.jsx'
import PersonalInformation from './components/PersonalInformation.jsx'
import CompanyInformation from './components/CompanyInformation.jsx'
import QuestionnaireBySection from './components/Questionnaire.jsx'
import Declaration from './components/Declaration.jsx'
import QuestionnaireLayout from './layouts/QuestionnaireLayout.jsx'
import Login from './components/login.jsx'

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    
    if (auth === 'true' && user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protected Routes - wrapped with Layout */}
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <OperationalDueDiligence />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/operational-due-diligence" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <OperationalDueDiligence />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/policies-documents" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <PoliciesDocumentsChecklist />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/personal-information" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <PersonalInformation />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/company-information" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <CompanyInformation />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/questionnaire" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <QuestionnaireBySection />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/declaration" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <Declaration />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/questionnaire/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <QuestionnaireLayout />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Redirect any unknown route to login or home */}
        <Route path="*" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  )
}

export default App
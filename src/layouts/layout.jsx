import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const [loginName, setLoginName] = useState("");
  
  // Show header for all routes except specific ones
  const excludedRoutes = ["/login", "/register"]; // Add routes where you don't want header
  const showHeader = !excludedRoutes.includes(location.pathname);
  
  // Get user info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Extract name from email (demo@alexforbes.com -> "Demo")
        const email = user.email || 'demo@alexforbes.com';
        const nameFromEmail = email.split('@')[0];
        const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        setLoginName(capitalizedName);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setLoginName("Demo"); // Fallback
      }
    } else {
      setLoginName("Demo"); // Default fallback
    }
  }, []); // Empty dependency array to run only on mount

  // Function to format the route path into a proper heading
  const getHeadingFromPath = (pathname) => {
    // Remove leading slash and split by hyphens
    const path = pathname.replace(/^\//, '');
    
    if (path === '') {
      return `Welcome ${loginName} Fund Manager`;
    }
    
    // Handle specific route mappings
    const routeMappings = {
      '': 'Welcome',
      'operational-due-diligence': 'Operational Due Diligence Review',
      'policies-documents': 'Policies & Documents Checklist',
      'personal-information': 'Personal Information, Privacy and Security',
      'company-information': 'Company Information',
      'questionnaire': 'Questionnaire By Section',
      'declaration': 'Declaration'
    };
    
    return routeMappings[path] || 
      path.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {showHeader && <Header heading={getHeadingFromPath(location.pathname)} />}
          <main className="flex-1 overflow-auto bg-[#F4F7FD]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
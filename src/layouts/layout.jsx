import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Show header for all routes except specific ones
  const excludedRoutes = ["/login", "/register"]; // Add routes where you don't want header
  const showHeader = !excludedRoutes.includes(location.pathname);

  // Function to format the route path into a proper heading
  const getHeadingFromPath = (pathname) => {
    // Remove leading slash and split by hyphens
    const path = pathname.replace(/^\//, '');
    
    if (path === '') {
      return "Operational Due Diligence Review";
    }
    
    // Handle specific route mappings
    const routeMappings = {
      '': 'Operational Due Diligence Review',
      'operational-due-diligence': 'Operational Due Diligence Review',
      'policies-documents': 'Policies & Documents Checklist',
      'personal-information': 'Personal Information, Privacy and Security',
      'company-information': 'Company Information',
      'questionnaire': 'Questionnaire by Section',
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
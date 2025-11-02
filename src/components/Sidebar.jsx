import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completionStatus, setCompletionStatus] = useState({});

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check completion status from localStorage
  useEffect(() => {
    const status = {
      operationalDueDiligence: localStorage.getItem('operationalDueDiligenceCompleted') === 'true',
      policiesDocuments: localStorage.getItem('policiesDocumentsCompleted') === 'true',
      personalInformation: localStorage.getItem('personalInformationCompleted') === 'true',
    };
    setCompletionStatus(status);
  }, [location.pathname]);

  const navItems = [
    { path: "/operational-due-diligence", label: "Operational due Diligence review", isCompleted: completionStatus.operationalDueDiligence },
    { 
      path: "/policies-documents", 
      label: "Policies & Documents Checklist",
      isCompleted: completionStatus.policiesDocuments 
    },
    { path: "/personal-information", label: "Personal information, privacy and security", isCompleted: completionStatus.personalInformation },
    { path: "/company-information", label: "Company information" },
    { path: "/questionnaire", label: "Questionnaire by Section", isHighlighted: false },
    { path: "/declaration", label: "Declaration" },
  ];

  return (
    <div className="w-full lg:w-[300px] bg-[#0f444c] border-r border-[#E4EBFA] lg:h-screen flex-shrink-0">
      <div className="xl:p-8 p-4">
        <img 
          className="h-[50px] w-[250px] xl:mb-[52px] lg:mb-[12px]" 
          src="https://id.alexforbes.com/assets/logo.svg" 
          alt="Alexforbes Logo" 
        />
        
        <nav className="lg:block mt-4 lg:mt-0">
          <div className="flex justify-start items-center xl:mb-6 mb-4">
            <h4 className="font-plus-jakarta-sans text-white font-bold text-xs tracking-wider">CONTENT</h4>
            <span className="font-plus-jakarta-sans text-white font-bold text-xs tracking-wider lg:ml-2 ml-1">(7)</span>
          </div>

          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center justify-between w-full h-[55px] py-2 px-4 lg:px-4 lg:-mx-8 xl:mb-4 lg:mb-1 rounded-r-full text-white font-plus-jakarta-sans font-bold text-sm lg:text-base transition-colors hover:bg-[#F69521] ${
                isActive(item.path) 
                  ? 'bg-[#F69521]' 
                  : item.isHighlighted 
                    ? 'bg-[#F69521]' 
                    : 'bg-[#F15A22]'
              }`}
            >
              <span className="text-left flex-1">{item.label}</span>
              {item.isCompleted && (
                <span className="ml-2 text-sm flex-shrink-0">✓</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
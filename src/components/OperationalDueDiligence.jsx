import { useState, useEffect } from "react";

const OperationalDueDiligence = () => {
    const [isAcknowledged, setIsAcknowledged] = useState(false);
    const [loginName, setLoginName] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Function to get month name
    const getMonthName = (monthIndex) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthIndex];
    };

    // Function to calculate due date (current date + 6 months)
    const calculateDueDate = () => {
        const today = new Date();
        const due = new Date(today);
        due.setMonth(due.getMonth() + 6);
        
        const monthName = getMonthName(due.getMonth());
        const year = due.getFullYear();
        
        return `${monthName} ${year}`;
    };

    // Load acknowledgment status and user info from localStorage on component mount
    useEffect(() => {
        const savedStatus = localStorage.getItem('operationalDueDiligenceCompleted');
        if (savedStatus === 'true') {
            setIsAcknowledged(true);
        }

        // Get user info from localStorage
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

        // Calculate and set due date
        setDueDate(calculateDueDate());
    }, []);

    const handleComplete = () => {
        localStorage.setItem('operationalDueDiligenceCompleted', 'true');
        setIsAcknowledged(true);
        alert('Section read and acknowledged successfully!');
        // You can navigate to next section or show success message
    }

    return (
        <div className="p-8 min-h-screen flex flex-col">
            <div className="flex-grow">
                <h1 className="text-2xl font-bold">Operational Due Diligence Review</h1>
                <p className="text-md pt-2">
                    We would like to perform an operational due diligence 'ODD' assessment of your company's operations. 
                    This assessment forms part of our best practice corporate governance principals as a first line defence to assist and support our management with risk mitigation management. 
                    The process assists our understanding of the operational risks of a company by gathering, analysing and verifying information such as governance and organisational structure, controls and processes, investment operations and execution risks.
                </p>
                <span className="text-md pt-2">The investment strategy and related fund structure we would like to specifically review is as follows:</span>
                <div className="pt-2">
                    <span className="text-md font-bold text-[#158087]">Fund manager name: {loginName} </span>
                    <span className="text-md font-bold text-[#158087]">Fund Managers</span>
                </div>
                <span className="block text-md font-bold text-[#158087] pt-2">Strategies: All strategies/funds utilized by Alexander Forbes</span>
                <p className="text-md pt-2">
                    The process of conducting the review has the following stages:
                </p>

                <ul className="p-4">
                    <li className="list-disc">
                        <strong>Data collection</strong> – This is the introductory phase where we ask you to complete our questionnaire and provide 
                        information about your company's operations and control environment. We use this information to focus our on-site 
                        review agenda and develop a preliminary understanding of your daily activities.
                    </li>
                    <li className="list-disc">
                        <strong>On-site reviews</strong> – Our on-site meetings focus on meeting your operations and control employees, including 
                        junior and senior team members. We take a hands-on approach, which means that we prefer to see the team 
                        executing some responsibilities and demonstrating systems and controls desk-side. These meetings may include any outsourced functions and material third-party relationships.
                    </li>
                    <li className="list-disc">
                        <strong>Follow-up and documentation</strong> – We generally have follow-up questions post the on-site review. Most of 
                        these items are to clarify processes and information collected. We document our observations in an operational risk assessment report.
                    </li>
                </ul> 
                
                <p className="text-md pt-2">
                    Please provide us with your response and any other information you feel would be of assistance by{" "}
                    <strong className="text-[#158087]">{dueDate}</strong>. 
                    We appreciate this request will require significant effort. However, the better the understanding we have of your 
                    company before the on-site visit, the more productive our review will be for both sides. Please mark any questions that are not relevant as N/A.
                </p>
                
                <span className="block pt-2">
                    Should you have questions about this request or our operational due diligence process, please contact me on <strong className="text-[#158087]">ODD@alexforbes.com</strong>. 
                    We appreciate your assistance, time and co-operation with this review and look forward to working with you during this review process.
                </span>

                <span className="block pt-6">
                    Yours sincerely
                </span>

                <span className="block pt-2 flex flex-col">
                    <strong className="">Julie Govender</strong>
                    <strong className="">Head: Investment Operational Due Diligence</strong>
                </span>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex-1"></div> {/* Spacer to push button to right */}
                <button
                    onClick={handleComplete}
                    disabled={isAcknowledged}
                    className="px-6 py-2 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ 
                        backgroundColor: isAcknowledged ? '#158087' : '#9CA3AF',
                        cursor: isAcknowledged ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isAcknowledged ? 'Acknowledged ✓' : 'Acknowledge'}
                </button>
            </div>
        </div>
    );
};

export default OperationalDueDiligence;
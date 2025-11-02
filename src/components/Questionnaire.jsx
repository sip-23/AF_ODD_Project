import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionnaireBySection = () => {
    const navigate = useNavigate();
    const [questionProgress, setQuestionProgress] = useState({});

    // Load progress from localStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem('questionnaireProgress');
        if (savedProgress) {
            setQuestionProgress(JSON.parse(savedProgress));
        }
    }, []);

    const handleClick = (item) => {
        navigate(`/questionnaire/${item.id}`);
    };

    const getProgressColor = (current, total) => {
        if (current === 0) return 'bg-blue-500';
        if (current === total) return 'bg-green-500';
        return 'bg-orange-500';
    };

    const getProgressPercentage = (current, total) => {
        if (!current || !total) return 0;
        return Math.round((current / total) * 100);
    };

    // Define total questions for each section
    const getTotalQuestions = (id) => {
        switch (parseInt(id)) {
            case 1: return 10; // Corporate Governance 
            case 2: return 11; // Financials and Audit
            case 3: return 11; // Organisational Structure
            default: return 11;
        }
    };


    const questionnaireItems = [
        {
        id: 1,
        title: "(1) Corporate and governance structure",
        image: "https://www.icaew.com/-/media/corporate/images/insights/specials/restoring-trust/office-boardroom.ashx?la=en&h=533&mw=800&w=800",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(1),
        currentQuestions: questionProgress[1] || 0
        },
        {
        id: 2,
        title: "(2) Financials and Audit",
        image: "https://www.accountingsfl.com/wp-content/uploads/2022/01/blog-images-02.jpg",
        link: "#",
        totalQuestions: getTotalQuestions(2),
        currentQuestions: questionProgress[2] || 0
        },
        {
        id: 3,
        title: "(3) Organisational structure and Human Capital",
        image: "https://static.vecteezy.com/system/resources/previews/018/912/695/large_2x/human-icon-on-circle-with-line-connecting-position-diagrams-concept-of-organizational-structure-position-chart-organizational-management-and-human-resource-management-photo.jpg",
        link: "#",
        totalQuestions: getTotalQuestions(3),
        currentQuestions: questionProgress[3] || 0
        },
        {
        id: 4,
        title: "(4) Regulation and Compliance",
        image: "data:image/jpeg;base64,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",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(4),
        currentQuestions: questionProgress[4] || 0
        },
        {
        id: 5,
        title: "(5) Fund Structures or pooled vehicles",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptFwwwxlSdEGBZ4XEUJNDGp9_eTN4icbhuoE0cR2JDVxX0LwwP9qxhb9TjZ28aLaIwpw&usqp=CAU",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(5),
        currentQuestions: questionProgress[5] || 0
        },
        {
        id: 6,
        title: "(6) IT systems, disaster recovery and business continuity",
        image: "https://www.mostellarmedical.org/files/2023/07/AdobeStock_577838174.jpg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(6),
        currentQuestions: questionProgress[6] || 0
        },
        {
        id: 7,
        title: "(7) Service providers and outsourcing",
        image: "https://www.agilitypr.com/wp-content/uploads/2022/08/bpo.jpg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(7),
        currentQuestions: questionProgress[7] || 0
        },
        {
        id: 8,
        title: "(8) Insurance",
        image: "https://plutuseducation.com/blog/wp-content/uploads/2024/12/ChatGPT-Image-Jun-17-2025-01_12_27-PM-768x403.jpg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(8),
        currentQuestions: questionProgress[8] || 0
        },
        {
        id: 9,
        title: "(9) Risk Control",
        image: "https://ipkeys.com/wp-content/uploads/2022/08/RMF-7-Steps-1024x576.jpeg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(9),
        currentQuestions: questionProgress[9] || 0
        },
        {
        id: 10,
        title: "(10) Transaction execution",
        image: "https://www.doanegrantthornton.ca/globalassets/1.-member-firms/canada/insights/ma-buying-business-banner-image-1440x600-1.jpg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(10),
        currentQuestions: questionProgress[10] || 0
        },
        {
        id: 11,
        title: "(11) Valuation and administration",
        image: "https://cdn.corporatefinanceinstitute.com/assets/valuation.jpeg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(11),
        currentQuestions: questionProgress[11] || 0
        },
        {
        id: 12,
        title: "(12) Collateral administration (if applicable)",
        image: "https://napkinfinance.com/wp-content/uploads/2017/11/NapkinFinance-Collateral-Napkin-06-04-20-v04.jpg",
        link: "https://alexander-forbes-group-services-pty-ltd.results-af.highbond.com/questionnaire_responses/TFhK4BU2py-f1pmQuc9m/edit",
        totalQuestions: getTotalQuestions(12),
        currentQuestions: questionProgress[12] || 0
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Questionnaire by Section</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {questionnaireItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() => handleClick(item)}
                    >
                        {/* Image Section */}
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                            <img 
                                className="w-full h-full object-cover" 
                                src={item.image} 
                                alt={item.title} 
                            />
                            {/* Progress Badge */}
                            <div className={`absolute top-3 right-3 ${getProgressColor(item.currentQuestions, item.totalQuestions)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                                {item.currentQuestions === item.totalQuestions ? (
                                    <span className="flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Complete
                                    </span>
                                ) : (
                                    `${item.currentQuestions}/${item.totalQuestions}`
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                            {/* Title */}
                            <h3 className="font-plus-jakarta-sans font-bold text-lg mb-3 text-gray-800 line-clamp-2">
                                {item.title}
                            </h3>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">
                                        {item.currentQuestions}/{item.totalQuestions} Questions
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {getProgressPercentage(item.currentQuestions, item.totalQuestions)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${getProgressColor(item.currentQuestions, item.totalQuestions)} transition-all duration-500`}
                                        style={{ width: `${getProgressPercentage(item.currentQuestions, item.totalQuestions)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                    item.currentQuestions === 0 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : item.currentQuestions === item.totalQuestions 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-orange-100 text-orange-800'
                                }`}>
                                    {item.currentQuestions === 0 
                                        ? 'Not Started' 
                                        : item.currentQuestions === item.totalQuestions 
                                        ? 'Completed' 
                                        : 'In Progress'
                                    }
                                </span>
                                <div className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {questionnaireItems.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">No questionnaire sections available</p>
                </div>
            )}
        </div>
    );
};

export default QuestionnaireBySection;
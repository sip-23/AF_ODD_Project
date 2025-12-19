import { IoNotificationsOutline, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch, heading }) => {
    const [searchValue, setSearchValue] = useState("");
    const searchTimeoutRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Show confirmation dialog
        if (window.confirm("Are you sure you want to logout? All unsaved progress will be lost.")) {
            // Clear authentication data from localStorage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            
            // Optionally clear other session data if needed (but preserve form data if you want to keep it)
            // localStorage.clear(); // Uncomment this if you want to clear EVERYTHING
            
            // Navigate to login page
            navigate('/login');
        }
    };

    // Reset function to clear all localStorage data and go to login
    const handleReset = () => {
        if (window.confirm("This will clear ALL data including form progress and logout. Are you sure?")) {
            // Clear all localStorage data
            localStorage.clear();
            
            // Navigate to login page
            navigate('/login');
        }
    };


    return (
        <header className="hidden lg:block bg-[#0f444c] text-white border-b border-[#E4EBFA] p-4">
            <div className="flex justify-between items-center">
                {/* Heading */}
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-plus-jakarta-sans font-bold text-3xl">{heading}</h2>
                </div>
                
                {/* Icons Container */}
                <div className="flex justify-around items-center gap-3">
                    {/* Notifications */}
                    <div className="hidden md:block rounded-full w-10 h-10 bg-[#E4EBFA] grid place-items-center cursor-pointer p-2">
                        <IoNotificationsOutline color="#0f444c" size={22}/>
                    </div>
                    
                    {/* Reset Button - Clears all data */}
                    <div 
                        className="rounded-full w-10 h-10 bg-[#E4EBFA] grid place-items-center cursor-pointer hover:bg-[#d4dbe5] transition-colors group"
                        onClick={handleReset}
                        title="Reset All Data"
                    >
                        <IoPersonOutline color="#0f444c" size={22} />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-12 -ml-4 whitespace-nowrap">
                            Reset All Data
                        </span>
                    </div>
                    
                    {/* Logout Button - Just logs out */}
                    <div 
                        className="rounded-full w-10 h-10 bg-[#ff4444] bg-opacity-90 grid place-items-center cursor-pointer hover:bg-opacity-100 transition-colors group"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <IoLogOutOutline color="white" size={22} />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-12 -ml-3 whitespace-nowrap">
                            Logout
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Optional: Alternative buttons layout for smaller screens or different design */}
            <div className="md:hidden mt-4 flex justify-end space-x-3">
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-[#ff4444] text-white rounded-lg text-sm font-medium hover:bg-[#ff3333] transition-colors flex items-center gap-2"
                >
                    <IoLogOutOutline size={16} />
                    Logout
                </button>
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                    <IoPersonOutline size={16} />
                    Reset All
                </button>
            </div>
        </header>
    );
};

export default Header;
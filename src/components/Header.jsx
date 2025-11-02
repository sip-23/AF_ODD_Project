import { IoBookOutline, IoNotificationsOutline, IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

const Header = ({ onSearch, heading }) => {
    const [searchValue, setSearchValue] = useState("");
    const searchTimeoutRef = useRef(null);
    const searchInputRef = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
            if (onSearch) {
                onSearch(value.toLowerCase().trim());
            }
        }, 300);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            
            // Execute search immediately
            if (onSearch) {
                onSearch(searchValue.toLowerCase().trim());
            }
        }
    }

    const clearSearch = () => {
        setSearchValue("");
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        if (onSearch) {
            onSearch("");
        }
    };

    // Reset function to clear localStorage and refresh the page
    const handleReset = () => {
        // Clear all localStorage data
        localStorage.clear();
        
        // Optional: Show confirmation message
        if (window.confirm("This will clear all data and refresh the page. Are you sure?")) {
            // Refresh the page to start fresh
            window.location.reload();
        }
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <header className="hidden lg:block bg-[#0f444c] text-white border-b border-[#E4EBFA] p-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                {/* Search Container */}
                <div className="flex items-center w-[350px] h-10 px-3">
                    <IoSearchOutline color="#E4EBFA" className="mr-3" size={22}/>
                    <input
                        ref={searchInputRef} 
                        type="text" 
                        placeholder="Search" 
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                        className="border border-[#E4EBFA] bg-[#E4EBFA] text-[#0f444c] rounded-[16px] w-full py-2 px-4" 
                    />

                    {/* Clear search button */}
                    {searchValue && (
                        <button 
                            onClick={clearSearch}
                            className="ml-2 text-[#E4EBFA] hover:text-white transition-colors"
                            title="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>
                
                <div className="flex justify-around items-center">
                    <div className="hidden md:block rounded-full w-10 h-10 bg-[#E4EBFA] grid place-items-center cursor-pointer mr-3 p-2">
                        <IoNotificationsOutline color="#0f444c" size={22}/>
                    </div>
                    <div 
                        className="rounded-full w-10 h-10 bg-[#E4EBFA] grid place-items-center cursor-pointer mr-3 hover:bg-[#d4dbe5] transition-colors"
                        onClick={handleReset}
                        title="Reset Demo (Clear All Data)"
                    >
                        <IoPersonOutline color="#0f444c" size={22} />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center p-4">
                <h2 className="font-plus-jakarta-sans font-bold text-3xl">{heading}</h2>
            </div>
        </header>
    );
};

export default Header;
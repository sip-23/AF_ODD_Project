// components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Test credentials
  const testCredentials = {
    email: "demo@alexforbes.com",
    password: "demo123"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (in real app, this would be an API call)
      if (email === testCredentials.email && password === testCredentials.password) {
        // Store user in localStorage
        const user = {
          email: email,
          name: "Demo User",
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Update authentication state
        if (setIsAuthenticated) {
          setIsAuthenticated(true);
        }
        
        // Navigate to home
        navigate('/');
      } else {
        setError("Invalid email or password. Use demo@alexforbes.com / demo123 for demo.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0f444c] mb-24 text-white p-4 md:p-8">
      {/* Left Section - Logo and Welcome */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0 md:pr-8">
        {/* Alexforbes Logo */}
        <img 
          className="h-[80px] w-[280px] mb-8 md:mb-12" 
          src="https://id.alexforbes.com/assets/logo.svg" 
          alt="Alexforbes Logo" 
        />
        
        {/* Khusela Logo Container */}
        <div className="flex flex-col items-center mb-6">
          {/* Circular Khusela Logo */}
          <img 
            className="h-[120px] w-[120px] mb-4" 
            src="/src/assets/Khusela_logo.png" 
            alt="Khusela Logo" 
          />
          {/* Khusela Text Logo */}
          <img 
            className="h-[40px] w-[120px] mb-4" 
            src="/src/assets/Khusela.png" 
            alt="Khusela" 
          />
        </div>
        
        {/* Welcome Text */}
        <div className="text-center max-w-md">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Welcome to Alexforbes Khusela Forms</h1>
          <p className="text-lg text-gray-200 mb-6">Investments Operational Due Diligence Portal</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white border-opacity-20 shadow-2xl">
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="hidden mb-6 p-3 bg-blue-500 bg-opacity-20 rounded-lg border border-blue-400 border-opacity-50">
            <p className="text-blue-200 text-sm text-center">
              <strong>Demo Access:</strong><br />
              Email: demo@alexforbes.com<br />
              Password: demo123
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                placeholder="Enter your email: demo@alexforbes.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                placeholder="Enter your password: demo123"
                required
                disabled={isLoading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 mr-2 rounded border-white border-opacity-30 bg-white bg-opacity-10 focus:ring-white focus:ring-opacity-50"
                />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-200 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-[#0f444c] rounded-lg font-semibold transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Contact Support */}
          <div className="mt-6 pt-6 border-t border-white border-opacity-10 text-center">
            <p className="text-sm text-gray-200">
              Need help?{" "}
              <a href="mailto:support@alexforbes.com" className="text-white hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Footer for mobile */}
        <div className="mt-6 text-center text-sm text-gray-200 md:hidden">
          <p>© {new Date().getFullYear()} Alexforbes. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> • 
            <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>

      {/* Footer for desktop */}
      <div className="hidden md:block absolute bottom-4 left-0 right-0 text-center text-sm text-gray-200">
        <p>© {new Date().getFullYear()} Alexforbes. All rights reserved.</p>
        <p className="mt-1">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> • 
          <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
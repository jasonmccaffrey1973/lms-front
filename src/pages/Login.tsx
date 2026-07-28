import React, { useState } from "react"
import LoginForm from "../components/LoginForm"
import RegistrationForm from "../components/RegistrationForm"
import ForgotPasswordModal from "../components/ForgotPasswordModal"

type LoginView = "login" | "register" | "forgot-password"

export default function LoginPage() {
  const [view, setView] = useState<LoginView>("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-20" />
      
      {/* Main container */}
      <div className="relative z-10 w-full max-w-md mx-auto my-8 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            {view === "login" && "Welcome Back"}
            {view === "register" && "Create Account"}
            {view === "forgot-password" && "Reset Password"}
          </h1>
        </div>
        
        {/* Content */}
        <div className="bg-white px-6 py-8">
          {view === "login" && (
            <LoginForm onShowRegister={() => setView("register")} />
          )}
          
          {view === "register" && (
            <RegistrationForm onBackToLogin={() => setView("login")} />
          )}
          
          {view === "forgot-password" && (
            <>
              <ForgotPasswordModal 
                isOpen={showForgotPassword} 
                onClose={() => setShowForgotPassword(false)} 
              />
              <div className="text-center">
                <p className="mb-4 text-gray-600">Enter your email address and we'll send you a reset code.</p>
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Send Reset Code
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          {view === "login" && (
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => setView("register")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          )}
          
          {view === "register" && (
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => setView("login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
          
          {view === "forgot-password" && (
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button 
                onClick={() => setView("login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
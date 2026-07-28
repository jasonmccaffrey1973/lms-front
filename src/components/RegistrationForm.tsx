import React, { useState } from "react"

interface RegistrationFormProps {
  onBackToLogin: () => void
}

export default function RegistrationForm({ onBackToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  return (
    <div>
      {/* Username field */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
        <input 
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Choose a username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
        />
      </div>
      
      {/* Email field */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
        <input 
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
        />
      </div>
      
      {/* Password field */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
        <input 
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
        />
      </div>
      
      {/* Confirm Password field */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Confirm Password</label>
        <input 
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
        />
      </div>
      
      {/* Register button */}
      <button 
        type="submit"
        className="w-full mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        Create Account
      </button>
      
      {/* Back to login link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button 
          onClick={onBackToLogin}
          type="button"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}
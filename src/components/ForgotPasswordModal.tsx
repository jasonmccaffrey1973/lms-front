interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <p className="mb-6 text-gray-600">Enter your email address and we'll send you a reset code.</p>
          
          {/* Email input */}
          <div className="mb-6">
            <input 
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          {/* Submit button */}
          <button 
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Send Reset Code
          </button>
        </div>
      </div>
    </div>
  )
}
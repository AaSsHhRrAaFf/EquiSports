import { Ghost } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="flex justify-center mb-6">
        <Ghost 
          size={120} 
          className="text-purple-500 animate-bounce" 
          strokeWidth={1.5}
        />
      </div>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for seems to have wandered off into the digital wilderness.
      </p>
      <div className="space-x-4">
        <Link 
          to="/" 
          className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300 inline-block shadow-lg"
        >
          Return Home
        </Link>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300 inline-block"
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
  )
}

export default NotFoundPage;
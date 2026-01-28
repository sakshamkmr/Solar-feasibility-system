import { SignIn } from '@clerk/nextjs';
import { Sun, Shield, Zap } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Branding */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">Sign in to unlock your solar potential</p>
        </div>

        {/* SignIn Component */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <SignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/solar"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-xl font-bold rounded-2xl h-12 text-lg',
                socialButtonsBlockButton: 'border-gray-200 hover:border-orange-200 bg-white/50 backdrop-blur-sm',
                formFieldInput: 'border-gray-200 focus:border-orange-400 rounded-xl h-12',
                footerActionButton: 'text-orange-500 hover:text-orange-600 font-semibold',
                formFieldLabel: 'text-gray-900 font-semibold text-sm',
              }
            }}
          />
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center space-x-6 pt-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>2 min setup</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { SignUp } from '@clerk/nextjs';
import { Sun, Award, Zap } from 'lucide-react';

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
            Join SolarSurya
          </h1>
          <p className="text-gray-600 text-lg">
            Start your free solar assessment journey
          </p>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mt-4">
            <Award className="w-4 h-4" />
            Free Forever - No Credit Card
          </div>
        </div>

        {/* SignUp Component */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <SignUp 
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/solar"
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8">
          <div className="text-center text-xs">
            <div className="font-bold text-orange-600 text-lg">10k</div>
            <div>Homes Analyzed</div>
          </div>
          <div className="text-center text-xs">
            <div className="font-bold text-orange-600 text-lg">3.5Y</div>
            <div>Avg Payback</div>
          </div>
          <div className="text-center text-xs">
            <div className="font-bold text-orange-600 text-lg">₹3.2L</div>
            <div>Yr Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

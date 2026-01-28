import Link from 'next/link';
import { ArrowLeft, Sun } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center">
          <Sun className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
            Back to SolarSurya
          </Link>
        </div>
      </div>
    </div>
  );
}

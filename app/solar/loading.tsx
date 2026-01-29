// app/solar/loading.tsx (REMOVE "use client")
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-6 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <span className="text-2xl font-bold text-white">Analyzing NASA Data</span>
        </div>
        <p className="text-xl text-gray-600">Processing satellite solar irradiance...</p>
      </div>
    </div>
  );
}

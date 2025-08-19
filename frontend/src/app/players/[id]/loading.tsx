// frontend/src/app/players/[id]/loading.tsx

export default function LoadingPlayerPage() {
  // این یک نسخه اسکلتی از صفحه جزئیات بازیکن است
  return (
    <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center w-full max-w-md animate-pulse">
            <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-12 bg-gray-700 rounded-full w-1/3 mx-auto"></div>
        </div>
    </main>
  );
}
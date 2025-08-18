// frontend/src/app/loading.tsx

export default function Loading() {
  // این کامپوننت یک نسخه ساده شده و "اسکلتی" از صفحه اصلی شماست.
  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">لیست برترین گلزنان لیگ برتر</h1>

      {/* باکس جستجوی اسکلتی */}
      <div className="w-full p-3 mb-6 h-12 bg-gray-700 rounded-lg animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* یک آرایه موقت با ۶ عضو می‌سازیم تا ۶ کارت اسکلتی نمایش دهیم.
          Array.from({ length: 6 }) یعنی یک آرایه با طول ۶ بساز.
        */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
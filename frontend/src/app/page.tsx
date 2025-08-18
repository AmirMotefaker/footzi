// src/app/page.tsx

// قدم اول: یک "نوع" (Type) برای داده‌های بازیکنان تعریف می‌کنیم تا TypeScript بداند ساختار داده ما چگونه است.
type Player = {
  id: string;
  player_name: string;
  club_name: string;
  goals: number;
};

// قدم دوم: یک تابع برای گرفتن داده‌ها از API خودمان می‌نویسیم.
async function getPlayers(): Promise<Player[]> {
  try {
    // ما به API که روی پورت 3000 در حال اجراست، یک درخواست ارسال می‌کنیم.
    const res = await fetch('http://localhost:3000', { cache: 'no-store' }); // cache: 'no-store' برای اطمینان از دریافت داده جدید در هر بار رفرش

    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }

    // پاسخ را به صورت JSON برمی‌گردانیم.
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // در صورت خطا، یک آرایه خالی برمی‌گردانیم
  }
}


// قدم سوم: کامپوننت اصلی صفحه را می‌نویسیم.
// کلمه کلیدی async به ما اجازه می‌دهد که قبل از نمایش صفحه، منتظر دریافت داده‌ها بمانیم.
export default async function HomePage() {
  
  // تابع گرفتن داده‌ها را فراخوانی می‌کنیم.
  const players = await getPlayers();

  return (
    // از کلاس‌های Tailwind CSS برای استایل‌دهی ساده استفاده می‌کنیم.
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">لیست برترین گلزنان لیگ برتر</h1>
      
      {/* یک کانتینر برای نمایش لیست بازیکنان */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* قدم چهارم: روی آرایه بازیکنان "map" می‌زنیم.
          این یعنی به ازای هر بازیکن در لیست، یک بلاک div جدید ایجاد می‌کنیم.
        */}
        {players.map((player) => (
          // "key" یک ویژگی ضروری در React برای لیست‌هاست که به بهینه‌سازی کمک می‌کند.
          <div key={player.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{player.player_name}</h2>
            <p className="text-gray-400">باشگاه: {player.club_name}</p>
            <p className="text-yellow-400 mt-2 text-lg">گل‌ها: {player.goals}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
// frontend/src/app/page.tsx

import PlayerList from '@/components/PlayerList'; // کامپوننت جدید خود را وارد می‌کنیم

type Player = {
  id: string;
  player_name: string;
  club_name: string;
  goals: number;
};

// این تابع بدون تغییر باقی می‌ماند و روی سرور اجرا می‌شود
async function getPlayers(): Promise<Player[]> {
  try {
    const res = await fetch('http://localhost:3000', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  // داده‌ها را روی سرور دریافت می‌کنیم
  const players = await getPlayers();

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">لیست برترین گلزنان لیگ برتر</h1>

      {/* از کامپوننت تعاملی خود استفاده کرده و داده‌های اولیه را به آن پاس می‌دهیم */}
      <PlayerList initialPlayers={players} />
    </main>
  );
}
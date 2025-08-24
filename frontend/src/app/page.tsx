// frontend/src/app/page.tsx

import PlayerList from '@/components/PlayerList';
import { Suspense } from 'react';

type Player = {
  id: string;
  full_name: string;
  known_as: string;
  birth_date: string;
  nationality: string[];
  goals: number;
};

// تابع حالا یک پارامتر search اختیاری می‌گیرد
async function getPlayers(search?: string): Promise<Player[]> {
  try {
    // اگر search وجود داشت، آن را به URL اضافه می‌کنیم
    const url = search ? `http://localhost:3000?search=${search}` : 'http://localhost:3000';
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// صفحه اصلی حالا یک پارامتر searchParams دریافت می‌کند
export default async function HomePage({ searchParams }: { searchParams: { search?: string } }) {

  const players = await getPlayers(searchParams.search);

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">لیست برترین گلزنان لیگ برتر</h1>

      {/* کامپوننت PlayerList را با لیست بازیکنان آپدیت شده صدا می‌زنیم */}
      <PlayerList initialPlayers={players} />
    </main>
  );
}
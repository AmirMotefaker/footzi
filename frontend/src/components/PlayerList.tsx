// frontend/src/components/PlayerList.tsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- useRouter را وارد می‌کنیم

type Player = {
  id: string;
  full_name: string;
  known_as: string;
  birth_date: string;
  nationality: string[];
  goals: number;
};

const ITEMS_PER_PAGE = 12;

export default function PlayerList({ initialPlayers }: { initialPlayers: Player[] }) {
  // ✅ دیگر به State برای filteredPlayers نیازی نداریم
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter(); // <-- از useRouter استفاده می‌کنیم

  // ✅ تابع useEffect برای فیلتر کردن حذف می‌شود
  // ✅ این تابع حالا URL را با پارامتر جستجو آپدیت می‌کند
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // یک URL جدید با پارامتر search می‌سازیم
    router.push(query ? `/?search=${query}` : '/');
  }

  // ✅ صفحه‌بندی روی initialPlayers انجام می‌شود
  const totalPages = Math.ceil(initialPlayers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPlayers = initialPlayers.slice(startIndex, endIndex);

  return (
    <div>
      <input
        type="text"
        placeholder="جستجوی بازیکن..."
        className="w-full p-3 mb-6 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={searchQuery}
        onChange={handleSearch} // <-- تابع جدید را به اینجا وصل می‌کنیم
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPlayers.map((player) => (
          <Link href={`/players/${player.id}`} key={player.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-xl hover:scale-105 cursor-pointer">
              <h2 className="text-xl font-semibold">{player.full_name}</h2>
              <p className="text-gray-400">شناخته شده به: {player.known_as}</p>
              <p className="text-yellow-400 mt-2 text-lg">گل‌ها: {player.goals}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          قبلی
        </button>

        <span className="text-gray-400">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
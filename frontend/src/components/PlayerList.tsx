// frontend/src/components/PlayerList.tsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Player = {
  id: string;
<<<<<<< HEAD
  full_name: string;
  known_as: string;
  goals: number;
};

=======
  player_name: string;
  club_name: string;
  goals: number;
};

// ۱. یک ثابت برای تعداد آیتم‌ها در هر صفحه تعریف می‌کنیم
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
const ITEMS_PER_PAGE = 12;

export default function PlayerList({ initialPlayers }: { initialPlayers: Player[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState(initialPlayers);
<<<<<<< HEAD
=======
  
  // ۲. یک State جدید برای نگهداری شماره صفحه فعلی اضافه می‌کنیم
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filtered = initialPlayers.filter(player =>
<<<<<<< HEAD
      player.full_name && player.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentPage(1);
  }, [searchQuery, initialPlayers]);

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex);
=======
      player.player_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentPage(1); // ۳. با هر جستجوی جدید، به صفحه اول برمی‌گردیم
  }, [searchQuery, initialPlayers]);

  // ۴. محاسبات مربوط به صفحه‌بندی
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex); // بازیکنان مربوط به صفحه فعلی را جدا می‌کنیم
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998

  return (
    <div>
      <input
        type="text"
        placeholder="جستجوی بازیکن..."
        className="w-full p-3 mb-6 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<<<<<<< HEAD
        {paginatedPlayers.map((player) => (
          <Link href={`/players/${player.id}`} key={player.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-xl hover:scale-105 cursor-pointer">
              <h2 className="text-xl font-semibold">{player.full_name}</h2>
              <p className="text-gray-400">شناخته شده به: {player.known_as}</p>
=======
        {/* ۵. حالا به جای کل لیست، فقط لیست صفحه‌بندی شده را نمایش می‌دهیم */}
        {paginatedPlayers.map((player) => (
          <Link href={`/players/${player.id}`} key={player.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-xl hover:scale-105 cursor-pointer">
              <h2 className="text-xl font-semibold">{player.player_name}</h2>
              <p className="text-gray-400">باشگاه: {player.club_name}</p>
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
              <p className="text-yellow-400 mt-2 text-lg">گل‌ها: {player.goals}</p>
            </div>
          </Link>
        ))}
      </div>

<<<<<<< HEAD
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
=======
      {/* ۶. دکمه‌ها و اطلاعات صفحه‌بندی */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1} // دکمه "قبلی" در صفحه اول غیرفعال است
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
          className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          قبلی
        </button>
        
        <span className="text-gray-400">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
<<<<<<< HEAD
          disabled={currentPage === totalPages}
=======
          disabled={currentPage === totalPages} // دکمه "بعدی" در صفحه آخر غیرفعال است
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
          className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
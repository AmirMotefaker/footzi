// frontend/src/app/players/[id]/page.tsx
import { FaBirthdayCake, FaFlag } from 'react-icons/fa';
import PlayerChart from '@/components/PlayerChart';

// ✅ Type بازیکن را برای شامل شدن داده‌های جدید آپدیت می‌کنیم
type Player = {
    id: string;
    full_name: string;
    known_as: string;
    birth_date: string;
    nationality: string[];
    goals: number;
    assists: number;
    appearances: number;
};

async function getPlayerById(id: string): Promise<Player | null> {
    try {
        const res = await fetch(`http://localhost:3000/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function PlayerPage({ params }: { params: { id: string } }) {
    
    const player = await getPlayerById(params.id);

    if (!player) {
        return <div className="text-white text-center p-8">بازیکنی پیدا نشد.</div>;
    }

    // ✅ داده‌ها را برای کامپوننت نمودار آماده می‌کنیم
    const playerStatsForChart = {
      goals: player.goals,
      assists: player.assists,
      appearances: player.appearances,
    };

    return (
        <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-transform hover:-translate-y-1">
                <h1 className="text-5xl font-bold mb-2">{player.full_name}</h1>
                <p className="text-xl text-gray-400 mb-8">{player.known_as}</p>
                
                <div className="text-left space-y-4 border-t border-gray-700 pt-6 mt-6">
                    <div className="flex items-center text-lg">
                        <span className="text-yellow-400 font-bold w-32">گل‌ها:</span>
                        <span>{player.goals}</span>
                    </div>

                    {/* ✅ نمایش پاس گل و حضور در بازی */}
                    <div className="flex items-center text-lg">
                        <span className="text-yellow-400 font-bold w-32">پاس گل:</span>
                        <span>{player.assists}</span>
                    </div>
                    <div className="flex items-center text-lg">
                        <span className="text-yellow-400 font-bold w-32">حضور:</span>
                        <span>{player.appearances}</span>
                    </div>

                    {player.birth_date && (
                        <div className="flex items-center text-lg">
                            <FaBirthdayCake className="text-yellow-400 ml-3" />
                            <span className="font-bold w-28">تاریخ تولد:</span>
                            <span>{new Date(player.birth_date).toLocaleDateString('fa-IR')}</span>
                        </div>
                    )}

                    {player.nationality && player.nationality.length > 0 && (
                        <div className="flex items-center text-lg">
                            <FaFlag className="text-yellow-400 ml-3" />
                            <span className="font-bold w-28">ملیت:</span>
                            <span>{player.nationality.join(', ')}</span>
                        </div>
                    )}
                </div>
                
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">نمودار آمار</h2>
                  {/* ✅ داده‌های واقعی را به کامپوننت نمودار ارسال می‌کنیم */}
                  <PlayerChart playerStats={playerStatsForChart} />
                </div>
            </div>
        </main>
    );
}
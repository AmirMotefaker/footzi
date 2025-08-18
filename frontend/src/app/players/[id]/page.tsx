// frontend/src/app/players/[id]/page.tsx

type Player = {
    id: string;
    player_name: string;
    club_name: string;
    goals: number;
};

// این تابع داده‌های یک بازیکن خاص را از API شما می‌گیرد
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

// کامپوننت صفحه ما یک پارامتر به نام params دریافت می‌کند که شامل id از URL است
export default async function PlayerPage({ params }: { params: { id: string } }) {

    const player = await getPlayerById(params.id);

    if (!player) {
        return <div className="text-white text-center p-8">بازیکنی پیدا نشد.</div>;
    }

    return (
        <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center transform transition-transform hover:-translate-y-1">
                <h1 className="text-5xl font-bold mb-4">{player.player_name}</h1>
                <p className="text-2xl text-gray-400 mb-6">باشگاه: {player.club_name}</p>
                <div className="bg-yellow-400 text-gray-900 rounded-full px-6 py-3 inline-block">
                    <p className="text-3xl font-bold">{player.goals} گل</p>
                </div>
            </div>
        </main>
    );
}
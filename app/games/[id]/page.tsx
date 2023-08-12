import ClientGamePage from '@/components/games/gamePage/GamePage';

interface GamePageRouteProps {
    params: {
        id: string;
    };
}

export default async function GamePage({ params: { id } }: GamePageRouteProps) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <ClientGamePage gameId={id} />
        </section>
    );
}

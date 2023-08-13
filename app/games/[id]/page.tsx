import ClientGamePage from '@/components/games/gamePage/GamePage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/_common/db';
import { cookies } from 'next/headers';
import ClientApp from '@/components/client/ClientApp';

interface GamePageRouteProps {
    params: {
        id: string;
    };
}

export default async function GamePage({ params: { id } }: GamePageRouteProps) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        return <ClientGamePage userId={session.user.id} gameId={id} />;
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            {/* TODO - implement */}
            OOPS NO AUTH
        </section>
    );
}

import { Database } from '@/_common/db';
import ClientGamePage from '@/components/games/gamePage/GamePage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
        <div>
            {/* TODO - implement */}
            OOPS NO AUTH
        </div>
    );
}
